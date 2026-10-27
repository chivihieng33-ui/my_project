# Salesforce Einstein AI – Sales Automation & Forecasting

An interactive evaluation prototype assessing how **Salesforce Einstein AI** supports sales process
automation and sales forecasting in a commercial company. Built with React 19, TypeScript, Tailwind CSS v4
and Recharts.

> **Not affiliated with Salesforce, Inc.** No authenticated Salesforce API integration is implemented.
> Every figure, chart and customer record is clearly labelled generated sample data.

---

## ចូលមើលលឿន (Quick start)

```bash
npm install     # ដំឡើងដឺទ័ន
npm run dev     # បើកមើលតាម http://localhost:5173
npm run build   # បង្កើតទៅ dist/index.html (single file)
npm run preview # មើលជាមួយ production build
```

---

## 1. របៀបប្រើគេហទំព័រ (How to use the site)

### Header (លើស្លាប់)
| ធាតុ | ការដំណើរការ |
|---|---|
| Logo | ត្រឡប់ទៅផ្នែកទីដំបូង |
| Nav links | Home · About AI · Automation · Sales Dashboard · Evaluation · Reports · Leads · Contact |
| ប្រមាណក្រោម nav | ការដំណើរការ (scroll progress) — បង្ហាញមានណ៍អ្នកបានអាន |
| **Request Brief** | ប្រើសម្រាប់ទៅ Contact section |
| ☰ (mobile) | បិទ menu មានទាំង 8 links + ស្ថានភាព project |

នៅផ្នែកអក្សរបានបង្ហាញ link ដែលកំពុងអាន (active) ដោយប្រើប្រាកដខាងក្រោមមែន (auto scroll-spy) — អ្នកមិនចាំបាច់ចុច link ផ្ទាំងឡើងទៅទំព័រខាងលើឡើយ។

---

### ① Home — `Hero`
- ចុច **Explore Features** → ទៅ `#features` (8 capability cards)
- ចុច **View Sales Dashboard** → ទៅ `#dashboard` (KPI + charts)
- ខាងស្លាប់ស្តាប់ 4 KPI: 28.4% conversion · 7.8% forecast error · 2.4x ROI · 5-week pilot
- រូបភាពខាងស្តាប់គឺ illustration ពិត (CRM opportunity + Einstein insight) — មិនមែនជា screenshot

### ② Features — `#features`
8 កាតិយាកាស្ល័យ: Predictive Lead Scoring · Automated Lead Assignment · Next Best Action ·
AI-Assisted Emails · Interaction Tracking · AI Revenue Forecasting · Automated Sales Tasks · Manager Insights.
Hover → កាតផ្ទាំងដក់ឡើង + icon ប្រើ gradient ថ្មី.

### ③ About AI — `#about-ai`
- ពិពណ៌នា (អំពីអ្វីជា Einstein AI)
- ផ្ទាំងខាងស្តាប់៖ **How it integrates with the CRM** (4 ចំណុច + Trust Layer)
- 2 ជួរ: *For sales representatives* / *For sales managers*
- 3 benefit cards: productivity (+48%), customer relationships (3.2x), data-driven decisions (−16.2pp)

### ④ Automation — `#automation`
- 6 កាត **Before AI / After AI** (ប្រ្ប្រក់ពណ៌មុន–ក្រោយ ដោយមានប្រាកដ)
- **The automated sales workflow**: Lead Generation → Lead Scoring → Customer Follow-up →
  Opportunity Management → Closing the Deal
  ក្នុងគ្រប់ step មាន manual effort (ឞត្រង់) vs AI effort (ពណ៌ល្អ) + មានរង្វាស់ KPI

### ⑤ Sales Dashboard — `#dashboard` ⭐ សំខាន់គ្រប់គ្រង
| អ្វី | ការដំណើរការ |
|---|---|
| 5 KPI tiles | Total Sales Revenue · Monthly Target · Predicted Revenue · Conversion Rate · Pipeline Value (មាន ▲/▼ % ប្រែប្រួល) |
| **Filter FY2025 / Q1 / Q2 / Q3 / Q4** | ប្ដូរជាក់គ្រប់ chart ទាំងបីក្នុងភ្លាមៗ |
| Chart 1 | Actual (បារ) vs AI prediction (ខ្សែលពណ៌) vs Target (ខ្សែខាងស្លាប់) — hover មើលតម្លៃ |
| Chart 2 | Monthly sales performance + attainment % (axis សាងខាងស្តាប់) |
| Chart 3 | Sales forecast by product (Actual vs Forecast ជាមួយគ្នា) |
| Chart 4 | Performance by rep — ពណ៌តាម attainment (🟢 ≥100% · 🟡 90–99% · 🔴 <90%) |
| តារាង rep | Region · Deals · Revenue · Quota · Attainment · Einstein score |

