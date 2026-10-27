import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
  userRoles,
  userTeams,
  writeSession,
  type DemoUser,
} from "@/lib/auth";
import {
  accountTypes,
  industries,
  listCompanyAccounts,
  saveCompanyAccounts,
  type CompanyAccount,
} from "@/lib/companyAccounts";
import { formatCurrency } from "@/lib/format";
import { Icon } from "../Icon";
import { Badge, Button, Container, DemoNotice, EmptyState, Panel, Section, SectionHeading } from "../common";

type Tab = "companies" | "users";

const emptyCompany = {
  name: "",
  industry: industries[0],
  type: "Prospect" as CompanyAccount["type"],
  phone: "",
  website: "",
  owner: "",
  revenue: "100000",
  employees: "50",
  city: "",
  status: "Active" as CompanyAccount["status"],
  notes: "",
};

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

export function AccountManager({
  currentUser,
  onCurrentUserChange,
}: {
  currentUser: DemoUser;
  onCurrentUserChange: (user: DemoUser) => void;
}) {
  const [tab, setTab] = useState<Tab>("companies");
  const [companies, setCompanies] = useState<CompanyAccount[]>(() => listCompanyAccounts());
  const [users, setUsers] = useState<DemoUser[]>(() => listUsers());
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  const [companyForm, setCompanyForm] = useState(emptyCompany);
  const [editingCompany, setEditingCompany] = useState<string | null>(null);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [deleteCompany, setDeleteCompany] = useState<CompanyAccount | null>(null);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: userRoles[1] as string,
    team: userTeams[0] as string,
  });
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [userOpen, setUserOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DemoUser | null>(null);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const filteredCompanies = useMemo(() => {
    const q = query.trim().toLowerCase();
    return companies.filter((account) =>
      !q
        ? true
        : [account.name, account.industry, account.owner, account.city, account.type]
            .join(" ")
            .toLowerCase()
            .includes(q),
    );
  }, [companies, query]);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((account) =>
      !q
        ? true
        : [account.name, account.email, account.role, account.team].join(" ").toLowerCase().includes(q),
    );
  }, [users, query]);

  const openCreateCompany = () => {
    setEditingCompany(null);
    setCompanyForm({ ...emptyCompany, owner: currentUser.name });
    setError("");
    setCompanyOpen(true);
  };

  const openEditCompany = (account: CompanyAccount) => {
    setEditingCompany(account.id);
    setCompanyForm({
      name: account.name,
      industry: account.industry,
      type: account.type,
      phone: account.phone,
      website: account.website,
      owner: account.owner,
      revenue: String(account.revenue),
      employees: String(account.employees),
      city: account.city,
      status: account.status,
      notes: account.notes,
    });
    setError("");
    setCompanyOpen(true);
  };

  const saveCompany = (e: FormEvent) => {
    e.preventDefault();
    if (companyForm.name.trim().length < 2) {
      setError("Account name is required.");
      return;
    }
    const revenue = Number(companyForm.revenue);
    const employees = Number(companyForm.employees);
    if (Number.isNaN(revenue) || revenue < 0 || Number.isNaN(employees) || employees < 0) {
      setError("Revenue and employees must be zero or greater.");
      return;
    }
    const next: CompanyAccount = {
      id: editingCompany ?? `acc-${Date.now().toString(36)}`,
      name: companyForm.name.trim(),
      industry: companyForm.industry,
      type: companyForm.type,
      phone: companyForm.phone.trim(),
      website: companyForm.website.trim(),
      owner: companyForm.owner.trim() || currentUser.name,
      revenue,
      employees,
      city: companyForm.city.trim(),
      status: companyForm.status,
      notes: companyForm.notes.trim(),
    };
    const updated = editingCompany
      ? companies.map((account) => (account.id === editingCompany ? next : account))
      : [next, ...companies];
    setCompanies(updated);
    saveCompanyAccounts(updated);
    setCompanyOpen(false);
    notify(editingCompany ? "Account updated." : "Account created.");
  };

  const confirmDeleteCompany = () => {
    if (!deleteCompany) return;
    const updated = companies.filter((account) => account.id !== deleteCompany.id);
    setCompanies(updated);
    saveCompanyAccounts(updated);
    notify(`${deleteCompany.name} deleted.`);
    setDeleteCompany(null);
  };

  const openCreateUser = () => {
    setEditingUser(null);
    setUserForm({ name: "", email: "", password: "", role: userRoles[1], team: userTeams[0] });
    setError("");
    setUserOpen(true);
  };

  const openEditUser = (account: DemoUser) => {
    setEditingUser(account.id);
    setUserForm({
      name: account.name,
      email: account.email,
      password: "",
      role: account.role,
      team: account.team,
    });
    setError("");
    setUserOpen(true);
  };

  const saveUser = (e: FormEvent) => {
    e.preventDefault();
    if (userForm.name.trim().length < 2) {
      setError("Name is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(userForm.email.trim())) {
      setError("Enter a valid email.");
      return;
    }
    if (!editingUser && userForm.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (editingUser && userForm.password && userForm.password.length < 6) {
      setError("New password must be at least 6 characters, or leave it blank.");
      return;
    }

    const result = editingUser
      ? updateUser(editingUser, userForm)
      : createUser(userForm);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    setUsers(listUsers());
    if (result.user.id === currentUser.id) {
      writeSession(result.user);
      onCurrentUserChange(result.user);
    }
    setUserOpen(false);
    notify(editingUser ? "User account updated." : "User account created.");
  };

  const confirmDeleteUser = () => {
    if (!deleteTarget) return;
    if (deleteTarget.id === currentUser.id) {
      setDeleteTarget(null);
      notify("You cannot delete the account you are signed in with.");
      return;
    }
    deleteUser(deleteTarget.id);
    setUsers(listUsers());
    notify(`${deleteTarget.name} deleted.`);
    setDeleteTarget(null);
  };

  return (
    <Section id="accounts" tone="white">
      <Container>
        <SectionHeading
          eyebrow="Accounts"
          title="Create, edit, update and delete accounts"
          description="Manage Salesforce-style company accounts and the login users for this demo. Changes are saved in this browser."
        />

        <div className="mt-8">
          <DemoNotice>
            These records are demo data stored on this computer only. They are not sent to Salesforce.
          </DemoNotice>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            {(
              [
                ["companies", "Company accounts"],
                ["users", "Login users"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => {
                  setTab(id);
                  setQuery("");
                }}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-bold",
                  tab === id ? "bg-[#0176d3] text-white" : "text-slate-500 hover:text-slate-800",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Icon name="search" className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className={cn(field, "w-48 pl-9 sm:w-56")}
              />
            </div>
            <Button icon="plus" onClick={tab === "companies" ? openCreateCompany : openCreateUser}>
              Create
            </Button>
          </div>
        </div>

        <Panel className="mt-5 overflow-hidden">
          {tab === "companies" && filteredCompanies.length === 0 && (
            <div className="p-6">
              <EmptyState
                icon="building"
                title="No company accounts"
                description="Create an account to start tracking customers and prospects."
                action={<Button icon="plus" onClick={openCreateCompany}>Create account</Button>}
              />
            </div>
          )}

          {tab === "companies" && filteredCompanies.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="bg-slate-50 text-[11px] tracking-wide text-slate-500 uppercase">
                  <tr>
                    <th className="px-5 py-3 font-bold">Account</th>
                    <th className="px-5 py-3 font-bold">Type</th>
                    <th className="px-5 py-3 font-bold">Owner</th>
                    <th className="px-5 py-3 text-right font-bold">Revenue</th>
                    <th className="px-5 py-3 font-bold">Status</th>
                    <th className="px-5 py-3 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCompanies.map((account) => (
                    <tr key={account.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-slate-900">{account.name}</p>
                        <p className="text-xs text-slate-500">
                          {account.industry} · {account.city || "No city"}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge tone="slate">{account.type}</Badge>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{account.owner}</td>
                      <td className="px-5 py-3.5 text-right font-bold text-slate-900">
                        {formatCurrency(account.revenue)}
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge tone={account.status === "Active" ? "emerald" : "rose"}>{account.status}</Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => openEditCompany(account)}
                            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-600 hover:border-brand-300 hover:text-brand-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteCompany(account)}
                            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "users" && filteredUsers.length === 0 && (
            <div className="p-6">
              <EmptyState
                icon="users"
                title="No login users"
                description="Create a user so they can sign in to the demo."
                action={<Button icon="plus" onClick={openCreateUser}>Create user</Button>}
              />
            </div>
          )}

          {tab === "users" && filteredUsers.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-[11px] tracking-wide text-slate-500 uppercase">
                  <tr>
                    <th className="px-5 py-3 font-bold">User</th>
                    <th className="px-5 py-3 font-bold">Role</th>
                    <th className="px-5 py-3 font-bold">Team</th>
                    <th className="px-5 py-3 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((account) => (
                    <tr key={account.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-slate-900">
                          {account.name}
                          {account.id === currentUser.id && (
                            <span className="ml-2 text-[11px] font-semibold text-brand-600">You</span>
                          )}
                        </p>
                        <p className="text-xs text-slate-500">{account.email}</p>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{account.role}</td>
                      <td className="px-5 py-3.5 text-slate-600">{account.team}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => openEditUser(account)}
                            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-600 hover:border-brand-300 hover:text-brand-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(account)}
                            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </Container>

      {companyOpen && (
        <Modal title={editingCompany ? "Update account" : "Create account"} onClose={() => setCompanyOpen(false)}>
          <form onSubmit={saveCompany} className="grid gap-4 sm:grid-cols-2">
            <Field label="Account name *">
              <input className={field} value={companyForm.name} onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} />
            </Field>
            <Field label="Industry">
              <select className={field} value={companyForm.industry} onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}>
                {industries.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Type">
              <select className={field} value={companyForm.type} onChange={(e) => setCompanyForm({ ...companyForm, type: e.target.value as CompanyAccount["type"] })}>
                {accountTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Status">
              <select className={field} value={companyForm.status} onChange={(e) => setCompanyForm({ ...companyForm, status: e.target.value as CompanyAccount["status"] })}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </Field>
            <Field label="Phone">
              <input className={field} value={companyForm.phone} onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })} />
            </Field>
            <Field label="Website">
              <input className={field} value={companyForm.website} onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })} />
            </Field>
            <Field label="Owner">
              <input className={field} value={companyForm.owner} onChange={(e) => setCompanyForm({ ...companyForm, owner: e.target.value })} />
            </Field>
            <Field label="City">
              <input className={field} value={companyForm.city} onChange={(e) => setCompanyForm({ ...companyForm, city: e.target.value })} />
            </Field>
            <Field label="Annual revenue (USD)">
              <input type="number" min={0} className={field} value={companyForm.revenue} onChange={(e) => setCompanyForm({ ...companyForm, revenue: e.target.value })} />
            </Field>
            <Field label="Employees">
              <input type="number" min={0} className={field} value={companyForm.employees} onChange={(e) => setCompanyForm({ ...companyForm, employees: e.target.value })} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Notes">
                <textarea rows={3} className={cn(field, "resize-none")} value={companyForm.notes} onChange={(e) => setCompanyForm({ ...companyForm, notes: e.target.value })} />
              </Field>
            </div>
            {error && <p className="text-sm text-rose-600 sm:col-span-2">{error}</p>}
            <div className="flex justify-end gap-2 sm:col-span-2">
              <Button type="button" variant="outline" onClick={() => setCompanyOpen(false)}>Cancel</Button>
              <Button type="submit" icon="check">{editingCompany ? "Update" : "Create"}</Button>
            </div>
          </form>
        </Modal>
      )}

      {userOpen && (
        <Modal title={editingUser ? "Update user" : "Create user"} onClose={() => setUserOpen(false)}>
          <form onSubmit={saveUser} className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name *">
              <input className={field} value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} />
            </Field>
            <Field label="Email *">
              <input type="email" className={field} value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
            </Field>
            <Field label="Role">
              <select className={field} value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}>
                {userRoles.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Team">
              <select className={field} value={userForm.team} onChange={(e) => setUserForm({ ...userForm, team: e.target.value })}>
                {userTeams.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label={editingUser ? "New password (leave blank to keep)" : "Password *"}>
                <input type="password" className={field} value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} />
              </Field>
            </div>
            {error && <p className="text-sm text-rose-600 sm:col-span-2">{error}</p>}
            <div className="flex justify-end gap-2 sm:col-span-2">
              <Button type="button" variant="outline" onClick={() => setUserOpen(false)}>Cancel</Button>
              <Button type="submit" icon="check">{editingUser ? "Update" : "Create"}</Button>
            </div>
          </form>
        </Modal>
      )}

      {deleteCompany && (
        <Confirm
          title="Delete this account?"
          body={`${deleteCompany.name} will be removed from this browser.`}
          onCancel={() => setDeleteCompany(null)}
          onConfirm={confirmDeleteCompany}
        />
      )}
      {deleteTarget && (
        <Confirm
          title="Delete this user?"
          body={
            deleteTarget.id === currentUser.id
              ? "You are signed in with this account, so it cannot be deleted."
              : `${deleteTarget.name} will no longer be able to log in on this browser.`
          }
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDeleteUser}
          confirmLabel={deleteTarget.id === currentUser.id ? "Close" : "Delete"}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-navy-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl">
          <Icon name="check-circle" className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </Section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">{label}</span>
      {children}
    </label>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500">
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Confirm({
  title,
  body,
  onCancel,
  onConfirm,
  confirmLabel = "Delete",
}: {
  title: string;
  body: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-6 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{body}</p>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
          <Button variant="dark" className="flex-1" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
