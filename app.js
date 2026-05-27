// =====================================================================
// Boom Training — Apprenticeship Dashboard  |  app.js
// =====================================================================

// ─── Standards ────────────────────────────────────────────────────────
const STANDARDS = [
  'Data Technician',
  'Data Analyst',
  'Applied AI & Automation',
  'Multi-Channel Marketer',
  'Assistant Accountant',
  'Professional Accounting Technician',
  'Digital Support Technician',
];

// ─── KPI datasets (200 vs 1,000 learners) ─────────────────────────────
const DATA = {
  200: {
    learners: 200, onTrack: 168, atRisk: 24, overdue: 8,
    employers: 34, achievement: '73%', actionsToday: 7,
    revenue: '£1.2M', starts: 12, gateway: 18, withdrawals: 11,
    outstanding: 18, overdueReviews: 9, noOtj: 12, awaitingFirst: 8,
    learnerENPS: 62, promoters: '68%', passives: '26%', detractors: '6%', employerENPS: 54,
  },
  1000: {
    learners: 1000, onTrack: 820, atRisk: 130, overdue: 50,
    employers: 95, achievement: '71%', actionsToday: 34,
    revenue: '£6.1M', starts: 58, gateway: 91, withdrawals: 63,
    outstanding: 87, overdueReviews: 43, noOtj: 58, awaitingFirst: 31,
    learnerENPS: 58, promoters: '65%', passives: '27%', detractors: '8%', employerENPS: 51,
  },
};

// ─── Coach KPIs (for LSC page) ────────────────────────────────────────
const COACH_DATA = {
  'Sarah Mitchell': { learners: 38, reviewsDue: 2, atRisk: 3, otjCompliance: '85%' },
  'James Okafor':   { learners: 42, reviewsDue: 3, atRisk: 4, otjCompliance: '81%' },
  'Priya Sharma':   { learners: 40, reviewsDue: 4, atRisk: 5, otjCompliance: '79%' },
  'Tom Bradley':    { learners: 45, reviewsDue: 5, atRisk: 6, otjCompliance: '77%' },
  'Hannah Clarke':  { learners: 35, reviewsDue: 3, atRisk: 6, otjCompliance: '83%' },
};

// ─── AAF Metrics ───────────────────────────────────────────────────────
const AAF_METRICS = {
  200: [
    { name: 'Overall Achievement Rate',  value: '73%', benchmark: 'National avg: 65%', rag: 'green' },
    { name: 'Timely Achievement Rate',   value: '61%', benchmark: 'National avg: 58%', rag: 'green' },
    { name: 'Retention Rate',            value: '84%', benchmark: 'Threshold: 80%',    rag: 'green' },
    { name: 'Pass Rate',                 value: '91%', benchmark: 'Threshold: 85%',    rag: 'green' },
    { name: 'Timely Completion Rate',    value: '58%', benchmark: 'National avg: 60%', rag: 'amber' },
    { name: 'Ofsted Readiness Score',    value: '69%', benchmark: 'Good: 70%+',        rag: 'amber' },
  ],
  1000: [
    { name: 'Overall Achievement Rate',  value: '71%', benchmark: 'National avg: 65%', rag: 'green' },
    { name: 'Timely Achievement Rate',   value: '57%', benchmark: 'National avg: 58%', rag: 'amber' },
    { name: 'Retention Rate',            value: '80%', benchmark: 'Threshold: 80%',    rag: 'amber' },
    { name: 'Pass Rate',                 value: '89%', benchmark: 'Threshold: 85%',    rag: 'green' },
    { name: 'Timely Completion Rate',    value: '54%', benchmark: 'National avg: 60%', rag: 'red'   },
    { name: 'Ofsted Readiness Score',    value: '65%', benchmark: 'Good: 70%+',        rag: 'red'   },
  ],
};

// ─── Delivery Table Data ───────────────────────────────────────────────

