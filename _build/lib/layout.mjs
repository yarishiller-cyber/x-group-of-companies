// =============================================================================
// layout.mjs — the page shell: <head>, header, footer, and JSON-LD helpers.
// =============================================================================
import { group, contactChannels } from "../data/group.mjs";
import { primaryNav, footerNav } from "../data/site.mjs";
import { publishedCompanies } from "../data/companies.mjs";
import { markSVG, icon } from "./assets.mjs";

export const ASSET_V = "2"; // bump when CSS/JS change (cache-busting ?v=)

export function esc(s = "") {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const abs = (path) => group.baseUrl + (path === "/" ? "/" : path);
export const ORG_ID = group.baseUrl + "/#organization";
const SITE_ID = group.baseUrl + "/#website";

// ---- <head> ---------------------------------------------------------------
export function head({ title, description, path, ogImage = "/assets/og/x-group-og.png", jsonld = [], preloadImage }) {
  const canonical = abs(path);
  const fullTitle = path === "/"
    ? `${group.brandName} — ${group.descriptor}`
    : `${title} · ${group.brandName}`;
  const jsonldTags = jsonld.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n");
  const preload = preloadImage
    ? `<link rel="preload" as="image" href="${preloadImage}" fetchpriority="high">`
    : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>/* arm scroll-reveal only when JS is on; hard failsafe reveals everything after 2.6s so content can never stay hidden */(function(r){r.className+=" js-anim";setTimeout(function(){r.className+=" reveal-all"},2600)})(document.documentElement);</script>
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="theme-color" content="#0c2a3a">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_CA">
<meta property="og:site_name" content="${esc(group.brandName)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(abs(ogImage))}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(abs(ogImage))}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/css/styles.css?v=${ASSET_V}">
${preload}
${jsonldTags}
</head>`;
}

// ---- Header ---------------------------------------------------------------
function navItem(n, path, mobile) {
  const isActive = (href) => (href === path) || (href !== "/" && href !== "/group" && path.startsWith(href)) || (href === "/group" && (path === "/group"));
  const activeAttr = isActive(n.href) ? ' aria-current="page"' : "";
  if (n.children && n.children.length) {
    if (mobile) {
      const kids = n.children.map(c => `<li class="m-sub"><a href="${c.href}">${esc(c.label)}</a></li>`).join("");
      return `<li class="m-group"><span class="m-group-label">${esc(n.label)}</span><ul>${kids}</ul></li>`;
    }
    const panel = n.children.map(c =>
      `<a role="menuitem" href="${c.href}"><b>${esc(c.label)}</b>${c.desc ? `<span>${esc(c.desc)}</span>` : ""}</a>`).join("");
    const groupActive = n.children.some(c => c.href === path) || path === n.href ? ' data-section-active' : "";
    return `<li class="has-dd"${groupActive}>
      <button class="nav-top" aria-expanded="false" aria-haspopup="true">${esc(n.label)} ${icon("chevron","icon-xs")}</button>
      <div class="dd" role="menu">${panel}</div>
    </li>`;
  }
  return `<li><a href="${n.href}"${activeAttr}>${esc(n.label)}</a></li>`;
}

export function header(path) {
  const desktop = primaryNav.map(n => navItem(n, path, false)).join("");
  const mobile = primaryNav.map(n => navItem(n, path, true)).join("");
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="wrap header-inner">
    <a class="brand" href="/" aria-label="${esc(group.brandName)} home">
      ${markSVG("hdr", 38)}
      <span class="brand-word">${esc(group.brandName)}</span>
    </a>
    <nav class="primary" aria-label="Primary">
      <ul>${desktop}</ul>
    </nav>
    <div class="header-cta">
      <a class="btn btn-solid" href="/contact">Contact</a>
    </div>
    <button class="nav-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile" hidden>
    <ul>${mobile}
      <li class="mobile-cta"><a class="btn btn-solid" href="/contact">Contact the Group</a></li>
    </ul>
  </nav>
</header>`;
}

// ---- Footer ---------------------------------------------------------------
export function footer() {
  const cols = footerNav.map(c => `
    <div class="foot-col">
      <h3>${esc(c.heading)}</h3>
      <ul>${c.links.map(l => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join("")}</ul>
    </div>`).join("");
  const companyLinks = publishedCompanies.map(c =>
    `<a href="${c.website}" rel="noopener" target="_blank">${esc(c.name)} ${icon("ext","icon-xs")}</a>`).join("");
  const year = 2026;
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand brand--foot" href="/" aria-label="${esc(group.brandName)} home">
          ${markSVG("ftr", 40)}
          <span class="brand-word">${esc(group.brandName)}</span>
        </a>
        <p class="foot-desc">${esc(group.descriptor)}.<br>${esc(group.headquarters)}.</p>
        <p class="foot-creed">${esc(group.slogan)}</p>
      </div>
      <div class="foot-cols">${cols}</div>
    </div>
    <div class="foot-companies">
      <span class="foot-companies-label">Our companies</span>
      <div class="foot-companies-list">${companyLinks}</div>
    </div>
    <div class="foot-legal">
      <p>© ${year} ${esc(group.legalName)}. All rights reserved.</p>
      <ul>
        <li><a href="/corporate-information">Corporate information</a></li>
        <li><a href="/governance">Governance</a></li>
        <li><a href="/privacy">Privacy</a></li>
        <li><a href="/terms">Terms</a></li>
        <li><a href="/accessibility">Accessibility</a></li>
        <li><a href="/security">Security</a></li>
      </ul>
    </div>
    <p class="foot-disclaimer">This website is provided for information about ${esc(group.brandName)} and its operating companies. It is not an offer of securities or a solicitation of investment. Figures marked provisional are being verified.</p>
  </div>
</footer>`;
}

// ---- Full page shell ------------------------------------------------------
export function page({ title, description, path, ogImage, jsonld, bodyClass = "", main, preloadImage }) {
  return `${head({ title, description, path, ogImage, jsonld, preloadImage })}
<body class="${bodyClass}">
${header(path)}
<main id="main">
${main}
</main>
${footer()}
<script src="/assets/js/main.js?v=${ASSET_V}" defer></script>
</body>
</html>`;
}

// ---- JSON-LD --------------------------------------------------------------
// The homepage carries the full entity graph: WebSite + the parent Organization
// (with contactPoints + sameAs) + each operating company as a sub-organization.
// Cross-linked by @id so search engines and AI resolve ONE confident entity.
export function siteGraph() {
  const contactPoints = contactChannels.map(ch => ({
    "@type": "ContactPoint",
    contactType: ch.label,
    email: ch.email,
    areaServed: "CA",
    availableLanguage: ["en", "fr"],
  }));
  const subNodes = publishedCompanies.map(c => ({
    "@type": "Organization",
    "@id": c.website + "#organization",
    name: c.name,
    url: c.website,
    areaServed: c.geography,
    parentOrganization: { "@id": ORG_ID },
    disambiguatingDescription: c.relationshipLabel,
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: group.baseUrl + "/",
        name: group.brandName,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-CA",
      },
      {
        "@type": ["Organization", "Corporation"],
        "@id": ORG_ID,
        name: group.legalName,
        alternateName: group.brandName,
        legalName: group.legalName,
        description: group.positioning,
        slogan: group.slogan,
        url: group.baseUrl + "/",
        email: group.emails.general,
        telephone: group.phoneE164,
        foundingLocation: group.headquarters,
        location: { "@type": "Place", address: {
          "@type": "PostalAddress", addressLocality: group.city, addressRegion: group.regionCode, addressCountry: group.countryCode,
        }},
        address: {
          "@type": "PostalAddress",
          addressLocality: group.city, addressRegion: group.regionCode, addressCountry: group.countryCode,
        },
        areaServed: [{ "@type": "Country", name: "Canada" }],
        knowsAbout: group.sectors,
        contactPoint: contactPoints,
        sameAs: group.sameAs && group.sameAs.length ? group.sameAs : undefined,
        subOrganization: publishedCompanies.map(c => ({ "@id": c.website + "#organization" })),
        logo: { "@type": "ImageObject", url: group.baseUrl + "/assets/og/x-group-og.png", width: 1200, height: 630 },
      },
      ...subNodes,
    ],
  };
}
// Backwards-compatible alias.
export const orgGraph = siteGraph;

// A lightweight reference to the parent org, for use inside other page schemas.
export const orgRef = () => ({ "@type": "Organization", "@id": ORG_ID, name: group.legalName, url: group.baseUrl + "/" });

// Person schema for an executive — builds the people↔organization entity graph
// that a LinkedIn profile (via sameAs) later reconciles against.
export function personSchema(exec) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: exec.name,
    jobTitle: exec.title,
    worksFor: { "@id": ORG_ID },
    knowsAbout: exec.areas,
    sameAs: exec.linkedin ? [exec.linkedin] : undefined,
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(p, section, isNews) {
  return {
    "@context": "https://schema.org",
    "@type": isNews ? "NewsArticle" : "Article",
    headline: p.title,
    description: p.summary,
    datePublished: p.date,
    dateModified: p.date,
    articleSection: section,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: group.baseUrl + `/news/${p.slug}`,
  };
}

export function breadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.name,
      item: it.href ? abs(it.href) : undefined,
    })),
  };
}
