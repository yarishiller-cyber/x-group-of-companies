// =============================================================================
// pages.mjs — the redesigned page templates (home, companies, leadership and
// biography pages, insights, founder letter, delegations, the Russian summary,
// operating model, investments, contact, group profile, governance).
//
// Every function receives `ctx`: the data modules plus the layout/partial
// helpers defined in build.mjs (page, esc, icon, pageHero, crumb, ctaBand,
// sectionHead, heroPreload, siteShot, portraitImg …). build.mjs stays the
// single entry point; this file only renders.
// =============================================================================

import { territoryMap, territoryLegend, flywheel as flywheelSVG, reachMap as reachMapSVG, REACH } from "./lib/territory.mjs";
export const flywheel = flywheelSVG;
export const reachMap = reachMapSVG;

const LINKEDIN_ICON = "linkedin";

// ---------------------------------------------------------------- shared bits
export function companyLogo(ctx, c, cls = "co-logo-img") {
  const { esc } = ctx;
  return `<img class="${cls}" src="${c.logo}" alt="${esc(c.name)} logo" loading="lazy" decoding="async">`;
}

export function companyCard(ctx, c) {
  const { esc, icon } = ctx;
  const founded = c.founded ? `<span>${icon("build", "icon-xs")} Founded ${c.founded}</span>` : "";
  const phone = c.phoneDisplay ? `<span>${icon("phone", "icon-xs")} ${esc(c.phoneDisplay)}</span>` : "";
  return `<article class="card co-card" data-reveal>
    <a class="co-logo-wrap" href="/companies/${c.slug}" aria-label="${esc(c.name)} — company profile">${companyLogo(ctx, c)}</a>
    <div class="co-title">
      <h3><a href="/companies/${c.slug}">${esc(c.name)}</a></h3>
      <span class="co-relationship">${esc(c.relationshipLabel)}</span>
    </div>
    <span class="co-sector">${esc(c.category)} · ${esc(c.geography.join(", "))}</span>
    <p>${esc(c.short)}</p>
    <div class="co-meta">${founded}${phone}</div>
    <div class="co-foot">
      <a class="co-visit textlink" href="/companies/${c.slug}">Company profile ${icon("arrow","icon-xs")}</a>
      <a class="textlink" href="${c.website}" target="_blank" rel="noopener">Visit ${icon("ext","icon-xs")}</a>
    </div>
  </article>`;
}

export function logoGrid(ctx, list, { dark = false } = {}) {
  const { esc } = ctx;
  return `<div class="logo-grid${dark ? " logo-grid--dark" : ""}" data-stagger>${list.map(c => `
    <a class="logo-tile" href="/companies/${c.slug}">
      <span class="lg">${companyLogo(ctx, c, "")}</span>
      <b>${esc(c.name)}</b>
      <span>${esc(c.category === "Essential Services" ? c.geography[0].split(",")[0] : c.category)}</span>
    </a>`).join("")}
  </div>`;
}

// Floating portfolio cloud used in the home hero: 12 logo tiles with
// pointer-parallax (main.js sets --px/--py) and a slow idle float (CSS).
export function logoCloud(ctx, list) {
  const { esc } = ctx;
  const jitterX = [0, 1, -1, 2, -2, 1, -1, 2, 0, 1, -2, 0];
  const jitterY = [1, -1, 2, 0, 2, -2, 1, -1, 0, 2, -1, 1];
  const depths  = [0.7, 1.15, 0.55, 1.3, 0.8, 1.05, 0.6, 1.2, 0.9, 1.1, 0.65, 1.25];
  const rots    = [-2, 1.5, -1, 2, -1.5, 1, -2, 1.5, -1, 2, -1.5, 1];
  const tiles = list.slice(0, 12).map((c, i) => {
    const row = Math.floor(i / 3), col = i % 3;
    const x = col * 34 + (row % 2 ? 3 : 0) + jitterX[i];
    const y = row * 24 + jitterY[i];
    return `<a class="cloud-tile" href="/companies/${c.slug}" style="--x:${x}%;--y:${y}%;--d:${depths[i]};--rot:${rots[i]}deg;--delay:${(i * 0.55).toFixed(2)}s" aria-label="${esc(c.name)}"><span class="cloud-inner">${companyLogo(ctx, c, "")}</span></a>`;
  }).join("");
  return `<div class="logo-cloud" data-parallax aria-label="The ${list.length} ${esc(ctx.group.brandName)} companies">${tiles}</div>`;
}

export function peopleClusterHTML(ctx) {
  const { esc, peopleCluster } = ctx;
  const pos = [
    { x: 0,  y: 6,  w: 38, d: 0.8,  rot: -2 },
    { x: 42, y: 0,  w: 30, d: 1.2,  rot: 1.5 },
    { x: 66, y: 24, w: 34, d: 0.6,  rot: -1 },
    { x: 4,  y: 50, w: 34, d: 1.1,  rot: 1.5 },
    { x: 36, y: 38, w: 40, d: 0.9,  rot: -1.5 },
    { x: 62, y: 64, w: 36, d: 1.3,  rot: 1 },
  ];
  return `<div class="people-cluster" data-parallax>${peopleCluster.map((p, i) => {
    const s = pos[i % pos.length];
    return `<figure class="person-tile" style="--x:${s.x}%;--y:${s.y}%;--w:${s.w}%;--d:${s.d};--rot:${s.rot}deg;z-index:${i + 1}"><img src="${p.src}" width="720" height="720" alt="${esc(p.alt)}" loading="lazy" decoding="async"></figure>`;
  }).join("")}</div>`;
}

// The interactive capability map (directive B) — shared by home + operating model.
export function capmapSection(ctx, { eyebrow = "Operating model", title = "Local accountability. Shared capability.", compact = false } = {}) {
  const { essentialBrands } = ctx;
  const caps = ["finance", "procurement", "people", "technology", "growth", "operations", "strategy"];
  const labels = { finance: "Finance", procurement: "Procurement", people: "People", technology: "Technology", growth: "Growth", operations: "Operations", strategy: "Strategy" };
  const matrix = {
    doors: { h: "Garage-door brands", base: `${essentialBrands.length} local brands · Greater Vancouver &amp; Lower Mainland`,
      finance: "One financial standard across all brands", procurement: "Doors, springs and openers bought at scale", people: "Shared recruiting, training and WorkSafeBC compliance",
      technology: "Shared CRM, dispatch and telephony", growth: "Local brand systems, SEO and reputation", operations: "Shared dispatch, process design, field quality", strategy: "Where the next local brand launches" },
    hydraulic: { h: "Hydraulic Hero", base: "Industrial field-service company",
      finance: "Consolidated reporting, budgeting and cash management", procurement: "Hydraulic components, vehicles and fuel at group rates", people: "Field crews staffed through group hiring systems",
      technology: "Same dispatch stack, industrial workflows", growth: "Industrial customer acquisition and analytics", operations: "One-hour response target, group-run dispatch", strategy: "Proof the platform extends beyond doors" },
    allegro: { h: "Allegro X AI", base: "Group technology company",
      finance: "Group-level controls and reporting", procurement: "Shared software licences and vendor leverage", people: "Specialist and technical recruiting support",
      technology: "Builds and runs the Group's technology platform", growth: "Attribution and analytics across the portfolio", operations: "Turns operating data into better systems", strategy: "Core of the international technology thesis" },
  };
  const chips = caps.map(k => `<li><button type="button" class="chip" data-cap="${k}" aria-pressed="false">${labels[k]}</button></li>`).join("");
  const cards = Object.entries(matrix).map(([brand, m]) => `
    <article class="capmap-card" data-brand="${brand}" data-groups="${caps.join(" ")}">
      <h3>${m.h}</h3>
      <p class="capmap-base">${m.base}</p>
      ${caps.map(k => `<p class="capmap-cap" data-for="${k}">${m[k]}</p>`).join("\n      ")}
    </article>`).join("");
  return `
<section class="capmap${compact ? " capmap--compact" : ""}" id="capmap" data-active="">
<div class="wrap">
  <p class="eyebrow">${eyebrow}</p>
  <h2 class="h2">${title}</h2>
  <ul class="capmap-chips" role="list">${chips}</ul>
  <svg class="capmap-wires" aria-hidden="true"></svg>
  <div class="capmap-cards">${cards}
  </div>
  <p class="capmap-live visually-hidden" aria-live="polite"></p>
  <p class="capmap-hint" data-js-only>Hover, tap or focus a capability to see what it does for each company. Press Esc to reset.</p>
  <p class="center measure" style="margin:2rem auto 0;color:var(--ink-soft)">Decentralized customer ownership; centralized administrative leverage. Each brand answers the phone and does the work; the Group carries the overhead that benefits from scale.</p>
</div>
</section>`;
}

const execCardHTML = (ctx, e) => {
  const { esc, icon, hasPortrait, portraitImg, avatar } = ctx;
  const portrait = hasPortrait(e) ? portraitImg(e, "exec-photo") : avatar(e.initials, "L-" + e.slug);
  return `<a class="exec" href="/leadership/${e.slug}" data-reveal>
      ${portrait}
      <div class="exec-body">
        <h3>${esc(e.name)}</h3>
        <p class="exec-role">${esc(e.title)}</p>
        <p class="exec-summary">${esc(e.summary)}</p>
        <div class="exec-areas">${e.areas.map(a => `<span>${esc(a)}</span>`).join("")}</div>
        ${e.firstContact ? `<span class="exec-first">First point of contact for official correspondence</span>` : ""}
        <span class="exec-more">Read biography ${icon("arrow","icon-xs")}</span>
      </div>
    </a>`;
};

