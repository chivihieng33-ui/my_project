import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { AboutEinstein } from "@/components/about/AboutEinstein";
import { Automation } from "@/components/automation/Automation";
import { SalesDashboard } from "@/components/dashboard/SalesDashboard";
import { Evaluation } from "@/components/evaluation/Evaluation";
import { SalesReports } from "@/components/reports/SalesReports";
import { CustomerManagement } from "@/components/crm/CustomerManagement";
import { AccountManager } from "@/components/accounts/AccountManager";
import { Contact } from "@/components/contact/Contact";
import { Login } from "@/components/auth/Login";
import { PageEditor } from "@/components/layout/PageEditor";
import { clearSession, readSession, writeSession, type DemoUser } from "@/lib/auth";

export default function App() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readSession());
    setReady(true);
  }, []);

  const signIn = (next: DemoUser) => {
    writeSession(next);
    setUser(next);
    window.setTimeout(() => {
      document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const signOut = () => {
    clearSession();
    setUser(null);
    window.scrollTo({ top: 0 });
  };

  if (!ready) {
    return <div className="min-h-screen bg-[#032d60]" />;
  }

  if (!user) {
    return (
      <>
        <Login onSuccess={signIn} />
        <PageEditor />
      </>
    );
  }

  return (
    <div className="relative min-h-screen bg-canvas text-slate-800 antialiased">
      <Header user={user} onLogout={signOut} />

      <div className="bg-[#032d60] pt-16 text-white lg:pt-[4.5rem]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-xs sm:px-6 lg:px-8">
          <p>
            Signed in as <span className="font-bold">{user.name}</span>
            <span className="text-sky-200"> · {user.role}</span>
          </p>
          <p className="text-sky-200">Sales Cloud Demo — not connected to Salesforce</p>
        </div>
      </div>

      <main>
        <Hero />
        <Features />
        <AboutEinstein />
        <Automation />
        <SalesDashboard />
        <Evaluation />
        <SalesReports />
        <CustomerManagement />
        <AccountManager
          currentUser={user}
          onCurrentUserChange={(next) => {
            writeSession(next);
            setUser(next);
          }}
        />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <PageEditor />
    </div>
  );
}
