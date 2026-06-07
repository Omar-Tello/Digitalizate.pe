(() => {
  const navScript = document.currentScript;
  const siteRoot = new URL(".", navScript.src);
  const links = [
    ["index.html", "✨", "Intro"],
    ["principal/index.html", "🏠", "Inicio"],
    ["software/index.html", "📅", "Software"],
    ["hardware/index.html", "💻", "Hardware"],
    ["capacitaciones/index.html", "🎓", "Capacitaciones"],
    ["diseno-grafico/index.html", "🎨", "Diseño"],
    ["ideas/index.html", "💡", "Ideas"]
  ];

  const normalizePath = (path) => {
    const clean = path.replace(/index\.html$/i, "").replace(/\/+$/, "");
    return clean || "/";
  };

  const current = normalizePath(window.location.pathname);
  const homePath = normalizePath(new URL("index.html", siteRoot).pathname);
  if (current === homePath && !window.matchMedia("(max-width: 720px)").matches) return;

  const nav = document.createElement("nav");
  nav.className = "digitalizate-nav";
  nav.setAttribute("aria-label", "Navegación principal de Digitalizate.pe");

  links.forEach(([href, emoji, label], index) => {
    const link = document.createElement("a");
    link.href = new URL(href, siteRoot).href;
    link.textContent = emoji;
    link.title = label;
    link.setAttribute("aria-label", label);
    if (index === 0) link.classList.add("digitalizate-nav__brand");
    if (normalizePath(new URL(href, siteRoot).pathname) === current) {
      link.setAttribute("aria-current", "page");
    }
    nav.appendChild(link);
  });

  document.body.appendChild(nav);
})();