// Table 1: Outstanding Monthly Touchpoints — sorted by lastMeeting asc
const TOUCHPOINT_DATA = [
  { name: 'Quinn Andrews',   employer: 'TechCore UK',            lsc: 'James Okafor',   lastMeeting: '2026-04-01', meetingType: 'Interim Review'  },
  { name: 'Harry Singh',     employer: 'Pinnacle Finance Group', lsc: 'Tom Bradley',    lastMeeting: '2026-04-03', meetingType: 'Progress Review' },
  { name: 'Noah Williams',   employer: 'Horizon Analytics',      lsc: 'Hannah Clarke',  lastMeeting: '2026-04-08', meetingType: 'Progress Review' },
  { name: 'Grace Adeniran',  employer: 'DataSphere Analytics',   lsc: 'James Okafor',   lastMeeting: '2026-04-10', meetingType: 'Interim Review'  },
  { name: 'Patrick Doherty', employer: 'Apex Digital Ltd',       lsc: 'Sarah Mitchell', lastMeeting: '2026-04-11', meetingType: 'Progress Review' },
  { name: 'Leo Okafor',      employer: 'Clarity Finance Ltd',    lsc: 'James Okafor',   lastMeeting: '2026-04-14', meetingType: 'Progress Review' },
  { name: 'Destiny Osei',    employer: 'Bright Digital Agency',  lsc: 'Hannah Clarke',  lastMeeting: '2026-04-15', meetingType: 'Progress Review' },
  { name: 'Jack Morrison',   employer: 'Bloom Marketing Co.',    lsc: 'Priya Sharma',   lastMeeting: '2026-04-17', meetingType: 'Progress Review' },
  { name: 'Ben Cartwright',  employer: 'TechCore UK',            lsc: 'James Okafor',   lastMeeting: '2026-04-18', meetingType: 'Progress Review' },
  { name: 'Maya Thompson',   employer: 'Urban Digital Ltd',      lsc: 'Tom Bradley',    lastMeeting: '2026-04-20', meetingType: 'Interim Review'  },
  { name: 'Aisha Nwosu',     employer: 'Apex Digital Ltd',       lsc: 'Sarah Mitchell', lastMeeting: '2026-04-22', meetingType: 'Interim Review'  },
  { name: 'Ellie Forsyth',   employer: 'Nova Solutions',         lsc: 'Priya Sharma',   lastMeeting: '2026-04-22', meetingType: 'Interim Review'  },
  { name: 'Imani Adeyemi',   employer: 'Greenfield Consulting',  lsc: 'Hannah Clarke',  lastMeeting: '2026-04-25', meetingType: 'Interim Review'  },
  { name: 'Olivia Chen',     employer: 'Peak Performance Ltd',   lsc: 'Priya Sharma',   lastMeeting: '2026-04-26', meetingType: 'Interim Review'  },
  { name: 'Rachel Kim',      employer: 'Sterling Accounts',      lsc: 'Tom Bradley',    lastMeeting: '2026-04-27', meetingType: 'Progress Review' },
  { name: 'Felix Huang',     employer: 'Meridian Consulting',    lsc: 'Sarah Mitchell', lastMeeting: '2026-04-28', meetingType: 'Progress Review' },
  { name: 'Kira Patel',      employer: 'Future Tech Services',   lsc: 'Sarah Mitchell', lastMeeting: '2026-04-29', meetingType: 'Interim Review'  },
  { name: 'Callum Fraser',   employer: 'Sterling Accounts',      lsc: 'Tom Bradley',    lastMeeting: '2026-04-30', meetingType: 'Interim Review'  },
];

