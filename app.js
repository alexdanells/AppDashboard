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
    alsTotal: 10, alsActive: 8, safeguardingActive: 5, welfareChecksDue: 6,
  },
  1000: {
    learners: 1000, onTrack: 820, atRisk: 130, overdue: 50,
    employers: 95, achievement: '71%', actionsToday: 34,
    revenue: '£6.1M', starts: 58, gateway: 91, withdrawals: 63,
    outstanding: 87, overdueReviews: 43, noOtj: 58, awaitingFirst: 31,
    learnerENPS: 58, promoters: '65%', passives: '27%', detractors: '8%', employerENPS: 51,
    alsTotal: 49, alsActive: 41, safeguardingActive: 24, welfareChecksDue: 29,
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
  // ── May 2026 ──────────────────────────────────────────────────────────
  { name: 'Isla Thomson',   employer: 'DataSphere Analytics',   am: 'Rachel Thornton', standard: 'Data Technician',                    prob: 90, start: '2026-05-12', status: 'Contract Signed' },
  { name: 'Kyle Patterson', employer: 'Greenfield Consulting',  am: 'Rachel Thornton', standard: 'Multi-Channel Marketer',             prob: 90, start: '2026-05-12', status: 'Enrolment'       },
  { name: 'Jordan Ellis',   employer: 'Apex Digital Ltd',       am: 'Marcus Webb',     standard: 'Data Analyst',                       prob: 80, start: '2026-05-19', status: 'Contract Signed' },
  { name: 'Chloe Davies',   employer: 'Sterling Accounts',      am: 'Rachel Thornton', standard: 'Assistant Accountant',               prob: 70, start: '2026-05-12', status: 'Contract Issued' },
  { name: 'Fatima Malik',   employer: 'DataSphere Analytics',   am: 'Sophie Lawson',   standard: 'Data Analyst',                       prob: 60, start: '2026-05-26', status: 'Proposal Sent'   },
  { name: 'Luca Ferretti',  employer: 'NovaTech Solutions',     am: 'Marcus Webb',     standard: 'Data Analyst',                       prob: 60, start: '2026-05-26', status: 'Proposal Sent'   },
  { name: 'George Baker',   employer: 'Urban Digital Ltd',      am: 'Dan Kirby',       standard: 'Digital Support Technician',         prob: 50, start: '2026-05-19', status: 'In Scope'        },
  { name: 'Holly Nguyen',   employer: 'Apex Digital Ltd',       am: 'Marcus Webb',     standard: 'Data Technician',                    prob: 40, start: '2026-05-26', status: 'In Scope'        },
  { name: 'Isaac Rivera',   employer: 'Clarity Finance Ltd',    am: 'Sophie Lawson',   standard: 'Data Analyst',                       prob: 30, start: '2026-05-19', status: 'Cold Lead'       },
  { name: 'Jade Thompson',  employer: 'Nova Solutions',         am: 'Dan Kirby',       standard: 'Multi-Channel Marketer',             prob: 20, start: '2026-05-26', status: 'Cold Lead'       },
  // ── June 2026 ─────────────────────────────────────────────────────────
  { name: 'Tasha Morris',   employer: 'Apex Digital Ltd',       am: 'Marcus Webb',     standard: 'Digital Support Technician',         prob: 90, start: '2026-06-09', status: 'Enrolment'       },
  { name: 'Maya Patel',     employer: 'Greenfield Consulting',  am: 'Rachel Thornton', standard: 'Applied AI & Automation',            prob: 80, start: '2026-06-09', status: 'Contract Signed' },
  { name: 'Nathan Brooks',  employer: 'TechCore UK',            am: 'Dan Kirby',       standard: 'Data Technician',                    prob: 70, start: '2026-06-09', status: 'Contract Issued' },
  { name: 'Olivia Fraser',  employer: 'Meridian Consulting',    am: 'Sophie Lawson',   standard: 'Data Analyst',                       prob: 60, start: '2026-06-16', status: 'Proposal Sent'   },
  { name: 'Patrick Marsh',  employer: 'Pinnacle Finance Group', am: 'Marcus Webb',     standard: 'Professional Accounting Technician', prob: 50, start: '2026-06-16', status: 'In Scope'        },
  { name: 'Quinn Sullivan', employer: 'Bright Digital Agency',  am: 'Rachel Thornton', standard: 'Multi-Channel Marketer',             prob: 40, start: '2026-06-23', status: 'In Scope'        },
  { name: 'Riya Sharma',    employer: 'DataSphere Analytics',   am: 'Dan Kirby',       standard: 'Data Analyst',                       prob: 30, start: '2026-06-23', status: 'Cold Lead'       },
  { name: 'Sam Davies',     employer: 'Sterling Accounts',      am: 'Sophie Lawson',   standard: 'Assistant Accountant',               prob: 20, start: '2026-06-30', status: 'Cold Lead'       },
  // ── July 2026 ─────────────────────────────────────────────────────────
  { name: 'Umar Al-Rashid', employer: 'TechCore UK',            am: 'Rachel Thornton', standard: 'Data Analyst',                       prob: 70, start: '2026-07-07', status: 'Contract Issued' },
  { name: 'Vera Okafor',    employer: 'Nova Solutions',         am: 'Dan Kirby',       standard: 'Multi-Channel Marketer',             prob: 60, start: '2026-07-07', status: 'Proposal Sent'   },
  { name: 'Will Thornton',  employer: 'Clarity Finance Ltd',    am: 'Sophie Lawson',   standard: 'Data Technician',                    prob: 50, start: '2026-07-14', status: 'In Scope'        },
  { name: 'Xena Park',      employer: 'Urban Digital Ltd',      am: 'Marcus Webb',     standard: 'Applied AI & Automation',            prob: 40, start: '2026-07-14', status: 'In Scope'        },
  { name: 'Yusuf Hassan',   employer: 'Greenfield Consulting',  am: 'Rachel Thornton', standard: 'Data Analyst',                       prob: 30, start: '2026-07-21', status: 'Cold Lead'       },
  { name: 'Zara Mitchell',  employer: 'Bright Digital Agency',  am: 'Dan Kirby',       standard: 'Digital Support Technician',         prob: 20, start: '2026-07-21', status: 'Cold Lead'       },
  // ── August 2026 ───────────────────────────────────────────────────────
  { name: 'Aaron Clarke',   employer: 'DataSphere Analytics',   am: 'Sophie Lawson',   standard: 'Data Technician',                    prob: 60, start: '2026-08-04', status: 'Proposal Sent'   },
  { name: 'Bella Santos',   employer: 'Sterling Accounts',      am: 'Marcus Webb',     standard: 'Professional Accounting Technician', prob: 40, start: '2026-08-04', status: 'In Scope'        },
  { name: 'Connor Walsh',   employer: 'NovaTech Solutions',     am: 'Rachel Thornton', standard: 'Data Analyst',                       prob: 30, start: '2026-08-11', status: 'Cold Lead'       },
  { name: 'Diana Ford',     employer: 'Pinnacle Finance Group', am: 'Dan Kirby',       standard: 'Data Technician',                    prob: 20, start: '2026-08-11', status: 'Cold Lead'       },
];

const PIPELINE_TARGETS = {
  '2026-05': 8,
  '2026-06': 7,
  '2026-07': 6,
  '2026-08': 5,
};

// ─── Learner Welfare Data ─────────────────────────────────────────────

// ALS Register — sorted by nextReview ascending (most urgent at top)
const ALS_DATA = [
  { name: 'Callum Fraser',  standard: 'Assistant Accountant',               lsc: 'Tom Bradley',    need: 'Dyspraxia',               adjustments: 'Alternative format submissions, extended time in assessments', lastReview: '2026-01-10', nextReview: '2026-04-10' },
  { name: 'Maya Thompson',  standard: 'Digital Support Technician',         lsc: 'Tom Bradley',    need: 'ADHD',                    adjustments: 'Chunked learning materials, regular breaks, visual planners',   lastReview: '2026-02-20', nextReview: '2026-05-20' },
  { name: 'Noah Williams',  standard: 'Data Analyst',                       lsc: 'Hannah Clarke',  need: 'Anxiety / Mental Health', adjustments: 'Regular welfare check-ins, phased return support',              lastReview: '2026-03-05', nextReview: '2026-06-05' },
  { name: 'Quinn Andrews',  standard: 'Applied AI & Automation',            lsc: 'James Okafor',   need: 'Dyslexia',                adjustments: 'Extended assessment time, dyslexia-friendly materials',          lastReview: '2026-03-15', nextReview: '2026-06-15' },
  { name: 'Ben Cartwright', standard: 'Digital Support Technician',         lsc: 'James Okafor',   need: 'Visual Impairment',       adjustments: 'Large print, screen reader software, accessible formats',        lastReview: '2026-03-25', nextReview: '2026-06-25' },
  { name: 'Grace Adeniran', standard: 'Data Technician',                    lsc: 'James Okafor',   need: 'Hearing Impairment',      adjustments: 'Written communication preferred, transcripts provided',           lastReview: '2026-04-05', nextReview: '2026-07-05' },
  { name: 'Aisha Nwosu',   standard: 'Data Analyst',                        lsc: 'Sarah Mitchell', need: 'Autism Spectrum (ASC)',   adjustments: 'Structured routine, written instructions, quiet space for EPA',  lastReview: '2026-04-10', nextReview: '2026-07-10' },
  { name: 'Ellie Forsyth', standard: 'Professional Accounting Technician',  lsc: 'Priya Sharma',   need: 'Dyscalculia',             adjustments: 'Calculator permitted, formulae sheet provided in assessments',   lastReview: '2026-04-18', nextReview: '2026-07-18' },
  { name: 'Harry Singh',   standard: 'Data Technician',                     lsc: 'Tom Bradley',    need: 'ADHD',                    adjustments: 'Chunked tasks, visual planners, frequent progress check-ins',    lastReview: '2026-04-22', nextReview: '2026-07-22' },
  { name: 'Imani Adeyemi', standard: 'Multi-Channel Marketer',              lsc: 'Hannah Clarke',  need: 'Anxiety / Mental Health', adjustments: 'Welfare check-ins every 2 weeks, flexible submission deadlines', lastReview: '2026-04-01', nextReview: '2026-07-01' },
];

// Safeguarding & Welfare Concerns — active cases first, then closed
const SAFEGUARDING_DATA = [
  { name: 'Noah Williams', lsc: 'Hannah Clarke', dateRaised: '2026-02-28', category: 'Mental Health & Wellbeing', status: 'active', lastAction: '2026-05-10', notes: 'Referred to counselling service; bi-weekly welfare check-ins in place' },
  { name: 'Imani Adeyemi', lsc: 'Hannah Clarke', dateRaised: '2026-02-28', category: 'Mental Health & Wellbeing', status: 'active', lastAction: '2026-05-20', notes: 'Ongoing anxiety support; employer informed and supportive' },
  { name: 'Jack Morrison', lsc: 'Priya Sharma',  dateRaised: '2026-04-02', category: 'Workplace Concern',         status: 'active', lastAction: '2026-05-15', notes: 'Employer meeting arranged — concerns raised regarding workload' },
  { name: 'Victor Marsh',  lsc: 'Tom Bradley',   dateRaised: '2026-04-19', category: 'Workplace Concern',         status: 'active', lastAction: '2026-05-12', notes: 'Employer review meeting scheduled for 3 June 2026' },
  { name: 'Destiny Osei',  lsc: 'Hannah Clarke', dateRaised: '2026-05-03', category: 'Personal Welfare',          status: 'active', lastAction: '2026-05-20', notes: 'Learner withdrawal in progress; welfare support and signposting offered' },
  { name: 'Callum Fraser', lsc: 'Tom Bradley',   dateRaised: '2026-01-22', category: 'Financial Hardship',        status: 'closed', lastAction: '2026-03-18', notes: 'Signposted to Citizens Advice; resolved satisfactorily' },
];

