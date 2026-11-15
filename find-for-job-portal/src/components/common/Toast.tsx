import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let borderClass = 'border-l-sky-500';
        let iconClass = 'text-sky-500';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderClass = 'border-l-teal-500';
          iconClass = 'text-teal-600';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-l-rose-500';
          iconClass = 'text-rose-600';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderClass = 'border-l-amber-500';
          iconClass = 'text-amber-600';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-white border border-slate-200 border-l-4 ${borderClass} rounded-lg p-4 shadow-soft-lg flex items-start justify-between gap-3 transform transition-all duration-300 animate-in slide-in-from-right-8`}
          >
            <div className="flex items-start gap-3">
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconClass}`} />
              <div>
                <p className="text-sm font-semibold text-slate-900">{toast.title}</p>
                {toast.message && (
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
                )}
                <span className="inline-block mt-1 text-[10px] font-semibold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">
                  Demo Interactive State
                </span>
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
