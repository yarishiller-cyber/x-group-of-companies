// =============================================================================
// assets.mjs — inline SVG: logo mark, icons, avatars, monogram tiles, diagrams.
// Everything is vector so the parent site stays crisp, tiny and theme-safe.
// =============================================================================

// The X Group mark — a rounded slab with a tapered white "X".
// `id` must be unique per inline instance (gradient ids).
export function markSVG(id = "xg", size = 40) {
  return `<svg class="xg-mark" width="${size}" height="${size}" viewBox="0 0 64 64" role="img" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="${id}-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a5675"/><stop offset="1" stop-color="#0c2a3a"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="15" fill="url(#${id}-g)"/>
  <rect x="2.75" y="2.75" width="58.5" height="58.5" rx="14.25" fill="none" stroke="#ffffff" stroke-opacity=".10"/>
  <path d="M21 20 L32 31 L43 20" fill="none" stroke="#f4f1ea" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 44 L32 33 L43 44" fill="none" stroke="#c98a52" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

// Standalone mark for favicon rasterization (no CSS class dependency).
export function faviconSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a5675"/><stop offset="1" stop-color="#0c2a3a"/></linearGradient></defs>
  <rect x="0" y="0" width="64" height="64" rx="15" fill="url(#g)"/>
  <path d="M21 20 L32 31 L43 20" fill="none" stroke="#f4f1ea" stroke-width="6.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 44 L32 33 L43 44" fill="none" stroke="#c98a52" stroke-width="6.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

// Line-icon set (24x24, stroke = currentColor).
const P = {
  chart:  '<path d="M4 20V4M4 20h16M8 16v-4M13 16V8M18 16v-7"/>',
  box:    '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M4 7.5L12 12l8-4.5M12 12v9"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5"/><path d="M16 6.5a3 3 0 010 5.8M21 20c0-2.4-1.4-4.2-3.6-4.8"/>',
  cpu:    '<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3"/>',
  trend:  '<path d="M4 17l5-5 3 3 7-8"/><path d="M16 7h4v4"/>',
  gear:   '<circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2.1 2.1M16.9 16.9L19 19M19 5l-2.1 2.1M7.1 16.9L5 19"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/>',
  globe:  '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z"/>',
  arrow:  '<path d="M5 12h14M13 6l6 6-6 6"/>',
  ext:    '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  mail:   '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  phone:  '<path d="M6 3h3l1.5 5-2 1.5a12 12 0 006 6l1.5-2 5 1.5v3a2 2 0 01-2 2A17 17 0 014 5a2 2 0 012-2z"/>',
  pin:    '<path d="M12 21s-6-5.3-6-10a6 6 0 1112 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/>',
  check:  '<path d="M4 12l5 5L20 6"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5M3 16.5l9 5 9-5"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
  hand:   '<path d="M7 11V5.5a1.5 1.5 0 013 0V11M10 11V4.5a1.5 1.5 0 013 0V11M13 11V6a1.5 1.5 0 013 0v5M16 8.5a1.5 1.5 0 013 0V14a6 6 0 01-6 6h-1.5a5 5 0 01-3.6-1.5L4 14.5a1.6 1.6 0 012.3-2.2L8 14"/>',
  build:  '<path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01"/>',
};
export function icon(name, cls = "icon") {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[name] || P.check}</svg>`;
}

// Executive placeholder avatar — refined initials in a soft brand frame.
// (Replace with real portraits before outreach — see executives.mjs.)
export function avatar(initials, id) {
  return `<svg class="exec-avatar" viewBox="0 0 200 200" role="img" aria-label="Portrait placeholder for ${initials}" width="200" height="200">
  <defs>
    <linearGradient id="av-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#eef2f4"/><stop offset="1" stop-color="#dde5ea"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#av-${id})"/>
  <path d="M100 108a30 30 0 100-60 30 30 0 000 60zM44 176c4-30 27-46 56-46s52 16 56 46z" fill="#ffffff" opacity=".55"/>
  <text x="100" y="118" text-anchor="middle" font-family="Newsreader, Georgia, serif" font-size="70" font-weight="500" fill="#14425c" opacity=".92">${initials}</text>
</svg>`;
}

// Brand monogram tile for a portfolio company card.
export function monogramTile(company, id) {
  const t = company.tint || "#14425c";
  return `<svg class="co-mono" viewBox="0 0 120 120" role="img" aria-label="${company.name} logo" width="120" height="120">
  <defs><linearGradient id="mt-${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${t}"/><stop offset="1" stop-color="${shade(t,-24)}"/>
  </linearGradient></defs>
  <rect width="120" height="120" rx="20" fill="url(#mt-${id})"/>
  <text x="60" y="76" text-anchor="middle" font-family="Newsreader, Georgia, serif" font-size="52" font-weight="600" fill="#ffffff" opacity=".96">${company.monogram || company.name.slice(0,2).toUpperCase()}</text>
</svg>`;
}

// Darken/lighten a hex color by pct (-100..100).
function shade(hex, pct) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c=>c+c).join("") : h, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = pct / 100;
  const adj = (c) => Math.max(0, Math.min(255, Math.round(c + (f < 0 ? c * f : (255 - c) * f))));
  return `#${((adj(r) << 16) | (adj(g) << 8) | adj(b)).toString(16).padStart(6, "0")}`;
}

