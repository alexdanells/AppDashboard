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

// Table 2: Progress Reviews — 8+ weeks since last review (sorted weeksSince desc)
const SLA_DATA = [
  { name: 'Destiny Osei',    employer: 'Bright Digital Agency',  lsc: 'Hannah Clarke',  lastReview: '2026-01-26', weeksSince: 17 },
  { name: 'Harry Singh',     employer: 'Pinnacle Finance Group', lsc: 'Tom Bradley',    lastReview: '2026-02-02', weeksSince: 16 },
  { name: 'Grace Adeniran',  employer: 'DataSphere Analytics',   lsc: 'James Okafor',   lastReview: '2026-02-05', weeksSince: 16 },
  { name: 'Quinn Andrews',   employer: 'TechCore UK',            lsc: 'James Okafor',   lastReview: '2026-02-13', weeksSince: 15 },
  { name: 'Imani Adeyemi',   employer: 'Greenfield Consulting',  lsc: 'Hannah Clarke',  lastReview: '2026-02-20', weeksSince: 14 },
  { name: 'Noah Williams',   employer: 'Horizon Analytics',      lsc: 'Hannah Clarke',  lastReview: '2026-02-27', weeksSince: 13 },
  { name: 'Felix Huang',     employer: 'Meridian Consulting',    lsc: 'Sarah Mitchell', lastReview: '2026-03-06', weeksSince: 12 },
  { name: 'Callum Fraser',   employer: 'Sterling Accounts',      lsc: 'Tom Bradley',    lastReview: '2026-03-13', weeksSince: 11 },
  { name: 'Leo Okafor',      employer: 'Clarity Finance Ltd',    lsc: 'James Okafor',   lastReview: '2026-03-20', weeksSince: 10 },
  { name: 'Ben Cartwright',  employer: 'TechCore UK',            lsc: 'James Okafor',   lastReview: '2026-04-01', weeksSince: 9  },
  { name: 'Maya Thompson',   employer: 'Urban Digital Ltd',      lsc: 'Tom Bradley',    lastReview: '2026-04-03', weeksSince: 9  },
  { name: 'Patrick Doherty', employer: 'Apex Digital Ltd',       lsc: 'Sarah Mitchell', lastReview: '2026-04-10', weeksSince: 8  },
  { name: 'Ellie Forsyth',   employer: 'Nova Solutions',         lsc: 'Priya Sharma',   lastReview: '2026-04-12', weeksSince: 8  },
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
  { name: 'Amara Osei',     employer: 'Bright Digital Agency',  standard: 'Data Technician',         lsc: 'Sarah Mitchell', plannedStart: '2026-05-05', firstDayDone: true,  checklistDone: true  },
  { name: 'Ethan Brooks',   employer: 'Pinnacle Finance Group', standard: 'Data Analyst',            lsc: 'James Okafor',   plannedStart: '2026-05-12', firstDayDone: true,  checklistDone: true  },
  { name: 'Fatima Malik',   employer: 'DataSphere Analytics',   standard: 'Data Analyst',            lsc: 'Priya Sharma',   plannedStart: '2026-05-12', firstDayDone: false, checklistDone: false },
  { name: 'George Baker',   employer: 'Urban Digital Ltd',      standard: 'Data Technician',         lsc: 'Tom Bradley',    plannedStart: '2026-05-19', firstDayDone: true,  checklistDone: false },
  { name: 'Holly Nguyen',   employer: 'Apex Digital Ltd',       standard: 'Data Technician',         lsc: 'Hannah Clarke',  plannedStart: '2026-05-19', firstDayDone: false, checklistDone: false },
  { name: 'Isaac Rivera',   employer: 'Clarity Finance Ltd',    standard: 'Data Analyst',            lsc: 'Sarah Mitchell', plannedStart: '2026-05-26', firstDayDone: false, checklistDone: false },
  { name: 'Jade Thompson',  employer: 'Nova Solutions',         standard: 'Multi-Channel Marketer',  lsc: 'James Okafor',   plannedStart: '2026-05-26', firstDayDone: false, checklistDone: false },
  { name: 'Kyle Patterson', employer: 'Greenfield Consulting',  standard: 'Data Technician',         lsc: 'Priya Sharma',   plannedStart: '2026-05-26', firstDayDone: false, checklistDone: false },
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

// ─── Curriculum Data ───────────────────────────────────────────────────

const CURRICULUM_STRUCTURE = {
  'Data Technician': [
    { sprint: 'AI Literacy',                   parts: ['Introduction to AI', 'Prompting for Best Outcomes'] },
    { sprint: 'AI Applications in Business L3', parts: ['AI for Productivity & Spreadsheets', 'Automations with No-Code Tools', 'Python Programming with AI'] },
    { sprint: 'AI for Data Analytics L3',       parts: ['AI as a SQL Database Assistant', 'AI for Analytical Insights'] },
  ],
  'Data Analyst': [
    { sprint: 'Introduction to Data Analytics L4 v2', parts: ['Structured Approach to Data Analytics', 'Utilising Spreadsheets for Data Analytics', 'SQL & Databases'] },
    { sprint: 'Python Foundations L4 v2',             parts: ['First Steps in Programming', 'Data Processing with Pandas'] },
    { sprint: 'Module to be Selected',                parts: ['Visualising Data Using Tableau', 'Data Visualisation with Python'] },
    { sprint: 'Main Analysis Types L4',               parts: ['Statistical Inference & A/B Testing'] },
  ],
  'Applied AI & Automation': [
    { sprint: 'L4 AI Copilot AI Literacy',              parts: ['Introduction to AI', 'Prompting for Best Outcomes', 'Responsible AI Adoption & Stakeholder Enablement'] },
    { sprint: 'L4 AI Copilot No Code AI Applications',  parts: ['AI for Productivity', 'Automations with No-Code Tools', 'Building AI-Native Apps', 'Problem-Solution Discovery and Alignment'] },
    { sprint: 'L4 AI Copilot Low Code AI Applications', parts: ['Python Programming with AI', 'AI-Assisted Development', 'Evaluating Consistency, Scalability and Security of AI solutions'] },
  ],
};

const CURRICULUM_DATA = [
  // ─── Data Technician ─────────────────────────────────────────────────
  { name: 'Amara Osei',     employer: 'Bright Digital Agency',  standard: 'Data Technician',         lsc: 'Sarah Mitchell', sprint: 'AI Literacy',                        partsComplete: 6, partsExpected: 7, lastActivity: '2026-05-28' },
  { name: 'Isla Thomson',   employer: 'TechCore UK',            standard: 'Data Technician',         lsc: 'Sarah Mitchell', sprint: 'AI for Data Analytics L3',            partsComplete: 7, partsExpected: 6, lastActivity: '2026-06-02' },
  { name: 'Ethan Brooks',   employer: 'DataSphere Analytics',   standard: 'Data Technician',         lsc: 'James Okafor',   sprint: 'AI Literacy',                        partsComplete: 4, partsExpected: 4, lastActivity: '2026-05-30' },
  { name: 'Grace Adeniran', employer: 'DataSphere Analytics',   standard: 'Data Technician',         lsc: 'James Okafor',   sprint: 'AI Applications in Business L3',      partsComplete: 3, partsExpected: 5, lastActivity: '2026-05-12' },
  { name: 'Kyle Patterson', employer: 'Greenfield Consulting',  standard: 'Data Technician',         lsc: 'Priya Sharma',   sprint: 'AI Applications in Business L3',      partsComplete: 3, partsExpected: 5, lastActivity: '2026-05-15' },
  { name: 'George Baker',   employer: 'Urban Digital Ltd',      standard: 'Data Technician',         lsc: 'Tom Bradley',    sprint: 'AI Applications in Business L3',      partsComplete: 5, partsExpected: 5, lastActivity: '2026-06-01' },
  { name: 'Victor Marsh',   employer: 'Greenfield Consulting',  standard: 'Data Technician',         lsc: 'Tom Bradley',    sprint: 'AI Applications in Business L3',      partsComplete: 7, partsExpected: 6, lastActivity: '2026-06-03' },
  { name: 'Holly Nguyen',   employer: 'Apex Digital Ltd',       standard: 'Data Technician',         lsc: 'Hannah Clarke',  sprint: 'AI Applications in Business L3',      partsComplete: 2, partsExpected: 6, lastActivity: '2026-04-10' },
  { name: 'Reuben Adeyemi', employer: 'Bloom Marketing Co.',    standard: 'Data Technician',         lsc: 'Hannah Clarke',  sprint: 'AI for Data Analytics L3',            partsComplete: 1, partsExpected: 4, lastActivity: '2026-04-01' },
  // ─── Data Analyst ────────────────────────────────────────────────────
  { name: 'Jordan Ellis',    employer: 'Apex Digital Ltd',       standard: 'Data Analyst',            lsc: 'Tom Bradley',    sprint: 'Introduction to Data Analytics L4 v2', partsComplete: 5, partsExpected: 5, lastActivity: '2026-05-29' },
  { name: 'Tara Collins',    employer: 'Sterling Accounts',      standard: 'Data Analyst',            lsc: 'Tom Bradley',    sprint: 'Module to be Selected',                partsComplete: 6, partsExpected: 5, lastActivity: '2026-06-02' },
  { name: 'Olivia Fraser',   employer: 'Meridian Consulting',    standard: 'Data Analyst',            lsc: 'James Okafor',   sprint: 'Introduction to Data Analytics L4 v2', partsComplete: 7, partsExpected: 6, lastActivity: '2026-06-01' },
  { name: 'Riya Sharma',     employer: 'DataSphere Analytics',   standard: 'Data Analyst',            lsc: 'James Okafor',   sprint: 'Python Foundations L4 v2',             partsComplete: 3, partsExpected: 4, lastActivity: '2026-05-20' },
  { name: 'Luca Ferretti',   employer: 'NovaTech Solutions',     standard: 'Data Analyst',            lsc: 'Priya Sharma',   sprint: 'Introduction to Data Analytics L4 v2', partsComplete: 6, partsExpected: 6, lastActivity: '2026-06-01' },
  { name: 'Fatima Malik',    employer: 'DataSphere Analytics',   standard: 'Data Analyst',            lsc: 'Priya Sharma',   sprint: 'Python Foundations L4 v2',             partsComplete: 2, partsExpected: 5, lastActivity: '2026-04-18' },
  { name: 'Yasmin Al-Hassan',employer: 'Clarity Finance Ltd',    standard: 'Data Analyst',            lsc: 'Sarah Mitchell', sprint: 'Main Analysis Types L4',               partsComplete: 4, partsExpected: 6, lastActivity: '2026-05-05' },
  { name: 'Nathan Brooks',   employer: 'TechCore UK',            standard: 'Data Analyst',            lsc: 'Hannah Clarke',  sprint: 'Python Foundations L4 v2',             partsComplete: 1, partsExpected: 5, lastActivity: '2026-03-28' },
  { name: 'Sam Davies',      employer: 'Sterling Accounts',      standard: 'Data Analyst',            lsc: 'Hannah Clarke',  sprint: 'Main Analysis Types L4',               partsComplete: 2, partsExpected: 5, lastActivity: '2026-04-22' },
  // ─── Applied AI & Automation ─────────────────────────────────────────
  { name: 'Tasha Morris',    employer: 'Apex Digital Ltd',       standard: 'Applied AI & Automation', lsc: 'Sarah Mitchell', sprint: 'L4 AI Copilot No Code AI Applications',  partsComplete: 6, partsExpected: 5, lastActivity: '2026-06-03' },
  { name: 'Kira Patel',      employer: 'Future Tech Services',   standard: 'Applied AI & Automation', lsc: 'Sarah Mitchell', sprint: 'L4 AI Copilot AI Literacy',               partsComplete: 5, partsExpected: 4, lastActivity: '2026-05-25' },
  { name: 'Quinn Andrews',   employer: 'TechCore UK',            standard: 'Applied AI & Automation', lsc: 'James Okafor',   sprint: 'L4 AI Copilot AI Literacy',               partsComplete: 3, partsExpected: 6, lastActivity: '2026-04-20' },
  { name: 'Patrick Marsh',   employer: 'Pinnacle Finance Group', standard: 'Applied AI & Automation', lsc: 'James Okafor',   sprint: 'L4 AI Copilot No Code AI Applications',  partsComplete: 3, partsExpected: 5, lastActivity: '2026-05-10' },
  { name: 'Maya Patel',      employer: 'Greenfield Consulting',  standard: 'Applied AI & Automation', lsc: 'Priya Sharma',   sprint: 'L4 AI Copilot AI Literacy',               partsComplete: 4, partsExpected: 4, lastActivity: '2026-05-28' },
  { name: 'Xena Park',       employer: 'Urban Digital Ltd',      standard: 'Applied AI & Automation', lsc: 'Tom Bradley',    sprint: 'L4 AI Copilot Low Code AI Applications',  partsComplete: 5, partsExpected: 5, lastActivity: '2026-06-01' },
  { name: 'Freddie Marsh',   employer: 'Pinnacle Finance Group', standard: 'Applied AI & Automation', lsc: 'Tom Bradley',    sprint: 'L4 AI Copilot Low Code AI Applications',  partsComplete: 1, partsExpected: 4, lastActivity: '2026-04-12' },
  { name: 'Will Thornton',   employer: 'Clarity Finance Ltd',    standard: 'Applied AI & Automation', lsc: 'Hannah Clarke',  sprint: 'L4 AI Copilot No Code AI Applications',  partsComplete: 2, partsExpected: 6, lastActivity: '2026-04-05' },
];

// ─── Learner Voice Data ────────────────────────────────────────────────

const LEARNER_COMMENTS_DATA = [
  { name: 'Amara Osei',     employer: 'Bright Digital Agency',  lsc: 'Sarah Mitchell', lastReview: '2026-05-20', comment: "I'm really enjoying the Python modules — they've already helped me at work. I'd love more practice exercises alongside the theory." },
  { name: 'Isla Thomson',   employer: 'TechCore UK',            lsc: 'Sarah Mitchell', lastReview: '2026-05-15', comment: "The SQL content has been challenging but really relevant to my day job. My LSC is always on hand when I get stuck, which makes a big difference." },
  { name: 'Quinn Andrews',  employer: 'TechCore UK',            lsc: 'James Okafor',   lastReview: '2026-04-30', comment: "Feeling confident about gateway now. The AI modules have been the most engaging part of the programme for me by far." },
  { name: 'Grace Adeniran', employer: 'DataSphere Analytics',   lsc: 'James Okafor',   lastReview: '2026-04-10', comment: "The BIL period has been difficult but I appreciate the support from my LSC throughout. Looking forward to returning in August." },
  { name: 'Kyle Patterson', employer: 'Greenfield Consulting',  lsc: 'Priya Sharma',   lastReview: '2026-05-12', comment: "Really engaged with the automation content. My employer has already started using some of the tools I've introduced from the programme." },
  { name: 'Maya Patel',     employer: 'Greenfield Consulting',  lsc: 'Priya Sharma',   lastReview: '2026-05-28', comment: "Brilliant programme overall. The practical elements are well-designed and directly relevant to my role. Gateway prep is going really well." },
  { name: 'Victor Marsh',   employer: 'Greenfield Consulting',  lsc: 'Tom Bradley',    lastReview: '2026-05-22', comment: "Good progress this month. The data analytics content is stretching me but I can clearly see the improvement I'm making week on week." },
  { name: 'Tara Collins',   employer: 'Sterling Accounts',      lsc: 'Tom Bradley',    lastReview: '2026-05-18', comment: "Really positive experience throughout. My line manager is fully supportive and allocates protected time for learning activities." },
  { name: 'Nathan Brooks',  employer: 'TechCore UK',            lsc: 'Hannah Clarke',  lastReview: '2026-05-05', comment: "Finding the statistics module hard going but I know it's important for the EPA. My LSC has been very patient and provides great resources." },
  { name: 'Reuben Adeyemi', employer: 'Bloom Marketing Co.',    lsc: 'Hannah Clarke',  lastReview: '2026-04-28', comment: "Thoroughly enjoying the programme. The blend of theory and practical application works really well for how I learn." },
];

const EMPLOYER_COMMENTS_DATA = [
  { name: 'Amara Osei',     lineManager: 'James Thornton',  employer: 'Bright Digital Agency',  lsc: 'Sarah Mitchell', lastReview: '2026-05-20', comment: "Amara is applying her learning immediately. We've seen real improvement in how she approaches data tasks. Excellent programme and great support from the coach." },
  { name: 'Isla Thomson',   lineManager: 'Rebecca Walsh',   employer: 'TechCore UK',            lsc: 'Sarah Mitchell', lastReview: '2026-05-15', comment: "Isla is growing in confidence week on week. The SQL skills she's developing are already being used in live client projects." },
  { name: 'Quinn Andrews',  lineManager: 'David Park',      employer: 'TechCore UK',            lsc: 'James Okafor',   lastReview: '2026-04-30', comment: "Quinn is one of our strongest apprentices. His AI and automation work has already saved the team several hours a week on repetitive tasks." },
  { name: 'Kyle Patterson', lineManager: 'Fiona Greenwood', employer: 'Greenfield Consulting',  lsc: 'Priya Sharma',   lastReview: '2026-05-12', comment: "Kyle's enthusiasm is infectious. We've been genuinely impressed by how proactively he shares his learning with the wider team." },
  { name: 'Luca Ferretti',  lineManager: 'Marco Rossi',     employer: 'NovaTech Solutions',     lsc: 'Priya Sharma',   lastReview: '2026-05-08', comment: "Good progress overall. Luca occasionally needs prompting to submit OTJ evidence but his practical skills are developing strongly." },
  { name: 'Victor Marsh',   lineManager: 'Sarah Connelly',  employer: 'Greenfield Consulting',  lsc: 'Tom Bradley',    lastReview: '2026-05-22', comment: "Victor has added real value to the team. The data skills he's gaining are immediately applicable to our everyday work." },
  { name: 'Jordan Ellis',   lineManager: 'Chris Hamilton',  employer: 'Apex Digital Ltd',       lsc: 'Tom Bradley',    lastReview: '2026-05-19', comment: "Jordan is progressing well and is popular with the team. We're fully committed to supporting him throughout the apprenticeship journey." },
  { name: 'Nathan Brooks',  lineManager: 'Helen Yates',     employer: 'TechCore UK',            lsc: 'Hannah Clarke',  lastReview: '2026-05-05', comment: "Nathan is a committed learner. He finds the academic writing element challenging but he is steadily improving with support." },
  { name: 'Reuben Adeyemi', lineManager: 'Tony Okonkwo',    employer: 'Bloom Marketing Co.',    lsc: 'Hannah Clarke',  lastReview: '2026-04-28', comment: "Reuben is an asset to the team. His willingness to apply his learning in real-world scenarios immediately is outstanding." },
];

const EXIT_REVIEW_DATA = [
  { name: 'Callum Nash',   standard: 'Applied AI & Automation', lsc: 'Tom Bradley',   exitStatus: 'Withdrawn', comment: "Left due to personal reasons unrelated to the programme. Spoke highly of the learning content and LSC support throughout his time on programme." },
  { name: 'Willow James',  standard: 'Assistant Accountant',    lsc: 'Hannah Clarke', exitStatus: 'Withdrawn', comment: "Employer ceased trading. Learner expressed strong interest in continuing with a new employer but family circumstances prevented a transfer being arranged in time." },
  { name: 'Noah Williams', standard: 'Data Analyst',            lsc: 'Hannah Clarke', exitStatus: 'Withdrawn', comment: "Withdrew following ongoing mental health challenges. Received full welfare and safeguarding support throughout. Left on positive terms with the programme team." },
  { name: 'Destiny Osei',  standard: 'Multi-Channel Marketer',  lsc: 'Hannah Clarke', exitStatus: 'Withdrawn', comment: "Employer ceased trading mid-programme. Learner was performing well and expressed genuine disappointment at being unable to complete her qualification." },
  { name: 'Callum Fraser', standard: 'Assistant Accountant',    lsc: 'Tom Bradley',   exitStatus: 'Withdrawn', comment: "Financial hardship concerns were successfully resolved with external signposting. Learner subsequently secured a higher-paid role and chose to withdraw voluntarily." },
];

// ─── KSB Tracker Data ──────────────────────────────────────────────────
const KSB_STANDARDS = {
  'Data Technician':         { knowledge: 52, skills: 32, behaviours: 8  },
  'Applied AI & Automation': { knowledge: 58, skills: 58, behaviours: 12 },
  'Data Analyst':            { knowledge: 30, skills: 30, behaviours: 14 },
};

const KSB_DATA = [
  // ─── Sarah Mitchell ───────────────────────────────────────────────────
  { employer: 'Bright Digital Agency',  name: 'Amara Osei',      standard: 'Data Technician',         lsc: 'Sarah Mitchell', startDate: '2024-09-02', plannedGateway: '2026-06-15', status: 'Gateway', knowledgePct: 95, skillsPct: 88, behavioursPct: 100 },
  { employer: 'TechCore UK',            name: 'Isla Thomson',     standard: 'Data Technician',         lsc: 'Sarah Mitchell', startDate: '2024-11-04', plannedGateway: '2026-08-20', status: 'Live',    knowledgePct: 70, skillsPct: 65, behavioursPct: 75  },
  { employer: 'Apex Digital Ltd',       name: 'Tasha Morris',     standard: 'Applied AI & Automation', lsc: 'Sarah Mitchell', startDate: '2025-01-06', plannedGateway: '2026-07-10', status: 'Live',    knowledgePct: 45, skillsPct: 40, behavioursPct: 50  },
  { employer: 'Future Tech Services',   name: 'Kira Patel',       standard: 'Applied AI & Automation', lsc: 'Sarah Mitchell', startDate: '2025-03-10', plannedGateway: '2026-09-01', status: 'Live',    knowledgePct: 30, skillsPct: 25, behavioursPct: 35  },
  { employer: 'Clarity Finance Ltd',    name: 'Yasmin Al-Hassan', standard: 'Data Analyst',            lsc: 'Sarah Mitchell', startDate: '2024-12-02', plannedGateway: '2026-12-10', status: 'Live',    knowledgePct: 15, skillsPct: 10, behavioursPct: 20  },
  { employer: 'Meridian Consulting',    name: 'Felix Huang',      standard: 'Data Analyst',            lsc: 'Sarah Mitchell', startDate: '2024-08-14', plannedGateway: '2026-06-30', status: 'OOF',     knowledgePct: 65, skillsPct: 60, behavioursPct: 70  },
  // ─── James Okafor ─────────────────────────────────────────────────────
  { employer: 'TechCore UK',            name: 'Quinn Andrews',    standard: 'Applied AI & Automation', lsc: 'James Okafor',   startDate: '2024-09-15', plannedGateway: '2026-06-10', status: 'Gateway', knowledgePct: 90, skillsPct: 85, behavioursPct: 95  },
  { employer: 'Clarity Finance Ltd',    name: 'Leo Okafor',       standard: 'Data Analyst',            lsc: 'James Okafor',   startDate: '2024-10-01', plannedGateway: '2026-06-25', status: 'Gateway', knowledgePct: 85, skillsPct: 80, behavioursPct: 90  },
  { employer: 'DataSphere Analytics',   name: 'Grace Adeniran',   standard: 'Data Technician',         lsc: 'James Okafor',   startDate: '2025-02-01', plannedGateway: '2026-09-15', status: 'BIL',     knowledgePct: 55, skillsPct: 50, behavioursPct: 60  },
  { employer: 'DataSphere Analytics',   name: 'Riya Sharma',      standard: 'Data Analyst',            lsc: 'James Okafor',   startDate: '2025-03-01', plannedGateway: '2026-09-23', status: 'Live',    knowledgePct: 40, skillsPct: 35, behavioursPct: 45  },
  { employer: 'Pinnacle Finance Group', name: 'Patrick Marsh',    standard: 'Applied AI & Automation', lsc: 'James Okafor',   startDate: '2025-01-01', plannedGateway: '2026-12-01', status: 'Live',    knowledgePct: 20, skillsPct: 15, behavioursPct: 25  },
  // ─── Priya Sharma ─────────────────────────────────────────────────────
  { employer: 'Greenfield Consulting',  name: 'Kyle Patterson',   standard: 'Data Technician',         lsc: 'Priya Sharma',   startDate: '2024-12-01', plannedGateway: '2026-07-15', status: 'Live',    knowledgePct: 65, skillsPct: 60, behavioursPct: 70  },
  { employer: 'DataSphere Analytics',   name: 'Fatima Malik',     standard: 'Data Analyst',            lsc: 'Priya Sharma',   startDate: '2025-02-01', plannedGateway: '2026-10-01', status: 'BIL',     knowledgePct: 50, skillsPct: 45, behavioursPct: 55  },
  { employer: 'NovaTech Solutions',     name: 'Luca Ferretti',    standard: 'Data Analyst',            lsc: 'Priya Sharma',   startDate: '2025-01-15', plannedGateway: '2026-08-20', status: 'Live',    knowledgePct: 40, skillsPct: 35, behavioursPct: 40  },
  { employer: 'Greenfield Consulting',  name: 'Maya Patel',       standard: 'Applied AI & Automation', lsc: 'Priya Sharma',   startDate: '2025-01-01', plannedGateway: '2026-07-01', status: 'Live',    knowledgePct: 75, skillsPct: 70, behavioursPct: 80  },
  { employer: 'Bloom Marketing Co.',    name: 'Uma Sharma',       standard: 'Applied AI & Automation', lsc: 'Priya Sharma',   startDate: '2025-04-01', plannedGateway: '2026-11-01', status: 'BIL',     knowledgePct: 25, skillsPct: 20, behavioursPct: 30  },
  // ─── Tom Bradley ──────────────────────────────────────────────────────
  { employer: 'Pinnacle Finance Group', name: 'Harry Singh',      standard: 'Data Technician',         lsc: 'Tom Bradley',    startDate: '2024-08-01', plannedGateway: '2026-07-30', status: 'OOF',     knowledgePct: 40, skillsPct: 35, behavioursPct: 45  },
  { employer: 'Urban Digital Ltd',      name: 'George Baker',     standard: 'Data Technician',         lsc: 'Tom Bradley',    startDate: '2025-05-01', plannedGateway: '2026-11-18', status: 'Live',    knowledgePct: 35, skillsPct: 30, behavioursPct: 40  },
  { employer: 'Greenfield Consulting',  name: 'Victor Marsh',     standard: 'Data Technician',         lsc: 'Tom Bradley',    startDate: '2024-12-18', plannedGateway: '2026-07-18', status: 'Live',    knowledgePct: 60, skillsPct: 55, behavioursPct: 65  },
  { employer: 'Apex Digital Ltd',       name: 'Jordan Ellis',     standard: 'Data Analyst',            lsc: 'Tom Bradley',    startDate: '2025-02-28', plannedGateway: '2026-08-28', status: 'Live',    knowledgePct: 55, skillsPct: 50, behavioursPct: 55  },
  { employer: 'Sterling Accounts',      name: 'Tara Collins',     standard: 'Data Analyst',            lsc: 'Tom Bradley',    startDate: '2024-12-22', plannedGateway: '2026-07-22', status: 'Live',    knowledgePct: 70, skillsPct: 65, behavioursPct: 75  },
  { employer: 'Pinnacle Finance Group', name: 'Freddie Marsh',    standard: 'Applied AI & Automation', lsc: 'Tom Bradley',    startDate: '2025-03-01', plannedGateway: '2026-09-01', status: 'Live',    knowledgePct: 30, skillsPct: 25, behavioursPct: 35  },
  // ─── Hannah Clarke ────────────────────────────────────────────────────
  { employer: 'Apex Digital Ltd',       name: 'Holly Nguyen',     standard: 'Data Technician',         lsc: 'Hannah Clarke',  startDate: '2025-05-25', plannedGateway: '2026-11-25', status: 'Live',    knowledgePct: 20, skillsPct: 15, behavioursPct: 25  },
  { employer: 'Bloom Marketing Co.',    name: 'Reuben Adeyemi',   standard: 'Data Technician',         lsc: 'Hannah Clarke',  startDate: '2025-03-28', plannedGateway: '2026-09-28', status: 'Live',    knowledgePct: 50, skillsPct: 45, behavioursPct: 55  },
  { employer: 'TechCore UK',            name: 'Nathan Brooks',    standard: 'Data Analyst',            lsc: 'Hannah Clarke',  startDate: '2025-01-07', plannedGateway: '2026-07-07', status: 'Live',    knowledgePct: 65, skillsPct: 60, behavioursPct: 70  },
  { employer: 'Sterling Accounts',      name: 'Sam Davies',       standard: 'Data Analyst',            lsc: 'Hannah Clarke',  startDate: '2025-06-01', plannedGateway: '2026-12-01', status: 'Live',    knowledgePct: 15, skillsPct: 10, behavioursPct: 20  },
  { employer: 'Clarity Finance Ltd',    name: 'Will Thornton',    standard: 'Applied AI & Automation', lsc: 'Hannah Clarke',  startDate: '2025-04-01', plannedGateway: '2026-10-01', status: 'BIL',     knowledgePct: 40, skillsPct: 35, behavioursPct: 45  },
];

// ─── 1,000-Learner Scale Generator ────────────────────────────────────

const COACHES_1000 = [
  'Sarah Mitchell','James Okafor','Priya Sharma','Tom Bradley','Hannah Clarke',
  'Natasha Reynolds','Daniel Osei','Emma Whitfield','Marcus Chen','Lorna MacPherson',
  'Aidan Walsh','Fatima Begum','Ryan Saunders','Charlotte Patel','Leon Adeyemi',
  "Niamh O'Brien",'Josh Carpenter','Amara Diallo','Steven Park','Rosa Ferreira',
];

const _FN = ['James','Emma','Oliver','Sophia','William','Isabella','Noah','Charlotte','Aiden','Mia',
  'Lucas','Harper','Mason','Evelyn','Ethan','Abigail','Alexander','Emily','Henry','Elizabeth',
  'Sebastian','Mila','Jack','Ella','Owen','Avery','Samuel','Sofia','Daniel','Camila',
  'Logan','Aria','Muhammad','Fatima','Yusuf','Aisha','Khalid','Nadia','Omar','Layla',
  'Liam','Grace','Callum','Freya','Rajan','Priya','Aryan','Ananya','Kwame','Ama',
  'Kofi','Abena','Tariq','Zara','Idris','Amara','Cian','Siobhan','Declan','Aoife',
  'Leon','Maya','Jordan','Riley','Tyler','Morgan','Casey','Blake','Finn','Isla',
  'Rory','Skye','Hamish','Morag','Ewan','Ailsa','Aaron','Bella','Calvin','Diana',
  'Eric','Fiona','George','Helena','Ivan','Julia','Kevin','Laura','Michael','Natalie'];
const _LN = ['Smith','Jones','Williams','Taylor','Brown','Davies','Evans','Wilson',
  'Thomas','Roberts','Johnson','Lewis','Walker','Robinson','Wood','Thompson',
  'White','Watson','Jackson','Wright','Green','Harris','Cooper','King',
  'Lee','Martin','Clarke','James','Morgan','Hughes','Edwards','Hill',
  'Moore','Clark','Harrison','Scott','Young','Morris','Hall','Ward',
  'Turner','Carter','Phillips','Mitchell','Patel','Ahmed','Khan','Ali',
  'Rahman','Singh','Kumar','Shah','Gupta','Sharma','Das','Roy',
  'Okafor','Adeyemi','Osei','Mensah','Agyei','Boateng','Owusu','Asante',
  'Ferreira','Silva','Santos','Costa','Chen','Zhang','Liu','Wang',
  'Murphy','Kelly','Walsh','Ryan','Byrne','Doyle','McCarthy','Burke',
  'Park','Kim','Choi','Andersen','Berg','Johansson','Nielsen','Hansen'];
// 120 employers — realistic spread for 1,000 learners (~8 per employer on average)
const _EMP = [
  'TechCore UK','DataSphere Analytics','Apex Digital Ltd','Bright Digital Agency',
  'Greenfield Consulting','Sterling Accounts','Meridian Consulting','Nova Solutions',
  'Pinnacle Finance Group','Clarity Finance Ltd','Urban Digital Ltd','Horizon Analytics',
  'Bloom Marketing Co.','NovaTech Solutions','Future Tech Services','Peak Performance Ltd',
  'Vantage Systems Ltd','Cipher Analytics','Redwood Digital','Bluebell Finance',
  'Summit Consulting','Nexus Technologies','Atlas Data Co.','Ember Creative',
  'Forge Analytics','Quantum Finance','Ridgeway Digital','Solent Consulting',
  'Tidal Marketing','Upland Data Services','Kestrel Tech','Falcon Finance',
  'Osprey Analytics','Hawk Digital','Eagle Consulting','Harrier Solutions',
  'Swift Data','Merlin Marketing','Robin Finance','Wren Technologies',
  'Bridgewater Consulting','Clover Analytics','Dawnlight Digital','Eastgate Finance',
  'Fernwood Solutions','Goldcrest Data','Highfield Marketing','Ironbridge Tech',
  'Juniper Finance','Kingsley Analytics','Lakeview Digital','Maple Consulting',
  'Northgate Systems','Oakwood Finance','Pinewood Data','Queensbury Digital',
  'Riverside Analytics','Sandstone Solutions','Thornton Finance','Underhill Tech',
  'Vivid Marketing','Westbrook Consulting','Yardley Finance','Zenith Analytics',
  'Alder Digital','Birch Consulting','Cedar Finance','Dover Analytics',
  'Elm Data Services','Foxhall Digital','Greenbank Finance','Heather Tech',
  'Inkwell Marketing','Jasper Consulting','Kelvin Analytics','Larkspur Digital',
  'Meadow Finance','Nettle Data','Orion Consulting','Primrose Analytics',
  'Quartz Finance','Reed Digital','Sequoia Solutions','Teakwood Finance',
  'Underwood Analytics','Vervain Digital','Willow Consulting','Yarrow Finance',
  'Amber Solutions','Bronze Consulting','Cobalt Data','Dusk Digital',
  'Emerald Finance','Fern Analytics','Garnet Consulting','Hazel Data',
  'Ivory Digital','Jade Finance','Kaolin Analytics','Lapis Consulting',
  'Malachite Data','Nimbus Digital','Opal Finance','Pearl Analytics',
  'Ruby Consulting','Sapphire Data','Topaz Digital','Umber Finance',
  'Alcott Solutions','Barrett Finance','Carver Digital','Dunbar Analytics',
  'Elliot Consulting','Fletcher Data','Grayson Finance','Harlow Digital',
  'Ingram Analytics','Jennings Consulting','Kimura Finance','Langley Data',
  'Marsh Digital','Neville Analytics','Osborn Finance','Paxton Consulting',
];

// Per-coach caseload capacities (total = 1,000)
const COACH_CAPACITIES_1000 = {
  'Sarah Mitchell': 60, 'James Okafor': 60, 'Priya Sharma': 55, 'Tom Bradley': 60, 'Hannah Clarke': 52,
  'Natasha Reynolds': 55, 'Daniel Osei': 52, 'Emma Whitfield': 60, 'Marcus Chen': 50, 'Lorna MacPherson': 45,
  'Aidan Walsh': 58, 'Fatima Begum': 60, 'Ryan Saunders': 25, 'Charlotte Patel': 48, 'Leon Adeyemi': 60,
  "Niamh O'Brien": 52, 'Josh Carpenter': 30, 'Amara Diallo': 52, 'Steven Park': 40, 'Rosa Ferreira': 26,
};
const _NEEDS = ['Dyslexia','ADHD','Anxiety / Mental Health','Dyspraxia','Dyscalculia',
  'Autism Spectrum (ASC)','Visual Impairment','Hearing Impairment','Physical Disability'];
const _ADJ = [
  'Extended assessment time, dyslexia-friendly materials',
  'Chunked tasks, visual planners, frequent check-ins',
  'Regular welfare check-ins, phased support',
  'Alternative format submissions, extended time',
  'Calculator permitted, formulae sheet provided',
  'Written instructions, structured routine, quiet space',
  'Large print, screen reader software',
  'Written communication preferred, transcripts provided',
  'Accessible formats, ergonomic workstation support',
];
const _SGCAT = ['Mental Health & Wellbeing','Workplace Concern','Personal Welfare','Financial Hardship'];
const _MTYPE = ['Progress Review','Interim Review','Welfare Check-in','Learning Review'];
const _RAG   = ['green','amber','amber','amber','red'];
const _SPRINTS = {
  'Data Technician':         ['AI Literacy','AI Applications in Business L3','AI for Data Analytics L3'],
  'Data Analyst':            ['Introduction to Data Analytics L4 v2','Python Foundations L4 v2','Module to be Selected','Main Analysis Types L4'],
  'Applied AI & Automation': ['L4 AI Copilot AI Literacy','L4 AI Copilot No Code AI Applications','L4 AI Copilot Low Code AI Applications'],
};

function _mkRng(seed) {
  let s = ((seed ^ 0xdeadbeef) >>> 0) || 1;
  return () => {
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b); s ^= s >>> 16;
    return (s >>> 0) / 4294967296;
  };
}
function _isoAdd(base, days) {
  const d = new Date(base); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10);
}