// Welfare Check-ins Due — sorted by daysSince descending (most overdue first)
const WELFARE_DUE_DATA = [
  { name: 'Callum Fraser',  lsc: 'Tom Bradley',   reason: 'ALS review overdue (Dyspraxia)',            lastCheckin: '2026-04-10', daysSince: 47 },
  { name: 'Maya Thompson',  lsc: 'Tom Bradley',   reason: 'ALS review overdue (ADHD)',                 lastCheckin: '2026-04-20', daysSince: 37 },
  { name: 'Quinn Andrews',  lsc: 'James Okafor',  reason: 'ALS review due (Dyslexia)',                 lastCheckin: '2026-04-27', daysSince: 30 },
  { name: 'Noah Williams',  lsc: 'Hannah Clarke', reason: 'Mental health monitoring (bi-weekly)',      lastCheckin: '2026-05-10', daysSince: 17 },
  { name: 'Jack Morrison',  lsc: 'Priya Sharma',  reason: 'Safeguarding welfare follow-up',            lastCheckin: '2026-05-15', daysSince: 12 },
  { name: 'Imani Adeyemi',  lsc: 'Hannah Clarke', reason: 'Safeguarding check (fortnightly)',          lastCheckin: '2026-05-20', daysSince: 7  },
];

// ─── Delivery Dashboard Data ───────────────────────────────────────────

// Learners who have exceeded their original planned end date (Out of Funding)
const OOF_DATA = [
  { employer: 'TechCore UK',            name: 'Quinn Andrews',  standard: 'Applied AI & Automation',            plannedGateway: '2026-01-15', lsc: 'James Okafor',   status: 'Current',    monthExpected: 'Jun 2026', gwToEpa: '2026-07-12', portfolioRag: 'amber', notes: 'EPA registration resolved; gateway confirmed for June' },
  { employer: 'Pinnacle Finance Group', name: 'Harry Singh',    standard: 'Data Technician',                    plannedGateway: '2026-02-01', lsc: 'Tom Bradley',    status: 'Current',    monthExpected: 'Jul 2026', gwToEpa: '2026-08-05', portfolioRag: 'red',   notes: 'Progress reviews overdue; employer engagement low — urgent action required' },
  { employer: 'Sterling Accounts',      name: 'Rachel Kim',     standard: 'Professional Accounting Technician', plannedGateway: '2026-01-20', lsc: 'Tom Bradley',    status: 'At Gateway', monthExpected: 'May 2026', gwToEpa: '2026-06-20', portfolioRag: 'green', notes: 'Gateway meeting held 30 Apr; EPA booked 20 Jun' },
  { employer: 'Meridian Consulting',    name: 'Felix Huang',    standard: 'Data Analyst',                       plannedGateway: '2026-02-14', lsc: 'Sarah Mitchell', status: 'Current',    monthExpected: 'Jun 2026', gwToEpa: '2026-07-15', portfolioRag: 'amber', notes: 'FS maths resit passed; gateway prep in progress' },
  { employer: 'Clarity Finance Ltd',    name: 'Leo Okafor',     standard: 'Data Analyst',                       plannedGateway: '2026-03-01', lsc: 'James Okafor',   status: 'At Gateway', monthExpected: 'May 2026', gwToEpa: '2026-06-25', portfolioRag: 'green', notes: 'All evidence complete; EPA booked' },
  { employer: 'DataSphere Analytics',   name: 'Grace Adeniran', standard: 'Data Technician',                    plannedGateway: '2026-01-10', lsc: 'James Okafor',   status: 'BIL',        monthExpected: 'Sep 2026', gwToEpa: null,         portfolioRag: 'amber', notes: 'BIL commenced 15 May 2026; RTL planned Aug — gateway Sep' },
  { employer: 'Nova Solutions',         name: 'Ellie Forsyth',  standard: 'Professional Accounting Technician', plannedGateway: '2026-02-28', lsc: 'Priya Sharma',   status: 'Current',    monthExpected: 'Jun 2026', gwToEpa: '2026-07-18', portfolioRag: 'amber', notes: 'Portfolio 85% complete; FS maths now passed' },
  { employer: 'Horizon Analytics',      name: 'Noah Williams',  standard: 'Data Analyst',                       plannedGateway: '2026-02-20', lsc: 'Hannah Clarke',  status: 'Withdrawn',  monthExpected: null,       gwToEpa: null,         portfolioRag: 'red',   notes: 'Formal withdrawal agreed 10 May 2026' },
];

// Learners on an agreed break in learning
const BIL_DATA = [
  { employer: 'DataSphere Analytics',  name: 'Grace Adeniran', standard: 'Data Technician',         plannedGateway: '2026-09-15', lsc: 'James Okafor',   status: 'BIL Ongoing',         ldol: '2026-05-15', expectedRtl: '2026-08-15', notes: 'Medical — awaiting GP clearance for return to learning' },
  { employer: 'Greenfield Consulting', name: 'Imani Adeyemi',  standard: 'Multi-Channel Marketer',  plannedGateway: '2026-08-10', lsc: 'Hannah Clarke',  status: 'BIL Decision Needed', ldol: '2026-03-01', expectedRtl: null,          notes: 'BIL has exceeded 12 weeks; employer yet to confirm RTL date — action required' },
  { employer: 'Bright Digital Agency', name: 'Destiny Osei',   standard: 'Multi-Channel Marketer',  plannedGateway: null,         lsc: 'Hannah Clarke',  status: 'BIL Decision Needed', ldol: '2026-04-20', expectedRtl: null,          notes: 'Employer ceased trading; withdrawal or employer transfer being explored' },
  { employer: 'Future Tech Services',  name: 'Kira Patel',     standard: 'Applied AI & Automation', plannedGateway: '2026-10-01', lsc: 'Sarah Mitchell', status: 'RTL Confirmed',       ldol: '2026-03-10', expectedRtl: '2026-06-09', notes: 'RTL confirmed 9 Jun 2026; employer briefed and ready' },
  { employer: 'Bloom Marketing Co.',   name: 'Uma Sharma',     standard: 'Assistant Accountant',    plannedGateway: '2026-11-01', lsc: 'Priya Sharma',   status: 'BIL Ongoing',         ldol: '2026-04-28', expectedRtl: '2026-07-28', notes: 'Maternity leave — planned RTL late July 2026' },
  { employer: 'Nova Solutions',        name: 'Xander Brooks',  standard: 'Multi-Channel Marketer',  plannedGateway: '2026-09-20', lsc: 'Sarah Mitchell', status: 'RTL Confirmed',       ldol: '2026-02-17', expectedRtl: '2026-06-01', notes: 'RTL confirmed 1 Jun 2026; restarted programme materials' },
];

// Gateway learners by quarter
const GW_Q2_DATA = [
  { employer: 'Bright Digital Agency',      name: 'Aisha Nwosu',   standard: 'Data Analyst',                       plannedGateway: '2026-04-20', lsc: 'Sarah Mitchell', status: 'At Gateway', monthExpected: 'May 2026', gwToEpa: '2026-06-15', portfolioRag: 'green' },
  { employer: 'Pinnacle Finance Group',     name: 'Harry Singh',   standard: 'Data Technician',                    plannedGateway: '2026-04-14', lsc: 'Tom Bradley',    status: 'At Gateway', monthExpected: 'Apr 2026', gwToEpa: '2026-05-28', portfolioRag: 'green' },
  { employer: 'Urban Digital Ltd',          name: 'Maya Thompson', standard: 'Digital Support Technician',         plannedGateway: '2026-04-21', lsc: 'Tom Bradley',    status: 'At Gateway', monthExpected: 'Apr 2026', gwToEpa: '2026-05-30', portfolioRag: 'green' },
  { employer: 'Sterling Accounts',          name: 'Rachel Kim',    standard: 'Professional Accounting Technician', plannedGateway: '2026-04-30', lsc: 'Tom Bradley',    status: 'At Gateway', monthExpected: 'May 2026', gwToEpa: '2026-06-20', portfolioRag: 'amber' },
  { employer: 'DataSphere Analytics',       name: 'Grace Adeniran',standard: 'Data Technician',                    plannedGateway: '2026-05-01', lsc: 'James Okafor',   status: 'At Gateway', monthExpected: 'May 2026', gwToEpa: '2026-06-18', portfolioRag: 'green' },
  { employer: 'Clarity Finance Ltd',        name: 'Leo Okafor',    standard: 'Data Analyst',                       plannedGateway: '2026-04-28', lsc: 'James Okafor',   status: 'At Gateway', monthExpected: 'May 2026', gwToEpa: '2026-06-25', portfolioRag: 'green' },
  { employer: 'Bloom Marketing Co.',        name: 'Jack Morrison', standard: 'Multi-Channel Marketer',             plannedGateway: '2026-04-16', lsc: 'Priya Sharma',   status: 'At Gateway', monthExpected: 'May 2026', gwToEpa: '2026-06-12', portfolioRag: 'amber' },
  { employer: 'Horizon Analytics',          name: 'Noah Williams', standard: 'Data Analyst',                       plannedGateway: '2026-04-17', lsc: 'Hannah Clarke',  status: 'At Gateway', monthExpected: 'May 2026', gwToEpa: '2026-06-22', portfolioRag: 'amber' },
  { employer: 'Peak Performance Ltd',       name: 'Olivia Chen',   standard: 'Assistant Accountant',               plannedGateway: '2026-04-10', lsc: 'Priya Sharma',   status: 'At Gateway', monthExpected: 'May 2026', gwToEpa: '2026-06-15', portfolioRag: 'green' },
  { employer: 'Sterling Accounts',          name: 'Callum Fraser', standard: 'Assistant Accountant',               plannedGateway: '2026-06-01', lsc: 'Sarah Mitchell', status: 'Current',    monthExpected: 'Jun 2026', gwToEpa: null,         portfolioRag: 'amber' },
  { employer: 'Nova Solutions',             name: 'Ellie Forsyth', standard: 'Professional Accounting Technician', plannedGateway: '2026-06-05', lsc: 'Priya Sharma',   status: 'Current',    monthExpected: 'Jun 2026', gwToEpa: null,         portfolioRag: 'amber' },
  { employer: 'TechCore UK',                name: 'Quinn Andrews', standard: 'Applied AI & Automation',            plannedGateway: '2026-06-10', lsc: 'James Okafor',   status: 'Current',    monthExpected: 'Jun 2026', gwToEpa: null,         portfolioRag: 'amber' },
  { employer: 'Meridian Consulting',        name: 'Felix Huang',   standard: 'Data Analyst',                       plannedGateway: '2026-06-01', lsc: 'Sarah Mitchell', status: 'Current',    monthExpected: 'Jun 2026', gwToEpa: null,         portfolioRag: 'green' },
  { employer: 'Greenfield Consulting',      name: 'Destiny Marsh', standard: 'Digital Support Technician',         plannedGateway: '2026-06-15', lsc: 'Hannah Clarke',  status: 'Current',    monthExpected: 'Jun 2026', gwToEpa: null,         portfolioRag: 'green' },
  { employer: 'TechCore UK',                name: 'Sam Okwu',      standard: 'Data Technician',                    plannedGateway: '2026-06-20', lsc: 'James Okafor',   status: 'Current',    monthExpected: 'Jun 2026', gwToEpa: null,         portfolioRag: 'green' },
  { employer: 'Apex Digital Ltd',           name: 'Callum Nash',   standard: 'Applied AI & Automation',            plannedGateway: '2026-04-09', lsc: 'Tom Bradley',    status: 'Withdrawn',  monthExpected: null,       gwToEpa: null,         portfolioRag: 'red'   },
  { employer: 'Sterling Accounts',          name: 'Willow James',  standard: 'Assistant Accountant',               plannedGateway: null,         lsc: 'Hannah Clarke',  status: 'Withdrawn',  monthExpected: null,       gwToEpa: null,         portfolioRag: 'red'   },
];

