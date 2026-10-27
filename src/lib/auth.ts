/** Demo login accounts stored only in this browser. */

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  initials: string;
};

export type StoredUser = DemoUser & { password: string };

export const userRoles = ["Sales Manager", "Sales Representative", "Admin"] as const;
export const userTeams = ["Enterprise", "Mid-Market", "SMB", "Strategic"] as const;

const USERS_KEY = "einstein-demo-users";
const SESSION_KEY = "einstein-demo-session";

const seed: StoredUser[] = [
  {
    id: "sarah",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@demo.example",
    password: "Einstein2025",
    role: "Sales Manager",
    team: "Enterprise",
    initials: "SM",
  },
  {
    id: "david",
    name: "David Chen",
    email: "david.chen@demo.example",
    password: "Einstein2025",
    role: "Sales Representative",
    team: "Mid-Market",
    initials: "DC",
  },
];

export const demoPassword = "Einstein2025";

function toUser(account: StoredUser): DemoUser {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    team: account.team,
    initials: account.initials,
  };
}

export function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || "U";
}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw) as StoredUser[];
    return Array.isArray(parsed) ? parsed : seed;
  } catch {
    return seed;
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function listUsers(): DemoUser[] {
  return readUsers().map(toUser);
}

export function authenticate(email: string, password: string): DemoUser | null {
  const match = readUsers().find(
    (account) =>
      account.email.toLowerCase() === email.trim().toLowerCase() &&
      account.password === password,
  );
  return match ? toUser(match) : null;
}

export function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: string;
  team: string;
}): { user: DemoUser } | { error: string } {
  const users = readUsers();
  const email = input.email.trim().toLowerCase();
  if (users.some((account) => account.email.toLowerCase() === email)) {
    return { error: "An account with this email already exists." };
  }
  const account: StoredUser = {
    id: `user-${Date.now().toString(36)}`,
    name: input.name.trim(),
    email,
    password: input.password,
    role: input.role,
    team: input.team,
    initials: initialsFrom(input.name),
  };
  saveUsers([account, ...users]);
  return { user: toUser(account) };
}

export function updateUser(
  id: string,
  input: { name: string; email: string; password?: string; role: string; team: string },
): { user: DemoUser } | { error: string } {
  const users = readUsers();
  const email = input.email.trim().toLowerCase();
  if (users.some((account) => account.id !== id && account.email.toLowerCase() === email)) {
    return { error: "Another account already uses this email." };
  }
  const index = users.findIndex((account) => account.id === id);
  if (index < 0) return { error: "Account not found." };
  const current = users[index];
  const next: StoredUser = {
    ...current,
    name: input.name.trim(),
    email,
    role: input.role,
    team: input.team,
    initials: initialsFrom(input.name),
    password: input.password?.trim() ? input.password : current.password,
  };
  const copy = [...users];
  copy[index] = next;
  saveUsers(copy);
  return { user: toUser(next) };
}

export function deleteUser(id: string) {
  saveUsers(readUsers().filter((account) => account.id !== id));
}

export function readSession(): DemoUser | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoUser;
    return readUsers().some((account) => account.id === parsed.id) ? toUser(
      readUsers().find((account) => account.id === parsed.id) as StoredUser,
    ) : null;
  } catch {
    return null;
  }
}

export function writeSession(user: DemoUser) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