const SCALE_1000 = (function () {
  const rng  = _mkRng(42);
  const pick = arr => arr[Math.floor(rng() * arr.length)];
  const ri   = (lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));
  const pr   = p => rng() < p;
  const TODAY = '2026-06-04';

  // --- Master learner list: varied caseloads per coach = 1,000 total ---
  const used = new Set();
  const genName = () => {
    let n, t = 0;
    do { n = `${pick(_FN)} ${pick(_LN)}`; t++; } while (used.has(n) && t < 300);
    used.add(n); return n;
  };

  const masters = [];
  COACHES_1000.forEach(coach => {
    const count = COACH_CAPACITIES_1000[coach] || 50;
    for (let i = 0; i < count; i++) {
      masters.push({ name: genName(), employer: pick(_EMP), standard: pick(STANDARDS), lsc: coach });
    }
  });

  // Shuffle then assign statuses: 10% Gateway, 5% OOF, 5% BIL, 80% Live
  for (let i = masters.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [masters[i], masters[j]] = [masters[j], masters[i]]; }
  const total = masters.length;
  masters.forEach((m, i) => {
    const pct = i / total;
    m.status = pct < 0.10 ? 'Gateway' : pct < 0.15 ? 'OOF' : pct < 0.20 ? 'BIL' : 'Live';
    if (m.status === 'Gateway') {
      m.startDate      = _isoAdd(TODAY, -ri(365, 548));
      m.plannedGateway = _isoAdd(TODAY, ri(0, 90));
    } else if (m.status === 'OOF') {
      m.startDate      = _isoAdd(TODAY, -ri(548, 730));
      m.plannedGateway = _isoAdd(TODAY, -ri(30, 150));
    } else if (m.status === 'BIL') {
      m.startDate      = _isoAdd(TODAY, -ri(365, 548));
      m.plannedGateway = _isoAdd(TODAY, ri(90, 270));
    } else {
      // Spread over last 15 months for realistic cohort distribution
      m.startDate = _isoAdd(TODAY, -ri(30, 455));
      const progLen = ri(365, 548); // 12–18 month programme
      m.plannedGateway = _isoAdd(m.startDate, progLen);
    }
  });

  // ── Compliance ──────────────────────────────────────────────────────
  const touchpoints = masters.filter(m => m.status === 'Live' && pr(0.15)).map(m => ({
    name: m.name, employer: m.employer, lsc: m.lsc,
    lastMeeting: _isoAdd(TODAY, -ri(35, 90)), meetingType: pick(_MTYPE),
  }));
  const sla = masters.filter(m => m.status !== 'BIL' && pr(0.09)).map(m => {
    const w = ri(8, 17);
    return { name: m.name, employer: m.employer, lsc: m.lsc, lastReview: _isoAdd(TODAY, -(w * 7)), weeksSince: w };
  });
  const otj = masters.filter(m => m.status === 'Live' && pr(0.12)).map(m => {
    const exp = ri(35, 70), done = ri(15, exp - 5);
    return { name: m.name, employer: m.employer, lsc: m.lsc, otjPct: done, otjExpected: exp, lastEntry: _isoAdd(TODAY, -ri(7, 45)) };
  });
  const starters = masters.filter(m => m.status === 'Live' && new Date(m.startDate) >= new Date('2026-05-01')).map(m => ({
    name: m.name, employer: m.employer, standard: m.standard, lsc: m.lsc,
    plannedStart: m.startDate, firstDayDone: pr(0.6), checklistDone: pr(0.4),
  }));

  // ── OOF / BIL ──────────────────────────────────────────────────────
  const oof = masters.filter(m => m.status === 'OOF').map(m => ({
    employer: m.employer, name: m.name, standard: m.standard,
    plannedGateway: m.plannedGateway, lsc: m.lsc,
    status: pick(['Current','Current','Current','At Gateway','BIL','Withdrawn']),
    monthExpected: pick(['Jun 2026','Jul 2026','Aug 2026','Sep 2026',null]),
    gwToEpa: pr(0.5) ? _isoAdd(TODAY, ri(30, 120)) : null,
    portfolioRag: pick(_RAG),
    notes: 'Learner beyond planned end date — action in progress.',
  }));
  const bil = masters.filter(m => m.status === 'BIL').map(m => ({
    employer: m.employer, name: m.name, standard: m.standard,
    plannedGateway: m.plannedGateway, lsc: m.lsc,
    status: pick(['BIL Ongoing','BIL Ongoing','BIL Decision Needed','RTL Confirmed']),
    ldol: _isoAdd(TODAY, -ri(14, 90)),
    expectedRtl: pr(0.6) ? _isoAdd(TODAY, ri(30, 90)) : null,
    notes: 'Agreed break in learning — return date being confirmed.',
  }));

  // ── KSB — completion correlates with programme progress ─────────────
  const ksbStds = Object.keys(KSB_STANDARDS);
  const todayMs = new Date(TODAY).getTime();
  const ksb = masters.filter(m => m.status !== 'Withdrawn' && ksbStds.includes(m.standard)).map(m => {
    let base;
    if (m.status === 'Gateway') { base = ri(75, 95); }
    else if (m.status === 'OOF') { base = ri(35, 65); }
    else if (m.status === 'BIL') { base = ri(20, 55); }
    else {
      // Scale completion to proportion of programme elapsed
      const startMs   = new Date(m.startDate).getTime();
      const gwMs      = new Date(m.plannedGateway).getTime();
      const progLen   = Math.max(1, gwMs - startMs);
      const elapsed   = Math.min(progLen, todayMs - startMs);
      const progress  = elapsed / progLen; // 0–1
      base = Math.round(progress * 85) + ri(0, 15); // 0–100 range
    }
    return {
      employer: m.employer, name: m.name, standard: m.standard, lsc: m.lsc,
      startDate: m.startDate, plannedGateway: m.plannedGateway,
      status: m.status === 'BIL' ? 'BIL' : m.status === 'OOF' ? 'OOF' : m.status === 'Gateway' ? 'Gateway' : 'Live',
      knowledgePct: Math.min(100, Math.max(0, base + ri(-5, 10))),
      skillsPct:    Math.min(100, Math.max(0, base + ri(-8, 8))),
      behavioursPct:Math.min(100, Math.max(0, base + ri(-3, 12))),
    };
  });

  // ── Gateway Quarterly ───────────────────────────────────────────────
  const gwPool = masters.filter(m => m.status === 'Gateway');
  const mkGwRow = (m, statusOpts, months) => ({
    employer: m.employer, name: m.name, standard: m.standard,
    plannedGateway: m.plannedGateway, lsc: m.lsc,
    status: pick(statusOpts), monthExpected: pick(months),
    gwToEpa: pr(0.5) ? _isoAdd(TODAY, ri(30, 90)) : null, portfolioRag: pick(_RAG),
  });
  const gwQ2 = gwPool.slice(0, 40).map(m => mkGwRow(m, ['At Gateway','At Gateway','Current','Withdrawn'], ['Jun 2026','Jun 2026','Jul 2026']));
  const gwQ3 = gwPool.slice(40, 80).map(m => mkGwRow(m, ['Current','Current','BIL'], ['Jul 2026','Aug 2026','Sep 2026']));
  const gwQ4 = gwPool.slice(80, 100).map(m => mkGwRow(m, ['Current'], ['Oct 2026','Nov 2026','Dec 2026']));

  // ── Gateway Monthly Pipeline ────────────────────────────────────────
  const gwMonthLearners = masters.filter(m => m.status === 'Gateway');
  const mkGwMonth = (monthStr, forecast, expected, pool) => {
    // Only past/current months have real gateway activity — future months are forecasts only
    const isPastOrCurrent = new Date(monthStr + '-01') <= new Date('2026-06-01');
    return {
      forecast, expected,
      groups: COACHES_1000.map(coach => ({
        lsc: coach,
        learners: pool.filter(m => m.lsc === coach).map(m => ({
          name: m.name, standard: m.standard,
          prepDate: isPastOrCurrent && pr(0.7) ? _isoAdd(TODAY, -ri(14, 60)) : null,
          atGateway:    isPastOrCurrent ? pr(0.5)  : false,
          monthsCarried: isPastOrCurrent && pr(0.2) ? ri(1, 3) : 0,
          carryOverNext: isPastOrCurrent ? pr(0.15) : false,
          withdrawn:     isPastOrCurrent ? pr(0.05) : false,
          notes: '',
        })),
      })).filter(g => g.learners.length > 0),
    };
  };
  // Seasonal pattern: spring peak (Apr-Jun), summer flat (Jul-Aug), autumn peak (Sep-Nov), winter flat (Dec-Jan)
  const sl = gwMonthLearners;
  const gatewayMonths = {
    '2026-05': mkGwMonth('2026-05', 68, 55, sl.slice(0,  55)), // spring peak (1000-learner)
    '2026-06': mkGwMonth('2026-06', 62, 52, sl.slice(0,  52)), // spring peak
    '2026-07': mkGwMonth('2026-07', 32, 26, sl.slice(20, 46)), // summer flat
    '2026-08': mkGwMonth('2026-08', 28, 22, sl.slice(40, 62)), // summer flat
    '2026-09': mkGwMonth('2026-09', 58, 48, sl.slice(30, 78)), // autumn peak starts
    '2026-10': mkGwMonth('2026-10', 68, 56, sl.slice(20, 76)), // autumn peak
    '2026-11': mkGwMonth('2026-11', 60, 50, sl.slice(10, 60)), // autumn peak
    '2026-12': mkGwMonth('2026-12', 18, 14, sl.slice(50, 64)), // winter flat
  };

  // ── Welfare ─────────────────────────────────────────────────────────
  const als = masters.filter((m, i) => i % 9 === 0).map(m => ({
    name: m.name, standard: m.standard, lsc: m.lsc,
    need: pick(_NEEDS), adjustments: pick(_ADJ),
    lastReview: _isoAdd(TODAY, -ri(30, 180)),
    nextReview: _isoAdd(TODAY, ri(-30, 90)),
  }));
  const safeguarding = masters.filter((m, i) => i % 50 === 0).map(m => ({
    name: m.name, lsc: m.lsc,
    dateRaised: _isoAdd(TODAY, -ri(14, 120)),
    category: pick(_SGCAT),
    status: pr(0.7) ? 'active' : 'closed',
    lastAction: _isoAdd(TODAY, -ri(1, 21)),
    notes: 'Case being monitored — regular check-ins in place.',
  }));
  const welfareDue = masters.filter((m, i) => i % 20 === 0).map(m => ({
    name: m.name, lsc: m.lsc,
    reason: pick(['ALS review due','Mental health monitoring','Safeguarding welfare follow-up','BIL welfare check']),
    lastCheckin: _isoAdd(TODAY, -ri(7, 45)),
    daysSince: ri(7, 45),
  }));

  // ── Curriculum ───────────────────────────────────────────────────────
  const currStds = Object.keys(_SPRINTS);
  const curriculum = masters.filter(m => m.status === 'Live' && currStds.includes(m.standard)).map(m => {
    const sprints = _SPRINTS[m.standard];
    const expected = ri(2, 8), complete = Math.min(8, Math.max(0, expected + ri(-4, 2)));
    return {
      name: m.name, employer: m.employer, standard: m.standard, lsc: m.lsc,
      sprint: pick(sprints), partsComplete: complete, partsExpected: expected,
      lastActivity: _isoAdd(TODAY, -ri(1, 45)),
    };
  });

  return { touchpoints, sla, otj, starters, oof, bil, ksb, gwQ2, gwQ3, gwQ4, gatewayMonths, als, safeguarding, welfareDue, curriculum, masters };
})();

