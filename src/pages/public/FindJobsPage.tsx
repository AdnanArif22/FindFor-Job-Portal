import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { JobCard } from '../../components/jobs/JobCard';
import { JobFilters, FilterState } from '../../components/jobs/JobFilters';
import { ApplyModal } from '../../components/jobs/ApplyModal';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Job } from '../../types';
import {
  Briefcase,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  ArrowUpDown,
  Frown
} from 'lucide-react';

export const FindJobsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobs, categories } = useJobs();

  // Read initial query params
  const initialKeyword = searchParams.get('q') || '';
  const initialLocation = searchParams.get('loc') || '';
  const initialCategory = searchParams.get('category') || '';

  const [filters, setFilters] = useState<FilterState>({
    search: initialKeyword,
    location: initialLocation,
    category: initialCategory,
    jobType: '',
    workplaceType: '',
    experienceLevel: '',
    minSalary: 0,
    sortBy: 'latest',
  });

  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state if query params change
  useEffect(() => {
    if (searchParams.get('q')) setFilters((prev) => ({ ...prev, search: searchParams.get('q') || '' }));
    if (searchParams.get('category')) setFilters((prev) => ({ ...prev, category: searchParams.get('category') || '' }));
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      location: '',
      category: '',
      jobType: '',
      workplaceType: '',
      experienceLevel: '',
      minSalary: 0,
      sortBy: 'latest',
    });
    setSearchParams({});
    setVisibleCount(6);
  };

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Keyword match
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.companyName.toLowerCase().includes(query);
        const matchesSkills = job.skills.some((s) => s.toLowerCase().includes(query));
        const matchesDesc = job.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesDesc) return false;
      }

      // Location match
      if (filters.location) {
        const loc = filters.location.toLowerCase();
        const matchesLoc = job.location.toLowerCase().includes(loc);
        const matchesRemote = job.workplaceType.toLowerCase().includes(loc);
        if (!matchesLoc && !matchesRemote) return false;
      }

      // Category match
      if (filters.category && job.category !== filters.category) {
        return false;
      }

      // Workplace type
      if (filters.workplaceType && job.workplaceType !== filters.workplaceType) {
        return false;
      }

      // Job Type
      if (filters.jobType && job.jobType !== filters.jobType) {
        return false;
      }

      // Experience Level
      if (filters.experienceLevel && job.experienceLevel !== filters.experienceLevel) {
        return false;
      }

      // Minimum Salary
      if (filters.minSalary > 0 && job.salaryMax < filters.minSalary) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'salary-high') {
        return b.salaryMax - a.salaryMax;
      }
      if (filters.sortBy === 'relevance') {
        return b.applicantsCount - a.applicantsCount;
      }
      // Latest (default)
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    });
  }, [jobs, filters]);

  const visibleJobs = filteredJobs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredJobs.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Find Jobs' }]} />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            Explore Opportunities
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Discover verified openings filtered in real-time against our interactive mock dataset.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-navy-800 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-teal-600" />
            <span>Filters ({filteredJobs.length})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium hidden sm:inline">Sort by:</span>
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))
                }
                className="pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-navy-800 focus:outline-none focus:border-teal-500 shadow-sm appearance-none"
              >
                <option value="latest">Latest Posted</option>
                <option value="salary-high">Highest Salary</option>
                <option value="relevance">Most Popular</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <div
          className={`lg:col-span-4 ${
            showMobileFilters ? 'block' : 'hidden lg:block'
          } sticky top-20`}
        >
          <JobFilters
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            totalResults={filteredJobs.length}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Job Cards Feed */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active Filter Chips */}
          {(filters.search ||
            filters.location ||
            filters.category ||
            filters.jobType ||
            filters.workplaceType ||
            filters.experienceLevel ||
            filters.minSalary > 0) && (
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <span className="text-xs text-slate-500 font-semibold">Active filters:</span>
              {filters.search && (
                <span className="inline-flex items-center gap-1 text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full">
                  Keyword: "{filters.search}"
                  <button
                    onClick={() => setFilters((p) => ({ ...p, search: '' }))}
                    className="hover:text-teal-950 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.location && (
                <span className="inline-flex items-center gap-1 text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full">
                  Location: {filters.location}
                  <button
                    onClick={() => setFilters((p) => ({ ...p, location: '' }))}
                    className="hover:text-teal-950 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center gap-1 text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full">
                  {filters.category}
                  <button
                    onClick={() => setFilters((p) => ({ ...p, category: '' }))}
                    className="hover:text-teal-950 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.workplaceType && (
                <span className="inline-flex items-center gap-1 text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full">
                  {filters.workplaceType}
                  <button
                    onClick={() => setFilters((p) => ({ ...p, workplaceType: '' }))}
                    className="hover:text-teal-950 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.jobType && (
                <span className="inline-flex items-center gap-1 text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full">
                  {filters.jobType}
                  <button
                    onClick={() => setFilters((p) => ({ ...p, jobType: '' }))}
                    className="hover:text-teal-950 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.minSalary > 0 && (
                <span className="inline-flex items-center gap-1 text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full">
                  Min: ${filters.minSalary.toLocaleString()}
                  <button
                    onClick={() => setFilters((p) => ({ ...p, minSalary: 0 }))}
                    className="hover:text-teal-950 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-500 hover:text-navy-800 underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results List */}
          {visibleJobs.length > 0 ? (
            <div className="space-y-4">
              {visibleJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApplyClick={(j) => setSelectedJobForApply(j)}
                />
              ))}

              {/* Load More Button */}
              {hasMore && (
                <div className="pt-6 text-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 4)}
                    className="px-6 py-3 bg-white hover:bg-slate-50 text-navy-800 border border-slate-300 font-bold text-xs rounded-xl shadow-soft transition-all"
                  >
                    Load More Jobs ({filteredJobs.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center shadow-soft-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Frown className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-navy-800">
                No matching jobs found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                We couldn't find any positions matching your selected criteria. Try adjusting your keyword search, removing location restrictions, or resetting filters.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Apply Modal */}
      <ApplyModal
        job={selectedJobForApply}
        isOpen={!!selectedJobForApply}
        onClose={() => setSelectedJobForApply(null)}
      />
    </div>
  );
};
