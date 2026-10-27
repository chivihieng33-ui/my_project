import { useMemo, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import {
  crmOwners,
  initialLeads,
  leadSources,
  leadStages,
  scoreBand,
  stageColor,
  type Lead,
  type LeadSource,
  type LeadStage,
} from "@/data/crm";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import { useAsyncData } from "@/hooks/useAsyncData";
import { Icon } from "../Icon";
import { CalcResult, EditableKpi, readStoredKpi } from "../common/EditableKpi";
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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-300";

const fieldClass = (invalid?: string) =>
  cn(
    inputBase,
    invalid
      ? "border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
      : "border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100",
  );

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  source: LeadSource;
  stage: LeadStage;
  score: string;
  value: string;
  followUp: string;
  owner: string;
  location: string;
};

const emptyForm: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  source: "Inbound Web",
  stage: "New",
  score: "50",
  value: "50000",
  followUp: "2025-12-15",
  owner: crmOwners[0],
  location: "",
};

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (form.name.trim().length < 2) errors.name = "Enter the contact name.";
  if (form.company.trim().length < 2) errors.company = "Enter the company name.";
  if (!emailPattern.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (form.phone.trim() && form.phone.trim().length < 6) errors.phone = "Enter a valid phone number.";
  const score = Number(form.score);
  if (Number.isNaN(score) || score < 0 || score > 100) errors.score = "Score must be between 0 and 100.";
  const value = Number(form.value);
  if (Number.isNaN(value) || value < 0) errors.value = "Expected value must be zero or greater.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.followUp)) errors.followUp = "Choose a follow-up date.";
  return errors;
}

