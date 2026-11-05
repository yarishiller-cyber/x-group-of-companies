// =============================================================================
// territory.mjs — the "how the companies fit together" and "where we look"
// visuals, all rendered at build time as inline SVG:
//   territoryMap()/territoryLegend()  a stylized (not-to-scale) map of Greater
//        Vancouver: each territorial brand's area, the metro-wide specialists,
//        and a legend that drives hover/focus highlighting (main.js hover groups).
//   flywheel()   responsive replacement for the old static capital-flow SVG.
//   reachMap()   a real world map (Natural Earth projection, simplified country
//        boundaries from _build/data/world-land.json) with Canada and the markets
//        under study highlighted and arcs from Vancouver to each capital.
// =============================================================================
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { esc } from "./layout.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const WORLD = JSON.parse(readFileSync(join(HERE, "../data/world-land.json"), "utf8"));

const T = { water: "#0f3347", land: "#1d4a63", line: "rgba(255,255,255,.14)" };

// ---------------------------------------------------------------- Greater Vancouver
export function territoryMap(bySlug) {
  const brand = (slug) => bySlug[slug] || { tint: "#14425c", monogram: "?", name: slug };
  const reg = (slug, d, labelAt, label, brandLine) => {
    const b = brand(slug);
    return `<g class="tm-item tm-region" data-key="${slug}">
      <path d="${d}" fill="${b.tint}" fill-opacity=".82" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>
      <text x="${labelAt[0]}" y="${labelAt[1]}" class="tm-label">${label}</text>
      <text x="${labelAt[0]}" y="${labelAt[1] + 16}" class="tm-brand">${esc(brandLine || b.name)}</text>
    </g>`;
  };
  const pin = (slug, x, y) => {
    const b = brand(slug);
    return `<a class="tm-item tm-pin" data-key="${slug}" href="/companies/${slug}" transform="translate(${x},${y})" aria-label="${esc(b.name)}">
      <circle r="17" fill="${b.tint}" stroke="#fff" stroke-width="2.5"/>
      <text text-anchor="middle" y="5" class="tm-mono">${esc(b.monogram)}</text>
    </a>`;
  };
  return `<svg class="tmap-svg" viewBox="0 0 960 560" role="img" aria-label="Stylized map of Greater Vancouver showing where each X Group company operates: Steveston in Richmond, West Vancouver on the North Shore, Kitsilano on Vancouver's West Side, Pitt Meadows and Maple Ridge in their own towns, and the metro-wide specialists everywhere else.">
  <defs>
    <pattern id="tm-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,.16)" stroke-width="2"/></pattern>
  </defs>
  <rect width="960" height="560" fill="${T.water}"/>
  <g class="tm-item tm-region tm-metro" data-key="metro">
    <path d="M300 196 H560 Q600 196 620 220 V332 Q600 346 560 346 H300 Q280 330 280 300 V230 Q280 200 300 196 Z" fill="${T.land}" stroke="${T.line}"/>
    <path d="M440 392 H960 V560 H440 Q420 520 440 470 Z" fill="${T.land}" stroke="${T.line}"/>
    <path d="M640 196 H696 V346 H640 Z" fill="${T.land}" stroke="${T.line}"/>
    <path d="M300 196 H560 Q600 196 620 220 V332 Q600 346 560 346 H300 Q280 330 280 300 V230 Q280 200 300 196 Z" fill="url(#tm-hatch)"/>
    <path d="M440 392 H960 V560 H440 Q420 520 440 470 Z" fill="url(#tm-hatch)"/>
    <path d="M640 196 H696 V346 H640 Z" fill="url(#tm-hatch)"/>
    <text x="330" y="226" class="tm-label">Vancouver · Burnaby · New Westminster</text>
    <text x="640" y="470" class="tm-label">Surrey · Delta · Langley · Coquitlam</text>
    <text x="640" y="488" class="tm-brand tm-brand--dim">Metro-wide specialists &amp; audience brands</text>
  </g>
  ${reg("west-vancouver-garage-doors", "M0 0 H960 V128 Q860 150 720 140 T440 150 T160 142 T0 132 Z", [40, 58], "North Shore · West Vancouver &amp; North Vancouver")}
  ${reg("kitsilano-garage-doors", "M70 206 Q90 190 130 192 H290 Q300 230 300 300 V346 H110 Q70 320 70 280 Z", [96, 258], "Vancouver West Side · Point Grey to Fairview")}
  ${reg("steveston-garage-doors", "M110 392 Q130 372 170 372 H380 Q420 380 420 420 V450 Q400 480 360 482 H160 Q110 470 110 430 Z", [138, 420], "Richmond · Lulu Island &amp; Sea Island")}
  ${reg("pitt-meadows-garage-doors", "M710 196 H808 V346 H710 Z", [718, 226], "Pitt Meadows", "Garage Doors")}
  ${reg("maple-ridge-overhead-doors", "M822 196 H960 V346 H822 Z", [830, 226], "Maple Ridge", "Overhead Doors")}
  <text x="420" y="178" class="tm-water">Burrard Inlet</text>
  <text x="520" y="376" class="tm-water">Fraser River</text>
  <text x="18" y="330" class="tm-water" transform="rotate(-90 18 330)">Strait of Georgia</text>
  ${pin("new-garage-doors-vancouver", 500, 300)}
  ${pin("yvr-garage-door-springs", 560, 440)}
  ${pin("hydraulic-hero", 680, 520)}
  ${pin("probably-fine-garage-doors", 760, 430)}
  ${pin("good-enough-garage-doors", 830, 500)}
  ${pin("sketchy-garage-doors", 900, 420)}
  ${pin("west-vancouver-garage-doors", 330, 84)}
  ${pin("kitsilano-garage-doors", 180, 316)}
  ${pin("steveston-garage-doors", 300, 448)}
  ${pin("pitt-meadows-garage-doors", 759, 300)}
  ${pin("maple-ridge-overhead-doors", 891, 300)}
  <a class="tm-item tm-pin tm-allegro" data-key="allegro-x-ai" href="/companies/allegro-x-ai" transform="translate(92,500)" aria-label="Allegro X AI">
    <rect x="-18" y="-18" width="36" height="36" rx="9" fill="#3b3f8f" stroke="#fff" stroke-width="2.5"/>
    <text text-anchor="middle" y="5" class="tm-mono">AX</text>
    <text x="30" y="-2" class="tm-label">Allegro X AI</text>
    <text x="30" y="14" class="tm-brand tm-brand--dim">one platform under every pin</text>
  </a>
</svg>`;
}

