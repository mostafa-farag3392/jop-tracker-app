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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddJob />} />
              <Route path="/job/:id" element={<JobDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </JobProvider>
  );
};

export default App;