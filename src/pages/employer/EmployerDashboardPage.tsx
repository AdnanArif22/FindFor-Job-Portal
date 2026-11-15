import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { useApplications } from '../../context/ApplicationContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../../components/common/Badge';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Building2,
  Clock,
  Sparkles
} from 'lucide-react';

export const EmployerDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { jobs } = useJobs();
  const { applications, updateApplicationStatus } = useApplications();
  const { showSuccess } = useToast();

  const myCompanyJobs = jobs.filter((j) => j.companyId === currentUser.companyId || j.companyName === currentUser.companyName);
  const activeJobs = myCompanyJobs.filter((j) => j.status === 'active');

  const shortlistedCount = applications.filter((a) => a.status === 'Shortlisted').length;
  const interviewCount = applications.filter((a) => a.status === 'Interview').length;
  const hiredCount = applications.filter((a) => a.status === 'Hired').length;

  const handleQuickStatus = (appId: string, newStatus: any) => {
    updateApplicationStatus(appId, newStatus);
    showSuccess('Status Updated (Demo)', `Candidate moved to ${newStatus}.`);
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Employer Dashboard' }]} />

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-navy-900 to-navy-950 rounded-3xl p-6 sm:p-8 text-white shadow-soft-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 p-0.5"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold mb-1">
                <Building2 className="w-3 h-3" />
                <span>{currentUser.companyName || 'Nexus Cloud Systems'} • Hiring Lead</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                Employer Recruitment Center
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Review incoming applications, move candidates to interview, and publish new openings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/employer/jobs/new"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-navy-950 font-bold text-xs rounded-xl shadow-soft flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a New Job</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Openings</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-navy-800">{activeJobs.length || myCompanyJobs.length}</p>
          <span className="text-[11px] text-teal-600 font-semibold mt-1 inline-block">
            Published to public board
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Applicants</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-navy-800">{applications.length}</p>
          <span className="text-[11px] text-sky-600 font-semibold mt-1 inline-block">
            Candidates across all roles
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Shortlisted</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-500">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-navy-800">{shortlistedCount}</p>
          <span className="text-[11px] text-amber-600 font-semibold mt-1 inline-block">
            Passed initial screening
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Interviews Scheduled</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-600">{interviewCount}</p>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-block">
            Live technical stages
          </span>
        </div>
      </div>

      {/* Recent Applicants Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-navy-800">Recent Candidates</h2>
            <p className="text-xs text-slate-500">
              Review and advance applicants in real-time.
            </p>
          </div>
          <Link
            to="/employer/applicants"
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            <span>View Full Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-y border-slate-100">
              <tr>
                <th className="py-3 px-4 font-bold">Candidate</th>
                <th className="py-3 px-4 font-bold">Applied Position</th>
                <th className="py-3 px-4 font-bold">Skill Match</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Quick Pipeline Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.slice(0, 4).map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={app.candidateAvatar}
                        alt={app.candidateName}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-bold text-navy-800">{app.candidateName}</p>
                        <p className="text-[11px] text-slate-500">{app.candidateEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-700">{app.jobTitle}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                      {app.skillMatchScore}% Match
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge status={app.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleQuickStatus(app.id, 'Shortlisted')}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleQuickStatus(app.id, 'Interview')}
                        className="px-2 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 text-[11px] font-semibold rounded"
                      >
                        Interview
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Job Posts Overview */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-navy-800">Your Active Job Posts</h2>
            <p className="text-xs text-slate-500">Live positions visible to talent community.</p>
          </div>
          <Link
            to="/employer/jobs"
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            <span>Manage All Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myCompanyJobs.slice(0, 4).map((job) => (
            <div
              key={job.id}
              className="p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-3 bg-slate-50/50"
            >
              <div>
                <h3 className="text-sm font-bold text-navy-800">{job.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {job.location} • {job.jobType} • {job.applicantsCount} applicants
                </p>
              </div>
              <Badge status={job.status} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
