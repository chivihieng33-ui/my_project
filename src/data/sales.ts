/* =========================================================
   DEMO DATA — sample sales dataset used across the prototype.
   All figures are illustrative sample estimates generated for
   evaluation purposes only. They are NOT live Salesforce data.
   ========================================================= */

export type Product = {
  id: string;
  name: string;
  color: string;
  /** Ratio applied to the actual product revenue to simulate the Einstein projection. */
  forecastFactor: number;
};

export const products: Product[] = [
  { id: "p-cloud", name: "Cloud Platform", color: "#2563eb", forecastFactor: 1.07 },
  { id: "p-ai", name: "AI Analytics Suite", color: "#0ea5e9", forecastFactor: 0.96 },
  { id: "p-crm", name: "CRM Enterprise", color: "#6366f1", forecastFactor: 1.03 },
  { id: "p-data", name: "Data Integration", color: "#14b8a6", forecastFactor: 1.11 },
  { id: "p-sec", name: "Security & Compliance", color: "#f59e0b", forecastFactor: 0.93 },
  { id: "p-svc", name: "Support & Services", color: "#ec4899", forecastFactor: 1.08 },
];

export type MonthPoint = {
  month: string;
  label: string;
  /** Closed-won revenue in millions USD */
  actual: number;
  /** Einstein-style sample projection in millions USD */
  predicted: number;
  /** Quota target in millions USD */
  target: number;
};

export const fiscalYear = "FY2025";

export const monthlySales: MonthPoint[] = [
  { month: "2025-01", label: "Jan", actual: 1.08, predicted: 1.15, target: 1.2 },
  { month: "2025-02", label: "Feb", actual: 1.16, predicted: 1.26, target: 1.25 },
  { month: "2025-03", label: "Mar", actual: 1.28, predicted: 1.23, target: 1.3 },
  { month: "2025-04", label: "Apr", actual: 1.22, predicted: 1.35, target: 1.35 },
  { month: "2025-05", label: "May", actual: 1.36, predicted: 1.26, target: 1.4 },
  { month: "2025-06", label: "Jun", actual: 1.44, predicted: 1.51, target: 1.45 },
  { month: "2025-07", label: "Jul", actual: 1.38, predicted: 1.5, target: 1.5 },
  { month: "2025-08", label: "Aug", actual: 1.52, predicted: 1.43, target: 1.55 },
  { month: "2025-09", label: "Sep", actual: 1.58, predicted: 1.71, target: 1.6 },
  { month: "2025-10", label: "Oct", actual: 1.63, predicted: 1.52, target: 1.7 },
  { month: "2025-11", label: "Nov", actual: 1.72, predicted: 1.87, target: 1.8 },
  { month: "2025-12", label: "Dec", actual: 1.64, predicted: 1.84, target: 1.85 },
];

export type Rep = {
  id: string;
  name: string;
  team: "Enterprise" | "Mid-Market" | "SMB" | "Strategic";
  region: string;
  /** Targeted full-year quota attainment (%) set by sales operations. */
  attainment: number;
  deals: number;
  conversion: number; // %
  einsteinScore: number; // 0-100 average lead score
};

export const reps: Rep[] = [
  { id: "r1", name: "Sarah Mitchell", team: "Enterprise", region: "North America", attainment: 115, deals: 34, conversion: 34, einsteinScore: 82 },
  { id: "r2", name: "Amara Okafor", team: "Enterprise", region: "EMEA", attainment: 99, deals: 29, conversion: 29, einsteinScore: 88 },
  { id: "r3", name: "Nguyen Thi Mai", team: "Strategic", region: "APAC", attainment: 110, deals: 22, conversion: 33, einsteinScore: 85 },
  { id: "r4", name: "Grace Liu", team: "Enterprise", region: "APAC", attainment: 97, deals: 26, conversion: 27, einsteinScore: 79 },
  { id: "r5", name: "David Chen", team: "Mid-Market", region: "North America", attainment: 96, deals: 41, conversion: 31, einsteinScore: 76 },
  { id: "r6", name: "Priya Sharma", team: "Mid-Market", region: "EMEA", attainment: 94, deals: 37, conversion: 27, einsteinScore: 74 },
  { id: "r7", name: "Omar Haddad", team: "Mid-Market", region: "LATAM", attainment: 92, deals: 33, conversion: 25, einsteinScore: 71 },
  { id: "r8", name: "Hannah Goldberg", team: "Strategic", region: "North America", attainment: 104, deals: 19, conversion: 30, einsteinScore: 86 },
  { id: "r9", name: "Michael Torres", team: "SMB", region: "LATAM", attainment: 86, deals: 58, conversion: 26, einsteinScore: 71 },
  { id: "r10", name: "James Whitfield", team: "SMB", region: "EMEA", attainment: 90, deals: 47, conversion: 23, einsteinScore: 68 },
  { id: "r11", name: "Carlos Rivera", team: "SMB", region: "North America", attainment: 85, deals: 52, conversion: 22, einsteinScore: 66 },
  { id: "r12", name: "Tom Bradley", team: "SMB", region: "APAC", attainment: 84, deals: 61, conversion: 20, einsteinScore: 63 },
];