// The operating-model diagram: shared platform over lean operating brands.
// (Blueprint: "probably the single most important diagram on the site.")
export function platformDiagram() {
  const caps = ["Finance", "Procurement", "People", "Technology", "Growth", "Operations", "Strategy"];
  const capW = 116, gap = 12, startX = 30;
  const capsSVG = caps.map((c, i) =>
    `<g transform="translate(${startX + i * (capW + gap)},48)">
       <rect width="${capW}" height="44" rx="9" fill="#0c2a3a"/>
       <text x="${capW/2}" y="28" text-anchor="middle" fill="#eaf0f3" font-family="Inter,sans-serif" font-size="15" font-weight="600">${c}</text>
     </g>`).join("");
  const brands = ["Local brand", "Local brand", "Local brand", "Local brand"];
  const brW = 214, brGap = 18, bStartX = 40;
  const brandsSVG = brands.map((b, i) =>
    `<g transform="translate(${bStartX + i * (brW + brGap)},250)">
       <rect width="${brW}" height="88" rx="12" fill="#ffffff" stroke="#d9dee4"/>
       <text x="${brW/2}" y="36" text-anchor="middle" fill="#14425c" font-family="Newsreader,serif" font-size="18" font-weight="600">${b}</text>
       <text x="${brW/2}" y="60" text-anchor="middle" fill="#5a6675" font-family="Inter,sans-serif" font-size="13">Local team · own market</text>
     </g>`).join("");
  const connectors = brands.map((_, i) => {
    const x = bStartX + i * (brW + brGap) + brW / 2;
    return `<path d="M480 180 C480 210 ${x} 210 ${x} 250" fill="none" stroke="#b9c2cb" stroke-width="1.6"/>`;
  }).join("");
  return `<svg class="diagram" viewBox="0 0 960 360" role="img" aria-label="Diagram: the group platform of shared finance, procurement, people, technology, growth, operations and strategy sits above lean local operating brands.">
    <rect x="24" y="20" width="912" height="150" rx="16" fill="#eef3f6" stroke="#dbe3e8"/>
    <text x="40" y="40" fill="#14425c" font-family="Inter,sans-serif" font-size="13" font-weight="700" letter-spacing="1.2">GROUP PLATFORM</text>
    ${capsSVG}
    <text x="40" y="128" fill="#5a6675" font-family="Inter,sans-serif" font-size="13">Shared capability — the functions that benefit from scale.</text>
    ${connectors}
    ${brandsSVG}
  </svg>`;
}

// Capital-allocation flow: shared infrastructure -> lean brands -> cash -> capital allocation.
export function capitalFlowDiagram() {
  const rows = [
    { y: 24,  label: "Shared infrastructure", sub: "Finance · procurement · people · technology", fill: "#0c2a3a", fg: "#eaf0f3" },
    { y: 108, label: "Lean operating brands", sub: "Garage doors · hydraulic · technology", fill: "#14425c", fg: "#eaf0f3" },
    { y: 192, label: "Cash flow", sub: "Generated across the portfolio", fill: "#1a5675", fg: "#eaf0f3" },
    { y: 276, label: "Capital allocation", sub: "Reinvest · acquire · new markets", fill: "#c98a52", fg: "#231a10" },
  ];
  const boxes = rows.map(r =>
    `<g transform="translate(230,${r.y})">
       <rect width="500" height="60" rx="12" fill="${r.fill}"/>
       <text x="250" y="27" text-anchor="middle" fill="${r.fg}" font-family="Newsreader,serif" font-size="19" font-weight="600">${r.label}</text>
       <text x="250" y="46" text-anchor="middle" fill="${r.fg}" opacity=".8" font-family="Inter,sans-serif" font-size="12.5">${r.sub}</text>
     </g>`).join("");
  const arrows = [84, 168, 252].map(y =>
    `<path d="M480 ${y} l0 24" stroke="#9aa6b0" stroke-width="2" marker-end="url(#ar)"/>`).join("");
  return `<svg class="diagram diagram--flow" viewBox="0 0 960 348" role="img" aria-label="Flow: shared infrastructure enables lean operating brands, which generate cash flow, which funds disciplined capital allocation into existing companies, acquisitions and new markets.">
    <defs><marker id="ar" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="#9aa6b0"/></marker></defs>
    ${boxes}
    ${arrows}
  </svg>`;
}

// Understated map cue for the International page (Canada origin -> selected markets).
// Abstract, not a literal political map, and deliberately no flags.
export function reachSVG() {
  return `<svg class="reach" viewBox="0 0 960 300" role="img" aria-label="From our home market in Canada, we study selected markets in Central Asia and the Caucasus.">
    <rect width="960" height="300" fill="#0c2a3a"/>
    <g fill="none" stroke="#1d4b64" stroke-width="1">
      ${Array.from({length:10},(_,i)=>`<path d="M0 ${30+i*28} H960"/>`).join("")}
      ${Array.from({length:16},(_,i)=>`<path d="M${i*64} 0 V300"/>`).join("")}
    </g>
    <g>
      <circle cx="150" cy="150" r="8" fill="#c98a52"/>
      <circle cx="150" cy="150" r="18" fill="none" stroke="#c98a52" stroke-opacity=".5"/>
      <text x="150" y="188" text-anchor="middle" fill="#eaf0f3" font-family="Inter,sans-serif" font-size="13" font-weight="600">Vancouver, Canada</text>
      ${[[720,110,"Central Asia"],[770,175,"The Caucasus"]].map(([x,y,l])=>
        `<circle cx="${x}" cy="${y}" r="6" fill="#7fb0c9"/><text x="${x}" y="${y+26}" text-anchor="middle" fill="#a9bcc7" font-family="Inter,sans-serif" font-size="12.5">${l}</text>`).join("")}
      <path d="M162 146 C420 60 560 60 712 108" fill="none" stroke="#c98a52" stroke-width="1.8" stroke-dasharray="2 7" stroke-linecap="round"/>
      <path d="M164 156 C430 150 590 150 762 172" fill="none" stroke="#7fb0c9" stroke-width="1.6" stroke-dasharray="2 7" stroke-linecap="round"/>
    </g>
  </svg>`;
}
