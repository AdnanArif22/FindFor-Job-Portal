import React, { useState, useMemo } from 'react';
import { useJobs } from '../../context/JobContext';
import { CompanyCard } from '../../components/companies/CompanyCard';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Search, Building2, MapPin, ChevronDown, Frown } from 'lucide-react';

export const CompaniesPage: React.FC = () => {
  const { companies } = useJobs();
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');

  const industries = useMemo(() => {
    return Array.from(new Set(companies.map((c) => c.industry)));
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      if (search) {
        const query = search.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(query);
        const matchesDesc = c.description.toLowerCase().includes(query);
        const matchesLoc = c.location.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesLoc) return false;
      }
      if (industryFilter && c.industry !== industryFilter) {
        return false;
      }
      return true;
    });
  }, [companies, search, industryFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ label: 'Companies' }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Employer Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight mt-1">
            Browse Top Companies
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Explore company cultures, benefits, locations, and direct hiring openings.
          </p>
        </div>

        {/* Search & Industry filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies by name or keyword..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800 shadow-sm"
            />
          </div>

          <div className="relative min-w-[200px]">
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800 appearance-none shadow-sm"
            >
              <option value="">All Industries</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid of companies */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((comp) => (
            <CompanyCard key={comp.id} company={comp} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-soft-sm space-y-3">
          <Frown className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-navy-800">No companies found</h3>
          <p className="text-xs text-slate-500">
            No organizations match "{search}". Try clearing your filters or search terms.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setIndustryFilter('');
            }}
            className="px-4 py-2 bg-teal-500 text-white font-bold text-xs rounded-xl"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
