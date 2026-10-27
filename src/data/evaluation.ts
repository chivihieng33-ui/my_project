/* =========================================================
   DEMO DATA — evaluation matrix for the Einstein AI assessment.
   Values are illustrative placeholders and must be re-based on
   the company's own data before the findings can be trusted.
   ========================================================= */

export type Rating = "Excellent" | "Good" | "Fair" | "Poor";

export type Criterion = {
  id: string;
  criteria: string;
  dimension: string;
  description: string;
  before: string;
  after: string;
  metricBefore: string;
  metricAfter: string;
  rating: Rating;
  comment: string;
  weight: number;
};

export const ratingStyles: Record<Rating, string> = {
  Excellent: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Good: "bg-brand-50 text-brand-700 ring-brand-200",
  Fair: "bg-amber-50 text-amber-700 ring-amber-200",
  Poor: "bg-rose-50 text-rose-700 ring-rose-200",
};

export const initialCriteria: Criterion[] = [
  {
    id: "c1",
    criteria: "Sales Process Automation Efficiency",
    dimension: "Automation",
    description:
      "How much of the lead-to-opportunity workflow is executed by Einstein rules, flows and generative assistance instead of manual rep effort.",
    before: "Manual routing, spreadsheet tracking and ad-hoc follow-ups. Reps spend ~4.5 hrs/week on admin.",
    after: "Einstein Lead Scoring, auto-assignment and Next Best Action automate routine steps.",
    metricBefore: "4.5 hrs/week admin",
    metricAfter: "1.2 hrs/week admin",
    rating: "Excellent",
    comment:
      "Strongest case: routing and follow-up automation remove measurable admin time and speed up first response.",
    weight: 15,
  },
  {
    id: "c2",
    criteria: "Sales Forecasting Accuracy",
    dimension: "Forecasting",
    description:
      "Accuracy of the AI-generated revenue forecast versus the manually compiled pipeline forecast used before the pilot.",
    before: "Manual forecast built from rep judgement — MAPE of 24%, pipeline coverage reviewed weekly.",
    after: "Einstein Forecast scores every opportunity; sample forecast MAPE falls to roughly 8%.",
    metricBefore: "24% MAPE",
    metricAfter: "7.8% MAPE",
    rating: "Good",
    comment:
      "Forecast error improved materially, but accuracy still depends on consistent opportunity field hygiene.",
    weight: 20,
  },
  {
    id: "c3",
    criteria: "Time Saved by Sales Representatives",
    dimension: "Productivity",
    description:
      "Net hours returned to sellers per week through AI-drafted emails, automated data entry and next-best-action recommendations.",
    before: "Reps write every follow-up email manually and log activity by hand (approx. 6 hrs/week).",
    after: "Einstein Sales Emails drafts personalised outreach; auto logging captures engagement.",
    metricBefore: "6 hrs/week",
    metricAfter: "2 hrs/week",
    rating: "Good",
    comment:
      "Saves roughly two thirds of writing and logging time; adoption is higher for SDR and inside-sales roles.",
    weight: 15,
  },
  {
    id: "c4",
    criteria: "Lead Conversion Improvement",
    dimension: "Pipeline",
    description:
      "Change in lead-to-closed-won conversion after prioritisation by AI lead score and personalised next-best actions.",
    before: "21.7% lead-to-closed-won, leads worked in queue order rather than value order.",
    after: "28.4% lead-to-closed-won after Einstein prioritisation and tailored outreach.",
    metricBefore: "21.7% conversion",
    metricAfter: "28.4% conversion",
    rating: "Excellent",
    comment:
      "Highest-scoring operational metric in the sample evaluation; prioritise and score hygiene is the key driver.",
    weight: 15,
  },
  {
    id: "c5",
    criteria: "Customer Relationship Management",
    dimension: "CRM / Service",
    description:
      "Effect of unified customer interaction tracking and AI-summarised relationship context for account managers.",
    before: "Interaction history split across email, phone and notes; reps spend time rebuilding context.",
    after: "Omni-channel interaction timeline plus Einstein-generated account summaries and sentiment.",
    metricBefore: "8 hrs/week context building",
    metricAfter: "3 hrs/week context building",
    rating: "Good",
    comment:
      "Relationship context is measurably better, provided every touchpoint is actually captured in CRM.",
    weight: 10,
  },
  {
    id: "c6",
    criteria: "Implementation Cost & ROI",
    dimension: "Commercial",
    description:
      "Total cost of the Einstein AI licence, data preparation and change management against incremental gross profit.",
    before: "No AI tooling — forecasting carried out manually with existing headcount.",
    after: "Licence, enablement and 6-month change programme, offset by incremental revenue and time saved.",
    metricBefore: "$0 incremental",
    metricAfter: "12-month ROI of ~2.4x (sample)",
    rating: "Fair",
    comment:
      "ROI is positive in the model but sensitive to adoption rate; benefit only realises if reps act on recommendations.",
    weight: 15,
  },
  {
    id: "c7",
    criteria: "Data Quality & System Readiness",
    dimension: "Data",
    description:
      "Completeness, consistency and timeliness of CRM data required for the models to produce reliable predictions.",
    before: "Inconsistent fields, ~18% of opportunities missing stage history, duplicate accounts present.",
    after: "Clean-up campaign plus validation rules; still ~7% incomplete records after remediation.",
    metricBefore: "18% incomplete records",
    metricAfter: "7% incomplete records",
    rating: "Fair",
    comment:
      "The single biggest risk to the whole programme — Einstein cannot outperform the data it is given.",
    weight: 10,
  },
  {
    id: "c8",
    criteria: "Privacy, Security & AI Limitations",
    dimension: "Governance",
    description:
      "Governance constraints of AI-assisted selling: data residency, model transparency, bias and over-automation risk.",
    before: "Manual decisions: predictable and auditable, but slow and inconsistently applied.",
    after: "Einstein Trust Layer, masking and audit trail; risk of opaque scoring and automated bias.",
    metricBefore: "No AI governance layer",
    metricAfter: "Trust Layer + audit trail",
    rating: "Fair",
    comment:
      "Controls are adequate for business use, but a human-in-the-loop policy and bias monitoring must be formalised.",
    weight: 10,
  },
];

export const evaluationNote =
  "All values in this table are editable demonstration placeholders built from a simulated dataset. They are not measured results from a live Salesforce org. Before publishing findings, each metric must be recalculated from the company's own CRM extracts (opportunity history, activity logs, forecast snapshots) and validated with the sales operations team.";

export const evaluationSummary = {
  overall: "Promising",
  score: 78,
  weighted: "3.9 / 5.0",
  recommendation:
    "Proceed with a phased rollout for the Enterprise and Mid-Market teams, conditional on a data-clean-up programme and a 6-month adoption baseline.",
};