> ពេលផ្ទាំង load ដំបូង នឹងបង្ហាញ skeleton (រង់ចាំ ~750ms) — ដើម្បីបង្ហាញ loading state ពិត។

### ⑥ Evaluation — `#evaluation`
- កាត **Summary**: overall score (គណនាពី rating × weight ផ្ទាំងទាំងអស់) + ចំនួន Excellent/Good/Fair/Poor + recommendation
- **តារាង 4 ជួរ: Criteria | Before AI | After AI | Evaluation Result**
  - ចុចក្នុង textarea/input/select ណាមួយ ដើម្បី **កែតម្លៃដោយផ្ទាល់** (ការពិតរបស់ក្រុមការងារអ្នក)
  - ប្ដូរ rating បាត់ → ពិន្ទុផ្ទាំងកើតឡើងភ្លាមៗ
  - **Reset demo values** → ប្រើតម្លៃដើមវិញ
  - **Export evaluation CSV** → ទាញយក file
- ក្រោមតារាងមាន **disclaimer**: តម្លៃទាំងអស់ត្រូវបានកែដោយទិន្នន័យពិតរបស់ក្រុមការងារមុនចុចប្រកាស

### ⑦ Reports — `#reports`
1. **Filter**: From / To (ខែ) · Product · Sales representative · **Reset**
2. 4 summary tiles ប្រាប់ Revenue · Target · Variance · Avg. deal size
3. **Chart: Sales trend** (area = actual, ប្រាកដ = target)
4. **Chart: Target vs. actual results** (bar ពណ៌តាម + line attainment %)
5. **Monthly sales report table**: Period · Target · Actual · Variance · Attainment · AI forecast · Orders · New customers + Total row
6. **Export CSV** (ពីរកន្លែង: toolbar + ក្បែអំឡង់) → ទាញយក `.csv` ដែលមាន BOM ដើម្បីបើកបានជាភាសាខ្មែរ/Excel ដោយមិនមានបញ្ហា
7. បើ filter មិនមានទិន្នន័យ → បង្ហាញ **empty state** មានប៊ូតុង Reset filters

### ⑧ Leads / CRM — `#crm`
- **AI priority queue**: 3 lead ក្រោយបន្ទាប់តាម Einstein lead score + next best action
- 4 stat tiles: open pipeline · hot leads · average score · closed won
- **Filters**: search (name/company/email/owner) · Stage · Source · min. lead score slider
- **Add lead** → modal ដែលមាន validation (ឈ្មោះ · ក្រុមហ៊ុន · email · score 0–100 · value · follow-up date)
- ក្រោមតារាងគ្មានមាន ត្រូវចុច ✎ (edit) ឬ 🗑 (delete)
  - 🗑 → **dialog បញ្ជាក់មុន** (cancel / delete) → toast ប្រាប់លទ្ធផល
- តារាងប្ដូរទៅ card list នៅ mobile (ងាយអាន)
- ចំណាំ: ទិន្នន័យទាំងអស់នៅ **ក្នុង browser តែប៉ុណ្ណោះ** — refresh បាត់ទៅ (មិនមាន database)

### ⑨ Contact — `#contact`
- Form: Full name* · Work email* · Company* · Area of interest · Message*
- Validation inline (ពណ៌ក្រហម ពេល blur ឬ submit) + focus ទៅ field ដំបូងដែលមានបញ្ហា
- បញ្ចប់ដោយសារសម្រេច → **success screen** + ប៊ូតុង "Send another request"
- ក្បាល FAQ accordion (3 សំណួរ: តើមដែល connected? ទិន្នន័យ forecast មកណា? កែតម្លៃបានទេ?)
- មាន contact details + list នៃ deliverables

### ⑩ Footer
3 ជួរ links · quick navigation chips · **data disclaimer** (ប្រាប់ច្បាស់ថា "Not affiliated with… or connected to Salesforce") · copyright

---

## 2. ការប្រើសម្រាប់ការបង្ហាញ (Presentation flow) — ១០ នាទី