/** Which reps carry each product line — drives a realistic book of business. */
export const productOwnerPools: Record<string, string[]> = {
  "Cloud Platform": ["Sarah Mitchell", "Nguyen Thi Mai", "Grace Liu"],
  "AI Analytics Suite": ["Amara Okafor", "Hannah Goldberg", "David Chen"],
  "CRM Enterprise": ["Priya Sharma", "Omar Haddad", "Carlos Rivera"],
  "Data Integration": ["Michael Torres", "James Whitfield", "Tom Bradley"],
  "Security & Compliance": ["Sarah Mitchell", "Priya Sharma", "Michael Torres"],
  "Support & Services": ["Nguyen Thi Mai", "David Chen", "Omar Haddad"],
};

export const regions = ["North America", "EMEA", "APAC", "LATAM"];

export const customers = [
  "Northwind Traders",
  "Acme Industrial",
  "Globex Corporation",
  "Initech Systems",
  "Umbrella Health",
  "Stark Manufacturing",
  "Wayne Logistics",
  "Hooli Cloud",
  "Soylent Foods",
  "Massive Dynamic",
  "Cyberdyne Robotics",
  "Vandelay Imports",
  "Tyrell Analytics",
  "Blue Sun Energy",
  "Oscorp Biotech",
  "Duff Beverages",
  "Pied Piper Data",
  "Prestige Worldwide",
  "Apertus Media",
  "Genco Olive Oil",
];

/* ------------------------------------------------------------------
   Deterministic record generator (seeded) so the demo dataset is
   stable across renders and machines.
   ------------------------------------------------------------------ */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type SalesRecord = {
  id: string;
  date: string;
  month: string;
  monthLabel: string;
  product: string;
  region: string;
  rep: string;
  customer: string;
  revenue: number;
  orders: number;
  newCustomers: number;
  avgDealSize: number;
  status: "Closed Won" | "Closed Lost";
  source: string;
};

const leadSources = [
  "Inbound Web",
  "Referral",
  "Partner",
  "Webinar",
  "Outbound",
  "Existing Customer",
];

const baseShare = [0.27, 0.2, 0.18, 0.135, 0.12, 0.095];

function buildRecords(): SalesRecord[] {
  const rnd = mulberry32(20240607);
  const rows: SalesRecord[] = [];
  let counter = 0;

  monthlySales.forEach((m, mIdx) => {
    const weights = baseShare.map((s) => s * (1 + (rnd() - 0.5) * 0.3));
    const total = weights.reduce((a, b) => a + b, 0);
    const monthTotal = m.actual * 1_000_000;

    let allocated = 0;
    products.forEach((product, pIdx) => {
      const isLast = pIdx === products.length - 1;
      let revenue = isLast
        ? monthTotal - allocated
        : Math.round((weights[pIdx] / total) * monthTotal / 1000) * 1000;

      allocated += revenue;

      const pool = productOwnerPools[product.name];
      const repName = pool[mIdx % pool.length];
      const rep = reps.find((r) => r.name === repName) ?? reps[0];
      const region = rep.region;
      const customer = customers[(mIdx * 5 + pIdx * 3) % customers.length];
      const avgDealSize = 58_000 + Math.round(rnd() * 46_000);
      const orders = Math.max(1, Math.round(revenue / avgDealSize));
      const day = 2 + Math.floor(rnd() * 26);

      counter += 1;
      rows.push({
        id: `SR-2025-${String(counter).padStart(4, "0")}`,
        date: `${m.month}-${String(day).padStart(2, "0")}`,
        month: m.month,
        monthLabel: m.label,
        product: product.name,
        region,
        rep: rep.name,
        customer,
        revenue,
        orders,
        newCustomers: Math.max(1, Math.round(orders * (0.5 + rnd() * 0.25))),
        avgDealSize,
        status: "Closed Won",
        source: leadSources[(mIdx + pIdx) % leadSources.length],
      });
    });
  });

  return rows;
}

