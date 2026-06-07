const products = [
  {
    category: "Camara de seguridad",
    title: "VIGILA",
    title2: "TU NEGOCIO",
    description:
      "Venta, instalacion y configuracion de camaras de seguridad para casas, tiendas, oficinas y almacenes.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1800&q=82",
  },
  {
    category: "Cable estructurado",
    title: "REDES",
    title2: "ORDENADAS",
    description:
      "Cableado estructurado para internet, redes internas, puntos de red, canaletas, racks y organizacion tecnica.",
    image:
      "https://images.unsplash.com/photo-1600267165477-6d4cc741b379?auto=format&fit=crop&w=1800&q=82",
  },
  {
    category: "Servicio tecnico",
    title: "SOPORTE",
    title2: "RAPIDO",
    description:
      "Revision, mantenimiento, limpieza, diagnostico y reparacion de computadoras, laptops e impresoras.",
    image:
      "https://images.unsplash.com/photo-1581092921461-39b2f2f8a8b9?auto=format&fit=crop&w=1800&q=82",
  },
  {
    category: "Instalacion de programas",
    title: "SOFTWARE",
    title2: "LISTO",
    description:
      "Instalamos y configuramos programas esenciales, herramientas de oficina, drivers, antivirus y utilidades de trabajo.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=82",
  },
  {
    category: "Cambio de sistema operativo",
    title: "SISTEMA",
    title2: "RENOVADO",
    description:
      "Formateo, instalacion o cambio de sistema operativo con respaldo, drivers y configuracion inicial del equipo.",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1800&q=82",
  },
];

const byId = (id) => document.getElementById(id);
const sliderStage = byId("slider-stage");
const slideNumbers = byId("slide-numbers");
const progressBar = document.querySelector(".progress-sub-foreground");

sliderStage.innerHTML = products
  .map(
    (item, index) => `
      <div class="card" id="card${index}" style="background-image:url('${item.image}')"></div>
      <div class="card-content" id="card-content-${index}">
        <div class="content-start"></div>
        <div class="content-place">${item.category}</div>
        <div class="content-title-1">${item.title}</div>
        <div class="content-title-2">${item.title2}</div>
      </div>
    `
  )
  .join("");

slideNumbers.innerHTML = products
  .map((_, index) => `<div class="item" id="slide-item-${index}">${index + 1}</div>`)
  .join("");

const getCard = (index) => `#card${index}`;
const getCardContent = (index) => `#card-content-${index}`;
const getSliderItem = (index) => `#slide-item-${index}`;
const ease = "sine.inOut";

let order = products.map((_, index) => index);
let detailsEven = true;
let isAnimating = false;
let loopTimer;
let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 38;
let numberSize = 50;

function layoutMetrics() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const small = width <= 900;
  const phone = width <= 560;

  cardWidth = small ? Math.min(142, width * 0.32) : 200;
  cardHeight = small ? 200 : 300;
  gap = small ? 16 : 38;
  offsetTop = phone ? height + 40 : small ? Math.max(height - 270, 420) : height - 430;
  offsetLeft = phone ? width + 40 : small ? width - cardWidth - 20 : Math.max(width - 820, 520);
}

function setDetails(selector, item) {
  document.querySelector(`${selector} .eyebrow span`).textContent = item.category;
  document.querySelector(`${selector} .title-1`).textContent = item.title;
  document.querySelector(`${selector} .title-2`).textContent = item.title2;
  document.querySelector(`${selector} .desc`).textContent = item.description;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration,
      onComplete: resolve,
    });
  });
}

function resetProgress(active) {
  gsap.set(progressBar, {
    width: `${((active + 1) / order.length) * 100}%`,
  });
}

function init() {
  layoutMetrics();
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

  setDetails(detailsActive, products[active]);
  setDetails(detailsInactive, products[active]);

  gsap.set("#pagination", {
    top: offsetTop + cardHeight + 30,
    left: offsetLeft,
    y: 160,
    opacity: 0,
  });
  gsap.set(".site-nav", { y: -120, opacity: 0 });
  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    borderRadius: 0,
    zIndex: 20,
  });
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 25, x: -160 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 18 });

  rest.forEach((index, position) => {
    const x = offsetLeft + position * (cardWidth + gap);
    gsap.set(getCard(index), {
      x: x + 300,
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 8,
    });
    gsap.set(getCardContent(index), {
      x: x + 300,
      y: offsetTop + cardHeight - 96,
      zIndex: 40,
      opacity: 1,
    });
    gsap.set(getSliderItem(index), { x: (position + 1) * numberSize });
  });

  gsap.set(".indicator", { x: -window.innerWidth });
  resetProgress(active);

  gsap.to(".cover", { x: window.innerWidth + 420, delay: 0.35, ease });
  rest.forEach((index, position) => {
    const x = offsetLeft + position * (cardWidth + gap);
    gsap.to(getCard(index), { x, delay: 0.65, ease });
    gsap.to(getCardContent(index), { x, delay: 0.65, ease });
  });
  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: 0.65 });
  gsap.to(".site-nav", { y: 0, opacity: 1, ease, delay: 0.65 });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: 0.65 });
}

