import React, { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  Building2,
  MapPin,
  Globe,
  UploadCloud,
  CheckCircle2,
  Plus,
  X,
  Save,
  Users
} from 'lucide-react';

export const EmployerCompanyPage: React.FC = () => {
  const { companies, updateCompany } = useJobs();
  const { currentUser } = useAuth();
  const { showSuccess } = useToast();

  const myCompany = companies.find((c) => c.id === currentUser.companyId) || companies[0];

  const [formData, setFormData] = useState({
    name: myCompany.name,
    industry: myCompany.industry,
    location: myCompany.location,
    website: myCompany.website,
    employeeCount: myCompany.employeeCount,
    description: myCompany.description,
    about: myCompany.about,
    logo: myCompany.logo,
    banner: myCompany.banner,
  });

  const [perks, setPerks] = useState<string[]>(myCompany.perks || []);
  const [newPerk, setNewPerk] = useState('');

  const handleAddPerk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPerk.trim() || perks.includes(newPerk.trim())) return;
    setPerks([...perks, newPerk.trim()]);
    setNewPerk('');
  };

  const handleRemovePerk = (perkToRemove: string) => {
    setPerks(perks.filter((p) => p !== perkToRemove));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompany(myCompany.id, {
      ...formData,
      perks,
    });
    showSuccess(
      'Company Profile Saved! (Demo)',
      'Your organization profile and culture perks have been updated.'
    );
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Employer Dashboard', path: '/employer/dashboard' },
          { label: 'Company Brand Profile' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            Company Brand Profile
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Showcase your company culture, employee benefits, and public mission to prospective candidates.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow-soft transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Brand Identity */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft-sm space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-navy-800">
            Brand Identity & Coordinates
          </h2>

          <div className="flex items-center gap-4">
            <img
              src={formData.logo}
              alt={formData.name}
              className="w-16 h-16 rounded-2xl border object-cover p-1 bg-white shadow-sm"
            />
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Industry</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Headquarters Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Website</label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Employee Team Size</label>
              <input
                type="text"
                value={formData.employeeCount}
                onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Short Description / Tagline
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Detailed Company Mission & Culture (About Us)
            </label>
            <textarea
              rows={4}
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Perks & Benefits Management */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft-sm space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-navy-800">
            Perks & Candidate Benefits
          </h2>

          <div className="flex flex-wrap gap-2">
            {perks.map((perk) => (
              <span
                key={perk}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200"
              >
                <span>{perk}</span>
                <button
                  type="button"
                  onClick={() => handleRemovePerk(perk)}
                  className="text-teal-600 hover:text-teal-950 font-bold p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-sm pt-2">
            <input
              type="text"
              value={newPerk}
              onChange={(e) => setNewPerk(e.target.value)}
              placeholder="e.g. $3,000 Remote Setup Stipend..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800"
            />
            <button
              type="button"
              onClick={handleAddPerk}
              className="px-4 py-2 bg-navy-800 text-white font-bold text-xs rounded-xl"
            >
              Add Perk
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-soft transition-all"
          >
            Save Company Profile (Demo)
          </button>
        </div>
      </form>
    </div>
  );
};
