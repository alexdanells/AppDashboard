# Apprenticeship Business Dashboard

## Project Overview
A demo dashboard for **The Tess Group**, an apprenticeship training provider. Built with realistic generated dummy data to:
- Provide **visual data** in tabulated format (downloadable as CSV/Google Sheets-compatible)
- Deliver **actionable data** to drive performance and support daily management
- Demonstrate the system concept across role-based accounts at two provision scales

**Live URL:** https://alexdanells.github.io/AppDashboard/
**GitHub repo:** https://github.com/alexdanells/AppDashboard

---

## Tech Stack
- **HTML** — structure (`index.html`)
- **CSS** — styling (`style.css`)
- **JavaScript** — logic and data (`app.js`)
- No libraries, no build step, no backend

## File Rules
- Keep all code in exactly **three files**: `index.html`, `style.css`, `app.js`
- **Do not add new libraries** without asking the user first

## Running the App
Open `index.html` directly in a browser — no build step, no server needed.

## Hosting
- Hosted on **GitHub Pages** from the `main` branch
- To publish: `git push origin main`

## Developer Notes
- The user (**Alex Danells**, Head of Delivery at The Tess Group) is not a developer
- Explain all git steps clearly
- Use feature branches per task; merge to `main` when complete; delete the branch

---

## Phase Toggle (Phase 1 / Phase 2 / Phase 3)

Three buttons sit in the header to the left of the size toggle. Phase 2 is permanently disabled (greyed out). **Dashboard defaults to Phase 1 on load.** Phase 1 is the minimum-viable view tied to what the Platform can currently support. Phase 3 is the full aspirational dashboard.

### Phase 1 restrictions
- **Nav hidden:** Sales Pipeline, Gateway
- **Overview — sections hidden:** DfE AAF section, DfE AAF summary card, Sales Pipeline summary card, Gateway Pipeline summary card, Learner Welfare summary card, Learner Voice summary card, Achievement Rate KPI card (`id="kpi-achievement-card"`), BIL Decisions Needed banner entry (`id="ov-bil-decision-row"`)
- **Compliance tab — hidden:** BIL Decisions Needed KPI card (`id="comp-bil-action-card"`) and BIL table
- **Learners sub-tabs hidden:** Curriculum, Learner Welfare, Learner Voice
- **Delivery/KSB tab:** renamed to "Delivery — KSB & Curriculum"; table gains three extra columns (Current Sprint, Curriculum %, Status) from `AD.curriculum` via `_buildCurriculumLookup()`; panel title becomes "KSB & Curriculum Progress"

### Phase 3 (full dashboard)
All sections restored. `applyPhaseSettings()` re-applies `NAV_ACCESS` role checks when restoring nav links so role permissions still hold.

### Implementation
- `currentPhase` state variable (1 or 3; Phase 2 button is disabled); defaults to `1`
- `applyPhaseSettings()` runs at the end of `renderAll()` and on every phase button click
- `applyRolePermissions()` runs first (role-based visibility), then `applyPhaseSettings()` applies phase overrides on top
- `renderKSB()` rebuilds `<thead>` on every call: 13 columns in Phase 1 (combined KSB+Curriculum), 10 columns in Phase 3
- KSB sort uses event delegation on `document` scoped to `#ksb-table .sort-th` (direct binding broke on thead rebuild)
- Individual `DATA_ORIGINS` fields can carry their own `phases: [3]` to be excluded from Phase 1 views even within a Phase 1+3 section (e.g. ALS Reviews Overdue, BIL Decisions Needed in the Urgent Actions Banner)

---

## Dark Mode

A sun/moon icon button sits in the header (between the size toggle and the date badge). Click it to switch between light and dark themes. The preference is saved to `localStorage` under key `btTheme` and applied immediately on the next page load via a small inline `<script>` in `<head>` (prevents flash of wrong theme).

### How it works
- `document.documentElement` gets `data-theme="dark"` set/removed on toggle
- `MOON_ICON` / `SUN_ICON` SVG constants in `app.js` are injected into the button via `updateThemeBtn(isDark)`
- `updateThemeBtn()` is called once on page load (reads the current `data-theme` state) and on every click

