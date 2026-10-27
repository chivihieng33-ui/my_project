import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { navLinks, project } from "@/data/content";
import { Icon } from "../Icon";
import { HelpGuide } from "./HelpGuide";
import { Button } from "../common";
import { useScrolled, useScrollSpy } from "@/hooks/useScrollSpy";
import type { DemoUser } from "@/lib/auth";

const sectionIds = navLinks.map((l) => l.id);

function BrandMark() {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label={project.title}>
      <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-600 to-navy-900 shadow-lg shadow-brand-600/25 transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_60%)]" />
        <svg viewBox="0 0 24 24" className="relative h-5.5 w-5.5 text-white" fill="currentColor">
          <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" opacity=".85" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" opacity=".55" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[15px] font-extrabold tracking-tight text-slate-900">
          Einstein AI
          <span className="ml-1.5 font-semibold text-brand-600">for Sales</span>
        </span>
        <span className="text-[10px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
          Automation &amp; Forecasting
        </span>
      </span>
    </a>
  );
}

export function Header({ user, onLogout }: { user: DemoUser; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const scrolled = useScrolled(16);
  const active = useScrollSpy(sectionIds);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.body.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-xl"
            : "border-b border-transparent bg-white/60 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
          <BrandMark />

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-[13.5px] font-semibold transition-colors duration-200",
                    isActive ? "text-brand-700" : "text-slate-500 hover:text-slate-900",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-400" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#dashboard"
              className="hidden rounded-lg bg-brand-50 px-3 py-2 text-xs font-bold text-brand-700 ring-1 ring-brand-100 hover:bg-brand-100 md:inline-flex"
            >
              Dashboard
            </a>
            <button
              onClick={() => setHelpOpen(true)}
              className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-bold text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-700 lg:inline-flex"
            >
              <Icon name="info" className="h-3.5 w-3.5" />
              How to use
            </button>
            <button
              onClick={onLogout}
              className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white py-1.5 pr-3 pl-1.5 text-left transition-colors hover:border-rose-200 hover:bg-rose-50 sm:flex"
              aria-label="Log out"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#0176d3] text-[11px] font-bold text-white">
                {user.initials}
              </span>
              <span className="hidden leading-tight xl:block">
                <span className="block text-xs font-bold text-slate-800">{user.name}</span>
                <span className="block text-[10px] font-semibold text-slate-400">Log out</span>
              </span>
              <Icon name="log-out" className="h-4 w-4 text-slate-400" />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700 lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="h-0.5 w-full bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-400 transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-navy-950/50 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute top-0 right-0 flex h-full w-[86%] max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <BrandMark />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600"
            >
              <Icon name="close" className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0176d3] text-xs font-bold text-white">
              {user.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">{user.name}</p>
              <p className="truncate text-xs text-slate-500">{user.role}</p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-5">
            {navLinks.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: `${i * 50}ms` }}
                className={cn(
                  "mb-1 flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300",
                  active === link.id
                    ? "border-brand-200 bg-brand-50 text-brand-700"
                    : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                {link.label}
                <Icon name="arrow-right" className="h-4 w-4 opacity-50" />
              </a>
            ))}

            <button
              onClick={() => {
                setOpen(false);
                setHelpOpen(true);
              }}
              className="mt-5 flex w-full items-center gap-2.5 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-left text-sm font-bold text-brand-700"
            >
              <Icon name="info" className="h-4 w-4" />
              How to use this site
            </button>

            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Project status
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Prototype with generated sample data — no live Salesforce org connected.
              </p>
            </div>
          </nav>

          <div className="space-y-2 border-t border-slate-100 p-4">
            <Button href="#dashboard" className="w-full" icon="dashboard" onClick={() => setOpen(false)}>
              Open dashboard
            </Button>
            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-700"
            >
              <Icon name="log-out" className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      </div>

      <HelpGuide open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