const METRO_WIDE = ["new-garage-doors-vancouver", "yvr-garage-door-springs", "hydraulic-hero", "probably-fine-garage-doors", "good-enough-garage-doors", "sketchy-garage-doors"];

export function territoryLegend(bySlug) {
  const groups = [
    { title: "Territory brands", note: "One town, one brand, one crew.", slugs: ["steveston-garage-doors", "west-vancouver-garage-doors", "kitsilano-garage-doors", "pitt-meadows-garage-doors", "maple-ridge-overhead-doors"] },
    { title: "Specialty brands", note: "Metro-wide, but a different job.", slugs: ["new-garage-doors-vancouver", "yvr-garage-door-springs", "hydraulic-hero"] },
    { title: "Audience brands", note: "Metro-wide repair, three different customers.", slugs: ["probably-fine-garage-doors", "good-enough-garage-doors", "sketchy-garage-doors"] },
    { title: "The platform", note: "Every pin runs on it.", slugs: ["allegro-x-ai"] },
  ];
  const also = (s) => s === "allegro-x-ai" ? "*" : (METRO_WIDE.includes(s) ? "metro" : "");
  return `<div class="tm-legend">${groups.map(g => `
    <div class="tm-group">
      <h3>${esc(g.title)}</h3>
      <p>${esc(g.note)}</p>
      <ul>${g.slugs.map(s => { const b = bySlug[s]; return `<li><a class="tm-key" data-key="${s}"${also(s) ? ` data-also="${also(s)}"` : ""} href="/companies/${s}"><span class="tm-swatch" style="background:${b.tint}">${esc(b.monogram)}</span>${esc(b.name)}</a></li>`; }).join("")}</ul>
    </div>`).join("")}
  </div>`;
}