// Table 2: Beyond 10-week SLA — sorted by weeksSince desc
const SLA_DATA = [
  { name: 'Destiny Osei',   employer: 'Bright Digital Agency',  lsc: 'Hannah Clarke',  lastReview: '2026-01-26', weeksSince: 17 },
  { name: 'Harry Singh',    employer: 'Pinnacle Finance Group', lsc: 'Tom Bradley',    lastReview: '2026-02-02', weeksSince: 16 },
  { name: 'Grace Adeniran', employer: 'DataSphere Analytics',   lsc: 'James Okafor',   lastReview: '2026-02-05', weeksSince: 16 },
  { name: 'Quinn Andrews',  employer: 'TechCore UK',            lsc: 'James Okafor',   lastReview: '2026-02-13', weeksSince: 15 },
  { name: 'Imani Adeyemi',  employer: 'Greenfield Consulting',  lsc: 'Hannah Clarke',  lastReview: '2026-02-20', weeksSince: 14 },
  { name: 'Noah Williams',  employer: 'Horizon Analytics',      lsc: 'Hannah Clarke',  lastReview: '2026-02-27', weeksSince: 13 },
  { name: 'Felix Huang',    employer: 'Meridian Consulting',    lsc: 'Sarah Mitchell', lastReview: '2026-03-06', weeksSince: 12 },
  { name: 'Callum Fraser',  employer: 'Sterling Accounts',      lsc: 'Tom Bradley',    lastReview: '2026-03-13', weeksSince: 11 },
  { name: 'Leo Okafor',     employer: 'Clarity Finance Ltd',    lsc: 'James Okafor',   lastReview: '2026-03-20', weeksSince: 10 },
];

// Table 3: No OTJ Evidence This Month — sorted by lastEntry asc
const OTJ_DATA = [
  { name: 'Patrick Doherty',  employer: 'Apex Digital Ltd',      lsc: 'Sarah Mitchell', otjPct: 28, otjExpected: 45, lastEntry: '2026-03-18' },
  { name: 'Noah Williams',    employer: 'Horizon Analytics',     lsc: 'Hannah Clarke',  otjPct: 32, otjExpected: 48, lastEntry: '2026-04-01' },
  { name: 'Sam Okwu',         employer: 'TechCore UK',           lsc: 'James Okafor',   otjPct: 41, otjExpected: 55, lastEntry: '2026-04-08' },
  { name: 'Uma Sharma',       employer: 'Bloom Marketing Co.',   lsc: 'Priya Sharma',   otjPct: 51, otjExpected: 62, lastEntry: '2026-04-15' },
  { name: 'Victor Marsh',     employer: 'Greenfield Consulting', lsc: 'Tom Bradley',    otjPct: 38, otjExpected: 50, lastEntry: '2026-04-22' },
  { name: 'Willow James',     employer: 'Sterling Accounts',     lsc: 'Hannah Clarke',  otjPct: 60, otjExpected: 70, lastEntry: '2026-04-27' },
  { name: 'Xander Brooks',    employer: 'Nova Solutions',        lsc: 'Sarah Mitchell', otjPct: 44, otjExpected: 52, lastEntry: '2026-04-30' },
  { name: 'Yasmin Al-Hassan', employer: 'Meridian Consulting',   lsc: 'James Okafor',   otjPct: 55, otjExpected: 61, lastEntry: '2026-05-07' },
  { name: 'Jack Morrison',    employer: 'Bloom Marketing Co.',   lsc: 'Priya Sharma',   otjPct: 33, otjExpected: 42, lastEntry: '2026-05-12' },
  { name: 'Tara Collins',     employer: 'Clarity Finance Ltd',   lsc: 'Tom Bradley',    otjPct: 48, otjExpected: 55, lastEntry: '2026-05-19' },
  { name: 'Rachel Kim',       employer: 'Sterling Accounts',     lsc: 'Hannah Clarke',  otjPct: 22, otjExpected: 35, lastEntry: '2026-05-21' },
  { name: 'Kira Patel',       employer: 'Future Tech Services',  lsc: 'Sarah Mitchell', otjPct: 67, otjExpected: 71, lastEntry: '2026-05-23' },
];

