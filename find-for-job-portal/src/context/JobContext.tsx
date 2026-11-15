import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, JobCategory, Company } from '../types';
import { initialJobs } from '../data/mockJobs';
import { initialCategories } from '../data/mockCategories';
import { initialCompanies } from '../data/mockCompanies';

interface JobContextType {
  jobs: Job[];
  categories: JobCategory[];
  companies: Company[];
  savedJobIds: string[];
  isJobSaved: (jobId: string) => boolean;
  toggleSaveJob: (jobId: string) => void;
  addJob: (newJob: Omit<Job, 'id' | 'postedDate' | 'applicantsCount'>) => Job;
  updateJob: (jobId: string, updatedFields: Partial<Job>) => void;
  deleteJob: (jobId: string) => void;
  setJobStatus: (jobId: string, status: Job['status']) => void;
  // Category management
  addCategory: (category: Omit<JobCategory, 'id' | 'jobCount'>) => void;
  updateCategory: (id: string, updatedFields: Partial<JobCategory>) => void;
  deleteCategory: (id: string) => void;
  // Company management
  updateCompany: (id: string, updatedFields: Partial<Company>) => void;
  toggleCompanyVerification: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const LOCAL_STORAGE_JOBS = 'findfor_jobs_v1';
const LOCAL_STORAGE_SAVED = 'findfor_saved_jobs_v1';
const LOCAL_STORAGE_CATS = 'findfor_categories_v1';
const LOCAL_STORAGE_COMPS = 'findfor_companies_v1';

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_JOBS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse jobs', e);
      }
    }
    return initialJobs;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_SAVED);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved jobs', e);
      }
    }
    return ['job-1', 'job-2'];
  });

  const [categories, setCategories] = useState<JobCategory[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_CATS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse categories', e);
      }
    }
    return initialCategories;
  });

  const [companies, setCompanies] = useState<Company[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_COMPS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse companies', e);
      }
    }
    return initialCompanies;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_SAVED, JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CATS, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_COMPS, JSON.stringify(companies));
  }, [companies]);

  const isJobSaved = (jobId: string) => savedJobIds.includes(jobId);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const addJob = (newJobData: Omit<Job, 'id' | 'postedDate' | 'applicantsCount'>): Job => {
    const newJob: Job = {
      ...newJobData,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
    };
    setJobs((prev) => [newJob, ...prev]);

    // Update company open jobs count
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === newJob.companyId || c.name === newJob.companyName
          ? { ...c, openJobsCount: c.openJobsCount + 1 }
          : c
      )
    );

    return newJob;
  };

  const updateJob = (jobId: string, updatedFields: Partial<Job>) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, ...updatedFields } : job))
    );
  };

  const deleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
    setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
  };

  const setJobStatus = (jobId: string, status: Job['status']) => {
    updateJob(jobId, { status });
  };

  const addCategory = (category: Omit<JobCategory, 'id' | 'jobCount'>) => {
    const newCat: JobCategory = {
      ...category,
      id: `cat-${Date.now()}`,
      jobCount: 0,
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const updateCategory = (id: string, updatedFields: Partial<JobCategory>) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updatedFields } : cat))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const updateCompany = (id: string, updatedFields: Partial<Company>) => {
    setCompanies((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, ...updatedFields } : comp))
    );
  };

  const toggleCompanyVerification = (id: string) => {
    setCompanies((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, verified: !comp.verified } : comp
      )
    );
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        categories,
        companies,
        savedJobIds,
        isJobSaved,
        toggleSaveJob,
        addJob,
        updateJob,
        deleteJob,
        setJobStatus,
        addCategory,
        updateCategory,
        deleteCategory,
        updateCompany,
        toggleCompanyVerification,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