// ---------------------------------------------------------------- flywheel
export function flywheel({ compact = false } = {}) {
  const steps = [
    ["Shared infrastructure", "Finance · procurement · people · technology"],
    ["Lean operating brands", "Doors · hydraulic · technology"],
    ["Cash flow", "Generated across the portfolio"],
    ["Capital allocation", "Reinvest · acquire · new markets"],
  ];
  return `<div class="flywheel${compact ? " flywheel--compact" : ""}" role="img" aria-label="Flywheel: shared infrastructure lets lean operating brands run cheaply, which generates cash flow, which funds disciplined capital allocation back into infrastructure, acquisitions and new markets.">
  <ol class="fw-steps">${steps.map(([h, p], i) => `
    <li class="fw-step" style="--i:${i}"><span class="fw-num">${i + 1}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join("")}
  </ol>
  <div class="fw-core" aria-hidden="true">
    <svg viewBox="0 0 120 120"><defs><marker id="fw-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0L8 4 0 8z" fill="currentColor"/></marker></defs>
      <path d="M60 12 A48 48 0 0 1 108 60" fill="none" stroke="currentColor" stroke-width="2.5" marker-end="url(#fw-arrow)"/>
      <path d="M108 60 A48 48 0 0 1 60 108" fill="none" stroke="currentColor" stroke-width="2.5" marker-end="url(#fw-arrow)"/>
      <path d="M60 108 A48 48 0 0 1 12 60" fill="none" stroke="currentColor" stroke-width="2.5" marker-end="url(#fw-arrow)"/>
      <path d="M12 60 A48 48 0 0 1 60 12" fill="none" stroke="currentColor" stroke-width="2.5" marker-end="url(#fw-arrow)"/>
    </svg>
    <span>compounds</span>
  </div>