// Table 4: Awaiting First LSC Meeting — sorted by plannedStart asc
const STARTER_DATA = [
  { name: 'Amara Osei',     employer: 'Bright Digital Agency',  lsc: 'Sarah Mitchell', plannedStart: '2026-05-05', firstDayDone: true,  checklistDone: true  },
  { name: 'Ethan Brooks',   employer: 'Pinnacle Finance Group', lsc: 'James Okafor',   plannedStart: '2026-05-12', firstDayDone: true,  checklistDone: true  },
  { name: 'Fatima Malik',   employer: 'DataSphere Analytics',   lsc: 'Priya Sharma',   plannedStart: '2026-05-12', firstDayDone: false, checklistDone: false },
  { name: 'George Baker',   employer: 'Urban Digital Ltd',      lsc: 'Tom Bradley',    plannedStart: '2026-05-19', firstDayDone: true,  checklistDone: false },
  { name: 'Holly Nguyen',   employer: 'Apex Digital Ltd',       lsc: 'Hannah Clarke',  plannedStart: '2026-05-19', firstDayDone: false, checklistDone: false },
  { name: 'Isaac Rivera',   employer: 'Clarity Finance Ltd',    lsc: 'Sarah Mitchell', plannedStart: '2026-05-26', firstDayDone: false, checklistDone: false },
  { name: 'Jade Thompson',  employer: 'Nova Solutions',         lsc: 'James Okafor',   plannedStart: '2026-05-26', firstDayDone: false, checklistDone: false },
  { name: 'Kyle Patterson', employer: 'Greenfield Consulting',  lsc: 'Priya Sharma',   plannedStart: '2026-05-26', firstDayDone: false, checklistDone: false },
];

// ─── Sales Pipeline Data ───────────────────────────────────────────────
const PIPELINE_ENTRIES = [
  { name: 'Isla Thomson',     employer: 'DataSphere Analytics',   standard: 'Data Technician',                    prob: 95, start: '2026-07-01', status: 'Offer Accepted'  },
  { name: 'Jordan Ellis',     employer: 'Apex Digital Ltd',       standard: 'Data Analyst',                       prob: 90, start: '2026-07-01', status: 'Offer Accepted'  },
  { name: 'Chloe Davies',     employer: 'Sterling Accounts',      standard: 'Assistant Accountant',               prob: 85, start: '2026-07-01', status: 'Offer Accepted'  },
  { name: 'Luca Ferretti',    employer: 'NovaTech Solutions',     standard: 'Data Analyst',                       prob: 80, start: '2026-07-14', status: 'Contract Sent'   },
  { name: 'Maya Patel',       employer: 'Greenfield Consulting',  standard: 'Applied AI & Automation',            prob: 75, start: '2026-07-01', status: 'Contract Sent'   },
  { name: 'Freddie Marsh',    employer: 'Pinnacle Finance Group', standard: 'Professional Accounting Technician', prob: 70, start: '2026-07-14', status: 'Contract Sent'   },
  { name: 'Ollie Richardson', employer: 'Bloom Marketing Co.',    standard: 'Multi-Channel Marketer',             prob: 60, start: '2026-07-14', status: 'In Discussion'   },
  { name: 'Sophie Grant',     employer: 'Meridian Consulting',    standard: 'Applied AI & Automation',            prob: 55, start: '2026-08-01', status: 'In Discussion'   },
  { name: 'Reuben Adeyemi',   employer: 'TechCore UK',            standard: 'Digital Support Technician',         prob: 40, start: '2026-08-01', status: 'Initial Meeting' },
  { name: 'Amara Osei',       employer: 'Bright Digital Agency',  standard: 'Multi-Channel Marketer',             prob: 30, start: '2026-08-01', status: 'Cold Lead'       },
];

const PIPELINE_MONTH_TARGET = 8;

// ─── State ─────────────────────────────────────────────────────────────
let currentSize       = 200;
let pipelineOffset    = 0;
let deliveryLSCFilter = 'All';
let lscPageCoach      = 'James Okafor';

// ─── Utility ───────────────────────────────────────────────────────────
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function daysSince(dateStr) {
  const then = new Date(dateStr);
  const now  = new Date('2026-05-27');
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function emptyRow(colspan, message) {
  return `<tr><td colspan="${colspan}" class="empty-row">${message}</td></tr>`;
}

// ─── Date badge ────────────────────────────────────────────────────────
(function setDate() {
  const el = document.getElementById('today-date');
  if (el) el.textContent = new Date().toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
  });
})();

