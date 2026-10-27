import { cn } from "@/lib/cn";
import { useScrolled } from "@/hooks/useScrollSpy";
import { Icon } from "../Icon";

export function BackToTop() {
  const show = useScrolled(700);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "fixed right-4 bottom-4 z-30 grid h-11 w-11 place-items-center rounded-xl bg-navy-900 text-white shadow-xl shadow-navy-900/25 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-600 sm:right-6 sm:bottom-6",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <Icon name="arrow-up" className="h-4.5 w-4.5" />
    </button>
  );
}
