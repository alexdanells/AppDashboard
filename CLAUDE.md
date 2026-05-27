# Apprenticeship Business Dashboard

## Project Overview
A demo dashboard for **Boom Training**, an apprenticeship training provider. Built with realistic dummy data to:
- Provide **visual data** in tabulated format (downloadable as Google Sheets-compatible file)
- Deliver **actionable data** to drive performance and support daily management

**Live URL:** https://alexdanells-boomtraining.github.io/AppDashboard/
**GitHub repo:** https://github.com/alexdanells-boomtraining/AppDashboard

---

## Tech Stack
- **HTML** — structure (`index.html`)
- **CSS** — styling (`style.css`)
- **JavaScript** — logic and data (`app.js`)
- **localStorage** — data persistence (no backend, no database)

## File Rules
- Keep all code in exactly **three files**: `index.html`, `style.css`, `app.js`
- **Do not add new libraries** (e.g. Chart.js, Bootstrap, etc.) without asking the user first

## Running the App
Open `index.html` directly in a browser — no build step, no server needed.

## Hosting
- Hosted on **GitHub Pages** from the `main` branch
- To publish changes: `git push origin main`

## Data
- All data is dummy/realistic placeholder data
- Supports a **200 learner** (default) and **1,000 learner** toggle to illustrate current vs scaled provision
- Data keyed by `currentSize` (200 or 1000) where applicable

## Developer Notes
- The user (**Alex Danells**, Head of Delivery at Boom Training) is not a developer
- Explain all git steps clearly (branching, committing, pushing)
- Keep explanations beginner-friendly
- Use feature branches per dashboard; merge to `main` when complete; delete the branch

---

## Navigation Pages (11 total)

| Nav Label | Page ID | Status |
|---|---|---|
| Overview | `page-overview` | Built |
| DfE AAF | `page-aaf` | Built |
| Sales Pipeline | `page-sales` | Built |
| SMT | `page-smt` | Built |
| Learner Voice | `page-learner-voice` | Built |
| Compliance | `page-compliance` | Built |
| Delivery | `page-delivery` | Built |
| Learning | `page-learning` | Placeholder |
| Learner Welfare | `page-welfare` | Built |
| LSC | `page-lsc` | Built |
| Gateway Pipeline | `page-gateway` | Built |

---

## Page Details

### Overview
- 6 KPI cards: Learners, On Track, At Risk, Overdue, Employers, Achievement Rate
- Actions Today and At Risk summary panels

### DfE AAF
- 6 AAF metric cards (Overall Achievement, Timely Achievement, Retention, Pass Rate, Timely Completion, Ofsted Readiness)
- Each card has a RAG pill and benchmark comparison
- Data keyed by `AAF_METRICS[currentSize]`

### Sales Pipeline
- Month navigation (offset from **May 2026** = offset 0)
- Progress bar: confirmed starts (≥70% prob) vs monthly target
- **RAG breakdown cards** (High ≥70% / Medium 40–60% / Low ≤30%) showing standards split
- Filters: Standard, AM, Status, Probability
- Table columns: Learner, Employer, AM, Standard, Probability, Expected Start, Status
- **Probability:** 10-point scale (10%–100%)
- **Statuses:** Cold Lead → In Scope → Proposal Sent → Contract Issued → Contract Signed → Enrolment
- **Account Managers:** Rachel Thornton, Marcus Webb, Sophie Lawson, Dan Kirby
- Data: May–Aug 2026 only; earlier months have no entries
- Month-specific targets in `PIPELINE_TARGETS` object

### SMT
- 4 KPI cards: Revenue, Starts, At Gateway, Withdrawals
- Data from `DATA[currentSize]`

### Learner Voice
- eNPS score for learners and employers
- Promoters / Passives / Detractors breakdown

### Compliance
- LSC filter bar (drives all 4 tables simultaneously)
- 4 tables — all shared render functions parameterised by `(tbodyId, lscFilter)`:
  1. Outstanding Monthly Touchpoints
  2. Beyond 10-Week SLA (progress reviews)
  3. No OTJ Evidence This Month
  4. Awaiting First LSC Meeting (with 30-day window column, FDOL Entry, Starter Checklist tick system)
- Awaiting First LSC Meeting uses `table--fit` (fixed-layout, overflow ellipsis) for wide table fit

### Delivery
- LSC filter bar (drives all tables + KPIs)
- KPI bar: OOF count, BIL count, BIL decisions needed (turns red when >0), Q2/Q3/Q4 counts
- Portfolio RAG summary strip across all quarterly tables
- 5 tables:
  1. **Out of Funding (OOF)** — columns: Employer, Learner, Standard, Planned Gateway, LSC, Status (Current/At Gateway/Withdrawn/BIL), Month Expected, GW→EPA, Portfolio RAG, Notes
  2. **Break in Learning (BIL)** — columns: Employer, Learner, Standard, Planned Gateway, LSC, Status (BIL Ongoing/BIL Decision Needed/RTL Confirmed), LDOL, Expected RTL, Notes
  3. **Q2 2026 Gateway (Apr–Jun)**
  4. **Q3 2026 Gateway (Jul–Sep)**
  5. **Q4 2026 Gateway (Oct–Dec)**
- Q2/Q3/Q4 tables share the same columns: Employer, Learner, Standard, Planned Gateway, LSC, Status, Month Expected, GW→EPA, Portfolio RAG
- Uses `dd-table` class (NOT `table--fit`) — natural column widths, `overflow-x: auto` on parent for scroll