// Active data accessor — returns 200 or 1000 dataset based on currentSize
const AD = {
  get touchpoints()   { return currentSize === 1000 ? SCALE_1000.touchpoints   : TOUCHPOINT_DATA; },
  get sla()           { return currentSize === 1000 ? SCALE_1000.sla           : SLA_DATA; },
  get otj()           { return currentSize === 1000 ? SCALE_1000.otj           : OTJ_DATA; },
  get starters()      { return currentSize === 1000 ? SCALE_1000.starters      : STARTER_DATA; },
  get oof()           { return currentSize === 1000 ? SCALE_1000.oof           : OOF_DATA; },
  get bil()           { return currentSize === 1000 ? SCALE_1000.bil           : BIL_DATA; },
  get ksb()           { return currentSize === 1000 ? SCALE_1000.ksb           : KSB_DATA; },
  get gwQ2()          { return currentSize === 1000 ? SCALE_1000.gwQ2          : GW_Q2_DATA; },
  get gwQ3()          { return currentSize === 1000 ? SCALE_1000.gwQ3          : GW_Q3_DATA; },
  get gwQ4()          { return currentSize === 1000 ? SCALE_1000.gwQ4          : GW_Q4_DATA; },
  get als()           { return currentSize === 1000 ? SCALE_1000.als           : ALS_DATA; },
  get safeguarding()  { return currentSize === 1000 ? SCALE_1000.safeguarding  : SAFEGUARDING_DATA; },
  get welfareDue()    { return currentSize === 1000 ? SCALE_1000.welfareDue    : WELFARE_DUE_DATA; },
  get curriculum()    { return currentSize === 1000 ? SCALE_1000.curriculum    : CURRICULUM_DATA; },
  get gatewayMonths() { return currentSize === 1000 ? SCALE_1000.gatewayMonths : GATEWAY_MONTHS_DATA; },
};

