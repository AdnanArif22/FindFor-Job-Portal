import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { UserRole } from '../../types';
import {
  LogIn,
  Mail,
  Lock,
  User,
  Briefcase,
  Shield,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAs, currentRole } = useAuth();
  const { showSuccess } = useToast();

  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [password, setPassword] = useState('demo123456');

  const handleRolePreset = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'candidate') {
      setEmail('alex.morgan@example.com');
    } else if (role === 'employer') {
      setEmail('sarah.jenkins@nexuscloud.io');
    } else {
      setEmail('eleanor.vance@findfor.platform');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedRole);
    showSuccess(
      `Welcome back! (Demo)`,
      `Logged in as ${selectedRole.toUpperCase()} demo user.`
    );

    if (selectedRole === 'candidate') navigate('/candidate/dashboard');
    else if (selectedRole === 'employer') navigate('/employer/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 p-8 shadow-soft-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-white font-black text-sm">
              f<span className="text-teal-400">f</span>
            </div>
            <span className="text-lg font-black tracking-tight text-navy-800">find for</span>
          </Link>
          <h1 className="text-2xl font-black text-navy-800">Account Log In</h1>
          <p className="text-xs text-slate-500">
            Frontend demonstration only. Choose any role preset below to log in instantly.
          </p>
        </div>

        {/* Quick Role Switcher Presets */}
        <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
            Demo Quick Login Presets
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleRolePreset('candidate')}
              className={`py-2 px-1 text-xs font-bold rounded-xl flex flex-col items-center gap-1 transition-all ${
                selectedRole === 'candidate'
                  ? 'bg-navy-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Job Seeker</span>
            </button>

            <button
              type="button"
              onClick={() => handleRolePreset('employer')}
              className={`py-2 px-1 text-xs font-bold rounded-xl flex flex-col items-center gap-1 transition-all ${
                selectedRole === 'employer'
                  ? 'bg-teal-500 text-navy-950 shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Employer</span>
            </button>

            <button
              type="button"
              onClick={() => handleRolePreset('admin')}
              className={`py-2 px-1 text-xs font-bold rounded-xl flex flex-col items-center gap-1 transition-all ${
                selectedRole === 'admin'
                  ? 'bg-amber-400 text-navy-950 shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-teal-600 hover:text-teal-700"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-navy-800 hover:bg-navy-700 text-white font-bold text-sm rounded-xl transition-all shadow-soft flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Log In ({selectedRole})</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Don't have an account yet?{' '}
          <Link to="/signup" className="font-bold text-teal-600 hover:underline">
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
};
