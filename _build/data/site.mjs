// =============================================================================
// site.mjs — navigation, footer structure, and the compliance/legal page bodies.
// =============================================================================

// Primary navigation (blueprint recommended set).
export const primaryNav = [
  { label: "Group",           href: "/group" },
  { label: "Companies",       href: "/companies" },
  { label: "Operating Model", href: "/operating-model" },
  { label: "Investments",     href: "/investments" },
  { label: "International",    href: "/international" },
  { label: "Leadership",      href: "/leadership" },
  { label: "Insights",        href: "/insights" },
  { label: "Contact",         href: "/contact" },
];

export const footerNav = [
  {
    heading: "Organization",
    links: [
      { label: "The Group",       href: "/group" },
      { label: "Operating model", href: "/operating-model" },
      { label: "Leadership",      href: "/leadership" },
      { label: "Insights",        href: "/insights" },
    ],
  },
  {
    heading: "Portfolio",
    links: [
      { label: "Our companies",   href: "/companies" },
      { label: "Investments",     href: "/investments" },
      { label: "International",    href: "/international" },
      { label: "Group profile",   href: "/group-profile" },
    ],
  },
  {
    heading: "Corporate",
    links: [
      { label: "Corporate information", href: "/corporate-information" },
      { label: "Code of conduct",       href: "/code-of-conduct" },
      { label: "Anti-bribery & corruption", href: "/anti-bribery" },
      { label: "Sanctions compliance",  href: "/sanctions" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Contact the Group",  href: "/contact" },
      { label: "Business owners",    href: "/contact#acquisitions" },
      { label: "International",       href: "/contact#international" },
      { label: "Careers",            href: "/contact#careers" },
    ],
  },
];

// -----------------------------------------------------------------------------
// Compliance / legal / corporate pages. Body is an array of blocks:
//   { h: "Heading" }            -> section subheading
//   { p: "paragraph" }          -> paragraph
//   { list: ["item", ...] }     -> bullet list
//   { note: "small print" }     -> muted note
// -----------------------------------------------------------------------------

export const corporatePages = {
  "corporate-information": {
    title: "Corporate information",
    lead: "Key facts about the organization, kept deliberately precise. Fields shown as “to be confirmed” are placeholders that will be completed with verified registry information before any formal outreach.",
    blocks: [
      { h: "The organization" },
      { defs: [
        ["Public brand name", "X Group"],
        ["Legal name", "X Group Holdings Inc. (to be confirmed)"],
        ["Descriptor", "Canadian operating holding company"],
        ["Jurisdiction", "British Columbia, Canada"],
        ["Head office", "Vancouver, British Columbia, Canada"],
        ["Year established", "To be confirmed"],
        ["Business registration", "To be confirmed"],
      ]},
      { h: "Portfolio relationship terminology" },
      { p: "The Group describes its relationship to each business precisely rather than labelling everything a “subsidiary.” We use the following terms:" },
      { list: [
        "Wholly-owned operating company — a company the Group owns outright and operates.",
        "Majority-owned company — a company in which the Group holds a controlling interest.",
        "Operating brand — a trade name and website operated under a Group company.",
        "Joint venture — a business jointly owned with a partner.",
        "Strategic investment / technology affiliate — a business the Group is invested in or partnered with, but does not wholly own.",
      ]},
      { p: "Each company's relationship label is shown on its portfolio page." },
      { h: "Governance & policy" },
      { p: "The Group maintains a Code of Conduct, an Anti-Bribery & Corruption Policy, an International Engagement Policy and a Sanctions Compliance Policy. Summaries are published on this site; full policies are available to counterparties on request." },
      { h: "Contacts" },
      { defs: [
        ["Governance", "governance@xgroupholdings.ca"],
        ["Privacy", "privacy@xgroupholdings.ca"],
        ["Media", "media@xgroupholdings.ca"],
      ]},
      { note: "This page is informational and will be updated as corporate records are finalized. It does not constitute an offer of securities or investment." },
    ],
  },

  "code-of-conduct": {
    title: "Code of conduct",
    lead: "How we expect everyone who works for or with the Group to behave. A short summary of the full policy.",
    blocks: [
      { p: "The Group and its operating companies are held to a single standard of conduct, regardless of brand or market." },
      { h: "Our commitments" },
      { list: [
        "Honesty with customers — accurate pricing, honest scopes of work, and no bait-and-switch across any brand.",
        "Safety first — every technician works to WorkSafeBC standards; nobody is asked to cut a safety corner to save time.",
        "Respect — a workplace free of harassment and discrimination, for employees, contractors, suppliers and customers.",
        "Integrity in records — accurate books, invoices and reporting across every operating company.",
        "Compliance — we obey the law in every jurisdiction we operate in, and we ask our partners to do the same.",
        "Confidentiality — we protect customer, employee and partner information.",
      ]},
      { h: "Raising concerns" },
      { p: "Anyone may raise a concern about conduct, safety or compliance without fear of retaliation. Concerns can be directed to governance@xgroupholdings.ca." },
      { note: "This is a public summary. The complete Code of Conduct is maintained internally and provided to counterparties on request." },
    ],
  },

  "anti-bribery": {
    title: "Anti-bribery & corruption policy",
    lead: "Especially relevant because our work includes dialogue with government and economic-development organizations in Canada and abroad.",
    blocks: [
      { p: "The Group prohibits bribery and corruption in all forms. As a Canadian company, we operate consistently with Canada's Corruption of Foreign Public Officials Act, which criminalizes bribery of foreign public officials to obtain or retain a business advantage." },
      { h: "International engagement policy" },
      { p: "When engaging with government bodies, investment-promotion agencies or officials — in Canada or abroad — the Group applies the following rules:" },
      { list: [
        "No payments to public officials except lawful, documented fees.",
        "No facilitation payments.",
        "Gifts above a defined modest threshold require prior approval.",
        "Government-provided hospitality is documented.",
        "Government-paid travel requires a written invitation and internal review before acceptance.",
        "No cash equivalents.",
        "No unofficial intermediaries claiming political access.",
        "Sanctions screening before engaging counterparties or making payments.",
        "All material government interactions are logged.",
      ]},
      { h: "A clear line" },
      { p: "We will never construct a false investment story to induce a government to provide travel, benefits or advantage. We conduct genuine exploratory investment processes; if an agency elects to invite or host a delegation within its lawful programme, we document the invitation and evaluate it under this policy." },
      { note: "This is a public summary. The complete policy is maintained internally and provided to counterparties on request." },
    ],
  },

  "sanctions": {
    title: "Sanctions compliance policy",
    lead: "How we screen markets, partners and payments — built into our international program from day one.",
    blocks: [
      { p: "The Group screens counterparties, markets and payments against applicable sanctions before engaging. As a Canadian company we have regard to Canada's autonomous sanctions regimes and the Consolidated Canadian Autonomous Sanctions List." },
      { h: "How this shapes our international work" },
      { list: [
        "We focus our international market development on Central Asia, the Caucasus and selected emerging markets.",
        "We do not treat sanctioned jurisdictions — including Russia and Belarus — as ordinary market-entry targets, and we would not proceed with any such engagement without Canadian sanctions counsel.",
        "Counterparties are screened against the Consolidated Canadian Autonomous Sanctions List before we contract or transact.",
        "Sanctions screening is a precondition of any payment or partnership, not an afterthought.",
      ]},
      { note: "This is a public summary. Sanctions screening is a legal function; the Group takes professional advice before acting in any restricted context." },
    ],
  },

  "privacy": {
    title: "Privacy policy",
    lead: "How X Group handles the limited personal information collected through this website.",
    blocks: [
      { p: "This website is an informational corporate site. We collect only the information you choose to send us — for example, when you email one of our contact addresses." },
      { h: "What we collect" },
      { list: [
        "Contact details and message content you send us by email.",
        "Standard, aggregated server logs (such as IP address and browser type) used to keep the site secure and reliable.",
      ]},
      { h: "How we use it" },
      { list: [
        "To respond to your inquiry and, where relevant, route it to the correct part of the Group.",
        "To operate, secure and improve this website.",
      ]},
      { p: "We do not sell personal information. We do not run advertising trackers on this site. Information you send is shared only within the Group and its advisers as needed to respond to you." },
      { h: "Your choices" },
      { p: "To ask what information we hold, or to request its correction or deletion, contact privacy@xgroupholdings.ca." },
      { note: "This policy will be updated as the organization's practices and legal obligations are finalized." },
    ],
  },

  "terms": {
    title: "Website terms",
    lead: "The terms on which this website is provided.",
    blocks: [
      { p: "This website is provided for general information about X Group and its operating companies. It does not constitute an offer of securities, a solicitation of investment, or professional advice." },
      { h: "Accuracy" },
      { p: "We take care to keep information accurate and current, and we flag figures that are still being verified. Some details on this site are placeholders that will be replaced with verified information; where a value is marked “to be confirmed,” it should be treated as provisional." },
      { h: "Third-party sites" },
      { p: "Links to our operating companies' websites and to external organizations are provided for convenience. The Group is not responsible for the content of external sites." },
      { h: "Trademarks" },
      { p: "Brand names and logos of the Group's operating companies are the property of their respective owners within the Group." },
      { note: "Contact governance@xgroupholdings.ca with any questions about these terms." },
    ],
  },
};
