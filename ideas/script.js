const seedInput = document.getElementById("seedInput");
const ideaText = document.getElementById("ideaText");
let seed = 898766;

function mulberry32(seedValue) {
  let t = seedValue >>> 0;
  return function rng() {
    t += 0x6D2B79F5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function rInt(rng, a, b) {
  return Math.floor(a + rng() * (b - a + 1));
}

function fmt(n) {
  return Number(n.toFixed(2)).toString();
}

function pointsToPath(points) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${fmt(point.x)} ${fmt(point.y)}`)
    .join(" ") + " Z";
}

function buildFeature(rng, w, h, corners) {
  const edge = ["top", "bottom", "left", "right"][rInt(rng, 0, 3)];
  const isHorizontal = edge === "top" || edge === "bottom";
  const length = isHorizontal ? w : h;
  const depth = rInt(rng, 7, 15);
  const maxStart = Math.max(80, length - 170);
  const start = rInt(rng, 54, maxStart);
  const end = Math.min(length - 34, start + rInt(rng, 76, 160));
  const direction = rng() < 0.55 ? 1 : -1;

  if (edge === "top") {
    return {
      edge,
      points: [{ x: start, y: 0 }, { x: start + depth, y: depth * direction }, { x: end - depth, y: depth * direction }, { x: end, y: 0 }],
      cut: [{ x: start, y: 0 }, { x: start + depth, y: depth * direction }, { x: end - depth, y: depth * direction }, { x: end, y: 0 }],
    };
  }

  if (edge === "bottom") {
    return {
      edge,
      points: [{ x: start, y: h }, { x: start + depth, y: h - depth * direction }, { x: end - depth, y: h - depth * direction }, { x: end, y: h }],
      cut: [{ x: end, y: h }, { x: end - depth, y: h - depth * direction }, { x: start + depth, y: h - depth * direction }, { x: start, y: h }],
    };
  }

  const minY = Math.max(corners.tl, corners.tr) + 20;
  const maxY = h - Math.max(corners.bl, corners.br) - 20;
  const y1 = Math.min(start, maxY - 38);
  const y2 = Math.min(end, maxY);

  if (edge === "right") {
    return {
      edge,
      points: [{ x: w, y: y1 }, { x: w - depth * direction, y: y1 + depth }, { x: w - depth * direction, y: y2 - depth }, { x: w, y: y2 }],
      cut: [{ x: w, y: y1 }, { x: w - depth * direction, y: y1 + depth }, { x: w - depth * direction, y: y2 - depth }, { x: w, y: y2 }],
    };
  }

  return {
    edge,
    points: [{ x: 0, y: y2 }, { x: depth * direction, y: y2 - depth }, { x: depth * direction, y: y1 + depth }, { x: 0, y: y1 }],
    cut: [{ x: 0, y: y2 }, { x: depth * direction, y: y2 - depth }, { x: depth * direction, y: y1 + depth }, { x: 0, y: y1 }],
  };
}

function generateHudFrameSVG({ w = 384, h = 150, seed = 1, pad = 22 } = {}) {
  const rng = mulberry32(seed);
  const corners = {
    tl: rInt(rng, 0, 1) ? rInt(rng, 15, 56) : 0,
    tr: rInt(rng, 0, 1) ? rInt(rng, 15, 56) : 0,
    br: rInt(rng, 0, 1) ? rInt(rng, 15, 56) : 0,
    bl: rInt(rng, 0, 1) ? rInt(rng, 15, 56) : 0,
  };
  const feature = buildFeature(rng, w, h, corners);

  const top = [{ x: corners.tl, y: 0 }];
  if (feature.edge === "top") top.push(...feature.cut.slice(0, 4));
  top.push({ x: w - corners.tr, y: 0 });

  const right = [{ x: w, y: corners.tr }];
  if (feature.edge === "right") right.push(...feature.cut.slice(0, 4));
  right.push({ x: w, y: h - corners.br });

  const bottom = [{ x: w - corners.br, y: h }];
  if (feature.edge === "bottom") bottom.push(...feature.cut.slice(0, 4));
  bottom.push({ x: corners.bl, y: h });

  const left = [{ x: 0, y: h - corners.bl }];
  if (feature.edge === "left") left.push(...feature.cut.slice(0, 4));
  left.push({ x: 0, y: corners.tl });

  const outline = [
    ...top,
    ...(corners.tr ? [{ x: w, y: corners.tr }] : []),
    ...right.slice(1),
    ...(corners.br ? [{ x: w - corners.br, y: h }] : []),
    ...bottom.slice(1),
    ...(corners.bl ? [{ x: 0, y: h - corners.bl }] : []),
    ...left.slice(1),
    ...(corners.tl ? [{ x: corners.tl, y: 0 }] : []),
  ];

  const outlineD = pointsToPath(outline);
  const accentD = pointsToPath(feature.points);
  const dotsId = `dots_${seed}`;
  const glowId = `glow_${seed}`;

  return {
    meta: { seed },
    svgMarkup: `
      <svg id="generatedFrame" xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${w + pad * 2} ${h + pad * 2}" preserveAspectRatio="none" fill="none">
        <defs>
          <pattern id="${dotsId}" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2.2" cy="2.2" r="1" fill="rgba(18,168,255,0.12)" />
          </pattern>
          <filter id="${glowId}" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.6" flood-color="rgba(18,168,255,0.55)" flood-opacity="0.7" />
          </filter>
        </defs>
        <path d="${outlineD}" fill="rgba(4,22,34,0.72)" />
        <path d="${outlineD}" fill="url(#${dotsId})" opacity="0.65" />
        <path d="${accentD}" fill="rgba(18,168,255,0.55)" stroke="rgba(18,168,255,0.78)" stroke-width="1" vector-effect="non-scaling-stroke" />
        <path d="${outlineD}" stroke="rgba(18,168,255,0.95)" stroke-width="1" vector-effect="non-scaling-stroke" filter="url(#${glowId})" />
        <path d="${outlineD}" stroke="rgba(18,168,255,0.32)" stroke-width="3" vector-effect="non-scaling-stroke" />
      </svg>
    `.trim(),
  };
}

function addCardWithFrame(seedValue) {
  const frame = document.getElementById("frame");
  const rect = frame.getBoundingClientRect();
  const { svgMarkup, meta } = generateHudFrameSVG({
    w: Math.max(280, Math.round(rect.width)),
    h: Math.max(130, Math.round(rect.height)),
    seed: seedValue,
    pad: 22,
  });
  document.querySelector("#frame > span").innerHTML = svgMarkup;
  return meta;
}

function regenerateSingle(newSeed) {
  document.querySelector("#frame > span").innerHTML = "";
  const meta = addCardWithFrame(newSeed);
  seedInput.value = meta.seed;
}

document.getElementById("btnRand").addEventListener("click", () => {
  seed = (seed + Math.floor(Math.random() * 9999) + 1) >>> 0;
  regenerateSingle(seed);
});

document.getElementById("btnSeed").addEventListener("click", () => {
  const value = Number(seedInput.value);
  if (Number.isFinite(value) && value >= 0) {
    seed = value >>> 0;
    regenerateSingle(seed);
  }
});

document.getElementById("send-idea").addEventListener("click", () => {
  const idea = ideaText.value.trim();
  const subject = encodeURIComponent("Nueva idea para Digitalizate.pe");
  const body = encodeURIComponent(idea || "Hola, quiero hacer realidad una idea digital.");
  window.location.href = `mailto:ideas@digitalizate.pe?subject=${subject}&body=${body}`;
});

let resizeFrame = 0;
window.addEventListener("resize", () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => regenerateSingle(seed));
}, { passive: true });

regenerateSingle(seed);