// ---------------------------------------------------------------- HOME
export function home(ctx) {
  const { group, publishedCompanies, metrics, investmentModes, principles, executives, newsroom, allegroAngle, founderLetter,
          esc, icon, page, siteGraph, sectionHead, ctaBand, heroes } = ctx;
  const featured = publishedCompanies.filter(c => c.featured);
  const facts = metrics.items.map(m =>
    `<div class="fact"><b>${esc(m.value)}</b><span class="fact-label">${esc(m.label)}</span><span class="fact-note">${esc(m.note)}</span></div>`).join("");
  const modes = investmentModes.map(m => `<div class="mode"><b>${esc(m.verb)}</b><p>${esc(m.body)}</p></div>`).join("");
  const execStrip = executives.slice(0, 4).map(e =>
    `<a class="exec-mini" href="/leadership/${e.slug}">${ctx.hasPortrait(e) ? ctx.portraitImg(e, "exec-avatar") : ctx.avatar(e.initials, "h-" + e.slug)}<div><b>${esc(e.name)}</b><span>${esc(e.shortTitle || e.title)}</span></div></a>`).join("");
  const hero = heroes.home;

  const main = `
<section class="hero hero--cloud">
  <img class="hero-bg" src="/assets/img/heroes/home.webp" width="1600" height="700" alt="${esc(hero.alt)}" loading="eager" fetchpriority="high" decoding="async">
  <div class="wrap hero-inner">
    <div class="hero-copy">
      <p class="eyebrow hero-eyebrow">${esc(group.descriptor)}</p>
      <h1 data-reveal>${esc(group.tagline)}</h1>
      <p class="lead" data-reveal data-reveal-delay="0.08">${esc(group.positioning)} Twelve companies — one technology company, one industrial field-service company and ten local garage-door brands — share one operating platform and one standard of work.</p>
      <div class="hero-actions" data-reveal data-reveal-delay="0.16">
        <a class="btn btn-onDark" href="/companies">Explore our companies ${icon("arrow","icon")}</a>
        <a class="btn btn-lineDark" href="/operating-model">Our operating model</a>
      </div>
    </div>
    <div class="hero-cloud" data-reveal="right" data-reveal-delay="0.1">${logoCloud(ctx, publishedCompanies)}</div>
  </div>
</section>

<section class="factstrip"><div class="wrap">${facts}</div></section>
<p class="factstrip-note">Figures as of ${esc(metrics.asOf)}. ${esc(metrics.hqLine)}.</p>

<section class="section">
  <div class="wrap split split--wide">
    <div data-reveal>
      <p class="eyebrow">What we are</p>
      <h2 class="h2">An operating group, not a brand exercise</h2>
      <p class="lead">A real group emerged because several operating businesses came to share owners, infrastructure, management, purchasing power, technology, dispatch, finance, recruiting and strategy. The parent exists to run that shared machinery well — and to decide where capital goes next.</p>
      <ul class="vlist" style="margin-top:1.4rem">
        ${group.creed.map(s => `<li>${icon("check")}<span>${esc(s)}</span></li>`).join("")}
      </ul>
      <p style="margin-top:1.4rem;font-size:.9rem;color:var(--ink-faint)">The people above work for the Group's companies every day: technicians, dispatchers, owner-operators and the founders who started the brands.</p>
    </div>
    <div data-reveal="right">${peopleClusterHTML(ctx)}</div>
  </div>
</section>

<section class="section section--dark">
  <div class="wrap">
    <p class="eyebrow">${esc(allegroAngle.eyebrow)}</p>
    <h2 class="h2" style="max-width:24ch">${esc(allegroAngle.title)}</h2>
    <p class="lead">${esc(allegroAngle.lead)}</p>
    <div class="angle-grid" data-stagger>
      ${allegroAngle.points.map(p => `<article class="angle">${icon(p.icon)}<h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></article>`).join("")}
    </div>
    <p class="angle-quote" data-reveal>“${esc(allegroAngle.quote)}”</p>
    <p style="margin-top:1.5rem"><a class="btn btn-onDark" href="/companies/allegro-x-ai">Allegro X AI ${icon("arrow","icon")}</a></p>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    ${sectionHead({ eyebrow: "The portfolio", title: "Twelve companies. One platform.", lead: "A technology company, an industrial field-service company and ten local garage-door brands — each with its own name, team and customers, all running on the Group's shared infrastructure." })}
    ${logoGrid(ctx, publishedCompanies)}
    <div class="grid grid-3" data-stagger style="margin-top:2rem">${featured.map(c => companyCard(ctx, c)).join("")}</div>
    <p style="margin-top:1.8rem;display:flex;gap:.8rem 1.6rem;flex-wrap:wrap;align-items:center"><a class="btn btn-ghost" href="/companies">See all ${publishedCompanies.length} companies ${icon("arrow","icon")}</a><a class="textlink" href="/companies#how-they-fit">How twelve companies share one market ${icon("arrow","icon")}</a></p>
  </div>
</section>

${capmapSection(ctx, { compact: true })}

<section class="section section--cool">
  <div class="wrap">
    ${sectionHead({ eyebrow: "What we believe", title: "Principles we run the Group by", center: true })}
    <div class="grid grid-3" data-stagger>
      ${principles.map(p => `<article class="card principle"><div class="p-ico">${icon(p.icon)}</div><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></article>`).join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Investment philosophy", title: "We invest where operating expertise matters", lead: "We evaluate businesses and opportunities where disciplined operations, technology, centralized support and patient ownership can create long-term value." })}
    <div class="modes" data-reveal>${modes}</div>
    <p style="margin-top:1.6rem"><a class="textlink" href="/investments">How we invest — and how to sell us your business ${icon("arrow","icon")}</a></p>
  </div>
</section>

<section class="section section--dark reach" data-hover-group="reach">
  <div class="wrap">
    <div class="split split--wide" style="align-items:end;margin-bottom:1.8rem">
      <div data-reveal>
        <p class="eyebrow">International</p>
        <h2 class="h2">Canadian by origin. Selective about where we go next.</h2>
        <p class="lead">As the Group grows, we evaluate selected international markets where our operating capabilities can be paired with skilled people, strong local partners and supportive business environments. We study before we commit — and we welcome dialogue with investment-promotion agencies and technology parks.</p>
      </div>
      <p style="margin:0;display:flex;gap:.6rem;flex-wrap:wrap;justify-content:flex-end" data-reveal="right"><a class="btn btn-onDark" href="/international">International opportunities ${icon("arrow","icon")}</a> <a class="btn btn-lineDark" href="/delegations">Trade delegations</a></p>
    </div>
    <div class="reach-map-wrap" data-reveal>${reachMapSVG({ compact: true })}</div>
    <p class="reach-note">Markets under study in Central Asia and the Caucasus; Canada is home. Nothing is ranked and no destination has been selected.</p>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Leadership", title: "Operators you can actually meet", lead: "The Group is run by people who have built and operated field-service businesses in British Columbia. Every biography is one click away." })}
    <div class="exec-strip" data-stagger>${execStrip}</div>
    <p style="margin-top:1.6rem"><a class="textlink" href="/leadership">Meet the full leadership team ${icon("arrow","icon")}</a> &nbsp;·&nbsp; <a class="textlink" href="/governance">Board &amp; governance ${icon("arrow","icon")}</a></p>
  </div>
</section>

<section class="section"><div class="wrap"><div class="cta-band cta-band--letter" data-reveal>
  <div><p class="eyebrow">From the founder</p><h2>${esc(founderLetter.title)}</h2><p>${esc(founderLetter.summary)}</p></div>
  <div class="cta-actions"><a class="btn btn-onDark" href="/insights/${founderLetter.slug}">Read the ${founderLetter.year} founder letter ${icon("arrow","icon")}</a><a class="btn btn-lineDark" href="/insights">All insights</a></div>
</div></div></section>

<section class="section section--cool">
  <div class="wrap">
    ${sectionHead({ eyebrow: "Newsroom", title: "Latest from X Group" })}
    <div class="grid grid-3" data-stagger>
      ${newsroom.slice(0, 3).map(n => `<a class="card news-card" href="/news/${n.slug}">
        <span class="news-type">${esc(n.type)} · ${esc(n.dateLabel)}</span>
        <h3>${esc(n.title)}</h3>
        <p>${esc(n.summary)}</p>
        <span class="textlink">Read ${icon("arrow","icon-xs")}</span>
      </a>`).join("")}
    </div>
    <p style="margin-top:1.8rem"><a class="btn btn-ghost" href="/news">Visit the newsroom ${icon("arrow","icon")}</a></p>
  </div>
</section>

${ctaBand({
  title: "Let's talk.",
  body: "Whether you're a homeowner researching one of our brands, a business owner considering a long-term home, a supplier, or an investment-promotion agency — there's a direct line for you.",
  actions: `<a class="btn btn-onDark" href="/contact">Contact the Group ${icon("arrow","icon")}</a>
            <a class="btn btn-lineDark" href="/companies">Our companies</a>`,
})}
`;
  return page({
    title: "Home", path: "/",
    description: `${group.legalName} is a Canadian operating holding company that builds, acquires and supports essential-service, industrial field-service and technology businesses. Twelve companies, one operating platform, based in Vancouver, BC.`,
    jsonld: [siteGraph()],
    preloadImage: "/assets/img/heroes/home.webp",
    alternates: [{ lang: "en", href: "/" }, { lang: "ru", href: "/ru/" }, { lang: "x-default", href: "/" }],
    scripts: ["/assets/js/capmap.js"],
    main,
  });
}

