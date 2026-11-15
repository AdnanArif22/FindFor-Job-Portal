import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { UserRole } from '../../types';
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Building2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signupDemo } = useAuth();
  const { showSuccess } = useToast();

  const [role, setRole] = useState<'candidate' | 'employer'>('candidate');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    signupDemo(name, email, role, companyName);
    showSuccess(
      'Account Created! (Demo)',
      `Welcome to find for, ${name}. Your ${role} profile has been initialized.`
    );

    if (role === 'candidate') navigate('/candidate/dashboard');
    else navigate('/employer/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200/90 p-8 shadow-soft-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-white font-black text-sm">
              f<span className="text-teal-400">f</span>
            </div>
            <span className="text-lg font-black tracking-tight text-navy-800">find for</span>
          </Link>
          <h1 className="text-2xl font-black text-navy-800">Create Your Free Account</h1>
          <p className="text-xs text-slate-500">
            Choose your account role to experience tailored hiring or job hunting workflows.
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
            Select Your Role
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('candidate')}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                role === 'candidate'
                  ? 'border-teal-500 bg-teal-50/50 shadow-sm'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <User className={`w-5 h-5 ${role === 'candidate' ? 'text-teal-600' : 'text-slate-400'}`} />
                {role === 'candidate' && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
              </div>
              <div className="mt-3">
                <p className="text-sm font-bold text-navy-800">I am a Job Seeker</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Looking for positions, CV builder, & tracking applications.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole('employer')}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                role === 'employer'
                  ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <Building2 className={`w-5 h-5 ${role === 'employer' ? 'text-amber-500' : 'text-slate-400'}`} />
                {role === 'employer' && <CheckCircle2 className="w-4 h-4 text-amber-500" />}
              </div>
              <div className="mt-3">
                <p className="text-sm font-bold text-navy-800">I am an Employer</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Publishing job postings & managing candidate pipelines.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'candidate' ? 'e.g. Maya Lin' : 'e.g. Jason Brooks'}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Work / Personal Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>
          </div>

          {role === 'employer' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Company / Organization Name *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Lumina Cloud Corp"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Create Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm rounded-xl transition-all shadow-soft flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Demo {role === 'candidate' ? 'Job Seeker' : 'Employer'} Account</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-teal-600 hover:underline">
            Log in to your account
          </Link>
        </div>
      </div>
    </div>
  );
};
