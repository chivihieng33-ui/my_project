import { hero, project } from "@/data/content";
import { Icon } from "../Icon";
import { Badge, Button, Container, Reveal } from "../common";

function HeroIllustration() {
  return (
    <div className="relative">
      {/* glow */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_55%_35%,rgba(37,99,235,0.18),transparent_62%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)]">
        {/* app bar */}
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>
          <span className="ml-2 hidden items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200 sm:flex">
            <Icon name="cloud" className="h-3.5 w-3.5 text-brand-500" />
            salescloud.mycompany.com/opportunity
          </span>
          <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700 sm:flex">
            <Icon name="sparkles" className="h-3 w-3" />
            Einstein
          </span>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-[1.25fr_0.85fr]">
          {/* main column */}
          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                Opportunity · Globex Corporation
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900">CRM Enterprise — FY25</h3>
                <Badge tone="emerald" icon="check">
                  Commit
                </Badge>
              </div>
            </div>

            {/* metric row */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { k: "Amount", v: "$365K" },
                { k: "Close date", v: "12 Feb" },
                { k: "Win prob.", v: "78%" },
              ].map((m) => (
                <div key={m.k} className="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5">
                  <p className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">
                    {m.k}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-slate-800">{m.v}</p>
                </div>
              ))}
            </div>

            {/* Einstein insight */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-brand-800 p-4 text-white">
              <div className="pointer-events-none absolute -top-10 -right-6 h-28 w-28 rounded-full bg-brand-400/25 blur-2xl" />
              <div className="relative flex items-center gap-2">
                <Icon name="sparkles" className="h-4 w-4 text-cyan-300" />
                <p className="text-[11px] font-bold tracking-wide text-cyan-200 uppercase">
                  Einstein opportunity insights
                </p>
              </div>
              <p className="relative mt-2.5 text-sm leading-relaxed text-slate-100">
                Recommend a 3-year term with a 12% volume discount. Buying intent increased 22% after
                the last two product briefings.
              </p>
              <div className="relative mt-3.5 flex flex-wrap gap-2">
                {["Send proposal", "Schedule exec call", "Add to commit"].map((a) => (
                  <span
                    key={a}
                    className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[11px] font-semibold ring-1 ring-white/15"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* pipeline chart */}
            <div className="rounded-2xl border border-slate-100 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                  Pipeline coverage
                </span>
                <span className="text-[11px] font-bold text-emerald-600">3.1× coverage</span>
              </div>
              <svg viewBox="0 0 300 70" className="h-16 w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="heroBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
                {[16, 36, 56].map((y) => (
                  <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#eef1f7" strokeWidth="1" />
                ))}
                {[22, 40, 58, 76, 94, 112, 130, 148].map((x, i) => {
                  const heights = [34, 46, 28, 54, 42, 58, 38, 50];
                  return (
                    <rect
                      key={x}
                      x={x}
                      y={66 - heights[i]}
                      width="14"
                      height={heights[i]}
                      rx="4"
                      fill="url(#heroBar)"
                      opacity={0.55 + i * 0.06}
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* side column */}
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
              <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                Einstein score
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-extrabold text-slate-900">92</span>
                <span className="mb-1 text-xs font-semibold text-slate-400">/ 100</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" />
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                Top 8% of opportunities this quarter
              </p>
            </div>

            {[
              { icon: "route" as const, t: "Lead routed in 22s", s: "Assignment rules + AI" },
              { icon: "bell" as const, t: "Next follow-up set", s: "Automated reminder" },
              { icon: "chart" as const, t: "Forecast refreshed", s: "Continuous model update" },
            ].map((row) => (
              <div
                key={row.t}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name={row.icon} className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-slate-800">{row.t}</p>
                  <p className="truncate text-[11px] text-slate-400">{row.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating cards */}
      <div className="absolute -top-5 -left-4 hidden animate-float items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-xl shadow-slate-300/40 sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
          <Icon name="trending-up" className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="text-xs font-bold text-slate-800">+28.4% conversion</p>
          <p className="text-[10px] text-slate-400">vs. manual routing</p>
        </div>
      </div>

      <div className="absolute -right-5 bottom-10 hidden animate-float rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl shadow-slate-300/40 sm:block [animation-delay:1.2s]">
        <p className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
          Forecast accuracy
        </p>
        <p className="mt-0.5 text-xl font-extrabold text-brand-700">92.2%</p>
        <div className="mt-1.5 h-1.5 w-28 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-[92%] rounded-full bg-brand-500" />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]" />
        <div className="absolute -top-32 left-1/2 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(37,99,235,0.14),transparent_65%)] blur-3xl" />
        <div className="absolute top-64 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.12),transparent_65%)] blur-3xl" />
        <div className="absolute top-40 -right-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12),transparent_65%)] blur-3xl" />
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        {/* copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            {hero.eyebrow}
          </span>

          <h1 className="mt-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
            Transform Your Sales with{" "}
            <span className="text-gradient-brand">Salesforce Einstein AI</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primaryTarget} size="lg" icon="arrow-right" className="w-full sm:w-auto">
              {hero.primary}
            </Button>
            <Button
              href={hero.secondaryTarget}
              size="lg"
              variant="outline"
              icon="dashboard"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              {hero.secondary}
            </Button>
          </div>

          <p className="mt-5 flex items-center gap-2 text-xs text-slate-400">
            <Icon name="info" className="h-3.5 w-3.5 text-brand-500" />
            {project.disclaimer}
          </p>

          {/* stat strip */}
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-slate-200 pt-8 sm:grid-cols-4">
            {hero.points.map((p) => (
              <div key={p.label}>
                <dt className="text-2xl font-extrabold tracking-tight text-slate-900">{p.value}</dt>
                <dd className="mt-1 text-xs font-semibold text-slate-600">{p.label}</dd>
                <dd className="text-[11px] text-slate-400">{p.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* illustration */}
        <Reveal delay={120} className="lg:pl-4">
          <HeroIllustration />
        </Reveal>
      </Container>

      {/* logo / capability strip */}
      <Container className="mt-16">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl border border-slate-200/80 bg-white/70 px-6 py-5 backdrop-blur">
            <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
              Platform capabilities evaluated
            </span>
            {[
              { icon: "cloud" as const, label: "Sales Cloud" },
              { icon: "database" as const, label: "Data Cloud" },
              { icon: "brain" as const, label: "Einstein AI" },
              { icon: "flow" as const, label: "Flow Automation" },
              { icon: "analytics" as const, label: "CRM Analytics" },
            ].map((c) => (
              <span key={c.label} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <Icon name={c.icon} className="h-4.5 w-4.5 text-brand-500" />
                {c.label}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
