import { useState } from "react";
import { cn } from "@/lib/cn";
import { formatCurrency, formatNumber } from "@/lib/format";
import { Icon, type IconName } from "../Icon";

export type KpiKind = "currency" | "number" | "percent";

export function readStoredKpi<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function formatKpi(value: number, kind: KpiKind) {
  if (kind === "currency") return formatCurrency(value);
  if (kind === "percent") return `${value.toFixed(1)}%`;
  return formatNumber(value);
}

export function EditableKpi({
  label,
  icon,
  value,
  kind,
  onChange,
  hint,
}: {
  label: string;
  icon?: IconName;
  value: number;
  kind: KpiKind;
  onChange: (next: number) => void;
  hint?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const start = () => {
    setDraft(kind === "percent" ? value.toFixed(1) : String(Math.round(value)));
    setEditing(true);
  };

  const commit = () => {
    const next = Number(draft);
    if (!Number.isNaN(next) && draft.trim() !== "") onChange(next);
    setEditing(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-20px_rgba(15,23,42,0.22)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{label}</p>
        {icon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
            <Icon name={icon} className="h-4.5 w-4.5" />
          </span>
        )}
      </div>

      {editing ? (
        <input
          autoFocus
          inputMode="decimal"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") setEditing(false);
          }}
          className="mt-3 w-full rounded-lg border border-brand-300 px-2 py-1.5 text-xl font-extrabold text-slate-900 outline-none ring-2 ring-brand-100"
          aria-label={`Edit ${label}`}
        />
      ) : (
        <button
          type="button"
          onClick={start}
          className="mt-3 block text-left text-2xl font-extrabold tracking-tight text-slate-900 hover:text-brand-700"
        >
          {formatKpi(value, kind)}
          <span className="ml-2 align-middle text-[11px] font-bold text-brand-600">Edit</span>
        </button>
      )}
      <p className="mt-1.5 text-[11px] text-slate-400">{hint ?? "Click the number to edit"}</p>
    </div>
  );
}

export function CalcResult({
  label,
  value,
  formula,
  tone = "brand",
}: {
  label: string;
  value: string;
  formula: string;
  tone?: "brand" | "emerald" | "amber" | "rose";
}) {
  const tones = {
    brand: "text-brand-700",
    emerald: "text-emerald-700",
    amber: "text-amber-700",
    rose: "text-rose-700",
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">{label}</p>
      <p className={cn("mt-1 text-xl font-extrabold", tones[tone])}>{value}</p>
      <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{formula}</p>
    </div>
  );
}
