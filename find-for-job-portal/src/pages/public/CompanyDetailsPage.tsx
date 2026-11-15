import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { JobCard } from '../../components/jobs/JobCard';
import { ApplyModal } from '../../components/jobs/ApplyModal';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Job } from '../../types';
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Calendar,
  CheckCircle2,
  Briefcase,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const CompanyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { companies, jobs } = useJobs();
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  const company = companies.find((c) => c.id === id);

  if (!company) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-navy-800">Company Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested company profile does not exist or has been removed.
        </p>
        <Link
          to="/companies"
          className="inline-block px-5 py-2.5 bg-teal-500 text-white font-bold text-xs rounded-xl"
        >
          Return to Company Directory
        </Link>
      </div>
    );
  }

  // Open jobs for this company
  const companyJobs = jobs.filter((j) => j.companyId === company.id || j.companyName === company.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Companies', path: '/companies' },
          { label: company.name },
        ]}
      />

      {/* Banner & Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-soft-sm">
        {/* Banner image */}
        <div className="h-48 sm:h-64 w-full relative overflow-hidden bg-navy-900">
          <img
            src={company.banner}
            alt={`${company.name} banner`}
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
        </div>

        {/* Company identity row */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-6">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white overflow-hidden p-2 bg-white shadow-soft-lg flex-shrink-0">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
                    {company.name}
                  </h1>
                  {company.verified && (
                    <CheckCircle2 className="w-5 h-5 text-teal-500" title="Verified Employer" />
                  )}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-teal-600 mt-0.5">
                  {company.industry}
                </p>
              </div>
            </div>

            {/* External link action */}
            <div>
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-navy-800 rounded-xl border border-slate-200 transition-colors"
              >
                <Globe className="w-4 h-4 text-slate-400" />
                <span>Visit Website (Demo)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Quick Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Headquarters</span>
              <span className="font-bold text-navy-800 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                {company.location}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Team Size</span>
              <span className="font-bold text-navy-800 flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-teal-600" />
                {company.employeeCount} employees
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Founded Year</span>
              <span className="font-bold text-navy-800 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                {company.foundedYear}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Open Positions</span>
              <span className="font-bold text-teal-600 flex items-center gap-1 mt-0.5">
                <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                {companyJobs.length} active roles
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: About + Perks Left, Open Jobs Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: About & Culture */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
            <h2 className="text-xs font-bold text-navy-800 uppercase tracking-wider">
              About {company.name}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
              {company.about || company.description}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm space-y-3">
            <h2 className="text-xs font-bold text-navy-800 uppercase tracking-wider">
              Company Perks & Benefits
            </h2>
            <div className="space-y-2">
              {company.perks.map((perk, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs text-slate-700 font-medium p-2.5 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Open Positions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-lg font-bold text-navy-800 flex items-center gap-2">
              <span>Open Roles at {company.name}</span>
              <span className="text-xs font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">
                {companyJobs.length}
              </span>
            </h2>
          </div>

          {companyJobs.length > 0 ? (
            <div className="space-y-4">
              {companyJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApplyClick={(j) => setSelectedJobForApply(j)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
              No open roles currently posted for {company.name}. Check back soon or browse other companies.
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        job={selectedJobForApply}
        isOpen={!!selectedJobForApply}
        onClose={() => setSelectedJobForApply(null)}
      />
    </div>
  );
};
