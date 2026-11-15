import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { useToast } from '../../context/ToastContext';
import { JobCard } from '../../components/jobs/JobCard';
import { ApplyModal } from '../../components/jobs/ApplyModal';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Job } from '../../types';
import { Bookmark, Briefcase, Trash2, ArrowRight } from 'lucide-react';

export const SavedJobsPage: React.FC = () => {
  const { jobs, savedJobIds, toggleSaveJob } = useJobs();
  const { showInfo } = useToast();
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  const handleRemove = (job: Job) => {
    toggleSaveJob(job.id);
    showInfo('Removed from Saved Jobs', `"${job.title}" removed from bookmarks.`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Candidate Dashboard', path: '/candidate/dashboard' },
          { label: 'Saved Jobs' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            Saved Job Bookmarks
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Keep track of openings you are considering before submitting an application.
          </p>
        </div>

        <Link
          to="/jobs"
          className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Find more positions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedJobs.map((job) => (
            <div key={job.id} className="relative group">
              <JobCard
                job={job}
                onApplyClick={(j) => setSelectedJobForApply(j)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-soft-sm space-y-4">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-navy-800">No saved jobs yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You haven't bookmarked any jobs yet. When browsing positions, click the bookmark icon on any job card to save it here for later.
          </p>
          <div className="pt-2">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow-soft"
            >
              <span>Explore All Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Quick Apply Modal */}
      <ApplyModal
        job={selectedJobForApply}
        isOpen={!!selectedJobForApply}
        onClose={() => setSelectedJobForApply(null)}
      />
    </div>
  );
};
