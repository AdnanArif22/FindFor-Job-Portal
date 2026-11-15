import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  Briefcase,
  Building2,
  DollarSign,
  MapPin,
  Calendar,
  Sparkles,
  Eye,
  CheckCircle2,
  Send,
  Plus,
  X
} from 'lucide-react';

export const PostJobPage: React.FC = () => {
  const navigate = useNavigate();
  const { addJob, categories } = useJobs();
  const { currentUser } = useAuth();
  const { showSuccess } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Software Engineering',
    jobType: 'Full-time' as const,
    workplaceType: 'Remote' as const,
    location: 'San Francisco, CA or Remote',
    experienceLevel: 'Senior Level' as const,
    salaryMin: 130000,
    salaryMax: 175000,
    currency: 'USD',
    salaryPeriod: 'yearly' as const,
    description: '',
    deadline: '2026-12-31',
    urgent: false,
    featured: true,
  });

  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js']);
  const [skillInput, setSkillInput] = useState('');

  const [responsibilities, setResponsibilities] = useState<string[]>([
    'Design, develop, and maintain performant user-facing web applications.',
    'Collaborate directly with cross-functional design and product squads.',
    'Participate actively in code reviews and architectural discussions.',
  ]);
  const [respInput, setRespInput] = useState('');

  const [requirements, setRequirements] = useState<string[]>([
    '4+ years of professional production experience with modern web frameworks.',
    'Strong knowledge of TypeScript, state management, and modern CSS.',
    'Proven ability to write clean, unit-tested, and accessible code.',
  ]);
  const [reqInput, setReqInput] = useState('');

  const [benefits, setBenefits] = useState<string[]>([
    'Competitive base salary + equity compensation',
    'Comprehensive health, dental, and vision insurance',
    'Flexible remote working policy + $2,500 setup stipend',
    'Unlimited PTO with minimum 3 weeks encouraged',
  ]);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Skill tag add/remove
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillInput.trim() || skills.includes(skillInput.trim())) return;
    setSkills([...skills, skillInput.trim()]);
    setSkillInput('');
  };

  const handleRemoveSkill = (s: string) => {
    setSkills(skills.filter((item) => item !== s));
  };

  // Responsibility add/remove
  const handleAddResp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!respInput.trim()) return;
    setResponsibilities([...responsibilities, respInput.trim()]);
    setRespInput('');
  };

  // Requirement add/remove
  const handleAddReq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqInput.trim()) return;
    setRequirements([...requirements, reqInput.trim()]);
    setReqInput('');
  };

  const handleFinalSubmit = () => {
    const createdJob = addJob({
      title: formData.title,
      companyId: currentUser.companyId || 'comp-1',
      companyName: currentUser.companyName || 'Nexus Cloud Systems',
      companyLogo:
        'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=160&auto=format&fit=crop&q=80',
      location: formData.location,
      workplaceType: formData.workplaceType,
      jobType: formData.jobType,
      category: formData.category,
      experienceLevel: formData.experienceLevel,
      salaryMin: Number(formData.salaryMin),
      salaryMax: Number(formData.salaryMax),
      currency: formData.currency,
      salaryPeriod: formData.salaryPeriod,
      description: formData.description,
      responsibilities: responsibilities,
      requirements: requirements,
      benefits: benefits,
      skills: skills,
      deadline: formData.deadline,
      status: 'active',
      featured: formData.featured,
      urgent: formData.urgent,
    });

    setIsPreviewOpen(false);
    showSuccess(
      'Job Published Successfully! (Demo)',
      `"${createdJob.title}" is now active in the job board feed.`
    );
    navigate('/employer/jobs');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    setIsPreviewOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Employer Dashboard', path: '/employer/dashboard' },
          { label: 'Post a New Job' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            Publish a New Job Opening
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Specify job requirements, technical skills, and compensation to attract qualified candidates.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (formData.title) setIsPreviewOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-navy-800 font-bold text-xs rounded-xl border border-slate-200 transition-colors"
        >
          <Eye className="w-4 h-4 text-teal-600" />
          <span>Preview Job Post</span>
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* 1. Basic Details */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft-sm space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-navy-800">
            1. Role Title & Category
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Senior Frontend Engineer (React & TypeScript)"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Job Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Employment Type
                </label>
                <select
                  value={formData.jobType}
                  onChange={(e) => setFormData({ ...formData, jobType: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Workplace Model
                </label>
                <select
                  value={formData.workplaceType}
                  onChange={(e) => setFormData({ ...formData, workplaceType: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location (City / Timezone)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. San Francisco, CA or Remote (US Timezones)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Experience Level
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500"
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Lead / Manager">Lead / Manager</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Compensation & Timeline */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft-sm space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-navy-800">
            2. Salary Range & Application Deadline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Minimum Annual Salary ($ USD)
              </label>
              <input
                type="number"
                step="5000"
                value={formData.salaryMin}
                onChange={(e) => setFormData({ ...formData, salaryMin: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Maximum Annual Salary ($ USD)
              </label>
              <input
                type="number"
                step="5000"
                value={formData.salaryMax}
                onChange={(e) => setFormData({ ...formData, salaryMax: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Application Deadline
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-800 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-navy-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded accent-teal-500 w-4 h-4"
              />
              <span>Mark as Featured Opening</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-amber-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.urgent}
                onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                className="rounded accent-amber-500 w-4 h-4"
              />
              <span>Mark as Urgently Hiring</span>
            </label>
          </div>
        </div>

        {/* 3. Description & Responsibilities */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft-sm space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-navy-800">
            3. Job Overview & Responsibilities
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Role Overview / Introduction *
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the mission of this role, the team structure, and primary objectives..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 leading-relaxed"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Key Responsibilities ({responsibilities.length})
            </label>
            <div className="space-y-2 mb-3">
              {responsibilities.map((resp, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                >
                  <span>• {resp}</span>
                  <button
                    type="button"
                    onClick={() => setResponsibilities(responsibilities.filter((_, i) => i !== idx))}
                    className="text-slate-400 hover:text-rose-600 ml-2"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={respInput}
                onChange={(e) => setRespInput(e.target.value)}
                placeholder="Add responsibility bullet..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-navy-800"
              />
              <button
                type="button"
                onClick={handleAddResp}
                className="px-4 py-2 bg-navy-800 text-white font-bold text-xs rounded-xl"
              >
                Add
              </button>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Required Qualifications ({requirements.length})
            </label>
            <div className="space-y-2 mb-3">
              {requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                >
                  <span>✓ {req}</span>
                  <button
                    type="button"
                    onClick={() => setRequirements(requirements.filter((_, i) => i !== idx))}
                    className="text-slate-400 hover:text-rose-600 ml-2"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={reqInput}
                onChange={(e) => setReqInput(e.target.value)}
                placeholder="Add requirement bullet..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-navy-800"
              />
              <button
                type="button"
                onClick={handleAddReq}
                className="px-4 py-2 bg-navy-800 text-white font-bold text-xs rounded-xl"
              >
                Add
              </button>
            </div>
          </div>

          {/* Skills tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Required Skill Tags (For Automated Candidate Matching)
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 text-xs font-medium border border-teal-200"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-teal-950 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 max-w-sm">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add skill (e.g. Next.js, AWS)..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-navy-800"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-navy-800 text-white font-bold text-xs rounded-xl"
              >
                Add Tag
              </button>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-soft flex items-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Review & Publish Job Post</span>
          </button>
        </div>
      </form>

      {/* Preview Modal before final submission */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Job Post Preview"
        description="Verify how your job opening will appear on the public job board."
        maxWidth="2xl"
      >
        <div className="space-y-5 text-xs text-slate-700">
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
            <h3 className="text-base font-bold text-navy-800">{formData.title || 'Untitled Role'}</h3>
            <p className="text-xs text-teal-700 font-semibold mt-0.5">
              {currentUser.companyName || 'Nexus Cloud Systems'} • {formData.location} ({formData.workplaceType})
            </p>
            <p className="text-xs font-bold text-navy-800 mt-1">
              ${formData.salaryMin.toLocaleString()} - ${formData.salaryMax.toLocaleString()}/yr • {formData.jobType}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-navy-800 uppercase tracking-wider mb-1">Description</h4>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">{formData.description || 'No description provided.'}</p>
          </div>

          <div>
            <h4 className="font-bold text-navy-800 uppercase tracking-wider mb-1">Core Responsibilities</h4>
            <ul className="list-disc pl-4 space-y-1">
              {responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-navy-800 uppercase tracking-wider mb-1">Skills Tags</h4>
            <div className="flex flex-wrap gap-1">
              {skills.map((s, i) => (
                <span key={i} className="px-2 py-0.5 bg-slate-100 rounded border text-slate-700 text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Back to Editing
            </button>
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow-soft"
            >
              Confirm & Publish Live (Demo)
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
