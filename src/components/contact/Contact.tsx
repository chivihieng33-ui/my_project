import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { contactInfo, faqs, project } from "@/data/content";
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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const fieldClass = (invalid?: string) =>
  cn(
    "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-300",
    invalid
      ? "border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
      : "border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100",
  );

type FormState = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
};

const interests = [
  "Sales process automation",
  "Sales forecasting",
  "Lead scoring & routing",
  "AI-assisted email & content",
  "Data quality & readiness",
  "Full evaluation review",
];

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    interest: interests[0],
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validate = (values: FormState) => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (values.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!emailPattern.test(values.email.trim())) next.email = "Please enter a valid work email address.";
    if (values.company.trim().length < 2) next.company = "Please enter your company name.";
    if (values.message.trim().length < 20)
      next.message = "Please describe your requirement in at least 20 characters.";
    return next;
  };

  const update = (key: keyof FormState, value: string) => {
    const nextForm = { ...form, [key]: value };
    setForm(nextForm);
    if (touched) setErrors(validate(nextForm));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    // Simulated submission — replace with a POST to your own endpoint or CRM.
    window.setTimeout(() => setStatus("sent"), 1100);
  };

  return (
    <Section id="contact" tone="white">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Request the full evaluation brief"
          description="Ask for the complete methodology, the editable evaluation workbook, or a walkthrough of the dashboard prototype with your own sales data."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* form */}
          <Reveal>
            <Panel className="p-6 sm:p-8">
              {status === "sent" ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Icon name="check-circle" className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-slate-900">Request received</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                    Thank you, {form.name.split(" ")[0]}. Your evaluation brief request has been recorded. In a
                    live deployment this message would create a case in the CRM and notify the sales
                    operations team.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-7"
                    icon="arrow-right"
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", email: "", company: "", interest: interests[0], message: "" });
                      setTouched(false);
                    }}
                  >
                    Send another request
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-600/25">
                      <Icon name="send" className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">Send an enquiry</h3>
                      <p className="text-xs text-slate-500">Typical response time: one working day</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                        Full name *
                      </label>
                      <input
                        id="contact-name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        onBlur={() => {
                          setTouched(true);
                          setErrors(validate(form));
                        }}
                        placeholder="Jane Cooper"
                        className={fieldClass(errors.name)}
                      />
                      {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                        Work email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        onBlur={() => {
                          setTouched(true);
                          setErrors(validate(form));
                        }}
                        placeholder="jane@company.com"
                        className={fieldClass(errors.email)}
                      />
                      {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-company" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                        Company *
                      </label>
                      <input
                        id="contact-company"
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        onBlur={() => {
                          setTouched(true);
                          setErrors(validate(form));
                        }}
                        placeholder="Acme Industries"
                        className={fieldClass(errors.company)}
                      />
                      {errors.company && <p className="mt-1 text-xs text-rose-600">{errors.company}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact-interest" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                        Area of interest
                      </label>
                      <select
                        id="contact-interest"
                        value={form.interest}
                        onChange={(e) => update("interest", e.target.value)}
                        className={cn(fieldClass(), "appearance-none")}
                      >
                        {interests.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="contact-message" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      onBlur={() => {
                        setTouched(true);
                        setErrors(validate(form));
                      }}
                      placeholder="Tell us about your sales process, team size and the outcomes you want to measure…"
                      className={cn(fieldClass(errors.message), "resize-none")}
                    />
                    {errors.message && <p className="mt-1 text-xs text-rose-600">{errors.message}</p>}
                  </div>

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Icon name="lock" className="h-3.5 w-3.5 text-emerald-500" />
                      This prototype does not transmit or store any personal data.
                    </p>
                    <Button type="submit" size="lg" icon="send" loading={status === "sending"}>
                      {status === "sending" ? "Sending…" : "Send request"}
                    </Button>
                  </div>
                </form>
              )}
            </Panel>
          </Reveal>

          {/* info + faq */}
          <div className="space-y-5">
            <Reveal delay={90}>
              <Panel className="p-6">
                <h3 className="text-base font-extrabold text-slate-900">Evaluation team</h3>
                <ul className="mt-4 space-y-3.5">
                  {[
                    { icon: "mail" as const, label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
                    { icon: "phone" as const, label: "Phone", value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/[^\d+]/g, "")}` },
                    { icon: "map-pin" as const, label: "Office", value: contactInfo.address },
                    { icon: "clock" as const, label: "Hours", value: contactInfo.hours },
                  ].map((row) => (
                    <li key={row.label} className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                        <Icon name={row.icon} className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold tracking-wide text-slate-400 uppercase">{row.label}</p>
                        {row.href ? (
                          <a href={row.href} className="break-words text-sm font-semibold text-slate-800 hover:text-brand-600">
                            {row.value}
                          </a>
                        ) : (
                          <p className="text-sm leading-relaxed font-semibold text-slate-800">{row.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-xl bg-slate-50 p-4">
                  <p className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Icon name="file-text" className="h-3.5 w-3.5 text-brand-600" />
                    Deliverables
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                    {[
                      "Evaluation workbook (CSV) with editable results",
                      "Sample dataset used by this prototype",
                      "Automation workflow diagram",
                      "Six-month pilot plan and success metrics",
                    ].map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <Icon name="check" className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={140}>
              <Panel className="overflow-hidden">
                <div className="border-b border-slate-100 px-6 py-4">
                  <h3 className="text-base font-extrabold text-slate-900">Frequently asked questions</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {faqs.map((faq, i) => (
                    <div key={faq.q}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-slate-50"
                      >
                        <span className="text-sm font-bold text-slate-800">{faq.q}</span>
                        <Icon
                          name="chevron-down"
                          className={cn(
                            "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300",
                            openFaq === i && "rotate-180",
                          )}
                        />
                      </button>
                      {openFaq === i && (
                        <p className="animate-fade-in px-6 pb-4 text-sm leading-relaxed text-slate-500">{faq.a}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={180}>
              <DemoNotice>{project.disclaimer}</DemoNotice>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand" icon="check-circle">
                  No Salesforce credentials required
                </Badge>
                <Badge tone="slate" icon="database">
                  Sample data only
                </Badge>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