### CSS variable strategy
`--navy` is dual-use in light mode (dark brand color for both button backgrounds and text). In dark mode the variables are overridden as follows:

| Variable | Light | Dark | Reason |
|---|---|---|---|
| `--navy` | `#0f1e3c` | `#d8e6f2` | Repurposed as near-white so all text/labels using `--navy` become readable |
| `--navy-mid` | `#1b2f55` | `#a8bfd4` | Same — used for secondary text (e.g. "View →" button text) |
| `--white` | `#ffffff` | `#1c1c1c` | Cards, panels, header surfaces go dark gray |
| `--surface` | `#f5f7fb` | `#111111` | Page background goes near-black |
| `--card` | `#ffffff` | `#1c1c1c` | As above |
| `--border` | `#e2e8f0` | `#2e2e2e` | Borders go dark |
| `--text-main` | `#0f1e3c` | `#eeeeee` | Body text goes white |
| `--text-muted` | `#64748b` | `#888888` | Muted text lightens |

Because `--navy` becomes near-white, any element using `background: var(--navy)` (active toggles, buttons, avatars) must be explicitly overridden in `[data-theme="dark"]` to use a dark gray (`#383838`) with white text instead. See the dark mode block at the top of `style.css` for the full list of targeted overrides (hardcoded pastel row states, gateway metric cards, pipeline pills, ksb-notice, etc.).

---

## Data Origins Panel

A narrow tab (`#data-origin-tab`) on the left edge of every page opens a fixed-position drawer (`#data-origin-panel`) showing the data map for the currently visible page. It slides in from the left and is dismissed by clicking the close button or the overlay.

### How it works
- `dataOriginOpen` boolean tracks whether the panel is open
- `renderDataOriginPanel()` re-renders on nav switch, phase toggle (if open), and size toggle
- Sections filtered by current phase: sections with `phases: [3]` hidden in Phase 1; individual fields within a section can also carry `phases: [3]` to be excluded
- Each field shows: platform status badge (Yes / Partial / No / Not yet reviewed), source note, and for No/Partial fields an amber "Build required:" callout

### DATA_ORIGINS structure (`app.js`)
Keyed by page ID (`page-overview`, `page-learners`, `page-gateway`, `page-sales`, `page-reporting`). Each page has `title`, `phases`, and `sections[]`. Each section has `name`, `phases`, `desc`, and `fields[]`. Each field has:

```javascript
{
  label:       'Field Name',
  platform:    'yes' | 'no' | 'partial',  // omit = not yet reviewed
  phases:      [1, 3],   // optional; inherits section phases if omitted
  source:      '...',    // where in the Platform the raw data lives
  calculation: '...',    // how it is derived or computed
  illustrates: '...',    // how it appears on the dashboard and what it represents
  rationale:   '...',    // why it matters / what decision it drives
  build:       '...',    // what needs to be built (No/Partial fields only)
}
```

Phase 1 fields (Learner Record, KSB, Curriculum, Compliance, Overview KPI Bar, Urgent Actions) are fully populated. Phase 3 sections carry empty strings for the four new properties and are to be completed in a future pass.

---

## Platform Map Modal

A "Platform Map" button (`#datamap-btn`) in the header (to the left of the Phase toggle) opens a full-screen modal showing all `DATA_ORIGINS` fields across all pages in one view.

### Features
- **Stats bar** — live counts of Yes / Partial / No / Not yet reviewed / Total fields with descriptions
- **Status filter** — All · Yes · Partial · No · Not reviewed
- **Phase filter** — All · Phase 1 · Phase 3 only; defaults to the current dashboard phase on every open
- **Card layout** — each field renders as a card with labelled rows: Source, Calculation, Illustrates, Rationale, Build Required (amber highlight)
- **Export CSV** — downloads `TessGroup_PlatformDataMap.csv` with all 10 columns regardless of active filters: Page, Section, Phase Availability, Field, In Platform?, Source, Calculation / Derivation, Illustrated As, Rationale, Build Required

