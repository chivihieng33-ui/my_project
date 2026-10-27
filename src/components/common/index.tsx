import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/useInView";
import { Icon, type IconName } from "../Icon";

/* ------------------------------------------------------------------ */
/* Section wrapper                                                     */
/* ------------------------------------------------------------------ */
type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "canvas" | "white" | "navy" | "brand-soft";
  padded?: boolean;
};

export function Section({
  id,
  children,
  className,
  tone = "canvas",
  padded = true,
}: SectionProps) {
  const tones: Record<NonNullable<SectionProps["tone"]>, string> = {
    canvas: "bg-canvas",
    white: "bg-white",
    navy: "bg-navy-900 text-white",
    "brand-soft": "bg-brand-50/70",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24",
        tones[tone],
        padded && "py-16 sm:py-20 lg:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */
type HeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
  dark?: boolean;
  actions?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  dark = false,
  actions,
}: HeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase",
              dark
                ? "bg-white/10 text-brand-200 ring-1 ring-white/15"
                : "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
            )}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-brand-500" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
            </span>
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={70}>
        <h2
          className={cn(
            "max-w-3xl text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-[2.6rem]",
            dark ? "text-white" : "text-slate-900",
            centered && "mx-auto",
          )}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={130}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed sm:text-[17px]",
              dark ? "text-slate-300" : "text-slate-500",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}

      {actions && (
        <Reveal delay={180}>
          <div className={cn("mt-2 flex flex-wrap gap-3", centered && "justify-center")}>{actions}</div>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "dark";
type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus:outline-none disabled:pointer-events-none disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-600/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/35",
  secondary:
    "bg-brand-50 text-brand-700 ring-1 ring-brand-100 hover:bg-brand-100 hover:-translate-y-0.5",
  outline:
    "border border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/60",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  dark: "bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5 shadow-lg shadow-navy-900/20",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-[15px]",
  lg: "px-7 py-3.5 text-base",
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: "left" | "right";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  onClick,
  type = "button",
  disabled,
  loading = false,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
  const inner = (
    <>
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Icon name={icon} className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          )}
          <span>{children}</span>
          {icon && iconPosition === "right" && (
            <Icon name={icon} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} aria-label={ariaLabel} className={cn(classes, "group")}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={cn(classes, "group")}
    >
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Badges & chips                                                      */
/* ------------------------------------------------------------------ */
type BadgeTone = "brand" | "slate" | "emerald" | "amber" | "rose" | "violet" | "dark";

const badgeTones: Record<BadgeTone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-100",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  rose: "bg-rose-50 text-rose-700 ring-rose-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-200",
  dark: "bg-navy-900 text-white ring-navy-900",
};

export function Badge({
  children,
  tone = "brand",
  icon,
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: IconName;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset",
        badgeTones[tone],
        className,
      )}
    >
      {icon && <Icon name={icon} className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Panel                                                               */
/* ------------------------------------------------------------------ */
export function Panel({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-20px_rgba(15,23,42,0.22)]",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_48px_-24px_rgba(37,99,235,0.35)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Icon tile                                                           */
/* ------------------------------------------------------------------ */
export function IconTile({
  name,
  tone = "brand",
  className,
}: {
  name: IconName;
  tone?: "brand" | "navy" | "emerald" | "violet" | "amber";
  className?: string;
}) {
  const tones = {
    brand: "bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-600/25",
    navy: "bg-navy-900 text-white shadow-lg shadow-navy-900/20",
    emerald: "bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/25",
    violet: "bg-gradient-to-br from-violet-600 to-indigo-500 text-white shadow-lg shadow-violet-600/25",
    amber: "bg-gradient-to-br from-amber-500 to-orange-400 text-white shadow-lg shadow-amber-500/25",
  };

  return (
    <span
      className={cn(
        "grid h-12 w-12 shrink-0 place-items-center rounded-xl",
        tones[tone],
        className,
      )}
    >
      <Icon name={name} className="h-5.5 w-5.5" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Stat card                                                           */
/* ------------------------------------------------------------------ */
export function StatCard({
  label,
  value,
  sub,
  delta,
  icon,
  loading = false,
}: {
  label: string;
  value: string;
  sub?: string;
  delta?: number;
  icon?: IconName;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="panel p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{label}</p>
          {icon && (
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
              <Icon name={icon} className="h-4.5 w-4.5" />
            </span>
          )}
        </div>
        <div className="skeleton mt-4 h-8 w-32" />
        <div className="skeleton mt-3 h-3 w-24" />
      </div>
    );
  }

  const positive = (delta ?? 0) >= 0;

  return (
    <div className="panel group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_20px_44px_-24px_rgba(37,99,235,0.4)]">
      <div className="pointer-events-none absolute -top-14 -right-14 h-28 w-28 rounded-full bg-brand-100/60 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-3">
        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{label}</p>
        {icon && (
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
            <Icon name={icon} className="h-4.5 w-4.5" />
          </span>
        )}
      </div>
      <p className="relative mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[1.75rem]">
        {value}
      </p>
      <div className="relative mt-1.5 flex items-center gap-2">
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-bold",
              positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700",
            )}
          >
            <Icon name={positive ? "trending-up" : "trending-down"} className="h-3 w-3" />
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
        {sub && <span className="truncate text-xs text-slate-400">{sub}</span>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Loading & empty states                                              */
/* ------------------------------------------------------------------ */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} />;
}

export function LoadingBlock({ label = "Loading sample data…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-brand-100 border-t-brand-600" />
      <p className="text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

export function EmptyState({
  icon = "search",
  title,
  description,
  action,
}: {
  icon?: IconName;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 px-6 py-14 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-base font-bold text-slate-800">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-slate-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sample-data notice                                                  */
/* ------------------------------------------------------------------ */
export function DemoNotice({
  children = "Sample data — simulated for evaluation purposes. Not live Salesforce data.",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-xs leading-relaxed text-amber-800",
        className,
      )}
    >
      <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{children}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", inView && "reveal-visible", className)}
    >
      {children}
    </Tag>
  );
}