export const salesRecords: SalesRecord[] = buildRecords();

/* ------------------------------------------------------------------
   Headline KPI values (sample)
   ------------------------------------------------------------------ */
export const totalRevenue = salesRecords
  .filter((r) => r.status === "Closed Won")
  .reduce((sum, r) => sum + r.revenue, 0);

export const currentMonth = monthlySales[monthlySales.length - 1];

export const kpis = [
  {
    id: "revenue",
    label: "Total Sales Revenue",
    value: totalRevenue,
    format: "currency" as const,
    sub: `${fiscalYear} closed-won revenue`,
    delta: 12.4,
    icon: "revenue",
  },
  {
    id: "target",
    label: "Monthly Sales Target",
    value: currentMonth.target * 1_000_000,
    format: "currency" as const,
    sub: `${currentMonth.label} quota`,
    delta: 6.1,
    icon: "target",
  },
  {
    id: "predicted",
    label: "Predicted Sales Revenue",
    value: currentMonth.predicted * 1_000_000,
    format: "currency" as const,
    sub: "Einstein-style projection",
    delta: 9.8,
    icon: "sparkles",
  },
  {
    id: "conversion",
    label: "Sales Conversion Rate",
    value: 28.4,
    format: "percent" as const,
    sub: "Lead-to-closed-won",
    delta: 6.7,
    icon: "conversion",
  },
  {
    id: "pipeline",
    label: "Sales Pipeline Value",
    value: 8_940_000,
    format: "currency" as const,
    sub: "Open opportunities (214)",
    delta: 15.2,
    icon: "pipeline",
  },
];

export const forecastAccuracy = {
  actual: totalRevenue,
  predicted: monthlySales.reduce((s, m) => s + m.predicted * 1_000_000, 0),
  mape: 7.8, // mean absolute percentage error of the sample projection (monthly)
  confidence: 86, // % of opportunities the model classifies as "commit"
  commit: 4_990_000, // Q4 closed-won revenue
  bestCase: 6_480_000,
  pipeline: 8_940_000,
  closedWon: 4_990_000,
  weightedPipeline: 5_720_000,
};

/* ------------------------------------------------------------------
   Aggregation helpers used by the reports module
   ------------------------------------------------------------------ */
export function aggregateByMonth(records: SalesRecord[]) {
  return monthlySales.map((m) => {
    const rows = records.filter((r) => r.month === m.month && r.status === "Closed Won");
    const revenue = rows.reduce((s, r) => s + r.revenue, 0);
    const orders = rows.reduce((s, r) => s + r.orders, 0);
    return {
      month: m.month,
      label: m.label,
      revenue,
      target: m.target * 1_000_000,
      predicted: m.predicted * 1_000_000,
      orders,
      variance: revenue - m.target * 1_000_000,
      attainment: m.target > 0 ? (revenue / (m.target * 1_000_000)) * 100 : 0,
    };
  });
}

export function aggregateByProduct(records: SalesRecord[]) {
  return products.map((product) => {
    const rows = records.filter((r) => r.product === product.name && r.status === "Closed Won");
    const actual = rows.reduce((s, r) => s + r.revenue, 0);
    const forecast = actual * product.forecastFactor;
    return {
      product: product.name,
      color: product.color,
      actual,
      forecast,
      variance: forecast - actual,
      orders: rows.reduce((s, r) => s + r.orders, 0),
      customers: new Set(rows.map((r) => r.customer)).size,
    };
  });
}

export function aggregateByRep(records: SalesRecord[]) {
  return reps
    .map((rep) => {
      const rows = records.filter((r) => r.rep === rep.name && r.status === "Closed Won");
      const revenue = rows.reduce((s, r) => s + r.revenue, 0);
      // Quota plans are derived from the targeted attainment set at the start of the year.
      const quota = revenue / (rep.attainment / 100);
      return {
        ...rep,
        attributed: revenue,
        quota,
        actualAttainment: quota > 0 ? (revenue / quota) * 100 : 0,
      };
    })
    .sort((a, b) => b.attributed - a.attributed);
}