### Key state variables
```javascript
let dataOriginOpen  = false;
let _dmStatusFilter = 'all';
let _dmPhaseFilter  = 'all';   // reset to String(currentPhase) on every open
```

### Key functions
| Function | Purpose |
|---|---|
| `renderDataOriginPanel()` | Renders the per-page sidebar drawer |
| `openDataOriginPanel()` / `closeDataOriginPanel()` | Open/close drawer, toggle body scroll lock |
| `renderDataMap()` | Flattens DATA_ORIGINS, applies filters, renders card layout |
| `openDataMap()` | Syncs `_dmPhaseFilter` to `currentPhase`, then opens modal |
| `closeDataMap()` | Closes modal |
| `exportDataMapCSV()` | Exports full unfiltered dataset as CSV |

---

## Navigation (6 items)

| Nav Label | Page ID | Visible to |
|---|---|---|
| Overview | `page-overview` | All except Sales Manager; LSC sees no DfE AAF section |
| Sales Pipeline | `page-sales` | All except LSC |
| Learners | `page-learners` | All except Sales Manager |
| Gateway | `page-gateway` | Delivery Manager, Quality Manager, LSC |
| Reporting | `page-reporting` | Everyone |

**SMT** was removed from nav. The standalone pages for Learner Voice, Compliance, Delivery, Welfare, LSC, Gateway Pipeline, DfE AAF have all been merged into the new structure.

---

## Role-Based Accounts

9 accounts accessible via the user switcher (top-right header):

| Account | Role | Access restrictions |
|---|---|---|
| Delivery Manager | `delivery` | Full access |
| Compliance Manager | `compliance` | Full access |
| Quality Manager | `quality` | Full access (incl. Gateway) |
| Sales Manager | `sales` | Sales Pipeline + Reporting (pipeline only) |
| Sarah Mitchell | `lsc` | Own learners only; no Sales Pipeline, no SMT |
| James Okafor | `lsc` | Same as above |
| Priya Sharma | `lsc` | Same as above |
| Tom Bradley | `lsc` | Same as above |
| Hannah Clarke | `lsc` | Same as above |

LSC avatar shows **LSC** (not initials). Manager avatars show their initials (DM, CM, QM, SM).

`NAV_ACCESS` in `app.js` governs which pages each role can see. `applyRolePermissions()` hides/shows nav links, overview cards, filter bars, and data views based on `currentUser.role`.

---

## Data Scaling (200 / 1,000 Learner Toggle)

Two fully generated datasets, both deterministic (seeded RNG):

| | `SCALE_200` | `SCALE_1000` |
|---|---|---|
| Seed | 99 | 42 |
| Coaches | 5 (existing) | 20 (5 + 15 new) |
| Total learners | 200 | 1,000 |
| Distribution | 10% Gateway, 5% OOF, 5% BIL, 80% Live | Same |
| Start dates | Last 15 months | Same |

`AD` accessor in `app.js` transparently returns the right dataset based on `currentSize`:
```javascript
const AD = {
  get touchpoints() { return currentSize === 1000 ? SCALE_1000.touchpoints : SCALE_200.touchpoints; },
  // ... all arrays
  get masters() { ... } // all learners regardless of standard
};
```

Old hand-crafted arrays (`TOUCHPOINT_DATA`, `KSB_DATA` etc.) are kept in the file but no longer used by any dashboard or report.

**20 coaches at 1,000 scale:** Sarah Mitchell, James Okafor, Priya Sharma, Tom Bradley, Hannah Clarke + Natasha Reynolds, Daniel Osei, Emma Whitfield, Marcus Chen, Lorna MacPherson, Aidan Walsh, Fatima Begum, Ryan Saunders, Charlotte Patel, Leon Adeyemi, Niamh O'Brien, Josh Carpenter, Amara Diallo, Steven Park, Rosa Ferreira.

---

## Page Details