// ─── Users ─────────────────────────────────────────────────────────────
const USERS = [
  { id: 'delivery',   name: 'Delivery Manager',   role: 'delivery',   initials: 'DM' },
  { id: 'compliance', name: 'Compliance Manager',  role: 'compliance', initials: 'CM' },
  { id: 'quality',    name: 'Quality Manager',     role: 'quality',    initials: 'QM' },
  { id: 'sales',      name: 'Sales Manager',       role: 'sales',      initials: 'SM' },
  { id: 'sarah',      name: 'Sarah Mitchell',      role: 'lsc',        initials: 'LSC', coach: 'Sarah Mitchell' },
  { id: 'james',      name: 'James Okafor',        role: 'lsc',        initials: 'LSC', coach: 'James Okafor'   },
  { id: 'priya',      name: 'Priya Sharma',        role: 'lsc',        initials: 'LSC', coach: 'Priya Sharma'   },
  { id: 'tom',        name: 'Tom Bradley',         role: 'lsc',        initials: 'LSC', coach: 'Tom Bradley'    },
  { id: 'hannah',     name: 'Hannah Clarke',       role: 'lsc',        initials: 'LSC', coach: 'Hannah Clarke'  },
];

let currentUser = USERS[0]; // default: Delivery Manager

const NAV_ACCESS = {
  'page-overview':  ['delivery', 'compliance', 'quality', 'lsc'],
  'page-sales':     ['delivery', 'compliance', 'quality', 'sales'],
  // 'page-smt' removed from nav for now
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
let gwForecastFilter   = 'All';
let welfareFilter      = 'All';
let learnerVoiceFilter = 'All';
let lscPageCoach       = 'James Okafor';
let ksbLSCFilter       = '';
let ksbStandardFilter  = '';
let ksbStatusFilter    = '';
let ksbSortCol         = 'rag';
let ksbSortAsc         = true;

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

// ─── Generic table sort (Compliance / Curriculum / Welfare) ───────────
const _tblSort = {};

function _doTblSort(rows, tid, defaultFn) {
  const s = _tblSort[tid];
  if (!s) return defaultFn ? rows.slice().sort(defaultFn) : rows;
  return rows.slice().sort((a, b) => {
    let av = a[s.col] ?? '', bv = b[s.col] ?? '';
    if (typeof av === 'number' || typeof bv === 'number') { av = +av || 0; bv = +bv || 0; }
    else if (typeof av === 'boolean') { av = av ? 1 : 0; bv = bv ? 1 : 0; }
    else { av = String(av).toLowerCase(); bv = String(bv).toLowerCase(); }
    return (av < bv ? -1 : av > bv ? 1 : 0) * (s.asc ? 1 : -1);
  });
}

function _tblIcons(tid) {
  const s = _tblSort[tid];
  document.querySelectorAll(`th[data-sort-table="${tid}"]`).forEach(th => {
    const ic = th.querySelector('.sort-icon');
    if (!ic) return;
    const on = s && th.dataset.col === s.col;
    ic.textContent = on ? (s.asc ? '↑' : '↓') : '⇅';
    th.classList.toggle('sort-active', !!on);
  });
}

document.addEventListener('click', e => {
  const th = e.target.closest('th[data-sort-table]');
  if (!th || !th.dataset.col) return;
  const tid = th.dataset.sortTable, col = th.dataset.col;
  const cur = _tblSort[tid];
  _tblSort[tid] = { col, asc: cur?.col === col ? !cur.asc : true };
  ({
    'starter-tbody':          renderDeliveryTables,
    'touchpoint-tbody':       renderDeliveryTables,
    'sla-tbody':              renderDeliveryTables,
    'otj-tbody':              renderDeliveryTables,
    'oof-tbody':              renderDeliveryTables,
    'bil-tbody':              renderDeliveryTables,
    'curr-tbody':             renderCurriculum,
    'als-tbody':              renderWelfare,
    'welfare-combined-tbody': renderWelfare,
  })[tid]?.();
});

// ─── Generic table CSV export (all .btn-export buttons) ───────────────
function exportTableCSV(table, filename) {
  const headers = [...table.querySelectorAll('thead th')]
    .map(th => th.textContent.trim().replace(/[↑↓⇅]/g, '').trim());
  const rows = [...table.querySelectorAll('tbody tr')]
    .filter(tr => !tr.querySelector('[class*="empty"]') && tr.querySelectorAll('td').length)
    .map(tr => [...tr.querySelectorAll('td')].map(td => td.textContent.trim()));
  if (!rows.length) return;
  const esc = s => `"${s.replace(/"/g, '""')}"`;
  const csv = [headers.map(esc).join(','), ...rows.map(r => r.map(esc).join(','))].join('\n');
  const safe = (filename || 'export').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })),
    download: `boom-${safe}.csv`,
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-export');
  if (!btn || btn.id === 'report-export-btn') return; // Reporting has its own handler
  const panel = btn.closest('.panel');
  const table = panel?.querySelector('table');
  if (!table) return;
  const title = panel.querySelector('.panel-title')?.textContent?.trim() || 'table';
  exportTableCSV(table, title);
});

// ─── Collapsible AAF section ───────────────────────────────────────────
function toggleAAFSection() {
  const grid = document.getElementById('aaf-grid');
  const btn  = document.getElementById('aaf-toggle-btn');
  if (!grid || !btn) return;
  const isCollapsed = grid.style.display === 'none';
  grid.style.display = isCollapsed ? '' : 'none';
  btn.textContent = isCollapsed ? 'Collapse ▲' : 'Expand ▼';
}

