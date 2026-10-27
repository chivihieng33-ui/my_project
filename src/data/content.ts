/* =========================================================
   Site copy for the Salesforce Einstein AI evaluation prototype.
   ========================================================= */

export const project = {
  title: "Salesforce Einstein AI – Sales Automation & Forecasting",
  company: "Commercial Operations Review",
  subtitle:
    "An academic & business evaluation of Salesforce Einstein AI for sales process automation and sales forecasting.",
  disclaimer:
    "Independent evaluation prototype. Not affiliated with, endorsed by, or connected to Salesforce, Inc. Every metric, chart and customer record in this site is generated sample data.",
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about-ai", label: "About AI" },
  { id: "automation", label: "Automation" },
  { id: "dashboard", label: "Sales Dashboard" },
  { id: "evaluation", label: "Evaluation" },
  { id: "reports", label: "Reports" },
  { id: "crm", label: "Leads" },
  { id: "accounts", label: "Accounts" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Einstein AI · Sales Cloud · Forecasting",
  title: "Transform Your Sales with Salesforce Einstein AI",
  description:
    "Salesforce Einstein AI embeds predictive and generative intelligence directly inside the CRM — automating lead routing, prioritising opportunities, drafting outreach and forecasting revenue so sellers spend their time selling instead of reporting.",
  primary: "Explore Features",
  primaryTarget: "#features",
  secondary: "View Sales Dashboard",
  secondaryTarget: "#dashboard",
  points: [
    { value: "28.4%", label: "Lead conversion", detail: "up from 21.7% pre-pilot" },
    { value: "7.8%", label: "Forecast error", detail: "down from 24% MAPE" },
    { value: "2.4x", label: "12-month ROI", detail: "modelled on sample data" },
    { value: "5 wks", label: "Pilot to rollout", detail: "phased deployment plan" },
  ],
};

export const featureItems = [
  {
    id: "scoring",
    icon: "target",
    title: "Predictive Lead Scoring",
    description:
      "Einstein scores every inbound lead against conversion patterns from your own closed-won history, so reps work the highest-value opportunities first.",
    tag: "Sales Cloud",
    bullets: ["Custom fit/timing score", "Engagement & intent signals", "Auto tiering A/B/C"],
  },
  {
    id: "assignment",
    icon: "route",
    title: "Automated Lead Assignment",
    description:
      "Routing rules combined with AI recommendations send each lead to the rep most likely to close it, based on territory, workload and past performance.",
    tag: "Assignment Rules",
    bullets: ["Territory & workload balance", "Round-robin fairness", "Instant SLA timers"],
  },
  {
    id: "nba",
    icon: "compass",
    title: "Next Best Action",
    description:
      "Every opportunity receives a ranked recommendation — call, email, discount or demo — delivered directly in the rep's workspace.",
    tag: "Opportunity Insights",
    bullets: ["Ranked actions", "Success-probability context", "One-click execution"],
  },
  {
    id: "email",
    icon: "mail",
    title: "AI-Assisted Emails & Content",
    description:
      "Generative Einstein drafts personalised, on-brand emails and call scripts using deal context, past wins and real customer language.",
    tag: "Einstein Sales Emails",
    bullets: ["Tone & length controls", "Deal-context grounding", "Brand governance"],
  },
  {
    id: "capture",
    icon: "activity",
    title: "Interaction Tracking",
    description:
      "Einstein Activity Capture and Conversation Center log emails, calls and meetings automatically and summarise what actually happened.",
    tag: "Conversation Center",
    bullets: ["Auto activity logging", "Call & email summaries", "Sentiment signals"],
  },
  {
    id: "forecast",
    icon: "chart",
    title: "AI Revenue Forecasting",
    description:
      "Opportunity scoring and historical pattern analysis produce a rolling forecast with commit, best-case and pipeline bands — updated continuously.",
    tag: "Einstein Forecast",
    bullets: ["Commit / best case / pipeline", "Risk & upside detection", "Manager forecasts"],
  },
  {
    id: "tasks",
    icon: "flow",
    title: "Automated Sales Tasks",
    description:
      "Flow automation creates follow-up tasks, approvals, quotes and notifications the moment a stage or field changes — no manual admin.",
    tag: "Flow & Approval",
    bullets: ["Task & reminder triggers", "Quote / approval routing", "SLA escalation"],
  },
  {
    id: "insights",
    icon: "dashboard",
    title: "Manager Insights & Dashboards",
    description:
      "Rep-level and team-level coaching signals show where pipeline is at risk, which territories over-perform and where forecast gaps sit.",
    tag: "CRM Analytics",
    bullets: ["Coaching signals", "Pipeline health", "Attainment tracking"],
  },
];

export const aboutPoints = {
  eyebrow: "About Salesforce Einstein AI",
  title: "What exactly is Salesforce Einstein AI?",
  lead:
    "Salesforce Einstein AI is the layer of artificial intelligence built into the Salesforce platform. It combines machine learning trained on a company's own CRM data with large language models and trusted rules, then delivers the results inside the workflow of Sales Cloud, Service Cloud, Marketing Cloud and Tableau analytics.",
  paragraphs: [
    "Rather than replacing the CRM, Einstein sits on top of it. The model reads the same records the team already maintains — accounts, contacts, leads, opportunities, activities, products and quotes — and converts them into predictions, recommendations and generated content. Because the recommendations appear inside the record the rep is already working, adoption does not require a new application.",
    "Technically, the platform combines Salesforce Data Cloud for unifying and governing the underlying data, a set of prebuilt and customisable models (lead scoring, opportunity scoring, forecasting, case classification, email generation) and the Einstein Trust Layer, which keeps prompt data masked and restricts model training to a single customer's own data.",
  ],
  pillars: [
    {
      icon: "brain",
      title: "Predictive models",
      body: "Supervised and unsupervised learning that find the patterns behind closed-won deals, churn risk and forecast outcomes.",
    },
    {
      icon: "sparkles",
      title: "Generative AI",
      body: "Large language models that draft emails, summarise calls, summarise account context and coach reps in plain language.",
    },
    {
      icon: "shield",
      title: "Trust Layer",
      body: "Data masking, permission-aware grounding and audit trails so AI output can be governed and explained.",
    },
  ],
};

export const integrationPoints = [
  {
    icon: "cloud",
    title: "Native CRM integration",
    body: "Models read and write directly in Sales Cloud objects — no export, no connector, no separate system of record.",
  },
  {
    icon: "database",
    title: "Data Cloud unification",
    body: "Structured and unstructured signals are harmonised into one profile so scoring reflects the whole customer picture.",
  },
  {
    icon: "flow",
    title: "Flow & automation engine",
    body: "Predictions become actions: rules, approvals and tasks fire automatically the moment a score or stage changes.",
  },
  {
    icon: "analytics",
    title: "Analytics & reporting",
    body: "Scores and forecasts feed CRM Analytics, Tableau and Einstein Forecast for management reporting.",
  },
];

export const supportColumns = [
  {
    role: "For sales representatives",
    icon: "rep",
    points: [
      "A prioritised work queue — the highest-value leads and deals appear first.",
      "AI-drafted emails, call openers and meeting agendas ready to edit.",
      "Next Best Action guidance with the reasoning behind each recommendation.",
      "Automatic activity capture so data entry disappears from the day.",
      "Suggested discount and packaging guidance inside the opportunity.",
    ],
  },
  {
    role: "For sales managers",
    icon: "manager",
    points: [
      "A continuous forecast with commit, best case and pipeline categories.",
      "Early warning on opportunities that are about to slip.",
      "Territory, product and rep-level performance diagnostics.",
      "Coaching signals from call and email conversation analysis.",
      "One view of quota attainment for pipeline reviews.",
    ],
  },
];

export const benefitCards = [
  {
    icon: "bolt",
    title: "Higher productivity",
    stat: "+48%",
    body: "More selling time per rep once routing, data entry and drafting are automated.",
  },
  {
    icon: "heart",
    title: "Better customer relationships",
    stat: "3.2x",
    body: "More relevant touchpoints per opportunity thanks to context-aware recommendations.",
  },
  {
    icon: "chart",
    title: "Data-driven decisions",
    stat: "−16.2pp",
    body: "Reduction in forecast error, so quota and capacity plans rest on evidence.",
  },
];

export type AutomationFeature = {
  id: string;
  icon: string;
  title: string;
  description: string;
  before: string;
  after: string;
  bullets: string[];
  capability: string;
};

export const automationFeatures: AutomationFeature[] = [
  {
    id: "assign",
    icon: "route",
    title: "Automated Lead Assignment",
    description:
      "New leads are scored and routed the moment they enter the CRM, removing manual territory and queue management.",
    before: "Reps assigned leads manually — up to 40 minutes of queue delay and uneven workloads.",
    after: "Sub-30-second assignment with workload balancing and an instant response SLA timer.",
    bullets: ["AI-recommended owner", "Territory & segment rules", "Workload capacity checks"],
    capability: "Einstein Lead Scoring + Assignment Rules",
  },
  {
    id: "score",
    icon: "target",
    title: "Lead Scoring & Prioritization",
    description:
      "Every lead receives a 0–100 fit and engagement score derived from your own conversion history.",
    before: "Reps worked the queue in order of arrival, ignoring true intent.",
    after: "Leads are ranked by predicted value, with tiered routing and focused outreach.",
    bullets: ["0–100 composite score", "Fit / timing / intent split", "Automatic tiering"],
    capability: "Einstein Lead Scoring",
  },
  {
    id: "followup",
    icon: "bell",
    title: "Automated Follow-up Reminders",
    description:
      "Next Best Action plus Flow triggers schedule and remind the owner on every stalled opportunity.",
    before: "Follow-ups depended on memory; 31% of opportunities went quiet for more than 14 days.",
    after: "Every open opportunity carries a scheduled next action with escalation on slippage.",
    bullets: ["Next-step scheduling", "Stale-deal nudges", "SLA-based escalation"],
    capability: "Next Best Action + Flow",
  },
  {
    id: "tracking",
    icon: "activity",
    title: "Customer Interaction Tracking",
    description:
      "Calls, emails and meetings are logged, transcribed and summarised automatically against the record.",
    before: "Interaction history was incomplete and manually maintained.",
    after: "A continuous interaction timeline with summaries and sentiment per account.",
    bullets: ["Auto activity capture", "Call & email summaries", "Engagement timeline"],
    capability: "Einstein Activity Capture / Conversation Center",
  },
  {
    id: "tasks",
    icon: "flow",
    title: "Sales Task Automation",
    description:
      "Stage changes, quote requests and approvals trigger tasks, notifications and documents without rep effort.",
    before: "Manual task creation and chasing approvals consumed selling hours.",
    after: "Tasks, quotes and approvals are generated and routed by Flow, with full audit history.",
    bullets: ["Task generation triggers", "Quote & approval routing", "Escalation paths"],
    capability: "Salesforce Flow + Approval Processes",
  },
  {
    id: "email",
    icon: "mail",
    title: "AI-Assisted Emails & Recommendations",
    description:
      "Generative AI drafts personalised outreach and recommends the next action with supporting context.",
    before: "Every email written from scratch; inconsistent messaging and long reply times.",
    after: "On-brand, deal-aware drafts ready in one click, with the reasoning surfaced.",
    bullets: ["Contextual email drafts", "Deal-aware recommendations", "Brand tone controls"],
    capability: "Einstein Sales Emails + Opportunity Insights",
  },
];

export const workflowSteps = [
  {
    id: "generation",
    number: "01",
    title: "Lead Generation",
    icon: "magnet",
    description:
      "Campaigns, web forms, events and referrals create leads in Salesforce. Einstein captures engagement signals automatically.",
    capability: "Marketing Cloud + Data Cloud",
    metric: "1,240 new leads / quarter",
    time: "0.4 hrs per lead (manual)",
    aiTime: "0.02 hrs per lead",
  },
  {
    id: "scoring",
    number: "02",
    title: "Lead Scoring",
    icon: "target",
    description:
      "Every lead is scored on fit, intent and timing. Einstein classifies it into a tier and predicts the likely conversion path.",
    capability: "Einstein Lead Scoring",
    metric: "92% accurate tiering (sample)",
    time: "Manual review of every lead",
    aiTime: "Instant, model-driven ranking",
  },
  {
    id: "followup",
    number: "03",
    title: "Customer Follow-up",
    icon: "compass",
    description:
      "The right rep receives the lead with a recommended action and a drafted, personalised first message.",
    capability: "Assignment Rules + Next Best Action",
    metric: "First response in 11 min",
    time: "Manual routing + writing",
    aiTime: "Automated routing + drafting",
  },
  {
    id: "opportunity",
    number: "04",
    title: "Opportunity Management",
    icon: "briefcase",
    description:
      "The opportunity is scored for probability, risk and upside. Tasks, approvals and proposals move forward automatically.",
    capability: "Opportunity Insights + Flow",
    metric: "Pipedrive stage accuracy 78%",
    time: "Weekly manual pipeline review",
    aiTime: "Continuous risk monitoring",
  },
  {
    id: "closing",
    number: "05",
    title: "Closing the Deal",
    icon: "trophy",
    description:
      "Pricing guidance, contract flow and forecasting all draw on the same AI model, so the commit number is defensible.",
    capability: "Einstein Forecast + Approval",
    metric: "28.4% lead-to-win (sample)",
    time: "Forecast built by hand",
    aiTime: "Continuous AI forecast",
  },
];

export const contactInfo = {
  email: "evaluation@example-company.com",
  phone: "+1 (555) 010-2255",
  address: "Commercial Operations Review — Digital Transformation Office",
  hours: "Mon–Fri, 09:00 – 18:00",
};

export const faqs = [
  {
    q: "Is this site connected to a live Salesforce org?",
    a: "No. This is a self-contained prototype. All charts, KPIs and CRM records are generated sample data so the evaluation can be demonstrated without an authenticated Salesforce API integration.",
  },
  {
    q: "Where do the forecast numbers come from?",
    a: "They are simulated projections produced from a seeded dataset of 72 monthly product records, calibrated to resemble a mid-market commercial software company.",
  },
  {
    q: "Can I edit the evaluation results?",
    a: "Yes. Every 'after AI' value, rating and comment in the evaluation table is editable so you can substitute your own measured figures during a presentation.",
  },
];
