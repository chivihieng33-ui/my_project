import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "../Icon";
import { Button } from "../common";

const steps: { icon: IconName; title: string; khmer: string; body: string }[] = [
  {
    icon: "globe",
    title: "1. Open the site",
    khmer: "បើកគេហទំព័រ",
    body: "Open the site. On the blue login screen, click the big button “Sign in as Sarah Mitchell”. You do not need to type a password. After that you land on the sales dashboard.",
  },
  {
    icon: "compass",
    title: "2. Just scroll — it tells a story",
    khmer: "អាចទាន់តែអូសដ្ឋាន",
    body: "The page is one long story: What is Einstein AI → How it automates sales → The numbers → Was it worth it → The reports → The customer records. Scroll slowly and read top to bottom.",
  },
  {
    icon: "dashboard",
    title: "3. Play with the dashboard",
    khmer: "សម្រុងផ្ទាំង Dashboard",
    body: "On the Sales Dashboard click Q1, Q2, Q3, Q4 or FY2025 — the three charts change instantly. Hover over any bar or line to see the exact numbers.",
  },
  {
    icon: "pencil",
    title: "4. Edit the evaluation",
    khmer: "កែតម្លៃ Evaluation",
    body: "In the Evaluation table click any white box and type your own number. Change a rating from the dropdown and the score at the top updates immediately. Press 'Reset demo values' to put the original numbers back.",
  },
  {
    icon: "download",
    title: "5. Export the data",
    khmer: "ទាញយកទិន្នន័យ",
    body: "Press the green 'Export CSV' button in Reports or Evaluation. The file downloads to your computer and opens in Excel.",
  },
  {
    icon: "users",
    title: "6. Try the CRM",
    khmer: "សាកល្បង CRM",
    body: "In the Leads section: type a name in the search box, filter by stage, press 'Add lead' to create a record, click the pencil to edit it, or the bin to delete it. Everything happens in your browser only.",
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Is this really connected to Salesforce?",
    a: "No. Nothing is connected. All numbers and customer names are made up for the demonstration, and the site says so in several places.",
  },
  {
    q: "Do I need to install anything else?",
    a: "No. Just Node.js and npm. Everything else is already in the project folder.",
  },
  {
    q: "Can I change the numbers to my company's data?",
    a: "Yes. In the Evaluation table you can type over every value, and the data files in src/data are plain and easy to edit.",
  },
  {
    q: "Does it work on a phone?",
    a: "Yes. The tables automatically become cards on small screens and the menu becomes a slide-out panel.",
  },
];

export function HelpGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"start" | "tour" | "faq">("start");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="relative max-h-[92vh] w-full max-w-2xl animate-slide-up overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-2xl">
        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">How to use this site</h3>
            <p className="mt-0.5 text-sm text-slate-500">
              ការណែនាំសង្វេប — ចំនួនជាក់ស្រាល៖ អូសដ្ឋាន → សម្រុងផ្ទាំង Dashboard → កែតម្លៃ → ទាញយក CSV
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close guide"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        {/* tabs */}
        <div className="flex gap-1 border-b border-slate-100 px-6 pt-4">
          {[
            { id: "start" as const, label: "Start here", kh: "ចាប់ផ្ដើម" },
            { id: "tour" as const, label: "The page tour", kh: "ការណែនាំទី" },
            { id: "faq" as const, label: "Questions", kh: "សំណួរ" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-bold transition-colors",
                tab === t.id
                  ? "border-brand-600 text-brand-700"
                  : "border-transparent text-slate-500 hover:text-slate-800",
              )}
            >
              {t.label}
              <span className="ml-1.5 text-[11px] font-medium text-slate-400">{t.kh}</span>
            </button>
          ))}
        </div>

        {/* body */}
        <div className="max-h-[62vh] overflow-y-auto px-6 py-6">
          {tab === "start" && (
            <div className="space-y-4">
              <div className="rounded-xl bg-navy-900 p-4 text-white">
                <p className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <Icon name="bolt" className="h-3.5 w-3.5" />
                  3 ពាក្សា។ បង្កើតគេហទំព័របាន
                </p>
                <pre className="mt-2 overflow-x-auto text-sm leading-relaxed text-slate-100">
{`npm install
npm run dev`}
                </pre>
                <p className="mt-2 text-xs text-slate-300">
                  បន្ទាប់មកបើក <span className="font-mono text-cyan-300">http://localhost:5173</span> ក្នុង Chrome
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { t: "ផ្ទាំងទី 1 — Hero", d: "ចំណងជំនាយចូលដែលមាន 2 ប៊ូតុង CTA" },
                  { t: "ផ្ទាំងទី 2 — Features", d: "8 កាតមានលទ្ធផល Einstein" },
                  { t: "ផ្ទាំងទី 3 — About AI", d: "Einstein គឺជាអ្វី និងធ្វើប្រសិនាមួយ" },
                  { t: "ផ្ទាំងទី 4 — Automation", d: "6 សមត្ថភាព + workflow 5 ជំហាន" },
                  { t: "ផ្ទាំងទី 5 — Dashboard", d: "KPI និង chart 4" },
                  { t: "ផ្ទាំងទី 6 — Evaluation", d: "តារាង Before / After ដែលកែបាន" },
                  { t: "ផ្ទាំងទី 7 — Reports", d: "filter + export CSV" },
                  { t: "ផ្ទាំងទី 8 — Leads", d: "បង្កើត/កែ/លុប record" },
                  { t: "ផ្ទាំងទី 9 — Contact", d: "form + FAQ" },
                ].map((row) => (
                  <div key={row.t} className="rounded-xl border border-slate-200 p-3">
                    <p className="text-sm font-bold text-slate-800">{row.t}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{row.d}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "tour" && (
            <div className="space-y-4">
              {steps.map((s) => (
                <div key={s.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">{s.title}</p>
                    <p className="text-xs font-semibold text-brand-600">{s.khmer}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "faq" && (
            <div className="space-y-3">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm font-bold text-slate-900">{f.q}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <p className="text-xs text-slate-500">
            Need more? Ask your lecturer or project supervisor.
          </p>
          <Button onClick={onClose} icon="arrow-right">
            Got it — let me explore
          </Button>
        </div>
      </div>
    </div>
  );
}
