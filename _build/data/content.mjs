// =============================================================================
// content.mjs — structured page content: metrics, operating model, investment
// philosophy, international program, and insights.
// =============================================================================

// --- Conservative fact strip (blueprint: only counts we can defend) ----------
// No fabricated revenue / employee / job counts. "As of" date reads institutional.
export const metrics = {
  asOf: "August 2026",
  items: [
    { value: "12",   label: "Operating brands",         note: "Across essential and industrial field services" },
    { value: "3",    label: "Sectors",                  note: "Essential services · industrial · technology" },
    { value: "20+",  label: "BC communities served",    note: "Across Greater Vancouver & the Lower Mainland" },
    { value: "Since 2007", label: "Longest-running brand", note: "Steveston Garage Doors, Richmond BC" },
  ],
  // Additional honest markers (used on /group)
  hqLine: "Headquartered in Vancouver, British Columbia",
};

// --- The seven group capabilities (Operating Model page) ----------------------
export const capabilities = [
  { key: "finance",     title: "Finance & Accounting", icon: "chart",
    body: "Financial controls, consolidated reporting, budgeting and the administrative infrastructure that lets many small brands run to one disciplined standard." },
  { key: "procurement", title: "Procurement", icon: "box",
    body: "Group purchasing, vendor relationships and supply-chain coordination — doors, springs, motors, hydraulic components, vehicles, telecom, software and insurance, bought at scale." },
  { key: "people",      title: "People", icon: "people",
    body: "Recruiting, workforce planning, training and organizational support, plus a shared approach to safety culture and WorkSafeBC compliance." },
  { key: "technology",  title: "Technology & Data", icon: "cpu",
    body: "Core business systems, CRM and dispatch, telephony, cybersecurity, automation, data and applied AI — with Allegro X AI as the Group's technology centre of gravity." },
  { key: "growth",      title: "Growth", icon: "trend",
    body: "Digital platforms, customer acquisition, brand systems, reputation and analytics — while each operating brand keeps its own local personality." },
  { key: "operations",  title: "Operations", icon: "gear",
    body: "Shared dispatch, process design, field quality and performance improvement across residential, commercial and industrial work." },
  { key: "strategy",    title: "Strategy & Capital", icon: "compass",
    body: "Long-term planning, business development, acquisitions and capital allocation — the decisions about where retained cash and operating expertise go next." },
];

// --- Investment philosophy (Investments page) ---------------------------------
export const investmentModes = [
  { verb: "Acquire", body: "Established Canadian businesses where the existing team, customers and reputation deserve a long-term home." },
  { verb: "Build",   body: "New operating businesses adjacent to our existing capabilities, launched on the Group's shared platform." },
  { verb: "Partner", body: "Joint ventures and strategic relationships with qualified operators." },
  { verb: "Expand",  body: "Selected international markets where talent, demand and operating conditions create a compelling reason to establish a presence." },
];

export const investmentAudiences = [
  { title: "Business owners",
    body: "We consider acquisitions of established Canadian businesses where the existing team, customers and reputation deserve a long-term home — not a flip.",
    cta: { label: "Talk to us about your business", emailKey: "acquisitions" } },
  { title: "Entrepreneurs & partners",
    body: "We consider joint ventures and new businesses where our operating platform — finance, procurement, people, technology and dispatch — can accelerate execution.",
    cta: { label: "Propose a partnership", emailKey: "acquisitions" } },
  { title: "Governments & economic-development organizations",
    body: "We evaluate selected jurisdictions for operating investments, service centres, technology operations and strategic partnerships. We welcome dialogue with investment-promotion agencies, technology parks and regional economic-development organizations.",
    cta: { label: "Government & partnership inquiries", emailKey: "international" } },
];

