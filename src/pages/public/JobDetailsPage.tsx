import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ApplyModal } from '../../components/jobs/ApplyModal';
import { JobCard } from '../../components/jobs/JobCard';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Badge } from '../../components/common/Badge';
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Bookmark,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Briefcase,
  Users,
  Clock,
  ShieldCheck,
  Flame
} from 'lucide-react';

export const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobs, companies, isJobSaved, toggleSaveJob } = useJobs();
  const { currentUser } = useAuth();
  const { showSuccess, showInfo } = useToast();

  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-navy-800">Job Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested job position could not be found or has been removed.
        </p>
        <Link
          to="/jobs"
          className="inline-block px-5 py-2.5 bg-teal-500 text-white font-bold text-xs rounded-xl"
        >
          Browse All Jobs
        </Link>
      </div>
    );
  }

  const company = companies.find((c) => c.id === job.companyId) || {
    name: job.companyName,
    logo: job.companyLogo,
    about: 'Innovative tech organization empowering top global talent.',
    industry: job.category,
    location: job.location,
    employeeCount: '100-500',
    website: 'https://demo.company.io',
    verified: true,
  };

  const saved = isJobSaved(job.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showSuccess('Link Copied (Demo)', 'Job posting URL copied to your clipboard');
  };

  const handleSaveToggle = () => {
    toggleSaveJob(job.id);
    if (saved) {
      showInfo('Job Removed', `"${job.title}" removed from bookmarks`);
    } else {
      showSuccess('Job Saved', `"${job.title}" added to bookmarks`);
    }
  };

  // Simulated skill match
  const candidateSkills = currentUser.skills || ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'UI/UX Design'];
  const matchingSkills = job.skills.filter((s) =>
    candidateSkills.some((cs) => cs.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(cs.toLowerCase()))
  );
  const missingSkills = job.skills.filter((s) => !matchingSkills.includes(s));
  const skillMatchScore = Math.max(45, Math.min(98, Math.round((matchingSkills.length / Math.max(job.skills.length, 1)) * 100)));

  // Related jobs in the same category or company
  const relatedJobs = jobs
    .filter((j) => j.id !== job.id && (j.category === job.category || j.companyId === job.companyId))
    .slice(0, 3);

  const formatSalary = (min: number, max: number, period: string) => {
    if (period === 'hourly') return `$${min} - $${max}/hr`;
    return `$${min.toLocaleString()} - $${max.toLocaleString()}/yr`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Find Jobs', path: '/jobs' },
          { label: job.category, path: `/jobs?category=${encodeURIComponent(job.category)}` },
          { label: job.title },
        ]}
      />

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Link
              to={`/companies/${job.companyId}`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-slate-200 overflow-hidden p-2 bg-white flex items-center justify-center flex-shrink-0 shadow-soft-sm hover:border-teal-400 transition-colors"
            >
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-full h-full object-cover rounded-xl"
              />
            </Link>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  to={`/companies/${job.companyId}`}
                  className="text-sm font-bold text-teal-600 hover:text-teal-700"
                >
                  {job.companyName}
                </Link>
                {job.urgent && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    <Flame className="w-3 h-3 text-amber-500" /> Urgently Hiring
                  </span>
                )}
                {job.featured && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-teal-600" /> Featured Opening
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight mt-1 leading-snug">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {job.location} ({job.workplaceType})
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  {job.jobType}
                </span>
                <span className="flex items-center gap-1.5 text-navy-800 font-bold">
                  <DollarSign className="w-4 h-4 text-teal-600" />
                  {formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Posted {job.postedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <button
              onClick={handleSaveToggle}
              className={`p-3 rounded-xl border transition-all ${
                saved
                  ? 'bg-amber-50 text-amber-500 border-amber-200'
                  : 'text-slate-500 hover:text-navy-800 hover:bg-slate-50 border-slate-200'
              }`}
              title={saved ? 'Remove saved bookmark' : 'Save this job'}
            >
              <Bookmark className={`w-5 h-5 ${saved ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-3 text-slate-500 hover:text-navy-800 hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"
              title="Share job opening"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsApplyOpen(true)}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm rounded-xl transition-all shadow-soft flex items-center gap-2"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Details Left + Match/Company Sidebar Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Job Description & Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Summary Box */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-soft-sm space-y-6">
            <div>
              <h2 className="text-base font-bold text-navy-800 uppercase tracking-wider mb-3">
                Job Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">{job.description}</p>
            </div>

            {/* Key Responsibilities */}
            <div>
              <h3 className="text-base font-bold text-navy-800 mb-3">Core Responsibilities</h3>
              <ul className="space-y-2.5">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements & Qualifications */}
            <div>
              <h3 className="text-base font-bold text-navy-800 mb-3">Requirements & Qualifications</h3>
              <ul className="space-y-2.5">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy-800 mt-2 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits & Perks */}
            <div>
              <h3 className="text-base font-bold text-navy-800 mb-3">Benefits & Perks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {job.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Skill Tags */}
            <div>
              <h3 className="text-base font-bold text-navy-800 mb-3">Required Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-navy-800 rounded-lg border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: AI Skill Match Box + Company Profile */}
        <div className="lg:col-span-4 space-y-6">
          {/* Simulated Skill Match Card (Demo Notice) */}
          <div className="bg-gradient-to-b from-teal-50/60 to-white rounded-2xl border border-teal-200 p-6 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                  Skill Match (Demo)
                </h3>
              </div>
              <span className="text-xs font-black text-teal-700 bg-white px-2.5 py-0.5 rounded-full border border-teal-200">
                {skillMatchScore}% Match
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-teal-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${skillMatchScore}%` }}
              />
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">
                  Matching Skills ({matchingSkills.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matchingSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold bg-teal-100 text-teal-900 px-2 py-0.5 rounded-md"
                    >
                      ✓ {s}
                    </span>
                  ))}
                  {matchingSkills.length === 0 && (
                    <span className="text-xs text-slate-400">None detected</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">
                  Missing Skills ({missingSkills.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 leading-normal border-t border-teal-100 pt-3">
              Calculated dynamically against your current Candidate Profile tags (Alex Morgan).
            </p>

            <button
              onClick={() => setIsApplyOpen(true)}
              className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              Apply with This Match
            </button>
          </div>

          {/* Company Brief Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
            <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider">
              About the Company
            </h3>

            <div className="flex items-center gap-3">
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-12 h-12 rounded-xl border border-slate-200 object-cover p-1"
              />
              <div>
                <h4 className="text-sm font-bold text-navy-800">{job.companyName}</h4>
                <p className="text-xs text-slate-500">{company.industry}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
              {company.about || company.description}
            </p>

            <div className="pt-2">
              <Link
                to={`/companies/${job.companyId}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-navy-800 border border-slate-200 transition-colors"
              >
                <span>View Full Company Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Jobs Section */}
      {relatedJobs.length > 0 && (
        <section className="pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy-800">Similar Job Openings</h2>
            <Link to="/jobs" className="text-xs font-bold text-teal-600 hover:text-teal-700">
              Browse all jobs &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedJobs.map((rJob) => (
              <JobCard key={rJob.id} job={rJob} />
            ))}
          </div>
        </section>
      )}

      {/* Apply Modal */}
      <ApplyModal
        job={job}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />
    </div>
  );
};