const GW_Q3_DATA = [
  { employer: 'Bloom Marketing Co.',    name: 'Maya Patel',       standard: 'Applied AI & Automation',            plannedGateway: '2026-07-01', lsc: 'Priya Sharma',   status: 'Current', monthExpected: 'Jul 2026', gwToEpa: null, portfolioRag: 'green' },
  { employer: 'Greenfield Consulting',  name: 'Victor Marsh',     standard: 'Data Technician',                    plannedGateway: '2026-07-18', lsc: 'Tom Bradley',    status: 'Current', monthExpected: 'Jul 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'Clarity Finance Ltd',    name: 'Yasmin Al-Hassan', standard: 'Applied AI & Automation',            plannedGateway: '2026-07-14', lsc: 'Sarah Mitchell', status: 'Current', monthExpected: 'Jul 2026', gwToEpa: null, portfolioRag: 'green' },
  { employer: 'Sterling Accounts',      name: 'Tara Collins',     standard: 'Multi-Channel Marketer',             plannedGateway: '2026-07-22', lsc: 'Tom Bradley',    status: 'Current', monthExpected: 'Jul 2026', gwToEpa: null, portfolioRag: 'green' },
  { employer: 'DataSphere Analytics',   name: 'Ethan Brooks',     standard: 'Data Analyst',                       plannedGateway: '2026-07-28', lsc: 'James Okafor',   status: 'Current', monthExpected: 'Aug 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'Horizon Analytics',      name: 'Ben Cartwright',   standard: 'Digital Support Technician',         plannedGateway: '2026-08-05', lsc: 'James Okafor',   status: 'Current', monthExpected: 'Aug 2026', gwToEpa: null, portfolioRag: 'green' },
  { employer: 'TechCore UK',            name: 'Isla Thomson',     standard: 'Data Technician',                    plannedGateway: '2026-08-12', lsc: 'Sarah Mitchell', status: 'Current', monthExpected: 'Aug 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'NovaTech Solutions',     name: 'Luca Ferretti',    standard: 'Data Analyst',                       plannedGateway: '2026-08-20', lsc: 'Priya Sharma',   status: 'Current', monthExpected: 'Aug 2026', gwToEpa: null, portfolioRag: 'green' },
  { employer: 'Urban Digital Ltd',      name: 'Jordan Ellis',     standard: 'Data Analyst',                       plannedGateway: '2026-08-28', lsc: 'Tom Bradley',    status: 'Current', monthExpected: 'Aug 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'DataSphere Analytics',   name: 'Grace Adeniran',   standard: 'Data Technician',                    plannedGateway: '2026-09-15', lsc: 'James Okafor',   status: 'BIL',     monthExpected: 'Sep 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'Greenfield Consulting',  name: 'Imani Adeyemi',    standard: 'Multi-Channel Marketer',             plannedGateway: '2026-09-10', lsc: 'Hannah Clarke',  status: 'BIL',     monthExpected: 'Sep 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'Pinnacle Finance Group', name: 'Freddie Marsh',    standard: 'Professional Accounting Technician', plannedGateway: '2026-09-01', lsc: 'Tom Bradley',    status: 'Current', monthExpected: 'Sep 2026', gwToEpa: null, portfolioRag: 'green' },
  { employer: 'Peak Performance Ltd',   name: 'Chloe Davies',     standard: 'Assistant Accountant',               plannedGateway: '2026-09-15', lsc: 'Priya Sharma',   status: 'Current', monthExpected: 'Sep 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'Apex Digital Ltd',       name: 'Sophie Grant',     standard: 'Applied AI & Automation',            plannedGateway: '2026-09-22', lsc: 'Sarah Mitchell', status: 'Current', monthExpected: 'Sep 2026', gwToEpa: null, portfolioRag: 'green' },
  { employer: 'Bloom Marketing Co.',    name: 'Reuben Adeyemi',   standard: 'Digital Support Technician',         plannedGateway: '2026-09-28', lsc: 'Hannah Clarke',  status: 'Current', monthExpected: 'Sep 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'Nova Solutions',         name: 'Xander Brooks',    standard: 'Multi-Channel Marketer',             plannedGateway: '2026-09-20', lsc: 'Sarah Mitchell', status: 'BIL',     monthExpected: 'Sep 2026', gwToEpa: null, portfolioRag: 'amber' },
];

const GW_Q4_DATA = [
  { employer: 'Meridian Consulting',    name: 'Patrick Doherty', standard: 'Data Analyst',                       plannedGateway: '2026-10-10', lsc: 'Sarah Mitchell', status: 'Current', monthExpected: 'Oct 2026', gwToEpa: null, portfolioRag: 'green' },
  { employer: 'TechCore UK',            name: 'Reuben Adeyemi',  standard: 'Digital Support Technician',         plannedGateway: '2026-10-22', lsc: 'Hannah Clarke',  status: 'Current', monthExpected: 'Oct 2026', gwToEpa: null, portfolioRag: 'green' },
  { employer: 'Future Tech Services',   name: 'Kira Patel',      standard: 'Applied AI & Automation',            plannedGateway: '2026-10-01', lsc: 'Sarah Mitchell', status: 'BIL',     monthExpected: 'Oct 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'Pinnacle Finance Group', name: 'Harry Singh',     standard: 'Data Technician',                    plannedGateway: '2026-10-15', lsc: 'Tom Bradley',    status: 'Current', monthExpected: 'Oct 2026', gwToEpa: null, portfolioRag: 'red'   },
  { employer: 'DataSphere Analytics',   name: 'Amara Osei',      standard: 'Multi-Channel Marketer',             plannedGateway: '2026-11-05', lsc: 'Sarah Mitchell', status: 'Current', monthExpected: 'Nov 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'Sterling Accounts',      name: 'George Baker',    standard: 'Digital Support Technician',         plannedGateway: '2026-11-18', lsc: 'Tom Bradley',    status: 'Current', monthExpected: 'Nov 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'Apex Digital Ltd',       name: 'Holly Nguyen',    standard: 'Data Technician',                    plannedGateway: '2026-11-25', lsc: 'Hannah Clarke',  status: 'Current', monthExpected: 'Nov 2026', gwToEpa: null, portfolioRag: 'green' },
  { employer: 'Bloom Marketing Co.',    name: 'Uma Sharma',      standard: 'Assistant Accountant',               plannedGateway: '2026-11-01', lsc: 'Priya Sharma',   status: 'BIL',     monthExpected: 'Nov 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'Greenfield Consulting',  name: 'Isaac Rivera',    standard: 'Data Analyst',                       plannedGateway: '2026-12-01', lsc: 'Sarah Mitchell', status: 'Current', monthExpected: 'Dec 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'Clarity Finance Ltd',    name: 'Jade Thompson',   standard: 'Data Technician',                    plannedGateway: '2026-12-10', lsc: 'James Okafor',   status: 'Current', monthExpected: 'Dec 2026', gwToEpa: null, portfolioRag: 'green' },
  { employer: 'Bloom Marketing Co.',    name: 'Kyle Patterson',  standard: 'Multi-Channel Marketer',             plannedGateway: '2026-12-15', lsc: 'Priya Sharma',   status: 'Current', monthExpected: 'Dec 2026', gwToEpa: null, portfolioRag: 'amber' },
  { employer: 'NovaTech Solutions',     name: 'Olivia Chen',     standard: 'Assistant Accountant',               plannedGateway: '2026-12-20', lsc: 'Priya Sharma',   status: 'Current', monthExpected: 'Dec 2026', gwToEpa: null, portfolioRag: 'green' },
];

// ─── Gateway Pipeline Data ─────────────────────────────────────────────
// Keyed by 'YYYY-MM'. Base month (offset 0) = June 2026.
const GATEWAY_MONTHS_DATA = {
  '2026-05': {
    forecast: 22, expected: 18,
    groups: [
      { lsc: 'Sarah Mitchell', learners: [
        { name: 'Aisha Nwosu',    standard: 'Data Analyst',                       prepDate: '2026-04-20', atGateway: true,  monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Ben Cartwright', standard: 'Digital Support Technician',         prepDate: '2026-04-18', atGateway: true,  monthsCarried: 1, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Callum Fraser',  standard: 'Assistant Accountant',               prepDate: '2026-04-25', atGateway: false, monthsCarried: 0, carryOverNext: true,  withdrawn: false, notes: 'OTJ hours not yet met — moved to June' },
        { name: 'Destiny Osei',   standard: 'Multi-Channel Marketer',             prepDate: null,         atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: true,  notes: 'Employer ceased trading' },
      ]},
      { lsc: 'James Okafor', learners: [
        { name: 'Grace Adeniran', standard: 'Data Technician',                    prepDate: '2026-04-22', atGateway: true,  monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Quinn Andrews',  standard: 'Applied AI & Automation',            prepDate: '2026-04-15', atGateway: false, monthsCarried: 1, carryOverNext: true,  withdrawn: false, notes: 'EPA registration delayed — moved to June' },
        { name: 'Leo Okafor',     standard: 'Data Analyst',                       prepDate: '2026-04-28', atGateway: true,  monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
      ]},
      { lsc: 'Priya Sharma', learners: [
        { name: 'Jack Morrison',  standard: 'Multi-Channel Marketer',             prepDate: '2026-04-16', atGateway: true,  monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Ellie Forsyth',  standard: 'Professional Accounting Technician', prepDate: '2026-04-24', atGateway: false, monthsCarried: 0, carryOverNext: true,  withdrawn: false, notes: 'Functional Skills maths pending — moved to June' },
        { name: 'Olivia Chen',    standard: 'Assistant Accountant',               prepDate: '2026-04-10', atGateway: true,  monthsCarried: 2, carryOverNext: false, withdrawn: false, notes: '' },
      ]},
      { lsc: 'Tom Bradley', learners: [
        { name: 'Harry Singh',    standard: 'Data Technician',                    prepDate: '2026-04-14', atGateway: true,  monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Maya Thompson',  standard: 'Digital Support Technician',         prepDate: '2026-04-21', atGateway: true,  monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Callum Nash',    standard: 'Applied AI & Automation',            prepDate: '2026-04-09', atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: true,  notes: 'Personal reasons — formal withdrawal agreed' },
        { name: 'Rachel Kim',     standard: 'Professional Accounting Technician', prepDate: '2026-04-30', atGateway: true,  monthsCarried: 1, carryOverNext: false, withdrawn: false, notes: '' },
      ]},
      { lsc: 'Hannah Clarke', learners: [
        { name: 'Noah Williams',  standard: 'Data Analyst',                       prepDate: '2026-04-17', atGateway: true,  monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Imani Adeyemi',  standard: 'Multi-Channel Marketer',             prepDate: '2026-04-23', atGateway: true,  monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Destiny Marsh',  standard: 'Digital Support Technician',         prepDate: '2026-04-11', atGateway: false, monthsCarried: 0, carryOverNext: true,  withdrawn: false, notes: 'Employer unavailable for EPA — moved to June' },
        { name: 'Willow James',   standard: 'Assistant Accountant',               prepDate: null,         atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: true,  notes: 'Change of employment' },
      ]},
    ],
  },
  '2026-06': {
    forecast: 20, expected: 16,
    groups: [
      { lsc: 'Sarah Mitchell', learners: [
        { name: 'Callum Fraser',  standard: 'Assistant Accountant',               prepDate: '2026-05-22', atGateway: false, monthsCarried: 1, carryOverNext: false, withdrawn: false, notes: 'Carry over from May — OTJ now met' },
        { name: 'Felix Huang',    standard: 'Data Analyst',                       prepDate: '2026-05-20', atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Kira Patel',     standard: 'Applied AI & Automation',            prepDate: '2026-05-27', atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
      ]},
      { lsc: 'James Okafor', learners: [
        { name: 'Quinn Andrews',  standard: 'Applied AI & Automation',            prepDate: '2026-05-14', atGateway: false, monthsCarried: 1, carryOverNext: false, withdrawn: false, notes: 'Carry over from May' },
        { name: 'Sam Okwu',       standard: 'Data Technician',                    prepDate: '2026-05-26', atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Ben Cartwright', standard: 'Digital Support Technician',         prepDate: '2026-05-19', atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
      ]},
      { lsc: 'Priya Sharma', learners: [
        { name: 'Ellie Forsyth',  standard: 'Professional Accounting Technician', prepDate: '2026-05-21', atGateway: false, monthsCarried: 1, carryOverNext: false, withdrawn: false, notes: 'Carry over from May — FS maths now achieved' },
        { name: 'Uma Sharma',     standard: 'Assistant Accountant',               prepDate: null,         atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Jack Morrison',  standard: 'Multi-Channel Marketer',             prepDate: '2026-05-15', atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
      ]},
      { lsc: 'Tom Bradley', learners: [
        { name: 'Victor Marsh',   standard: 'Data Technician',                    prepDate: '2026-05-18', atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Maya Thompson',  standard: 'Digital Support Technician',         prepDate: '2026-05-25', atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
      ]},
      { lsc: 'Hannah Clarke', learners: [
        { name: 'Destiny Marsh',  standard: 'Digital Support Technician',         prepDate: '2026-05-20', atGateway: false, monthsCarried: 1, carryOverNext: false, withdrawn: false, notes: 'Carry over from May' },
        { name: 'Noah Williams',  standard: 'Data Analyst',                       prepDate: null,         atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Tara Collins',   standard: 'Multi-Channel Marketer',             prepDate: null,         atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
      ]},
    ],
  },
  '2026-07': {
    forecast: 18, expected: 14,
    groups: [
      { lsc: 'Sarah Mitchell', learners: [
        { name: 'Patrick Doherty',  standard: 'Data Analyst',                       prepDate: null, atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Yasmin Al-Hassan', standard: 'Applied AI & Automation',            prepDate: null, atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Aisha Nwosu',      standard: 'Digital Support Technician',         prepDate: null, atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
      ]},
      { lsc: 'James Okafor', learners: [
        { name: 'Leo Okafor',       standard: 'Data Technician',                    prepDate: null, atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Grace Adeniran',   standard: 'Professional Accounting Technician', prepDate: null, atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
      ]},
      { lsc: 'Priya Sharma', learners: [
        { name: 'Xander Brooks',    standard: 'Multi-Channel Marketer',             prepDate: null, atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Uma Sharma',       standard: 'Assistant Accountant',               prepDate: null, atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Olivia Chen',      standard: 'Data Analyst',                       prepDate: null, atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
      ]},
      { lsc: 'Tom Bradley', learners: [
        { name: 'Harry Singh',      standard: 'Data Technician',                    prepDate: null, atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Victor Marsh',     standard: 'Data Analyst',                       prepDate: null, atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
      ]},
      { lsc: 'Hannah Clarke', learners: [
        { name: 'Imani Adeyemi',    standard: 'Multi-Channel Marketer',             prepDate: null, atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Tara Collins',     standard: 'Assistant Accountant',               prepDate: null, atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
        { name: 'Noah Williams',    standard: 'Data Analyst',                       prepDate: null, atGateway: false, monthsCarried: 0, carryOverNext: false, withdrawn: false, notes: '' },
      ]},
    ],
  },
};

// ─── Users ─────────────────────────────────────────────────────────────
const USERS = [
  { id: 'delivery',   name: 'Delivery Manager',   role: 'delivery',   initials: 'DM' },
  { id: 'compliance', name: 'Compliance Manager',  role: 'compliance', initials: 'CM' },
  { id: 'quality',    name: 'Quality Manager',     role: 'quality',    initials: 'QM' },
  { id: 'sales',      name: 'Sales Manager',       role: 'sales',      initials: 'SM' },
  { id: 'sarah',      name: 'Sarah Mitchell',      role: 'lsc',        initials: 'SM', coach: 'Sarah Mitchell' },
  { id: 'james',      name: 'James Okafor',        role: 'lsc',        initials: 'JO', coach: 'James Okafor'   },
  { id: 'priya',      name: 'Priya Sharma',        role: 'lsc',        initials: 'PS', coach: 'Priya Sharma'   },
  { id: 'tom',        name: 'Tom Bradley',         role: 'lsc',        initials: 'TB', coach: 'Tom Bradley'    },
  { id: 'hannah',     name: 'Hannah Clarke',       role: 'lsc',        initials: 'HC', coach: 'Hannah Clarke'  },
];

let currentUser = USERS[0]; // default: Delivery Manager

const NAV_ACCESS = {
  'page-overview':  ['delivery', 'compliance', 'quality', 'lsc'],
  'page-sales':     ['delivery', 'compliance', 'quality', 'sales'],
  'page-smt':       ['delivery', 'compliance', 'quality'],
  'page-learners':  ['delivery', 'compliance', 'quality', 'lsc'],
  'page-gateway':   ['delivery', 'quality', 'lsc'],
  'page-reporting': ['delivery', 'compliance', 'quality', 'sales', 'lsc'],
};

// ─── State ─────────────────────────────────────────────────────────────
let currentSize        = 200;
let pipelineOffset     = 0;
let gatewayOffset      = 0; // 0 = June 2026
let deliveryLSCFilter  = 'All';
let deliveryDashFilter = 'All';
let lscPageCoach       = 'James Okafor';

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

// ─── Sub-navigation (Learners page) ────────────────────────────────────
document.querySelectorAll('.sub-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sub-nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.sub-page').forEach(p => p.classList.remove('active'));
    document.getElementById(btn.dataset.sub)?.classList.add('active');
  });
});

// ─── User switcher ─────────────────────────────────────────────────────
function renderUserSwitcher() {
  const avatarEl = document.getElementById('user-avatar');
  const nameEl   = document.getElementById('user-name-display');
  const dropdown = document.getElementById('user-dropdown');
  if (avatarEl) avatarEl.textContent = currentUser.initials;
  if (nameEl)   nameEl.textContent   = currentUser.name;
  if (!dropdown) return;
  const groups = [
    { label: 'Management',            users: USERS.filter(u => u.role !== 'lsc') },
    { label: 'Learning Skills Coaches', users: USERS.filter(u => u.role === 'lsc')  },
  ];
  dropdown.innerHTML = groups.map(g => `
    <div class="user-dropdown-group">
      <div class="user-dropdown-group-label">${g.label}</div>
      ${g.users.map(u => `
        <button class="user-dropdown-item${u.id === currentUser.id ? ' active' : ''}" data-user-id="${u.id}">
          <span class="user-avatar-sm">${u.initials}</span>${u.name}
        </button>`).join('')}
    </div>`).join('');
}

document.getElementById('user-btn')?.addEventListener('click', e => {
  e.stopPropagation();
  document.getElementById('user-dropdown')?.classList.toggle('open');
});
document.addEventListener('click', () => {
  document.getElementById('user-dropdown')?.classList.remove('open');
});
document.getElementById('user-dropdown')?.addEventListener('click', e => {
  const btn = e.target.closest('[data-user-id]');
  if (!btn) return;
  switchUser(btn.dataset.userId);
});

function switchUser(userId) {
  const user = USERS.find(u => u.id === userId);
  if (!user || user.id === currentUser.id) return;
  currentUser = user;
  document.getElementById('user-dropdown')?.classList.remove('open');
  renderUserSwitcher();
  applyRolePermissions();
  renderAll();
  renderPipeline();
  renderGateway();
  renderWelfare();
  renderDeliveryDash();
}

function applyRolePermissions() {
  const role  = currentUser.role;
  const isLSC = role === 'lsc';

  // Nav visibility
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    const allowed = NAV_ACCESS[link.dataset.page] || [];
    link.style.display = allowed.includes(role) ? '' : 'none';
  });

  // If active page is no longer accessible, navigate to first accessible
  const activePageId = document.querySelector('.page.active')?.id;
  if (activePageId && !(NAV_ACCESS[activePageId] || []).includes(role)) {
    const firstPage = Object.keys(NAV_ACCESS).find(p => NAV_ACCESS[p].includes(role));
    document.querySelector(`.nav-link[data-page="${firstPage}"]`)?.click();
  }

  // DfE AAF section on Overview (hidden for LSC)
  const aafSection = document.getElementById('ov-aaf-section');
  if (aafSection) aafSection.style.display = isLSC ? 'none' : '';

  // Delivery: show manager view or LSC caseload view
  const mgView  = document.getElementById('delivery-manager-view');
  const lscView = document.getElementById('lsc-caseload-view');
  if (mgView)  mgView.style.display  = isLSC ? 'none' : '';
  if (lscView) lscView.style.display = isLSC ? '' : 'none';

  if (isLSC) {
    const coach = currentUser.coach;
    lscPageCoach       = coach;
    deliveryDashFilter = coach;
    deliveryLSCFilter  = coach;

    const lscCoachEl = document.getElementById('lsc-coach');
    if (lscCoachEl) lscCoachEl.value = coach;
    const ddLscEl = document.getElementById('delivery-dash-lsc');
    if (ddLscEl) ddLscEl.value = coach;
    const dLscEl = document.getElementById('delivery-lsc');
    if (dLscEl) dLscEl.value = coach;

    const compLscBar = document.getElementById('compliance-lsc-bar');
    if (compLscBar) compLscBar.style.display = 'none';

    const rfLsc = document.getElementById('rf-lsc');
    if (rfLsc) { rfLsc.value = coach; rfLsc.disabled = true; }

    setText('lsc-caseload-subtitle', coach + ' — Learner Success Coach');
  } else {
    lscPageCoach       = 'James Okafor';
    deliveryDashFilter = 'All';
    deliveryLSCFilter  = 'All';

    const compLscBar = document.getElementById('compliance-lsc-bar');
    if (compLscBar) compLscBar.style.display = '';

    const rfLsc = document.getElementById('rf-lsc');
    if (rfLsc) { rfLsc.value = ''; rfLsc.disabled = false; }

    const ddLscEl = document.getElementById('delivery-dash-lsc');
    if (ddLscEl) ddLscEl.value = 'All';
    const dLscEl = document.getElementById('delivery-lsc');
    if (dLscEl) dLscEl.value = 'All';
  }
}

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

// ─── Delivery dash LSC filter ─────────────────────────────────────────
document.getElementById('delivery-dash-lsc')?.addEventListener('change', function () {
  deliveryDashFilter = this.value;
  renderDeliveryDash();
});

// ─── LSC page coach selector ───────────────────────────────────────────
document.getElementById('lsc-coach')?.addEventListener('change', function () {
  lscPageCoach = this.value;
  renderLSCKPIs();
  renderLSCTables();
});

// ─── Overview "View →" navigation buttons ─────────────────────────────
document.addEventListener('click', function (e) {
  const btn = e.target.closest('[data-goto-page]');
  if (!btn) return;
  const pageId = btn.dataset.gotoPage;
  const navLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
  if (navLink) navLink.click();
});

// ─── Master render ─────────────────────────────────────────────────────
function renderAll() {
  renderOverviewKPIs();
  renderOverviewSummary();
  renderSMTKPIs();
  renderDeliveryKPIs();
  renderLSCKPIs();
  renderWelfareKPIs();
  renderAAF();
  renderENPS();
  renderDeliveryTables();
  renderLSCTables();
}

// ─── Overview KPIs ─────────────────────────────────────────────────────
function setKpiCard(id, label, value) {
  const valEl = document.getElementById(id);
  if (!valEl) return;
  valEl.textContent = value;
  const lblEl = valEl.previousElementSibling;
  if (lblEl && lblEl.classList.contains('kpi-label')) lblEl.textContent = label;
}

function renderOverviewKPIs() {
  if (currentUser.role === 'lsc') {
    const c = COACH_DATA[currentUser.coach] || {};
    setKpiCard('kpi-learners',    'My Learners',      c.learners       || '—');
    setKpiCard('kpi-on-track',    'Reviews Due',       c.reviewsDue     || '—');
    setKpiCard('kpi-at-risk',     'At Risk',           c.atRisk         || '—');
    setKpiCard('kpi-overdue',     'OTJ Compliance',    c.otjCompliance  || '—');
    setKpiCard('kpi-employers',   'Employers',         '—');
    setKpiCard('kpi-achievement', 'Achievement Rate',  '—');
  } else {
    const d = DATA[currentSize];
    setKpiCard('kpi-learners',    'Active Learners',   d.learners);
    setKpiCard('kpi-on-track',    'On Track',          d.onTrack);
    setKpiCard('kpi-at-risk',     'At Risk',           d.atRisk);
    setKpiCard('kpi-overdue',     'Overdue Reviews',   d.overdue);
    setKpiCard('kpi-employers',   'Employers',         d.employers);
    setKpiCard('kpi-achievement', 'Achievement Rate',  d.achievement);
    setText('actions-count', d.actionsToday + ' actions');
    setText('risk-count',    d.atRisk + ' learners');
  }
}

// ─── Overview Summary Cards ────────────────────────────────────────────
function renderOverviewSummary() {

  // — Compliance —
  setText('ov-touchpoints', TOUCHPOINT_DATA.length);
  setText('ov-sla',         SLA_DATA.length);
  setText('ov-otj',         OTJ_DATA.length);
  setText('ov-starters',    STARTER_DATA.length);

  // — Learner Welfare —
  const alsOverdue         = ALS_DATA.filter(r => alsReviewRag(r.nextReview).cls === 'urgent').length;
  const alsSoon            = ALS_DATA.filter(r => alsReviewRag(r.nextReview).cls === 'warning').length;
  const safeguardingActive = SAFEGUARDING_DATA.filter(r => r.status === 'active').length;
  const welfareDue         = WELFARE_DUE_DATA.filter(r => r.daysSince > 14).length;
  setText('ov-als-overdue',  alsOverdue);
  setText('ov-als-soon',     alsSoon);
  setText('ov-safeguarding', safeguardingActive);
  setText('ov-welfare-due',  welfareDue);

  // — Delivery —
  const oofActive   = OOF_DATA.filter(r => r.status !== 'Withdrawn').length;
  const oofRed      = OOF_DATA.filter(r => r.portfolioRag === 'red' && r.status !== 'Withdrawn').length;
  const bilDecision = BIL_DATA.filter(r => r.status === 'BIL Decision Needed').length;
  const bilTotal    = BIL_DATA.length;
  setText('ov-oof',          oofActive);
  setText('ov-oof-red',      oofRed);
  setText('ov-bil-decision', bilDecision);
  setText('ov-bil-total',    bilTotal);

  // — Gateway Pipeline (May 2026 snapshot) —
  const gwData      = GATEWAY_MONTHS_DATA['2026-05'];
  const gwLearners  = gwData ? gwData.groups.flatMap(g => g.learners) : [];
  const gwAt        = gwLearners.filter(l => l.atGateway).length;
  const gwExpected  = gwData ? gwData.expected : 0;
  const gwCarry     = gwLearners.filter(l => l.carryOverNext).length;
  const gwWithdrawn = gwLearners.filter(l => l.withdrawn).length;
  setText('ov-gw-at',        gwAt);
  setText('ov-gw-expected',  gwExpected);
  setText('ov-gw-carry',     gwCarry);
  setText('ov-gw-withdrawn', gwWithdrawn);

  // — Sales Pipeline (May 2026) —
  const mayEntries     = PIPELINE_ENTRIES.filter(e => {
    const d = new Date(e.start);
    return d.getFullYear() === 2026 && d.getMonth() === 4;
  });
  const salesConfirmed = mayEntries.filter(e => e.prob >= 70).length;
  const salesTarget    = PIPELINE_TARGETS['2026-05'] || 0;
  const salesInScope   = mayEntries.filter(e => e.status !== 'Cold Lead').length;
  const salesCold      = mayEntries.filter(e => e.status === 'Cold Lead').length;
  setText('ov-sales-confirmed', salesConfirmed);
  setText('ov-sales-target',    salesTarget);
  setText('ov-sales-inscope',   salesInScope);
  setText('ov-sales-cold',      salesCold);

  // — DfE AAF (size-dependent) —
  const aafMetrics = AAF_METRICS[currentSize];
  const aafGreen   = aafMetrics.filter(m => m.rag === 'green').length;
  const aafAmber   = aafMetrics.filter(m => m.rag === 'amber').length;
  const aafRed     = aafMetrics.filter(m => m.rag === 'red').length;
  const redNames   = aafMetrics.filter(m => m.rag === 'red').map(m => m.name).join(', ');
  setText('ov-aaf-green', aafGreen);
  setText('ov-aaf-amber', aafAmber);
  setText('ov-aaf-red',   aafRed);
  const redNamesEl = document.getElementById('ov-aaf-red-names');
  if (redNamesEl) redNamesEl.textContent = aafRed > 0 ? `Red metrics: ${redNames}` : 'No red metrics';

  // — Urgent banner (items needing immediate action) —
  const urgentTotal = SLA_DATA.length + bilDecision + oofRed + alsOverdue + safeguardingActive + welfareDue;
  setText('ov-total-actions', urgentTotal);
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

function getPipelineMonthEntries() {
  const base = new Date(2026, 4, 1); // May 2026 = offset 0
  base.setMonth(base.getMonth() + pipelineOffset);
  const yr = base.getFullYear();
  const mo = base.getMonth();
  return PIPELINE_ENTRIES.filter(e => {
    const d = new Date(e.start);
    return d.getFullYear() === yr && d.getMonth() === mo;
  });
}

function renderPipeline() {
  const base = new Date(2026, 4, 1); // May 2026 = offset 0
  base.setMonth(base.getMonth() + pipelineOffset);
  const yr  = base.getFullYear();
  const mo  = base.getMonth();
  const label = base.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  setText('pipeline-month', label);

  const monthKey   = `${yr}-${String(mo + 1).padStart(2, '0')}`;
  const entries    = getPipelineMonthEntries();
  const target     = PIPELINE_TARGETS[monthKey] || 6;
  const confirmed  = entries.filter(e => e.prob >= 70).length;
  const pct        = Math.min(100, Math.round((confirmed / target) * 100));

  setText('pipeline-confirmed', `${confirmed} confirmed starts`);
  setText('pipeline-target',    `${target} starts`);
  setText('pipeline-pct',       `${pct}%`);
  const bar = document.getElementById('pipeline-bar');
  if (bar) bar.style.width = pct + '%';

  // Reset filters when month changes
  ['filter-standard','filter-am','filter-status','filter-probability'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  renderPipelineBreakdown(entries);
  renderSalesTable(entries);
}

function renderPipelineBreakdown(entries) {
  const container = document.getElementById('pipeline-breakdown');
  if (!container) return;
  if (!entries.length) {
    container.innerHTML = '';
    return;
  }

  const groups = [
    { label: 'High',   sub: '≥70%',  cls: 'bd-high',   fn: e => e.prob >= 70 },
    { label: 'Medium', sub: '40–60%', cls: 'bd-medium', fn: e => e.prob >= 40 && e.prob < 70 },
    { label: 'Low',    sub: '≤30%',   cls: 'bd-low',    fn: e => e.prob < 40 },
  ];

  container.innerHTML = `<div class="bd-grid">${
    groups.map(g => {
      const items = entries.filter(g.fn);
      const stdCounts = {};
      items.forEach(e => { stdCounts[e.standard] = (stdCounts[e.standard] || 0) + 1; });
      const pills = Object.entries(stdCounts)
        .map(([std, n]) => `<span class="bd-std-pill">${std}${n > 1 ? ` ×${n}` : ''}</span>`)
        .join('');
      return `
        <div class="bd-card ${g.cls}">
          <div class="bd-card-header">
            <span class="bd-label">${g.label}</span>
            <span class="bd-sub">${g.sub}</span>
            <span class="bd-count">${items.length}</span>
          </div>
          <div class="bd-stds">
            ${items.length ? pills : '<span class="bd-empty">None this month</span>'}
          </div>
        </div>`;
    }).join('')
  }</div>`;
}

function salesStatusPill(status) {
  const map = {
    'Cold Lead':       'sp-cold-lead',
    'In Scope':        'sp-in-scope',
    'Proposal Sent':   'sp-proposal-sent',
    'Contract Issued': 'sp-contract-issued',
    'Contract Signed': 'sp-contract-signed',
    'Enrolment':       'sp-enrolment',
  };
  return `<span class="sp-pill ${map[status] || ''}">${status}</span>`;
}

function renderSalesTable(entries) {
  const tbody = document.getElementById('sales-tbody');
  if (!tbody) return;
  if (!entries.length) {
    tbody.innerHTML = emptyRow(7, 'No entries match the selected filters.');
    return;
  }
  tbody.innerHTML = entries.map(e => {
    const pClass = e.prob >= 70 ? 'prob-high' : e.prob >= 40 ? 'prob-medium' : 'prob-low';
    return `
      <tr>
        <td>${e.name}</td>
        <td>${e.employer}</td>
        <td>${e.am}</td>
        <td>${e.standard}</td>
        <td><span class="prob-pill ${pClass}">${e.prob}%</span></td>
        <td>${fmtDate(e.start)}</td>
        <td>${salesStatusPill(e.status)}</td>
      </tr>`;
  }).join('');
}

document.getElementById('filter-standard')?.addEventListener('change',   applyPipelineFilters);
document.getElementById('filter-am')?.addEventListener('change',         applyPipelineFilters);
document.getElementById('filter-status')?.addEventListener('change',     applyPipelineFilters);
document.getElementById('filter-probability')?.addEventListener('change', applyPipelineFilters);

function applyPipelineFilters() {
  const std    = document.getElementById('filter-standard')?.value    || '';
  const am     = document.getElementById('filter-am')?.value          || '';
  const status = document.getElementById('filter-status')?.value      || '';
  const prob   = document.getElementById('filter-probability')?.value || '';

  const entries = getPipelineMonthEntries();
  const filtered = entries.filter(e => {
    const stdOk    = !std    || e.standard === std;
    const amOk     = !am     || e.am === am;
    const statusOk = !status || e.status === status;
    let probOk = true;
    if (prob === 'High (≥70%)')     probOk = e.prob >= 70;
    if (prob === 'Medium (40–60%)') probOk = e.prob >= 40 && e.prob < 70;
    if (prob === 'Low (≤30%)')      probOk = e.prob < 40;
    return stdOk && amOk && statusOk && probOk;
  });
  renderPipelineBreakdown(filtered);
  renderSalesTable(filtered);
}

document.getElementById('month-prev')?.addEventListener('click', () => { pipelineOffset--; renderPipeline(); });
document.getElementById('month-next')?.addEventListener('click', () => { pipelineOffset++; renderPipeline(); });

document.getElementById('gw-month-prev')?.addEventListener('click', () => { gatewayOffset--; renderGateway(); });
document.getElementById('gw-month-next')?.addEventListener('click', () => { gatewayOffset++; renderGateway(); });

// ─── Welfare KPIs ──────────────────────────────────────────────────────
function renderWelfareKPIs() {
  const d = DATA[currentSize];
  setText('kpi-als-total',      d.alsTotal);
  setText('kpi-als-active',     d.alsActive);
  setText('kpi-safeguarding',   d.safeguardingActive);
  setText('kpi-welfare-due',    d.welfareChecksDue);
}

// ─── Welfare Tables ────────────────────────────────────────────────────
function renderWelfare() {
  renderALSTable();
  renderSafeguardingTable();
  renderWelfareDueTable();
}

function alsReviewRag(nextReviewStr) {
  const today = new Date('2026-05-27');
  const next  = new Date(nextReviewStr);
  const days  = Math.floor((next - today) / (1000 * 60 * 60 * 24));
  if (days < 0)   return { label: 'Overdue',   cls: 'urgent' };
  if (days <= 28) return { label: 'Due soon',  cls: 'warning' };
  return               { label: 'On track',  cls: 'ok' };
}

function renderALSTable() {
  const tbody = document.getElementById('als-tbody');
  if (!tbody) return;
  tbody.innerHTML = ALS_DATA.map(r => {
    const rag = alsReviewRag(r.nextReview);
    return `
      <tr class="${rag.cls === 'urgent' ? 'row-alert' : ''}">
        <td>${r.name}</td>
        <td>${r.standard}</td>
        <td>${r.lsc}</td>
        <td><strong>${r.need}</strong></td>
        <td style="font-size:0.78rem;">${r.adjustments}</td>
        <td>${fmtDate(r.lastReview)}</td>
        <td class="${rag.cls === 'urgent' ? 'cell-alert' : ''}">${fmtDate(r.nextReview)}</td>
        <td style="text-align:center;"><span class="weeks-pill ${rag.cls}">${rag.label}</span></td>
      </tr>
    `;
  }).join('');
}

function renderSafeguardingTable() {
  const tbody = document.getElementById('safeguarding-tbody');
  if (!tbody) return;
  tbody.innerHTML = SAFEGUARDING_DATA.map(r => {
    const isActive  = r.status === 'active';
    const rowClass  = isActive ? 'row-carry' : '';
    const statusEl  = isActive
      ? '<span class="status-active">Active</span>'
      : '<span class="status-closed">Closed</span>';
    return `
      <tr class="${rowClass}">
        <td><strong>${r.name}</strong></td>
        <td>${r.lsc}</td>
        <td>${fmtDate(r.dateRaised)}</td>
        <td>${r.category}</td>
        <td>${statusEl}</td>
        <td>${fmtDate(r.lastAction)}</td>
        <td style="font-size:0.78rem;">${r.notes}</td>
      </tr>
    `;
  }).join('');
}

function renderWelfareDueTable() {
  const tbody = document.getElementById('welfare-due-tbody');
  if (!tbody) return;
  tbody.innerHTML = WELFARE_DUE_DATA.map(r => {
    const isAlert = r.daysSince > 14;
    return `
      <tr class="${isAlert ? 'row-alert' : ''}">
        <td>${r.name}</td>
        <td>${r.lsc}</td>
        <td>${r.reason}</td>
        <td>${fmtDate(r.lastCheckin)}</td>
        <td class="${isAlert ? 'cell-alert' : ''}">
          <span class="weeks-pill ${isAlert ? 'urgent' : 'warning'}">${r.daysSince}d ago</span>
        </td>
      </tr>
    `;
  }).join('');
}

// ─── Delivery Dashboard ────────────────────────────────────────────────

function portfolioRagBadge(rag) {
  const labels = { green: 'Green', amber: 'Amber', red: 'Red' };
  return `<span class="rag-badge rag-badge--${rag}">${labels[rag] || rag}</span>`;
}

function oofStatusPill(status) {
  const map = {
    'Current':    'dd-status-current',
    'At Gateway': 'dd-status-gateway',
    'Withdrawn':  'dd-status-withdrawn',
    'BIL':        'dd-status-bil',
  };
  return `<span class="${map[status] || 'dd-status-current'}">${status}</span>`;
}

function bilStatusPill(status) {
  const map = {
    'BIL Ongoing':         'dd-status-bil',
    'BIL Decision Needed': 'dd-status-withdrawn',
    'RTL Confirmed':       'dd-status-gateway',
  };
  return `<span class="${map[status] || 'dd-status-bil'}">${status}</span>`;
}

function renderDeliveryDash() {
  const f = deliveryDashFilter === 'All' ? null : deliveryDashFilter;
  renderDeliveryDashKPIs(f);
  renderOOFTable(f);
  renderBILTable(f);
  renderGWQuarterTable('gw-q2-tbody', 'q2-panel-count', GW_Q2_DATA, f);
  renderGWQuarterTable('gw-q3-tbody', 'q3-panel-count', GW_Q3_DATA, f);
  renderGWQuarterTable('gw-q4-tbody', 'q4-panel-count', GW_Q4_DATA, f);
}

function renderDeliveryDashKPIs(lscFilter) {
  const filterFn = r => !lscFilter || r.lsc === lscFilter;

  const oofRows    = OOF_DATA.filter(filterFn);
  const bilRows    = BIL_DATA.filter(filterFn);
  const q2Rows     = GW_Q2_DATA.filter(filterFn);
  const q3Rows     = GW_Q3_DATA.filter(filterFn);
  const q4Rows     = GW_Q4_DATA.filter(filterFn);

  const oofRed     = oofRows.filter(r => r.portfolioRag === 'red').length;
  const bilNeeded  = bilRows.filter(r => r.status === 'BIL Decision Needed').length;
  const q2AtGw     = q2Rows.filter(r => r.status === 'At Gateway').length;

  setText('dd-oof-total',  oofRows.length);
  setText('dd-oof-sub',    oofRed > 0 ? `${oofRed} red portfolio` : 'No red portfolios');
  setText('dd-bil-total',  bilRows.length);
  setText('dd-bil-sub',    `${bilNeeded} decision${bilNeeded !== 1 ? 's' : ''} needed`);
  setText('dd-bil-action', bilNeeded);
  setText('dd-q2-total',   q2Rows.length);
  setText('dd-q2-sub',     `${q2AtGw} at gateway`);
  setText('dd-q3-total',   q3Rows.length);
  setText('dd-q3-sub',     `${q3Rows.filter(r => r.status === 'Current').length} current`);
  setText('dd-q4-total',   q4Rows.length);
  setText('dd-q4-sub',     `${q4Rows.filter(r => r.status === 'Current').length} current`);

  // Portfolio RAG across all quarters
  const allQRows   = [...q2Rows, ...q3Rows, ...q4Rows];
  const ragGreen   = allQRows.filter(r => r.portfolioRag === 'green').length;
  const ragAmber   = allQRows.filter(r => r.portfolioRag === 'amber').length;
  const ragRed     = allQRows.filter(r => r.portfolioRag === 'red').length;
  setText('dd-rag-green', `${ragGreen} Green`);
  setText('dd-rag-amber', `${ragAmber} Amber`);
  setText('dd-rag-red',   `${ragRed} Red`);

  // Highlight BIL action card if decisions needed
  const card = document.getElementById('dd-bil-action-card');
  if (card) card.classList.toggle('kpi-card--active-alert', bilNeeded > 0);
}

function renderOOFTable(lscFilter) {
  const tbody = document.getElementById('oof-tbody');
  if (!tbody) return;
  const rows = lscFilter ? OOF_DATA.filter(r => r.lsc === lscFilter) : OOF_DATA;
  const countEl = document.getElementById('oof-panel-count');
  if (countEl) countEl.textContent = rows.length + ' learner' + (rows.length !== 1 ? 's' : '');
  if (!rows.length) { tbody.innerHTML = emptyRow(10, 'No OOF learners for this coach.'); return; }
  tbody.innerHTML = rows.map(r => {
    const isWithdrawn = r.status === 'Withdrawn';
    const isRed       = r.portfolioRag === 'red';
    const rowClass    = isWithdrawn ? 'row-withdrawn' : isRed ? 'row-alert' : '';
    const prepCell    = r.gwToEpa ? fmtDate(r.gwToEpa) : '<span style="color:var(--text-muted);font-style:italic;">TBC</span>';
    const monthCell   = r.monthExpected || '<span style="color:var(--text-muted)">—</span>';
    return `
      <tr class="${rowClass}">
        <td title="${r.employer}">${r.employer}</td>
        <td title="${r.name}">${r.name}</td>
        <td title="${r.standard}">${r.standard}</td>
        <td>${fmtDate(r.plannedGateway)}</td>
        <td>${r.lsc}</td>
        <td>${oofStatusPill(r.status)}</td>
        <td>${monthCell}</td>
        <td>${prepCell}</td>
        <td style="text-align:center;">${portfolioRagBadge(r.portfolioRag)}</td>
        <td style="font-size:0.78rem;" title="${r.notes}">${r.notes}</td>
      </tr>`;
  }).join('');
}

function renderBILTable(lscFilter) {
  const tbody = document.getElementById('bil-tbody');
  if (!tbody) return;
  const rows = lscFilter ? BIL_DATA.filter(r => r.lsc === lscFilter) : BIL_DATA;
  const countEl = document.getElementById('bil-panel-count');
  if (countEl) countEl.textContent = rows.length + ' learner' + (rows.length !== 1 ? 's' : '');
  if (!rows.length) { tbody.innerHTML = emptyRow(9, 'No BIL learners for this coach.'); return; }
  tbody.innerHTML = rows.map(r => {
    const isNeeded = r.status === 'BIL Decision Needed';
    const rowClass = isNeeded ? 'row-alert' : '';
    const rtlCell  = r.expectedRtl ? fmtDate(r.expectedRtl) : '<span class="cell-alert">Not confirmed</span>';
    const gwCell   = r.plannedGateway ? fmtDate(r.plannedGateway) : '<span style="color:var(--text-muted)">—</span>';
    return `
      <tr class="${rowClass}">
        <td title="${r.employer}">${r.employer}</td>
        <td title="${r.name}">${r.name}</td>
        <td title="${r.standard}">${r.standard}</td>
        <td>${gwCell}</td>
        <td>${r.lsc}</td>
        <td>${bilStatusPill(r.status)}</td>
        <td>${fmtDate(r.ldol)}</td>
        <td>${rtlCell}</td>
        <td style="font-size:0.78rem;" title="${r.notes}">${r.notes}</td>
      </tr>`;
  }).join('');
}

function renderGWQuarterTable(tbodyId, panelCountId, data, lscFilter) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  const rows = lscFilter ? data.filter(r => r.lsc === lscFilter) : data;
  const countEl = document.getElementById(panelCountId);
  if (countEl) countEl.textContent = rows.length + ' learner' + (rows.length !== 1 ? 's' : '');
  if (!rows.length) { tbody.innerHTML = emptyRow(9, 'No gateway learners for this coach.'); return; }
  tbody.innerHTML = rows.map(r => {
    const isWithdrawn = r.status === 'Withdrawn';
    const isRed       = r.portfolioRag === 'red';
    const rowClass    = isWithdrawn ? 'row-withdrawn' : isRed ? 'row-alert' : '';
    const epaCell     = r.gwToEpa ? fmtDate(r.gwToEpa) : '<span style="color:var(--text-muted);font-style:italic;">TBC</span>';
    const monthCell   = r.monthExpected || '<span style="color:var(--text-muted)">—</span>';
    const gwCell      = r.plannedGateway ? fmtDate(r.plannedGateway) : '<span style="color:var(--text-muted)">—</span>';
    return `
      <tr class="${rowClass}">
        <td title="${r.employer}">${r.employer}</td>
        <td title="${r.name}">${r.name}</td>
        <td title="${r.standard}">${r.standard}</td>
        <td>${gwCell}</td>
        <td>${r.lsc}</td>
        <td>${oofStatusPill(r.status)}</td>
        <td>${monthCell}</td>
        <td>${epaCell}</td>
        <td style="text-align:center;">${portfolioRagBadge(r.portfolioRag)}</td>
      </tr>`;
  }).join('');
}

// ─── Gateway Pipeline ──────────────────────────────────────────────────
function getGatewayMonthKey() {
  const base = new Date(2026, 5, 1); // June 2026 = offset 0
  base.setMonth(base.getMonth() + gatewayOffset);
  return `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, '0')}`;
}


function renderGateway() {
  const key       = getGatewayMonthKey();
  const monthData = GATEWAY_MONTHS_DATA[key];
  const container = document.getElementById('gateway-container');

  // Month label
  const [yr, mo]  = key.split('-').map(Number);
  const label     = new Date(yr, mo - 1, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  setText('gw-month-label', label);

  if (!monthData) {
    setText('gw-forecast',   '—'); setText('gw-expected', '—');
    setText('gw-at-gateway', '—'); setText('gw-carry-over', '—');
    setText('gw-pct', '—%');       setText('gw-bar-sub', 'No data for this month');
    const bar = document.getElementById('gw-bar');
    if (bar) bar.style.width = '0%';
    if (container) container.innerHTML = '<p style="text-align:center;padding:2rem;color:var(--text-muted);font-style:italic;">No gateway data available for this month.</p>';
    return;
  }

  // Totals
  const allLearners = monthData.groups.flatMap(g => g.learners);
  const atGateway   = allLearners.filter(l => l.atGateway).length;
  const carryOver   = allLearners.filter(l => l.carryOverNext).length;
  const pct         = monthData.expected > 0
    ? Math.min(100, Math.round((atGateway / monthData.expected) * 100))
    : 0;

  // Progress bar + metrics
  setText('gw-forecast',    monthData.forecast);
  setText('gw-expected',    monthData.expected);
  setText('gw-at-gateway',  atGateway);
  setText('gw-carry-over',  carryOver);
  setText('gw-pct',         pct + '%');
  setText('gw-bar-sub',     `${atGateway} at gateway of ${monthData.expected} expected`);
  const bar = document.getElementById('gw-bar');
  if (bar) bar.style.width = pct + '%';

  if (!container) return;

  const tick = val => val
    ? '<span class="check-yes">✓</span>'
    : '<span class="check-no">–</span>';

  const theadHtml = `
    <thead>
      <tr>
        <th>Learner</th>
        <th>Standard</th>
        <th>Prep Meeting</th>
        <th style="text-align:center;">At Gateway</th>
        <th style="text-align:center;">Months Carried</th>
        <th style="text-align:center;">Carry Over</th>
        <th style="text-align:center;">Withdrawn</th>
        <th>Notes</th>
        <th style="text-align:center;">Rate</th>
      </tr>
    </thead>`;

  let html = '';

  monthData.groups.forEach(group => {
    const active    = group.learners.filter(l => !l.withdrawn);
    const groupAt   = group.learners.filter(l => l.atGateway).length;
    const groupExp  = active.length;
    const groupRate = groupExp > 0 ? Math.round((groupAt / groupExp) * 100) : 0;
    const rateClass = groupRate >= 75 ? 'rate-good' : groupRate >= 50 ? 'rate-medium' : 'rate-low';

    let rowsHtml = '';

    group.learners.forEach(l => {
      const rowClass = l.withdrawn ? 'row-withdrawn' : l.carryOverNext ? 'row-carry' : '';
      const prepCell = l.prepDate
        ? fmtDate(l.prepDate)
        : '<span style="color:var(--text-muted);font-style:italic;">TBC</span>';
      const carriedCell = l.monthsCarried > 0
        ? `<span class="months-carried-badge">${l.monthsCarried}</span>`
        : '<span class="check-no">–</span>';

      rowsHtml += `
        <tr class="${rowClass}">
          <td>${l.name}</td>
          <td>${l.standard}</td>
          <td>${prepCell}</td>
          <td style="text-align:center;">${tick(l.atGateway)}</td>
          <td style="text-align:center;">${carriedCell}</td>
          <td style="text-align:center;">${tick(l.carryOverNext)}</td>
          <td style="text-align:center;">${tick(l.withdrawn)}</td>
          <td>${l.notes || '<span style="color:var(--text-muted)">—</span>'}</td>
          <td></td>
        </tr>`;
    });

    // Summary row
    rowsHtml += `
      <tr class="lsc-summary-row">
        <td colspan="8" style="text-align:right;padding-right:1.25rem;font-style:italic;">
          ${group.lsc} &mdash; ${groupAt} of ${groupExp} at gateway
        </td>
        <td class="rate-cell ${rateClass}">${groupRate}%</td>
      </tr>`;

    html += `
      <div class="lsc-table-section">
        <div class="lsc-table-heading">${group.lsc}</div>
        <table class="data-table gateway-table">
          ${theadHtml}
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>`;
  });

  container.innerHTML = html;
}

// ─── Reporting ─────────────────────────────────────────────────────────

function reportFilterBy(data, filters) {
  return data.filter(r => {
    if (filters.lsc          && r.lsc          && r.lsc          !== filters.lsc)          return false;
    if (filters.employer     && r.employer     && r.employer     !== filters.employer)     return false;
    if (filters.standard     && r.standard     && r.standard     !== filters.standard)     return false;
    if (filters.status       && r.status       && r.status       !== filters.status)       return false;
    if (filters.portfolioRag && r.portfolioRag && r.portfolioRag !== filters.portfolioRag) return false;
    return true;
  });
}

function statusPill(status) {
  const map = {
    'Current':             'dd-status-current',
    'At Gateway':          'dd-status-gateway',
    'Withdrawn':           'dd-status-withdrawn',
    'BIL':                 'dd-status-bil',
    'BIL Ongoing':         'dd-status-bil',
    'BIL Decision Needed': 'dd-status-withdrawn',
    'RTL Confirmed':       'dd-status-gateway',
  };
  return `<span class="${map[status] || 'dd-status-current'}">${status}</span>`;
}

const REPORT_CONFIGS = {
  all: {
    label: 'All Areas — Cross-Provision View',
    columns: ['Area', 'Learner', 'Employer', 'LSC', 'Issue / Status', 'Detail'],
    getData(f) {
      const rows = [];
      reportFilterBy(TOUCHPOINT_DATA, f).forEach(r => rows.push({ _cols: [
        '<span class="area-badge area-compliance">Compliance</span>', r.name, r.employer, r.lsc,
        'Outstanding touchpoint', `Last: ${fmtDate(r.lastMeeting)}`
      ]}));
      reportFilterBy(SLA_DATA, f).forEach(r => rows.push({ _cols: [
        '<span class="area-badge area-compliance">Compliance</span>', r.name, r.employer, r.lsc,
        'SLA breach', `${r.weeksSince} weeks since last review`
      ]}));
      reportFilterBy(OTJ_DATA, f).forEach(r => rows.push({ _cols: [
        '<span class="area-badge area-compliance">Compliance</span>', r.name, r.employer, r.lsc,
        'No OTJ evidence', `${r.otjPct}% / ${r.otjExpected}% expected`
      ]}));
      reportFilterBy(OOF_DATA, f).forEach(r => rows.push({ _cols: [
        '<span class="area-badge area-delivery">Delivery</span>', r.name, r.employer, r.lsc,
        statusPill(r.status), portfolioRagBadge(r.portfolioRag)
      ], _rowClass: r.portfolioRag === 'red' ? 'row-alert' : '' }));
      reportFilterBy(BIL_DATA, f).forEach(r => rows.push({ _cols: [
        '<span class="area-badge area-delivery">Delivery</span>', r.name, r.employer, r.lsc,
        statusPill(r.status), r.expectedRtl ? `RTL: ${fmtDate(r.expectedRtl)}` : 'RTL TBC'
      ]}));
      reportFilterBy(SAFEGUARDING_DATA, f).forEach(r => rows.push({ _cols: [
        '<span class="area-badge area-welfare">Welfare</span>', r.name, '—', r.lsc,
        `<span class="${r.status === 'active' ? 'status-active' : 'status-closed'}">${r.status}</span>`,
        r.category
      ]}));
      return rows;
    }
  },
  touchpoints: {
    label: 'Outstanding Touchpoints',
    columns: ['Learner', 'Employer', 'LSC', 'Last Meeting', 'Meeting Type', 'Days Since'],
    getData(f) {
      return reportFilterBy(TOUCHPOINT_DATA, f).map(r => ({ _cols: [
        r.name, r.employer, r.lsc, fmtDate(r.lastMeeting), r.meetingType,
        Math.floor((new Date('2026-06-04') - new Date(r.lastMeeting)) / 86400000) + ' days'
      ]}));
    }
  },
  sla: {
    label: 'SLA Breaches — Progress Reviews >10 Weeks',
    columns: ['Learner', 'Employer', 'LSC', 'Last Review', 'Weeks Since'],
    getData(f) {
      return reportFilterBy(SLA_DATA, f).map(r => ({ _cols: [
        r.name, r.employer, r.lsc, fmtDate(r.lastReview), r.weeksSince + ' weeks'
      ]}));
    }
  },
  otj: {
    label: 'OTJ Compliance',
    columns: ['Learner', 'Employer', 'LSC', 'OTJ %', 'Expected %', 'Gap', 'Last Entry'],
    getData(f) {
      return reportFilterBy(OTJ_DATA, f).map(r => {
        const gap = r.otjExpected - r.otjPct;
        return { _cols: [
          r.name, r.employer, r.lsc,
          r.otjPct + '%', r.otjExpected + '%',
          gap > 0 ? `−${gap}%` : '✓',
          fmtDate(r.lastEntry)
        ], _rowClass: gap > 15 ? 'row-alert' : '' };
      });
    }
  },
  starters: {
    label: 'Awaiting First LSC Meeting',
    columns: ['Learner', 'Employer', 'LSC', 'Planned Start', 'FDOL Entry', 'Starter Checklist'],
    getData(f) {
      return reportFilterBy(STARTER_DATA, f).map(r => ({ _cols: [
        r.name, r.employer, r.lsc, fmtDate(r.plannedStart),
        r.firstDayDone  ? '<span class="check-yes">✓</span>' : '<span class="check-no">—</span>',
        r.checklistDone ? '<span class="check-yes">✓</span>' : '<span class="check-no">—</span>',
      ]}));
    }
  },
  oof: {
    label: 'Out of Funding (OOF)',
    columns: ['Learner', 'Employer', 'Standard', 'LSC', 'Status', 'Portfolio RAG', 'Month Expected', 'Notes'],
    getData(f) {
      return reportFilterBy(OOF_DATA, f).map(r => ({ _cols: [
        r.name, r.employer, r.standard, r.lsc,
        statusPill(r.status), portfolioRagBadge(r.portfolioRag),
        r.monthExpected || '—', r.notes
      ], _wideCol: 7 }));
    }
  },
  bil: {
    label: 'Break in Learning (BIL)',
    columns: ['Learner', 'Employer', 'Standard', 'LSC', 'Status', 'LDOL', 'Expected RTL', 'Notes'],
    getData(f) {
      return reportFilterBy(BIL_DATA, f).map(r => ({ _cols: [
        r.name, r.employer, r.standard, r.lsc,
        statusPill(r.status), fmtDate(r.ldol),
        r.expectedRtl ? fmtDate(r.expectedRtl) : '—', r.notes
      ], _wideCol: 7 }));
    }
  },
  gateway: {
    label: 'Gateway Pipeline — All Quarters',
    columns: ['Learner', 'Employer', 'Standard', 'LSC', 'Quarter', 'Status', 'Planned Gateway', 'Month Expected', 'Portfolio RAG'],
    getData(f) {
      const q = (src, label) => reportFilterBy(src, f).map(r => ({ _cols: [
        r.name, r.employer, r.standard, r.lsc, label,
        statusPill(r.status), fmtDate(r.plannedGateway),
        r.monthExpected || '—', portfolioRagBadge(r.portfolioRag)
      ]}));
      return [...q(GW_Q2_DATA, 'Q2 2026'), ...q(GW_Q3_DATA, 'Q3 2026'), ...q(GW_Q4_DATA, 'Q4 2026')];
    }
  },
  welfare_als: {
    label: 'ALS Register',
    columns: ['Learner', 'Standard', 'LSC', 'Need', 'Last Review', 'Next Review', 'Status'],
    getData(f) {
      return reportFilterBy(ALS_DATA, f).map(r => {
        const rag = alsReviewRag(r.nextReview);
        return { _cols: [
          r.name, r.standard, r.lsc, r.need,
          fmtDate(r.lastReview), fmtDate(r.nextReview),
          `<span class="weeks-pill ${rag.cls}">${rag.label}</span>`
        ], _rowClass: rag.cls === 'urgent' ? 'row-alert' : '' };
      });
    }
  },
  welfare_safeguarding: {
    label: 'Safeguarding & Welfare Concerns',
    columns: ['Learner', 'LSC', 'Category', 'Status', 'Date Raised', 'Last Action', 'Notes'],
    getData(f) {
      return reportFilterBy(SAFEGUARDING_DATA, f).map(r => ({ _cols: [
        r.name, r.lsc, r.category,
        `<span class="${r.status === 'active' ? 'status-active' : 'status-closed'}">${r.status}</span>`,
        fmtDate(r.dateRaised), fmtDate(r.lastAction), r.notes
      ], _wideCol: 6 }));
    }
  },
  pipeline: {
    label: 'Sales Pipeline',
    columns: ['Learner', 'Employer', 'Standard', 'AM', 'Probability', 'Expected Start', 'Status'],
    getData(f) {
      return reportFilterBy(PIPELINE_ENTRIES, f).map(r => ({ _cols: [
        r.name, r.employer, r.standard, r.am,
        r.prob + '%', fmtDate(r.start), salesStatusPill(r.status)
      ]}));
    }
  }
};

const REPORT_PRESETS = [
  { id: 'otj',          area: 'otj',                  extra: {} },
  { id: 'sla',          area: 'sla',                  extra: {} },
  { id: 'touchpoints',  area: 'touchpoints',          extra: {} },
  { id: 'oof-red',      area: 'oof',                  extra: { portfolioRag: 'red' } },
  { id: 'bil-decision', area: 'bil',                  extra: { status: 'BIL Decision Needed' } },
  { id: 'welfare',      area: 'welfare_safeguarding',  extra: { status: 'active' } },
  { id: 'gateway',      area: 'gateway',              extra: {} },
  { id: 'pipeline',     area: 'pipeline',             extra: {} },
];

let activeReportConfig = null;
let activeReportRows   = [];

function getReportFilters() {
  return {
    lsc:          document.getElementById('rf-lsc')?.value      || '',
    standard:     document.getElementById('rf-standard')?.value || '',
    employer:     document.getElementById('rf-employer')?.value || '',
    status:       document.getElementById('rf-status')?.value   || '',
    portfolioRag: document.getElementById('rf-rag')?.value      || '',
  };
}

function runReport(areaOverride, extraFilters) {
  const area   = areaOverride || document.getElementById('rf-area')?.value || 'all';
  const filters = { ...getReportFilters(), ...(extraFilters || {}) };
  const config  = REPORT_CONFIGS[area];
  if (!config) return;

  const rows = config.getData(filters);
  activeReportConfig = config;
  activeReportRows   = rows;

  setText('report-results-title', config.label);
  const countEl = document.getElementById('report-results-count');
  if (countEl) countEl.textContent = rows.length + ' record' + (rows.length !== 1 ? 's' : '');

  const thead = document.getElementById('report-thead');
  if (thead) thead.innerHTML = `<tr>${config.columns.map(c => `<th>${c}</th>`).join('')}</tr>`;

  const tbody = document.getElementById('report-tbody');
  if (tbody) {
    tbody.innerHTML = rows.length === 0
      ? `<tr><td colspan="${config.columns.length}" class="empty-row">No records match the selected filters.</td></tr>`
      : rows.map(r => {
          const cls   = r._rowClass ? ` class="${r._rowClass}"` : '';
          const cells = r._cols.map((v, i) =>
            `<td${r._wideCol === i ? ' style="font-size:0.78rem;max-width:240px;white-space:normal;"' : ''}>${v}</td>`
          ).join('');
          return `<tr${cls}>${cells}</tr>`;
        }).join('');
  }

  const panel  = document.getElementById('report-results-panel');
  const expBtn = document.getElementById('report-export-btn');
  if (panel)  panel.style.display  = '';
  if (expBtn) expBtn.style.display = '';
}

function exportReportCSV() {
  if (!activeReportConfig || !activeReportRows.length) return;
  const strip = s => String(s).replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/−/g, '-').replace(/—/g, '-').replace(/✓/g, 'Yes');
  const esc   = s => `"${strip(s).replace(/"/g, '""')}"`;
  const csv   = [
    activeReportConfig.columns.map(esc).join(','),
    ...activeReportRows.map(r => r._cols.map(esc).join(','))
  ].join('\n');
  const a = Object.assign(document.createElement('a'), {
    href:     URL.createObjectURL(new Blob([csv], { type: 'text/csv' })),
    download: 'boom-report.csv',
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

function populateEmployerDropdown() {
  const sel = document.getElementById('rf-employer');
  if (!sel) return;
  const employers = new Set(
    [TOUCHPOINT_DATA, SLA_DATA, OTJ_DATA, STARTER_DATA, OOF_DATA, BIL_DATA,
     GW_Q2_DATA, GW_Q3_DATA, GW_Q4_DATA, PIPELINE_ENTRIES]
      .flatMap(arr => arr.map(r => r.employer).filter(Boolean))
  );
  [...employers].sort().forEach(e => {
    const opt = document.createElement('option');
    opt.value = opt.textContent = e;
    sel.appendChild(opt);
  });
}

document.querySelectorAll('.report-preset-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    const preset = REPORT_PRESETS.find(p => p.id === btn.dataset.preset);
    if (!preset) return;
    document.querySelectorAll('.report-preset-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const areaEl = document.getElementById('rf-area');
    if (areaEl) areaEl.value = preset.area;
    if (preset.extra.portfolioRag) { const el = document.getElementById('rf-rag');    if (el) el.value = preset.extra.portfolioRag; }
    if (preset.extra.status)       { const el = document.getElementById('rf-status'); if (el) el.value = preset.extra.status; }
    runReport(preset.area, preset.extra);
  });
});

document.getElementById('report-run-btn')?.addEventListener('click', () => {
  document.querySelectorAll('.report-preset-pill').forEach(b => b.classList.remove('active'));
  runReport();
});

document.getElementById('report-clear-btn')?.addEventListener('click', () => {
  ['rf-lsc', 'rf-standard', 'rf-employer', 'rf-status', 'rf-rag'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  const areaEl = document.getElementById('rf-area'); if (areaEl) areaEl.value = 'all';
  document.querySelectorAll('.report-preset-pill').forEach(b => b.classList.remove('active'));
  const panel  = document.getElementById('report-results-panel');
  const expBtn = document.getElementById('report-export-btn');
  if (panel)  panel.style.display  = 'none';
  if (expBtn) expBtn.style.display = 'none';
});

document.getElementById('report-export-btn')?.addEventListener('click', exportReportCSV);

populateEmployerDropdown();

// ─── Init ──────────────────────────────────────────────────────────────
renderUserSwitcher();
applyRolePermissions();
renderAll();
renderPipeline();
renderGateway();
renderWelfare();
renderDeliveryDash();

console.log('Boom Training Dashboard loaded ✅');
