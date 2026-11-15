import React from 'react';
import { CVProfile } from '../../types';

interface ClassicTemplateProps {
  profile: CVProfile;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ profile }) => {
  const { personalInfo, summary, experience, education, skills, projects } = profile;

  return (
    <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-xl shadow-sm border border-slate-300 max-w-3xl mx-auto cv-preview-container print:p-0 print:border-none print:shadow-none font-serif text-left">
      {/* Traditional Centered Header */}
      <div className="text-center border-b border-navy-800 pb-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-normal uppercase text-navy-800">
          {personalInfo.fullName || 'Alex Morgan'}
        </h1>
        {personalInfo.title && (
          <p className="text-sm font-medium tracking-wide text-slate-700 italic mt-1 font-sans">
            {personalInfo.title}
          </p>
        )}

        <div className="mt-2.5 flex flex-wrap justify-center items-center gap-x-3 text-xs text-slate-600 font-sans">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.website && <span>• {personalInfo.website.replace('https://', '')}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-navy-800 border-b border-slate-300 pb-1 mb-2 font-sans">
            Executive Summary
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed font-sans">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-navy-800 border-b border-slate-300 pb-1 mb-3 font-sans">
            Professional Experience
          </h2>
          <div className="space-y-4 font-sans">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-navy-800">{exp.title}</span>
                  <span className="text-[11px] text-slate-600 italic">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs text-slate-700 font-semibold mb-1">
                  {exp.company} {exp.location && `| ${exp.location}`}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-navy-800 border-b border-slate-300 pb-1 mb-2 font-sans">
            Education
          </h2>
          <div className="space-y-2 font-sans">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-navy-800">{edu.degree}</span>
                  <span className="text-xs text-slate-700">, {edu.school}</span>
                </div>
                <span className="text-[11px] text-slate-600">
                  {edu.startDate} – {edu.endDate} {edu.grade && `(${edu.grade})`}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-navy-800 border-b border-slate-300 pb-1 mb-2 font-sans">
            Core Competencies & Skills
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed font-sans">
            {skills.join('  •  ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-navy-800 border-b border-slate-300 pb-1 mb-2 font-sans">
            Notable Projects
          </h2>
          <div className="space-y-2.5 font-sans">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-navy-800">{proj.name}</span>
                  {proj.link && (
                    <span className="text-[10px] text-slate-500 italic">{proj.link}</span>
                  )}
                </div>
                <p className="text-xs text-slate-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
