import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { downloadCsv, toCsv } from "@/lib/csv";
import {
  evaluationNote,
  evaluationSummary,
  initialCriteria,
  ratingStyles,
  type Criterion,
  type Rating,
} from "@/data/evaluation";
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
} from "../common";

const ratingOptions: Rating[] = ["Excellent", "Good", "Fair", "Poor"];
const ratingScore: Record<Rating, number> = { Excellent: 4, Good: 3, Fair: 2, Poor: 1 };

const inputBase =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-300 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

export function Evaluation() {
  const [criteria, setCriteria] = useState<Criterion[]>(initialCriteria);
  const [saved, setSaved] = useState(false);

  const update = (id: string, patch: Partial<Criterion>) => {
    setCriteria((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    setSaved(false);
  };

  const weightedScore = useMemo(() => {
    const total = criteria.reduce((sum, c) => sum + ratingScore[c.rating] * c.weight, 0);
    const weights = criteria.reduce((sum, c) => sum + c.weight, 0);
    return weights > 0 ? (total / weights) * 25 : 0;
  }, [criteria]);

  const ratingCounts = useMemo(() => {
    const counts: Record<Rating, number> = { Excellent: 0, Good: 0, Fair: 0, Poor: 0 };
    criteria.forEach((c) => (counts[c.rating] += 1));
    return counts;
  }, [criteria]);

  const exportCsv = () => {
    const csv = toCsv(
      criteria.map((c) => ({
        criteria: c.criteria,
        dimension: c.dimension,
        beforeAI: c.before,
        afterAI: c.after,
        metricBefore: c.metricBefore,
        metricAfter: c.metricAfter,
        rating: c.rating,
        comment: c.comment,
        weight: `${c.weight}%`,
      })),
    );
    downloadCsv(csv, "einstein-ai-evaluation.csv");
  };

  return (
    <Section id="evaluation" tone="canvas">
      <Container>
        <SectionHeading
          eyebrow="Evaluation & analysis"
          title="Assessing Salesforce Einstein AI against the current process"
          description="Eight criteria were assessed across automation, forecasting, productivity, pipeline, CRM, commercial impact, data and governance. Every cell is editable so measured results can replace the demonstration values."
        />

        {/* summary */}
        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <Panel className="relative h-full overflow-hidden p-6">
              <div className="pointer-events-none absolute -top-20 -right-10 h-48 w-48 rounded-full bg-brand-100/80 blur-3xl" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Overall assessment
                  </p>
                  <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                    {evaluationSummary.overall}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-brand-700">
                    Weighted score {weightedScore.toFixed(0)} / 100 · {evaluationSummary.weighted}
                  </p>
                </div>
                <div className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-navy-900 text-white">
                  <span className="text-xl font-extrabold">{weightedScore.toFixed(0)}</span>
                  <span className="absolute -bottom-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 shadow">
                    /100
                  </span>
                </div>
              </div>

              <div className="relative mt-6 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-600 via-brand-400 to-cyan-400 transition-all duration-700"
                  style={{ width: `${weightedScore}%` }}
                />
              </div>

              <div className="relative mt-6 grid grid-cols-4 gap-2 text-center">
                {ratingOptions.map((r) => (
                  <div key={r} className="rounded-xl border border-slate-100 bg-slate-50 px-2 py-2.5">
                    <p className="text-lg font-extrabold text-slate-900">{ratingCounts[r]}</p>
                    <p className="text-[10px] font-bold tracking-wide text-slate-500 uppercase">{r}</p>
                  </div>
                ))}
              </div>

              <p className="relative mt-6 rounded-xl bg-slate-50 p-4 text-[13px] leading-relaxed text-slate-600">
                <span className="font-bold text-slate-800">Recommendation: </span>
                {evaluationSummary.recommendation}
              </p>
            </Panel>
          </Reveal>

          <Reveal delay={90}>
            <Panel className="h-full p-6">
              <h3 className="text-base font-extrabold text-slate-900">How to read this evaluation</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Before AI — the process measured during the pre-pilot baseline period.",
                  "After AI — the same process measured once Einstein had been live for six months.",
                  "Evaluation result — a weighted judgement that can be overridden with your own data.",
                ].map((row) => (
                  <li key={row} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                    <Icon name="check-circle" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-600" />
                    {row}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" icon="download" onClick={exportCsv}>
                  Export evaluation CSV
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  icon="refresh"
                  onClick={() => {
                    setCriteria(initialCriteria);
                    setSaved(false);
                  }}
                >
                  Reset demo values
                </Button>
              </div>

              {saved && (
                <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <Icon name="check-circle" className="h-4 w-4" />
                  Evaluation matrix updated in this browser session. Export to keep a copy.
                </p>
              )}
            </Panel>
          </Reveal>
        </div>

        {/* table */}
        <Reveal>
          <Panel className="mt-5 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Evaluation matrix — before AI vs. after AI
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Editable cells: click any value to replace it with your own measurement.
                </p>
              </div>
              <Badge tone="amber" icon="info">
                Editable demo data
              </Badge>
            </div>

            {/* desktop table */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="bg-slate-50 text-[11px] tracking-wide text-slate-500 uppercase">
                  <tr>
                    <th className="w-[18%] px-5 py-3 font-bold">Criteria</th>
                    <th className="w-[27%] px-5 py-3 font-bold">Before AI</th>
                    <th className="w-[27%] px-5 py-3 font-bold">After AI</th>
                    <th className="w-[28%] px-5 py-3 font-bold">Evaluation result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {criteria.map((c) => (
                    <tr key={c.id} className="align-top transition-colors hover:bg-slate-50/60">
                      <td className="px-5 py-4">
                        <p className="text-sm leading-snug font-bold text-slate-900">{c.criteria}</p>
                        <p className="mt-1 text-[11px] font-semibold tracking-wide text-brand-600 uppercase">
                          {c.dimension} · weight {c.weight}%
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{c.description}</p>
                      </td>

                      <td className="px-5 py-4">
                        <textarea
                          value={c.before}
                          onChange={(e) => update(c.id, { before: e.target.value })}
                          rows={4}
                          className={cn(inputBase, "resize-none leading-relaxed")}
                        />
                        <input
                          value={c.metricBefore}
                          onChange={(e) => update(c.id, { metricBefore: e.target.value })}
                          className={cn(inputBase, "mt-2 font-bold")}
                        />
                      </td>

                      <td className="px-5 py-4">
                        <textarea
                          value={c.after}
                          onChange={(e) => update(c.id, { after: e.target.value })}
                          rows={4}
                          className={cn(inputBase, "resize-none leading-relaxed")}
                        />
                        <input
                          value={c.metricAfter}
                          onChange={(e) => update(c.id, { metricAfter: e.target.value })}
                          className={cn(inputBase, "mt-2 font-bold")}
                        />
                      </td>

                      <td className="px-5 py-4">
                        <select
                          value={c.rating}
                          onChange={(e) => update(c.id, { rating: e.target.value as Rating })}
                          className={cn(
                            inputBase,
                            "cursor-pointer font-bold ring-1 ring-inset",
                            ratingStyles[c.rating],
                          )}
                        >
                          {ratingOptions.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                        <textarea
                          value={c.comment}
                          onChange={(e) => update(c.id, { comment: e.target.value })}
                          rows={3}
                          className={cn(inputBase, "mt-2 resize-none leading-relaxed")}
                        />
                        <button
                          onClick={() => {
                            update(c.id, {});
                            setSaved(true);
                          }}
                          className="mt-2 text-[11px] font-bold text-brand-600 hover:text-brand-700 hover:underline"
                        >
                          Mark as reviewed
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* mobile cards */}
            <div className="divide-y divide-slate-100 lg:hidden">
              {criteria.map((c) => (
                <div key={c.id} className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm leading-snug font-bold text-slate-900">{c.criteria}</p>
                      <p className="mt-1 text-[11px] font-semibold tracking-wide text-brand-600 uppercase">
                        {c.dimension} · weight {c.weight}%
                      </p>
                    </div>
                    <select
                      value={c.rating}
                      onChange={(e) => update(c.id, { rating: e.target.value as Rating })}
                      className={cn(
                        inputBase,
                        "w-auto cursor-pointer py-1 text-xs font-bold ring-1 ring-inset",
                        ratingStyles[c.rating],
                      )}
                    >
                      {ratingOptions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-500">{c.description}</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="mb-1.5 text-[11px] font-bold tracking-wide text-slate-500 uppercase">
                        Before AI
                      </p>
                      <textarea
                        value={c.before}
                        onChange={(e) => update(c.id, { before: e.target.value })}
                        rows={3}
                        className={cn(inputBase, "resize-none leading-relaxed")}
                      />
                      <input
                        value={c.metricBefore}
                        onChange={(e) => update(c.id, { metricBefore: e.target.value })}
                        className={cn(inputBase, "mt-2 font-bold")}
                      />
                    </div>
                    <div>
                      <p className="mb-1.5 text-[11px] font-bold tracking-wide text-brand-600 uppercase">
                        After AI
                      </p>
                      <textarea
                        value={c.after}
                        onChange={(e) => update(c.id, { after: e.target.value })}
                        rows={3}
                        className={cn(inputBase, "resize-none leading-relaxed")}
                      />
                      <input
                        value={c.metricAfter}
                        onChange={(e) => update(c.id, { metricAfter: e.target.value })}
                        className={cn(inputBase, "mt-2 font-bold")}
                      />
                    </div>
                  </div>

                  <textarea
                    value={c.comment}
                    onChange={(e) => update(c.id, { comment: e.target.value })}
                    rows={2}
                    className={cn(inputBase, "resize-none leading-relaxed")}
                  />
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>

        <Reveal>
          <DemoNotice className="mt-5">
            {evaluationNote}
          </DemoNotice>
        </Reveal>
      </Container>
    </Section>
  );
}
