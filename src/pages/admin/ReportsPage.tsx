import React, { useState } from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { useToast } from '../../context/ToastContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { ReportItem } from '../../types';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Search,
  Filter,
  Calendar,
  User,
  Building2,
  Briefcase
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { reports, resolveReport } = useApplications();
  const { showSuccess, showInfo } = useToast();

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved' | 'dismissed'>('all');

  const filteredReports = reports.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    return true;
  });

  const handleAction = (reportId: string, action: 'resolved' | 'dismissed') => {
    resolveReport(reportId, action);
    if (action === 'resolved') {
      showSuccess('Report Resolved (Demo)', 'Report marked as resolved.');
    } else {
      showInfo('Report Dismissed (Demo)', 'Report was reviewed and dismissed.');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Admin Dashboard', path: '/admin/dashboard' },
          { label: 'Moderation Reports' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            Flagged Content & User Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Investigate suspicious listings, scam alerts, and policy violations submitted by community members.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 self-start sm:self-auto">
          {(['all', 'pending', 'resolved', 'dismissed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                statusFilter === tab
                  ? 'bg-white text-navy-800 shadow-sm'
                  : 'text-slate-600 hover:text-navy-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4 flex-1">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 font-bold ${
                  report.status === 'pending'
                    ? 'bg-rose-50 text-rose-600'
                    : report.status === 'resolved'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Target: {report.targetType}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                      report.status === 'pending'
                        ? 'bg-rose-100 text-rose-800'
                        : report.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-navy-800">{report.targetName}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Report Reason:</strong> {report.reason}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                  <span>Reported by: <strong>{report.reportedBy}</strong></span>
                  <span>•</span>
                  <span>Date: {report.date}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {report.status === 'pending' && (
              <div className="flex items-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                <button
                  onClick={() => handleAction(report.id, 'resolved')}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Resolved</span>
                </button>

                <button
                  onClick={() => handleAction(report.id, 'dismissed')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Dismiss</span>
                </button>
              </div>
            )}
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-xs text-slate-500">
            No moderation reports in "{statusFilter}" status.
          </div>
        )}
      </div>
    </div>
  );
};