export function CustomerManagement() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<"All" | LeadStage>("All");
  const [source, setSource] = useState<"All" | LeadSource>("All");
  const [minScore, setMinScore] = useState(0);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const { loading } = useAsyncData(() => initialLeads, 700);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      if (stage !== "All" && lead.stage !== stage) return false;
      if (source !== "All" && lead.source !== source) return false;
      if (lead.score < minScore) return false;
      if (!q) return true;
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.owner.toLowerCase().includes(q)
      );
    });
  }, [leads, query, stage, source, minScore]);

  const stats = useMemo(() => {
    const open = leads.filter((l) => l.stage !== "Closed Won" && l.stage !== "Closed Lost");
    const pipeline = open.reduce((sum, l) => sum + l.value, 0);
    const hot = leads.filter((l) => l.score >= 80).length;
    const avg = leads.length ? leads.reduce((s, l) => s + l.score, 0) / leads.length : 0;
    const won = leads.filter((l) => l.stage === "Closed Won").length;
    return { pipeline, hot, avg: Math.round(avg), won, total: leads.length, open: open.length };
  }, [leads]);

  const [kpi, setKpi] = useState(() => {
    const saved = readStoredKpi<typeof stats>("einstein-crm-kpis");
    return saved ?? { pipeline: stats.pipeline, hot: stats.hot, avg: stats.avg, won: stats.won, total: stats.total, open: stats.open };
  });

  const saveKpi = (next: typeof kpi) => {
    setKpi(next);
    localStorage.setItem("einstein-crm-kpis", JSON.stringify(next));
  };

  const calculateKpis = () => {
    saveKpi({
      pipeline: stats.pipeline,
      hot: stats.hot,
      avg: stats.avg,
      won: stats.won,
      total: stats.total,
      open: stats.open,
    });
    showToast("Calculated from the lead records.");
  };

  const winRate = kpi.total > 0 ? (kpi.won / kpi.total) * 100 : 0;
  const perHot = kpi.hot > 0 ? kpi.pipeline / kpi.hot : 0;
  const perOpen = kpi.open > 0 ? kpi.pipeline / kpi.open : 0;

  const priorityQueue = useMemo(
    () =>
      [...leads]
        .filter((l) => l.stage !== "Closed Won" && l.stage !== "Closed Lost")
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    [leads],
  );

  const openAdd = () => {
    setForm(emptyForm);
    setErrors({});
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (lead: Lead) => {
    setForm({
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      stage: lead.stage,
      score: String(lead.score),
      value: String(lead.value),
      followUp: lead.followUp,
      owner: lead.owner,
      location: lead.location,
    });
    setErrors({});
    setEditingId(lead.id);
    setModalOpen(true);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    const payload = {
      ...form,
      score: Number(form.score),
      value: Number(form.value),
    };

    if (editingId) {
      setLeads((prev) => prev.map((l) => (l.id === editingId ? { ...l, ...payload } : l)));
      showToast(`${form.name} updated successfully.`);
    } else {
      const nextId = `LD-${2056 + leads.length - initialLeads.length}`;
      setLeads((prev) => [
        {
          id: nextId,
          lastActivity: new Date().toISOString().slice(0, 10),
          ...payload,
        },
        ...prev,
      ]);
      showToast(`${form.name} added to the lead queue.`);
    }

    setModalOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setLeads((prev) => prev.filter((l) => l.id !== deleteTarget.id));
    showToast(`${deleteTarget.name} removed from the demo records.`);
    setDeleteTarget(null);
  };

  const resetFilters = () => {
    setQuery("");
    setStage("All");
    setSource("All");
    setMinScore(0);
  };

  const today = "2025-12-03";

  return (
    <Section id="crm" tone="canvas">
      <Container>
        <SectionHeading
          eyebrow="Customer & lead management"
          title="A working CRM view of customers, leads and opportunities"
          description="Search, filter, add, edit and delete demo customer records. The layout mirrors a Salesforce Lightning pipeline board, with an AI priority queue ranked by Einstein lead score."
        />

        <div className="mt-8">
          <DemoNotice>
            These customer records are fictional demo data held in your browser only. Add, edit and delete
            operations do not call any external API.
          </DemoNotice>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">Click any number to edit it, then read the calculated results below.</p>
          <Button icon="refresh" onClick={calculateKpis}>
            Calculate from records
          </Button>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <EditableKpi label="Open pipeline value" icon="pipeline" kind="currency" value={kpi.pipeline} onChange={(pipeline) => saveKpi({ ...kpi, pipeline })} />
          <EditableKpi label="Hot leads (score ≥ 80)" icon="target" kind="number" value={kpi.hot} onChange={(hot) => saveKpi({ ...kpi, hot })} />
          <EditableKpi label="Average lead score" icon="sparkles" kind="number" value={kpi.avg} onChange={(avg) => saveKpi({ ...kpi, avg })} />
          <EditableKpi label="Deals closed won" icon="trophy" kind="number" value={kpi.won} onChange={(won) => saveKpi({ ...kpi, won })} />
          <EditableKpi label="Total leads" icon="users" kind="number" value={kpi.total} onChange={(total) => saveKpi({ ...kpi, total })} />
          <EditableKpi label="Open opportunities" icon="briefcase" kind="number" value={kpi.open} onChange={(open) => saveKpi({ ...kpi, open })} />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <CalcResult
            label="Win rate"
            value={`${winRate.toFixed(1)}%`}
            formula={`${formatNumber(kpi.won)} closed won ÷ ${formatNumber(kpi.total)} total leads × 100`}
            tone={winRate >= 20 ? "emerald" : "amber"}
          />
          <CalcResult
            label="Value per hot lead"
            value={formatCurrency(perHot)}
            formula={`${formatCurrency(kpi.pipeline)} pipeline ÷ ${formatNumber(kpi.hot)} hot leads`}
          />
          <CalcResult
            label="Value per open deal"
            value={formatCurrency(perOpen)}
            formula={`${formatCurrency(kpi.pipeline)} pipeline ÷ ${formatNumber(kpi.open)} open deals`}
          />
        </div>

        {/* AI priority queue */}
        <Reveal>
          <Panel className="mt-5 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-600/25">
                  <Icon name="sparkles" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">AI priority queue</h3>
                  <p className="text-xs text-slate-500">
                    Ranked by Einstein lead score — sample recommendation engine
                  </p>
                </div>
              </div>
              <Badge tone="brand" icon="conversion">
                3 of {leads.filter((l) => l.stage !== "Closed Won" && l.stage !== "Closed Lost").length} open
              </Badge>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {priorityQueue.map((lead, i) => (
                <div
                  key={lead.id}
                  className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-600 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <Badge tone={lead.score >= 80 ? "emerald" : "amber"}>{scoreBand(lead.score).label}</Badge>
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-900">{lead.name}</p>
                  <p className="text-xs text-slate-500">{lead.company}</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Score {lead.score}</span>
                    <span className="font-bold text-slate-800">{formatCurrency(lead.value)}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 transition-all duration-700"
                      style={{ width: `${lead.score}%` }}
                    />
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-brand-700">
                    <Icon name="compass" className="h-3.5 w-3.5" />
                    Next best action: {lead.stage === "Qualified" ? "send proposal" : "schedule call"}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>

        {/* toolbar */}
        <Reveal>
          <Panel className="mt-5 p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              <div className="min-w-0 flex-1">
                <label htmlFor="crm-search" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                  Search
                </label>
                <div className="relative">
                  <Icon name="search" className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="crm-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, company, email or owner…"
                    className={cn(fieldClass(), "pl-10")}
                  />
                </div>
              </div>

              <div className="lg:w-44">
                <label htmlFor="crm-stage" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                  Stage
                </label>
                <div className="relative">
                  <select id="crm-stage" value={stage} onChange={(e) => setStage(e.target.value as LeadStage | "All")} className={cn(fieldClass(), "appearance-none pr-10")}>
                    <option value="All">All stages</option>
                    {leadStages.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevron-down" className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="lg:w-44">
                <label htmlFor="crm-source" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                  Source
                </label>
                <div className="relative">
                  <select id="crm-source" value={source} onChange={(e) => setSource(e.target.value as LeadSource | "All")} className={cn(fieldClass(), "appearance-none pr-10")}>
                    <option value="All">All sources</option>
                    {leadSources.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevron-down" className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="lg:w-48">
                <label htmlFor="crm-score" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                  Min. lead score: <span className="text-brand-600">{minScore}</span>
                </label>
                <input
                  id="crm-score"
                  type="range"
                  min={0}
                  max={100}
                  step={10}
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  className="h-10 w-full cursor-pointer accent-brand-600"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" icon="refresh" onClick={resetFilters}>
                  Reset
                </Button>
                <Button icon="plus" onClick={openAdd}>
                  Add lead
                </Button>
              </div>
            </div>
          </Panel>
        </Reveal>

        {/* records */}
        <Reveal>
          <Panel className="mt-5 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Customer & opportunity records</h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  {filtered.length} of {leads.length} records shown
                </p>
              </div>
              <Badge tone="slate" icon="database">
                Local demo dataset
              </Badge>
            </div>

            {loading ? (
              <div className="space-y-3 p-5 sm:p-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-6">
                <EmptyState
                  icon="search"
                  title="No records match your search"
                  description="Try a different keyword, widen the filters, or add a new demo customer record."
                  action={
                    <div className="flex flex-wrap justify-center gap-2">
                      <Button variant="outline" icon="refresh" onClick={resetFilters}>
                        Reset filters
                      </Button>
                      <Button icon="plus" onClick={openAdd}>
                        Add lead
                      </Button>
                    </div>
                  }
                />
              </div>
            ) : (
              <>
                {/* desktop table */}
                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full min-w-[1100px] text-left text-sm">
                    <thead className="bg-slate-50 text-[11px] tracking-wide text-slate-500 uppercase">
                      <tr>
                        <th className="px-5 py-3 font-bold">Customer</th>
                        <th className="px-5 py-3 font-bold">Contact</th>
                        <th className="px-5 py-3 font-bold">Source</th>
                        <th className="px-5 py-3 font-bold">Lead score</th>
                        <th className="px-5 py-3 font-bold">Stage</th>
                        <th className="px-5 py-3 text-right font-bold">Expected value</th>
                        <th className="px-5 py-3 font-bold">Follow-up</th>
                        <th className="px-5 py-3 text-right font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((lead) => {
                        const band = scoreBand(lead.score);
                        const overdue = lead.followUp < today && lead.stage !== "Closed Won" && lead.stage !== "Closed Lost";
                        return (
                          <tr key={lead.id} className="transition-colors hover:bg-slate-50/70">
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
                                  {lead.name
                                    .split(" ")
                                    .map((w) => w[0])
                                    .join("")
                                    .slice(0, 2)}
                                </span>
                                <div className="min-w-0">
                                  <p className="truncate font-bold text-slate-900">{lead.name}</p>
                                  <p className="truncate text-xs text-slate-500">
                                    {lead.company} · {lead.location}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5">
                              <p className="truncate text-xs text-slate-700">{lead.email}</p>
                              <p className="text-[11px] text-slate-400">{lead.phone}</p>
                            </td>
                            <td className="px-5 py-3.5">
                              <Badge tone="slate">{lead.source}</Badge>
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-2">
                                <span className={cn("rounded-md px-2 py-0.5 text-xs font-bold ring-1 ring-inset", band.bg, band.color, band.ring)}>
                                  {lead.score}
                                </span>
                                <span className="text-[11px] text-slate-400">{band.label}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className={cn("rounded-md px-2 py-0.5 text-xs font-bold ring-1 ring-inset", stageColor(lead.stage))}>
                                {lead.stage}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right font-bold text-slate-900">
                              {formatCurrency(lead.value)}
                            </td>
                            <td className="px-5 py-3.5">
                              <span className={cn("text-xs font-semibold", overdue ? "text-rose-600" : "text-slate-600")}>
                                {formatDate(lead.followUp)}
                              </span>
                              {overdue && (
                                <span className="mt-0.5 flex items-center gap-1 text-[10px] font-bold text-rose-500">
                                  <Icon name="alert" className="h-3 w-3" />
                                  Overdue
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => openEdit(lead)}
                                  aria-label={`Edit ${lead.name}`}
                                  className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                                >
                                  <Icon name="pencil" className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => setDeleteTarget(lead)}
                                  aria-label={`Delete ${lead.name}`}
                                  className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                                >
                                  <Icon name="trash" className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* mobile cards */}
                <div className="divide-y divide-slate-100 lg:hidden">
                  {filtered.map((lead) => {
                    const band = scoreBand(lead.score);
                    return (
                      <div key={lead.id} className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
                            {lead.name
                              .split(" ")
                              .map((w) => w[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-slate-900">{lead.name}</p>
                            <p className="truncate text-xs text-slate-500">{lead.company}</p>
                            <p className="mt-0.5 truncate text-[11px] text-slate-400">{lead.email}</p>
                          </div>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => openEdit(lead)}
                              aria-label={`Edit ${lead.name}`}
                              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500"
                            >
                              <Icon name="pencil" className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(lead)}
                              aria-label={`Delete ${lead.name}`}
                              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500"
                            >
                              <Icon name="trash" className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className={cn("rounded-md px-2 py-0.5 text-xs font-bold ring-1 ring-inset", stageColor(lead.stage))}>
                            {lead.stage}
                          </span>
                          <Badge tone="slate">{lead.source}</Badge>
                          <span className={cn("rounded-md px-2 py-0.5 text-xs font-bold ring-1 ring-inset", band.bg, band.color, band.ring)}>
                            Score {lead.score}
                          </span>
                          <span className="ml-auto text-sm font-extrabold text-slate-900">
                            {formatCurrency(lead.value)}
                          </span>
                        </div>

                        <p className="mt-2.5 text-[11px] text-slate-500">
                          Follow-up: {formatDate(lead.followUp)} · Owner: {lead.owner}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </Panel>
        </Reveal>
      </Container>

      {/* modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-navy-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-6">
          <div className="relative w-full max-w-2xl animate-slide-up rounded-t-3xl bg-white shadow-2xl sm:rounded-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {editingId ? "Edit customer record" : "Add customer record"}
                </h3>
                <p className="text-xs text-slate-500">
                  {editingId ? `Updating ${editingId}` : "Creates a new demo lead in the local dataset"}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submit} className="max-h-[70vh] overflow-y-auto px-6 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="m-name" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Contact name *
                  </label>
                  <input id="m-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldClass(errors.name)} placeholder="Jane Cooper" />
                  {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="m-company" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Company *
                  </label>
                  <input id="m-company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={fieldClass(errors.company)} placeholder="Acme Industries" />
                  {errors.company && <p className="mt-1 text-xs text-rose-600">{errors.company}</p>}
                </div>

                <div>
                  <label htmlFor="m-email" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Email *
                  </label>
                  <input id="m-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={fieldClass(errors.email)} placeholder="jane@acme.example" />
                  {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="m-phone" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Phone
                  </label>
                  <input id="m-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={fieldClass(errors.phone)} placeholder="+1 555 0100" />
                  {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="m-source" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Lead source
                  </label>
                  <select id="m-source" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value as LeadSource })} className={cn(fieldClass(), "appearance-none")}>
                    {leadSources.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="m-stage" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Opportunity stage
                  </label>
                  <select id="m-stage" value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value as LeadStage })} className={cn(fieldClass(), "appearance-none")}>
                    {leadStages.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="m-score" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Einstein lead score (0–100)
                  </label>
                  <input id="m-score" type="number" min={0} max={100} value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} className={fieldClass(errors.score)} />
                  {errors.score && <p className="mt-1 text-xs text-rose-600">{errors.score}</p>}
                </div>

                <div>
                  <label htmlFor="m-value" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Expected deal value (USD)
                  </label>
                  <input id="m-value" type="number" min={0} value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} className={fieldClass(errors.value)} />
                  {errors.value && <p className="mt-1 text-xs text-rose-600">{errors.value}</p>}
                </div>

                <div>
                  <label htmlFor="m-followup" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Follow-up date *
                  </label>
                  <input id="m-followup" type="date" value={form.followUp} onChange={(e) => setForm({ ...form, followUp: e.target.value })} className={fieldClass(errors.followUp)} />
                  {errors.followUp && <p className="mt-1 text-xs text-rose-600">{errors.followUp}</p>}
                </div>

                <div>
                  <label htmlFor="m-owner" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Owner
                  </label>
                  <select id="m-owner" value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className={cn(fieldClass(), "appearance-none")}>
                    {crmOwners.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="m-location" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Location
                  </label>
                  <input id="m-location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={fieldClass()} placeholder="Berlin, Germany" />
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" icon="check">
                  {editingId ? "Save changes" : "Add lead"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-6 backdrop-blur-sm">
          <div className="w-full max-w-sm animate-slide-up rounded-2xl bg-white p-6 shadow-2xl">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-rose-50 text-rose-600">
              <Icon name="alert" className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-slate-900">Delete this record?</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
              {deleteTarget.name} from {deleteTarget.company} will be removed from the local demo dataset.
              This cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button variant="dark" className="flex-1" icon="trash" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-xl bg-navy-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl animate-fade-in">
          <Icon name="check-circle" className="h-4.5 w-4.5 text-emerald-400" />
          {toast}
        </div>
      )}
    </Section>
  );
}
