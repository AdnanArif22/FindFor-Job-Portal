import React from 'react';
import { Link } from 'react-router-dom';
import { Company } from '../../types';
import { MapPin, Building2, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 p-6 shadow-soft-sm hover:shadow-soft-lg hover:border-teal-300 transition-all flex flex-col justify-between">
      <div>
        {/* Top Header: Logo & Name */}
        <div className="flex items-start gap-4 mb-4">
          <Link
            to={`/companies/${company.id}`}
            className="w-14 h-14 rounded-xl border border-slate-200 overflow-hidden p-1.5 bg-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
          >
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=160&auto=format&fit=crop&q=80';
              }}
            />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link
                to={`/companies/${company.id}`}
                className="text-base font-bold text-navy-800 hover:text-teal-600 transition-colors truncate"
              >
                {company.name}
              </Link>
              {company.verified && (
                <CheckCircle2
                  className="w-4 h-4 text-teal-500 flex-shrink-0"
                  title="Verified Employer on find for"
                />
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{company.industry}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <span className="truncate">{company.location}</span>
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {company.description}
        </p>

        {/* Perks snippet */}
        <div className="flex flex-wrap gap-1 mb-5">
          {company.perks.slice(0, 3).map((perk, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md"
            >
              {perk}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/80">
          <Briefcase className="w-3.5 h-3.5" />
          {company.openJobsCount} Open {company.openJobsCount === 1 ? 'Job' : 'Jobs'}
        </span>

        <Link
          to={`/companies/${company.id}`}
          className="text-xs font-bold text-navy-800 hover:text-teal-600 flex items-center gap-1 transition-colors"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
