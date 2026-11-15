import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../../components/common/Badge';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Job, JobStatus } from '../../types';
import {
  Briefcase,
  Search,
  PlusCircle,
  Edit,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const ManageJobsPage: React.FC = () => {
  const { jobs, setJobStatus, deleteJob } = useJobs();
  const { currentUser } = useAuth();
  const { showSuccess, showInfo } = useToast();

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'draft' | 'closed'>('all');
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

  const myJobs = jobs.filter(
    (j) => j.companyId === currentUser.companyId || j.companyName === currentUser.companyName
  );

  const displayJobs = (myJobs.length > 0 ? myJobs : jobs).filter((j) => {
    if (activeTab !== 'all' && j.status !== activeTab) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        j.title.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleToggleStatus = (jobId: string, currentStatus: JobStatus) => {
    const nextStatus = currentStatus === 'active' ? 'closed' : 'active';
    setJobStatus(jobId, nextStatus);
    showSuccess('Job Status Updated (Demo)', `Job status changed to ${nextStatus}.`);
  };

  const handleConfirmDelete = () => {
    if (jobToDelete) {
      deleteJob(jobToDelete.id);
      showInfo('Job Deleted (Demo)', `Removed "${jobToDelete.title}" listing.`);
      setJobToDelete(null);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Employer Dashboard', path: '/employer/dashboard' },
          { label: 'Manage Job Listings' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            Manage Job Listings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review active positions, publish drafted roles, or close completed searches.
          </p>
        </div>

        <Link
          to="/employer/jobs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow-soft transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Job Post</span>
        </Link>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 w-full sm:w-auto">
          {(['all', 'active', 'draft', 'closed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                activeTab === tab
                  ? 'bg-white text-navy-800 shadow-sm'
                  : 'text-slate-600 hover:text-navy-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search job listings..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800 shadow-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-soft-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-5 font-bold">Job Title & Details</th>
                <th className="py-3.5 px-5 font-bold">Category</th>
                <th className="py-3.5 px-5 font-bold">Applicants</th>
                <th className="py-3.5 px-5 font-bold">Status</th>
                <th className="py-3.5 px-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-5">
                    <div>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="font-bold text-navy-800 hover:text-teal-600 text-sm leading-snug"
                      >
                        {job.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                        <span>{job.location} ({job.workplaceType})</span>
                        <span>•</span>
                        <span>{job.jobType}</span>
                        <span>•</span>
                        <span>Posted {job.postedDate}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-slate-700 font-medium">{job.category}</td>
                  <td className="py-4 px-5">
                    <span className="font-bold text-navy-800 bg-slate-100 px-2 py-0.5 rounded-full">
                      {job.applicantsCount} candidates
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <Badge status={job.status} size="sm" />
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="p-1.5 text-slate-400 hover:text-navy-800 rounded-lg hover:bg-slate-100"
                        title="View Live Listing"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleToggleStatus(job.id, job.status)}
                        className="p-1.5 text-slate-400 hover:text-teal-600 rounded-lg hover:bg-slate-100"
                        title={job.status === 'active' ? 'Close job' : 'Reactivate job'}
                      >
                        {job.status === 'active' ? (
                          <XCircle className="w-4 h-4 text-amber-500" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        )}
                      </button>

                      <button
                        onClick={() => setJobToDelete(job)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                        title="Delete Job Post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {displayJobs.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500">
            No job postings found matching "{search}".
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!jobToDelete}
        title="Delete Job Post"
        message={`Are you sure you want to delete "${jobToDelete?.title}"? This will remove the listing from both public search and your employer dashboard.`}
        confirmLabel="Yes, Delete Job"
        cancelLabel="Keep Job"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setJobToDelete(null)}
      />
    </div>
  );
};
