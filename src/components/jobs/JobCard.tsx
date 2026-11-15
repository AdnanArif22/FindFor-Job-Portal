import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../../types';
import { useJobs } from '../../context/JobContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../common/Badge';
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Bookmark,
  Sparkles,
  Flame,
  ArrowRight
} from 'lucide-react';

interface JobCardProps {
  job: Job;
  onApplyClick?: (job: Job) => void;
  featuredStyle?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApplyClick, featuredStyle = false }) => {
  const { isJobSaved, toggleSaveJob } = useJobs();
  const { showSuccess, showInfo } = useToast();
  const saved = isJobSaved(job.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveJob(job.id);
    if (saved) {
      showInfo('Job Removed', `"${job.title}" removed from saved list`);
    } else {
      showSuccess('Job Saved', `"${job.title}" added to your saved bookmarks`);
    }
  };

  const formatSalary = (min: number, max: number, period: string) => {
    if (period === 'hourly') {
      return `$${min} - $${max}/hr`;
    }
    return `$${Math.round(min / 1000)}k - $${Math.round(max / 1000)}k/yr`;
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl p-6 border transition-all duration-200 hover:shadow-soft-lg flex flex-col justify-between ${
        featuredStyle || job.featured
          ? 'border-teal-200/90 shadow-soft bg-gradient-to-b from-teal-50/20 to-white'
          : 'border-slate-200/80 shadow-soft-sm hover:border-slate-300'
      }`}
    >
      {/* Top row: Company info & bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <Link
              to={`/companies/${job.companyId}`}
              className="w-12 h-12 rounded-xl border border-slate-200/90 overflow-hidden p-1 bg-white flex items-center justify-center flex-shrink-0 group-hover:border-teal-400 transition-colors"
            >
              <img
                src={job.companyLogo}
                alt={`${job.companyName} logo`}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=160&auto=format&fit=crop&q=80';
                }}
              />
            </Link>
            <div>
              <Link
                to={`/companies/${job.companyId}`}
                className="text-xs font-semibold text-slate-500 hover:text-teal-700 flex items-center gap-1 transition-colors"
              >
                <span>{job.companyName}</span>
              </Link>
              <h3 className="text-base sm:text-lg font-bold text-navy-800 group-hover:text-teal-600 transition-colors leading-snug">
                <Link to={`/jobs/${job.id}`}>{job.title}</Link>
              </h3>
            </div>
          </div>

          <button
            onClick={handleBookmark}
            aria-label={saved ? 'Remove from saved jobs' : 'Save job'}
            className={`p-2.5 rounded-xl border transition-all ${
              saved
                ? 'bg-amber-50 text-amber-500 border-amber-200'
                : 'text-slate-400 hover:text-navy-800 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        {/* Badges & Meta info */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge status={job.jobType} size="sm" />
          <Badge status={job.workplaceType} size="sm" />
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
            {job.experienceLevel}
          </span>
          {job.urgent && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              <Flame className="w-3 h-3 text-amber-500" /> Urgent
            </span>
          )}
          {job.featured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-teal-600" /> Featured
            </span>
          )}
        </div>

        {/* Description Snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {job.description}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[11px] text-slate-400 py-0.5 px-1">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Salary, location & action */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        <div className="flex flex-col">
          <span className="text-sm font-extrabold text-navy-800">
            {formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod)}
          </span>
          <span className="text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span className="truncate max-w-[130px] sm:max-w-none">{job.location}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onApplyClick && (
            <button
              onClick={() => onApplyClick(job)}
              className="px-3 py-1.5 text-xs font-bold text-white bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors shadow-sm"
            >
              Quick Apply
            </button>
          )}
          <Link
            to={`/jobs/${job.id}`}
            className="p-1.5 text-slate-400 hover:text-navy-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="View Full Details"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
