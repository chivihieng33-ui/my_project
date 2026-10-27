import { useEffect, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import {
  authenticate,
  createUser,
  demoPassword,
  listUsers,
  userRoles,
  userTeams,
  type DemoUser,
} from "@/lib/auth";
import { Icon } from "../Icon";

type Props = {
  onSuccess: (user: DemoUser) => void;
};

function CloudMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M22 36h26.5a11.5 11.5 0 0 0 1.2-22.9A14 14 0 0 0 24.2 8.2 11 11 0 0 0 8 18.6 9.5 9.5 0 0 0 12.5 36H22Z"
      />
    </svg>
  );
}

export function Login({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState(false);
  const [mode, setMode] = useState<"login" | "create">("login");
  const [name, setName] = useState("");
  const [role, setRole] = useState<string>(userRoles[1]);
  const [team, setTeam] = useState<string>(userTeams[0]);
  const [savedUsers, setSavedUsers] = useState<DemoUser[]>([]);

  useEffect(() => {
    setSavedUsers(listUsers());
  }, []);

  const signIn = (nextEmail: string, nextPassword: string) => {
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      const user = authenticate(nextEmail, nextPassword);
      setLoading(false);
      if (!user) {
        setError("Email or password is wrong. Use a demo account below — password is Einstein2025.");
        return;
      }
      onSuccess(user);
    }, 700);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "create") {
      if (name.trim().length < 2) {
        setError("Please enter your full name.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
        setError("Please enter a valid email.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      const created = createUser({ name, email, password, role, team });
      if ("error" in created) {
        setError(created.error);
        return;
      }
      setSavedUsers(listUsers());
      signIn(email, password);
      return;
    }
    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }
    signIn(email, password);
  };

  const fill = (accountEmail: string) => {
    setEmail(accountEmail);
    setPassword(demoPassword);
    setError("");
    setHint(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#032d60] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,#1b96ff,transparent_55%),radial-gradient(ellipse_at_80%_100%,#0b5cab,transparent_50%)]" />
        <CloudMark className="absolute -top-6 left-[8%] w-40 text-white/10" />
        <CloudMark className="absolute top-24 right-[6%] w-56 text-white/10" />
        <CloudMark className="absolute bottom-10 left-[18%] w-72 text-white/8" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-2 lg:px-8">
        <div className="hidden lg:block">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#0176d3] shadow-lg">
              <CloudMark className="h-7 w-10" />
            </span>
            <div>
              <p className="text-lg font-extrabold tracking-tight">Sales Cloud Demo</p>
              <p className="text-xs font-semibold tracking-[0.16em] text-sky-200 uppercase">
                Einstein AI · Sample org
              </p>
            </div>
          </div>

          <h1 className="mt-10 text-4xl leading-tight font-extrabold">
            Sign in to the sales dashboard
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-sky-100">
            This screen looks like a Salesforce login so you can present the evaluation.
            It is a classroom demo only — it does not connect to Salesforce.
          </p>
          <p className="mt-3 text-sm text-sky-200">
            ចុចប៊ូតុងខៀវ “Sign in as Sarah” ខាងស្តាំ ដើម្បីចូល Dashboard ភ្លាមៗ។
          </p>

          <ul className="mt-8 space-y-3 text-sm text-sky-50">
            {[
              "See sales revenue, targets and AI forecast",
              "Open reports and export CSV",
              "Manage demo customers and leads",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl bg-white p-6 text-slate-800 shadow-2xl shadow-black/30 sm:p-8">
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0176d3] text-white">
                <CloudMark className="h-5 w-8" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-900">Sales Cloud Demo</p>
                <p className="text-[11px] text-slate-500">Not the real Salesforce login</p>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-[#032d60]">
              {mode === "login" ? "Log in" : "Create account"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {mode === "login"
                ? "Demo org only. Your password stays in this browser."
                : "Create a new login. You can edit or delete it later in Accounts."}
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
              {mode === "create" && (
                <>
                  <div>
                    <label htmlFor="login-name" className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Full name
                    </label>
                    <input
                      id="login-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#0176d3] focus:ring-2 focus:ring-[#0176d3]/20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="login-role" className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Role
                      </label>
                      <select
                        id="login-role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#0176d3]"
                      >
                        {userRoles.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="login-team" className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Team
                      </label>
                      <select
                        id="login-team"
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#0176d3]"
                      >
                        {userTeams.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
              <div>
                <label htmlFor="login-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Username
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="sarah.mitchell@demo.example"
                  className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#0176d3] focus:ring-2 focus:ring-[#0176d3]/20"
                />
              </div>

              <div>
                <label htmlFor="login-password" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Password"
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 pr-16 text-sm outline-none focus:border-[#0176d3] focus:ring-2 focus:ring-[#0176d3]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-bold text-[#0176d3]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && (
                <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#0176d3] text-sm font-bold text-white transition-colors hover:bg-[#0b5cab] disabled:opacity-70"
              >
                {loading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                {loading ? "Please wait…" : mode === "login" ? "Log In" : "Create account"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "create" : "login");
                setError("");
              }}
              className="mt-4 text-sm font-semibold text-[#0176d3] hover:underline"
            >
              {mode === "login" ? "New here? Create an account" : "Already have an account? Log in"}
            </button>

            <button
              type="button"
              onClick={() => setHint((v) => !v)}
              className="mt-4 text-sm font-semibold text-[#0176d3] hover:underline"
            >
              Forgot your password?
            </button>
            {hint && (
              <p className="mt-2 rounded-md bg-sky-50 px-3 py-2 text-sm text-sky-900">
                Demo password for both accounts: <span className="font-bold">{demoPassword}</span>
              </p>
            )}

            <div className="my-5 flex items-center gap-3 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
              <span className="h-px flex-1 bg-slate-200" />
              or use a demo account
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="space-y-2">
              {savedUsers.map((account) => (
                <button
                  key={account.id}
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    fill(account.email);
                    signIn(account.email, demoPassword);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-left transition-colors hover:border-[#0176d3] hover:bg-sky-50",
                    loading && "pointer-events-none opacity-60",
                  )}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0176d3] text-xs font-bold text-white">
                    {account.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-slate-900">
                      Sign in as {account.name}
                    </span>
                    <span className="block truncate text-xs text-slate-500">
                      {account.role} · {account.email}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-5 text-center text-[11px] leading-relaxed text-slate-400">
              Not affiliated with Salesforce. No data is sent to Salesforce.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