</div>`;
}

// ---------------------------------------------------------------- world reach map
function ne(lon, lat) {
  const lam = lon * Math.PI / 180, phi = lat * Math.PI / 180, p2 = phi * phi, p4 = p2 * p2;
  return [lam * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4))),
          phi * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)))];
}
function proj(lon, lat) { const { scale, cx, cy } = WORLD.meta; const [x, y] = ne(lon, lat); return [cx + x * scale, cy - y * scale]; }
const f1 = (n) => n.toFixed(1);

export const REACH = {
  home: { iso: "CAN", name: "Canada" },
  hq: { name: "Vancouver", sub: "Head office", lon: -123.12, lat: 49.28 },
  tech: { name: "Montréal", sub: "Allegro X AI", lon: -73.57, lat: 45.50 },
  markets: [
    { iso: "KAZ", country: "Kazakhstan", city: "Astana",   lon: 71.43, lat: 51.13, dx: 10,  dy: -8 },
    { iso: "UZB", country: "Uzbekistan", city: "Tashkent", lon: 69.24, lat: 41.30, dx: 9, dy: 24 },
    { iso: "KGZ", country: "Kyrgyzstan", city: "Bishkek",  lon: 74.59, lat: 42.87, dx: 12,  dy: 6 },
    { iso: "AZE", country: "Azerbaijan", city: "Baku",     lon: 49.87, lat: 40.41, dx: 10,  dy: -9 },
    { iso: "GEO", country: "Georgia",    city: "Tbilisi",  lon: 44.83, lat: 41.72, dx: -11, dy: -12, anchor: "end" },
    { iso: "ARM", country: "Armenia",    city: "Yerevan",  lon: 44.51, lat: 40.18, dx: -11, dy: 22, anchor: "end" },
  ],
};

export function reachMap({ compact = false } = {}) {
  const { W, H } = WORLD.meta;
  const marketIso = new Set(REACH.markets.map(m => m.iso));
  const land = WORLD.countries.map(c => {
    const cls = c.id === REACH.home.iso ? "rm-land rm-home" : (marketIso.has(c.id) ? "rm-land rm-market" : "rm-land");
    const key = marketIso.has(c.id) ? ` data-key="${c.id}"` : "";
    return `<path class="${cls}"${key} d="${c.d}"><title>${esc(c.name)}</title></path>`;
  }).join("\n");
  // graticule
  const grat = [];
  for (let lon = -150; lon <= 150; lon += 30) grat.push("M" + Array.from({ length: 64 }, (_, i) => proj(lon, -42 + i * 2).map(f1).join(" ")).join("L"));
  for (const lat of [-30, 0, 30, 60]) grat.push("M" + Array.from({ length: 91 }, (_, i) => proj(-180 + i * 4, lat).map(f1).join(" ")).join("L"));
  const [hx, hy] = proj(REACH.hq.lon, REACH.hq.lat);
  const [mx, my] = proj(REACH.tech.lon, REACH.tech.lat);
  const arcs = REACH.markets.map(m => {
    const [x, y] = proj(m.lon, m.lat);
    const cx = (hx + x) / 2, cy = Math.min(hy, y) - Math.abs(x - hx) * 0.28;
    return `<path class="rm-arc" data-key="${m.iso}" d="M${f1(hx)} ${f1(hy)} Q${f1(cx)} ${f1(cy)} ${f1(x)} ${f1(y)}"/>`;
  }).join("");
  const pins = REACH.markets.map(m => {
    const [x, y] = proj(m.lon, m.lat);
    return `<g class="rm-pin" data-key="${m.iso}" transform="translate(${f1(x)},${f1(y)})"><circle r="4.2"/><circle r="9" class="rm-halo"/>
      <text x="${m.dx}" y="${m.dy}" class="rm-label"${m.anchor ? ` text-anchor="${m.anchor}"` : ""}>${esc(m.city)}</text>
      <text x="${m.dx}" y="${m.dy + 12}" class="rm-sub"${m.anchor ? ` text-anchor="${m.anchor}"` : ""}>${esc(m.country)}</text></g>`;
  }).join("");
  const hqPin = `<g class="rm-pin rm-pin--hq" transform="translate(${f1(hx)},${f1(hy)})"><circle r="6.5"/><circle r="14" class="rm-halo"/>
      <text x="-14" y="-14" class="rm-label" text-anchor="end">${esc(REACH.hq.name)}, Canada</text><text x="-14" y="-2" class="rm-sub" text-anchor="end">${esc(REACH.hq.sub)}</text></g>`;
  const techPin = `<g class="rm-pin rm-pin--tech" transform="translate(${f1(mx)},${f1(my)})"><circle r="4.2"/>
      <text x="8" y="18" class="rm-label">${esc(REACH.tech.name)}</text><text x="8" y="30" class="rm-sub">${esc(REACH.tech.sub)}</text></g>`;
  const regionLabel = (() => { const [x, y] = proj(62, 58); const [x2, y2] = proj(47, 48); return `<text x="${f1(x)}" y="${f1(y)}" class="rm-region">Central Asia</text><text x="${f1(x2)}" y="${f1(y2)}" class="rm-region" text-anchor="end">The Caucasus</text>`; })();
  return `<svg class="reach-map${compact ? " reach-map--compact" : ""}" viewBox="0 0 ${W} ${H}" role="img" aria-label="World map: from the head office in Vancouver, Canada, the Group studies markets in Central Asia (Kazakhstan, Uzbekistan, Kyrgyzstan) and the Caucasus (Azerbaijan, Georgia, Armenia). Allegro X AI is based in Montréal.">
  <rect width="${W}" height="${H}" fill="${T.water}"/>
  <g class="rm-grat">${grat.map(d => `<path d="${d}"/>`).join("")}</g>
  <g class="rm-countries">${land}</g>
  <g class="rm-arcs">${arcs}</g>
  ${regionLabel}
  <line class="rm-link" x1="${f1(hx)}" y1="${f1(hy)}" x2="${f1(mx)}" y2="${f1(my)}"/>
  ${techPin}
  ${hqPin}
  <g class="rm-pins">${pins}</g>
</svg>`;
}
