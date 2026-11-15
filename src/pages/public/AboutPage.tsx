import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import {
  Sparkles,
  Target,
  ShieldCheck,
  Users,
  Building2,
  HeartHandshake,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs items={[{ label: 'About find for' }]} />

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Vision & Values</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-800 tracking-tight leading-tight">
          Redefining recruitment through clarity, speed, and trust.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          find for was created to eliminate the frustrating black box of modern job hunting. We believe every candidate deserves transparent application statuses, simulated skill benchmarks, and dignified hiring experiences.
        </p>
      </section>

      {/* Purpose & Impact Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-soft-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-navy-800">Radical Transparency</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No more wondering if your resume reached a human. Candidates track real-time status progression from Pending through to Interview scheduling.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-soft-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-navy-800">Vetted Opportunities</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every company and job posting undergoes moderation review to filter spam, misleading descriptions, or predatory hiring practices.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-soft-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-navy-800">Candidate Empowerment</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Equipping job seekers with free ATS-optimized CV tools, simulated skill match calculators, and direct feedback loops.
          </p>
        </div>
      </section>

      {/* How it helps both sides */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-soft-sm space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-navy-800">Designed for Both Sides of the Hiring Equation</h2>
          <p className="text-xs text-slate-500 mt-2">
            A balanced ecosystem where quality talent meets forward-looking employers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="space-y-4 pr-0 md:pr-6">
            <div className="flex items-center gap-2 text-teal-600 font-bold text-sm">
              <Users className="w-5 h-5" />
              <span>For Job Seekers</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>One-click simulated skill match comparisons with required technical tags</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>Interactive ATS CV Builder with real-time multi-template preview & print-to-PDF</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>In-platform notifications for interview updates and status transitions</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 pt-6 md:pt-0 pl-0 md:pl-6">
            <div className="flex items-center gap-2 text-navy-800 font-bold text-sm">
              <Building2 className="w-5 h-5" />
              <span>For Employers</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>Intuitive job publishing with immediate live session indexing</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>Kanban-style candidate screening from Shortlist to Interview and Offer</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>Showcase company perks, culture, and employee milestones</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Demo Notice Banner */}
      <section className="bg-navy-900 rounded-3xl p-8 sm:p-10 text-white text-center space-y-4">
        <h3 className="text-xl font-bold">Frontend Prototype Notice</h3>
        <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
          find for is an interactive frontend demonstration built with React, TypeScript, and Tailwind CSS. All jobs, candidate applications, company profiles, and authentication flows run entirely in the browser using state and local storage. No external network data is harvested.
        </p>
        <div className="pt-2">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-xl transition-colors"
          >
            <span>Explore Demo Job Board</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