### Learning
- Blank placeholder — content to be defined

### Learner Welfare
- 4 KPI cards: ALS Total, ALS Active, Safeguarding Active, Welfare Checks Due
- 3 tables: ALS Register, Safeguarding & Welfare Concerns, Welfare Check-ins Due
- ALS register has RAG review status (Overdue / Due Soon / On Track)

### LSC (Individual Coach View)
- Pre-set to **James Okafor** by default
- Coach selector dropdown (same 5 coaches)
- 4 KPI cards: Learners, Reviews Due, At Risk, OTJ Compliance
- Same 4 tables as Compliance but filtered to the selected coach only
- Functions: `renderLSCKPIs()`, `renderLSCTables()` — share same render functions as Compliance

### Gateway Pipeline
- Month navigation (offset from **June 2026** = offset 0)
- Progress bar: at gateway vs expected
- 4 metric cards: Forecast (blue), Expected at Gateway (amber), At Gateway (green), Carry Over (red)
- Table: one section per LSC with the **LSC name as a heading above the column headers** (not as an in-table row)
- Renders into `<div id="gateway-container">` via JS (not a static `<tbody>`)
- Summary row per LSC group with gateway rate and RAG colour

---

## Key State Variables (`app.js`)

```javascript
let currentSize        = 200;        // 200 or 1000
let pipelineOffset     = 0;          // 0 = May 2026
let gatewayOffset      = 0;          // 0 = June 2026
let deliveryLSCFilter  = 'All';      // Compliance page LSC filter
let deliveryDashFilter = 'All';      // Delivery page LSC filter
let lscPageCoach       = 'James Okafor'; // LSC page coach
```

---

## Key Data Constants (`app.js`)

| Constant | Description |
|---|---|
| `DATA` | KPI values keyed by 200/1000 |
| `COACH_DATA` | Per-coach KPIs (5 LSCs) |
| `AAF_METRICS` | DfE AAF metrics keyed by 200/1000 |
| `TOUCHPOINT_DATA` | Outstanding touchpoints table data |
| `SLA_DATA` | Beyond 10-week SLA table data |
| `OTJ_DATA` | No OTJ evidence table data |
| `STARTER_DATA` | Awaiting first LSC meeting data |
| `PIPELINE_ENTRIES` | Sales pipeline (May–Aug 2026, with `am` field) |
| `PIPELINE_TARGETS` | Monthly start targets keyed by `'YYYY-MM'` |
| `ALS_DATA` | Additional Learning Support register |
| `SAFEGUARDING_DATA` | Safeguarding & welfare concerns |
| `WELFARE_DUE_DATA` | Welfare check-ins due |
| `OOF_DATA` | Out of Funding learners |
| `BIL_DATA` | Break in Learning register |
| `GW_Q2_DATA` | Q2 2026 gateway learners |
| `GW_Q3_DATA` | Q3 2026 gateway learners |
| `GW_Q4_DATA` | Q4 2026 gateway learners |
| `GATEWAY_MONTHS_DATA` | Monthly gateway pipeline, keyed by `'YYYY-MM'` |

---

## Key Render Functions (`app.js`)

| Function | Purpose |
|---|---|
| `renderAll()` | Triggers all KPI and table renders (called on size toggle) |
| `renderPipeline()` | Sales pipeline — filters to current month, resets filters |
| `renderPipelineBreakdown(entries)` | RAG breakdown cards below progress bar |
| `renderGateway()` | Gateway pipeline — builds per-LSC sections into `#gateway-container` |
| `renderDeliveryDash()` | Delivery dashboard — all 5 tables + KPIs |
| `renderWelfare()` | Welfare page — ALS, safeguarding, welfare due |
| `renderDeliveryTables()` | Compliance page 4 tables (uses `deliveryLSCFilter`) |
| `renderLSCTables()` | LSC page 4 tables (uses `lscPageCoach`) |

---

## CSS Conventions (`style.css`)

| Class | Purpose |
|---|---|
| `.page` / `.page.active` | Show/hide pages |
| `.panel-stack` | 2-column grid layout for panels |
| `.panel--span` | `grid-column: 1 / -1` — full-width panel |
| `.table--fit` | Fixed-layout table with overflow ellipsis (used for narrow tables) |
| `.dd-table` | Full-width table, natural column widths, no cell clipping (Delivery dash) |
| `.kpi-bar` | Responsive KPI card grid |
| `.kpi-sub` | Small helper text below KPI value |
| `.rag-badge` | Coloured inline badge for Portfolio RAG |
| `.rag-summary-bar` | Strip showing RAG counts (Delivery page) |
| `.bd-card` / `.bd-grid` | RAG breakdown cards (Sales Pipeline) |
| `.sp-pill` | Sales pipeline status pills (6 variants) |
| `.dd-status-*` | Delivery/OOF/quarter status pills |
| `.lsc-table-section` / `.lsc-table-heading` | Gateway Pipeline per-LSC grouping |
| `.weeks-pill` | Urgent/warning/ok time-based indicators |
| `.check-yes` / `.check-no` | Tick/dash indicators for boolean fields |
| `.panel-count` | Small chip showing row count in panel header |

---

## LSCs (Learning Skills Coaches)
- Sarah Mitchell
- James Okafor
- Priya Sharma
- Tom Bradley
- Hannah Clarke

## Apprenticeship Standards Delivered
- Data Technician
- Data Analyst
- Applied AI & Automation
- Multi-Channel Marketer
- Assistant Accountant
- Professional Accounting Technician
- Digital Support Technician
