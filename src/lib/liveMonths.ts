import { monthlySales, type MonthPoint } from "@/data/sales";

const KEY = "einstein-month-edits";
const EVENT = "einstein-months";

export function loadMonths(): MonthPoint[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return monthlySales.map((row) => ({ ...row }));
    const parsed = JSON.parse(raw) as MonthPoint[];
    if (!Array.isArray(parsed) || parsed.length !== monthlySales.length) return monthlySales.map((row) => ({ ...row }));
    return parsed;
  } catch {
    return monthlySales.map((row) => ({ ...row }));
  }
}

export function saveMonths(rows: MonthPoint[]) {
  localStorage.setItem(KEY, JSON.stringify(rows));
  window.dispatchEvent(new Event(EVENT));
}

export function resetMonths() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}

export { EVENT as monthsEvent };