### Overview (`page-overview`)
- **DfE AAF section** — 6 RAG metric cards at top, collapsible via toggle button. Hidden for LSC users and in Phase 1.
- **KPI bar** — uses `grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))` so card count varies by role/phase without layout breakage
  - **Manager cards (up to 8):** Active Learners · Employers · On Track · At Risk · Overdue Reviews · Monthly OTJ Compliance (`kpi-otj-month-card`) · Monthly Meeting Compliance (`kpi-meeting-month-card`) · Achievement Rate (`kpi-achievement-card`, hidden in Phase 1)
  - **LSC cards (7):** My Learners · Employers · On Track · At Risk · Monthly OTJ Compliance (relabeled `kpi-overdue`) · Monthly Meeting Compliance (`kpi-meeting-month-card`) · Achievement Rate
  - `kpi-otj-month-card` is manager-only (hidden for LSC via `applyRolePermissions()`); LSC uses the `kpi-overdue` slot relabeled "Monthly OTJ Compliance"
- **Urgent actions banner** — count of SLA breaches + BIL decisions + OOF red + ALS overdue + active safeguarding + welfare overdue + KSB super-red
- **Summary cards grid** — 10 cards (managers) / 8 cards (LSC), ordered via CSS `order` property:
  - **Manager order:** DfE AAF · Sales Pipeline · Compliance · OOF & BIL · KSB Tracker · Gateway Pipeline · Gateway Forecast · Curriculum · Learner Welfare · Learner Voice
  - **LSC order:** Compliance · OOF & BIL · KSB Tracker · Gateway Pipeline · Gateway Forecast · Curriculum · Learner Welfare · Learner Voice
- All summary card values filter to LSC's own learners when role is `lsc`

### Sales Pipeline (`page-sales`)
- Month navigation (offset from May 2026 = offset 0)
- Progress bar: confirmed starts (≥70% prob) vs monthly target
- RAG breakdown cards (High/Medium/Low) with standards split
- Filters: Standard, AM, Status, Probability
- Data: May–Aug 2026. Statuses: Cold Lead → In Scope → Proposal Sent → Contract Issued → Contract Signed → Enrolment
- Account Managers: Rachel Thornton, Marcus Webb, Sophie Lawson, Dan Kirby

### Learners (`page-learners`) — 5 sub-tabs

#### Delivery — KSB Tracker
- For **managers**: shows at-risk learners only (Super Red, Red, Amber) within 6 months of gateway by default; filter by LSC shows full caseload
- For **LSC**: shows own caseload with all learners
- KPI bar — two groups (within 6 months / within 3 months): Super Red / Red / Amber / Green counts
- Table: Employer, Learner, Standard, LSC, Start Date, Planned Gateway, Status, Knowledge %, Skills %, Behaviours %, RAG
- Manager notice explains the filter and scope
- **KSB Standards:** Data Technician (52K/32S/8B), Data Analyst (30K/30S/14B), Applied AI & Automation (58K/58S/12B)
- RAG: Super Red ≥75% remaining, Red 51–74%, Amber 25–50%, Green ≤24%
- Sortable column headers (click to sort asc/desc)

#### Compliance
- LSC filter bar (hidden for LSC, auto-filtered to own coach)
- 8 KPI cards: Awaiting First Meeting, Outstanding Touchpoints, Progress Reviews (10+ wks), OTJ Compliance in Month, OOF Active, BIL Decisions Needed + (LSC-only) Reviews Due, OTJ Compliance %
- 6 tables (sortable):
  1. **Awaiting First LSC Meeting** — learners where FDOL+checklist not both done; columns: Learner, Employer, Standard, LSC, Planned Start, 30-Day Window, FDOL Entry
  2. **Outstanding Monthly Touchpoints** — sorted oldest meeting first; note shown explaining only Progress Reviews are currently on the Platform (Starter Checklist and Interim 121 forms to come)
  3. **Progress Reviews** — **10+ weeks** (not 8), sorted most overdue first; columns: Learner, Employer, LSC, Last Progress Review, Review Due By, Weeks Since, Status
  4. **OTJ Compliance in Month** — sorted longest since entry first; columns: Learner, Employer, LSC, OTJ Completed, OTJ Expected, Last Entry Date
  5. **Out of Funding (OOF)** — sorted by most overdue planned gateway
  6. **Break in Learning (BIL)** — simplified to 5 columns: Employer, Learner, Standard, LSC, BIL Start Date (RTL dates and decision status removed as non-viable for Phase 1)

