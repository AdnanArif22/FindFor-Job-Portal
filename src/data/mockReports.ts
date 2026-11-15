import { ReportItem } from '../types';

export const initialReports: ReportItem[] = [
  {
    id: 'rep-1',
    targetType: 'job',
    targetId: 'job-flagged-1',
    targetName: 'Work From Home Data Entry $500/hr (Suspicious)',
    reason: 'Potential scam listing requesting personal bank account info upfront.',
    reportedBy: 'user-cand-2 (David Chen)',
    date: '2026-11-08',
    status: 'pending'
  },
  {
    id: 'rep-2',
    targetType: 'user',
    targetId: 'user-suspended-1',
    targetName: 'Spammy Bot Account (unverified-bot@scammail.test)',
    reason: 'Automated mass messaging to applicants with external links.',
    reportedBy: 'Platform Automated Filter',
    date: '2026-11-06',
    status: 'resolved'
  },
  {
    id: 'rep-3',
    targetType: 'company',
    targetId: 'comp-unverified-9',
    targetName: 'Apex Virtual Logistics Inc',
    reason: 'Misrepresenting company headquarters and unregistered business entity.',
    reportedBy: 'user-cand-3 (Elena Rostova)',
    date: '2026-11-04',
    status: 'pending'
  },
  {
    id: 'rep-4',
    targetType: 'job',
    targetId: 'job-expired-test',
    targetName: 'Outdated Sales Lead Contract',
    reason: 'Duplicate listing already closed 3 weeks ago.',
    reportedBy: 'user-cand-1 (Alex Morgan)',
    date: '2026-10-30',
    status: 'dismissed'
  }
];