// ─── Sub-navigation (scoped to each section's own nav) ─────────────────
document.querySelectorAll('.sub-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const nav       = btn.closest('.sub-nav');
    const container = nav?.parentElement;
    if (!nav || !container) return;
    nav.querySelectorAll('.sub-nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    container.querySelectorAll(':scope > .sub-page').forEach(p => p.classList.remove('active'));
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
  renderGatewayForecast();
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

  // DfE AAF section and overview cards (hidden for LSC)
  const aafSection = document.getElementById('ov-aaf-section');
  if (aafSection) aafSection.style.display = isLSC ? 'none' : '';
  const ovSalesCard = document.getElementById('ov-sales-card');
  const ovAafCard   = document.getElementById('ov-aaf-card');
  if (ovSalesCard) ovSalesCard.style.display = isLSC ? 'none' : '';
  if (ovAafCard)   ovAafCard.style.display   = isLSC ? 'none' : '';

  // Overview card order — LSC: Delivery, Compliance, Gateway, Curriculum, Welfare
  //                      Managers: AAF, Sales, Delivery, Compliance, Gateway, Curriculum, Welfare
  const cardOrder = isLSC
    ? { 'ov-compliance-card': 1, 'ov-delivery-card': 2, 'ov-ksb-card': 3, 'ov-gateway-card': 4, 'ov-gwf-card': 5, 'ov-curriculum-card': 6, 'ov-welfare-card': 7, 'ov-voice-card': 8 }
    : { 'ov-aaf-card': 1, 'ov-sales-card': 2, 'ov-compliance-card': 3, 'ov-delivery-card': 4, 'ov-ksb-card': 5, 'ov-gateway-card': 6, 'ov-gwf-card': 7, 'ov-curriculum-card': 8, 'ov-welfare-card': 9, 'ov-voice-card': 10 };
  Object.entries(cardOrder).forEach(([id, order]) => {
    const el = document.getElementById(id);
    if (el) el.style.order = order;
  });

  // KSB filter bar — hidden for LSC (auto-filtered by coach)
  const ksbFilterBar = document.getElementById('ksb-filter-bar');
  if (ksbFilterBar) ksbFilterBar.style.display = isLSC ? 'none' : '';

  // Reset KSB filters on role switch
  ksbLSCFilter = '';
  ksbStandardFilter = '';
  ksbStatusFilter = '';
  const ksbLscEl = document.getElementById('ksb-lsc');
  const ksbStdEl = document.getElementById('ksb-standard');
  const ksbSttEl = document.getElementById('ksb-status');
  if (ksbLscEl) ksbLscEl.value = '';
  if (ksbStdEl) ksbStdEl.value = '';
  if (ksbSttEl) ksbSttEl.value = '';

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
    const compReviewsCard = document.getElementById('comp-reviews-due-card');
    const compOtjCard     = document.getElementById('comp-otj-card');
    if (compReviewsCard) compReviewsCard.style.display = '';
    if (compOtjCard)     compOtjCard.style.display     = '';
    const currLscBar = document.getElementById('curriculum-lsc-bar');
    if (currLscBar) currLscBar.style.display = 'none';
    const gwFcLscBar = document.getElementById('gw-forecast-lsc-bar');
    if (gwFcLscBar) gwFcLscBar.style.display = 'none';
    const welfareLscBar = document.getElementById('welfare-lsc-bar');
    if (welfareLscBar) welfareLscBar.style.display = 'none';
    welfareFilter = 'All';
    const lvLscBar = document.getElementById('learner-voice-lsc-bar');
    if (lvLscBar) lvLscBar.style.display = 'none';
    learnerVoiceFilter = 'All';

    const rfLsc = document.getElementById('rf-lsc');
    if (rfLsc) { rfLsc.value = coach; rfLsc.disabled = true; }

    setText('lsc-caseload-subtitle', coach + ' — Learner Success Coach');
  } else {
    lscPageCoach       = 'James Okafor';
    deliveryDashFilter = 'All';
    deliveryLSCFilter  = 'All';

    const compLscBar = document.getElementById('compliance-lsc-bar');
    if (compLscBar) compLscBar.style.display = '';
    const compReviewsCard = document.getElementById('comp-reviews-due-card');
    const compOtjCard     = document.getElementById('comp-otj-card');
    if (compReviewsCard) compReviewsCard.style.display = 'none';
    if (compOtjCard)     compOtjCard.style.display     = 'none';
    const currLscBar = document.getElementById('curriculum-lsc-bar');
    if (currLscBar) currLscBar.style.display = '';
    const gwFcLscBar = document.getElementById('gw-forecast-lsc-bar');
    if (gwFcLscBar) gwFcLscBar.style.display = '';
    const welfareLscBar = document.getElementById('welfare-lsc-bar');
    if (welfareLscBar) welfareLscBar.style.display = '';
    welfareFilter = 'All';
    const lvLscBar = document.getElementById('learner-voice-lsc-bar');
    if (lvLscBar) lvLscBar.style.display = '';
    learnerVoiceFilter = 'All';

    const rfLsc = document.getElementById('rf-lsc');
    if (rfLsc) { rfLsc.value = ''; rfLsc.disabled = false; }

    // Sales Manager: default to pipeline area in Reporting
    if (role === 'sales') {
      const rfArea = document.getElementById('rf-area');
      if (rfArea) rfArea.value = 'pipeline';
    }

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
    syncCoachDropdowns();
    populateEmployerDropdown();
    renderAll();
    renderPipeline();
    renderGateway();
    renderGatewayForecast();
    renderWelfare();
    renderDeliveryDash();
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

// ─── Gateway Forecast LSC filter ───────────────────────────────────────
document.getElementById('gw-forecast-lsc')?.addEventListener('change', function () {
  gwForecastFilter = this.value;
  renderGatewayForecast();
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
  renderCurriculum();
  renderGatewayForecast();
  renderKSB();
  renderLearnerVoice();
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
    const prov = DATA[currentSize];
    setKpiCard('kpi-employers',   'Employers',         prov.employers);
    setKpiCard('kpi-achievement', 'Achievement Rate',  prov.achievement);
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
  const isLSC = currentUser.role === 'lsc';
  const coach = isLSC ? currentUser.coach : null;
  const lscF  = arr => coach ? arr.filter(r => r.lsc === coach) : arr;

  // — Compliance —
  setText('ov-touchpoints', lscF(AD.touchpoints).length);
  setText('ov-sla',         lscF(AD.sla).length);
  setText('ov-otj',         lscF(AD.otj).length);
  setText('ov-starters',    lscF(AD.starters).length);

  // — Learner Welfare —
  const alsOverdue         = lscF(AD.als).filter(r => alsReviewRag(r.nextReview).cls === 'urgent').length;
  const alsSoon            = lscF(AD.als).filter(r => alsReviewRag(r.nextReview).cls === 'warning').length;
  const safeguardingActive = lscF(AD.safeguarding).filter(r => r.status === 'active').length;
  const welfareDue         = lscF(AD.welfareDue).filter(r => r.daysSince > 14).length;
  const setOvColour = (id, value, cls) => {
    const el = document.getElementById(id);
    if (el) { el.textContent = value; el.className = 'ov-value' + (value > 0 ? ' ' + cls : ''); }
  };
  setOvColour('ov-als-overdue',  alsOverdue,         'ov-red');
  setOvColour('ov-als-soon',     alsSoon,            'ov-amber');
  setOvColour('ov-safeguarding', safeguardingActive, 'ov-red');
  setOvColour('ov-welfare-due',  welfareDue,         'ov-amber');

  // — Delivery —
  const oofActive   = lscF(AD.oof).filter(r => r.status !== 'Withdrawn').length;
  const oofRed      = lscF(AD.oof).filter(r => r.portfolioRag === 'red' && r.status !== 'Withdrawn').length;
  const bilDecision = lscF(AD.bil).filter(r => r.status === 'BIL Decision Needed').length;
  const bilTotal    = lscF(AD.bil).length;
  setText('ov-oof',          oofActive);
  setText('ov-oof-red',      oofRed);
  setText('ov-bil-decision', bilDecision);
  setText('ov-bil-total',    bilTotal);

  // — Gateway Pipeline (current month snapshot — May 2026 at 200, Jun 2026 at 1000) —
  const _gwSnapshotKey = currentSize === 1000 ? '2026-06' : '2026-05';
  const gwData = AD.gatewayMonths[_gwSnapshotKey];
  let gwLearners = [];
  if (gwData) {
    gwLearners = isLSC
      ? (gwData.groups.find(g => g.lsc === coach)?.learners || [])
      : gwData.groups.flatMap(g => g.learners);
  }
  const gwAt        = gwLearners.filter(l => l.atGateway).length;
  const gwExpected  = isLSC ? gwLearners.filter(l => !l.withdrawn).length : (gwData ? gwData.expected : 0);
  const gwCarry     = gwLearners.filter(l => l.carryOverNext).length;
  const gwWithdrawn = gwLearners.filter(l => l.withdrawn).length;
  setText('ov-gw-at',        gwAt);
  setText('ov-gw-expected',  gwExpected);
  setText('ov-gw-carry',     gwCarry);
  setText('ov-gw-withdrawn', gwWithdrawn);

  // — Sales Pipeline (May 2026 — managers only) —
  if (!isLSC) {
    const mayEntries = PIPELINE_ENTRIES.filter(e => {
      const d = new Date(e.start);
      return d.getFullYear() === 2026 && d.getMonth() === 4;
    });
    setText('ov-sales-confirmed', mayEntries.filter(e => e.prob >= 70).length);
    setText('ov-sales-target',    PIPELINE_TARGETS['2026-05'] || 0);
    setText('ov-sales-inscope',   mayEntries.filter(e => e.status !== 'Cold Lead').length);
    setText('ov-sales-cold',      mayEntries.filter(e => e.status === 'Cold Lead').length);
  }

  // — DfE AAF (managers only) —
  if (!isLSC) {
    const aafMetrics = AAF_METRICS[currentSize];
    const aafRed     = aafMetrics.filter(m => m.rag === 'red').length;
    setText('ov-aaf-green', aafMetrics.filter(m => m.rag === 'green').length);
    setText('ov-aaf-amber', aafMetrics.filter(m => m.rag === 'amber').length);
    setText('ov-aaf-red',   aafRed);
    const redNamesEl = document.getElementById('ov-aaf-red-names');
    if (redNamesEl) redNamesEl.textContent = aafRed > 0
      ? `Red metrics: ${aafMetrics.filter(m => m.rag === 'red').map(m => m.name).join(', ')}`
      : '';
  }

  // — Curriculum —
  const currBase     = isLSC ? AD.curriculum.filter(r => r.lsc === coach) : AD.curriculum;
  const currStatuses = currBase.map(r => curriculumStatus(r));
  setText('ov-curr-total',       currBase.length);
  setText('ov-curr-on-track',    currStatuses.filter(s => s === 'On Track').length);
  setText('ov-curr-off-track',   currStatuses.filter(s => s === 'Off Track' || s === 'Behind').length);
  setText('ov-curr-no-activity', currStatuses.filter(s => s === 'No Activity').length);

  // — KSB Tracker (within 6 months of gateway) —
  const mo6 = new Date('2026-12-04');
  const ksbBase = isLSC ? AD.ksb.filter(r => r.lsc === coach) : AD.ksb;
  const ksbW6   = ksbBase.filter(r => new Date(r.plannedGateway) <= mo6);
  const ksbSuperRed = ksbW6.filter(r => ksbRag(r) === 'super-red').length;
  setText('ov-ksb-sr', ksbSuperRed);
  setText('ov-ksb-r',  ksbW6.filter(r => ksbRag(r) === 'red').length);
  setText('ov-ksb-a',  ksbW6.filter(r => ksbRag(r) === 'amber').length);
  setText('ov-ksb-g',  ksbW6.filter(r => ksbRag(r) === 'green').length);

  // — Gateway Forecast (Q2/Q3/Q4) —
  const gwLscF = r => !isLSC || r.lsc === coach;
  const q2Rows = AD.gwQ2.filter(gwLscF);
  const q3Rows = AD.gwQ3.filter(gwLscF);
  const q4Rows = AD.gwQ4.filter(gwLscF);
  setText('ov-gwf-q2',  q2Rows.length);
  setText('ov-gwf-q3',  q3Rows.length);
  setText('ov-gwf-q4',  q4Rows.length);
  setText('ov-gwf-red', [...q2Rows, ...q3Rows, ...q4Rows].filter(r => r.portfolioRag === 'red').length);

  // — Learner Voice —
  const d = DATA[currentSize];
  const setEnps = (id, score) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = score;
    el.className = 'ov-value ' + (score >= 30 ? 'ov-green' : score >= 0 ? 'ov-amber' : 'ov-red');
  };
  setEnps('ov-lv-learner-enps',  d.learnerENPS);
  setEnps('ov-lv-employer-enps', d.employerENPS);
  setText('ov-lv-learner-comments',  isLSC ? LEARNER_COMMENTS_DATA.filter(r => r.lsc === coach).length : LEARNER_COMMENTS_DATA.length);
  setText('ov-lv-employer-comments', isLSC ? EMPLOYER_COMMENTS_DATA.filter(r => r.lsc === coach).length : EMPLOYER_COMMENTS_DATA.length);

  // — Urgent banner (includes KSB super-red within 6 months) —
  const urgentTotal = lscF(AD.sla).length + bilDecision + oofRed + alsOverdue + safeguardingActive + welfareDue + ksbSuperRed;
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
  const f = deliveryLSCFilter === 'All' ? null : deliveryLSCFilter;
  const lscF = arr => f ? arr.filter(r => r.lsc === f) : arr;
  setText('kpi-outstanding',     lscF(AD.touchpoints).length);
  setText('kpi-overdue-reviews', lscF(AD.sla).length);
  setText('kpi-no-otj',          lscF(AD.otj).length);
  setText('kpi-awaiting-first',  lscF(AD.starters).length);
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
  const _src = lscFilter ? AD.touchpoints.filter(r => r.lsc === lscFilter) : AD.touchpoints;
  const rows = _doTblSort(_src, tbodyId, (a, b) => new Date(a.lastMeeting) - new Date(b.lastMeeting));
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
  _tblIcons(tbodyId);
}

function renderSLATable(tbodyId, lscFilter) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  const _src = lscFilter ? AD.sla.filter(r => r.lsc === lscFilter) : AD.sla;
  const rows = _doTblSort(_src, tbodyId, (a, b) => b.weeksSince - a.weeksSince);
  if (!rows.length) {
    tbody.innerHTML = emptyRow(5, 'No reviews approaching or overdue.');
    return;
  }
  tbody.innerHTML = rows.map(r => {
    const isOverdue  = r.weeksSince >= 10;
    const weeksOver  = r.weeksSince - 10;
    const rowClass   = isOverdue ? ' class="row-alert"' : '';
    const pill       = isOverdue
      ? `<span class="weeks-pill urgent">${r.weeksSince} wks</span><span style="font-size:0.72rem;color:var(--red);margin-left:0.4rem;">${weeksOver} wk${weeksOver !== 1 ? 's' : ''} overdue</span>`
      : `<span class="weeks-pill warning">${r.weeksSince} wks</span><span style="font-size:0.72rem;color:var(--amber);margin-left:0.4rem;">approaching</span>`;
    return `<tr${rowClass}>
      <td>${r.name}</td>
      <td>${r.employer}</td>
      <td>${r.lsc}</td>
      <td class="${isOverdue ? 'cell-alert' : ''}">${addDays(r.lastReview, 70)}</td>
      <td>${pill}</td>
    </tr>`;
  }).join('');
  _tblIcons(tbodyId);
}

function renderOTJTable(tbodyId, lscFilter) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  const _src = lscFilter ? AD.otj.filter(r => r.lsc === lscFilter) : AD.otj;
  const rows = _doTblSort(_src, tbodyId, (a, b) => new Date(a.lastEntry) - new Date(b.lastEntry));
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
  _tblIcons(tbodyId);
}

function renderStarterTable(tbodyId, lscFilter) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;

  // Only show learners where onboarding is incomplete (not both FDOL + checklist done)
  const _base = (lscFilter ? AD.starters.filter(r => r.lsc === lscFilter) : AD.starters)
    .filter(r => !(r.firstDayDone && r.checklistDone));
  const rows = _doTblSort(_base, tbodyId, (a, b) => new Date(a.plannedStart) - new Date(b.plannedStart));
  if (!rows.length) {
    tbody.innerHTML = emptyRow(7, 'No new starters awaiting first meeting for this coach.');
    return;
  }
  tbody.innerHTML = rows.map(r => `
    <tr>
      <td title="${r.name}">${r.name}</td>
      <td title="${r.employer}">${r.employer}</td>
      <td title="${r.standard || ''}">${r.standard || '—'}</td>
      <td title="${r.lsc}">${r.lsc}</td>
      <td>${fmtDate(r.plannedStart)}</td>
      <td>${addDays(r.plannedStart, 30)}</td>
      <td style="text-align:center;">
        ${r.firstDayDone
          ? '<span class="check-yes" title="Completed">✓</span>'
          : '<span class="check-no"  title="Not yet completed">–</span>'}
      </td>
    </tr>
  `).join('');
  _tblIcons(tbodyId);
}

// ─── Delivery tables (uses deliveryLSCFilter state) ────────────────────
function renderDeliveryTables() {
  const f = deliveryLSCFilter === 'All' ? null : deliveryLSCFilter;
  renderStarterTable('starter-tbody', f);
  renderTouchpoints('touchpoint-tbody', f);
  renderSLATable('sla-tbody', f);
  renderOTJTable('otj-tbody', f);
  renderOOFTable(f);
  renderBILTable(f);
  renderDeliveryKPIs();
  // OOF + BIL KPI cards in Compliance bar
  const lscF = arr => f ? arr.filter(r => r.lsc === f) : arr;
  setText('comp-oof-total',  lscF(AD.oof).filter(r => r.status !== 'Withdrawn').length);
  setText('comp-bil-action', lscF(AD.bil).filter(r => r.status === 'BIL Decision Needed').length);
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
const ALS_GROUPS = {
  'kpi-als-learning': { label: 'Learning Difficulties', needs: ['Dyslexia', 'Dyspraxia', 'Dyscalculia'] },
  'kpi-als-neuro':    { label: 'ADHD & Autism',         needs: ['ADHD', 'Autism Spectrum (ASC)'] },
  'kpi-als-mental':   { label: 'Mental Health',         needs: ['Anxiety / Mental Health'] },
  'kpi-als-physical': { label: 'Physical & Sensory',    needs: ['Visual Impairment', 'Hearing Impairment', 'Physical Disability'] },
};

function renderWelfareKPIs() {
  const isLSC = currentUser.role === 'lsc';
  const f     = isLSC ? currentUser.coach : (welfareFilter === 'All' ? null : welfareFilter);
  const lscF  = arr => f ? arr.filter(r => r.lsc === f) : arr;
  const alsRows  = lscF(AD.als);
  const sgActive = lscF(AD.safeguarding).filter(r => r.status === 'active').length;
  const wdRows   = lscF(AD.welfareDue);
  setText('kpi-als-total',    alsRows.length);
  setText('kpi-als-active',   alsRows.length);
  setText('kpi-safeguarding', sgActive);
  setText('kpi-welfare-due',  wdRows.length);
  // ALS breakdown by category
  Object.entries(ALS_GROUPS).forEach(([id, { needs }]) => {
    setText(id, alsRows.filter(r => needs.includes(r.need)).length);
  });
}

// ─── Welfare Tables ────────────────────────────────────────────────────
function renderWelfare() {
  const isLSC = currentUser.role === 'lsc';
  const f     = isLSC ? currentUser.coach : (welfareFilter === 'All' ? null : welfareFilter);
  renderWelfareKPIs();
  renderALSTable(f);
  renderCombinedWelfareTable(f);
}

function alsReviewRag(nextReviewStr) {
  const today = new Date('2026-05-27');
  const next  = new Date(nextReviewStr);
  const days  = Math.floor((next - today) / (1000 * 60 * 60 * 24));
  if (days < 0)   return { label: 'Overdue',   cls: 'urgent' };
  if (days <= 28) return { label: 'Due soon',  cls: 'warning' };
  return               { label: 'On track',  cls: 'ok' };
}

function renderALSTable(lscFilter) {
  const tbody = document.getElementById('als-tbody');
  if (!tbody) return;
  const rows = lscFilter ? AD.als.filter(r => r.lsc === lscFilter) : AD.als;
  if (!rows.length) { tbody.innerHTML = emptyRow(5, 'No ALS learners for this coach.'); return; }
  tbody.innerHTML = rows.map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${r.standard}</td>
      <td>${r.lsc}</td>
      <td><strong>${r.need}</strong></td>
      <td style="font-size:0.78rem;">${r.adjustments}</td>
    </tr>
  `).join('');
  _tblIcons('als-tbody');
}

function renderCombinedWelfareTable(lscFilter) {
  const tbody = document.getElementById('welfare-combined-tbody');
  if (!tbody) return;
  const sgRows = lscFilter ? AD.safeguarding.filter(r => r.lsc === lscFilter) : AD.safeguarding;
  const wdRows = lscFilter ? AD.welfareDue.filter(r => r.lsc === lscFilter) : AD.welfareDue;
  if (!sgRows.length && !wdRows.length) {
    tbody.innerHTML = emptyRow(7, 'No welfare concerns for this coach.');
    return;
  }
  const sgHtml = sgRows.map(r => {
    const isActive = r.status === 'active';
    return `<tr class="${isActive ? 'row-carry' : ''}">
      <td><strong>${r.name}</strong></td>
      <td>${r.lsc}</td>
      <td><span class="welfare-type-sg">Safeguarding</span></td>
      <td>${r.category}</td>
      <td>${isActive ? '<span class="status-active">Active</span>' : '<span class="status-closed">Closed</span>'}</td>
      <td>${fmtDate(r.lastAction)}</td>
      <td style="font-size:0.78rem;max-width:200px;white-space:normal;">${r.notes}</td>
    </tr>`;
  });
  const wdHtml = wdRows.map(r => {
    const isUrgent = r.daysSince > 14;
    return `<tr class="${isUrgent ? 'row-alert' : ''}">
      <td>${r.name}</td>
      <td>${r.lsc}</td>
      <td><span class="welfare-type-check">Welfare Check-in</span></td>
      <td>${r.reason}</td>
      <td><span class="weeks-pill ${isUrgent ? 'urgent' : 'warning'}">${r.daysSince}d ago</span></td>
      <td>${fmtDate(r.lastCheckin)}</td>
      <td>—</td>
    </tr>`;
  });
  tbody.innerHTML = [...sgHtml, ...wdHtml].join('');
  _tblIcons('welfare-combined-tbody');
}

document.getElementById('welfare-lsc')?.addEventListener('change', function() {
  welfareFilter = this.value;
  renderWelfare();
});

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
  const filterFn  = r => !f || r.lsc === f;
  const bilRows   = AD.bil.filter(filterFn);
  const bilNeeded = bilRows.filter(r => r.status === 'BIL Decision Needed').length;
  setText('dd-bil-total',  bilRows.length);
  setText('dd-bil-sub',    `${bilNeeded} decision${bilNeeded !== 1 ? 's' : ''} needed`);
  setText('dd-bil-action', bilNeeded);
  const card = document.getElementById('dd-bil-action-card');
  if (card) card.classList.toggle('kpi-card--active-alert', bilNeeded > 0);
}

// ─── Gateway Forecast ─────────────────────────────────────────────────
function renderGatewayForecast() {
  const isLSC = currentUser.role === 'lsc';
  const f = isLSC ? currentUser.coach : (gwForecastFilter === 'All' ? null : gwForecastFilter);

  renderGWQuarterTable('gw-q2-tbody', 'q2-panel-count', AD.gwQ2, f);
  renderGWQuarterTable('gw-q3-tbody', 'q3-panel-count', AD.gwQ3, f);
  renderGWQuarterTable('gw-q4-tbody', 'q4-panel-count', AD.gwQ4, f);

  const filterFn = r => !f || r.lsc === f;
  const q2Rows   = AD.gwQ2.filter(filterFn);
  const q3Rows   = AD.gwQ3.filter(filterFn);
  const q4Rows   = AD.gwQ4.filter(filterFn);
  const q2AtGw   = q2Rows.filter(r => r.status === 'At Gateway').length;
  setText('dd-q2-total', q2Rows.length);
  setText('dd-q2-sub',   `${q2AtGw} at gateway`);
  setText('dd-q3-total', q3Rows.length);
  setText('dd-q3-sub',   `${q3Rows.filter(r => r.status === 'Current').length} current`);
  setText('dd-q4-total', q4Rows.length);
  setText('dd-q4-sub',   `${q4Rows.filter(r => r.status === 'Current').length} current`);

  const allQRows = [...q2Rows, ...q3Rows, ...q4Rows];
  setText('dd-rag-green', `${allQRows.filter(r => r.portfolioRag === 'green').length} Green`);
  setText('dd-rag-amber', `${allQRows.filter(r => r.portfolioRag === 'amber').length} Amber`);
  setText('dd-rag-red',   `${allQRows.filter(r => r.portfolioRag === 'red').length} Red`);
}

function renderOOFTable(lscFilter) {
  const tbody = document.getElementById('oof-tbody');
  if (!tbody) return;
  const _src = lscFilter ? AD.oof.filter(r => r.lsc === lscFilter) : AD.oof;
  const rows = _doTblSort(_src, 'oof-tbody', (a, b) => new Date(a.plannedGateway) - new Date(b.plannedGateway));
  const countEl = document.getElementById('oof-panel-count');
  if (countEl) countEl.textContent = rows.length + ' learner' + (rows.length !== 1 ? 's' : '');
  if (!rows.length) { tbody.innerHTML = emptyRow(9, 'No OOF learners for this coach.'); return; }
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
        <td>${monthCell}</td>
        <td>${prepCell}</td>
        <td style="text-align:center;">${portfolioRagBadge(r.portfolioRag)}</td>
        <td style="font-size:0.78rem;" title="${r.notes}">${r.notes}</td>
      </tr>`;
  }).join('');
  _tblIcons('oof-tbody');
}