#### Curriculum
- LSC filter + Standard filter + Status filter (3-column grid layout)
- KPI bar: total on curriculum, on track, off track/behind, no activity
- Learner Progress table — sorted furthest behind first: No Activity → Behind → Off Track → On Track
- Columns: Learner, Employer, Standard, LSC, Current Sprint, Sprint Progress %, Last Activity, Status
- Sortable column headers

**Curriculum Sprints by Standard:**
- Data Technician: AI Literacy, AI Applications in Business L3, AI for Data Analytics L3
- Data Analyst: Introduction to Data Analytics L4 v2, Python Foundations L4 v2, Module to be Selected, Main Analysis Types L4
- Applied AI & Automation: L4 AI Copilot AI Literacy, L4 AI Copilot No Code AI Applications, L4 AI Copilot Low Code AI Applications

#### Learner Welfare
- LSC filter bar (hidden for LSC)
- 4 KPI cards: Learners with Declared Needs, Active Support Plans, Active Safeguarding, Welfare Check-ins Due
- 4 ALS breakdown cards (LSC-filtered): Learning Difficulties, ADHD & Autism, Mental Health, Physical & Sensory
- Tables:
  1. **ALS Register** — Learner, Standard, LSC, Declared Need, Adjustments in Place
  2. **Safeguarding & Welfare Concerns** — merged table (Type badge: Safeguarding / Welfare Check-in), sortable by Learner and LSC

#### Learner Voice
- LSC filter bar (hidden for LSC)
- eNPS hero: Learner eNPS, Employer eNPS, Promoters/Passives/Detractors
- **Learner Comments** — Learner, Employer, Last Progress Review, Commentary
- **Employer Comments** — Learner, Line Manager, Employer, Last Progress Review, Commentary
- **Exit Review Summary** — Learner, Standard, Status (Achieved/Withdrawn), Commentary

### Gateway (`page-gateway`) — 2 sub-tabs

#### Gateway Forecast
- LSC filter bar (hidden for LSC)
- 3 KPI cards: Q2/Q3/Q4 learner counts with sub-text
- RAG summary strip across all quarters
- Q2 (Apr–Jun), Q3 (Jul–Sep), Q4 (Oct–Dec) tables

#### Gateway Pipeline
- Month navigation (offset from June 2026 = offset 0)
- Seasonal variation: spring peak (Apr–Jun), summer flat (Jul–Aug), autumn peak (Sep–Nov), winter flat (Dec)
- Future months show learners as **forecast only** (`atGateway: false`)
- LSC users only see their own group
- 4 metric cards: Forecast, Expected, At Gateway, Carry Over

### Reporting (`page-reporting`)

#### Standard Reports (7 card-style selectors)
Click a card → relevant filters appear → Run Report

| Report | Base data | Key filters |
|---|---|---|
| LSC Full Caseload | `AD.masters` (all 200/1000) | LSC, Standard, Status |
| Standard Employer Report | `AD.masters` (all) | LSC, Standard, Employer |
| Learner Touchpoints | `AD.masters` (all) | LSC |
| Progress Reviews | `AD.sla` (8+ weeks) | LSC |
| OTJ Compliance | `AD.otj` (flagged) | LSC |
| KSB Progress | `AD.ksb` (KSB standards) | LSC, Standard |
| Curriculum Progress | `AD.curriculum` | LSC, Standard |

**LSC Full Caseload columns:** Learner Name, Employer Name, Standard, LSC, Status, Learning Start Date, Planned Gateway Date, OTJ Actual, OTJ Expected, Learning End Date, KSB Progress, Curriculum Progress, Overall RAG, Date of Last Meeting, Meeting Type, LLDD/Declared

