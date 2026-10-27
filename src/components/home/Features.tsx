import { featureItems } from "@/data/content";
import { Icon, type IconName } from "../Icon";
import { Badge, Container, IconTile, Panel, Reveal, Section, SectionHeading } from "../common";

export function Features() {
  return (
    <Section id="features" tone="white">
      <Container>
        <SectionHeading
          eyebrow="Core capabilities"
          title="Explore the Einstein AI features under evaluation"
          description="Each capability below was assessed on measurable business impact: time released, conversion gained, forecast accuracy improved and risk introduced."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featureItems.map((feature, i) => (
            <Reveal key={feature.id} delay={i * 60}>
              <Panel hover className="group flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <IconTile name={feature.icon as IconName} />
                  <span className="font-mono text-[11px] text-slate-300 transition-colors group-hover:text-brand-400">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-[17px] leading-snug font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{feature.description}</p>

                <ul className="mt-4 space-y-2">
                  {feature.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[13px] text-slate-600">
                      <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5">
                  <Badge tone="slate" icon="layers">
                    {feature.tag}
                  </Badge>
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