function renderBILTable(lscFilter) {
  const tbody = document.getElementById('bil-tbody');
  if (!tbody) return;
  const _src = lscFilter ? AD.bil.filter(r => r.lsc === lscFilter) : AD.bil;
  const _defBil = (a, b) => {
    if (!a.expectedRtl && !b.expectedRtl) return 0;
    if (!a.expectedRtl) return -1;
    if (!b.expectedRtl) return 1;
    return new Date(a.expectedRtl) - new Date(b.expectedRtl);
  };
  const rows = _doTblSort(_src, 'bil-tbody', _defBil);
  const countEl = document.getElementById('bil-panel-count');
  if (countEl) countEl.textContent = rows.length + ' learner' + (rows.length !== 1 ? 's' : '');
  if (!rows.length) { tbody.innerHTML = emptyRow(8, 'No BIL learners for this coach.'); return; }
  tbody.innerHTML = rows.map(r => {
    const isNeeded = r.status === 'BIL Decision Needed';
    const rowClass = isNeeded ? 'row-alert' : '';
    const rtlCell  = r.expectedRtl ? fmtDate(r.expectedRtl) : '<span class="cell-alert">Not confirmed</span>';
    return `
      <tr class="${rowClass}">
        <td title="${r.employer}">${r.employer}</td>
        <td title="${r.name}">${r.name}</td>
        <td title="${r.standard}">${r.standard}</td>
        <td>${r.lsc}</td>
        <td>${bilStatusPill(r.status)}</td>
        <td>${fmtDate(r.ldol)}</td>
        <td>${rtlCell}</td>
        <td style="font-size:0.78rem;" title="${r.notes}">${r.notes}</td>
      </tr>`;
  }).join('');
  _tblIcons('bil-tbody');
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
  const monthData = AD.gatewayMonths[key];
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

  // Filter groups for LSC users
  const isLSCView  = currentUser.role === 'lsc';
  const gwGroups   = isLSCView
    ? monthData.groups.filter(g => g.lsc === currentUser.coach)
    : monthData.groups;

  // Totals
  const allLearners = gwGroups.flatMap(g => g.learners);
  const atGateway   = allLearners.filter(l => l.atGateway).length;
  const carryOver   = allLearners.filter(l => l.carryOverNext).length;
  const expected    = isLSCView ? allLearners.filter(l => !l.withdrawn).length : monthData.expected;
  const pct         = expected > 0
    ? Math.min(100, Math.round((atGateway / expected) * 100))
    : 0;

  // Progress bar + metrics
  setText('gw-forecast',    monthData.forecast);
  setText('gw-expected',    expected);
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

  gwGroups.forEach(group => {
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

// ─── Learner Voice ─────────────────────────────────────────────────────

function renderLearnerVoice() {
  const isLSC = currentUser.role === 'lsc';
  const f     = isLSC ? currentUser.coach : (learnerVoiceFilter === 'All' ? null : learnerVoiceFilter);

  const lcRows = f ? LEARNER_COMMENTS_DATA.filter(r => r.lsc === f)  : LEARNER_COMMENTS_DATA;
  const ecRows = f ? EMPLOYER_COMMENTS_DATA.filter(r => r.lsc === f) : EMPLOYER_COMMENTS_DATA;
  const erRows = f ? EXIT_REVIEW_DATA.filter(r => r.lsc === f)       : EXIT_REVIEW_DATA;

  const lcCount = document.getElementById('learner-comments-count');
  const ecCount = document.getElementById('employer-comments-count');
  const erCount = document.getElementById('exit-review-count');
  if (lcCount) lcCount.textContent = lcRows.length + ' comment' + (lcRows.length !== 1 ? 's' : '');
  if (ecCount) ecCount.textContent = ecRows.length + ' comment' + (ecRows.length !== 1 ? 's' : '');
  if (erCount) erCount.textContent = erRows.length + ' review' + (erRows.length !== 1 ? 's' : '');

  const lcTbody = document.getElementById('learner-comments-tbody');
  if (lcTbody) {
    lcTbody.innerHTML = lcRows.length
      ? lcRows.map(r => `<tr>
          <td>${r.name}</td>
          <td>${r.employer}</td>
          <td>${fmtDate(r.lastReview)}</td>
          <td style="font-size:0.82rem;white-space:normal;max-width:380px;font-style:italic;">"${r.comment}"</td>
        </tr>`).join('')
      : emptyRow(4, 'No learner comments for this coach.');
  }

  const ecTbody = document.getElementById('employer-comments-tbody');
  if (ecTbody) {
    ecTbody.innerHTML = ecRows.length
      ? ecRows.map(r => `<tr>
          <td>${r.name}</td>
          <td>${r.lineManager}</td>
          <td>${r.employer}</td>
          <td>${fmtDate(r.lastReview)}</td>
          <td style="font-size:0.82rem;white-space:normal;max-width:380px;font-style:italic;">"${r.comment}"</td>
        </tr>`).join('')
      : emptyRow(5, 'No employer comments for this coach.');
  }

  const erTbody = document.getElementById('exit-review-tbody');
  if (erTbody) {
    erTbody.innerHTML = erRows.length
      ? erRows.map(r => {
          const statusPill = r.exitStatus === 'Achieved'
            ? '<span class="dd-status-gateway">Achieved</span>'
            : '<span class="dd-status-withdrawn">Withdrawn</span>';
          return `<tr>
            <td>${r.name}</td>
            <td>${r.standard}</td>
            <td>${statusPill}</td>
            <td style="font-size:0.82rem;white-space:normal;max-width:380px;font-style:italic;">"${r.comment}"</td>
          </tr>`;
        }).join('')
      : emptyRow(4, 'No exit reviews for this coach.');
  }
}

document.getElementById('learner-voice-lsc')?.addEventListener('change', function() {
  learnerVoiceFilter = this.value;
  renderLearnerVoice();
});

// ─── KSB Tracker ───────────────────────────────────────────────────────

function ksbRag(r) {
  const avg = (r.knowledgePct + r.skillsPct + r.behavioursPct) / 3;
  const remaining = 100 - avg;
  if (remaining >= 75) return 'super-red';
  if (remaining >= 51) return 'red';
  if (remaining >= 25) return 'amber';
  return 'green';
}

function ksbRagBadge(rag) {
  const map = {
    'super-red': ['rag-badge--super-red', 'Super Red'],
    'red':       ['rag-badge--red',       'Red'],
    'amber':     ['rag-badge--amber',     'Amber'],
    'green':     ['rag-badge--green',     'Green'],
  };
  const [cls, label] = map[rag] || ['', rag];
  return `<span class="rag-badge ${cls}">${label}</span>`;
}

function ksbStatusPill(status) {
  if (status === 'Live')    return `<span class="dd-status-current">Live</span>`;
  if (status === 'BIL')     return `<span class="ksb-status-bil">BIL</span>`;
  if (status === 'OOF')     return `<span class="ksb-status-oof">OOF</span>`;
  if (status === 'Gateway') return `<span class="dd-status-gateway">Gateway</span>`;
  return status;
}

function ksbPctCell(pct) {
  const cls = pct >= 75 ? 'ksb-pct--green' : pct < 50 ? 'ksb-pct--red' : '';
  return `<span class="ksb-pct${cls ? ' ' + cls : ''}">${pct}%</span>`;
}

function renderKSB() {
  const isLSC  = currentUser.role === 'lsc';
  const mo3    = new Date('2026-09-04');
  const mo6    = new Date('2026-12-04');
  const lscF   = isLSC ? currentUser.coach : ksbLSCFilter;

  // KPI base: full caseload (pre-additional-filter)
  const kpiBase = lscF ? AD.ksb.filter(r => r.lsc === lscF) : AD.ksb;
  const w6 = kpiBase.filter(r => new Date(r.plannedGateway) <= mo6);
  const w3 = kpiBase.filter(r => new Date(r.plannedGateway) <= mo3);
  [['sr','super-red'],['r','red'],['a','amber'],['g','green']].forEach(([code, rag]) => {
    setText(`ksb-6m-${code}`, w6.filter(r => ksbRag(r) === rag).length);
    setText(`ksb-3m-${code}`, w3.filter(r => ksbRag(r) === rag).length);
  });

  // Table rows
  let rows = lscF ? AD.ksb.filter(r => r.lsc === lscF) : AD.ksb.slice();

  // Managers with no LSC filter: show only at-risk (not green)
  const managerAllView = !isLSC && !ksbLSCFilter;
  if (managerAllView) {
    const mo6 = new Date('2026-12-04');
    rows = rows.filter(r =>
      ksbRag(r) !== 'green' &&
      r.status !== 'BIL' &&
      new Date(r.plannedGateway) <= mo6
    );
  }

  if (ksbStandardFilter) rows = rows.filter(r => r.standard === ksbStandardFilter);
  if (ksbStatusFilter)   rows = rows.filter(r => r.status   === ksbStatusFilter);

  // Sort
  const ragOrder = {'super-red': 0, 'red': 1, 'amber': 2, 'green': 3};
  rows.sort((a, b) => {
    let av = ksbSortCol === 'rag' ? ragOrder[ksbRag(a)] : (a[ksbSortCol] ?? '');
    let bv = ksbSortCol === 'rag' ? ragOrder[ksbRag(b)] : (b[ksbSortCol] ?? '');
    if (typeof av === 'string') av = av.toLowerCase();
    if (typeof bv === 'string') bv = bv.toLowerCase();
    return (av < bv ? -1 : av > bv ? 1 : 0) * (ksbSortAsc ? 1 : -1);
  });

  // Update sort header icons
  document.querySelectorAll('.sort-th').forEach(th => {
    const icon = th.querySelector('.sort-icon');
    if (!icon) return;
    if (th.dataset.col === ksbSortCol) {
      icon.textContent = ksbSortAsc ? '↑' : '↓';
      th.classList.add('sort-active');
    } else {
      icon.textContent = '⇅';
      th.classList.remove('sort-active');
    }
  });

  const countEl = document.getElementById('ksb-panel-count');
  if (countEl) countEl.textContent = rows.length + ' learner' + (rows.length !== 1 ? 's' : '');

  const notice = document.getElementById('ksb-manager-notice');
  if (notice) notice.style.display = managerAllView ? '' : 'none';

  // Update subtitle based on role
  const subtitle = document.querySelector('#delivery-manager-view .page-subtitle');
  if (subtitle) {
    subtitle.textContent = isLSC
      ? 'Knowledge, Skills and Behaviours across your caseload'
      : 'Knowledge, Skills and Behaviours progress across your provision';
  }

  const tbody = document.getElementById('ksb-tbody');
  if (!tbody) return;
  if (!rows.length) { tbody.innerHTML = emptyRow(10, 'No learners match the selected filters.'); return; }

  tbody.innerHTML = rows.map(r => {
    const rag = ksbRag(r);
    return `<tr${rag === 'super-red' ? ' class="row-alert"' : ''}>
      <td>${r.employer}</td>
      <td>${r.name}</td>
      <td>${r.standard}</td>
      <td>${fmtDate(r.startDate)}</td>
      <td>${fmtDate(r.plannedGateway)}</td>
      <td>${ksbStatusPill(r.status)}</td>
      <td>${ksbPctCell(r.knowledgePct)}</td>
      <td>${ksbPctCell(r.skillsPct)}</td>
      <td>${ksbPctCell(r.behavioursPct)}</td>
      <td>${ksbRagBadge(rag)}</td>
    </tr>`;
  }).join('');
}

document.querySelectorAll('.sort-th').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if (ksbSortCol === col) {
      ksbSortAsc = !ksbSortAsc;
    } else {
      ksbSortCol = col;
      ksbSortAsc = true;
    }
    renderKSB();
  });
});

document.getElementById('ksb-lsc')?.addEventListener('change', function() {
  ksbLSCFilter = this.value;
  renderKSB();
});
document.getElementById('ksb-standard')?.addEventListener('change', function() {
  ksbStandardFilter = this.value;
  renderKSB();
});
document.getElementById('ksb-status')?.addEventListener('change', function() {
  ksbStatusFilter = this.value;
  renderKSB();
});

