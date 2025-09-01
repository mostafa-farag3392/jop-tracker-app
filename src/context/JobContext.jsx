import React, { createContext, useContext, useReducer, useEffect } from 'react';

const JobContext = createContext();

const jobReducer = (state, action) => {
  switch (action.type) {
    case 'SET_JOBS':
      return { ...state, jobs: action.payload };
    case 'ADD_JOB':
      const newJob = { ...action.payload, id: Date.now().toString() };
      return { ...state, jobs: [...state.jobs, newJob] };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(job => 
          job.id === action.payload.id ? action.payload : job
        )
      };
    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload)
      };
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
    default:
      return state;
  }
};

export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, {
    jobs: [],
    isMobileMenuOpen: false
  });

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    dispatch({ type: 'SET_JOBS', payload: savedJobs });
  }, []);

  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(state.jobs));
  }, [state.jobs]);

  return (
    <JobContext.Provider value={{ state, dispatch }}>
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