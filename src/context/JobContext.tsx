import React, { createContext, useState, ReactNode } from 'react';

export type JobDetails = {
  title: string;
  company: string;
  skills: string[];
  experience: string;
  description: string;
  rawContent: string;
};

type JobContextType = {
  jobDetails: JobDetails | null;
  isAnalyzing: boolean;
  error: string | null;
  setJobDetails: (details: JobDetails) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setError: (error: string | null) => void;
  resetJob: () => void;
};

const initialJobDetails: JobDetails = {
  title: '',
  company: '',
  skills: [],
  experience: '',
  description: '',
  rawContent: ''
};

export const JobContext = createContext<JobContextType>({
  jobDetails: null,
  isAnalyzing: false,
  error: null,
  setJobDetails: () => {},
  setIsAnalyzing: () => {},
  setError: () => {},
  resetJob: () => {}
});

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetJob = () => {
    setJobDetails(null);
    setError(null);
  };

  return (
    <JobContext.Provider 
      value={{ 
        jobDetails, 
        isAnalyzing,
        error, 
        setJobDetails, 
        setIsAnalyzing,
        setError,
        resetJob
      }}
    >
      {children}
    </JobContext.Provider>
  );
};