// =====================================================================
// Boom Training — Apprenticeship Dashboard  |  app.js
// =====================================================================
// All data is dummy/placeholder until real data modules are connected.
// Data is stored in and read from localStorage.
// =====================================================================

// ─── Constants ────────────────────────────────────────────────────────
const STANDARDS = [
  'Data Technician',
  'Data Analyst',
  'Applied AI & Automation',
  'Multi-Channel Marketer',
  'Assistant Accountant',
  'Professional Accounting Technician',
  'Digital Support Technician',
];

// ─── Provision data sets (200 vs 1,000 learners) ─────────────────────
const DATA = {
  200: {
    learners:    200,
    onTrack:     168,
    atRisk:      24,
    overdue:     8,
    employers:   34,
    achievement: '73%',
    // SMT
    revenue:     '£1.2M',
    starts:      12,
    gateway:     18,
    withdrawals: 11,
    // Delivery
    reviewsCompleted: '94%',
    otjCompliance:    '81%',
    fsOnTrack:        '76%',
    epaReady:         14,
    // LSC (per-coach averages)
    lscLearners:   40,
    lscReviewsDue: 6,
    lscAtRisk:     5,
    lscOtj:        '83%',
    // Actions
    actionsToday:  7,
    // eNPS
    learnerENPS:   62,
    promoters:     '68%',
    passives:      '26%',
    detractors:    '6%',
    employerENPS:  54,
  },
  1000: {
    learners:    1000,
    onTrack:     820,
    atRisk:      130,
    overdue:     50,
    employers:   95,
    achievement: '71%',
    // SMT
    revenue:     '£6.1M',
    starts:      58,
    gateway:     91,
    withdrawals: 63,
    // Delivery
    reviewsCompleted: '91%',
    otjCompliance:    '79%',
    fsOnTrack:        '74%',
    epaReady:         72,
    // LSC (per-coach averages)
    lscLearners:   50,
    lscReviewsDue: 9,
    lscAtRisk:     7,
    lscOtj:        '80%',
    // Actions
    actionsToday: 34,
    // eNPS
    learnerENPS:   58,
    promoters:     '65%',
    passives:      '27%',
    detractors:    '8%',
    employerENPS:  51,
  },
};

// ─── AAF metrics (same thresholds, values scale by size) ─────────────
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

// ─── Sales pipeline dummy data ────────────────────────────────────────
const PIPELINE_ENTRIES = [
  { name: 'Jordan Ellis',    employer: 'Apex Digital Ltd',       standard: 'Data Analyst',                      prob: 90, start: '2026-07-01', status: 'Offer Accepted' },
  { name: 'Maya Patel',      employer: 'Greenfield Consulting',  standard: 'Applied AI & Automation',           prob: 75, start: '2026-07-01', status: 'Contract Sent'  },
  { name: 'Ollie Richardson',employer: 'Bloom Marketing Co.',    standard: 'Multi-Channel Marketer',            prob: 60, start: '2026-07-14', status: 'In Discussion'  },
  { name: 'Chloe Davies',    employer: 'Sterling Accounts',      standard: 'Assistant Accountant',              prob: 85, start: '2026-07-01', status: 'Offer Accepted' },
  { name: 'Reuben Adeyemi',  employer: 'TechCore UK',            standard: 'Digital Support Technician',        prob: 40, start: '2026-08-01', status: 'Initial Meeting' },
  { name: 'Isla Thomson',    employer: 'DataSphere Analytics',   standard: 'Data Technician',                   prob: 95, start: '2026-07-01', status: 'Offer Accepted' },
  { name: 'Freddie Marsh',   employer: 'Pinnacle Finance Group', standard: 'Professional Accounting Technician',prob: 70, start: '2026-07-14', status: 'Contract Sent'  },
  { name: 'Amara Osei',      employer: 'Bright Digital Agency',  standard: 'Multi-Channel Marketer',            prob: 30, start: '2026-08-01', status: 'Cold Lead'      },
  { name: 'Luca Ferretti',   employer: 'NovaTech Solutions',     standard: 'Data Analyst',                      prob: 80, start: '2026-07-14', status: 'Contract Sent'  },
  { name: 'Sophie Grant',    employer: 'Meridian Consulting',    standard: 'Applied AI & Automation',           prob: 55, start: '2026-08-01', status: 'In Discussion'  },
];

const PIPELINE_MONTH_TARGET = 8; // starts target per month

// ─── State ────────────────────────────────────────────────────────────
let currentSize = 200;
let pipelineMonthOffset = 0; // 0 = current month

// ─── Date badge ──────────────────────────────────────────────────────
(function setDate() {
  const el = document.getElementById('today-date');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
  });
})();

// ─── Navigation ───────────────────────────────────────────────────────
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

// ─── Size toggle ──────────────────────────────────────────────────────
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

// ─── Render all KPIs and panels ───────────────────────────────────────
function renderAll() {
  renderOverviewKPIs();
  renderSMTKPIs();
  renderDeliveryKPIs();
  renderLSCKPIs();
  renderAAF();
  renderENPS();
}

