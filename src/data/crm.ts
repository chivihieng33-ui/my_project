/* =========================================================
   DEMO DATA — sample customer & lead records for the CRM module.
   These are fictional records created for evaluation purposes.
   ========================================================= */

export const leadStages = [
  "New",
  "Working",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
] as const;

export type LeadStage = (typeof leadStages)[number];

export const leadSources = [
  "Inbound Web",
  "Webinar",
  "Referral",
  "Partner",
  "Outbound",
  "Trade Show",
  "Existing Customer",
] as const;

export type LeadSource = (typeof leadSources)[number];

export const crmOwners = [
  "Sarah Mitchell",
  "David Chen",
  "Amara Okafor",
  "Priya Sharma",
  "Nguyen Thi Mai",
  "Michael Torres",
  "Unassigned (Einstein Queue)",
];

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: LeadSource;
  score: number;
  stage: LeadStage;
  value: number;
  followUp: string;
  owner: string;
  lastActivity: string;
  location: string;
};

export const initialLeads: Lead[] = [
  {
    id: "LD-2041",
    name: "Elena Vasquez",
    company: "Northwind Traders",
    email: "elena.vasquez@northwind.example",
    phone: "+1 415 555 0142",
    source: "Inbound Web",
    score: 92,
    stage: "Negotiation",
    value: 420000,
    followUp: "2025-12-04",
    owner: "Sarah Mitchell",
    lastActivity: "2025-12-01",
    location: "San Francisco, USA",
  },
  {
    id: "LD-2042",
    name: "Rahul Mehta",
    company: "Globex Corporation",
    email: "rahul.mehta@globex.example",
    phone: "+91 22 5555 0198",
    source: "Webinar",
    score: 88,
    stage: "Proposal",
    value: 365000,
    followUp: "2025-12-03",
    owner: "Nguyen Thi Mai",
    lastActivity: "2025-11-29",
    location: "Mumbai, India",
  },
  {
    id: "LD-2043",
    name: "Hanna Bergstrom",
    company: "Stark Manufacturing",
    email: "hanna.bergstrom@stark.example",
    phone: "+46 8 555 0111",
    source: "Referral",
    score: 81,
    stage: "Qualified",
    value: 298000,
    followUp: "2025-12-06",
    owner: "Priya Sharma",
    lastActivity: "2025-11-30",
    location: "Stockholm, Sweden",
  },
  {
    id: "LD-2044",
    name: "Marcus Delaunay",
    company: "Umbrella Health",
    email: "marcus.d@umbrellahealth.example",
    phone: "+33 1 5555 0177",
    source: "Partner",
    score: 76,
    stage: "Working",
    value: 240000,
    followUp: "2025-12-08",
    owner: "Amara Okafor",
    lastActivity: "2025-11-27",
    location: "Paris, France",
  },
  {
    id: "LD-2045",
    name: "Yuki Tanaka",
    company: "Wayne Logistics",
    email: "yuki.tanaka@wayne.example",
    phone: "+81 3 5555 0145",
    source: "Inbound Web",
    score: 69,
    stage: "Working",
    value: 186000,
    followUp: "2025-12-09",
    owner: "David Chen",
    lastActivity: "2025-11-26",
    location: "Tokyo, Japan",
  },
  {
    id: "LD-2046",
    name: "Sofia Almeida",
    company: "Genco Olive Oil",
    email: "sofia.almeida@genco.example",
    phone: "+34 91 555 0163",
    source: "Trade Show",
    score: 64,
    stage: "New",
    value: 142000,
    followUp: "2025-12-11",
    owner: "Michael Torres",
    lastActivity: "2025-12-02",
    location: "Madrid, Spain",
  },
  {
    id: "LD-2047",
    name: "Owen Whitcomb",
    company: "Cyberdyne Robotics",
    email: "owen.w@cyberdyne.example",
    phone: "+1 408 555 0190",
    source: "Outbound",
    score: 58,
    stage: "New",
    value: 121000,
    followUp: "2025-12-12",
    owner: "Unassigned (Einstein Queue)",
    lastActivity: "2025-12-02",
    location: "San Jose, USA",
  },
  {
    id: "LD-2048",
    name: "Ingrid Solberg",
    company: "Hooli Cloud",
    email: "ingrid.solberg@hooli.example",
    phone: "+47 22 555 0182",
    source: "Existing Customer",
    score: 95,
    stage: "Negotiation",
    value: 510000,
    followUp: "2025-12-03",
    owner: "Sarah Mitchell",
    lastActivity: "2025-12-01",
    location: "Oslo, Norway",
  },
  {
    id: "LD-2049",
    name: "Tariq Haddad",
    company: "Massive Dynamic",
    email: "tariq.haddad@massive.example",
    phone: "+971 4 555 0134",
    source: "Webinar",
    score: 72,
    stage: "Proposal",
    value: 275000,
    followUp: "2025-12-05",
    owner: "Amara Okafor",
    lastActivity: "2025-11-28",
    location: "Dubai, UAE",
  },
  {
    id: "LD-2050",
    name: "Lucia Rossi",
    company: "Soylent Foods",
    email: "lucia.rossi@soylent.example",
    phone: "+39 02 5555 0156",
    source: "Referral",
    score: 61,
    stage: "Working",
    value: 158000,
    followUp: "2025-12-10",
    owner: "Priya Sharma",
    lastActivity: "2025-11-25",
    location: "Milan, Italy",
  },
  {
    id: "LD-2051",
    name: "Daniel Osei",
    company: "Pied Piper Data",
    email: "daniel.osei@piedpiper.example",
    phone: "+233 30 555 0121",
    source: "Inbound Web",
    score: 54,
    stage: "Qualified",
    value: 176000,
    followUp: "2025-12-13",
    owner: "David Chen",
    lastActivity: "2025-11-24",
    location: "Accra, Ghana",
  },
  {
    id: "LD-2052",
    name: "Clara Nyberg",
    company: "Apertus Media",
    email: "clara.nyberg@apertus.example",
    phone: "+46 8 555 0192",
    source: "Partner",
    score: 47,
    stage: "Working",
    value: 98000,
    followUp: "2025-12-15",
    owner: "Michael Torres",
    lastActivity: "2025-11-21",
    location: "Stockholm, Sweden",
  },
  {
    id: "LD-2053",
    name: "Victor Almeida",
    company: "Tyrell Analytics",
    email: "victor.a@tyrell.example",
    phone: "+55 11 5555 0188",
    source: "Outbound",
    score: 39,
    stage: "New",
    value: 76000,
    followUp: "2025-12-16",
    owner: "Unassigned (Einstein Queue)",
    lastActivity: "2025-12-03",
    location: "São Paulo, Brazil",
  },
  {
    id: "LD-2054",
    name: "Alice Kowalski",
    company: "Blue Sun Energy",
    email: "alice.kowalski@bluesun.example",
    phone: "+48 22 555 0107",
    source: "Trade Show",
    score: 85,
    stage: "Closed Won",
    value: 312000,
    followUp: "2025-12-20",
    owner: "Nguyen Thi Mai",
    lastActivity: "2025-11-18",
    location: "Warsaw, Poland",
  },
  {
    id: "LD-2055",
    name: "Ben Carter",
    company: "Vandelay Imports",
    email: "ben.carter@vandelay.example",
    phone: "+1 212 555 0173",
    source: "Webinar",
    score: 33,
    stage: "Closed Lost",
    value: 54000,
    followUp: "2025-12-18",
    owner: "Sarah Mitchell",
    lastActivity: "2025-11-12",
    location: "New York, USA",
  },
];

export const scoreBand = (score: number) => {
  if (score >= 80) return { label: "Hot", color: "text-emerald-700", bg: "bg-emerald-50", ring: "ring-emerald-200" };
  if (score >= 60) return { label: "Warm", color: "text-amber-700", bg: "bg-amber-50", ring: "ring-amber-200" };
  if (score >= 40) return { label: "Cool", color: "text-sky-700", bg: "bg-sky-50", ring: "ring-sky-200" };
  return { label: "Cold", color: "text-slate-600", bg: "bg-slate-100", ring: "ring-slate-200" };
};

export const stageColor = (stage: LeadStage) => {
  switch (stage) {
    case "New":
      return "bg-slate-100 text-slate-700 ring-slate-200";
    case "Working":
      return "bg-sky-50 text-sky-700 ring-sky-200";
    case "Qualified":
      return "bg-indigo-50 text-indigo-700 ring-indigo-200";
    case "Proposal":
      return "bg-violet-50 text-violet-700 ring-violet-200";
    case "Negotiation":
      return "bg-amber-50 text-amber-700 ring-amber-200";
    case "Closed Won":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    default:
      return "bg-rose-50 text-rose-700 ring-rose-200";
  }
};