**Standard Employer Report columns:** Same as Caseload minus LLDD; adds LSC Commentary (empty placeholder)

- Data is padded with synthetic values for learners not in compliance datasets (meeting dates, OTJ values)
- `_buildMeetingLookup()` and `_buildOtjLookup()` cover all masters
- Results paginate at **100 rows per page** with prev/next/numbered controls at bottom
- **Export CSV always exports the full result set** regardless of current page

#### Quick Reports (10 preset pills for LSC / 11 for managers)
One-click pre-filtered reports: Awaiting First Meeting · Progress Reviews Overdue · BIL Decisions Needed · OOF Red Portfolio · KSB At-Risk · Curriculum Off-Track · Gateway Red Portfolio · Active Safeguarding · Welfare Check-ins Due · ALS Register · Sales Pipeline *(managers only)*

#### Reporting Permissions
| Role | Access |
|---|---|
| Delivery / Compliance / Quality Manager | Full access to all 7 standard reports and all 11 quick reports |
| Sales Manager | Sales Pipeline only (notice shown for all other areas) |
| LSC | All 7 standard reports + 10 quick reports (Sales Pipeline hidden); `rf-lsc` locked to their coach, all `reportFilterBy()` calls automatically filter to their caseload |

**Why Sales Pipeline is hidden for LSC:** `PIPELINE_ENTRIES` has no `lsc` field — the LSC filter would be silently ignored and return all sales data, which is both incorrect and not relevant to an LSC's caseload.

All other data sources (`AD.masters`, `AD.ksb`, `AD.sla`, `AD.otj`, `AD.curriculum`, `AD.als`, `AD.safeguarding`, `AD.welfareDue`, `AD.gwQ2/Q3/Q4`, `AD.oof`, `AD.bil`, `AD.starters`) have an `lsc` field and filter correctly.

---

## Key State Variables (`app.js`)

```javascript
let currentSize        = 200;
let currentPhase       = 1;           // 1 = Phase 1 (MVP), 3 = Phase 3 (full); defaults to 1
let pipelineOffset     = 0;           // 0 = May 2026
let gatewayOffset      = 0;           // 0 = June 2026
let gwForecastFilter   = 'All';
let deliveryLSCFilter  = 'All';       // Compliance tab
let deliveryDashFilter = 'All';       // Delivery/KSB tab
let welfareFilter      = 'All';
let learnerVoiceFilter = 'All';
let lscPageCoach       = 'James Okafor';
let ksbLSCFilter       = '';
let ksbSortCol         = 'rag';
let ksbSortAsc         = true;
let _currentSrType     = '';          // Reporting: selected standard report type
let _reportPage        = 1;           // Reporting: current page
let currentUser        = USERS[0];    // Default: Delivery Manager
let dataOriginOpen     = false;       // Data Origins sidebar panel open state
let _dmStatusFilter    = 'all';       // Platform Map: status filter
let _dmPhaseFilter     = 'all';       // Platform Map: phase filter (reset to currentPhase on open)
```

---

## Key Data Structures (`app.js`)

| Constant | Description |
|---|---|
| `DATA` | Summary KPI values keyed by 200/1000; includes `otjCompliance` and `meetingCompliance` |
| `COACH_DATA` | Per-coach KPIs (5 LSCs) — includes `meetingCompliance`; used for LSC KPI cards |
| `AAF_METRICS` | DfE AAF metrics keyed by 200/1000 |
| `KSB_STANDARDS` | K/S/B totals per standard (Data Technician, Data Analyst, Applied AI) |
| `PIPELINE_ENTRIES` | Sales pipeline May–Aug 2026 |
| `PIPELINE_TARGETS` | Monthly start targets `'YYYY-MM'` |
| `LEARNER_COMMENTS_DATA` | Learner feedback records |
| `EMPLOYER_COMMENTS_DATA` | Employer feedback records |
| `EXIT_REVIEW_DATA` | Exit review summaries |
| `SCALE_200` | Generated 200-learner dataset (seed 99) |
| `SCALE_1000` | Generated 1000-learner dataset (seed 42) |
| `AD` | Active data accessor — returns SCALE_200 or SCALE_1000 |
| `DATA_ORIGINS` | Per-page data map; keyed by page ID; each field has `label`, `platform`, `phases`, `source`, `calculation`, `illustrates`, `rationale`, `build` |
| `REPORT_CONFIGS` | All report definitions (getData, columns) |
| `REPORT_PRESETS` | Quick report preset definitions |
| `USERS` | 9 account definitions (role, initials, coach name for LSCs) |
| `NAV_ACCESS` | Role → allowed pages map |
| `COACHES_1000` | All 20 coach names |
| `COACH_CAPACITIES_1000` | Per-coach learner count at 1000 scale |