// ---------------------------------------------------------------- COMPANIES (index)
export function companiesPage(ctx) {
  const { group, publishedCompanies, categories, allegroAngle, esc, icon, page, pageHero, heroPreload, crumb, breadcrumb, sectionHead, ctaBand } = ctx;
  const byCat = categories.map(cat => {
    const list = publishedCompanies.filter(c => c.category === cat.key);
    if (!list.length) return "";
    const angle = cat.key === "Technology" ? `<p class="cat-angle">${esc(allegroAngle.companiesNote)}</p>` : "";
    return `<div class="cat-block" data-reveal>
      <div class="cat-head">
        <h2>${esc(cat.key)}</h2>
        <span class="cat-count">${list.length} ${list.length === 1 ? "company" : "companies"}</span>
        <p class="cat-blurb">${esc(cat.blurb)}</p>
      </div>
      ${angle}
      <div class="grid grid-3" data-stagger>${list.map(c => companyCard(ctx, c)).join("")}</div>
    </div>`;
  }).join("");
  const log = [...publishedCompanies].sort((a, b) => a.founded - b.founded).map(c =>
    `<tr><td data-th="Year">${c.founded}</td><td data-th="Company"><a href="/companies/${c.slug}">${esc(c.name)}</a></td><td data-th="Market">${esc(c.geography[0])}</td><td data-th="Note">${esc(c.logNote || c.tagline)}</td></tr>`).join("");

  const main = `
${pageHero("companies", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Companies" }])}
  <p class="eyebrow">Portfolio</p>
  <h1>Our companies</h1>
  <p class="lead">${publishedCompanies.length} companies — the Group's technology company, its industrial field-service company and ten local garage-door brands. Each keeps its own name, team and customers; the Group carries the shared infrastructure.</p>`)}

<section class="section section--alt"><div class="wrap">
  ${sectionHead({ eyebrow: "At a glance", title: "The portfolio in one view" })}
  ${logoGrid(ctx, publishedCompanies)}
</div></section>

${fitSection(ctx)}

<section class="section"><div class="wrap">
  ${byCat}
</div></section>

<section class="section section--cool"><div class="wrap">
  ${sectionHead({ eyebrow: "Acquisition & launch log", title: "How the portfolio was built", lead: "One row per company, in the order each joined the Group — launched on the platform or acquired into it." })}
  <div class="log-wrap" data-reveal><table class="log-table"><thead><tr><th>Year</th><th>Company</th><th>Market</th><th>Note</th></tr></thead><tbody>${log}</tbody></table></div>
  <p class="note" style="margin-top:2rem;font-size:.87rem;color:var(--ink-faint);background:var(--surface);border-left:3px solid var(--brand-line);padding:.9rem 1.1rem;border-radius:0 8px 8px 0;max-width:75ch">Relationship labels are deliberately precise. “Operating brand” means a trade name and website operated under a wholly-owned Group company; “Group operating company” means a company the Group owns and operates; “Group technology company” means the majority-owned technology business that builds and runs the Group's platform. See <a href="/corporate-information">Corporate information</a>.</p>
</div></section>
${ctaBand({ title: "Own an established business?", body: "We consider acquisitions of established Canadian service and trade businesses where the team, customers and reputation deserve a long-term home.",
  actions: `<a class="btn btn-onDark" href="/investments">How we invest ${icon("arrow","icon")}</a><a class="btn btn-lineDark" href="/contact#acquisitions">Talk to us</a>` })}
`;
  return page({ title: "Companies", path: "/companies",
    preloadImage: heroPreload("companies"),
    description: `The ${group.brandName} portfolio: ${publishedCompanies.length} companies across technology, industrial field services and essential home services in British Columbia and Québec.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Companies", href: "/companies" }])], main });
}

