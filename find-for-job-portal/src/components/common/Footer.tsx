import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import {
  Briefcase,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  Globe,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showSuccess } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showSuccess('Subscribed to Job Alerts (Demo)', `We'll send weekly career updates to ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-navy-900 text-slate-300 pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Banner Card */}
        <div className="bg-navy-800/90 rounded-2xl p-8 mb-14 border border-navy-700/60 shadow-soft-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Stay Ahead in Your Career</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                Get handpicked job opportunities directly to your inbox
              </h3>
              <p className="text-sm text-slate-300 mt-2">
                Join over 45,000+ professionals discovering verified openings, salary benchmarks, and hiring trends.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="px-4 py-3 rounded-xl bg-navy-950/70 border border-navy-600 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 w-full sm:w-80"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-navy-800">
          {/* Brand info */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-navy-950 font-black text-base shadow-sm">
                f<span className="text-white">f</span>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                find <span className="text-teal-400">for</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed max-w-sm">
              The next-generation frontend recruitment platform connecting top talent with progressive companies worldwide.
            </p>

            <div className="mt-6 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>San Francisco, CA & Global Remote (Sample)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>support@findfor.platform.demo</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>+1 (800) 555-DEMO (Mon-Fri 9am-6pm PT)</span>
              </div>
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Job Seekers</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/jobs" className="hover:text-teal-400 transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/cv-builder" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <span>CV Builder</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-semibold">New</span>
                </Link>
              </li>
              <li>
                <Link to="/candidate/dashboard" className="hover:text-teal-400 transition-colors">
                  Candidate Dashboard
                </Link>
              </li>
              <li>
                <Link to="/candidate/applications" className="hover:text-teal-400 transition-colors">
                  My Applications
                </Link>
              </li>
              <li>
                <Link to="/candidate/saved-jobs" className="hover:text-teal-400 transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Employers</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/employer/jobs/new" className="hover:text-teal-400 transition-colors">
                  Post a Opening
                </Link>
              </li>
              <li>
                <Link to="/employer/dashboard" className="hover:text-teal-400 transition-colors">
                  Hiring Dashboard
                </Link>
              </li>
              <li>
                <Link to="/employer/applicants" className="hover:text-teal-400 transition-colors">
                  Candidate Pipeline
                </Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-teal-400 transition-colors">
                  Company Directory
                </Link>
              </li>
              <li>
                <Link to="/employer/company" className="hover:text-teal-400 transition-colors">
                  Brand Profile Setup
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Admin */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Platform & Admin</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">
                  About find for
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-teal-400 transition-colors">
                  Knowledge Base & FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Portal</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/jobs" className="hover:text-teal-400 transition-colors text-xs text-slate-400">
                  Moderation Desk
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span>
              &copy; {new Date().getFullYear()} find for. Frontend prototype demonstration. All accounts and jobs are simulated.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-400 transition-colors">
              Terms of Use (Demo)
            </Link>
            <Link to="/about" className="hover:text-slate-400 transition-colors">
              Privacy Notice
            </Link>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">
              Security
            </Link>
            <span className="flex items-center gap-1 text-slate-400">
              <Globe className="w-3.5 h-3.5" />
              English (US)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
