import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../../components/common/Badge';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Application, ApplicationStatus } from '../../types';
import {
  Briefcase,
  Calendar,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trash2,
  Sparkles,
  ChevronRight,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export const MyApplicationsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { applications, withdrawApplication } = useApplications();
  const { showSuccess, showInfo } = useToast();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [appToWithdraw, setAppToWithdraw] = useState<Application | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const myApplications = applications.filter((app) => app.candidateId === currentUser.id);

  const filteredApplications = myApplications.filter((app) => {
    if (statusFilter === 'All') return true;
    return app.status === statusFilter;
  });

  const handleConfirmWithdraw = () => {
    if (appToWithdraw) {
      withdrawApplication(appToWithdraw.id);
      showInfo('Application Withdrawn (Demo)', `Withdrew application for "${appToWithdraw.jobTitle}"`);
      setAppToWithdraw(null);
    }
  };

  const getWorkflowStep = (status: ApplicationStatus) => {
    switch (status) {
      case 'Pending':
        return 1;
      case 'Shortlisted':
        return 2;
      case 'Interview':
        return 3;
      case 'Hired':
        return 4;
      case 'Rejected':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Candidate Dashboard', path: '/candidate/dashboard' },
          { label: 'My Applications' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            My Job Applications
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track real-time candidate stage progression through the recruitment pipeline.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Pending', 'Shortlisted', 'Interview', 'Hired', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === status
                  ? 'bg-navy-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length > 0 ? (
        <div className="space-y-6">
          {filteredApplications.map((app) => {
            const currentStep = getWorkflowStep(app.status);
            const isRejected = app.status === 'Rejected';

            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-soft-sm hover:shadow-soft-md transition-all space-y-6"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={app.companyLogo}
                      alt={app.companyName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 p-1 bg-white shadow-sm"
                    />
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-navy-800 hover:text-teal-600 transition-colors">
                        <Link to={`/jobs/${app.jobId}`}>{app.jobTitle}</Link>
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">{app.companyName}</span>
                        <span>•</span>
                        <span>Applied on {app.appliedDate}</span>
                        <span>•</span>
                        <span className="text-teal-600 font-bold">
                          {app.skillMatchScore}% Skill Match
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge status={app.status} size="lg" />
                    <button
                      onClick={() => setAppToWithdraw(app)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Withdraw Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress / Timeline Workflow Visualizer */}
                <div className="pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Application Pipeline Progression
                  </p>
                  <div className="grid grid-cols-4 gap-2 relative">
                    {/* Stage 1: Submitted */}
                    <div className="text-center">
                      <div
                        className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-colors ${
                          currentStep >= 1
                            ? 'bg-teal-500 text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        1
                      </div>
                      <span className="text-[11px] font-semibold text-navy-800 block">Submitted</span>
                      <span className="text-[10px] text-slate-400">Application logged</span>
                    </div>

                    {/* Stage 2: Shortlisted */}
                    <div className="text-center">
                      <div
                        className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-colors ${
                          currentStep >= 2
                            ? 'bg-teal-500 text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        2
                      </div>
                      <span className="text-[11px] font-semibold text-navy-800 block">Shortlisted</span>
                      <span className="text-[10px] text-slate-400">Profile screened</span>
                    </div>

                    {/* Stage 3: Interview */}
                    <div className="text-center">
                      <div
                        className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-colors ${
                          currentStep >= 3
                            ? 'bg-teal-500 text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        3
                      </div>
                      <span className="text-[11px] font-semibold text-navy-800 block">Interview</span>
                      <span className="text-[10px] text-slate-400">Technical round</span>
                    </div>

                    {/* Stage 4: Decision */}
                    <div className="text-center">
                      <div
                        className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-colors ${
                          currentStep >= 4
                            ? isRejected
                              ? 'bg-rose-500 text-white'
                              : 'bg-emerald-500 text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        4
                      </div>
                      <span
                        className={`text-[11px] font-semibold block ${
                          isRejected ? 'text-rose-600' : 'text-emerald-700'
                        }`}
                      >
                        {isRejected ? 'Not Selected' : app.status === 'Hired' ? 'Offer Made' : 'Decision'}
                      </span>
                      <span className="text-[10px] text-slate-400">Final Outcome</span>
                    </div>
                  </div>
                </div>

                {/* Interview Date Alert (if scheduled) */}
                {app.status === 'Interview' && (
                  <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>
                        <strong>Interview Scheduled:</strong> Technical System Discussion on{' '}
                        {app.interviewDate ? new Date(app.interviewDate).toLocaleString() : 'Upcoming week'}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-teal-700 underline">Demo Meeting Link</span>
                  </div>
                )}

                {/* Employer Feedback Note (if present) */}
                {app.employerNotes && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-navy-800 block mb-0.5">Recruiter Notes:</span>
                    <p className="italic text-slate-600">"{app.employerNotes}"</p>
                  </div>
                )}

                {/* Footer with Resume details */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Attached Document: <strong>{app.resumeFileName}</strong></span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to={`/jobs/${app.jobId}`}
                      className="font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                    >
                      <span>View Job Description</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-soft-sm space-y-4">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-navy-800">No applications in this category</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You don't have any applications matching the selected "{statusFilter}" status filter.
          </p>
          <div className="pt-2">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow-soft"
            >
              <span>Explore New Openings</span>
            </Link>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Destructive Action */}
      <ConfirmDialog
        isOpen={!!appToWithdraw}
        title="Withdraw Application"
        message={`Are you sure you want to withdraw your application for "${appToWithdraw?.jobTitle}" at ${appToWithdraw?.companyName}? This action will remove your record from the employer's pipeline.`}
        confirmLabel="Yes, Withdraw Application"
        cancelLabel="Keep Application"
        isDestructive={true}
        onConfirm={handleConfirmWithdraw}
        onCancel={() => setAppToWithdraw(null)}
      />
    </div>
  );
};