// ─── Navigation ────────────────────────────────────────────────────────
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.dataset.page;
    if (!target) return;
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    link.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

// ─── Size toggle ───────────────────────────────────────────────────────
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const size = parseInt(btn.dataset.size);
    if (size === currentSize) return;
    currentSize = size;
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderAll();
  });
});

// ─── Delivery LSC filter ───────────────────────────────────────────────
document.getElementById('delivery-lsc')?.addEventListener('change', function () {
  deliveryLSCFilter = this.value;
  renderDeliveryTables();
});

// ─── LSC page coach selector ───────────────────────────────────────────
document.getElementById('lsc-coach')?.addEventListener('change', function () {
  lscPageCoach = this.value;
  renderLSCKPIs();
  renderLSCTables();
});

// ─── Master render ─────────────────────────────────────────────────────
function renderAll() {
  renderOverviewKPIs();
  renderSMTKPIs();
  renderDeliveryKPIs();
  renderLSCKPIs();
  renderAAF();
  renderENPS();
  renderDeliveryTables();
  renderLSCTables();
}

// ─── Overview KPIs ─────────────────────────────────────────────────────
function renderOverviewKPIs() {
  const d = DATA[currentSize];
  setText('kpi-learners',    d.learners);
  setText('kpi-on-track',    d.onTrack);
  setText('kpi-at-risk',     d.atRisk);
  setText('kpi-overdue',     d.overdue);
  setText('kpi-employers',   d.employers);
  setText('kpi-achievement', d.achievement);
  setText('actions-count',   d.actionsToday + ' actions');
  setText('risk-count',      d.atRisk + ' learners');
}

// ─── SMT KPIs ──────────────────────────────────────────────────────────
function renderSMTKPIs() {
  const d = DATA[currentSize];
  setText('smt-revenue',     d.revenue);
  setText('smt-starts',      d.starts);
  setText('smt-gateway',     d.gateway);
  setText('smt-withdrawals', d.withdrawals);
}

// ─── Delivery KPIs ─────────────────────────────────────────────────────
function renderDeliveryKPIs() {
  const d = DATA[currentSize];
  setText('kpi-outstanding',     d.outstanding);
  setText('kpi-overdue-reviews', d.overdueReviews);
  setText('kpi-no-otj',          d.noOtj);
  setText('kpi-awaiting-first',  d.awaitingFirst);
}

// ─── LSC KPIs ──────────────────────────────────────────────────────────
function renderLSCKPIs() {
  const c = COACH_DATA[lscPageCoach] || COACH_DATA['James Okafor'];
  setText('lsc-learners',    c.learners);
  setText('lsc-reviews-due', c.reviewsDue);
  setText('lsc-at-risk',     c.atRisk);
  setText('lsc-otj',         c.otjCompliance);
}

// ─── eNPS ──────────────────────────────────────────────────────────────
function renderENPS() {
  const d = DATA[currentSize];
  setText('enps-score',          d.learnerENPS);
  setText('enps-promoters',      d.promoters);
  setText('enps-passives',       d.passives);
  setText('enps-detractors',     d.detractors);
  setText('employer-enps-score', d.employerENPS);
}

// ─── DfE AAF ───────────────────────────────────────────────────────────
function renderAAF() {
  const grid = document.getElementById('aaf-grid');
  if (!grid) return;
  grid.innerHTML = AAF_METRICS[currentSize].map(m => `
    <div class="aaf-card">
      <div class="aaf-card-top rag-${m.rag}">
        <div class="aaf-metric-name">${m.name}</div>
        <div class="aaf-metric-value">${m.value}</div>
      </div>
      <div class="aaf-card-bottom">
        <span class="aaf-benchmark">${m.benchmark}</span>
        <span class="aaf-rag-pill rag-${m.rag}-pill">${m.rag.toUpperCase()}</span>
      </div>
    </div>
  `).join('');
}

