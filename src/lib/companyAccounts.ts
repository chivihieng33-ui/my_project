/** Salesforce-style company accounts, stored only in this browser. */

export type CompanyAccount = {
  id: string;
  name: string;
  industry: string;
  type: "Customer" | "Prospect" | "Partner";
  phone: string;
  website: string;
  owner: string;
  revenue: number;
  employees: number;
  city: string;
  status: "Active" | "Inactive";
  notes: string;
};

export const industries = [
  "Technology",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Finance",
  "Logistics",
  "Energy",
];

export const accountTypes: CompanyAccount["type"][] = ["Customer", "Prospect", "Partner"];

const KEY = "einstein-company-accounts";

const seed: CompanyAccount[] = [
  {
    id: "acc-northwind",
    name: "Northwind Traders",
    industry: "Retail",
    type: "Customer",
    phone: "+1 415 555 0142",
    website: "northwind.example",
    owner: "Sarah Mitchell",
    revenue: 420000,
    employees: 240,
    city: "San Francisco",
    status: "Active",
    notes: "Enterprise renewal due next quarter.",
  },
  {
    id: "acc-globex",
    name: "Globex Corporation",
    industry: "Technology",
    type: "Prospect",
    phone: "+91 22 5555 0198",
    website: "globex.example",
    owner: "Nguyen Thi Mai",
    revenue: 365000,
    employees: 1200,
    city: "Mumbai",
    status: "Active",
    notes: "Evaluating AI Analytics Suite.",
  },
  {
    id: "acc-umbrella",
    name: "Umbrella Health",
    industry: "Healthcare",
    type: "Customer",
    phone: "+33 1 5555 0177",
    website: "umbrellahealth.example",
    owner: "Amara Okafor",
    revenue: 240000,
    employees: 860,
    city: "Paris",
    status: "Active",
    notes: "Security review in progress.",
  },
  {
    id: "acc-wayne",
    name: "Wayne Logistics",
    industry: "Logistics",
    type: "Partner",
    phone: "+81 3 5555 0145",
    website: "wayne.example",
    owner: "David Chen",
    revenue: 186000,
    employees: 430,
    city: "Tokyo",
    status: "Inactive",
    notes: "Paused after budget freeze.",
  },
];

export function listCompanyAccounts(): CompanyAccount[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw) as CompanyAccount[];
    return Array.isArray(parsed) ? parsed : seed;
  } catch {
    return seed;
  }
}

export function saveCompanyAccounts(accounts: CompanyAccount[]) {
  localStorage.setItem(KEY, JSON.stringify(accounts));
}
