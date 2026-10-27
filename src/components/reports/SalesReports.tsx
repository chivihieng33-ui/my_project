import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/cn";
import { monthlySales, products, reps, salesRecords } from "@/data/sales";
import { downloadCsv, toCsv } from "@/lib/csv";
import { formatCurrency, formatNumber } from "@/lib/format";
import { useAsyncData } from "@/hooks/useAsyncData";
import { useLiveMonths } from "@/hooks/useLiveMonths";
import { Icon } from "../Icon";
import {
  Badge,
  Button,
  Container,
  DemoNotice,
  EmptyState,
  Panel,
  Reveal,
  Section,
  SectionHeading,
  Skeleton,
} from "../common";

const monthOptions = monthlySales.map((m) => ({ value: m.month, label: `${m.label} 2025` }));

const selectBase =
  "w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-semibold text-slate-700 outline-none transition-all duration-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

export function SalesReports() {
  const [fromMonth, setFromMonth] = useState("2025-01");
  const [toMonth, setToMonth] = useState("2025-12");
  const [product, setProduct] = useState("All");
  const [rep, setRep] = useState("All");

  const { loading } = useAsyncData(() => salesRecords, 600);
  const liveMonths = useLiveMonths();

  const filtered = useMemo(() => {
    const from = monthOptions.findIndex((m) => m.value === fromMonth);
    const to = monthOptions.findIndex((m) => m.value === toMonth);
    const lo = Math.min(from, to);
    const hi = Math.max(from, to);

    return salesRecords.filter((r) => {
      const idx = monthOptions.findIndex((m) => m.value === r.month);
      if (idx < lo || idx > hi) return false;
      if (product !== "All" && r.product !== product) return false;
      if (rep !== "All" && r.rep !== rep) return false;
      return true;
    });
  }, [fromMonth, toMonth, product, rep]);

  const reportRows = useMemo(() => {
    const usingEditedTotals = product === "All" && rep === "All";
    return liveMonths
      .filter((m) => filtered.some((r) => r.month === m.month))
      .map((m) => {
        const rows = filtered.filter((r) => r.month === m.month && r.status === "Closed Won");
        const revenue = usingEditedTotals ? m.actual * 1_000_000 : rows.reduce((s, r) => s + r.revenue, 0);
        const target = m.target * 1_000_000;
        const orders = rows.reduce((s, r) => s + r.orders, 0);
        const newCustomers = rows.reduce((s, r) => s + r.newCustomers, 0);
        return {
          month: m.label,
          period: `${m.label} 2025`,
          target,
          actual: revenue,
          variance: revenue - target,
          attainment: target ? (revenue / target) * 100 : 0,
          predicted: m.predicted * 1_000_000,
          orders,
          newCustomers,
        };
      });
  }, [filtered, liveMonths, product, rep]);

  const totals = useMemo(() => {
    const revenue = reportRows.reduce((s, r) => s + r.actual, 0);
    const target = reportRows.reduce((s, r) => s + r.target, 0);
    const orders = reportRows.reduce((s, r) => s + r.orders, 0);
    return {
      revenue,
      target,
      variance: revenue - target,
      attainment: target ? (revenue / target) * 100 : 0,
      orders,
      avgDeal: orders ? revenue / orders : 0,
    };
  }, [reportRows]);

  const exportCsv = () => {
    const csv = toCsv(
      reportRows.map((r) => ({
        period: r.period,
        target: Math.round(r.target),
        actual: Math.round(r.actual),
        variance: Math.round(r.variance),
        attainment: `${r.attainment.toFixed(1)}%`,
        predicted: Math.round(r.predicted),
        orders: r.orders,
        newCustomers: r.newCustomers,
      })),
    );
    downloadCsv(csv, `monthly-sales-report-${fromMonth}-to-${toMonth}.csv`);
  };

  const resetFilters = () => {
    setFromMonth("2025-01");
    setToMonth("2025-12");
    setProduct("All");
    setRep("All");
  };

  return (
    <Section id="reports" tone="white">
      <Container>
        <SectionHeading
          eyebrow="Sales reporting"
          title="Monthly sales reports with interactive trend analysis"
          description="Filter the report by period, product and sales representative, compare targets against actual results, and export the filtered figures as a CSV file for further analysis."
        />

        {/* filters */}
        <Reveal>
          <Panel className="mt-10 p-5 sm:p-6">
            <div className="flex flex-wrap items-end gap-4">
              <div className="min-w-[160px] flex-1">
                <label htmlFor="from-month" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                  From
                </label>
                <div className="relative">
                  <select
                    id="from-month"
                    value={fromMonth}
                    onChange={(e) => setFromMonth(e.target.value)}
                    className={selectBase}
                  >
                    {monthOptions.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label} 2025
                      </option>
                    ))}
                  </select>
                  <Icon name="chevron-down" className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="min-w-[160px] flex-1">
                <label htmlFor="to-month" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                  To
                </label>
                <div className="relative">
                  <select
                    id="to-month"
                    value={toMonth}
                    onChange={(e) => setToMonth(e.target.value)}
                    className={selectBase}
                  >
                    {monthOptions.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label} 2025
                      </option>
                    ))}
                  </select>
                  <Icon name="chevron-down" className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="min-w-[180px] flex-1">
                <label htmlFor="product" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                  Product
                </label>
                <div className="relative">
                  <select id="product" value={product} onChange={(e) => setProduct(e.target.value)} className={selectBase}>
                    <option value="All">All products</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevron-down" className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="min-w-[190px] flex-1">
                <label htmlFor="rep" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                  Sales representative
                </label>
                <div className="relative">
                  <select id="rep" value={rep} onChange={(e) => setRep(e.target.value)} className={selectBase}>
                    <option value="All">All representatives</option>
                    {reps.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevron-down" className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="md" icon="refresh" onClick={resetFilters}>
                  Reset
                </Button>
                <Button icon="download" onClick={exportCsv} disabled={!reportRows.length}>
                  Export CSV
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
              <Badge tone="slate" icon="filter">
                {reportRows.length} month{reportRows.length === 1 ? "" : "s"} in scope
              </Badge>
              <Badge tone="slate" icon="file-text">
                {filtered.length} transactions matched
              </Badge>
              {product !== "All" && <Badge tone="brand">{product}</Badge>}
              {rep !== "All" && <Badge tone="brand">{rep}</Badge>}
            </div>
          </Panel>
        </Reveal>

        {/* summary tiles */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Revenue in scope", value: formatCurrency(totals.revenue), icon: "revenue" as const },
            { label: "Target in scope", value: formatCurrency(totals.target), icon: "target" as const },
            {
              label: "Variance vs target",
              value: formatCurrency(totals.variance),
              icon: totals.variance >= 0 ? ("trending-up" as const) : ("trending-down" as const),
            },
            { label: "Avg. deal size", value: formatCurrency(totals.avgDeal), icon: "briefcase" as const },
          ].map((tile, i) => (
            <Reveal key={tile.label} delay={i * 60}>
              <Panel className="p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon name={tile.icon} className="h-4.5 w-4.5" />
                  </span>
                  <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{tile.label}</p>
                </div>
                {loading ? (
                  <Skeleton className="mt-3 h-7 w-28" />
                ) : (
                  <p className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">{tile.value}</p>
                )}
              </Panel>
            </Reveal>
          ))}
        </div>

        {/* charts */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Panel className="h-full p-5 sm:p-6">
              <h3 className="text-base font-extrabold text-slate-900">Sales trend</h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Actual revenue against the target trend for the selected period
              </p>
              <div className="mt-6 h-[280px] w-full">
                {loading || !reportRows.length ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={reportRows} margin={{ top: 5, right: 8, left: -12, bottom: 0 }}>
                      <defs>
                        <linearGradient id="reportArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" stroke="#e8edf5" vertical={false} />
                      <XAxis dataKey="period" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                      <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1_000_000).toFixed(1)}M`} />
                      <Tooltip
                        content={
                          <ChartTip
                            formatter={(v) => formatCurrency(v)}
                          />
                        }
                        cursor={{ stroke: "#cbd5e1", strokeDasharray: "4 4" }}
                      />
                      <Area type="monotone" dataKey="actual" name="Actual revenue" stroke="#1d4ed8" strokeWidth={2.5} fill="url(#reportArea)" />
                      <Area type="monotone" dataKey="target" name="Target" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 4" fill="transparent" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={80}>
            <Panel className="h-full p-5 sm:p-6">
              <h3 className="text-base font-extrabold text-slate-900">Target vs. actual results</h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Bars show quota and revenue; the line tracks attainment percentage
              </p>
              <div className="mt-6 h-[280px] w-full">
                {loading || !reportRows.length ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={reportRows} margin={{ top: 5, right: -4, left: -12, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#e8edf5" vertical={false} />
                      <XAxis dataKey="period" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                      <YAxis yAxisId="l" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1_000_000).toFixed(1)}M`} />
                      <YAxis yAxisId="r" orientation="right" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} />
                      <Tooltip content={<ChartTip formatter={(v, name) => (name === "Attainment" ? `${v.toFixed(1)}%` : formatCurrency(v))} />} cursor={{ fill: "rgba(37,99,235,0.05)" }} />
                      <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" iconSize={8} />
                      <Bar yAxisId="l" dataKey="target" name="Target" fill="#cbd5e1" radius={[5, 5, 0, 0]} maxBarSize={18} />
                      <Bar yAxisId="l" dataKey="actual" name="Actual" radius={[5, 5, 0, 0]} maxBarSize={18}>
                        {reportRows.map((r) => (
                          <Cell key={r.month} fill={r.actual >= r.target ? "#1d4ed8" : "#60a5fa"} />
                        ))}
                      </Bar>
                      <Line yAxisId="r" type="monotone" dataKey="attainment" name="Attainment" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 0, fill: "#f59e0b" }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Panel>
          </Reveal>
        </div>

        {/* table */}
        <Reveal>
          <Panel className="mt-6 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Monthly sales report</h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  {reportRows.length} period{reportRows.length === 1 ? "" : "s"} ·{" "}
                  {formatNumber(totals.orders)} orders in scope
                </p>
              </div>
              <Button size="sm" variant="secondary" icon="download" onClick={exportCsv} disabled={!reportRows.length}>
                Export CSV
              </Button>
            </div>

            {reportRows.length === 0 ? (
              <div className="p-6">
                <EmptyState
                  icon="filter"
                  title="No sales data matches these filters"
                  description="Widen the date range or choose a different product and representative to see results."
                  action={
                    <Button variant="outline" icon="refresh" onClick={resetFilters}>
                      Reset filters
                    </Button>
                  }
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-left text-sm">
                  <thead className="bg-slate-50 text-[11px] tracking-wide text-slate-500 uppercase">
                    <tr>
                      <th className="px-5 py-3 font-bold">Period</th>
                      <th className="px-5 py-3 text-right font-bold">Target</th>
                      <th className="px-5 py-3 text-right font-bold">Actual</th>
                      <th className="px-5 py-3 text-right font-bold">Variance</th>
                      <th className="px-5 py-3 text-right font-bold">Attainment</th>
                      <th className="px-5 py-3 text-right font-bold">AI forecast</th>
                      <th className="px-5 py-3 text-right font-bold">Orders</th>
                      <th className="px-5 py-3 text-right font-bold">New customers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reportRows.map((r) => (
                      <tr key={r.month} className="transition-colors hover:bg-slate-50/70">
                        <td className="px-5 py-3.5 font-bold text-slate-800">{r.period}</td>
                        <td className="px-5 py-3.5 text-right text-slate-600">{formatCurrency(r.target)}</td>
                        <td className="px-5 py-3.5 text-right font-bold text-slate-900">{formatCurrency(r.actual)}</td>
                        <td
                          className={cn(
                            "px-5 py-3.5 text-right font-semibold",
                            r.variance >= 0 ? "text-emerald-600" : "text-rose-600",
                          )}
                        >
                          {r.variance >= 0 ? "+" : ""}
                          {formatCurrency(r.variance)}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span
                            className={cn(
                              "rounded-md px-2 py-0.5 text-xs font-bold",
                              r.attainment >= 100
                                ? "bg-emerald-50 text-emerald-700"
                                : r.attainment >= 90
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-rose-50 text-rose-700",
                            )}
                          >
                            {r.attainment.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right text-slate-500">{formatCurrency(r.predicted)}</td>
                        <td className="px-5 py-3.5 text-right text-slate-600">{formatNumber(r.orders)}</td>
                        <td className="px-5 py-3.5 text-right text-slate-600">{formatNumber(r.newCustomers)}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50/80 font-bold text-slate-900">
                      <td className="px-5 py-3.5">Total</td>
                      <td className="px-5 py-3.5 text-right">{formatCurrency(totals.target)}</td>
                      <td className="px-5 py-3.5 text-right">{formatCurrency(totals.revenue)}</td>
                      <td
                        className={cn(
                          "px-5 py-3.5 text-right",
                          totals.variance >= 0 ? "text-emerald-600" : "text-rose-600",
                        )}
                      >
                        {totals.variance >= 0 ? "+" : ""}
                        {formatCurrency(totals.variance)}
                      </td>
                      <td className="px-5 py-3.5 text-right">{totals.attainment.toFixed(1)}%</td>
                      <td className="px-5 py-3.5 text-right text-slate-400">—</td>
                      <td className="px-5 py-3.5 text-right">{formatNumber(totals.orders)}</td>
                      <td className="px-5 py-3.5 text-right">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </Reveal>

        <Reveal>
          <DemoNotice className="mt-5">
            Report rows are computed from the same seeded demo dataset used across the dashboard. CSV exports
            contain the filtered sample values only — no customer data leaves your browser.
          </DemoNotice>
        </Reveal>
      </Container>
    </Section>
  );
}

/* Local tooltip so the reports module stays self-contained */
function ChartTip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number | string; color?: string; dataKey?: string }[];
  label?: string | number;
  formatter?: (value: number, name: string) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur">
      <p className="mb-1.5 text-[11px] font-bold tracking-wide text-slate-500 uppercase">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-500">{entry.name}</span>
          <span className="ml-auto font-bold text-slate-900">
            {formatter ? formatter(Number(entry.value), String(entry.name)) : formatCurrency(Number(entry.value))}
          </span>
        </div>
      ))}
    </div>
  );
}