// ─── Shared table renderers (tbodyId, optional lscFilter) ─────────────

function renderTouchpoints(tbodyId, lscFilter) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  const rows = lscFilter
    ? TOUCHPOINT_DATA.filter(r => r.lsc === lscFilter)
    : TOUCHPOINT_DATA;
  if (!rows.length) {
    tbody.innerHTML = emptyRow(5, 'No outstanding touchpoints for this coach.');
    return;
  }
  tbody.innerHTML = rows.map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${r.employer}</td>
      <td>${r.lsc}</td>
      <td>${fmtDate(r.lastMeeting)}</td>
      <td><span class="status-pill">${r.meetingType}</span></td>
    </tr>
  `).join('');
}

function renderSLATable(tbodyId, lscFilter) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  const rows = lscFilter
    ? SLA_DATA.filter(r => r.lsc === lscFilter)
    : SLA_DATA;
  if (!rows.length) {
    tbody.innerHTML = emptyRow(5, 'No overdue reviews for this coach.');
    return;
  }
  tbody.innerHTML = rows.map(r => {
    const isUrgent  = r.weeksSince > 12;
    const pillClass = isUrgent ? 'urgent' : 'warning';
    const rowClass  = isUrgent ? 'row-alert' : '';
    const weeksOver = r.weeksSince - 10;
    return `
      <tr class="${rowClass}">
        <td>${r.name}</td>
        <td>${r.employer}</td>
        <td>${r.lsc}</td>
        <td class="${isUrgent ? 'cell-alert' : ''}">${addDays(r.lastReview, 70)}</td>
        <td>
          <span class="weeks-pill ${pillClass}">${r.weeksSince} wks</span>
          ${weeksOver > 0 ? `<span style="font-size:0.72rem;color:var(--text-muted);margin-left:0.35rem;">(${weeksOver} wk${weeksOver > 1 ? 's' : ''} over)</span>` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

function renderOTJTable(tbodyId, lscFilter) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  const rows = lscFilter
    ? OTJ_DATA.filter(r => r.lsc === lscFilter)
    : OTJ_DATA;
  if (!rows.length) {
    tbody.innerHTML = emptyRow(6, 'No missing OTJ entries for this coach.');
    return;
  }
  tbody.innerHTML = rows.map(r => {
    const days    = daysSince(r.lastEntry);
    const isAlert = days > 28;
    return `
      <tr class="${isAlert ? 'row-alert' : ''}">
        <td>${r.name}</td>
        <td>${r.employer}</td>
        <td>${r.lsc}</td>
        <td>${r.otjPct}%</td>
        <td>${r.otjExpected}%</td>
        <td class="${isAlert ? 'cell-alert' : ''}">${fmtDate(r.lastEntry)}&ensp;<span style="font-size:0.72rem;opacity:0.75;">(${days}d ago)</span></td>
      </tr>
    `;
  }).join('');
}

function renderStarterTable(tbodyId, lscFilter) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;

  // Apply fit class to the parent table
  if (tbody.closest('table')) tbody.closest('table').classList.add('table--fit');

  const rows = lscFilter
    ? STARTER_DATA.filter(r => r.lsc === lscFilter)
    : STARTER_DATA;
  if (!rows.length) {
    tbody.innerHTML = emptyRow(7, 'No new starters awaiting first meeting for this coach.');
    return;
  }
  tbody.innerHTML = rows.map(r => `
    <tr>
      <td title="${r.name}">${r.name}</td>
      <td title="${r.employer}">${r.employer}</td>
      <td title="${r.lsc}">${r.lsc}</td>
      <td>${fmtDate(r.plannedStart)}</td>
      <td>${addDays(r.plannedStart, 30)}</td>
      <td style="text-align:center;">
        ${r.firstDayDone
          ? '<span class="check-yes" title="Completed">✓</span>'
          : '<span class="check-no"  title="Not yet completed">–</span>'}
      </td>
      <td style="text-align:center;">
        ${r.checklistDone
          ? '<span class="check-yes" title="Completed">✓</span>'
          : '<span class="check-no"  title="Not yet completed">–</span>'}
      </td>
    </tr>
  `).join('');
}

