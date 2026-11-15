import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { Mail, ArrowLeft, CheckCircle2, KeyRound } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { showSuccess } = useToast();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    showSuccess(
      'Password Reset Simulated',
      `Demo instructions for resetting access have been dispatched to ${email}.`
    );
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 p-8 shadow-soft-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-navy-800">Reset Your Password</h1>
          <p className="text-xs text-slate-500">
            Enter your account email to receive demo password recovery guidance.
          </p>
        </div>

        {sent ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-navy-800">Demo Link Simulated!</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In a production system with a backend, a secure password reset token would be emailed to{' '}
              <strong>{email}</strong>. Since this is a frontend prototype, you can log in directly with any demo preset.
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-block px-5 py-2.5 bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs rounded-xl"
              >
                Return to Log In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex.morgan@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-navy-800 hover:bg-navy-700 text-white font-bold text-sm rounded-xl transition-all shadow-soft"
            >
              Send Password Recovery Email (Demo)
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-slate-100">
          <Link
            to="/login"
            className="text-xs font-semibold text-slate-500 hover:text-navy-800 inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