// ─── Curriculum ────────────────────────────────────────────────────────

function curriculumStatus(r) {
  // No Activity = zero parts completed (genuinely not started)
  if (r.partsComplete === 0) return 'No Activity';
  const gap = r.partsExpected - r.partsComplete;
  if (gap <= 0)  return 'On Track';
  if (gap === 1) return 'Off Track';
  return 'Behind';
}

function curriculumProgressBar(complete, total) {
  const filled = Math.min(complete, total);
  const bars = '█'.repeat(filled) + '░'.repeat(Math.max(0, total - filled));
  return `<span class="curr-progress">${bars}&nbsp;<span class="curr-progress-num">${complete}/${total}</span></span>`;
}

function curriculumStatusPill(status) {
  const cls = { 'On Track': 'curr-pill-ok', 'Off Track': 'curr-pill-amber', 'Behind': 'curr-pill-red', 'No Activity': 'curr-pill-grey' }[status] || '';
  return `<span class="curr-status-pill ${cls}">${status}</span>`;
}

function renderCurriculum() {
  const isLSC    = currentUser.role === 'lsc';
  const lscVal   = isLSC ? currentUser.coach : (document.getElementById('curr-lsc')?.value     || '');
  const stdVal   = document.getElementById('curr-standard')?.value || '';
  const statVal  = document.getElementById('curr-status')?.value   || '';

  const base = isLSC ? AD.curriculum.filter(r => r.lsc === currentUser.coach) : AD.curriculum;

  // KPI counts from base (before status filter)
  const statuses     = base.map(r => curriculumStatus(r));
  const onTrackCnt   = statuses.filter(s => s === 'On Track').length;
  const offTrackCnt  = statuses.filter(s => s === 'Off Track' || s === 'Behind').length;
  const noActCnt     = statuses.filter(s => s === 'No Activity').length;
  setText('curr-total',       base.length);
  setText('curr-on-track',    onTrackCnt);
  setText('curr-off-track',   offTrackCnt);
  setText('curr-no-activity', noActCnt);

  // Apply additional filters for table
  let rows = base;
  if (!isLSC && lscVal) rows = rows.filter(r => r.lsc === lscVal);
  if (stdVal)            rows = rows.filter(r => r.standard === stdVal);
  if (statVal)           rows = rows.filter(r => curriculumStatus(r) === statVal);

  // Sort: furthest behind first (largest gap between expected and complete)
  const statusOrder = {'No Activity': 0, 'Behind': 1, 'Off Track': 2, 'On Track': 3};
  rows.sort((a, b) => {
    const sa = statusOrder[curriculumStatus(a)] ?? 3;
    const sb = statusOrder[curriculumStatus(b)] ?? 3;
    if (sa !== sb) return sa - sb;
    return (b.partsExpected - b.partsComplete) - (a.partsExpected - a.partsComplete);
  });

  const countEl = document.getElementById('curr-panel-count');
  if (countEl) countEl.textContent = rows.length + ' learner' + (rows.length !== 1 ? 's' : '');

  const tbody = document.getElementById('curr-tbody');
  if (!tbody) return;
  if (rows.length === 0) {
    tbody.innerHTML = emptyRow(8, 'No learners match the selected filters.');
    return;
  }

  tbody.innerHTML = rows.map(r => {
    const status = curriculumStatus(r);
    const rowCls = (status === 'Behind' || status === 'No Activity') ? ' class="row-alert"' : '';
    return `<tr${rowCls}>
      <td>${r.name}</td>
      <td>${r.employer}</td>
      <td>${r.standard}</td>
      <td>${r.lsc}</td>
      <td style="font-size:0.8rem;">${r.sprint}</td>
      <td>${curriculumProgressBar(r.partsComplete, 8)}</td>
      <td>${fmtDate(r.lastActivity)}</td>
      <td>${curriculumStatusPill(status)}</td>
    </tr>`;
  }).join('');
  _tblIcons('curr-tbody');
}

// Curriculum filter listeners
document.getElementById('curr-lsc')?.addEventListener('change',      renderCurriculum);
document.getElementById('curr-standard')?.addEventListener('change', renderCurriculum);
document.getElementById('curr-status')?.addEventListener('change',   renderCurriculum);

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

// ─── Reporting state ───────────────────────────────────────────────────

// Builds a comprehensive last-meeting lookup for all KSB learners.
// Flagged learners (in TOUCHPOINT_DATA) get their actual overdue date.
// Compliant learners get a realistic recent date derived from their name
// (deterministic so results are consistent across runs).
function _buildMeetingLookup() {
  const map = {};
  AD.touchpoints.forEach(r => { map[r.name] = { lastMeeting: r.lastMeeting, meetingType: r.meetingType }; });
  const types = ['Progress Review', 'Interim Review', 'Learning Review'];
  AD.ksb.forEach(r => {
    if (!map[r.name]) {
      const h = Math.abs(r.name.split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0));
      map[r.name] = { lastMeeting: _isoAdd('2026-06-04', -(1 + h % 28)), meetingType: types[h % 3] };
    }
  });
  return map;
}

// Builds a comprehensive OTJ lookup for all KSB learners.
// Flagged learners (in OTJ_DATA) get their actual behind values.
// Compliant learners get synthesized on-track values.
function _buildOtjLookup() {
  const map = {};
  AD.otj.forEach(r => { map[r.name] = { otjPct: r.otjPct, otjExpected: r.otjExpected }; });
  AD.ksb.forEach(r => {
    if (!map[r.name]) {
      const h = Math.abs(r.name.split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0));
      const expected = 40 + (h % 35); // 40–74% expected (varies by programme stage)
      const actual   = Math.min(expected, expected - 1 + (h % 5)); // 0–4% below expected (on track)
      map[r.name] = { otjPct: actual, otjExpected: expected };
    }
  });
  return map;
}

// Helper: area badge for cross-provision view
const _ab = t => `<span class="area-badge area-${t}">${{compliance:'Compliance',delivery:'Delivery',welfare:'Welfare',curriculum:'Curriculum',gateway:'Gateway'}[t]||t}</span>`;

