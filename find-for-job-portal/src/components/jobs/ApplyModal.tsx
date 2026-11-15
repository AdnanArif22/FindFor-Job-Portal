import React, { useState } from 'react';
import { Job } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';
import {
  Sparkles,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building2,
  Send,
  HelpCircle
} from 'lucide-react';

interface ApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { applyToJob, hasApplied } = useApplications();
  const { showSuccess, showError } = useToast();

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState(currentUser.resumeName || 'Alex_Morgan_Frontend_Resume.pdf');
  const [coverLetter, setCoverLetter] = useState(
    `Hi ${job?.companyName || 'Hiring'} Team,\n\nI am enthusiastic to submit my application for the ${job?.title || 'open'} position. With my relevant background and technical experience, I look forward to contributing to your team's mission.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job) return null;

  const alreadyApplied = hasApplied(job.id, currentUser.id);

  // Simulated skill match calculation based on user's profile skills vs job skills
  const userSkills = currentUser.skills || ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'UI/UX Design'];
  const matchingSkills = job.skills.filter((s) =>
    userSkills.some((us) => us.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(us.toLowerCase()))
  );
  const missingSkills = job.skills.filter((s) => !matchingSkills.includes(s));
  const skillMatchScore = Math.max(45, Math.min(98, Math.round((matchingSkills.length / Math.max(job.skills.length, 1)) * 100)));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setResumeName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (alreadyApplied) {
      showError('Already Applied', 'You have already submitted an application for this position.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      applyToJob(job.id, job.title, job.companyName, job.companyLogo, {
        candidateId: currentUser.id,
        candidateName: currentUser.name,
        candidateEmail: currentUser.email,
        candidatePhone: currentUser.phone,
        candidateAvatar: currentUser.avatar,
        candidateTitle: currentUser.title || 'Product & Software Specialist',
        resumeFileName: resumeName,
        coverLetter: coverLetter,
        skillMatchScore: skillMatchScore,
        matchingSkills: matchingSkills,
        missingSkills: missingSkills,
      });

      setIsSubmitting(false);
      showSuccess(
        'Application Submitted! 🎉 (Demo)',
        `Your application for ${job.title} at ${job.companyName} is saved to your applications dashboard.`
      );
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Apply for Position"
      description={`${job.title} at ${job.companyName}`}
      maxWidth="xl"
    >
      {alreadyApplied ? (
        <div className="py-6 text-center space-y-3">
          <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-navy-800">You have already applied!</h4>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Your application is currently active. You can track its live status in your Candidate Dashboard under "My Applications".
          </p>
          <div className="pt-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-white bg-navy-800 hover:bg-navy-700 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Simulated AI Skill Match Banner */}
          <div className="bg-gradient-to-r from-teal-50 to-slate-50 border border-teal-200/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-bold text-navy-800">Simulated AI Match Assessment</span>
              </div>
              <span className="text-xs font-black text-teal-700 bg-white px-2 py-0.5 rounded-full border border-teal-200">
                {skillMatchScore}% Match
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3">
              <div
                className="bg-teal-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${skillMatchScore}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-teal-800 block mb-1">
                  Matching Skills ({matchingSkills.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {matchingSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="bg-teal-100/70 text-teal-900 text-[10px] px-1.5 py-0.5 rounded font-medium"
                    >
                      ✓ {s}
                    </span>
                  ))}
                  {matchingSkills.length === 0 && (
                    <span className="text-slate-400 text-[11px]">No exact tags</span>
                  )}
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Missing Skills ({missingSkills.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {missingSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.5 rounded"
                    >
                      {s}
                    </span>
                  ))}
                  {missingSkills.length === 0 && (
                    <span className="text-teal-600 text-[11px]">All skills covered!</span>
                  )}
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2.5 italic">
              * Frontend demonstration: simulated calculation between current candidate profile tags and required job skills.
            </p>
          </div>

          {/* Candidate Profile Details (Auto-filled) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Applicant Name</label>
              <input
                type="text"
                disabled
                value={currentUser.name}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-700"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={currentUser.email}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-700"
              />
            </div>
          </div>

          {/* Resume / CV Upload Simulation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Attach Resume / CV
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-teal-500 transition-colors bg-slate-50/50">
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-navy-800">
                Current attached resume:{' '}
                <span className="text-teal-600 font-bold">{resumeName}</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                PDF, DOCX, or RTF up to 10MB (Local demo file attachment)
              </p>
              <label className="mt-3 inline-block">
                <span className="px-3 py-1.5 text-xs font-semibold text-teal-700 bg-white border border-teal-300 rounded-lg shadow-sm hover:bg-teal-50 cursor-pointer">
                  Browse Replacement File
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Cover Note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Cover Note / Introduction
            </label>
            <textarea
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Highlight your relevant experience and enthusiasm for this role..."
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-800 leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-navy-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-xs font-bold text-white bg-teal-500 hover:bg-teal-600 rounded-xl transition-all shadow-soft flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Demo Application'}</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