1. **Home (១ នាទី)** — headline + 2 CTA → ប្រាប់ទិសដៅ: "យើងកំពុងវាយតម្លៃ Einstein AI សម្រាប់ការលក់"
2. **About AI (១ នាទី)** — ប្រាប់ថា AI នៅ *ក្នុង* CRM ដោយមិនការបង្កើត app ថ្មី
3. **Automation (២ នាទី)** — បង្ហាញ workflow 5 ជំហាន + ប្រែប្រួល manual → AI
4. **Dashboard (២ នាទី)** — ចុច **Q3** ដើម្បីបង្ហាញ filter ដំណើរការ → បង្ហាញ chart 4
5. **Evaluation (២ នាទី)** — កែ rating មួយ cell ផ្ទាំងងាយ → បង្ហាញថា editable → Export CSV
6. **Reports (១ នាទី)** — filter តែមួយ rep + export CSV
7. **CRM (១ នាទី)** — search "Globex" → add lead → delete → បង្ហាញ CRUD
8. **Contact (០.៥ នាទី)** — បញ្ចប់ + disclaimer

**ឃ្លាំងសំណួរទីក្រោយ (Q&A) ដែលគេរបស់ទឹកញាតិ:**
- "តើភ្ជាក់ Salesforce ពិតទេ?" → ទេ — prototype មិនមាន API authentication; ទិន្នន័យជា sample data ច្បាស់ណាស់
- "តើតម្លៃក្រឡប់មកណា?" → ពី seeded generator ៧២ records (product × month) — ផ្ទាំងទាំងអស់ reconcile ទៅ exact
- "តើប្រាប់ពីពិតទេ?" → ទេ ត្រូវកែដោយទិន្នន័យពិតរបស់ក្រុមការងារមុនបង្ហាញ

---

## 3. ការប្រើទិន្នន័យពិត (Swapping in real data)

| ត្រូវកែ | ឯកសារ |
|---|---|
| Sales figures | `src/data/sales.ts` → `monthlySales`, `reps`, `buildRecords()` |
| CRM records | `src/data/crm.ts` → `initialLeads` |
| Evaluation values | `src/data/evaluation.ts` → `initialCriteria` (កែបានតាម UI ផង) |
| អត្ថបទ | `src/data/content.ts` → `featureItems`, `workflowSteps`, `faqs` |
| Colors / animation | `src/index.css` → `@theme` block |

### ប្រើ Salesforce API ពិត
ដំឡើង `useAsyncData` hook ដែលមានស្រាប់ (ក្នុង `src/hooks/useAsyncData.ts`) ដើម្បីបន្ទាប់ fetch
ទៅ `/api/salesforce/...` (ដែលជា proxy server-side) — **មិនដាក់ client secret ក្នុង browser**។
ឧទាហរណ៍: OAuth 2.0 JWT bearer flow → `/services/data/v61.0/query?q=...` សម្រាប់
Opportunity, Lead, ForecastCategory រួចបន្លោសទៅ shape ដូច `MonthPoint` និង `Lead`។

---

## 4. ដំណើរការប្រព័ន្ធ (Architecture notes)

- **Reusable components** — `src/components/common/index.tsx` (Section, Container, Button, Badge, Panel,
  IconTile, StatCard, Skeleton, LoadingBlock, EmptyState, DemoNotice, Reveal)
- **State** — `useState` + `useMemo` ក្នុង component; គ្មាន state library ត្រូវការ
- **Animations** — IntersectionObserver (`useInView`) + Tailwind keyframes; គាំការបង្ហាញការពាក្យសម្លាប់ដោយ `prefers-reduced-motion`
- **Responsive** — mobile → tablet → desktop; table ប្តូរទៅ card list នៅ < 1024px
- **Type safety** — `tsc --noEmit` ជមិនមាន error (strict mode)
- **Single-file build** — `vite-plugin-singlefile` inline ស្រប់ JS/CSS ទៅ `dist/index.html` (≈239 KB gzip)

---

## 5. ការដោះស្រាយបញ្ហា (Troubleshooting)

| បញ្ហា | ដំណោះ |
|---|---|
| Chart មិនដំណើរការ | ប្រាប់ថា parent element ត្រូវមាន **fixed height** (ឧ `h-[300px]`) — ResponsiveContainer មិនអាចគណនាកម្ពុនៅផ្ទាំងដែលមិនមានទំហំឡើយ |
| Font មិនដំណើរការ | បានផ្ទាំង internet សម្រាប់ Google Fonts; បើ offline ប្រើ fallback system font |
| CSV មិនបើកជាភាសាខ្មែរ | ឯកសារទាំងអស់បាន BOM (`\uFEFF`) — Excel បើកបានធម្មាន |
| ទិន្នន័យ CRM បាត់ក្នុង refresh | របស់ព្រួល: state នៅក្នុង browser memory (មិនមាន persistence) — បើកសម្រួល `localStorage` ក្នុង `CustomerManagement.tsx` បើចង់រក្សា |
| Build ត្រូវបានច្រើន | Recharts ធំជាងគូ — បើមិនចាំបាច់តែ dashboard/reports អាច import តែពី `recharts` |
