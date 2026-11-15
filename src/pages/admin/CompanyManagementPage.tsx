import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { useToast } from '../../context/ToastContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Company } from '../../types';
import {
  Building2,
  Search,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Globe,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const CompanyManagementPage: React.FC = () => {
  const { companies, toggleCompanyVerification } = useJobs();
  const { showSuccess, showInfo } = useToast();
  const [search, setSearch] = useState('');

  const filteredCompanies = companies.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q);
  });

  const handleToggleVerify = (c: Company) => {
    toggleCompanyVerification(c.id);
    if (!c.verified) {
      showSuccess('Company Verified (Demo)', `${c.name} has been marked as a Verified Partner.`);
    } else {
      showInfo('Verification Removed (Demo)', `${c.name} verification badge revoked.`);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Admin Dashboard', path: '/admin/dashboard' },
          { label: 'Company Management' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            Company Moderation & Verification
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Audit employer profiles, manage verified trust badges, and review active listings.
          </p>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company or industry..."
          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-navy-800 shadow-sm"
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-soft-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-5 font-bold">Company Profile</th>
                <th className="py-3.5 px-5 font-bold">Industry</th>
                <th className="py-3.5 px-5 font-bold">Location</th>
                <th className="py-3.5 px-5 font-bold">Open Positions</th>
                <th className="py-3.5 px-5 font-bold">Verification</th>
                <th className="py-3.5 px-5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCompanies.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.logo}
                        alt={c.name}
                        className="w-9 h-9 rounded-xl object-cover border p-0.5"
                      />
                      <div>
                        <Link
                          to={`/companies/${c.id}`}
                          className="font-bold text-navy-800 hover:text-teal-600"
                        >
                          {c.name}
                        </Link>
                        <p className="text-[11px] text-slate-400">{c.employeeCount} team size</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-slate-700 font-medium">{c.industry}</td>
                  <td className="py-3.5 px-5 text-slate-500">{c.location}</td>
                  <td className="py-3.5 px-5 font-bold text-navy-800">{c.openJobsCount} jobs</td>
                  <td className="py-3.5 px-5">
                    {c.verified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Unverified</span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => handleToggleVerify(c)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-colors ${
                        c.verified
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-teal-50 hover:bg-teal-100 text-teal-700'
                      }`}
                    >
                      {c.verified ? 'Revoke Badge' : 'Grant Verified'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
