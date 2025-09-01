import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Briefcase, Calendar, Building, Eye, Download, Upload } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import StatusBadge from './StatusBadge';

const Dashboard = () => {
  const { state, dispatch } = useJobs();
  const navigate = useNavigate();

  const exportJobs = () => {
    const dataStr = JSON.stringify(state.jobs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'job-applications.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importJobs = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedJobs = JSON.parse(e.target.result);
          if (Array.isArray(importedJobs)) {
            dispatch({ type: 'SET_JOBS', payload: importedJobs });
          }
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const statsData = {
    total: state.jobs.length,
    applied: state.jobs.filter(job => job.status === 'Applied').length,
    interviewing: state.jobs.filter(job => job.status === 'Interviewing').length,
    offers: state.jobs.filter(job => job.status === 'Offer').length,
    rejected: state.jobs.filter(job => job.status === 'Rejected').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applications Dashboard</h1>
            <p className="text-gray-600">Track and manage your job applications</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <button
              onClick={exportJobs}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            
            <label className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={importJobs}
                className="hidden"
              />
            </label>
            
            <button
              onClick={() => navigate('/add')}
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Job
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="text-2xl font-bold text-gray-900">{statsData.total}</div>
            <div className="text-sm text-gray-500">Total Applications</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="text-2xl font-bold text-blue-600">{statsData.applied}</div>
            <div className="text-sm text-gray-500">Applied</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="text-2xl font-bold text-yellow-600">{statsData.interviewing}</div>
            <div className="text-sm text-gray-500">Interviewing</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="text-2xl font-bold text-green-600">{statsData.offers}</div>
            <div className="text-sm text-gray-500">Offers</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="text-2xl font-bold text-red-600">{statsData.rejected}</div>
            <div className="text-sm text-gray-500">Rejected</div>
          </div>
        </div>

        {/* Jobs List */}
        {state.jobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No job applications yet</h3>
            <p className="text-gray-500 mb-6">Start tracking your job applications by adding your first entry.</p>
            <button
              onClick={() => navigate('/add')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Job
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6">
            {state.jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/job/${job.id}`)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.jobTitle}</h3>
                        <p className="text-gray-600 flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          {job.companyName}
                        </p>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      Applied on {new Date(job.applicationDate).toLocaleDateString()}
                    </div>
                    
                    {job.notes && (
                      <p className="text-gray-600 text-sm line-clamp-2">{job.notes}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4 md:mt-0 md:ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/job/${job.id}`);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;