// --- International program (International page) --------------------------------
// Presented deliberately WITHOUT a public ranking or a "chosen" country. Facts
// about each agency are drawn from the research blueprint (public mandates).
export const international = {
  intro: [
    "Our home market is Canada. As the Group grows, we evaluate selected international markets where our operating capabilities can be paired with skilled people, strong local partners and supportive business environments.",
    "We approach international expansion deliberately. Before entering a market, we study its talent base, regulatory framework, operating costs, infrastructure, customer opportunity, technology ecosystem and long-term alignment with our businesses.",
  ],
  evaluateAreas: [
    { title: "Shared services & business operations", body: "Finance, customer operations, technology, data and other functions supporting our portfolio." },
    { title: "Technology & AI", body: "Engineering, applied AI, software and technology-enabled service delivery." },
    { title: "Operating partnerships", body: "Joint ventures with qualified local operators." },
    { title: "Acquisitions", body: "Established businesses where the Group can contribute operating expertise and long-term capital." },
    { title: "Specialized field services", body: "Opportunities adjacent to our Canadian industrial and essential-service experience." },
  ],
  // Markets under study — Central Asia & the Caucasus (Russia/Belarus deliberately
  // excluded per sanctions guidance; no public ranking).
  region: "Central Asia & the Caucasus",
  markets: [
    { country: "Uzbekistan", note: "A national investment-promotion agency operating as a one-stop shop for foreign investors, and an IT Park actively courting international technology operations through soft-landing programmes." },
    { country: "Kazakhstan", note: "A mature national investor agency (KAZAKH INVEST) offering full-cycle investor support, plus Astana Hub for qualified technology companies." },
    { country: "Kyrgyzstan", note: "A presidential National Investment Agency with a single-window mechanism, alongside an export-oriented High Technology Park regime." },
    { country: "Azerbaijan", note: "A single-window FDI-promotion agency focused on diversified, non-oil investment." },
    { country: "Georgia",    note: "An established FDI-promotion ecosystem and regional business positioning." },
    { country: "Armenia",    note: "A technology-talent angle under continued diligence." },
  ],
  agencyTopics: [
    "market-entry requirements", "skilled-workforce availability", "operating locations",
    "investment incentives", "local partnerships", "technology ecosystems",
    "business establishment", "supplier networks",
  ],
  canadaNote: "We conduct this work as a Canadian company — engaging Canada's Trade Commissioner Service and following the Group's sanctions-screening and anti-bribery policies at every step.",
};

// --- Insights (thought-leadership stubs) --------------------------------------
export const insights = [
  {
    slug: "why-an-operating-holding-company",
    title: "Why we built an operating holding company",
    date: "2026-08-12",
    dateLabel: "August 2026",
    readMins: 4,
    summary: "A group emerged because several operating businesses now share owners, infrastructure and management. Here is the thesis behind the parent — and what it is deliberately not.",
    body: [
      "X Group did not begin as a plan to look large. It began the way most groups do: several operating businesses ended up sharing owners, systems, purchasing power and the people who make strategic decisions. At some point the machinery behind the individual brands — recruiting, dispatch, accounting, procurement, technology — became more valuable than any single brand. Formalizing that machinery as a holding company is a conventional, well-understood step.",
      "Our model is deliberately more centralized than a classic decentralized holding company. Customer relationships, local teams and brand identities stay with the operating companies. The capabilities that benefit from scale move to the Group: finance, procurement, people, technology, growth, operations and, above all, strategy and capital allocation.",
      "The result is a simple thesis — local brands, central operating infrastructure, disciplined capital allocation. It is strong enough that we do not need to pretend to be anything bigger than we are.",
    ],
  },
  {
    slug: "local-brands-central-infrastructure",
    title: "Local brands, central infrastructure",
    date: "2026-08-05",
    dateLabel: "August 2026",
    readMins: 3,
    summary: "The economic case for a lean operating brand sitting on top of shared services — lower overhead, better execution, better data.",
    body: [
      "A garage-door brand in one town does not need its own finance department, its own procurement function or its own technology stack. It needs to answer the phone, show up, and do excellent work. Everything else is overhead that a shared platform can carry better and cheaper.",
      "When shared infrastructure sits underneath many lean operating brands, three things compound: lower overhead per brand, more consistent execution, and far better data — because the Group can see patterns across markets that no single brand could. That data flows back into scheduling, pricing, marketing and the decision about which business to build or buy next.",
      "It is not a glamorous idea. It is a durable one.",
    ],
  },
  {
    slug: "how-we-evaluate-new-markets",
    title: "How we evaluate a new market",
    date: "2026-07-28",
    dateLabel: "July 2026",
    readMins: 4,
    summary: "Our approach to international market development: study first, commit later, and never construct a story to induce a decision.",
    body: [
      "We are operators first. When we look at a new market — in Canada or abroad — we study its talent base, regulatory framework, operating costs, infrastructure, customer opportunity and technology ecosystem before anyone commits capital. Most of the time the honest answer is 'not yet,' and that is a perfectly good answer.",
      "Internationally, that means engaging the organizations built for exactly this conversation — national investment-promotion agencies, technology parks and economic-development bodies — as a Canadian company conducting genuine exploratory diligence. We tell every market the same true thing: we are studying, we have not chosen, and we would like to understand what a first-stage project would actually involve.",
      "We hold ourselves to a clear line: never construct a false investment story to induce a government to provide travel, benefits or advantage. A real exploratory process, documented and compliant, is both the right thing and the more persuasive one.",
    ],
  },
];
