import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';
import { useJobs } from '../../context/JobContext';
import { JobCard } from '../../components/jobs/JobCard';
import { Badge } from '../../components/common/Badge';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  Briefcase,
  Bookmark,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  UserCheck
} from 'lucide-react';

export const CandidateDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { applications } = useApplications();
  const { jobs, savedJobIds } = useJobs();

  const myApplications = applications.filter((app) => app.candidateId === currentUser.id);
  const interviewCount = myApplications.filter((app) => app.status === 'Interview').length;
  const hiredCount = myApplications.filter((app) => app.status === 'Hired').length;

  // Profile completion calculation
  let completion = 40;
  if (currentUser.bio) completion += 15;
  if (currentUser.skills && currentUser.skills.length >= 4) completion += 25;
  if (currentUser.phone) completion += 10;
  if (currentUser.resumeName) completion += 10;

  // Recommended jobs based on candidate skills
  const recommendedJobs = jobs
    .filter((j) => {
      const skills = currentUser.skills || [];
      return j.skills.some((s) => skills.includes(s));
    })
    .slice(0, 3);

  // Saved jobs list
  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id)).slice(0, 2);

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Candidate Dashboard' }]} />

      {/* Welcome Panel */}
      <div className="bg-gradient-to-r from-navy-800 via-navy-900 to-navy-950 rounded-3xl p-6 sm:p-8 text-white shadow-soft-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-400 p-0.5"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[11px] font-bold mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Job Seeker Profile (Active)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                Welcome back, {currentUser.name}!
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                {currentUser.title || 'Senior Frontend & UI Engineer'} • {currentUser.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/cv-builder"
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-navy-950 font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Update ATS CV</span>
            </Link>
            <Link
              to="/jobs"
              className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
            >
              Search Jobs
            </Link>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="mt-6 pt-6 border-t border-navy-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 max-w-xl">
            <div className="flex items-center justify-between text-xs mb-1.5 font-semibold text-slate-300">
              <span>Profile Strength & ATS Readiness</span>
              <span className="text-teal-400 font-bold">{completion}% Complete</span>
            </div>
            <div className="w-full bg-navy-950 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-teal-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          <Link
            to="/candidate/profile"
            className="text-xs font-bold text-teal-300 hover:text-white flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>Complete Profile details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Submitted Apps</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-navy-800">{myApplications.length}</p>
          <span className="text-[11px] text-teal-600 font-semibold mt-1 inline-block">
            Across active hiring teams
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Interviews</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-500">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-navy-800">{interviewCount}</p>
          <span className="text-[11px] text-amber-600 font-semibold mt-1 inline-block">
            Invited for technical interview
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Saved Openings</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-navy-800">{savedJobIds.length}</p>
          <span className="text-[11px] text-slate-500 font-semibold mt-1 inline-block">
            Bookmarked positions
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Hired Offers</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-600">{hiredCount}</p>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-block">
            Confirmed offers
          </span>
        </div>
      </div>

      {/* Recent Applications Table Preview */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-navy-800">Recent Applications</h2>
            <p className="text-xs text-slate-500">
              Live status tracking with simulated employer pipeline updates.
            </p>
          </div>
          <Link
            to="/candidate/applications"
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            <span>View All Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {myApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-y border-slate-100">
                <tr>
                  <th className="py-3 px-4 font-bold">Role & Company</th>
                  <th className="py-3 px-4 font-bold">Applied Date</th>
                  <th className="py-3 px-4 font-bold">Skill Match</th>
                  <th className="py-3 px-4 font-bold">Live Status</th>
                  <th className="py-3 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myApplications.slice(0, 3).map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.companyLogo}
                          alt={app.companyName}
                          className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-navy-800">{app.jobTitle}</p>
                          <p className="text-[11px] text-slate-500">{app.companyName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{app.appliedDate}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                        {app.skillMatchScore}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={app.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to="/candidate/applications"
                        className="text-teal-600 hover:text-teal-700 font-bold"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-500 py-4 text-center">
            You haven't submitted any job applications yet.
          </p>
        )}
      </div>

      {/* Recommended Jobs for Candidate */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-navy-800">
              Recommended for Your Skills
            </h2>
            <p className="text-xs text-slate-500">
              Positions matching your verified skills ({currentUser.skills?.join(', ')}).
            </p>
          </div>
          <Link to="/jobs" className="text-xs font-bold text-teal-600 hover:text-teal-700">
            Browse all jobs &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};
