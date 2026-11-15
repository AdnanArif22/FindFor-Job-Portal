import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../../components/common/Badge';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Job } from '../../types';
import {
  ShieldCheck,
  Search,
  Check,
  X,
  Eye,
  AlertTriangle,
  Building2,
  Trash2
} from 'lucide-react';

export const JobModerationPage: React.FC = () => {
  const { jobs, setJobStatus, deleteJob } = useJobs();
  const { showSuccess, showInfo } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredJobs = jobs.filter((job) => {
    if (statusFilter !== 'all' && job.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        job.title.toLowerCase().includes(q) ||
        job.companyName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApprove = (jobId: string, title: string) => {
    setJobStatus(jobId, 'active');
    showSuccess('Job Approved (Demo)', `"${title}" has been published live.`);
  };

  const handleReject = (jobId: string, title: string) => {
    setJobStatus(jobId, 'closed');
    showInfo('Job Rejected (Demo)', `"${title}" was rejected and marked closed.`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Admin Dashboard', path: '/admin/dashboard' },
          { label: 'Job Moderation' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            Job Posting Moderation
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review employer job posts for compliance with platform quality standards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs or companies..."
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-navy-800 shadow-sm"
          />
        </div>
      </div>

      {/* Moderation Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-soft-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-5 font-bold">Job & Company</th>
                <th className="py-3.5 px-5 font-bold">Category</th>
                <th className="py-3.5 px-5 font-bold">Salary Range</th>
                <th className="py-3.5 px-5 font-bold">Current Status</th>
                <th className="py-3.5 px-5 font-bold text-right">Moderator Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-5">
                    <div>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="font-bold text-navy-800 hover:text-teal-600 text-sm leading-snug"
                      >
                        {job.title}
                      </Link>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {job.companyName} • {job.location} ({job.workplaceType})
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-5 font-medium text-slate-700">{job.category}</td>
                  <td className="py-4 px-5 font-semibold text-navy-800">
                    ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}/yr
                  </td>
                  <td className="py-4 px-5">
                    <Badge status={job.status} size="sm" />
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleApprove(job.id, job.title)}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl flex items-center gap-1 transition-colors"
                        title="Approve Job"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>

                      <button
                        onClick={() => handleReject(job.id, job.title)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl flex items-center gap-1 transition-colors"
                        title="Reject Job"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
