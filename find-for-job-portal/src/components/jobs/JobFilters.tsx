import React from 'react';
import { JobType, WorkplaceType, ExperienceLevel, JobCategory } from '../../types';
import {
  Search,
  MapPin,
  Briefcase,
  Layers,
  DollarSign,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export interface FilterState {
  search: string;
  location: string;
  category: string;
  jobType: string;
  workplaceType: string;
  experienceLevel: string;
  minSalary: number;
  sortBy: 'latest' | 'salary-high' | 'relevance';
}

interface JobFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  categories: JobCategory[];
  totalResults: number;
  onReset: () => void;
  className?: string;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  setFilters,
  categories,
  totalResults,
  onReset,
  className = '',
}) => {
  const handleChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-teal-600" />
          <h3 className="text-sm font-bold text-navy-800">Filter Job Openings</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-navy-800 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Search Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Keyword or Skill
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              placeholder="e.g. React, Product Designer, AI"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
            />
          </div>
        </div>

        {/* Location Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g. San Francisco, Remote, Austin"
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800 appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Workplace Type */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Workplace Model
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {['', 'Remote', 'Hybrid', 'On-site'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleChange('workplaceType', type)}
                className={`py-1.5 text-xs font-medium rounded-lg border text-center transition-all ${
                  filters.workplaceType === type
                    ? 'bg-teal-50 border-teal-300 text-teal-800 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {type || 'Any'}
              </button>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Employment Type
          </label>
          <div className="relative">
            <select
              value={filters.jobType}
              onChange={(e) => handleChange('jobType', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800 appearance-none"
            >
              <option value="">Any Employment Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Experience Level
          </label>
          <div className="relative">
            <select
              value={filters.experienceLevel}
              onChange={(e) => handleChange('experienceLevel', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800 appearance-none"
            >
              <option value="">Any Experience Level</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
              <option value="Lead / Manager">Lead / Manager</option>
              <option value="Executive">Executive</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Minimum Salary Slider */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Minimum Salary
            </label>
            <span className="text-xs font-bold text-teal-600">
              {filters.minSalary > 0 ? `$${filters.minSalary.toLocaleString()}/yr` : 'Any'}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={200000}
            step={10000}
            value={filters.minSalary}
            onChange={(e) => handleChange('minSalary', Number(e.target.value))}
            className="w-full accent-teal-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>$0</span>
            <span>$100k</span>
            <span>$200k+</span>
          </div>
        </div>
      </div>

      {/* Footer result count */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-navy-800">{totalResults}</strong> jobs
        </span>
        <button
          onClick={onReset}
          className="text-teal-600 hover:text-teal-700 font-semibold"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};
