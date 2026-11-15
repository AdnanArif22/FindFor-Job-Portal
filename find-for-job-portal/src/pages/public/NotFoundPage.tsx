import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full space-y-5">
        <div className="text-6xl font-black text-navy-800 tracking-tight">404</div>
        <h1 className="text-xl font-extrabold text-navy-800">Page Not Found</h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          The page you are looking for doesn't exist or has moved. Explore open jobs or head back to the homepage.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-5 py-2.5 bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs rounded-xl flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <Link
            to="/jobs"
            className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Jobs</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
