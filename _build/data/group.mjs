// =============================================================================
// group.mjs — the single source of truth for the parent organization.
//
// The whole site renders from these records. To rename or rebrand the group,
// change ONLY this file (per the research blueprint: "make the name completely
// replaceable"). Nothing else in the codebase hard-codes the name or domain.
// =============================================================================

export const group = {
  // --- Identity (change here to rebrand the entire site) ---------------------
  brandName:   "X Group",
  legalName:   "X Group Holdings Inc.",
  descriptor:  "Canadian operating holding company",
  tagline:     "We build durable businesses.",
  slogan:      "Local brands. Central operating infrastructure. Disciplined capital allocation.",
  positioning: "A Canadian operating group that owns and supports businesses across essential services and technology.",
  heritageYear: 2007,   // earliest operating brand (Steveston); the group was formalized in 2026

  // The four-sentence core positioning (blueprint close):
  creed: [
    "We own and operate businesses.",
    "We centralize the infrastructure that makes them better.",
    "We reinvest capital and operating expertise into new businesses and opportunities.",
    "We are Canadian by origin and selective about where we go next.",
  ],

  // --- Location & registration (placeholders — confirm before launch) --------
  headquarters: "Vancouver, British Columbia, Canada",
  city:         "Vancouver",
  region:       "British Columbia",
  regionCode:   "BC",
  country:      "Canada",
  countryCode:  "CA",
  jurisdiction: "British Columbia, Canada",
  incorporated: "",            // e.g. "2024" — leave blank until verified (blueprint: don't publish unverified)

  // --- Web ------------------------------------------------------------------
  domain:  "xgroupholdings.ca",           // placeholder group domain — change here
  baseUrl: "https://xgroupholdings.ca",    // used for canonicals, sitemap, schema

  // --- Contact architecture (blueprint: expose real business purposes) -------
  phoneDisplay: "(778) 800-0769",
  phoneE164:    "+17788000769",
  emails: {
    general:       "hello@xgroupholdings.ca",
    acquisitions:  "partners@xgroupholdings.ca",
    international:  "international@xgroupholdings.ca",
    procurement:   "procurement@xgroupholdings.ca",
    careers:       "careers@xgroupholdings.ca",
    media:         "media@xgroupholdings.ca",
    governance:    "governance@xgroupholdings.ca",
    privacy:       "privacy@xgroupholdings.ca",
  },

  // --- Social / entity graph (set real URLs before outreach) -----------------
  // `sameAs` feeds schema.org so search engines + AI resolve the Group to ONE
  // confident entity. Add the LinkedIn company page + any registry/Crunchbase
  // URLs here as they exist; the executives' own profiles link to this page.
  linkedin: "",   // e.g. "https://www.linkedin.com/company/x-group-holdings"
  sameAs: [],     // e.g. ["https://www.linkedin.com/company/x-group-holdings"]

  // Sectors the group operates in today
  sectors: ["Essential Services", "Industrial Field Services", "Technology"],
};

// Convenience: an ordered contact directory for the Contact page.
export const contactChannels = [
  { key: "general",      label: "General inquiries",                 email: group.emails.general,      note: "Media, partnerships and anything else." },
  { key: "acquisitions", label: "Business owners & acquisitions",    email: group.emails.acquisitions, note: "Owners considering a long-term home for an established Canadian business." },
  { key: "international", label: "International & government relations", email: group.emails.international, note: "Investment-promotion agencies, technology parks and economic-development organizations." },
  { key: "procurement",  label: "Suppliers & procurement",           email: group.emails.procurement,  note: "Vendors and supply partners across the portfolio." },
  { key: "careers",      label: "Careers",                           email: group.emails.careers,      note: "Group and operating-company roles across British Columbia." },
  { key: "media",        label: "Media",                             email: group.emails.media,        note: "Press and research inquiries." },
];