// ---------------------------------------------------------------- COMPANY DETAIL
export function companyDetail(ctx, c) {
  const { group, publishedCompanies, allegroAngle, esc, icon, page, crumb, breadcrumb, siteShot, siteShotImg, mail, ctaBand } = ctx;
  const factRows = [
    ["Relationship", esc(c.relationshipLabel)],
    ["Sector", esc(c.category)],
    ["Principal market", esc(c.geography.join(", "))],
    c.founded ? ["Founded", String(c.founded)] : null,
    c.phoneDisplay ? ["Telephone", `<a href="tel:${c.phone}">${esc(c.phoneDisplay)}</a>`] : null,
    ["Website", `<a href="${c.website}" target="_blank" rel="noopener"><span>${esc(c.domain)}</span> ${icon("ext","icon-xs")}</a>`, "wide"],
  ].filter(Boolean).map(([k, v, cls]) => `<div${cls ? ` class="${cls}"` : ""}><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join("");
  const highlights = (c.metrics && c.metrics.length)
    ? `<div class="co-facts-hl"><p class="eyebrow">Highlights</p><dl>${c.metrics.map(m => `<div><dt>${esc(m.label)}</dt><dd>${esc(m.value)}</dd></div>`).join("")}</dl></div>` : "";
  const body = c.long.map(p => `<p>${esc(p)}</p>`).join("");
  const isAllegro = c.slug === "allegro-x-ai";
  const frame = siteShot(c)
    ? `<a class="co-detail-shot" href="${c.website}" target="_blank" rel="noopener" data-reveal="right">
        <span class="co-detail-shot-bar" aria-hidden="true"><i></i><i></i><i></i><em>${esc(c.domain)}</em></span>
        ${siteShotImg(c, "co-detail-shot-img")}
      </a>`
    : `<div class="co-detail-shot" data-reveal="right">
        <span class="co-detail-shot-bar" aria-hidden="true"><i></i><i></i><i></i><em>${esc(c.domain)}</em></span>
        <img class="co-detail-shot-img" src="/assets/img/heroes/allegro.webp" width="1600" height="700" alt="Allegro X AI's engineering studio in Montréal." loading="eager" decoding="async" style="aspect-ratio:16/10;object-fit:cover">
      </div>`;
  const related = publishedCompanies.filter(x => x.slug !== c.slug && (x.category === c.category || c.category !== "Essential Services")).slice(0, 6);
  const allegroSection = isAllegro ? `
<section class="section section--cool"><div class="wrap">
  <div class="split split--wide">
    <div data-reveal>
      <p class="eyebrow">Role in the Group</p>
      <h2 class="h2">${esc(allegroAngle.detailTitle)}</h2>
      ${allegroAngle.detail.map(p => `<p>${esc(p)}</p>`).join("")}
    </div>
    <div data-reveal="right">
      <div class="card">
        <p class="eyebrow" style="margin-bottom:.8rem">What Allegro runs for the Group</p>
        <ul class="service-list">${allegroAngle.services.map(s => `<li>${icon("check")}<span>${esc(s)}</span></li>`).join("")}</ul>
      </div>
    </div>
  </div>
</div></section>` : "";

  const main = `
<section class="page-hero page-hero--detail page-hero--img">
  <img class="page-hero-bg page-hero-bg--blur" src="${siteShot(c) || "/assets/img/heroes/allegro.webp"}" alt="" aria-hidden="true" width="1024" height="640" loading="eager" decoding="async">
  <div class="page-hero-scrim" aria-hidden="true"></div>
  <div class="wrap co-detail-hero">
  <div class="co-detail-main">
    ${crumb([{ name: "Home", href: "/" }, { name: "Companies", href: "/companies" }, { name: c.name }])}
    <div class="co-detail-logo" data-reveal>${companyLogo(ctx, c, "")}</div>
    <span class="co-relationship" style="background:rgba(255,255,255,.14);color:#dbe8ef;margin-top:1.2rem">${esc(c.relationshipLabel)}</span>
    <h1 style="margin-top:.6rem">${esc(c.name)}</h1>
    <p class="lead" style="margin-top:.6rem">${esc(c.tagline)}</p>
  </div>
  ${frame}
</div></section>

<section class="section"><div class="wrap co-layout">
  <div class="co-body" data-reveal>
    <p class="eyebrow">About</p>
    <div class="measure" style="max-width:70ch">${body}</div>
    <p style="margin-top:1.6rem;color:var(--ink-faint);font-size:.9rem">${esc(c.name)} is ${isAllegro ? "the technology company" : "an operating business"} within ${esc(group.brandName)}.</p>
    <p class="eyebrow" style="margin:2.2rem 0 .6rem">Also in the Group</p>
    <div class="co-related">${related.map(x => `<a href="/companies/${x.slug}">${companyLogo(ctx, x, "")}${esc(x.name)}</a>`).join("")}</div>
  </div>
  <aside class="co-aside" data-reveal="right">
    <div class="card co-facts">
      <p class="eyebrow">At a glance</p>
      <dl>${factRows}</dl>
      ${highlights}
      <div class="co-facts-poc">
        <p class="eyebrow" style="margin-bottom:.5rem">Local contact</p>
        <b>${esc(c.poc.name)}</b><span>${esc(c.poc.role)}</span>
        <a class="email" href="mailto:${esc(c.poc.email)}">${esc(c.poc.email)}</a>
      </div>
      <div class="co-facts-actions">
        <a class="btn btn-solid" href="${c.website}" target="_blank" rel="noopener">Visit website ${icon("ext","icon")}</a>
        <a class="btn btn-ghost" href="/companies">All companies</a>
      </div>
    </div>
  </aside>
</div></section>
${allegroSection}
${ctaBand({ title: isAllegro ? "Technology, data and AI for service businesses" : "Working with the Group", body: isAllegro ? "Allegro X AI works with the Group's companies first — and with selected external clients and partners." : "Suppliers, partners and prospective team members can reach the right part of the Group directly.",
  actions: `<a class="btn btn-onDark" href="/contact">Contact the Group ${icon("arrow","icon")}</a><a class="btn btn-lineDark" href="/operating-model">How the platform works</a>` })}
`;
  const ld = {
    "@context": "https://schema.org", "@type": "Organization", name: c.name, url: c.website, logo: group.baseUrl + c.logo,
    telephone: c.phone || undefined, foundingDate: c.founded ? String(c.founded) : undefined,
    parentOrganization: { "@type": "Organization", name: group.legalName, url: group.baseUrl + "/" },
    areaServed: c.geography, disambiguatingDescription: c.relationshipLabel,
  };
  return page({ title: c.name, path: `/companies/${c.slug}`,
    description: `${c.name} — ${c.relationshipLabel} within ${group.brandName}. ${c.short}`,
    jsonld: [ld, breadcrumb([{ name: "Home", href: "/" }, { name: "Companies", href: "/companies" }, { name: c.name, href: `/companies/${c.slug}` }])], main });
}

// ---------------------------------------------------------------- LEADERSHIP
export function leadershipPage(ctx) {
  const { group, executives, governance, esc, icon, page, pageHero, heroPreload, crumb, breadcrumb, personSchema, ctaBand } = ctx;
  const cards = executives.map(e => execCardHTML(ctx, e)).join("");
  const chair = governance.board.seats.find(s => /Chair/.test(s.role));
  const main = `
${pageHero("leadership", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Leadership" }])}
  <p class="eyebrow">Leadership</p>
  <h1>The people who run the Group</h1>
  <p class="lead">X Group is led by an executive team of operators, each accountable for a real function — strategy and capital allocation, operations, finance, technology, people, procurement and corporate development. Every leader has hands-on experience building and running service businesses in Canada.</p>`)}
<section class="section"><div class="wrap">
  <div class="exec-grid" data-stagger>${cards}</div>
  <div class="lead-govern card" data-reveal>
    <div><p class="eyebrow" style="margin-bottom:.4rem">Governance</p><h3 style="font-size:1.15rem">The Board oversees management</h3><p style="margin:.5rem 0 0;color:var(--ink-soft);max-width:60ch">An independent Non-Executive Chair${chair ? ` (${esc(chair.holder)})` : ""}, two independent directors and the Managing Director sit above the executive team, with Audit &amp; Risk, Governance &amp; Nominating and Investment committees.</p></div>
    <a class="btn btn-ghost" href="/governance">Governance &amp; board ${icon("arrow","icon")}</a>
  </div>
</div></section>
${ctaBand({ title: "Talk to the team", body: "For acquisitions, partnerships, international inquiries, media or careers — reach the right person directly.",
  actions: `<a class="btn btn-onDark" href="/contact">Contact the Group ${icon("arrow","icon")}</a><a class="btn btn-lineDark" href="/careers">Careers</a>` })}
`;
  return page({ title: "Leadership", path: "/leadership",
    preloadImage: heroPreload("leadership"),
    description: `Meet the ${group.brandName} leadership team — the executive operators responsible for strategy, finance, operations, technology, people, procurement and corporate development.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Leadership", href: "/leadership" }]), ...executives.map(personSchema)], main });
}

// ---------------------------------------------------------------- EXECUTIVE BIOGRAPHY
export function executivePage(ctx, e) {
  const { group, executives, esc, icon, page, pageHero, heroPreload, crumb, breadcrumb, personSchema, hasPortrait, portraitImg, avatar, ctaBand } = ctx;
  const i = executives.indexOf(e);
  const prev = executives[(i - 1 + executives.length) % executives.length];
  const next = executives[(i + 1) % executives.length];
  const others = executives.filter(x => x.slug !== e.slug);
  const portrait = hasPortrait(e) ? portraitImg(e, "bio-photo") : avatar(e.initials, "B-" + e.slug);
  const facts = [["Role", e.title], ["Based", e.based], ["With the Group", e.joined], ["Education", e.education]].filter(([, v]) => v)
    .map(([k, v]) => `<div><span class="k">${esc(k)}</span><span class="v">${esc(v)}</span></div>`).join("");
  const main = `
${pageHero("leadership", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Leadership", href: "/leadership" }, { name: e.name }])}
  <p class="eyebrow">${esc(e.title)}</p>
  <h1>${esc(e.name)}</h1>
  <p class="lead">${esc(e.summary)}</p>`)}
<section class="section"><div class="wrap bio-layout">
  <aside class="bio-aside" data-reveal>
    <div class="card">
      ${portrait}
      <h2 style="font-size:1.25rem;margin-top:1rem">${esc(e.name)}</h2>
      <p class="exec-role" style="margin-top:.2rem">${esc(e.title)}</p>
      <div class="bio-facts">${facts}</div>
      <div class="exec-areas" style="margin-top:1rem">${e.areas.map(a => `<span>${esc(a)}</span>`).join("")}</div>
      <a class="btn btn-linkedin" href="${e.linkedin}" target="_blank" rel="noopener">${icon(LINKEDIN_ICON, "icon")} View on LinkedIn</a>
      <a class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:.6rem" href="mailto:${group.emails.general}?subject=${encodeURIComponent("For " + e.name)}">${icon("mail","icon")} Contact via the Group</a>
      ${e.firstContact ? `<p class="exec-first" style="display:block;margin-top:1rem">First point of contact for official correspondence</p>` : ""}
    </div>
  </aside>
  <article class="bio-body" data-reveal>
    <p>${esc(e.bio)}</p>
    ${e.longBio.map(p => `<p>${esc(p)}</p>`).join("")}
    <h2>Career highlights</h2>
    <ul class="bio-highlights">${e.highlights.map(h => `<li>${icon("check")}<span>${esc(h)}</span></li>`).join("")}</ul>
    <h2>Responsibilities at the Group</h2>
    <p>${esc(e.name.split(" ")[0])} is accountable for ${e.areas.map(a => a.toLowerCase()).join(", ")} across ${esc(group.brandName)}'s companies and reports to ${e.slug === "adrian-cole" ? "the Board of Directors" : "the Managing Director"}.</p>
    <h2>Also on the leadership team</h2>
    <div class="bio-others">${others.map(o => `<a href="/leadership/${o.slug}">${hasPortrait(o) ? `<img src="${o.photo}" width="34" height="34" alt="" loading="lazy">` : ""}${esc(o.name)}</a>`).join("")}</div>
    <nav class="bio-nav" aria-label="Leadership navigation">
      <a class="textlink" href="/leadership/${prev.slug}">${icon("arrow","icon")} ${esc(prev.name)}</a>
      <a class="textlink" href="/leadership">All leadership</a>
      <a class="textlink" href="/leadership/${next.slug}">${esc(next.name)} ${icon("arrow","icon")}</a>
    </nav>
  </article>
</div></section>
${ctaBand({ title: "Talk to the team", body: "For acquisitions, partnerships, international inquiries, media or careers — reach the right person directly.",
  actions: `<a class="btn btn-onDark" href="/contact">Contact the Group ${icon("arrow","icon")}</a><a class="btn btn-lineDark" href="/leadership">Leadership team</a>` })}
`;
  return page({ title: `${e.name} — ${e.shortTitle || e.title}`, path: `/leadership/${e.slug}`,
    preloadImage: heroPreload("leadership"),
    ogImage: e.photo,
    description: `${e.name}, ${e.title} at ${group.brandName}. ${e.summary}`,
    jsonld: [personSchema(e), breadcrumb([{ name: "Home", href: "/" }, { name: "Leadership", href: "/leadership" }, { name: e.name, href: `/leadership/${e.slug}` }])], main });
}

// ---------------------------------------------------------------- INSIGHTS + FOUNDER LETTER
export function insightsPage(ctx) {
  const { group, founderLetter, newsroom, esc, icon, page, pageHero, heroPreload, crumb, breadcrumb, sectionHead } = ctx;
  const perspectives = newsroom.filter(n => n.type === "Perspective");
  const main = `
${pageHero("insights", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Insights" }])}
  <p class="eyebrow">Insights</p>
  <h1>Founder letters &amp; perspectives</h1>
  <p class="lead">Annual letters from the Group's founder on strategy, operating philosophy and lessons learned building durable Canadian businesses — and shorter perspectives from inside the Group.</p>`)}
<section class="section"><div class="wrap">
  <div class="insight-list">
    <a class="insight insight--featured" href="/insights/${founderLetter.slug}" data-reveal>
      <span class="insight-date">Founder letter<br>${esc(founderLetter.dateLabel)} · ${founderLetter.readMins} min</span>
      <div><h3>${esc(founderLetter.title)}</h3><p>${esc(founderLetter.summary)}</p><span class="insight-more textlink">Read the letter ${icon("arrow","icon-xs")}</span></div>
    </a>
  </div>
  ${sectionHead({ eyebrow: "Perspectives", title: "Shorter pieces from inside the Group", cls: "", })}
  <div class="insight-list">${perspectives.map(n => `<a class="insight" href="/news/${n.slug}" data-reveal>
      <span class="insight-date">${esc(n.dateLabel)}<br>${n.readMins} min</span>
      <div><h3>${esc(n.title)}</h3><p>${esc(n.summary)}</p><span class="insight-more textlink">Read ${icon("arrow","icon-xs")}</span></div>
    </a>`).join("")}</div>
</div></section>
`;
  return page({ title: "Insights", path: "/insights",
    preloadImage: heroPreload("insights"),
    description: `Founder letters and perspectives from ${group.brandName} on building durable Canadian service and technology businesses.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Insights", href: "/insights" }])], main });
}

export function founderLetterPage(ctx) {
  const { group, founderLetter: L, executiveBySlug, esc, icon, page, pageHero, heroPreload, crumb, breadcrumb, articleSchema, hasPortrait } = ctx;
  const author = executiveBySlug[L.authorSlug];
  const sections = L.sections.map(s => `${s.h ? `<h2>${esc(s.h)}</h2>` : ""}${s.paragraphs.map(p => `<p>${esc(p)}</p>`).join("")}`).join("");
  const main = `
${pageHero("insights", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Insights", href: "/insights" }, { name: L.shortTitle }])}
  <p class="eyebrow">Founder letter · ${esc(L.dateLabel)}</p>
  <h1>${esc(L.title)}</h1>
  <p class="lead">${esc(L.summary)}</p>`)}
<section class="section"><div class="wrap">
  <article class="article letter">
    <p class="article-meta">By ${esc(author.name)}, ${esc(author.title)} · ${esc(L.dateLabel)} · ${L.readMins} min read</p>
    ${sections}
    <div class="letter-sign">
      ${hasPortrait(author) ? `<img src="${author.photo}" width="72" height="72" alt="Portrait of ${esc(author.name)}" loading="lazy">` : ""}
      <div>
        <p class="letter-signature">${esc(author.name)}</p>
        <p><b>${esc(author.name)}</b><br>Founder · ${esc(author.title)}<br>${esc(group.legalName)}</p>
        <p style="margin:.6rem 0 0;color:var(--ink-faint);font-size:.9rem">${esc(group.city)}, ${esc(group.region)} · ${esc(L.dateLabel)}</p>
        <a class="textlink" href="/leadership/${author.slug}">About ${esc(author.name.split(" ")[0])} ${icon("arrow","icon-xs")}</a>
      </div>
    </div>
    <p style="margin-top:2rem"><a class="textlink" href="/insights">${icon("arrow","icon-xs")} All insights</a></p>
  </article>
</div></section>
`;
  return page({ title: L.title, path: `/insights/${L.slug}`,
    preloadImage: heroPreload("insights"),
    description: L.summary,
    jsonld: [articleSchema({ title: L.title, slug: L.slug, date: L.date, summary: L.summary, path: `/insights/${L.slug}` }, "Founder letter", false), breadcrumb([{ name: "Home", href: "/" }, { name: "Insights", href: "/insights" }, { name: L.shortTitle, href: `/insights/${L.slug}` }])], main });
}

// ---------------------------------------------------------------- DELEGATIONS
export function delegationsPage(ctx) {
  const { group, executiveBySlug, esc, icon, page, pageHero, heroPreload, crumb, breadcrumb, sectionHead } = ctx;
  const protocol = executiveBySlug["sophie-tremblay"];
  const main = `
${pageHero("delegations", `
  ${crumb([{ name: "Home", href: "/" }, { name: "International", href: "/international" }, { name: "Trade delegations" }])}
  <p class="eyebrow">International operations</p>
  <h1>Trade delegations</h1>
  <p class="lead">${esc(group.brandName)} hosts business delegations and issues IRCC-compliant letters of invitation on official letterhead for qualified foreign visitors to Canada.</p>`)}

<section class="section"><div class="wrap measure">
  <p>We welcome structured visits from business delegations, technology partners, investment agencies and international development organizations. Our letterhead meets Immigration, Refugees and Citizenship Canada (IRCC) standards for letters of invitation supporting visitor-visa applications, and the identity on every letter matches the registered details published in the footer of this site and on the <a href="/corporate-information">Corporate information</a> page.</p>
</div></section>

<section class="section section--cool"><div class="wrap">
  ${sectionHead({ eyebrow: "Official letterhead", title: "What our letters of invitation contain" })}
  <div class="grid grid-2" data-stagger>
    <article class="card" data-reveal><h3 style="font-size:1.1rem">Company registration &amp; details</h3><ul class="bullets" style="color:var(--ink-soft);margin-top:.5rem"><li>Registered legal name: ${esc(group.legalName)}</li><li>Full Canadian business address: ${esc(group.registeredOffice)}</li><li>Company description, sector and headcount</li><li>Year established and incorporation details</li></ul></article>
    <article class="card" data-reveal><h3 style="font-size:1.1rem">Visit details</h3><ul class="bullets" style="color:var(--ink-soft);margin-top:.5rem"><li>Delegation purpose &amp; objectives</li><li>Intended duration of visit</li><li>Cost responsibility &amp; accommodation</li><li>Visitor names &amp; organization</li></ul></article>
    <article class="card" data-reveal><h3 style="font-size:1.1rem">Authorized signatory</h3><ul class="bullets" style="color:var(--ink-soft);margin-top:.5rem"><li>${esc(executiveBySlug["adrian-cole"].name)}, ${esc(executiveBySlug["adrian-cole"].title)}</li><li>Authority to issue invitations on behalf of the Group</li><li>Contact information for verification</li></ul></article>
    <article class="card" data-reveal><h3 style="font-size:1.1rem">Delivery &amp; authenticity</h3><ul class="bullets" style="color:var(--ink-soft);margin-top:.5rem"><li>Two signed originals on letterhead</li><li>IRCC-compliant format &amp; content</li><li>Suitable for visa documentation</li></ul></article>
  </div>
</div></section>

<section class="section"><div class="wrap measure">
  <h2 class="h2" style="margin-bottom:1rem">Typical visit agenda</h2>
  <ul class="bullets bullets-large" style="max-width:65ch">
    <li><b>Facility tours</b> — working visits to our operating companies, service facilities and technology operations in Greater Vancouver.</li>
    <li><b>Technical presentations</b> — briefings on our operating model, service offerings, technology platform and market focus.</li>
    <li><b>Executive meetings</b> — discussions with Group leadership on strategy, partnerships, market entry and investment opportunities.</li>
    <li><b>Memorandum of understanding</b> — negotiation and signature of preliminary collaboration or partnership terms where applicable.</li>
    <li><b>Network &amp; reception</b> — an informal dinner or reception with business partners and relevant counterparts in the Vancouver market.</li>
  </ul>
</div></section>

<section class="section section--dark section--tight"><div class="wrap">
  <h2 class="h2" style="color:#eaf0f3;margin-bottom:1.2rem">Gateway &amp; logistics</h2>
  <div class="grid grid-2">
    <div class="card" style="background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.08)">${icon("pin","icon")}<p style="margin:.6rem 0 0"><b style="color:#eaf0f3">Closest major international airport</b><br><span style="font-size:.95rem;color:#a9bcc7">${esc(group.airport)}; 30–40 minutes from Group facilities across Greater Vancouver.</span></p></div>
    <div class="card" style="background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.08)">${icon("build","icon")}<p style="margin:.6rem 0 0"><b style="color:#eaf0f3">Head office</b><br><span style="font-size:.95rem;color:#a9bcc7">${esc(group.addressLine)} · ${esc(group.officeHours)}</span></p></div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="card" data-reveal style="background:var(--brand-tint);border-color:var(--brand-line)">
    <p class="eyebrow" style="color:var(--brand)">Request a delegation visit or letter of invitation</p>
    <h2 class="h2" style="font-size:var(--t-h3)">Direct contact for protocol &amp; international partnerships</h2>
    <p style="color:var(--ink-soft);max-width:75ch">To arrange a trade-delegation visit, request a letter of invitation for visa documentation, or discuss partnership opportunities during a visit to Canada, contact our international partnerships lead directly.</p>
    <div class="deflist" style="margin:1.4rem 0">
      <dt>Protocol contact</dt><dd><a href="/leadership/${protocol.slug}">${esc(protocol.name)}</a>, ${esc(protocol.title)}</dd>
      <dt>Email</dt><dd><a class="email" href="mailto:${group.emails.international}">${esc(group.emails.international)}</a></dd>
      <dt>Telephone</dt><dd><a href="tel:${group.phoneE164}">+1 778-800-0769</a></dd>
      <dt>Languages</dt><dd>English, French; correspondence in Russian is answered (see <a href="/ru/" hreflang="ru" lang="ru">краткая информация на русском языке</a>)</dd>
    </div>
    <a class="btn btn-solid" href="/contact#international">Request a delegation visit ${icon("arrow","icon")}</a>
    <p style="margin-top:1rem;font-size:.85rem;color:var(--ink-faint)">For security and scheduling, please provide 4–6 weeks' notice for delegation visits.</p>
  </div>
</div></section>

<section class="section section--alt"><div class="wrap">
  <h2 class="h2" style="margin-bottom:1.4rem">Supporting documents</h2>
  <div class="grid grid-2" data-stagger>
    <a href="/group-profile" class="card card-link" data-reveal>
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.8rem">${icon("doc","icon")}<h3 style="margin:0">Group profile (web)</h3></div>
      <p style="margin:0;color:var(--ink-soft);font-size:.9rem">Executive summary, portfolio overview, leadership and corporate facts — a print-friendly one-page overview.</p>
    </a>
    <a href="/assets/docs/x-group-profile.pdf" target="_blank" rel="noopener" class="card card-link" data-reveal>
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.8rem">${icon("doc","icon")}<h3 style="margin:0">Group profile (PDF)</h3></div>
      <p style="margin:0;color:var(--ink-soft);font-size:.9rem">The same profile as a letterhead-formatted PDF for embassies, visa applications and corporate correspondence.</p>
    </a>
  </div>
</div></section>
`;
  return page({ title: "Trade delegations", path: "/delegations",
    preloadImage: heroPreload("delegations"),
    description: `${group.brandName} hosts trade delegations in Vancouver and issues IRCC-compliant letters of invitation on official letterhead. Protocol contact, typical agenda and logistics.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "International", href: "/international" }, { name: "Trade delegations", href: "/delegations" }])], main });
}