---

## Key Functions (`app.js`)

| Function | Purpose |
|---|---|
| `renderAll()` | Triggers all KPI and table renders; calls `applyPhaseSettings()` at end |
| `applyRolePermissions()` | Shows/hides nav, cards, filter bars based on `currentUser.role` |
| `applyPhaseSettings()` | Applies Phase 1 restrictions on top of role permissions; called after `renderAll()` and on phase toggle |
| `_buildCurriculumLookup()` | Builds name→curriculum record map for Phase 1 KSB+Curriculum joined table |
| `switchUser(userId)` | Changes active account, re-applies permissions, re-renders |
| `syncCoachDropdowns()` | Updates all LSC dropdowns to 5 or 20 coaches based on `currentSize` |
| `renderGatewayForecast()` | Q2/Q3/Q4 tables and KPIs |
| `renderGateway()` | Monthly pipeline — LSC-filtered for LSC users |
| `renderWelfare()` | ALS + combined safeguarding/welfare tables |
| `renderLearnerVoice()` | Comments + exit review tables |
| `renderKSB()` | KSB tracker table and KPI cards |
| `renderCurriculum()` | Curriculum progress table |
| `renderDeliveryTables()` | All Compliance tables + OOF/BIL + KPI updates |
| `selectStandardReport(type)` | Shows report filters, stores `_currentSrType` |
| `runReport(area, extras)` | Runs selected report, renders first page |
| `renderReportPage()` | Renders tbody + pagination for current page |
| `goReportPage(page)` | Changes page and re-renders |
| `exportTableCSV(table, name)` | Generic CSV export for any panel table |
| `exportReportCSV()` | Exports full report dataset (all pages) |
| `_buildMeetingLookup()` | Last meeting for all masters (TOUCHPOINT_DATA + synthetic) |
| `_buildOtjLookup()` | OTJ data for all masters (OTJ_DATA + synthetic) |
| `updateThemeBtn(isDark)` | Swaps button icon (moon↔sun) and `title`/`aria-label` to match current theme |
| `renderDataOriginPanel()` | Renders the per-page Data Origins sidebar drawer; filters fields by `currentPhase` |
| `openDataOriginPanel()` / `closeDataOriginPanel()` | Open/close drawer, toggle body scroll lock |
| `renderDataMap()` | Flattens DATA_ORIGINS, applies status + phase filters, renders card layout in Platform Map modal |
| `openDataMap()` | Syncs `_dmPhaseFilter` to `String(currentPhase)`, updates active button, opens modal |
| `closeDataMap()` | Closes Platform Map modal |
| `exportDataMapCSV()` | Exports full unfiltered DATA_ORIGINS as 10-column CSV |

---

## CSS Conventions (`style.css`)

