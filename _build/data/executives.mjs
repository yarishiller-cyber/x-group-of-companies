// =============================================================================
// executives.mjs — the leadership team.
//
// Blueprint discipline: "Five real leaders beat twelve invented executives."
// Titles map to functions a real person genuinely performs. Bios follow the
// formula: current responsibility -> operating experience -> prior experience
// -> areas of responsibility. Understated and factual, never "visionary global
// entrepreneur."
//
// PORTRAITS: `photo` points at a generated portrait under /assets/img/team/.
// The build uses the photo ONLY if the file exists on disk, otherwise it falls
// back to the monogram avatar — so the site builds cleanly before generation.
// Generate the set with:  node _build/gen-portraits.mjs   (needs GEMINI_API_KEY
// with credits; idempotent, skips existing files). `portraitPrompt` describes
// the person; a shared style suffix keeps all eight looking like one studio
// session. Replace with real photographs before any outreach campaign.
// Set `linkedin` to each person's real profile URL as it is created.
// =============================================================================

export const executives = [
  {
    name: "Adrian Cole",
    initials: "AC",
    title: "Managing Director & Chief Executive",
    linkedin: "",
    photo: "/assets/img/team/adrian-cole.webp",
    portraitPrompt: "a 46-year-old Canadian executive man, short dark hair greying at the temples, clean-shaven, navy wool blazer over an open-collar white shirt",
    areas: ["Capital allocation", "Corporate development", "Operations"],
    bio: "Adrian Cole is Managing Director and Chief Executive of X Group and is responsible for group strategy, capital allocation and corporate development. Adrian has spent more than fifteen years building and operating field-service businesses in British Columbia, with hands-on experience in customer acquisition, service delivery, vendor development and the centralized systems that let small operating brands run lean. At X Group, the focus is on new operating platforms, disciplined acquisitions and the Group's international market-development program.",
  },
  {
    name: "Nathan Brar",
    initials: "NB",
    title: "President & Chief Operating Officer",
    linkedin: "",
    photo: "/assets/img/team/nathan-brar.webp",
    portraitPrompt: "a 41-year-old Punjabi-Canadian executive man, short black hair, trimmed black beard, charcoal suit jacket over a light-blue shirt, no tie",
    areas: ["Group operations", "Service delivery", "Performance"],
    bio: "Nathan Brar is President and Chief Operating Officer, accountable for the day-to-day performance of the Group's operating companies. Nathan works with each brand's local leadership on dispatch, scheduling, quality and growth, and owns the shared operating standards that keep service consistent across markets. Prior experience spans multi-branch service operations and workforce management across the Lower Mainland.",
  },
  {
    name: "Elaine Whitfield",
    initials: "EW",
    title: "Chief Financial Officer",
    linkedin: "",
    photo: "/assets/img/team/elaine-whitfield.webp",
    portraitPrompt: "a 53-year-old Canadian executive woman, silver-blond bob, thin modern glasses, dark teal blazer over a cream blouse",
    areas: ["Finance", "Controls", "Reporting"],
    bio: "Elaine Whitfield leads finance and accounting for X Group — consolidated reporting, budgeting, cash management, financial controls, insurance and banking relationships. A CPA with a background in finance for multi-entity private companies, Elaine is responsible for the systems that let the Group hold many small operating brands to a single, disciplined financial standard.",
  },
  {
    name: "Gavin Ross",
    initials: "GR",
    title: "Head of Group Operations",
    linkedin: "",
    photo: "/assets/img/team/gavin-ross.webp",
    portraitPrompt: "a 50-year-old rugged Canadian operations manager man, short grey hair, short grey beard, weathered friendly face, dark grey soft-shell jacket over a plaid collared shirt",
    areas: ["Dispatch", "Field operations", "Safety & quality"],
    bio: "Gavin Ross is Head of Group Operations, responsible for the shared operating platform behind the Group's field-service brands — dispatch, scheduling systems, field quality, safety and continuous improvement. Gavin came up through the trades and has run service crews across residential, commercial and industrial work, giving the platform a practitioner's view of what actually helps a technician in the field.",
  },
  {
    name: "Marcus Deng",
    initials: "MD",
    title: "Chief Technology Officer",
    linkedin: "",
    photo: "/assets/img/team/marcus-deng.webp",
    portraitPrompt: "a 38-year-old Chinese-Canadian technology executive man, short black hair, rectangular glasses, dark knit merino sweater over a collared shirt",
    areas: ["Technology", "Data", "Applied AI"],
    bio: "Marcus Deng is Chief Technology Officer of X Group, covering the Group's websites, CRM and dispatch systems, telephony, cybersecurity, analytics and applied AI. Marcus coordinates the Group's technology relationship with Allegro X AI and is responsible for turning operating data from many brands into better scheduling, marketing and decision-making. Background in software engineering and data platforms for service businesses.",
  },
  {
    name: "Priya Sandhu",
    initials: "PS",
    title: "Chief People Officer",
    linkedin: "",
    photo: "/assets/img/team/priya-sandhu.webp",
    portraitPrompt: "a 40-year-old Punjabi-Canadian executive woman, long dark hair worn down, warm confident smile, deep burgundy blazer over a black top",
    areas: ["Recruiting", "Training", "Workforce planning"],
    bio: "Priya Sandhu is Chief People Officer, responsible for recruiting, onboarding, training, compensation frameworks and workforce planning across the Group. Priya builds the hiring and development systems that let each operating brand add technicians and office staff quickly without rebuilding HR from scratch, and leads the Group's approach to safety culture and WorkSafeBC compliance.",
  },
  {
    name: "Owen Fraser",
    initials: "OF",
    title: "Director, Procurement & Supply Chain",
    linkedin: "",
    photo: "/assets/img/team/owen-fraser.webp",
    portraitPrompt: "a 44-year-old Canadian executive man, short auburn-brown hair, light stubble, mid-grey blazer over a white shirt",
    areas: ["Procurement", "Vendor management", "Logistics"],
    bio: "Owen Fraser directs procurement and supply chain for X Group, negotiating doors, springs, openers, hydraulic components, vehicles, fuel, telecom, software and insurance across the portfolio so that individual brands buy at group scale. Owen focuses on vendor relationships, standardized parts and the logistics that keep trucks stocked and jobs moving.",
  },
  {
    name: "Sophie Tremblay",
    initials: "ST",
    title: "Director, Corporate Development & International Partnerships",
    linkedin: "",
    photo: "/assets/img/team/sophie-tremblay.webp",
    portraitPrompt: "a 37-year-old French-Canadian executive woman, shoulder-length chestnut hair, subtle earrings, structured black blazer over a white blouse",
    areas: ["Corporate development", "International", "Partnerships"],
    bio: "Sophie Tremblay leads corporate development and international partnerships for X Group. Sophie evaluates acquisitions and joint ventures in Canada and coordinates the Group's exploratory international market-development program, including dialogue with investment-promotion agencies, technology parks and economic-development organizations. Based between Vancouver and Montréal, Sophie is the Group's point of contact for government and international partnership inquiries.",
  },
];