// ---------------------------------------------------------------- RUSSIAN SUMMARY (/ru/)
export function ruPage(ctx) {
  const { group, publishedCompanies, metrics, esc, icon, page, pageHero, heroPreload } = ctx;
  const names = publishedCompanies.map(c => c.name).join(", ");
  const main = `
${pageHero("home", `
  <p class="eyebrow">Канадская операционная холдинговая компания</p>
  <h1>Мы строим устойчивые бизнесы.</h1>
  <p class="lead">${esc(group.legalName)} — канадская операционная холдинговая компания, владеющая и управляющая бизнесами в сфере жизненно важных услуг, промышленного выездного сервиса и технологий. Головной офис находится в Ванкувере, Британская Колумбия, Канада.</p>
  <div class="hero-actions" style="margin-top:1.6rem"><a class="btn btn-onDark" href="/" hreflang="en">English website ${icon("arrow","icon")}</a><a class="btn btn-lineDark" href="/delegations" hreflang="en">Trade delegations (EN)</a></div>`)}

<section class="factstrip"><div class="wrap">
  <div class="fact"><b>${esc(metrics.items[0].value)}</b><span class="fact-label">операционных компаний</span><span class="fact-note">технологии, промышленный сервис и жизненно важные услуги</span></div>
  <div class="fact"><b>${esc(metrics.items[1].value)}</b><span class="fact-label">технических специалистов и сотрудников</span><span class="fact-note">в сервисных компаниях Группы и головном офисе</span></div>
  <div class="fact"><b>${esc(metrics.items[2].value)}</b><span class="fact-label">муниципалитетов Британской Колумбии</span><span class="fact-note">в Большом Ванкувере и долине Фрейзер</span></div>
  <div class="fact"><b>С 2007 года</b><span class="fact-label">старейший бренд Группы</span><span class="fact-note">Steveston Garage Doors, Ричмонд</span></div>
</div></section>
<p class="factstrip-note">Данные по состоянию на ноябрь 2026 года.</p>

<section class="section"><div class="wrap measure">
  <h2>О компании</h2>
  <h3 style="margin-top:1.8rem">Структура и направления деятельности</h3>
  <p>${esc(group.legalName)} владеет двенадцатью операционными компаниями в Канаде: технологической компанией Allegro X AI (Монреаль и Ванкувер), промышленной выездной сервисной компанией Hydraulic Hero и десятью местными брендами по ремонту и установке гаражных ворот в Большом Ванкувере. Группа централизует функции, выигрывающие от масштаба, — финансы, закупки, персонал, технологии, маркетинг и стратегию, — а операционные компании сохраняют собственные бренды, команды и отношения с клиентами.</p>
  <h3>Портфель компаний</h3>
  <p>${esc(names)}.</p>
  <h3>Корпоративная информация</h3>
  <dl class="deflist">
    <dt>Юридическое название</dt><dd>${esc(group.legalName)}</dd>
    <dt>Юрисдикция</dt><dd>Британская Колумбия, Канада</dd>
    <dt>Группа оформлена</dt><dd>2026 год (первый бренд основан в 2007 году)</dd>
    <dt>Зарегистрированный офис</dt><dd>${esc(group.registeredOffice)}</dd>
    <dt>Официальная переписка</dt><dd>Adrian Cole, Managing Director &amp; Chief Executive</dd>
  </dl>
  <h3>Соответствие и политики</h3>
  <p>Группа придерживается высоких стандартов корпоративного управления: действуют Кодекс поведения, политика противодействия коррупции и взяточничеству, а также политика соблюдения санкционного режима. Мы ведём деятельность как канадская компания и следуем применимому канадскому законодательству.</p>
  <h3>Международные контакты</h3>
  <p>По вопросам международного сотрудничества, торговых делегаций и партнёрских возможностей свяжитесь с нами:</p>
  <div class="deflist" style="margin:1.2rem 0">
    <dt>Контактное лицо</dt><dd>Sophie Tremblay, Director, Corporate Development &amp; International Partnerships</dd>
    <dt>Электронная почта</dt><dd><a class="email" href="mailto:${group.emails.international}">${esc(group.emails.international)}</a></dd>
    <dt>Телефон</dt><dd><a href="tel:${group.phoneE164}">+1 778-800-0769</a></dd>
    <dt>Адрес</dt><dd>${esc(group.addressLine)}</dd>
    <dt>Веб-сайт</dt><dd><a href="/">${esc(group.domain)}</a></dd>
  </div>
  <p style="margin-top:2rem;padding-top:1.2rem;border-top:1px solid var(--brand-line);color:var(--ink-soft);font-size:.95rem"><b>Важно:</b> мы отвечаем на запросы на русском языке; стандартным языком деловой переписки Группы является английский. Эта страница носит информационный характер; полная информация доступна на английском языке на основном сайте.</p>
</div></section>
`;
  return page({ title: "X Group — краткая информация", path: "/ru/", lang: "ru",
    preloadImage: heroPreload("home"),
    description: `${group.legalName} — канадская операционная холдинговая компания (Ванкувер): технологии, промышленный выездной сервис и жизненно важные услуги. Краткая информация на русском языке.`,
    alternates: [{ lang: "en", href: "/" }, { lang: "ru", href: "/ru/" }, { lang: "x-default", href: "/" }],
    jsonld: [], main });
}

