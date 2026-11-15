import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { useToast } from '../../context/ToastContext';
import { initialArticles, initialTestimonials } from '../../data/mockArticles';
import { initialFaqs } from '../../data/mockFaqs';
import { JobCard } from '../../components/jobs/JobCard';
import { CompanyCard } from '../../components/companies/CompanyCard';
import { ApplyModal } from '../../components/jobs/ApplyModal';
import { Job } from '../../types';
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Code,
  Palette,
  BrainCircuit,
  Kanban,
  FileText,
  HelpCircle,
  UserCheck
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { jobs, categories, companies } = useJobs();
  const { showSuccess } = useToast();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      badge: '✨ Leading Career Platform 2026',
      headline: 'Find your dream role. Advance your journey.',
      subline:
        'Connect directly with verified tech startups, healthcare pioneers, and Fortune 500 enterprises hiring top talent.',
      bgImage:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80',
      ctaText: 'Explore Open Roles',
      ctaLink: '/jobs',
      secondaryText: 'Build Free Resume',
      secondaryLink: '/cv-builder'
    },
    {
      badge: '🚀 Next-Gen Recruiting Solutions',
      headline: 'Hire world-class engineers, designers & leaders.',
      subline:
        'Source vetted candidates with transparent skill matches, streamlined applicant tracking, and zero hidden placement fees.',
      bgImage:
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&auto=format&fit=crop&q=80',
      ctaText: 'Post a Job Listing',
      ctaLink: '/employer/jobs/new',
      secondaryText: 'Hiring Dashboard',
      secondaryLink: '/employer/dashboard'
    },
    {
      badge: '📄 Interactive ATS CV Builder',
      headline: 'Craft an ATS-optimized resume in minutes.',
      subline:
        'Choose from sleek modern and classic executive templates with instant print-to-PDF export and smart skill suggestions.',
      bgImage:
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&auto=format&fit=crop&q=80',
      ctaText: 'Try CV Builder',
      ctaLink: '/cv-builder',
      secondaryText: 'Learn More',
      secondaryLink: '/about'
    }
  ];

  // Auto advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchKeyword) params.append('q', searchKeyword);
    if (searchLocation) params.append('loc', searchLocation);
    navigate(`/jobs?${params.toString()}`);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-6 h-6 text-teal-600" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-amber-500" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-6 h-6 text-sky-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-emerald-600" />;
      default:
        return <Briefcase className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SLIDER SECTION */}
      <section className="relative overflow-hidden bg-navy-950 text-white min-h-[580px] sm:min-h-[620px] flex items-center">
        {/* Background Slides */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.bgImage}
              alt="Hero background"
              className="w-full h-full object-cover object-center filter brightness-[0.28]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-3xl">
            {/* Animated Slide Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold mb-6 backdrop-blur-sm animate-in fade-in duration-300">
              <span>{heroSlides[currentSlide].badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              {heroSlides[currentSlide].headline}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed max-w-2xl">
              {heroSlides[currentSlide].subline}
            </p>

            {/* Quick CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={heroSlides[currentSlide].ctaLink}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-sm transition-all shadow-soft flex items-center gap-2 group"
              >
                <span>{heroSlides[currentSlide].ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to={heroSlides[currentSlide].secondaryLink}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20 backdrop-blur-sm"
              >
                {heroSlides[currentSlide].secondaryText}
              </Link>
            </div>
          </div>

          {/* Interactive Search Bar Box */}
          <div className="mt-12 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-soft-xl border border-slate-200 max-w-4xl text-slate-800">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-5 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Job title, skills (e.g. React, UX, Python)"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
                />
              </div>

              <div className="md:col-span-4 relative">
                <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Location or 'Remote'"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-teal-500 focus:bg-white text-navy-800"
                />
              </div>

              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full h-full py-3 px-6 bg-navy-800 hover:bg-navy-700 text-white font-bold rounded-xl text-sm transition-all shadow-soft flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Jobs</span>
                </button>
              </div>
            </form>

            <div className="mt-3 px-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Popular searches:</span>
              {['Frontend', 'Remote', 'Product Designer', 'DevOps', 'TypeScript', 'CleanTech'].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchKeyword(term);
                      navigate(`/jobs?q=${term}`);
                    }}
                    className="hover:text-teal-700 hover:underline"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Slider controls indicators */}
          <div className="mt-8 flex items-center gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-8 bg-teal-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. PLATFORM STATISTICS (Sample Demo Figures Clearly Labeled) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-soft-sm">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Platform Metrics (Sample Figures)
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-navy-800">12,450+</p>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Active Job Openings
              </p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-teal-600">3,200+</p>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Vetted Employers
              </p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-amber-500">88,000+</p>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Candidates Registered
              </p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-navy-800">94.8%</p>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Candidate Satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED JOB CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Explore by Industry
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 mt-1">
              Popular Job Categories
            </h2>
          </div>
          <Link
            to="/jobs"
            className="text-xs sm:text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              to={`/jobs?category=${encodeURIComponent(cat.name)}`}
              className="group bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft-sm hover:border-teal-400 hover:shadow-soft-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-teal-50 group-hover:scale-110 transition-all">
                {getCategoryIcon(cat.iconName)}
              </div>
              <h3 className="text-sm font-bold text-navy-800 group-hover:text-teal-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{cat.description}</p>
              <div className="mt-3 flex items-center justify-between text-xs font-semibold text-teal-700">
                <span>{cat.jobCount} Jobs available</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED & LATEST JOBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Handpicked Positions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 mt-1">
              Featured & Latest Opportunities
            </h2>
          </div>
          <Link
            to="/jobs"
            className="text-xs sm:text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
          >
            <span>View all {jobs.length} jobs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.slice(0, 6).map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApplyClick={(j) => setSelectedJobForApply(j)}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-sm shadow-soft transition-all"
          >
            <span>Browse All {jobs.length} Job Listings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. HOW IT WORKS (FOR CANDIDATES & EMPLOYERS) */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
              Frictionless Hiring
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
              How find for works for everyone
            </h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              Whether you are taking the next leap in your career or scaling an engineering department, our transparent tools streamline every milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* For Job Seekers */}
            <div className="bg-navy-800/80 rounded-2xl p-8 border border-navy-700/80 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold mb-6">
                <Users className="w-4 h-4" />
                <span>For Candidates</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-6">
                Land high-impact roles in 3 steps
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-teal-500 text-navy-950 font-black flex items-center justify-center flex-shrink-0 text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Build an ATS-Optimized CV</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Use our interactive CV builder to generate clean, professional resumes with automatic formatting and print-to-PDF export.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-teal-500 text-navy-950 font-black flex items-center justify-center flex-shrink-0 text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Compare Simulated Skill Matches</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      See instant percentage match breakdowns so you apply with confidence to roles where your strengths excel.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-teal-500 text-navy-950 font-black flex items-center justify-center flex-shrink-0 text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Track Progress in Real Time</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Watch your applications progress from Shortlist to Interview invitations directly on your candidate dashboard.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-navy-700">
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 text-xs font-bold text-teal-400 hover:text-teal-300"
                >
                  <span>Start browsing openings</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* For Employers */}
            <div className="bg-navy-800/80 rounded-2xl p-8 border border-navy-700/80 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-6">
                <Building2 className="w-4 h-4" />
                <span>For Employers</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-6">
                Recruit top talent faster and smarter
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-navy-950 font-black flex items-center justify-center flex-shrink-0 text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Post Verified Job Openings</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Draft rich job specifications with custom salary ranges, required skill tags, and remote policies in seconds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-navy-950 font-black flex items-center justify-center flex-shrink-0 text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Review Candidate Pipeline</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Filter applicants by match scores, inspect resumes in-modal, and move candidates through your hiring stages.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-navy-950 font-black flex items-center justify-center flex-shrink-0 text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct Stage Transitions</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      One-click status updates notify candidates instantly about interview schedules or offer confirmations.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-navy-700">
                <Link
                  to="/employer/jobs/new"
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  <span>Post your first opening</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. POPULAR COMPANIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Trusted Workplaces
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 mt-1">
              Popular Companies Hiring Now
            </h2>
          </div>
          <Link
            to="/companies"
            className="text-xs sm:text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
          >
            <span>View All Companies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.slice(0, 3).map((comp) => (
            <CompanyCard key={comp.id} company={comp} />
          ))}
        </div>
      </section>

      {/* 7. CAREER TIPS & ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Expert Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 mt-1">
              Latest Career Advice & Insights
            </h2>
          </div>
          <span className="text-xs text-slate-400">Written by senior hiring leads</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initialArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-soft-sm hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-navy-800/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {article.category}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-[11px] text-slate-400">{article.readTime}</span>
                  <h3 className="text-base font-bold text-navy-800 mt-1 line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                <div className="flex items-center gap-2 pt-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-slate-700">{article.author.name}</span>
                </div>
                <button
                  onClick={() => showSuccess('Career Article', `Opening: "${article.title}"`)}
                  className="text-xs font-bold text-teal-600 hover:text-teal-700 pt-3"
                >
                  Read guide &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              Community Voices
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 mt-1">
              Loved by Candidates & Employers
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Sample testimonials from professionals who found their team on find for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initialTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-navy-800">{t.name}</h4>
                    <p className="text-[11px] text-slate-500">
                      {t.role} • {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ PREVIEW */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Quick Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Learn more about accounts, skill matching, and the interactive CV builder.
          </p>
        </div>

        <div className="space-y-3">
          {initialFaqs.slice(0, 4).map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-soft-sm"
            >
              <h3 className="text-sm font-bold text-navy-800 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                {faq.question}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed pl-6">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/faq"
            className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1"
          >
            <span>View all questions in the Knowledge Base</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 10. STRONG CALLS TO ACTION (JOB SEEKERS & EMPLOYERS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-8 sm:p-10 text-white shadow-soft-xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
                For Job Seekers
              </span>
              <h3 className="text-2xl font-black mt-2">Ready to discover your next chapter?</h3>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed max-w-md">
                Browse verified listings with transparent salaries, test simulated skill scores, and generate an ATS-ready resume today.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/jobs"
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs transition-colors"
                >
                  Search Jobs Now
                </Link>
                <Link
                  to="/cv-builder"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
                >
                  Create My CV
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-3xl p-8 sm:p-10 text-white shadow-soft-xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                For Employers
              </span>
              <h3 className="text-2xl font-black mt-2">Accelerate your team’s hiring pipeline</h3>
              <p className="text-xs text-teal-100 mt-3 leading-relaxed max-w-md">
                Publish openings directly to our active talent community, evaluate applicant portfolios, and move candidates to interview with ease.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/employer/jobs/new"
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-navy-950 font-bold text-xs transition-colors"
                >
                  Post a Job Listing
                </Link>
                <Link
                  to="/employer/dashboard"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
                >
                  Recruitment Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Apply Modal Trigger */}
      <ApplyModal
        job={selectedJobForApply}
        isOpen={!!selectedJobForApply}
        onClose={() => setSelectedJobForApply(null)}
      />
    </div>
  );
};
