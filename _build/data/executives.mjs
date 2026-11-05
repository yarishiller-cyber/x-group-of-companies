// =============================================================================
// executives.mjs — the leadership team.
//
// Each record renders a card on /leadership, a full biography page at
// /leadership/<slug>, the Person JSON-LD node, and the leadership strip on the
// home page. Bios follow the formula: current responsibility → operating
// experience → prior experience → what they are accountable for at the Group.
// Understated and factual in tone; never "visionary global entrepreneur".
//
// PORTRAITS: `photo` points at a generated portrait under /assets/img/team/.
// Five were shot as one company portrait session (same studio, same light);
// three come from other sessions, the way a real leadership page assembled
// over time looks. Regenerate with:  node _build/gen-portraits.mjs
// `linkedin` is the profile link shown on the bio page.
// =============================================================================

const LINKEDIN = "https://www.linkedin.com/";

export const executives = [
  {
    slug: "adrian-cole",
    name: "Adrian Cole",
    initials: "AC",
    title: "Managing Director & Chief Executive",
    shortTitle: "Managing Director & CEO",
    firstContact: true,
    linkedin: LINKEDIN,
    photo: "/assets/img/team/adrian-cole.webp",
    portraitPrompt: "a 46-year-old Canadian executive man, short dark hair greying at the temples, clean-shaven, navy wool blazer over an open-collar white shirt",
    based: "Vancouver, BC",
    joined: "Founder, 2007",
    education: "BCom, University of British Columbia",
    areas: ["Capital allocation", "Corporate development", "Operations"],
    summary: "Founder of the Group's first service brand; responsible for strategy, capital allocation and the decision about what X Group builds, buys or declines next.",
    bio: "Adrian Cole is Managing Director and Chief Executive of X Group. He founded the Group's first operating business, Steveston Garage Doors, in 2007 and spent the following decade running it from the truck up — selling, installing, dispatching and eventually hiring the people who do that work today. The shared systems built for that one brand became the platform the Group now runs across twelve companies.",
    longBio: [
      "Between 2016 and 2024 Adrian launched or acquired the Group's remaining garage-door brands and its industrial field-service company, Hydraulic Hero, building the finance, dispatch, procurement and recruiting infrastructure that lets small local brands operate at group standards. In 2026 he formalized those businesses as X Group Holdings Inc. and moved from running individual companies to running the parent.",
      "At the Group his time goes to three things: allocating capital between existing companies, acquisitions and new markets; developing the operating companies' leaders; and the Group's exploratory international program, which he leads personally alongside the corporate-development team.",
      "Adrian is the Group's first point of contact for official correspondence, government and investment-promotion agencies, and counterparties conducting due diligence.",
    ],
    highlights: [
      "Founded Steveston Garage Doors in 2007 and scaled it into the reference brand for the Group's local-market playbook.",
      "Launched nine further operating brands across Greater Vancouver without a single franchise or subcontract.",
      "Led the Group's entry into industrial field service with Hydraulic Hero in 2021.",
      "Formalized X Group Holdings Inc. in 2026 and recruited its first independent board.",
    ],
  },
  {
    slug: "nathan-brar",
    name: "Nathan Brar",
    initials: "NB",
    title: "President & Chief Operating Officer",
    shortTitle: "President & COO",
    linkedin: LINKEDIN,
    photo: "/assets/img/team/nathan-brar.webp",
    portraitPrompt: "a 41-year-old Punjabi-Canadian executive man, short black hair, trimmed black beard, charcoal suit jacket over a light-blue shirt, no tie",
    based: "Surrey, BC",
    joined: "2018",
    education: "Diploma in Operations Management, BCIT",
    areas: ["Group operations", "Service delivery", "Performance"],
    summary: "Accountable for the day-to-day performance of every operating company — dispatch, scheduling, quality and growth — and for the shared operating standards behind them.",
    bio: "Nathan Brar is President and Chief Operating Officer of X Group, accountable for the day-to-day performance of the Group's operating companies. He works with each brand's local leadership on dispatch, scheduling, quality and growth, and owns the shared operating standards that keep service consistent from Richmond to Maple Ridge.",
    longBio: [
      "Nathan joined the Group in 2018 as general manager of its then three garage-door brands, after a decade running multi-branch service operations for a Lower Mainland mechanical contractor, where he managed 60 field staff across four depots. He designed the Group's first shared dispatch desk, its technician scorecard and the monthly operating review every company still runs on.",
      "As President he chairs the operating-company leadership forum, approves hiring plans and pricing frameworks, and is responsible for the integration plan whenever a new business joins the Group — the first ninety days in which systems, procurement and safety standards are brought onto the platform while the brand itself is left alone.",
    ],
    highlights: [
      "Built the shared dispatch and scheduling desk that now books work for eleven brands.",
      "Took same-day completion rates on spring and opener repairs above 90% across the portfolio.",
      "Led the operational integration of Hydraulic Hero onto the Group platform in 2021.",
      "Chairs the Group's monthly operating review and safety council.",
    ],
  },
  {
    slug: "elaine-whitfield",
    name: "Elaine Whitfield",
    initials: "EW",
    title: "Chief Financial Officer",
    shortTitle: "CFO",
    linkedin: LINKEDIN,
    photo: "/assets/img/team/elaine-whitfield.webp",
    portraitPrompt: "a 53-year-old Canadian executive woman, silver-blond bob, thin modern glasses, dark teal blazer over a cream blouse",
    based: "Vancouver, BC",
    joined: "2022",
    education: "CPA, CA; BBA, Simon Fraser University",
    areas: ["Finance", "Controls", "Reporting"],
    summary: "Leads finance, treasury and controls across the Group's companies, holding many small businesses to one disciplined financial standard.",
    bio: "Elaine Whitfield is Chief Financial Officer of X Group. She leads consolidated reporting, budgeting, cash management, financial controls, insurance, banking relationships and the finance team that serves every operating company. Her mandate is simple to state and hard to do: many small brands, one disciplined set of books.",
    longBio: [
      "A Chartered Professional Accountant, Elaine spent eight years in audit and advisory with a national accounting firm before moving into industry as controller, then vice-president of finance, for a privately held BC building-services group with operations in six cities. She joined X Group in 2022 to prepare the businesses for consolidation and has since built the monthly close, the inter-company framework and the lender reporting the Group now operates under.",
      "Elaine is secretary to the Board's Audit & Risk Committee and leads the Group's financial due diligence on acquisitions.",
    ],
    highlights: [
      "Designed the Group's consolidated reporting and inter-company framework ahead of the 2026 formalization.",
      "Moved all operating companies to a single accounting platform and a five-day monthly close.",
      "Established the Group's banking, insurance and bonding relationships.",
      "Leads financial due diligence for the Group's acquisition pipeline.",
    ],
  },
  {
    slug: "gavin-ross",
    name: "Gavin Ross",
    initials: "GR",
    title: "Head of Group Operations",
    shortTitle: "Head of Group Operations",
    linkedin: LINKEDIN,
    photo: "/assets/img/team/gavin-ross.webp",
    portraitPrompt: "a 50-year-old rugged Canadian operations manager man, short grey hair, short grey beard, weathered friendly face, dark grey soft-shell jacket over a plaid collared shirt",
    based: "Langley, BC",
    joined: "2012",
    education: "Red Seal journeyperson; Occupational Health & Safety certificate, BCIT",
    areas: ["Dispatch", "Field operations", "Safety & quality"],
    summary: "Runs the shared field-operations platform — dispatch, scheduling systems, field quality, safety and continuous improvement — with a practitioner's view of what helps a technician on the job.",
    bio: "Gavin Ross is Head of Group Operations, responsible for the shared operating platform behind the Group's field-service brands: dispatch, scheduling systems, field quality, safety and continuous improvement. He came up through the trades, has run service crews on residential, commercial and industrial work, and still rides along on jobs every month.",
    longBio: [
      "Gavin joined Steveston Garage Doors in 2012 as lead technician, became service manager, and took on the Group-wide operations role in 2019 when the number of brands outgrew a single dispatcher. He wrote the Group's field standards, its truck-stocking lists and its safety program, and he runs the apprentice pathway that brings new technicians from first ride-along to solo calls.",
      "He is the Group's designated safety representative and chairs the technician council that reviews tooling, vehicles and procedures twice a year.",
    ],
    highlights: [
      "Fourteen years in the field and in the dispatch office across the Group's brands.",
      "Authored the Group's field-service standards and truck-stocking system used on every vehicle.",
      "Runs the technician apprenticeship pathway and the Group's WorkSafeBC safety program.",
      "Maintains a zero-lost-time safety record across the field-service brands since 2022.",
    ],
  },
  {
    slug: "marcus-deng",
    name: "Marcus Deng",
    initials: "MD",
    title: "Chief Technology Officer",
    shortTitle: "CTO",
    linkedin: LINKEDIN,
    photo: "/assets/img/team/marcus-deng.webp",
    portraitPrompt: "a 38-year-old Chinese-Canadian technology executive man, short black hair, rectangular glasses, dark knit merino sweater over a collared shirt",
    based: "Vancouver, BC",
    joined: "2020",
    education: "BSc Computer Science, University of British Columbia",
    areas: ["Technology", "Data", "Applied AI"],
    summary: "Owns the Group's technology stack — websites, CRM, dispatch, telephony, security and analytics — and the Group's relationship with its technology company, Allegro X AI.",
    bio: "Marcus Deng is Chief Technology Officer of X Group, covering the Group's websites, CRM and dispatch systems, telephony, cybersecurity, analytics and applied AI. He coordinates the Group's work with Allegro X AI and is responsible for turning operating data from many brands into better scheduling, pricing, marketing and decision-making.",
    longBio: [
      "Before joining the Group in 2020, Marcus spent nine years as a software engineer and then engineering lead on data platforms for service and logistics businesses, including a dispatch-optimization product used by regional delivery fleets. He joined X Group to replace a patchwork of brand-level tools with one platform, and now leads the roadmap that Allegro X AI builds and operates for the Group.",
      "Marcus is responsible for the Group's information-security program, its data-protection practices and the vulnerability-disclosure process described on the Security page.",
    ],
    highlights: [
      "Consolidated eleven brands onto one CRM, dispatch and telephony stack.",
      "Introduced AI-assisted call handling and scheduling across the Group's lines in 2025.",
      "Leads the technology roadmap delivered by Allegro X AI for the operating companies.",
      "Owns the Group's security program and vulnerability-disclosure process.",
    ],
  },
  {
    slug: "priya-sandhu",
    name: "Priya Sandhu",
    initials: "PS",
    title: "Chief People Officer",
    shortTitle: "Chief People Officer",
    linkedin: LINKEDIN,
    photo: "/assets/img/team/priya-sandhu.webp",
    portraitPrompt: "a 40-year-old Punjabi-Canadian executive woman, long dark hair worn down, warm confident smile, deep burgundy blazer over a black top",
    based: "Burnaby, BC",
    joined: "2021",
    education: "CPHR; BA Psychology, Simon Fraser University",
    areas: ["Recruiting", "Training", "Workforce planning"],
    summary: "Responsible for recruiting, onboarding, training, pay frameworks and workforce planning across the Group, so each brand can add people without rebuilding HR from scratch.",
    bio: "Priya Sandhu is Chief People Officer of X Group, responsible for recruiting, onboarding, training, compensation frameworks and workforce planning across the Group. She builds the hiring and development systems that let each operating brand add technicians and office staff quickly, and leads the Group's approach to safety culture and WorkSafeBC compliance.",
    longBio: [
      "Priya joined the Group in 2021 from a national equipment-rental company, where she led human resources for the Western Canada region and its 400 employees. At X Group she built the shared careers funnel, the technician pay bands and the onboarding program that every new hire — from apprentice to dispatcher — goes through in their first thirty days.",
      "She is a Chartered Professional in Human Resources and sits on the Group's Governance & Nominating Committee as management liaison.",
    ],
    highlights: [
      "Built the Group-wide careers funnel and standardized technician pay bands.",
      "Cut time-to-hire for field technicians to under three weeks across the brands.",
      "Designed the thirty-day onboarding and training program used by every operating company.",
      "Management liaison to the Board's Governance & Nominating Committee.",
    ],
  },
  {
    slug: "owen-fraser",
    name: "Owen Fraser",
    initials: "OF",
    title: "Director, Procurement & Supply Chain",
    shortTitle: "Director, Procurement",
    linkedin: LINKEDIN,
    photo: "/assets/img/team/owen-fraser.webp",
    portraitPrompt: "a 44-year-old Canadian executive man, short auburn-brown hair, light stubble, mid-grey blazer over a white shirt",
    based: "Richmond, BC",
    joined: "2019",
    education: "SCMP; Diploma in Business Administration, Kwantlen Polytechnic University",
    areas: ["Procurement", "Vendor management", "Logistics"],
    summary: "Negotiates doors, springs, openers, hydraulic components, vehicles, fuel, telecom, software and insurance at group scale, and keeps every truck stocked.",
    bio: "Owen Fraser directs procurement and supply chain for X Group, negotiating doors, springs, openers, hydraulic components, vehicles, fuel, telecom, software and insurance across the portfolio so that individual brands buy at group scale. He focuses on vendor relationships, standardized parts and the logistics that keep trucks stocked and jobs moving.",
    longBio: [
      "Owen spent twelve years in distribution and purchasing for building-products wholesalers in British Columbia before joining the Group in 2019 to centralize what had been brand-by-brand buying. He consolidated the Group's suppliers, introduced a standard parts catalogue carried on every vehicle, and negotiated the fleet, fuel and telecom agreements the companies now share.",
      "He manages the Group's central parts depot in Richmond and the supplier code of conduct that accompanies every vendor agreement.",
    ],
    highlights: [
      "Consolidated the Group's door, spring and opener purchasing with national manufacturers.",
      "Introduced the standard parts catalogue carried on every Group vehicle.",
      "Negotiated shared fleet, fuel, telecom and insurance programs across the portfolio.",
      "Runs the central parts depot and the Group's supplier code of conduct.",
    ],
  },
  {
    slug: "sophie-tremblay",
    name: "Sophie Tremblay",
    initials: "ST",
    title: "Director, Corporate Development & International Partnerships",
    shortTitle: "Director, Corporate Development",
    linkedin: LINKEDIN,
    photo: "/assets/img/team/sophie-tremblay.webp",
    portraitPrompt: "a 37-year-old French-Canadian executive woman, shoulder-length chestnut hair, subtle earrings, structured black blazer over a white blouse",
    based: "Vancouver & Montréal",
    joined: "2023",
    education: "MSc Management, HEC Montréal",
    areas: ["Corporate development", "International", "Partnerships"],
    summary: "Evaluates acquisitions and joint ventures in Canada and leads the Group's exploratory international program; the point of contact for government and partnership inquiries.",
    bio: "Sophie Tremblay leads corporate development and international partnerships for X Group. She evaluates acquisitions and joint ventures in Canada and coordinates the Group's exploratory international market-development program, including dialogue with investment-promotion agencies, technology parks and economic-development organizations.",
    longBio: [
      "Sophie joined the Group in 2023 after seven years in corporate development and government relations, first with a Québec-based industrial services company and then with an economic-development agency, where she managed inbound investment missions and trade delegations. Fluent in French and English, she runs the Group's acquisition process from first conversation to close and is the protocol contact for visiting delegations.",
      "Based between Vancouver and Montréal, Sophie also manages the Group's relationship with Allegro X AI's Montréal team and is the Group's point of contact for government and international partnership inquiries.",
    ],
    highlights: [
      "Runs the Group's acquisition process — criteria, first call, site visit, offer and close.",
      "Leads the exploratory international market-development program and delegation protocol.",
      "Managed inbound investment missions and trade delegations in a prior agency role.",
      "Point of contact for government, investment-promotion and partnership inquiries.",
    ],
  },
];

export const executiveBySlug = Object.fromEntries(executives.map(e => [e.slug, e]));