// ---------------------------------------------------------------- OPERATING MODEL
export function operatingModelPage(ctx) {
  const { group, capabilities, portfolioCount, esc, icon, page, pageHero, heroPreload, crumb, breadcrumb, sectionHead, ctaBand } = ctx;
  const caps = capabilities.map(c => `<article class="card cap" data-reveal>${icon(c.icon)}<h3>${esc(c.title)}</h3><p>${esc(c.body)}</p></article>`).join("");
  const main = `
${pageHero("operating-model", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Operating model" }])}
  <p class="eyebrow">Operating model</p>
  <h1>Local accountability. Shared capability.</h1>
  <p class="lead">Our companies retain their customer relationships, specialist teams and market identities. The Group provides centralized infrastructure — and that is precisely why the parent exists.</p>`)}

${capmapSection(ctx, { eyebrow: "Interactive map", title: "What each capability does for each company" })}

<section class="section section--alt"><div class="wrap">
  ${sectionHead({ eyebrow: "Group capabilities", title: "Seven capabilities we run centrally" })}
  <div class="grid grid-3" data-stagger>${caps}</div>
</div></section>

<section class="section"><div class="wrap split split--wide">
  <div data-reveal>
    <p class="eyebrow">Why it works</p>
    <h2 class="h2">Lower overhead. Better execution. Better data.</h2>
    <p>A single garage-door brand does not need its own finance department, procurement function or technology stack. It needs to answer the phone, show up and do excellent work. Everything else is overhead a shared platform can carry better and cheaper.</p>
    <p>When one platform sits beneath many lean brands, advantages compound: lower overhead per brand, more consistent execution, and far better data — patterns visible across markets that no single brand could see. That data flows back into scheduling, pricing, marketing and the decision about what to build or buy next. Allegro X AI, the Group's technology company, is the team that builds and runs that platform.</p>
  </div>
  <div data-reveal="right">${flywheelSVG()}</div>
</div></section>

<section class="section section--cool"><div class="wrap">
  ${sectionHead({ eyebrow: "One market, twelve companies", title: "How the brands share Greater Vancouver without competing", lead: "Territory brands own a town; specialty brands do a different job metro-wide; audience brands speak to different customers. One dispatch desk routes every lead to exactly one truck." })}
  <p><a class="btn btn-solid" href="/companies#how-they-fit">See the territory map ${icon("arrow","icon")}</a></p>
</div></section>

${ctaBand({ title: "See the portfolio the model supports", body: `${portfolioCount} companies across three sectors, all running on the same shared infrastructure.`,
  actions: `<a class="btn btn-onDark" href="/companies">Our companies ${icon("arrow","icon")}</a><a class="btn btn-lineDark" href="/investments">Investment philosophy</a>` })}
`;
  return page({ title: "Operating model", path: "/operating-model",
    preloadImage: heroPreload("operating-model"),
    scripts: ["/assets/js/capmap.js"],
    description: `How ${group.brandName} works: a shared platform of finance, procurement, people, technology, growth, operations and strategy beneath lean local operating brands.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Operating model", href: "/operating-model" }])], main });
}

// ---------------------------------------------------------------- INVESTMENTS (incl. sell-your-business)
export function investmentsPage(ctx) {
  const { group, investmentModes, executiveBySlug, esc, icon, page, pageHero, heroPreload, crumb, breadcrumb, sectionHead, ctaBand } = ctx;
  const sophie = executiveBySlug["sophie-tremblay"];
  const modes = investmentModes.map(m => `<div class="mode"><b>${esc(m.verb)}</b><p>${esc(m.body)}</p></div>`).join("");
  const steps = [
    ["First call", "A confidential conversation about your business, your situation and whether there is a fit. No forms, and no NDA unless you want one."],
    ["Site visit", "We visit to meet your team, see the operation and understand how you work — systems, customer relationships and culture."],
    ["Simple offer", "Based on what we learn, we make an offer: a straightforward number we will stand behind, not a term sheet full of conditions."],
    ["30–60 day close", "Diligence and legal work move quickly because we have done this before. We close on time and we do not renegotiate after an offer is made."],
    ["Your name stays on the trucks", "Your brand keeps its name and identity. Your team stays. You choose whether to stay involved or step back."],
  ].map(([h, p], i) => `<li class="tl-item"><div class="tl-year">${i + 1}</div><div class="tl-body"><h3>${h}</h3><p>${p}</p></div></li>`).join("");
  const rows = [["Ownership structure", "Customer relationships & reputation"], ["Financial & accounting systems", "Local team & management"], ["Back-office procurement", "Brand name & local presence"], ["Technology infrastructure", "Service standards & pricing"], ["Insurance, payroll & compliance", "Day-to-day operational independence"]]
    .map(([a, b]) => `<tr><td data-th="What changes">${esc(a)}</td><td data-th="What stays the same">${esc(b)}</td></tr>`).join("");
  const main = `
${pageHero("investments", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Investments" }])}
  <p class="eyebrow">Investments</p>
  <h1>We are operators first</h1>
  <p class="lead">We are interested in businesses where ownership, operating discipline and shared infrastructure can create value over a long time horizon.</p>`)}