function updateIncomingDetails(selector, item) {
  setDetails(selector, item);
  gsap.set(selector, { zIndex: 25 });
  gsap.set(`${selector} .eyebrow span`, { y: 100 });
  gsap.set(`${selector} .title-1`, { y: 100 });
  gsap.set(`${selector} .title-2`, { y: 100 });
  gsap.set(`${selector} .desc`, { y: 55 });
  gsap.set(`${selector} .cta`, { y: 60 });

  gsap.to(selector, { opacity: 1, delay: 0.32, ease });
  gsap.to(`${selector} .eyebrow span`, { y: 0, delay: 0.08, duration: 0.7, ease });
  gsap.to(`${selector} .title-1`, { y: 0, delay: 0.13, duration: 0.7, ease });
  gsap.to(`${selector} .title-2`, { y: 0, delay: 0.18, duration: 0.7, ease });
  gsap.to(`${selector} .desc`, { y: 0, delay: 0.27, duration: 0.45, ease });
  gsap.to(`${selector} .cta`, { y: 0, delay: 0.34, duration: 0.45, ease });
}

async function step(direction = 1) {
  if (isAnimating) return;
  isAnimating = true;

  if (direction > 0) {
    order.push(order.shift());
  } else {
    order.unshift(order.pop());
  }

  detailsEven = !detailsEven;
  layoutMetrics();

  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const [active, ...rest] = order;
  const outgoing = direction > 0 ? rest[rest.length - 1] : rest[0];

  updateIncomingDetails(detailsActive, products[active]);
  gsap.set(detailsInactive, { zIndex: 18 });
  gsap.to(detailsInactive, { opacity: 0, duration: 0.25, ease });

  gsap.set(getCard(outgoing), { zIndex: 10 });
  gsap.set(getCard(active), { zIndex: 20 });
  gsap.to(getCard(outgoing), { scale: 1.35, ease });
  gsap.to(getCardContent(active), {
    y: offsetTop + cardHeight - 10,
    opacity: 0,
    duration: 0.28,
    ease,
  });
  gsap.to(getSliderItem(active), { x: 0, ease });
  gsap.to(getSliderItem(outgoing), { x: direction > 0 ? -numberSize : numberSize * products.length, ease });
  resetProgress(active);

  await animate(getCard(active), 0.9, {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    borderRadius: 0,
    ease,
  });

  rest.forEach((index, position) => {
    const x = offsetLeft + position * (cardWidth + gap);
    gsap.set(getCard(index), {
      x,
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 8,
      scale: 1,
    });
    gsap.set(getCardContent(index), {
      x,
      y: offsetTop + cardHeight - 96,
      opacity: 1,
      zIndex: 40,
    });
    gsap.set(getSliderItem(index), { x: (position + 1) * numberSize });
  });

  isAnimating = false;
}

async function loop() {
  await animate(".indicator", 2.2, { x: 0, ease: "none" });
  await animate(".indicator", 0.55, { x: window.innerWidth, delay: 0.15, ease });
  gsap.set(".indicator", { x: -window.innerWidth });
  await step(1);
  loopTimer = window.setTimeout(loop, 150);
}

function restartLoop() {
  window.clearTimeout(loopTimer);
  gsap.killTweensOf(".indicator");
  gsap.set(".indicator", { x: -window.innerWidth });
  loopTimer = window.setTimeout(loop, 450);
}

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });
}

async function start() {
  await Promise.all(products.map((item) => loadImage(item.image)));
  init();
  loopTimer = window.setTimeout(loop, 1500);
}

document.querySelector(".arrow-right").addEventListener("click", () => {
  step(1);
  restartLoop();
});

document.querySelector(".arrow-left").addEventListener("click", () => {
  step(-1);
  restartLoop();
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

let resizeTimer = 0;
window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    gsap.killTweensOf("*");
    window.clearTimeout(loopTimer);
    document.querySelector(".cover").style.display = "none";
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    init();
    restartLoop();
  }, 160);
}, { passive: true });

start();
