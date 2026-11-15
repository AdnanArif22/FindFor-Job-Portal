import React from 'react';
import { ApplicationStatus, JobType, WorkplaceType, JobStatus } from '../../types';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'teal' | 'amber' | 'slate' | 'success' | 'warning' | 'danger' | 'info';
  status?: ApplicationStatus | JobType | WorkplaceType | JobStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  status,
  size = 'md',
  className = '',
}) => {
  let resolvedVariant = variant || 'slate';

  if (status) {
    switch (status) {
      case 'Pending':
      case 'pending':
      case 'draft':
        resolvedVariant = 'amber';
        break;
      case 'Shortlisted':
        resolvedVariant = 'info';
        break;
      case 'Interview':
        resolvedVariant = 'teal';
        break;
      case 'Hired':
      case 'active':
        resolvedVariant = 'success';
        break;
      case 'Rejected':
      case 'closed':
        resolvedVariant = 'danger';
        break;
      case 'Remote':
        resolvedVariant = 'teal';
        break;
      case 'Full-time':
        resolvedVariant = 'primary';
        break;
      case 'Contract':
      case 'Part-time':
      case 'Internship':
        resolvedVariant = 'slate';
        break;
      default:
        resolvedVariant = 'slate';
    }
  }

  const variantStyles = {
    primary: 'bg-navy-800/10 text-navy-800 border-navy-800/20',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-100 text-amber-900 border-amber-300',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded-full',
    md: 'text-xs font-medium px-2.5 py-1 rounded-full',
    lg: 'text-sm font-semibold px-3 py-1.5 rounded-md',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border ${variantStyles[resolvedVariant]} ${sizeStyles[size]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      {children || status}
    </span>
  );
};