const REPORT_CONFIGS = {

  // ── All Areas (cross-provision) ──────────────────────────────────────
  all: {
    label: 'All Areas — Cross-Provision View',
    columns: ['Area', 'Learner', 'Employer', 'LSC', 'Issue / Status', 'Detail'],
    getData(f) {
      const rows = [];
      reportFilterBy(AD.touchpoints, f).forEach(r => rows.push({ _cols: [
        _ab('compliance'), r.name, r.employer, r.lsc, 'Outstanding touchpoint', `Last: ${fmtDate(r.lastMeeting)}`
      ]}));
      reportFilterBy(AD.sla, f).forEach(r => rows.push({ _cols: [
        _ab('compliance'), r.name, r.employer, r.lsc, 'Progress review overdue', `${r.weeksSince} weeks`
      ]}));
      reportFilterBy(AD.otj, f).forEach(r => rows.push({ _cols: [
        _ab('compliance'), r.name, r.employer, r.lsc, 'No OTJ evidence', `${r.otjPct}% / ${r.otjExpected}% expected`
      ]}));
      reportFilterBy(AD.starters, f).filter(r => !(r.firstDayDone && r.checklistDone)).forEach(r => rows.push({ _cols: [
        _ab('compliance'), r.name, r.employer, r.lsc, 'Awaiting first meeting', `Started: ${fmtDate(r.plannedStart)}`
      ]}));
      reportFilterBy(AD.oof, f).forEach(r => rows.push({ _cols: [
        _ab('delivery'), r.name, r.employer, r.lsc, statusPill(r.status), portfolioRagBadge(r.portfolioRag)
      ], _rowClass: r.portfolioRag === 'red' ? 'row-alert' : '' }));
      reportFilterBy(AD.bil, f).forEach(r => rows.push({ _cols: [
        _ab('delivery'), r.name, r.employer, r.lsc, statusPill(r.status), r.expectedRtl ? `RTL: ${fmtDate(r.expectedRtl)}` : 'RTL TBC'
      ]}));
      reportFilterBy(AD.ksb, f).filter(r => ksbRag(r) !== 'green').forEach(r => rows.push({ _cols: [
        _ab('delivery'), r.name, r.employer, r.lsc, `KSB: ${ksbRag(r).replace('-',' ')}`, ksbRagBadge(ksbRag(r))
      ], _rowClass: ksbRag(r) === 'super-red' ? 'row-alert' : '' }));
      reportFilterBy(AD.curriculum, f).filter(r => curriculumStatus(r) !== 'On Track').forEach(r => rows.push({ _cols: [
        _ab('curriculum'), r.name, r.employer, r.lsc, `Curriculum: ${curriculumStatus(r)}`, r.sprint
      ], _rowClass: ['Behind','No Activity'].includes(curriculumStatus(r)) ? 'row-alert' : '' }));
      reportFilterBy(AD.als, f).forEach(r => rows.push({ _cols: [
        _ab('welfare'), r.name, r.standard || '—', r.lsc, 'ALS support', r.need
      ]}));
      reportFilterBy(AD.safeguarding, f).forEach(r => rows.push({ _cols: [
        _ab('welfare'), r.name, '—', r.lsc, `<span class="${r.status === 'active' ? 'status-active' : 'status-closed'}">${r.status}</span>`, r.category
      ]}));
      reportFilterBy(AD.welfareDue, f).forEach(r => rows.push({ _cols: [
        _ab('welfare'), r.name, '—', r.lsc, 'Welfare check-in due', `${r.daysSince}d ago`
      ], _rowClass: r.daysSince > 14 ? 'row-alert' : '' }));
      return rows;
    }
  },

  // ── Compliance ────────────────────────────────────────────────────────
  touchpoints: {
    label: 'Learner Touchpoints',
    columns: ['Learner', 'Employer', 'LSC', 'Date of Last Meeting', 'Meeting Type'],
    getData(f) {
      const touchMap = _buildMeetingLookup();
      return reportFilterBy(AD.ksb, f)
        .sort((a,b) => {
          const ta = touchMap[a.name], tb = touchMap[b.name];
          if (!ta?.lastMeeting && !tb?.lastMeeting) return 0;
          if (!ta?.lastMeeting) return 1; if (!tb?.lastMeeting) return -1;
          return new Date(ta.lastMeeting) - new Date(tb.lastMeeting);
        })
        .map(r => {
          const t = touchMap[r.name];
          return { _cols: [r.name, r.employer, r.lsc, t?.lastMeeting ? fmtDate(t.lastMeeting) : '—', t?.meetingType || '—'] };
        });
    }
  },
  sla: {
    label: 'Progress Reviews',
    columns: ['Learner', 'Employer', 'LSC', 'Last Progress Review', 'Review Due By', 'Weeks Since Last Review', 'Status'],
    getData(f) {
      return reportFilterBy(AD.sla, f)
        .sort((a,b) => b.weeksSince - a.weeksSince)
        .map(r => {
          const over = r.weeksSince >= 10;
          return { _cols: [
            r.name, r.employer, r.lsc,
            fmtDate(r.lastReview), addDays(r.lastReview, 70),
            r.weeksSince + ' weeks',
            over ? `<span class="weeks-pill urgent">${r.weeksSince} wks overdue</span>` : `<span class="weeks-pill warning">Approaching</span>`
          ], _rowClass: over ? 'row-alert' : '' };
        });
    }
  },
  otj: {
    label: 'OTJ Compliance',
    columns: ['Learner', 'Employer', 'LSC', 'OTJ Completed', 'OTJ Expected', 'Last Entry Date'],
    getData(f) {
      return reportFilterBy(AD.otj, f)
        .sort((a,b) => new Date(a.lastEntry) - new Date(b.lastEntry))
        .map(r => ({ _cols: [
          r.name, r.employer, r.lsc, r.otjPct + '%', r.otjExpected + '%', fmtDate(r.lastEntry)
        ], _rowClass: (r.otjExpected - r.otjPct) > 15 ? 'row-alert' : '' }));
    }
  },
  starters: {
    label: 'Awaiting First LSC Meeting',
    columns: ['Learner', 'Employer', 'Standard', 'LSC', 'Planned Start', 'FDOL Entry'],
    getData(f) {
      return reportFilterBy(AD.starters, f)
        .filter(r => !(r.firstDayDone && r.checklistDone))
        .sort((a,b) => new Date(a.plannedStart) - new Date(b.plannedStart))
        .map(r => ({ _cols: [
          r.name, r.employer, r.standard || '—', r.lsc, fmtDate(r.plannedStart),
          r.firstDayDone ? '<span class="check-yes">✓</span>' : '<span class="check-no">—</span>',
        ]}));
    }
  },
  oof: {
    label: 'Out of Funding (OOF)',
    columns: ['Learner', 'Employer', 'Standard', 'LSC', 'Status', 'Portfolio RAG', 'Month Expected', 'Notes'],
    getData(f) {
      return reportFilterBy(AD.oof, f)
        .sort((a,b) => new Date(a.plannedGateway) - new Date(b.plannedGateway))
        .map(r => ({ _cols: [
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
      const def = (a,b) => { if (!a.expectedRtl) return -1; if (!b.expectedRtl) return 1; return new Date(a.expectedRtl) - new Date(b.expectedRtl); };
      return reportFilterBy(AD.bil, f).sort(def).map(r => ({ _cols: [
        r.name, r.employer, r.standard, r.lsc,
        statusPill(r.status), fmtDate(r.ldol),
        r.expectedRtl ? fmtDate(r.expectedRtl) : '<span class="cell-alert">Not confirmed</span>', r.notes
      ], _wideCol: 7 }));
    }
  },

  // ── Delivery / KSB ───────────────────────────────────────────────────
  ksb_tracker: {
    label: 'KSB Tracker — All Learners',
    columns: ['Learner', 'Employer', 'Standard', 'LSC', 'Start Date', 'Planned Gateway', 'Status', 'Knowledge', 'Skills', 'Behaviours', 'RAG'],
    getData(f) {
      return reportFilterBy(AD.ksb, f).map(r => ({ _cols: [
        r.name, r.employer, r.standard, r.lsc,
        fmtDate(r.startDate), fmtDate(r.plannedGateway),
        ksbStatusPill(r.status),
        ksbPctCell(r.knowledgePct), ksbPctCell(r.skillsPct), ksbPctCell(r.behavioursPct),
        ksbRagBadge(ksbRag(r))
      ], _rowClass: ksbRag(r) === 'super-red' ? 'row-alert' : '' }));
    }
  },

  // ── Gateway ───────────────────────────────────────────────────────────
  gateway: {
    label: 'Gateway Forecast — All Quarters',
    columns: ['Learner', 'Employer', 'Standard', 'LSC', 'Quarter', 'Status', 'Planned Gateway', 'Month Expected', 'Portfolio RAG'],
    getData(f) {
      const q = (src, label) => reportFilterBy(src, f).map(r => ({ _cols: [
        r.name, r.employer, r.standard, r.lsc, label,
        statusPill(r.status), fmtDate(r.plannedGateway),
        r.monthExpected || '—', portfolioRagBadge(r.portfolioRag)
      ]}));
      return [...q(AD.gwQ2, 'Q2 2026'), ...q(AD.gwQ3, 'Q3 2026'), ...q(AD.gwQ4, 'Q4 2026')];
    }
  },

  // ── Curriculum ────────────────────────────────────────────────────────
  curriculum: {
    label: 'Curriculum Progress',
    columns: ['Learner', 'Employer', 'Standard', 'LSC', 'Current Sprint', 'Parts Complete', 'Last Activity', 'Status'],
    getData(f) {
      const so = {'No Activity':0,'Behind':1,'Off Track':2,'On Track':3};
      return reportFilterBy(AD.curriculum, f)
        .sort((a,b) => (so[curriculumStatus(a)]??3) - (so[curriculumStatus(b)]??3))
        .map(r => {
          const st = curriculumStatus(r);
          return { _cols: [
            r.name, r.employer, r.standard, r.lsc, r.sprint,
            `${r.partsComplete} / 8`, fmtDate(r.lastActivity), curriculumStatusPill(st)
          ], _rowClass: ['Behind','No Activity'].includes(st) ? 'row-alert' : '' };
        });
    }
  },

  // ── Welfare ───────────────────────────────────────────────────────────
  welfare_als: {
    label: 'ALS Register',
    columns: ['Learner', 'Standard', 'LSC', 'Declared Need', 'Adjustments'],
    getData(f) {
      return reportFilterBy(AD.als, f).map(r => ({ _cols: [
        r.name, r.standard, r.lsc, r.need, r.adjustments
      ], _wideCol: 4 }));
    }
  },
  welfare_safeguarding: {
    label: 'Safeguarding & Welfare Concerns',
    columns: ['Learner', 'LSC', 'Type', 'Category / Reason', 'Status / Days Since', 'Last Action / Check-in', 'Notes'],
    getData(f) {
      const sg = reportFilterBy(AD.safeguarding, f).map(r => ({ _cols: [
        r.name, r.lsc, '<span class="welfare-type-sg">Safeguarding</span>', r.category,
        `<span class="${r.status === 'active' ? 'status-active' : 'status-closed'}">${r.status}</span>`,
        fmtDate(r.lastAction), r.notes
      ], _wideCol: 6 }));
      const wd = reportFilterBy(AD.welfareDue, f).map(r => ({ _cols: [
        r.name, r.lsc, '<span class="welfare-type-check">Welfare Check-in</span>', r.reason,
        `<span class="weeks-pill ${r.daysSince > 14 ? 'urgent' : 'warning'}">${r.daysSince}d ago</span>`,
        fmtDate(r.lastCheckin), '—'
      ], _rowClass: r.daysSince > 14 ? 'row-alert' : '' }));
      return [...sg, ...wd];
    }
  },
  welfare_due: {
    label: 'Welfare Check-ins Due',
    columns: ['Learner', 'LSC', 'Reason for Monitoring', 'Last Check-in', 'Days Since'],
    getData(f) {
      return reportFilterBy(AD.welfareDue, f)
        .sort((a,b) => b.daysSince - a.daysSince)
        .map(r => ({ _cols: [
          r.name, r.lsc, r.reason, fmtDate(r.lastCheckin),
          `<span class="weeks-pill ${r.daysSince > 14 ? 'urgent' : 'warning'}">${r.daysSince}d ago</span>`
        ], _rowClass: r.daysSince > 14 ? 'row-alert' : '' }));
    }
  },

  // ── Full Learner List ─────────────────────────────────────────────────
  learner_list: {
    label: 'Full Learner List (KSB Standards)',
    columns: ['Learner', 'Employer', 'Standard', 'LSC', 'Start Date', 'Planned Gateway', 'Status', 'KSB RAG'],
    getData(f) {
      return reportFilterBy(AD.ksb, f)
        .sort((a,b) => a.lsc.localeCompare(b.lsc) || a.name.localeCompare(b.name))
        .map(r => ({ _cols: [
          r.name, r.employer, r.standard, r.lsc,
          fmtDate(r.startDate), fmtDate(r.plannedGateway),
          ksbStatusPill(r.status), ksbRagBadge(ksbRag(r))
        ]}));
    }
  },

  // ── Standard Reports ──────────────────────────────────────────────────

  caseload: {
    label: 'LSC Full Caseload Report',
    columns: ['Learner Name','Employer Name','Standard','LSC','Status','Learning Start Date','Planned Gateway Date','OTJ Actual','OTJ Expected','Learning End Date','KSB Progress','Curriculum Progress','Overall RAG','Date of Last Meeting','Meeting Type','LLDD / Declared'],
    getData(f) {
      const ksbBase  = reportFilterBy(AD.ksb, f);
      const otjMap   = _buildOtjLookup();
      const touchMap = _buildMeetingLookup();
      const currMap  = Object.fromEntries(AD.curriculum.map(r => [r.name, r]));
      const alsMap   = Object.fromEntries(AD.als.map(r => [r.name, r.need]));
      return ksbBase.sort((a,b) => a.lsc.localeCompare(b.lsc)||a.name.localeCompare(b.name)).map(r => {
        const otj   = otjMap[r.name] || {};
        const touch = touchMap[r.name] || {};
        const curr  = currMap[r.name];
        const rag   = ksbRag(r);
        const endDate  = r.plannedGateway ? fmtDate(_isoAdd(r.plannedGateway, 90)) : '—';
        const ksbProg  = `K:${r.knowledgePct}% | S:${r.skillsPct}% | B:${r.behavioursPct}%`;
        const currProg = curr ? `${curr.sprint} (${curr.partsComplete}/8)` : '—';
        return { _cols: [
          r.name, r.employer, r.standard, r.lsc, ksbStatusPill(r.status),
          fmtDate(r.startDate), fmtDate(r.plannedGateway),
          otj.otjPct != null ? otj.otjPct + '%' : '—',
          otj.otjExpected != null ? otj.otjExpected + '%' : '—',
          endDate, ksbProg, currProg, ksbRagBadge(rag),
          touch.lastMeeting ? fmtDate(touch.lastMeeting) : '—',
          touch.meetingType || '—',
          alsMap[r.name] || '—'
        ], _rowClass: rag === 'super-red' ? 'row-alert' : '' };
      });
    }
  },

  employer_report: {
    label: 'Standard Employer Report',
    columns: ['Learner Name','Employer Name','Standard','LSC','Status','Learning Start Date','Planned Gateway Date','OTJ Actual','OTJ Expected','Learning End Date','KSB Progress','Curriculum Progress','Overall RAG','LSC Commentary'],
    getData(f) {
      const otjMap  = _buildOtjLookup();
      const currMap = Object.fromEntries(AD.curriculum.map(r => [r.name, r]));
      return reportFilterBy(AD.ksb, f)
        .sort((a,b) => a.employer.localeCompare(b.employer)||a.name.localeCompare(b.name))
        .map(r => {
          const otj  = otjMap[r.name] || {};
          const curr = currMap[r.name];
          const rag  = ksbRag(r);
          const endDate  = r.plannedGateway ? fmtDate(_isoAdd(r.plannedGateway, 90)) : '—';
          const ksbProg  = `K:${r.knowledgePct}% | S:${r.skillsPct}% | B:${r.behavioursPct}%`;
          const currProg = curr ? `${curr.sprint} (${curr.partsComplete}/8)` : '—';
          return { _cols: [
            r.name, r.employer, r.standard, r.lsc, ksbStatusPill(r.status),
            fmtDate(r.startDate), fmtDate(r.plannedGateway),
            otj.otjPct != null ? otj.otjPct + '%' : '—',
            otj.otjExpected != null ? otj.otjExpected + '%' : '—',
            endDate, ksbProg, currProg, ksbRagBadge(rag), '—'
          ], _rowClass: rag === 'super-red' ? 'row-alert' : '' };
        });
    }
  },

  ksb_progress: {
    label: 'KSB Progress',
    columns: ['Employer','Learner','Standard','LSC','Start Date','Planned Gateway','Status','Knowledge','Skills','Behaviours','RAG'],
    getData(f) {
      return reportFilterBy(AD.ksb, f).map(r => ({ _cols: [
        r.employer, r.name, r.standard, r.lsc, fmtDate(r.startDate), fmtDate(r.plannedGateway),
        ksbStatusPill(r.status), ksbPctCell(r.knowledgePct), ksbPctCell(r.skillsPct), ksbPctCell(r.behavioursPct), ksbRagBadge(ksbRag(r))
      ], _rowClass: ksbRag(r) === 'super-red' ? 'row-alert' : '' }));
    }
  },

  curriculum_progress: {
    label: 'Curriculum Progress',
    columns: ['Learner','Employer','Standard','LSC','Current Sprint','Sprint Progress','Last Activity','Status'],
    getData(f) {
      const so = {'No Activity':0,'Behind':1,'Off Track':2,'On Track':3};
      return reportFilterBy(AD.curriculum, f)
        .sort((a,b) => (so[curriculumStatus(a)]??3)-(so[curriculumStatus(b)]??3))
        .map(r => {
          const st = curriculumStatus(r);
          return { _cols: [r.name, r.employer, r.standard, r.lsc, r.sprint, curriculumProgressBar(r.partsComplete, 8), fmtDate(r.lastActivity), curriculumStatusPill(st)],
                   _rowClass: ['Behind','No Activity'].includes(st) ? 'row-alert' : '' };
        });
    }
  },

  // ── Sales ─────────────────────────────────────────────────────────────
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

// Quick Reports — pre-filtered one-click reports
const REPORT_PRESETS = [
  // Compliance
  { id: 'awaiting-meeting',  area: 'starters',             extra: {} },
  { id: 'reviews-overdue',   area: 'sla',                  extra: {} },
  { id: 'bil-decision',      area: 'bil',                  extra: { status: 'BIL Decision Needed' } },
  { id: 'oof-red',           area: 'oof',                  extra: { portfolioRag: 'red' } },
  // Delivery
  { id: 'ksb-atrisk',        area: 'ksb_progress',         extra: {} },
  { id: 'curriculum-behind', area: 'curriculum_progress',  extra: {} },
  // Gateway
  { id: 'gateway-red',       area: 'gateway',              extra: { portfolioRag: 'red' } },
  // Welfare
  { id: 'welfare-active',    area: 'welfare_safeguarding', extra: { status: 'active' } },
  { id: 'welfare-checkins',  area: 'welfare_due',          extra: {} },
  { id: 'als-register',      area: 'welfare_als',          extra: {} },
  // Sales
  { id: 'pipeline',          area: 'pipeline',             extra: {} },
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

const REPORT_MAX_ROWS = 500;

function runReport(areaOverride, extraFilters) {
  const area    = areaOverride || document.getElementById('rf-area')?.value || 'all';
  const filters = { ...getReportFilters(), ...(extraFilters || {}) };

  // Sales Manager can only access the sales pipeline
  if (currentUser.role === 'sales' && area !== 'pipeline') {
    const notice = document.getElementById('report-role-notice');
    if (notice) { notice.style.display = ''; return; }
    return;
  }
  const notice = document.getElementById('report-role-notice');
  if (notice) notice.style.display = 'none';

  const config = REPORT_CONFIGS[area];
  if (!config) return;

  const allRows = config.getData(filters);
  const truncated = allRows.length > REPORT_MAX_ROWS;
  const rows = truncated ? allRows.slice(0, REPORT_MAX_ROWS) : allRows;

  activeReportConfig = config;
  activeReportRows   = allRows; // export always uses full set

  setText('report-results-title', config.label);
  const countEl = document.getElementById('report-results-count');
  if (countEl) countEl.textContent = allRows.length + ' record' + (allRows.length !== 1 ? 's' : '');

  // Row limit notice
  const limitEl = document.getElementById('report-limit-notice');
  if (limitEl) {
    limitEl.style.display = truncated ? '' : 'none';
    if (truncated) limitEl.textContent = `Showing first ${REPORT_MAX_ROWS} of ${allRows.length} records. Export CSV to see all.`;
  }

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
  const current = sel.value;
  while (sel.options.length > 1) sel.remove(1);
  const employers = new Set(
    [AD.touchpoints, AD.sla, AD.otj, AD.starters, AD.oof, AD.bil,
     AD.gwQ2, AD.gwQ3, AD.gwQ4, PIPELINE_ENTRIES]
      .flatMap(arr => arr.map(r => r.employer).filter(Boolean))
  );
  [...employers].sort().forEach(e => {
    const opt = document.createElement('option');
    opt.value = opt.textContent = e;
    sel.appendChild(opt);
  });
  sel.value = current;
}

function syncCoachDropdowns() {
  const coaches = currentSize === 1000 ? COACHES_1000 : COACHES_1000.slice(0, 5);
  const selectors = [
    'delivery-lsc', 'delivery-dash-lsc', 'gw-forecast-lsc',
    'welfare-lsc', 'learner-voice-lsc', 'ksb-lsc', 'curr-lsc', 'rf-lsc',
  ];
  selectors.forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    const current = sel.value;
    // Keep first "All" option, replace the rest
    while (sel.options.length > 1) sel.remove(1);
    coaches.forEach(name => {
      const opt = document.createElement('option');
      opt.value = opt.textContent = name;
      sel.appendChild(opt);
    });
    // Restore selection if still valid
    if ([...sel.options].some(o => o.value === current)) sel.value = current;
  });
}

// Use event delegation so all preset pills work regardless of load order
document.addEventListener('click', e => {
  const btn = e.target.closest('.report-preset-pill');
  if (!btn) return;
  const preset = REPORT_PRESETS.find(p => p.id === btn.dataset.preset);
  if (!preset) return;
  // Clear previous results and deselect any SR card
  document.querySelectorAll('.sr-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.report-preset-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const areaEl = document.getElementById('rf-area');
  if (areaEl) areaEl.value = preset.area;
  // Reset extra filters first, then apply preset's extras
  const rRag = document.getElementById('rf-rag');    if (rRag) rRag.value = '';
  const rStt = document.getElementById('rf-status'); if (rStt) rStt.value = '';
  if (preset.extra.portfolioRag && rRag) rRag.value = preset.extra.portfolioRag;
  if (preset.extra.status && rStt)       rStt.value = preset.extra.status;
  runReport(preset.area, preset.extra);
});

// Tracks the currently selected standard report type
let _currentSrType = '';

document.getElementById('report-run-btn')?.addEventListener('click', () => {
  document.querySelectorAll('.report-preset-pill').forEach(b => b.classList.remove('active'));
  runReport(_currentSrType || undefined); // use stored type, not the broken hidden select
});

// ─── Standard Report selection ─────────────────────────────────────────
function selectStandardReport(type) {
  _currentSrType = type;

  // Highlight selected card
  document.querySelectorAll('.sr-card').forEach(c => c.classList.toggle('active', c.dataset.report === type));

  // Show filter area
  const filtersEl = document.getElementById('sr-filters');
  if (filtersEl) filtersEl.style.display = type ? '' : 'none';

  // Show/hide specific filter groups based on report type
  const show = (id, vis) => { const el = document.getElementById(id); if (el) el.style.display = vis ? '' : 'none'; };
  const isLSCUser = currentUser.role === 'lsc';
  show('sr-grp-lsc',    !isLSCUser); // LSC users never see this
  show('sr-grp-std',    ['caseload','employer_report','ksb_progress','curriculum_progress'].includes(type));
  show('sr-grp-status', type === 'caseload');
  show('sr-grp-emp',    type === 'employer_report');
  // no extra-cols section any more

  // Reset non-relevant filters
  if (!['caseload','learner_status'].includes(type)) { const el = document.getElementById('rf-status'); if (el) el.value = ''; }
  if (type !== 'employer_report') { const el = document.getElementById('rf-employer'); if (el) el.value = ''; }

  // Hide results from previous run
  const panel = document.getElementById('report-results-panel');
  const expBtn = document.getElementById('report-export-btn');
  if (panel)  panel.style.display  = 'none';
  if (expBtn) expBtn.style.display = 'none';
}


// SR card click delegation
document.addEventListener('click', e => {
  const card = e.target.closest('.sr-card');
  if (card?.dataset?.report) selectStandardReport(card.dataset.report);
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
syncCoachDropdowns();
populateEmployerDropdown();
renderAll();
renderPipeline();
renderGateway();
renderGatewayForecast();
renderWelfare();
renderDeliveryDash();

console.log('Boom Training Dashboard loaded ✅');
