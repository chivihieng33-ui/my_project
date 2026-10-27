import { automationFeatures, workflowSteps } from "@/data/content";
import { Icon, type IconName } from "../Icon";
import { Badge, Container, Panel, Reveal, Section, SectionHeading } from "../common";

export function Automation() {
  return (
    <Section id="automation" tone="white">
      <Container>
        <SectionHeading
          eyebrow="Sales process automation"
          title="Automating the sales process from lead to close"
          description="Six automation capabilities were trialled against the existing manual process. For each one we recorded the before state, the Einstein-enabled after state and the business effect."
        />

        {/* feature cards */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {automationFeatures.map((f, i) => (
            <Reveal key={f.id} delay={i * 70}>
              <Panel hover className="group flex h-full flex-col p-6">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-600/25 transition-transform duration-300 group-hover:scale-105">
                    <Icon name={f.icon as IconName} className="h-5.5 w-5.5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[17px] leading-snug font-bold text-slate-900">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.description}</p>
                  </div>
                </div>

                {/* before / after */}
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                    <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-slate-500 uppercase">
                      <Icon name="clock" className="h-3.5 w-3.5" />
                      Before AI
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{f.before}</p>
                  </div>
                  <div className="rounded-xl border border-brand-100 bg-brand-50/60 p-3.5">
                    <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-brand-700 uppercase">
                      <Icon name="sparkles" className="h-3.5 w-3.5" />
                      After AI
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-brand-900/80">{f.after}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {f.bullets.map((b) => (
                    <span
                      key={b}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4">
                  <Badge tone="brand" icon="layers">
                    {f.capability}
                  </Badge>
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>

        {/* workflow */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              The automated sales workflow
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-slate-500">
              Five stages, each handled by a different Einstein capability. Compare the manual effort with
              the AI-assisted effort at every step.
            </p>
          </Reveal>

          <div className="relative mt-12">
            {/* connector */}
            <div className="absolute top-[38px] right-0 left-0 hidden h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-cyan-300 lg:block" />

            <ol className="grid gap-6 lg:grid-cols-5 lg:gap-4">
              {workflowSteps.map((step, i) => (
                <Reveal key={step.id} delay={i * 90} as="li">
                  <div className="group relative flex h-full flex-col text-center lg:text-left">
                    <div className="relative mx-auto lg:mx-0">
                      <span className="relative z-10 grid h-[76px] w-[76px] place-items-center rounded-2xl border border-slate-200 bg-white text-brand-600 shadow-lg shadow-slate-200/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-300 group-hover:text-brand-700">
                        <Icon name={step.icon as IconName} className="h-7 w-7" />
                        <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-navy-900 text-[10px] font-extrabold text-white">
                          {step.number}
                        </span>
                      </span>
                    </div>

                    <h4 className="mt-5 text-base font-extrabold text-slate-900">{step.title}</h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-500">{step.description}</p>

                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left">
                      <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">
                        Einstein capability
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-slate-700">{step.capability}</p>
                    </div>

                    <div className="mt-3 space-y-1.5 text-left">
                      <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-2.5 py-1.5">
                        <Icon name="user" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span className="text-[11px] text-slate-500 line-through decoration-slate-400/60">
                          {step.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-brand-50 px-2.5 py-1.5">
                        <Icon name="sparkles" className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                        <span className="text-[11px] font-semibold text-brand-800">{step.aiTime}</span>
                      </div>
                    </div>

                    <p className="mt-3 text-left text-[11px] font-semibold text-emerald-700">
                      {step.metric}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