| Class | Purpose |
|---|---|
| `.page` / `.page.active` | Show/hide top-level pages |
| `.sub-nav` / `.sub-nav-btn.active` | Learners and Gateway sub-tab navigation |
| `.sub-page` / `.sub-page.active` | Show/hide sub-tab content |
| `.panel-stack` | 2-column grid layout for panels |
| `.panel--span` | Full-width panel (`grid-column: 1 / -1`) |
| `.kpi-bar` | Responsive KPI card grid |
| `.filter-grid-3` | 3-column filter grid (KSB, Curriculum filter bars) |
| `.sr-grid` | 4-column Standard Reports card grid |
| `.sr-card` / `.sr-card.active` | Report type selector card |
| `.rpag-wrap` / `.rpag-btn` | Report pagination controls |
| `.ov-grid` / `.ov-card` | Overview summary card grid (flex, ordered by role) |
| `.user-btn` / `.user-dropdown` | Account switcher in header |
| `.dd-table` | Full-width table, natural column widths |
| `.rag-badge--super-red/red/amber/green` | KSB RAG badges |
| `.ksb-status-oof` / `.ksb-status-bil` | KSB status pills |
| `.curr-status-pill` / `.curr-pill-*` | Curriculum status pills |
| `.welfare-type-sg` / `.welfare-type-check` | Safeguarding/welfare type badges |
| `.area-badge` | Cross-provision area labels (compliance/delivery/welfare/curriculum) |
| `.sort-th` / `.sort-active` | Sortable column header styling |
| `.sp-pill` + 6 variants | Sales pipeline status pills |
| `.weeks-pill` | Urgent/warning/ok time-based indicators |
| `.check-yes` / `.check-no` | Tick/dash indicators |
| `.ksb-kpi-section` / `.ksb-kpi-label` | KSB KPI group labels |
| `.ksb-notice` | Amber info notice box (KSB, Reporting) |
| `.phase-toggle` / `.phase-btn` / `.phase-btn.active` | Phase 1/2/3 toggle in header |
| `.phase-toggle-sep` | Vertical separator between phase toggle and size toggle |
| `.theme-btn` | Circular sun/moon icon button for dark mode toggle |
| `[data-theme="dark"]` | Applied to `<html>` element; overrides CSS variables + targeted hardcoded colours |
| `#data-origin-tab` / `#data-origin-panel` | Left-edge tab and slide-in drawer for Data Origins |
| `.dop-section` / `.dop-field` / `.dop-field-header` | Data Origins panel section and field layout |
| `.dop-platform-badge` + `.dop-platform-yes/no/partial/pending` | Colour-coded platform status badges (shared by sidebar and Platform Map) |
| `.dop-field-notes` | Source note beneath each field in the sidebar |
| `.dop-field-build` | Amber left-bordered "Build required:" callout for No/Partial fields in sidebar |
| `.dop-phase-badge` | Blue "Phase 3" pill on Phase 3-only sections |
| `.dop-unavailable` | Message shown in sidebar when current page isn't in the active phase |
| `.datamap-btn` | "Platform Map" header button |
| `.datamap-overlay` / `.datamap-modal` | Full-screen Platform Map modal overlay and panel |
| `.datamap-stats` / `.dm-stat-*` | Stats bar in Platform Map modal |
| `.datamap-filters` / `.dm-filter-btn` / `.dm-phase-btn` | Filter buttons in Platform Map modal |
| `.dm-page` / `.dm-section` / `.dm-field-cards` | Platform Map modal layout — page → section → cards |
| `.dm-field-card` / `.dm-field-card-header` / `.dm-field-props` | Individual field card in Platform Map |
| `.dm-prop` / `.dm-prop-label` / `.dm-prop-value` | Property row within a field card |
| `.dm-prop-build` | Amber-highlighted Build Required row within a field card |
| `.curr-progress-overall` | Secondary "X% overall (n/8)" line below the primary sprint progress bar |

---

## LSCs (Learning Skills Coaches) — 200-learner scale
- Sarah Mitchell (42 learners)
- James Okafor (40 learners)
- Priya Sharma (38 learners)
- Tom Bradley (45 learners)
- Hannah Clarke (35 learners)

## Apprenticeship Standards Delivered (7)
- Data Technician (Level 3)
- Data Analyst (Level 4)
- Applied AI & Automation (Level 4)
- Multi-Channel Marketer (Level 4)
- Assistant Accountant (Level 3)
- Professional Accounting Technician (Level 4)
- Digital Support Technician (Level 3)