<section class="section"><div class="wrap">
  <div class="modes" data-reveal>${modes}</div>
</div></section>

<section class="section section--cool" id="sell-your-business"><div class="wrap">
  ${sectionHead({ eyebrow: "Sell your business", title: "Is your business the right fit?", lead: "We acquire service and trade businesses that have built real customer relationships and strong reputations. If your business ticks these boxes, we want to talk." })}
  <div class="card" style="margin-bottom:2.2rem;max-width:680px" data-reveal>
    <h3 style="margin-bottom:1.1rem">Acquisition criteria</h3>
    <dl class="deflist">
      <dt>Business type</dt><dd>Trade or service business — essential home services, industrial field services, specialized B2B services</dd>
      <dt>Location</dt><dd>Lower Mainland, British Columbia (selectively, elsewhere in Western Canada)</dd>
      <dt>Revenue</dt><dd>$1 million – $15 million in annual revenue</dd>
      <dt>Owner situation</dt><dd>Owner planning to retire, or to stay and transition over time</dd>
      <dt>What we value</dt><dd>Established customer base, strong reputation, trained team, systems you have built</dd>
    </dl>
  </div>
  <h3 style="margin-bottom:.4rem">Five-step process</h3>
  <p style="color:var(--ink-soft);margin-bottom:1.6rem">We move deliberately. Here is how we work with business owners.</p>
  <ol class="timeline" data-stagger style="margin-bottom:2.4rem">${steps}</ol>
  <h3 style="margin-bottom:.4rem">What changes, what stays the same</h3>
  <p style="color:var(--ink-soft);margin-bottom:1rem">The transition is designed to be clean and stable for customers and employees.</p>
  <div class="log-wrap" data-reveal style="margin-bottom:2.2rem"><table class="log-table"><thead><tr><th>What changes</th><th>What stays the same</th></tr></thead><tbody>${rows}</tbody></table></div>
  <div class="card" style="background:var(--surface)" data-reveal>
    <h3 style="margin-bottom:.6rem">Direct contact</h3>
    <p style="margin:0 0 .4rem"><b>${esc(sophie.name)}</b>, ${esc(sophie.title)} — <a class="email" href="mailto:${group.emails.acquisitions}">${esc(group.emails.acquisitions)}</a> · <a href="tel:${group.phoneE164}">+1 778-800-0769</a></p>
    <p style="color:var(--ink-soft);margin:.6rem 0 0;font-size:.92rem">We respond within two business days. Conversations are confidential and non-binding.</p>
  </div>
</div></section>

<section class="section"><div class="wrap split split--wide">
  <div data-reveal>
    <p class="eyebrow">Our areas of interest</p>
    <h2 class="h2">Where our capabilities give us an advantage</h2>
    <p>Essential services, industrial and field services, specialized B2B services, technology-enabled operations and adjacent categories where our existing platform provides an edge.</p>
    <p style="color:var(--ink-faint);font-size:.92rem">We do not describe ourselves as a private-equity firm, fund or institutional investor. We are an operator-led group that deploys its own capital and operating expertise, and we publish figures only once we can stand behind them.</p>
  </div>
  <ul class="vlist" data-reveal="right">
    <li>${icon("build")}<span><b>Essential &amp; home services</b> — the category we know best.</span></li>
    <li>${icon("gear")}<span><b>Industrial &amp; field services</b> — mission-critical, mobile, recurring.</span></li>
    <li>${icon("cpu")}<span><b>Technology-enabled operations</b> — software and applied AI that scale service.</span></li>
    <li>${icon("hand")}<span><b>Adjacent B2B services</b> — where shared infrastructure lowers cost to serve.</span></li>
  </ul>
</div></section>

${ctaBand({ title: "Considering a long-term home for your business?", body: "We move deliberately and we keep our word. Start a confidential conversation.",
  actions: `<a class="btn btn-onDark" href="/contact#acquisitions">Business owners &amp; acquisitions ${icon("arrow","icon")}</a>` })}
`;
  return page({ title: "Investments & selling your business", path: "/investments",
    preloadImage: heroPreload("investments"),
    description: `${group.brandName} acquires, builds and partners with durable Canadian service businesses. Acquisition criteria, our five-step process, and a direct contact for owners considering a sale.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Investments", href: "/investments" }])], main });
}

// ---------------------------------------------------------------- CONTACT
export function contactPage(ctx) {
  const { group, contactChannels, esc, icon, page, pageHero, heroPreload, crumb, breadcrumb, mail } = ctx;
  const channels = contactChannels.map(ch => `<article class="channel" id="${ch.key}" data-reveal>
      <h3>${icon("mail")}${esc(ch.label)}</h3>
      <p>${esc(ch.note)}</p>
      ${mail(ch.email)}
    </article>`).join("");
  const main = `
${pageHero("contact", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Contact" }])}
  <p class="eyebrow">Contact</p>
  <h1>The right line for every purpose</h1>
  <p class="lead">We route inquiries to the part of the Group that actually handles them — not a single anonymous inbox.</p>`)}
<section class="section"><div class="wrap">
  <div class="channels" data-stagger>${channels}</div>
  <div class="card office" data-reveal>
    <div>
      <p class="eyebrow" style="margin-bottom:.8rem">Head office</p>
      <p class="office-line"><b>${esc(group.legalName)}</b><br>${esc(group.address.suite)} – ${esc(group.address.street)}<br>${esc(group.address.city)}, ${esc(group.address.region)} ${esc(group.address.postal)}, ${esc(group.address.country)}</p>
      <p class="office-meta">${icon("clock","icon-xs")} ${esc(group.officeHours)}<br>${icon("pin","icon-xs")} ${esc(group.airport)}</p>
    </div>
    <div class="office-actions">
      <a class="btn btn-ghost" href="tel:${group.phoneE164}">${icon("phone","icon")} +1 778-800-0769</a>
      <a class="btn btn-solid" href="mailto:${group.emails.general}">${icon("mail","icon")} ${esc(group.emails.general)}</a>
      <a class="btn btn-ghost" href="/delegations">Visiting delegations ${icon("arrow","icon")}</a>
    </div>
  </div>
</div></section>
`;
  return page({ title: "Contact", path: "/contact",
    preloadImage: heroPreload("contact"),
    description: `Contact ${group.brandName} — direct lines for general inquiries, business owners and acquisitions, international and government relations, suppliers, careers and media. Head office: ${group.addressLine}.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }])], main });
}

// ---------------------------------------------------------------- GROUP PROFILE (printable)
export function groupProfilePage(ctx) {
  const { group, publishedCompanies, executives, governance, metrics, esc, icon, page, pageHero, heroPreload, crumb, breadcrumb, mail } = ctx;
  const facts = metrics.items.map(m => `<div class="cell"><div class="k">${esc(m.label)}</div><div class="v">${esc(m.value)}</div></div>`).join("");
  const list = publishedCompanies.map(c => `<li><b>${esc(c.name)}</b> — <span style="color:var(--ink-soft)">${esc(c.relationshipLabel)}, ${esc(c.category)}, ${esc(c.geography.join(", "))}, founded ${c.founded}</span></li>`).join("");
  const execList = executives.map(e => `<li><b>${esc(e.name)}</b> — ${esc(e.title)}</li>`).join("");
  const board = governance.board.seats.map(s => `<li><b>${esc(s.holder)}</b> — ${esc(s.role)} (${esc(s.kind)})</li>`).join("");
  const main = `
${pageHero("group-profile", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Group profile" }])}
  <p class="eyebrow">One-page overview</p>
  <h1>Group profile</h1>
  <p class="lead">A concise overview of ${esc(group.legalName)} — the page to share with a bank, a lawyer, a counterparty or an investment agency.</p>
  <p style="margin-top:1rem;display:flex;gap:.6rem;flex-wrap:wrap"><a class="btn btn-onDark" href="/assets/docs/x-group-profile.pdf" target="_blank" rel="noopener">${icon("doc","icon")} Download PDF</a><a class="btn btn-lineDark" href="javascript:window.print()">Print this page</a></p>`)}
