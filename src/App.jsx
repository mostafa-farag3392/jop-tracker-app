import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AddJob from './components/AddJob';
import JobDetails from './components/JobDetails';

const App = () => {
  return (
    <JobProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddJob />} />
            <Route path="/job/:id" element={<JobDetails />} />
          </Routes>
        </div>
      </Router>
    </JobProvider>
  );
};

export default App;