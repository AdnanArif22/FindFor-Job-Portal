import React, { useState, useMemo } from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { useJobs } from '../../context/JobContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Application, ApplicationStatus } from '../../types';
import {
  Users,
  Search,
  Filter,
  FileText,
  Mail,
  Phone,
  CheckCircle2,
  Calendar,
  XCircle,
  Eye,
  Sparkles,
  ChevronDown,
  Briefcase
} from 'lucide-react';

export const ApplicantsPage: React.FC = () => {
  const { applications, updateApplicationStatus } = useApplications();
  const { jobs } = useJobs();
  const { showSuccess, showInfo } = useToast();

  const [search, setSearch] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Preview modal for candidate CV
  const [selectedAppForPreview, setSelectedAppForPreview] = useState<Application | null>(null);

  // Status update modal / notes
  const [scheduleInterviewApp, setScheduleInterviewApp] = useState<Application | null>(null);
  const [interviewDate, setInterviewDate] = useState('2026-11-20T14:00');
  const [recruiterNotes, setRecruiterNotes] = useState('Candidate demonstrated high domain proficiency in frontend architectures.');

  const filteredApplicants = useMemo(() => {
    return applications.filter((app) => {
      if (selectedJobId !== 'All' && app.jobId !== selectedJobId) return false;
      if (selectedStatus !== 'All' && app.status !== selectedStatus) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          app.candidateName.toLowerCase().includes(q) ||
          app.candidateEmail.toLowerCase().includes(q) ||
          app.jobTitle.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [applications, selectedJobId, selectedStatus, search]);

  const handleStatusChange = (appId: string, newStatus: ApplicationStatus) => {
    updateApplicationStatus(appId, newStatus);
    showSuccess(
      'Pipeline Status Updated (Demo)',
      `Candidate application moved to "${newStatus}".`
    );
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scheduleInterviewApp) {
      updateApplicationStatus(
        scheduleInterviewApp.id,
        'Interview',
        recruiterNotes,
        interviewDate
      );
      showSuccess(
        'Interview Scheduled (Demo)',
        `Interview set for ${scheduleInterviewApp.candidateName}. Candidate received demo in-app notification.`
      );
      setScheduleInterviewApp(null);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Employer Dashboard', path: '/employer/dashboard' },
          { label: 'Applicant Pipeline' },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            Applicant Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review candidate resumes, skill match evaluations, and manage stage progression.
          </p>
        </div>

        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 self-start sm:self-auto">
          {filteredApplicants.length} Active Candidates
        </span>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name, email, or role..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800 shadow-sm"
          />
        </div>

        <div className="relative">
          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800 appearance-none shadow-sm"
          >
            <option value="All">All Job Positions</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800 appearance-none shadow-sm"
          >
            <option value="All">All Application Stages</option>
            <option value="Pending">Pending Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Candidate Cards / Table */}
      <div className="space-y-4">
        {filteredApplicants.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            {/* Candidate Info */}
            <div className="flex items-start gap-4 flex-1">
              <img
                src={app.candidateAvatar}
                alt={app.candidateName}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 p-0.5 shadow-sm"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-navy-800">{app.candidateName}</h3>
                  <Badge status={app.status} size="sm" />
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                    {app.skillMatchScore}% Match
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-600">
                  Applied for: <strong className="text-navy-800">{app.jobTitle}</strong>
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {app.candidateEmail}
                  </span>
                  {app.candidatePhone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {app.candidatePhone}
                    </span>
                  )}
                  <span>Applied on {app.appliedDate}</span>
                </div>

                {/* Matching Skills */}
                <div className="flex flex-wrap gap-1 pt-2">
                  {app.matchingSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-teal-50 text-teal-800 font-semibold px-2 py-0.5 rounded border border-teal-200"
                    >
                      ✓ {s}
                    </span>
                  ))}
                  {app.missingSkills.length > 0 && (
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                      Missing: {app.missingSkills.join(', ')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Pipeline Actions & Preview */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={() => setSelectedAppForPreview(app)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-navy-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-teal-600" />
                <span>View CV & Notes</span>
              </button>

              <div className="flex items-center gap-1.5">
                {app.status !== 'Shortlisted' && (
                  <button
                    onClick={() => handleStatusChange(app.id, 'Shortlisted')}
                    className="flex-1 sm:flex-none px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs rounded-xl border border-sky-200 transition-colors"
                  >
                    Shortlist
                  </button>
                )}

                {app.status !== 'Interview' && (
                  <button
                    onClick={() => setScheduleInterviewApp(app)}
                    className="flex-1 sm:flex-none px-3 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs rounded-xl border border-teal-200 transition-colors"
                  >
                    Schedule Interview
                  </button>
                )}

                {app.status !== 'Hired' && (
                  <button
                    onClick={() => handleStatusChange(app.id, 'Hired')}
                    className="flex-1 sm:flex-none px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 transition-colors"
                  >
                    Hire
                  </button>
                )}

                {app.status !== 'Rejected' && (
                  <button
                    onClick={() => handleStatusChange(app.id, 'Rejected')}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50"
                    title="Reject Candidate"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredApplicants.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-xs text-slate-500">
            No candidates found matching the selected search and filter criteria.
          </div>
        )}
      </div>

      {/* Candidate CV & Profile Preview Modal */}
      {selectedAppForPreview && (
        <Modal
          isOpen={!!selectedAppForPreview}
          onClose={() => setSelectedAppForPreview(null)}
          title={`Candidate Dossier: ${selectedAppForPreview.candidateName}`}
          description={`Application for ${selectedAppForPreview.jobTitle}`}
          maxWidth="2xl"
        >
          <div className="space-y-5 text-xs text-slate-700">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <img
                src={selectedAppForPreview.candidateAvatar}
                alt={selectedAppForPreview.candidateName}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-base font-bold text-navy-800">
                  {selectedAppForPreview.candidateName}
                </h4>
                <p className="text-xs text-slate-500">{selectedAppForPreview.candidateTitle}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedAppForPreview.candidateEmail} • {selectedAppForPreview.candidatePhone}
                </p>
              </div>
            </div>

            {/* Skill Match Assessment */}
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-navy-800">Automated Match Evaluation</span>
                <span className="font-black text-teal-700 text-sm">
                  {selectedAppForPreview.skillMatchScore}%
                </span>
              </div>
              <p className="text-slate-600">
                <strong>Matching Tags:</strong> {selectedAppForPreview.matchingSkills.join(', ') || 'None'}
              </p>
              {selectedAppForPreview.missingSkills.length > 0 && (
                <p className="text-slate-600">
                  <strong>Missing Tags:</strong> {selectedAppForPreview.missingSkills.join(', ')}
                </p>
              )}
            </div>

            {/* Attached Resume */}
            <div>
              <h5 className="font-bold uppercase text-navy-800 tracking-wider mb-2">
                Attached Resume Document
              </h5>
              <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <span className="font-bold text-navy-800">
                    {selectedAppForPreview.resumeFileName}
                  </span>
                </div>
                <button
                  onClick={() =>
                    showSuccess(
                      'CV Download Simulated',
                      `Downloaded file "${selectedAppForPreview.resumeFileName}".`
                    )
                  }
                  className="px-3 py-1.5 bg-navy-800 hover:bg-navy-700 text-white font-bold rounded-lg"
                >
                  Download CV (Demo)
                </button>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <h5 className="font-bold uppercase text-navy-800 tracking-wider mb-2">
                Candidate Cover Note
              </h5>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed whitespace-pre-line text-slate-700">
                {selectedAppForPreview.coverLetter || 'No cover letter submitted.'}
              </div>
            </div>

            {/* Recruiter Notes */}
            {selectedAppForPreview.employerNotes && (
              <div>
                <h5 className="font-bold uppercase text-navy-800 tracking-wider mb-1">
                  Internal Team Notes
                </h5>
                <p className="text-slate-600 italic p-3 bg-amber-50 rounded-xl border border-amber-200">
                  "{selectedAppForPreview.employerNotes}"
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedAppForPreview(null)}
                className="px-5 py-2.5 bg-navy-800 text-white font-bold rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Schedule Interview Modal */}
      {scheduleInterviewApp && (
        <Modal
          isOpen={!!scheduleInterviewApp}
          onClose={() => setScheduleInterviewApp(null)}
          title={`Schedule Interview: ${scheduleInterviewApp.candidateName}`}
          description={`Position: ${scheduleInterviewApp.jobTitle}`}
          maxWidth="md"
        >
          <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Interview Date & Time *
              </label>
              <input
                type="datetime-local"
                required
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Hiring Squad Internal Notes
              </label>
              <textarea
                rows={3}
                value={recruiterNotes}
                onChange={(e) => setRecruiterNotes(e.target.value)}
                placeholder="Notes for interviewers..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setScheduleInterviewApp(null)}
                className="px-4 py-2 text-slate-600 hover:text-navy-800 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-soft"
              >
                Confirm Interview Stage
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
