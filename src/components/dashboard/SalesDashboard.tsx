import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/cn";
import {
  aggregateByProduct,
  aggregateByRep,
  forecastAccuracy,
  monthlySales,
  reps,
  salesRecords,
} from "@/data/sales";
import { formatCurrency, formatNumber, formatThousandsAsMillions } from "@/lib/format";
import { useAsyncData } from "@/hooks/useAsyncData";
import { useLiveMonths } from "@/hooks/useLiveMonths";
import { Icon } from "../Icon";
import {
  Badge,
  Button,
  Container,
  DemoNotice,
  Panel,
  Reveal,
  Section,
  SectionHeading,
  Skeleton,
} from "../common";
import { CalcResult, EditableKpi, readStoredKpi } from "../common/EditableKpi";

const ranges = ["FY2025", "Q1", "Q2", "Q3", "Q4"] as const;
type Range = (typeof ranges)[number];

function ChartTooltip({
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
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-slate-500">{entry.name}</span>
            <span className="ml-auto font-bold text-slate-900">
              {formatter
                ? formatter(Number(entry.value), String(entry.name))
                : formatCurrency(Number(entry.value))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SalesDashboard() {
  const [range, setRange] = useState<Range>("FY2025");

  const { data, loading } = useAsyncData(
    () => ({
      months: monthlySales,
      byProduct: aggregateByProduct(salesRecords),
      byRep: aggregateByRep(salesRecords),
    }),
    750,
  );

  const liveMonths = useLiveMonths();
  const visibleMonths = useMemo(() => {
    const start = range === "FY2025" ? 0 : ["Q1", "Q2", "Q3", "Q4"].indexOf(range) * 3;
    const months = range === "FY2025" ? liveMonths : liveMonths.slice(start, start + 3);
    return months.map((m) => ({
      ...m,
      attainment: m.target > 0 ? (m.actual / m.target) * 100 : 0,
    }));
  }, [liveMonths, range]);

  const computed = useMemo(() => {
    const months = visibleMonths.length ? visibleMonths : monthlySales;
    const deals = reps.reduce((sum, rep) => sum + rep.deals, 0);
    return {
      revenue: months.reduce((sum, month) => sum + month.actual, 0) * 1_000_000,
      target: months.reduce((sum, month) => sum + month.target, 0) * 1_000_000,
      predicted: months.reduce((sum, month) => sum + month.predicted, 0) * 1_000_000,
      conversion: deals ? reps.reduce((sum, rep) => sum + rep.conversion * rep.deals, 0) / deals : 0,
      pipeline: forecastAccuracy.pipeline,
    };
  }, [visibleMonths]);

  const [kpi, setKpi] = useState(() => readStoredKpi<typeof computed>("einstein-dash-kpis") ?? computed);

  const saveKpi = (next: typeof kpi) => {
    setKpi(next);
    localStorage.setItem("einstein-dash-kpis", JSON.stringify(next));
  };

  const calculateKpis = () => {
    saveKpi(computed);
  };

  const attainment = kpi.target > 0 ? (kpi.revenue / kpi.target) * 100 : 0;
  const variance = kpi.revenue - kpi.target;
  const forecastError = kpi.revenue > 0 ? (Math.abs(kpi.predicted - kpi.revenue) / kpi.revenue) * 100 : 0;
  const coverage = kpi.target > 0 ? kpi.pipeline / kpi.target : 0;

  return (
    <Section id="dashboard" tone="canvas">
      <Container>
        <SectionHeading
          eyebrow="Sales forecasting dashboard"
          title="Sales performance & AI forecast dashboard"
          description="A working prototype of the forecasting view: KPI tiles, actual-versus-predicted revenue, product-level forecasts and rep-level performance — all driven by the same sample dataset."
        />

        <div className="mt-8">
          <DemoNotice>
            All figures below are generated sample estimates from a simulated FY2025 dataset. Predictions are
            illustrative projections, not outputs of a live Salesforce Einstein Forecast model.
          </DemoNotice>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Click a number to edit it. Calculate fills the KPIs from the {range} sample data, then the results update.
          </p>
          <Button icon="refresh" onClick={calculateKpis}>
            Calculate
          </Button>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)
          ) : (
            <>
              <EditableKpi label="Total sales revenue" icon="revenue" kind="currency" value={kpi.revenue} onChange={(revenue) => saveKpi({ ...kpi, revenue })} />
              <EditableKpi label="Sales target" icon="target" kind="currency" value={kpi.target} hint={`${range} target total`} onChange={(target) => saveKpi({ ...kpi, target })} />
              <EditableKpi label="Predicted sales revenue" icon="sparkles" kind="currency" value={kpi.predicted} onChange={(predicted) => saveKpi({ ...kpi, predicted })} />
              <EditableKpi label="Sales conversion rate" icon="conversion" kind="percent" value={kpi.conversion} onChange={(conversion) => saveKpi({ ...kpi, conversion })} />
              <EditableKpi label="Sales pipeline value" icon="pipeline" kind="currency" value={kpi.pipeline} onChange={(pipeline) => saveKpi({ ...kpi, pipeline })} />
            </>
          )}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <CalcResult
            label="Attainment"
            value={`${attainment.toFixed(1)}%`}
            formula={`${formatCurrency(kpi.revenue)} revenue ÷ ${formatCurrency(kpi.target)} target × 100`}
            tone={attainment >= 100 ? "emerald" : attainment >= 90 ? "amber" : "rose"}
          />
          <CalcResult
            label="Variance vs target"
            value={formatCurrency(variance)}
            formula="Revenue − target"
            tone={variance >= 0 ? "emerald" : "rose"}
          />
          <CalcResult
            label="Forecast error"
            value={`${forecastError.toFixed(1)}%`}
            formula="|Predicted − revenue| ÷ revenue × 100"
            tone={forecastError <= 10 ? "emerald" : "amber"}
          />
          <CalcResult
            label="Pipeline coverage"
            value={`${coverage.toFixed(2)}×`}
            formula={`${formatCurrency(kpi.pipeline)} pipeline ÷ ${formatCurrency(kpi.target)} target`}
          />
        </div>

        {/* range filter */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all duration-200",
                  range === r
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                )}
              >
                {r}
              </button>
            ))}
          </div>
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <Icon name="clock" className="h-3.5 w-3.5" />
            Model last refreshed 4 minutes ago (simulated)
          </p>
        </div>

        {/* charts row 1 */}
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <Panel className="h-full p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Actual sales vs. predicted sales
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Blue bars = money already sold. Orange line = what AI predicted. Grey line = the monthly target.
                  </p>
                </div>
                <Badge tone="brand" icon="sparkles">
                  Sample forecast
                </Badge>
              </div>

              <div className="mt-6 h-[300px] w-full">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={visibleMonths} margin={{ top: 5, right: 8, left: -12, bottom: 0 }}>
                      <defs>
                        <linearGradient id="kpiActual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#1d4ed8" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" stroke="#e8edf5" vertical={false} />
                      <XAxis
                        dataKey="label"
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        axisLine={{ stroke: "#e2e8f0" }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v: number) => `$${v.toFixed(1)}M`}
                      />
                      <Tooltip
                        content={
                          <ChartTooltip formatter={(v) => `$${v.toFixed(2)}M`} />
                        }
                        cursor={{ fill: "rgba(37,99,235,0.05)" }}
                      />
                      <Bar
                        dataKey="actual"
                        name="Actual revenue"
                        fill="url(#kpiActual)"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={26}
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        name="AI prediction"
                        stroke="#f59e0b"
                        strokeWidth={2.75}
                        strokeDasharray="6 4"
                        dot={{ r: 3.5, fill: "#f59e0b", stroke: "#fff", strokeWidth: 1.5 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        name="Target"
                        stroke="#64748b"
                        strokeWidth={2}
                        strokeDasharray="3 4"
                        dot={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs">
                {[
                  { c: "#1d4ed8", l: "Actual revenue" },
                  { c: "#f59e0b", l: "AI prediction" },
                  { c: "#94a3b8", l: "Target" },
                ].map((k) => (
                  <span key={k.l} className="flex items-center gap-2 text-slate-500">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: k.c }} />
                    {k.l}
                  </span>
                ))}
                <span className="ml-auto font-semibold text-slate-400">
                  Forecast error (MAPE): <span className="text-slate-700">{forecastAccuracy.mape}%</span>
                </span>
              </div>
            </Panel>
          </Reveal>

          {/* forecast categories */}
          <Reveal delay={80}>
            <Panel className="flex h-full flex-col p-5 sm:p-6">
              <h3 className="text-base font-extrabold text-slate-900">Forecast categories</h3>
              <p className="mt-0.5 text-xs text-slate-500">
                How the current quarter is classified by the model
              </p>

              <div className="mt-6 space-y-5">
                {[
                  {
                    label: "Commit",
                    value: forecastAccuracy.commit,
                    color: "bg-emerald-500",
                    note: "86% confidence",
                  },
                  {
                    label: "Best case",
                    value: forecastAccuracy.bestCase,
                    color: "bg-brand-500",
                    note: "71% confidence",
                  },
                  {
                    label: "Pipeline",
                    value: forecastAccuracy.pipeline,
                    color: "bg-sky-400",
                    note: "58% confidence",
                  },
                ].map((band) => {
                  const pct = (band.value / forecastAccuracy.pipeline) * 100;
                  return (
                    <div key={band.label}>
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-bold text-slate-700">{band.label}</span>
                        <span className="text-sm font-extrabold text-slate-900">
                          {formatCurrency(band.value)}
                        </span>
                      </div>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={cn("h-full rounded-full transition-all duration-700", band.color)}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">{band.note}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">Closed won (Q4)</span>
                  <span className="font-bold text-slate-800">
                    {formatCurrency(forecastAccuracy.closedWon)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">Weighted pipeline</span>
                  <span className="font-bold text-slate-800">
                    {formatCurrency(forecastAccuracy.weightedPipeline)}
                  </span>
                </div>
              </div>
            </Panel>
          </Reveal>
        </div>

        {/* charts row 2 */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Panel className="h-full p-5 sm:p-6">
              <h3 className="text-base font-extrabold text-slate-900">Monthly sales performance</h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Revenue per month with quota attainment on the secondary axis
              </p>

              <div className="mt-6 h-[290px] w-full">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={visibleMonths} margin={{ top: 5, right: -4, left: -14, bottom: 0 }}>
                      <defs>
                        <linearGradient id="monthBar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#60a5fa" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" stroke="#e8edf5" vertical={false} />
                      <XAxis
                        dataKey="label"
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        axisLine={{ stroke: "#e2e8f0" }}
                        tickLine={false}
                      />
                      <YAxis
                        yAxisId="left"
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v: number) => `$${v.toFixed(1)}M`}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v: number) => `${v}%`}
                      />
                      <Tooltip
                        content={
                          <ChartTooltip
                            formatter={(v, name) =>
                              name === "Attainment" ? `${v.toFixed(1)}%` : `$${v.toFixed(2)}M`
                            }
                          />
                        }
                        cursor={{ fill: "rgba(37,99,235,0.05)" }}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="actual"
                        name="Revenue"
                        fill="url(#monthBar)"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={30}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="attainment"
                        name="Attainment"
                        stroke="#10b981"
                        strokeWidth={2.5}
                        dot={{ r: 3, fill: "#10b981", strokeWidth: 0 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={80}>
            <Panel className="h-full p-5 sm:p-6">
              <h3 className="text-base font-extrabold text-slate-900">Sales forecast by product</h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Actual FY revenue against the projected year-end forecast
              </p>

              <div className="mt-6 h-[290px] w-full">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data?.byProduct ?? []}
                      layout="vertical"
                      margin={{ top: 0, right: 16, left: 18, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="4 4" stroke="#e8edf5" horizontal={false} />
                      <XAxis
                        type="number"
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v: number) => `$${(v / 1_000_000).toFixed(0)}M`}
                      />
                      <YAxis
                        type="category"
                        dataKey="product"
                        tick={{ fill: "#475569", fontSize: 11.5, fontWeight: 600 }}
                        axisLine={false}
                        tickLine={false}
                        width={104}
                      />
                      <Tooltip
                        content={<ChartTooltip formatter={(v) => formatCurrency(v)} />}
                        cursor={{ fill: "rgba(37,99,235,0.05)" }}
                      />
                      <Bar dataKey="actual" name="Actual" fill="#1d4ed8" radius={[0, 5, 5, 0]} maxBarSize={16} />
                      <Bar dataKey="forecast" name="Forecast" fill="#93c5fd" radius={[0, 5, 5, 0]} maxBarSize={16} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Panel>
          </Reveal>
        </div>

        {/* rep performance */}
        <Reveal>
          <Panel className="mt-5 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Sales performance by sales representative
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Attributed FY revenue, colour-coded against quota attainment
                </p>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-slate-500">
                {[
                  { c: "bg-emerald-500", l: "≥ 100% quota" },
                  { c: "bg-amber-400", l: "90 – 99%" },
                  { c: "bg-rose-400", l: "< 90%" },
                ].map((k) => (
                  <span key={k.l} className="flex items-center gap-1.5">
                    <span className={cn("h-2.5 w-2.5 rounded-full", k.c)} />
                    {k.l}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 h-[330px] w-full">
              {loading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={(data?.byRep ?? []).slice(0, 10)}
                    layout="vertical"
                    margin={{ top: 0, right: 28, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="4 4" stroke="#e8edf5" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v: number) => `$${(v / 1_000_000).toFixed(1)}M`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fill: "#475569", fontSize: 11.5, fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      width={124}
                    />
                    <Tooltip
                      content={
                        <ChartTooltip formatter={(v) => formatThousandsAsMillions(v / 1000)} />
                      }
                      cursor={{ fill: "rgba(37,99,235,0.05)" }}
                    />
                    <Bar dataKey="attributed" name="Revenue" radius={[0, 5, 5, 0]} maxBarSize={18}>
                      {(data?.byRep ?? []).slice(0, 10).map((rep) => (
                        <Cell
                          key={rep.id}
                          fill={
                            rep.actualAttainment >= 100
                              ? "#10b981"
                              : rep.actualAttainment >= 90
                                ? "#fbbf24"
                                : "#fb7185"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                )}
            </div>

            {/* rep table */}
            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-slate-50 text-[11px] tracking-wide text-slate-500 uppercase">
                  <tr>
                    <th className="px-4 py-3 font-bold">Rep</th>
                    <th className="px-4 py-3 font-bold">Team</th>
                    <th className="px-4 py-3 font-bold">Region</th>
                    <th className="px-4 py-3 text-right font-bold">Deals</th>
                    <th className="px-4 py-3 text-right font-bold">Revenue</th>
                    <th className="px-4 py-3 text-right font-bold">Quota</th>
                    <th className="px-4 py-3 text-right font-bold">Attainment</th>
                    <th className="px-4 py-3 text-right font-bold">Einstein score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(data?.byRep ?? []).slice(0, 6).map((rep) => (
                    <tr key={rep.id} className="transition-colors hover:bg-slate-50/70">
                      <td className="px-4 py-3 font-semibold text-slate-800">{rep.name}</td>
                      <td className="px-4 py-3 text-slate-500">{rep.team}</td>
                      <td className="px-4 py-3 text-slate-500">{rep.region}</td>
                      <td className="px-4 py-3 text-right text-slate-600">{formatNumber(rep.deals)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-800">
                        {formatThousandsAsMillions(rep.attributed / 1000)}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-500">
                        {formatThousandsAsMillions(rep.quota / 1000)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={cn(
                            "rounded-md px-2 py-0.5 text-xs font-bold",
                            rep.actualAttainment >= 100
                              ? "bg-emerald-50 text-emerald-700"
                              : rep.actualAttainment >= 90
                                ? "bg-amber-50 text-amber-700"
                                : "bg-rose-50 text-rose-700",
                          )}
                        >
                          {rep.actualAttainment.toFixed(0)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600">{rep.einsteinScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </Reveal>
      </Container>
    </Section>
  );
}
