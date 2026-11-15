import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { useToast } from '../../context/ToastContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Globe,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showSuccess } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    role: 'Candidate',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    showSuccess(
      'Message Received! (Demo)',
      `Thank you ${formData.name}. Your inquiry regarding "${formData.subject || 'Support'}" has been simulated.`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-4xl font-black text-navy-800 tracking-tight">
          Get in Touch
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Have feedback or questions about the find for platform? Send us a demo message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact info card (Sample figures labeled) */}
        <div className="lg:col-span-5 bg-navy-900 text-white rounded-3xl p-8 shadow-soft-xl space-y-8">
          <div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
              Support Center
            </span>
            <h2 className="text-xl font-bold mt-1 text-white">Contact Information</h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Sample communication channels. No actual external emails or phone calls are dispatched from this frontend demo.
            </p>
          </div>

          <div className="space-y-5 text-xs text-slate-300">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-navy-800 text-teal-400 border border-navy-700 flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Email Address</p>
                <p className="mt-0.5">contact@findfor.platform.demo</p>
                <p className="text-[11px] text-slate-400">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-navy-800 text-teal-400 border border-navy-700 flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Telephone</p>
                <p className="mt-0.5">+1 (800) 555-FIND (Sample)</p>
                <p className="text-[11px] text-slate-400">Mon-Fri: 9:00 AM – 6:00 PM PT</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-navy-800 text-teal-400 border border-navy-700 flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Headquarters Office</p>
                <p className="mt-0.5">500 Howard Street, Suite 300</p>
                <p className="text-[11px] text-slate-400">San Francisco, CA 94105 (Demo Address)</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-navy-800">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Social Links (Sample)
            </p>
            <div className="flex gap-2 text-xs">
              {['LinkedIn', 'Twitter', 'GitHub', 'Discord'].map((platform) => (
                <span
                  key={platform}
                  className="px-2.5 py-1 rounded-lg bg-navy-800 border border-navy-700 text-slate-300 font-medium"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-8 shadow-soft-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-navy-800">Message Delivered! (Demo)</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your feedback has been simulated locally. A real backend would trigger an automated confirmation to <strong>{formData.email}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', role: 'Candidate', message: '' });
                }}
                className="px-5 py-2.5 bg-navy-800 text-white font-bold text-xs rounded-xl"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-navy-800 mb-2">Send us a direct message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    I am a...
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white"
                  >
                    <option value="Candidate">Job Seeker / Candidate</option>
                    <option value="Employer">Employer / Recruiter</option>
                    <option value="Partner">Integration Partner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Question about CV builder"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you today? Provide as much detail as possible..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-800 focus:outline-none focus:border-teal-500 focus:bg-white leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-soft flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Demo Message</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
