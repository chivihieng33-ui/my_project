import { useEffect, useState } from "react";
import { loadMonths } from "@/lib/liveMonths";
import { monthsEvent } from "@/lib/liveMonths";
import type { MonthPoint } from "@/data/sales";

export function useLiveMonths() {
  const [rows, setRows] = useState<MonthPoint[]>(() => loadMonths());

  useEffect(() => {
    const sync = () => setRows(loadMonths());
    window.addEventListener(monthsEvent, sync);
    return () => window.removeEventListener(monthsEvent, sync);
  }, []);

  return rows;
}
