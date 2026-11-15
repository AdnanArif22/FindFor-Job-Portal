import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  UploadCloud,
  Plus,
  X,
  CheckCircle2,
  Save,
  Sparkles
} from 'lucide-react';

export const CandidateProfilePage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const { showSuccess } = useToast();

  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    location: currentUser.location || '',
    title: currentUser.title || '',
    bio: currentUser.bio || '',
    avatar: currentUser.avatar || '',
    resumeName: currentUser.resumeName || 'Alex_Morgan_Senior_Frontend_Resume.pdf',
  });

  const [skills, setSkills] = useState<string[]>(
    currentUser.skills || ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'UI/UX Design', 'GraphQL', 'Vite']
  );
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, resumeName: file.name }));
      showSuccess('Resume Uploaded (Demo)', `Attached "${file.name}" to your profile.`);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      ...formData,
      skills,
    });
    showSuccess('Profile Saved! (Demo)', 'Your candidate profile details have been updated.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Candidate Dashboard', path: '/candidate/dashboard' },
          { label: 'Candidate Profile' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            Candidate Profile
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your personal bio, contact info, skills tags, and resume document.
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
        {/* Avatar & Basic Info Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft-sm space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-navy-800">
            Profile Photo & Primary Details
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <img
                src={formData.avatar}
                alt={formData.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
              />
              <div className="absolute inset-0 bg-navy-950/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white text-[10px] font-bold">
                Change
              </div>
            </div>

            <div className="flex-1 w-full space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Professional Headline / Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Candidate Bio / Career Summary
            </label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell hiring managers about your engineering ethos, key achievements, and passions..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800 leading-relaxed"
            />
          </div>
        </div>

        {/* Skills Tag Management */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-navy-800">
              Technical & Core Skills
            </h2>
            <span className="text-xs text-slate-500">
              Used for automated skill matching ({skills.length} skills)
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-teal-600 hover:text-teal-950 font-bold p-0.5"
                  aria-label={`Remove skill ${skill}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-sm pt-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill (e.g. Docker, Python)..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-navy-800 text-white font-bold text-xs rounded-xl hover:bg-navy-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* CV Upload UI */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft-sm space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-navy-800">
            Attached Master Resume
          </h2>

          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-teal-400 transition-colors bg-slate-50/50">
            <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-navy-800">
              Active File: <span className="text-teal-600 font-bold">{formData.resumeName}</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Supports PDF, DOCX, or RTF up to 10MB
            </p>
            <label className="mt-4 inline-block">
              <span className="px-4 py-2 bg-white text-xs font-bold text-teal-700 border border-teal-300 rounded-xl shadow-sm hover:bg-teal-50 cursor-pointer transition-colors">
                Upload New Document
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-soft transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes (Demo)</span>
          </button>
        </div>
      </form>
    </div>
  );
};
