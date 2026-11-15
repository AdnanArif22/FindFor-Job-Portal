import React, { useState } from 'react';
import { useApplications } from '../../context/ApplicationContext';
import { useToast } from '../../context/ToastContext';
import { ModernTemplate } from '../../components/cv/ModernTemplate';
import { ClassicTemplate } from '../../components/cv/ClassicTemplate';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  FileText,
  Printer,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  Eye,
  Sliders,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  HelpCircle,
  Download
} from 'lucide-react';

export const CvBuilderPage: React.FC = () => {
  const { cvProfile, updateCVProfile } = useApplications();
  const { showSuccess, showInfo } = useToast();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [template, setTemplate] = useState<'modern-teal' | 'classic-navy'>(cvProfile.templateId || 'modern-teal');

  // Local copy of form state for responsive typing
  const [profile, setProfile] = useState(cvProfile);

  const handlePersonalInfoChange = (field: string, value: string) => {
    const updated = {
      ...profile,
      personalInfo: {
        ...profile.personalInfo,
        [field]: value,
      },
    };
    setProfile(updated);
    updateCVProfile(updated);
  };

  const handleSummaryChange = (value: string) => {
    const updated = { ...profile, summary: value };
    setProfile(updated);
    updateCVProfile(updated);
  };

  // Experience handlers
  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      title: 'Software Developer',
      company: 'Company Name',
      location: 'City, State',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      description: 'Describe your core responsibilities and quantifiable impact...',
    };
    const updated = {
      ...profile,
      experience: [newExp, ...profile.experience],
    };
    setProfile(updated);
    updateCVProfile(updated);
    showSuccess('Experience Added', 'New work history section added to CV.');
  };

  const handleUpdateExperience = (id: string, field: string, value: any) => {
    const updated = {
      ...profile,
      experience: profile.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    };
    setProfile(updated);
    updateCVProfile(updated);
  };

  const handleRemoveExperience = (id: string) => {
    const updated = {
      ...profile,
      experience: profile.experience.filter((e) => e.id !== id),
    };
    setProfile(updated);
    updateCVProfile(updated);
    showInfo('Section Removed', 'Experience entry removed.');
  };

  // Education handlers
  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: 'B.S. in Computer Science',
      school: 'University Name',
      location: 'City, State',
      startDate: '2019-09',
      endDate: '2023-05',
      grade: '3.8 GPA',
    };
    const updated = {
      ...profile,
      education: [...profile.education, newEdu],
    };
    setProfile(updated);
    updateCVProfile(updated);
  };

  const handleUpdateEducation = (id: string, field: string, value: any) => {
    const updated = {
      ...profile,
      education: profile.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    };
    setProfile(updated);
    updateCVProfile(updated);
  };

  const handleRemoveEducation = (id: string) => {
    const updated = {
      ...profile,
      education: profile.education.filter((e) => e.id !== id),
    };
    setProfile(updated);
    updateCVProfile(updated);
  };

  // Project handlers
  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      name: 'Project Title',
      description: 'Key outcome and architectural features of this project...',
      techStack: 'React, TypeScript, Tailwind',
      link: 'https://github.com/my-project',
    };
    const updated = {
      ...profile,
      projects: [...profile.projects, newProj],
    };
    setProfile(updated);
    updateCVProfile(updated);
  };

  const handleUpdateProject = (id: string, field: string, value: any) => {
    const updated = {
      ...profile,
      projects: profile.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    };
    setProfile(updated);
    updateCVProfile(updated);
  };

  const handleRemoveProject = (id: string) => {
    const updated = {
      ...profile,
      projects: profile.projects.filter((p) => p.id !== id),
    };
    setProfile(updated);
    updateCVProfile(updated);
  };

  // Skills
  const [skillInput, setSkillInput] = useState('');
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillInput.trim() || profile.skills.includes(skillInput.trim())) return;
    const updated = {
      ...profile,
      skills: [...profile.skills, skillInput.trim()],
    };
    setProfile(updated);
    updateCVProfile(updated);
    setSkillInput('');
  };

  const handleRemoveSkill = (skill: string) => {
    const updated = {
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    };
    setProfile(updated);
    updateCVProfile(updated);
  };

  // Trigger Print to PDF
  const handlePrint = () => {
    showSuccess(
      'Print-to-PDF Initialized',
      'Select "Save as PDF" in your browser print prompt for a clean, ATS-formatted resume export.'
    );
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Interactive ATS CV Builder' }]} />
      </div>

      {/* Header & Controls Bar */}
      <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
              Interactive ATS CV Builder
            </h1>
            <span className="text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
              Live Preview
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Build, edit, and export an ATS-compliant resume with live multi-template styling.
          </p>
        </div>

        {/* Template Style Chooser & Print action */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Template switcher */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
            <button
              onClick={() => {
                setTemplate('modern-teal');
                updateCVProfile({ templateId: 'modern-teal' });
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                template === 'modern-teal'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-navy-800'
              }`}
            >
              Modern Teal
            </button>
            <button
              onClick={() => {
                setTemplate('classic-navy');
                updateCVProfile({ templateId: 'classic-navy' });
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                template === 'classic-navy'
                  ? 'bg-white text-navy-800 shadow-sm'
                  : 'text-slate-600 hover:text-navy-800'
              }`}
            >
              Classic Executive
            </button>
          </div>

          {/* Download PDF / Print button */}
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow-soft flex items-center gap-2 transition-all"
            title="Download PDF via browser print-to-PDF"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor (Multi-section) */}
        <div className="lg:col-span-6 space-y-6 no-print">
          {/* 1. Personal Details */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-navy-800">1. Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={profile.personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  value={profile.personalInfo.title}
                  onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={profile.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={profile.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location / City</label>
                <input
                  type="text"
                  value={profile.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Portfolio / Website</label>
                <input
                  type="text"
                  value={profile.personalInfo.website}
                  onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
                />
              </div>
            </div>
          </div>

          {/* 2. Professional Summary */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft-sm space-y-3">
            <h2 className="text-sm font-bold text-navy-800">2. Professional Summary</h2>
            <textarea
              rows={4}
              value={profile.summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
              placeholder="Highlight your years of experience, core technical specialties, and primary career achievements..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800 leading-relaxed"
            />
          </div>

          {/* 3. Work Experience */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-teal-600" />
                <h2 className="text-sm font-bold text-navy-800">3. Work Experience</h2>
              </div>
              <button
                type="button"
                onClick={handleAddExperience}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Position</span>
              </button>
            </div>

            <div className="space-y-4">
              {profile.experience.map((exp, idx) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-800">Position #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => handleUpdateExperience(exp.id, 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-navy-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-navy-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Dates</label>
                      <input
                        type="text"
                        value={`${exp.startDate} — ${exp.current ? 'Present' : exp.endDate}`}
                        onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-navy-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleUpdateExperience(exp.id, 'location', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-navy-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Key Impact / Achievements
                    </label>
                    <textarea
                      rows={3}
                      value={exp.description}
                      onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-navy-800"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Education */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-teal-600" />
                <h2 className="text-sm font-bold text-navy-800">4. Education</h2>
              </div>
              <button
                type="button"
                onClick={handleAddEducation}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Degree</span>
              </button>
            </div>

            <div className="space-y-3">
              {profile.education.map((edu) => (
                <div key={edu.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-800">{edu.degree}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEducation(edu.id)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="School / University"
                      value={edu.school}
                      onChange={(e) => handleUpdateEducation(edu.id, 'school', e.target.value)}
                      className="w-full px-2 py-1 bg-white border rounded text-navy-800"
                    />
                    <input
                      type="text"
                      placeholder="Dates (e.g. 2017-2021)"
                      value={`${edu.startDate} - ${edu.endDate}`}
                      onChange={(e) => handleUpdateEducation(edu.id, 'endDate', e.target.value)}
                      className="w-full px-2 py-1 bg-white border rounded text-navy-800"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Skills */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft-sm space-y-3">
            <h2 className="text-sm font-bold text-navy-800">5. Skills & Technologies</h2>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill) => (
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

            <form onSubmit={handleAddSkill} className="flex gap-2 pt-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add skill tag (e.g. Docker, GraphQL)..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-navy-800"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-navy-800 text-white font-bold text-xs rounded-xl"
              >
                Add
              </button>
            </form>
          </div>

          {/* 6. Featured Projects */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-teal-600" />
                <h2 className="text-sm font-bold text-navy-800">6. Featured Projects</h2>
              </div>
              <button
                type="button"
                onClick={handleAddProject}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-3">
              {profile.projects.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={proj.name}
                      onChange={(e) => handleUpdateProject(proj.id, 'name', e.target.value)}
                      className="font-bold text-navy-800 bg-white px-2 py-1 rounded border w-2/3"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(proj.id)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Project Summary"
                    value={proj.description}
                    onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)}
                    className="w-full px-2 py-1 bg-white border rounded text-slate-700"
                  />
                  <input
                    type="text"
                    placeholder="Tech Stack (e.g. React, Next.js)"
                    value={proj.techStack}
                    onChange={(e) => handleUpdateProject(proj.id, 'techStack', e.target.value)}
                    className="w-full px-2 py-1 bg-white border rounded text-slate-700 font-mono text-[11px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Printable Preview */}
        <div className="lg:col-span-6 sticky top-20">
          <div className="no-print bg-slate-100 p-3 rounded-2xl border border-slate-200 mb-4 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-teal-600" />
              <span>Live ATS Document Preview ({template === 'modern-teal' ? 'Modern Teal' : 'Classic Executive'})</span>
            </span>

            <button
              onClick={handlePrint}
              className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Preview</span>
            </button>
          </div>

          <div className="bg-slate-200/60 p-2 sm:p-4 rounded-2xl overflow-x-auto shadow-inner">
            {template === 'modern-teal' ? (
              <ModernTemplate profile={profile} />
            ) : (
              <ClassicTemplate profile={profile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