// ─── Delivery tables (uses deliveryLSCFilter state) ────────────────────
function renderDeliveryTables() {
  const f = deliveryLSCFilter === 'All' ? null : deliveryLSCFilter;
  renderTouchpoints('touchpoint-tbody', f);
  renderSLATable('sla-tbody', f);
  renderOTJTable('otj-tbody', f);
  renderStarterTable('starter-tbody', f);
}

// ─── LSC page tables (uses lscPageCoach state) ─────────────────────────
function renderLSCTables() {
  renderTouchpoints('lsc-touchpoint-tbody', lscPageCoach);
  renderSLATable('lsc-sla-tbody', lscPageCoach);
  renderOTJTable('lsc-otj-tbody', lscPageCoach);
  renderStarterTable('lsc-starter-tbody', lscPageCoach);
}

// ─── Sales Pipeline ────────────────────────────────────────────────────
function renderPipeline() {
  const base = new Date(2026, 5, 1);
  base.setMonth(base.getMonth() + pipelineOffset);
  const label = base.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  setText('pipeline-month', label);

  const confirmed = PIPELINE_ENTRIES.filter(e => e.prob >= 75).length;
  const pct       = Math.min(100, Math.round((confirmed / PIPELINE_MONTH_TARGET) * 100));
  setText('pipeline-confirmed', `${confirmed} confirmed starts`);
  setText('pipeline-target',    `${PIPELINE_MONTH_TARGET} starts`);
  setText('pipeline-pct',       `${pct}%`);
  const bar = document.getElementById('pipeline-bar');
  if (bar) bar.style.width = pct + '%';

  renderSalesTable(PIPELINE_ENTRIES);
}

function renderSalesTable(entries) {
  const tbody = document.getElementById('sales-tbody');
  if (!tbody) return;
  if (!entries.length) {
    tbody.innerHTML = emptyRow(6, 'No entries match the selected filters.');
    return;
  }
  tbody.innerHTML = entries.map(e => {
    const pClass = e.prob >= 75 ? 'prob-high' : e.prob >= 40 ? 'prob-medium' : 'prob-low';
    const pLabel = e.prob >= 75 ? 'High'      : e.prob >= 40 ? 'Medium'      : 'Low';
    return `
      <tr>
        <td>${e.name}</td>
        <td>${e.employer}</td>
        <td>${e.standard}</td>
        <td><span class="prob-pill ${pClass}">${pLabel} (${e.prob}%)</span></td>
        <td>${fmtDate(e.start)}</td>
        <td><span class="status-pill">${e.status}</span></td>
      </tr>
    `;
  }).join('');
}

document.getElementById('filter-standard')?.addEventListener('change',   applyPipelineFilters);
document.getElementById('filter-probability')?.addEventListener('change', applyPipelineFilters);

function applyPipelineFilters() {
  const std  = document.getElementById('filter-standard')?.value   || '';
  const prob = document.getElementById('filter-probability')?.value || '';
  const filtered = PIPELINE_ENTRIES.filter(e => {
    const stdOk  = !std || e.standard === std;
    let   probOk = true;
    if (prob === 'High (≥75%)')     probOk = e.prob >= 75;
    if (prob === 'Medium (40–74%)') probOk = e.prob >= 40 && e.prob < 75;
    if (prob.startsWith('Low'))     probOk = e.prob < 40;
    return stdOk && probOk;
  });
  renderSalesTable(filtered);
}

document.getElementById('month-prev')?.addEventListener('click', () => { pipelineOffset--; renderPipeline(); });
document.getElementById('month-next')?.addEventListener('click', () => { pipelineOffset++; renderPipeline(); });

// ─── Init ──────────────────────────────────────────────────────────────
renderAll();
renderPipeline();

console.log('Boom Training Dashboard loaded ✅');