<section class="section"><div class="wrap" style="max-width:860px">
  <div class="doc">
    <h2 style="margin-top:0">Who we are</h2>
    <p>${esc(group.legalName)} (“${esc(group.brandName)}”) is a ${esc(group.descriptor)} headquartered in Vancouver, British Columbia. We build, acquire and support businesses across technology, industrial field services and essential home services. Local brands, central operating infrastructure, disciplined capital allocation.</p>
    <h2>At a glance</h2>
    <div class="co-detail-meta" style="margin-top:.5rem">${facts}</div>
    <p style="font-size:.85rem;color:var(--ink-faint)">Figures as of ${esc(metrics.asOf)}.</p>
    <h2>Corporate details</h2>
    <dl class="deflist">
      <dt>Legal name</dt><dd>${esc(group.legalName)}</dd>
      <dt>Jurisdiction</dt><dd>${esc(group.jurisdiction)}</dd>
      <dt>Formalized as a group</dt><dd>2026 (first operating brand established 2007)</dd>
      <dt>Registered &amp; head office</dt><dd>${esc(group.registeredOffice)}</dd>
      <dt>Fiscal year end</dt><dd>${esc(group.fiscalYearEnd)}</dd>
      <dt>Official correspondence</dt><dd>Adrian Cole, Managing Director &amp; Chief Executive</dd>
    </dl>
    <h2>Operating model</h2>
    <p>Centralized group services — finance, procurement, people, technology, growth, operations and strategy — support lean operating companies that keep their own customers, teams and local identity. Allegro X AI, the Group's technology company, builds and runs the shared platform.</p>
    <h2>Portfolio</h2>
    <ul class="bullets" style="list-style:none">${list}</ul>
    <h2>Leadership</h2>
    <ul class="bullets" style="list-style:none">${execList}</ul>
    <h2>Board of Directors</h2>
    <ul class="bullets" style="list-style:none">${board}</ul>
    <h2>International interests</h2>
    <p>Shared services, technology and AI operations, operating partnerships, acquisitions and specialized field services in selected markets. We engage investment-promotion agencies and technology parks as a Canadian company conducting genuine exploratory diligence, following our anti-bribery and sanctions policies.</p>
    <h2>Contact</h2>
    <div class="deflist">
      <dt>General</dt><dd>${mail(group.emails.general)}</dd>
      <dt>Acquisitions</dt><dd>${mail(group.emails.acquisitions)}</dd>
      <dt>International</dt><dd>${mail(group.emails.international)}</dd>
      <dt>Telephone</dt><dd>+1 778-800-0769</dd>
      <dt>Head office</dt><dd>${esc(group.addressLine)}</dd>
      <dt>Web</dt><dd><a href="/">${esc(group.domain)}</a></dd>
    </div>
    <p class="note">Profile last reviewed ${esc(metrics.asOf)}. This document is provided for information about ${esc(group.brandName)} and its operating companies; it is not an offer of securities or a solicitation of investment.</p>
  </div>
</div></section>
`;
  return page({ title: "Group profile", path: "/group-profile",
    preloadImage: heroPreload("group-profile"),
    description: `A one-page overview of ${group.legalName}: who we are, corporate details, operating model, portfolio, leadership, board, international interests and contacts.`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Group profile", href: "/group-profile" }])], main });
}

// ---------------------------------------------------------------- GOVERNANCE
export function governancePage(ctx) {
  const { group, governance, esc, icon, page, pageHero, heroPreload, crumb, breadcrumb, sectionHead } = ctx;
  const seats = governance.board.seats.map(s =>
    `<div class="seat"><div class="seat-role">${esc(s.role)}</div><div class="seat-holder"><b>${esc(s.holder)}</b>${s.bio ? ` — ${esc(s.bio)}` : ""}</div><span class="seat-kind">${esc(s.kind)}</span></div>`).join("");
  const committees = governance.committees.map(c =>
    `<article class="card" data-reveal><h3 style="font-size:1.08rem">${esc(c.name)}</h3><p style="margin:.5rem 0 0;color:var(--ink-soft);font-size:.95rem">${esc(c.body)}</p></article>`).join("");
  const principlesList = governance.principles.map(p => `<li>${icon("check")}<span>${esc(p)}</span></li>`).join("");
  const policies = governance.policies.map(p => `<a class="policy-link" href="${p.href}">${icon("doc","icon")}<span>${esc(p.label)}</span>${icon("arrow","icon-xs")}</a>`).join("");
  const resp = governance.responsibility.map(r => `<article class="card" data-reveal><h3 style="font-size:1.02rem">${esc(r.title)}</h3><p style="margin:.35rem 0 0;color:var(--ink-soft);font-size:.92rem">${esc(r.body)}</p></article>`).join("");
  const main = `
${pageHero("governance", `
  ${crumb([{ name: "Home", href: "/" }, { name: "Governance" }])}
  <p class="eyebrow">Governance</p>
  <h1>Corporate governance</h1>
  <p class="lead">${esc(governance.intro)}</p>`)}

<section class="section"><div class="wrap split split--wide">
  <div data-reveal>
    <p class="eyebrow">Board of Directors</p>
    <h2 class="h2">Oversight, separate from management</h2>
    <p>${esc(governance.board.note)}</p>
    <ul class="vlist" style="margin-top:1.3rem">${principlesList}</ul>
  </div>
  <div class="board" data-reveal="right">${seats}</div>
</div></section>

<section class="section section--alt"><div class="wrap">
  ${sectionHead({ eyebrow: "Committees", title: "Three standing committees" })}
  <div class="grid grid-3" data-stagger>${committees}</div>
</div></section>

<section class="section"><div class="wrap">
  ${sectionHead({ eyebrow: "Responsibility", title: "How we operate responsibly" })}
  <div class="grid grid-4" data-stagger>${resp}</div>
</div></section>

<section class="section section--cool"><div class="wrap">
  ${sectionHead({ eyebrow: "Policies", title: "Our published policy framework", lead: "Summaries are published here; full policies are provided to counterparties on request." })}
  <div class="policy-grid" data-stagger>${policies}</div>
</div></section>
`;
  return page({ title: "Governance", path: "/governance",
    preloadImage: heroPreload("governance"),
    description: `${group.brandName}'s corporate governance — Board of Directors, Audit & Risk, Governance & Nominating and Investment committees, and a published policy framework (Code of Conduct, anti-bribery, sanctions).`,
    jsonld: [breadcrumb([{ name: "Home", href: "/" }, { name: "Governance", href: "/governance" }])], main });
}

// ---------------------------------------------------------------- HOW THE COMPANIES FIT TOGETHER
export function fitSection(ctx, { heading = true } = {}) {
  const { publishedCompanies, esc, icon, sectionHead } = ctx;
  const bySlug = Object.fromEntries(publishedCompanies.map(c => [c.slug, c]));
  const rules = [
    { icon: "pin", title: "Territory brands", body: "A town, a brand, a crew. Steveston owns Richmond; West Vancouver owns the North Shore; Kitsilano owns the West Side; Pitt Meadows and Maple Ridge each own their own town. Nobody drives into another brand's territory — the dispatch desk will not book it." },
    { icon: "gear", title: "Specialty brands", body: "Metro-wide, but a different job. New Garage Doors Vancouver installs new doors and openers only and hands every repair call to the local brand. YVR Garage Door Springs does one thing — springs — across sixteen cities. Hydraulic Hero serves industrial and commercial equipment everywhere, a market the door brands never touch." },
    { icon: "people", title: "Audience brands", body: "Three metro-wide repair brands that speak to different customers: Probably Fine for the value-conscious homeowner, Good Enough for the straight-talk, honest-pricing buyer, and Sketchy for the person who has been burned before and wants the anti-scam promise. Different front doors, one calendar, no double-booking." },
  ];
  const flows = [
    ["Referrals", "Repair brands send new-door jobs to New Garage Doors; it sends repairs back to the territory brand; spring-only calls go to YVR."],
    ["One dispatch desk", "Every lead is routed to exactly one company by postal code, service type and brand — territories are enforced in the system, not by goodwill."],
    ["Shared parts & fleet", "One Richmond depot, one parts catalogue, one fleet and fuel program behind every truck."],
    ["One platform", "Allegro X AI runs the websites, CRM, dispatch and phones for all twelve, so the Group learns from every call at once."],
  ];
  return `
<section class="section section--dark" id="how-they-fit"><div class="wrap">
  ${heading ? sectionHead({ eyebrow: "How they fit together", title: "Twelve companies, one market, no stepped-on toes", lead: "Every lead in Greater Vancouver goes to exactly one truck. The brands are separated by territory, by specialty, or by the kind of customer they speak to — and one shared dispatch desk, running on Allegro's platform, routes each call to the right company." }) : ""}
  <div class="tmap" data-hover-group="territory">
    <div class="tmap-map" data-reveal>${territoryMap(bySlug)}</div>
    <div class="tmap-side" data-reveal="right">${territoryLegend(bySlug)}</div>
  </div>
  <div class="grid grid-3 fit-rules" data-stagger>
    ${rules.map(r => `<article class="angle">${icon(r.icon)}<h3>${esc(r.title)}</h3><p>${esc(r.body)}</p></article>`).join("")}
  </div>
  <div class="fit-flows" data-reveal>
    <p class="eyebrow" style="margin-bottom:.8rem">What flows between them</p>
    <dl class="fit-dl">${flows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
  </div>
</div></section>`;
}

// ---------------------------------------------------------------- INTERNATIONAL REACH (world map)
export function reachSection(ctx, { withMarkets = false } = {}) {
  const { international, esc, icon } = ctx;
  const cards = withMarkets ? international.markets.map(m => {
    const iso = (REACH.markets.find(r => r.country === m.country) || {}).iso || "";
    return `<article class="market" data-key="${iso}"><h3>${icon("pin")}${esc(m.country)}</h3><p>${esc(m.note)}</p></article>`;
  }).join("") : "";
  return `
<section class="section section--dark section--tight reach" data-hover-group="reach"><div class="wrap">
  <div class="reach-head">
    <div><p class="eyebrow">Where we look</p><h2 class="h2">From Vancouver to Central Asia and the Caucasus</h2></div>
    <ul class="reach-key" role="list">
      <li><span class="rk rk-home"></span>Home market — Canada</li>
      <li><span class="rk rk-market"></span>Markets under study</li>
      <li><span class="rk rk-arc"></span>Exploratory diligence, no destination selected</li>
    </ul>
  </div>
  <div class="reach-map-wrap" data-reveal>${reachMapSVG()}</div>
  <p class="reach-note">Six markets across two regions, studied through their investment-promotion agencies and technology parks. Russia and Belarus are excluded from the program under the Group's sanctions policy; markets are not ranked.</p>
  ${withMarkets ? `<div class="markets reach-markets" data-stagger>${cards}</div>` : ""}
</div></section>`;
}

export { REACH };
