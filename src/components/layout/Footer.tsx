import { contactInfo, navLinks, project } from "@/data/content";
import { Icon } from "../Icon";
import { Container } from "../common";

const columns = [
  {
    title: "Evaluation",
    links: [
      { label: "About Einstein AI", href: "#about-ai" },
      { label: "Sales Process Automation", href: "#automation" },
      { label: "Sales Dashboard", href: "#dashboard" },
      { label: "Evaluation & Analysis", href: "#evaluation" },
    ],
  },
  {
    title: "Data",
    links: [
      { label: "Monthly Sales Reports", href: "#reports" },
      { label: "Lead & Customer Manager", href: "#crm" },
      { label: "CSV Export", href: "#reports" },
      { label: "Sample Methodology", href: "#evaluation" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contact the Team", href: "#contact" },
      { label: "Scope & Limitations", href: "#contact" },
      { label: "Data Disclaimer", href: "#home" },
      { label: "FAQ", href: "#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-slate-300">
      <div className="pointer-events-none absolute inset-0 bg-dot-dark opacity-40" />
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-brand-600/20 blur-3xl" />

      <Container className="relative py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700">
                <svg viewBox="0 0 24 24" className="h-5.5 w-5.5 text-white" fill="currentColor">
                  <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
                  <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" opacity=".85" />
                  <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" opacity=".55" />
                  <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-white">Einstein AI for Sales</p>
                <p className="text-[10px] font-semibold tracking-[0.16em] text-slate-500 uppercase">
                  Evaluation Prototype
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {project.subtitle}
            </p>

            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-brand-400" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-brand-400" />
                <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`} className="hover:text-white">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-bold text-white">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
                      >
                        <span className="h-1 w-1 rounded-full bg-slate-600 transition-colors group-hover:bg-brand-400" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Quick navigation</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-brand-400/50 hover:bg-brand-500/15 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Icon name="alert" className="h-3.5 w-3.5" />
                Data disclaimer
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {project.disclaimer}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {project.company}. Built for academic &amp; business evaluation.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <Icon name="lock" className="h-3.5 w-3.5" />
            No Salesforce credentials are stored or transmitted by this prototype.
          </p>
        </div>
      </Container>
    </footer>
  );
}