// ─── Overview KPIs ────────────────────────────────────────────────────
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

// ─── SMT KPIs ─────────────────────────────────────────────────────────
function renderSMTKPIs() {
  const d = DATA[currentSize];
  setText('smt-revenue',     d.revenue);
  setText('smt-starts',      d.starts);
  setText('smt-gateway',     d.gateway);
  setText('smt-withdrawals', d.withdrawals);
}

// ─── Delivery KPIs ────────────────────────────────────────────────────
function renderDeliveryKPIs() {
  const d = DATA[currentSize];
  setText('del-reviews', d.reviewsCompleted);
  setText('del-otj',     d.otjCompliance);
  setText('del-fs',      d.fsOnTrack);
  setText('del-epa',     d.epaReady);
}

// ─── LSC KPIs ─────────────────────────────────────────────────────────
function renderLSCKPIs() {
  const d = DATA[currentSize];
  setText('lsc-learners',    d.lscLearners);
  setText('lsc-reviews-due', d.lscReviewsDue);
  setText('lsc-at-risk',     d.lscAtRisk);
  setText('lsc-otj',         d.lscOtj);
}

// ─── eNPS ─────────────────────────────────────────────────────────────
function renderENPS() {
  const d = DATA[currentSize];
  setText('enps-score',          d.learnerENPS);
  setText('enps-promoters',      d.promoters);
  setText('enps-passives',       d.passives);
  setText('enps-detractors',     d.detractors);
  setText('employer-enps-score', d.employerENPS);
}

// ─── DfE AAF cards ────────────────────────────────────────────────────
function renderAAF() {
  const grid = document.getElementById('aaf-grid');
  if (!grid) return;
  const metrics = AAF_METRICS[currentSize];
  grid.innerHTML = metrics.map(m => `
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

// ─── Sales Pipeline ───────────────────────────────────────────────────
function renderPipeline() {
  // Month label
  const base  = new Date(2026, 5, 1); // June 2026 as "current"
  base.setMonth(base.getMonth() + pipelineMonthOffset);
  const label = base.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  setText('pipeline-month', label);

  // Confirmed starts for the displayed month = High probability entries (≥75%)
  const confirmed = PIPELINE_ENTRIES.filter(e => e.prob >= 75).length;
  const pct = Math.min(100, Math.round((confirmed / PIPELINE_MONTH_TARGET) * 100));
  setText('pipeline-confirmed', `${confirmed} confirmed starts`);
  setText('pipeline-target',    `${PIPELINE_MONTH_TARGET} starts`);
  setText('pipeline-pct',       `${pct}%`);
  const bar = document.getElementById('pipeline-bar');
  if (bar) bar.style.width = pct + '%';

  // Table
  renderSalesTable(PIPELINE_ENTRIES);

  // Filters
  document.getElementById('filter-standard')?.addEventListener('change', applyPipelineFilters);
  document.getElementById('filter-probability')?.addEventListener('change', applyPipelineFilters);
}

function applyPipelineFilters() {
  const std  = document.getElementById('filter-standard')?.value || '';
  const prob = document.getElementById('filter-probability')?.value || '';

  const filtered = PIPELINE_ENTRIES.filter(e => {
    const stdMatch = !std || e.standard === std;
    let probMatch = true;
    if (prob === 'High (≥75%)')    probMatch = e.prob >= 75;
    if (prob === 'Medium (40–74%)') probMatch = e.prob >= 40 && e.prob < 75;
    if (prob.startsWith('Low'))     probMatch = e.prob < 40;
    return stdMatch && probMatch;
  });
  renderSalesTable(filtered);
}

function renderSalesTable(entries) {
  const tbody = document.getElementById('sales-tbody');
  if (!tbody) return;

  if (!entries.length) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:2rem;">No entries match the selected filters.</td></tr>';
    return;
  }

  tbody.innerHTML = entries.map(e => {
    const probClass = e.prob >= 75 ? 'prob-high' : e.prob >= 40 ? 'prob-medium' : 'prob-low';
    const probLabel = e.prob >= 75 ? 'High'       : e.prob >= 40 ? 'Medium'      : 'Low';
    const startDate = new Date(e.start).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return `
      <tr>
        <td>${e.name}</td>
        <td>${e.employer}</td>
        <td>${e.standard}</td>
        <td><span class="prob-pill ${probClass}">${probLabel} (${e.prob}%)</span></td>
        <td>${startDate}</td>
        <td><span class="status-pill">${e.status}</span></td>
      </tr>
    `;
  }).join('');
}

// Month nav buttons
document.getElementById('month-prev')?.addEventListener('click', () => {
  pipelineMonthOffset--;
  renderPipeline();
});
document.getElementById('month-next')?.addEventListener('click', () => {
  pipelineMonthOffset++;
  renderPipeline();
});

// ─── Utility ──────────────────────────────────────────────────────────
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

// ─── Initialise ───────────────────────────────────────────────────────
renderAll();
renderPipeline();

console.log('Boom Training Dashboard loaded ✅');
