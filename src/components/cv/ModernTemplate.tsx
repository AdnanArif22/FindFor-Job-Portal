import React from 'react';
import { CVProfile } from '../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ModernTemplateProps {
  profile: CVProfile;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ profile }) => {
  const { personalInfo, summary, experience, education, skills, projects } = profile;

  return (
    <div className="bg-white text-slate-800 p-8 sm:p-10 rounded-xl shadow-sm border border-slate-200/80 max-w-3xl mx-auto cv-preview-container print:p-0 print:border-none print:shadow-none text-left">
      {/* Header with Teal Accent */}
      <div className="border-b-2 border-teal-500 pb-6 mb-6">
        <h1 className="text-3xl font-extrabold text-navy-800 tracking-tight">
          {personalInfo.fullName || 'Alex Morgan'}
        </h1>
        <p className="text-base font-semibold text-teal-600 mt-1">
          {personalInfo.title || 'Senior Frontend & UI Engineer'}
        </p>

        {/* Contact info grid */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-teal-600" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>{personalInfo.website.replace('https://', '')}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-teal-600" />
              <span>LinkedIn</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-3 border-l-2 border-teal-100">
                <div className="flex items-baseline justify-between flex-wrap gap-1">
                  <h3 className="text-sm font-bold text-navy-800">{exp.title}</h3>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-xs font-semibold text-teal-600">
                  {exp.company} {exp.location && `• ${exp.location}`}
                </p>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between flex-wrap gap-1">
                <div>
                  <h3 className="text-xs font-bold text-navy-800">{edu.degree}</h3>
                  <p className="text-xs text-slate-600">
                    {edu.school} {edu.location && `• ${edu.location}`}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500">
                    {edu.startDate} — {edu.endDate}
                  </span>
                  {edu.grade && (
                    <p className="text-[11px] font-medium text-teal-600">{edu.grade}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Skills & Competencies
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs font-medium bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Key Projects */}
      {projects && projects.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-3">
            Featured Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xs font-bold text-navy-800">{proj.name}</h3>
                  {proj.link && (
                    <span className="text-[10px] text-teal-600 underline font-mono">
                      {proj.link.replace('https://', '')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proj.description}</p>
                {proj.techStack && (
                  <p className="text-[10px] text-slate-500 mt-1.5 font-mono">
                    <strong className="text-slate-700">Tech:</strong> {proj.techStack}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
