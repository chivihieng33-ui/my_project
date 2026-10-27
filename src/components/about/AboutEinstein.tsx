import { aboutPoints, benefitCards, integrationPoints, supportColumns } from "@/data/content";
import { Icon, type IconName } from "../Icon";
import { Container, IconTile, Panel, Reveal, Section, SectionHeading } from "../common";

export function AboutEinstein() {
  return (
    <Section id="about-ai" tone="canvas">
      <Container>
        <SectionHeading
          eyebrow={aboutPoints.eyebrow}
          title={aboutPoints.title}
          description={aboutPoints.lead}
        />

        {/* narrative + pillars */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            {aboutPoints.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className="text-[15px] leading-loose text-slate-600">{p}</p>
              </Reveal>
            ))}

            <div className="mt-8 space-y-3">
              {aboutPoints.pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={120 + i * 80}>
                  <div className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-300 hover:border-brand-200 hover:shadow-md hover:shadow-slate-200/50">
                    <IconTile name={pillar.icon as IconName} tone={i === 1 ? "violet" : "brand"} />
                    <div>
                      <h3 className="text-[15px] font-bold text-slate-900">{pillar.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{pillar.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* integration diagram */}
          <Reveal delay={140}>
            <Panel className="relative overflow-hidden p-6">
              <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand-100/70 blur-3xl" />
              <h3 className="relative text-lg font-extrabold text-slate-900">
                How it integrates with the CRM
              </h3>
              <p className="relative mt-1.5 text-sm text-slate-500">
                Einstein operates on the records your team already maintains.
              </p>

              <div className="relative mt-6 space-y-3">
                {integrationPoints.map((point, i) => (
                  <div key={point.title} className="relative flex gap-3.5">
                    {i < integrationPoints.length - 1 && (
                      <span className="absolute top-11 left-[19px] h-[calc(100%-6px)] w-px bg-gradient-to-b from-brand-200 to-slate-100" />
                    )}
                    <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-600">
                      <Icon name={point.icon as IconName} className="h-4.5 w-4.5" />
                    </span>
                    <div className="pt-0.5">
                      <p className="text-sm font-bold text-slate-900">{point.title}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-slate-500">{point.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative mt-6 rounded-xl bg-navy-900 p-4 text-white">
                <p className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <Icon name="lock" className="h-3.5 w-3.5" />
                  Einstein Trust Layer
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                  Prompts and grounding data are masked, permission-aware and never used to train a shared
                  model — a prerequisite for any production rollout.
                </p>
              </div>
            </Panel>
          </Reveal>
        </div>

        {/* who benefits */}
        <div className="mt-16">
          <Reveal>
            <h3 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              How AI supports the sales team
            </h3>
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {supportColumns.map((col, i) => (
              <Reveal key={col.role} delay={i * 90}>
                <Panel hover className="h-full p-6">
                  <div className="flex items-center gap-3">
                    <IconTile name={col.icon as IconName} tone={i === 0 ? "brand" : "navy"} />
                    <h3 className="text-lg font-extrabold text-slate-900">{col.role}</h3>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {col.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                        <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-brand-50">
                          <Icon name="check" className="h-3 w-3 text-brand-600" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>

        {/* benefits */}
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {benefitCards.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <Panel className="group relative h-full overflow-hidden p-6 text-center">
                <div className="pointer-events-none absolute -top-12 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-brand-100/70 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative mx-auto w-fit">
                  <IconTile name={b.icon as IconName} tone={i === 1 ? "emerald" : i === 2 ? "violet" : "brand"} />
                </div>
                <p className="relative mt-4 text-3xl font-extrabold tracking-tight text-brand-700">{b.stat}</p>
                <h3 className="relative mt-1.5 text-[15px] font-bold text-slate-900">{b.title}</h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-slate-500">{b.body}</p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
