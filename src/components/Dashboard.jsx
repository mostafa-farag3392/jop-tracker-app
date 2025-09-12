import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Briefcase, Calendar, Building, Eye, Download, Upload, TrendingUp, Target, Clock, CheckCircle } from 'lucide-react';
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

  const statusConfig = {
    Applied: {
      color: 'from-blue-500 to-cyan-500',
      bg: 'from-blue-50 to-cyan-50',
      text: 'text-blue-700',
      icon: Clock,
      ring: 'ring-blue-200'
    },
    Interviewing: {
      color: 'from-amber-500 to-orange-500',
      bg: 'from-amber-50 to-orange-50',
      text: 'text-amber-700',
      icon: TrendingUp,
      ring: 'ring-amber-200'
    },
    Offer: {
      color: 'from-emerald-500 to-green-500',
      bg: 'from-emerald-50 to-green-50',
      text: 'text-emerald-700',
      icon: CheckCircle,
      ring: 'ring-emerald-200'
    },
    Rejected: {
      color: 'from-red-500 to-rose-500',
      bg: 'from-red-50 to-rose-50',
      text: 'text-red-700',
      icon: Target,
      ring: 'ring-red-200'
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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Your Career Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track applications, monitor progress, and accelerate your career growth
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Total Card */}
          <div className="modern-card rounded-3xl p-6 overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-br from-gray-50 to-blue-50 border-2 ring-gray-200 hover:shadow-2xl">
            <div className="relative flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 bg-white/80">
                Total
              </div>
            </div>
            <div className="relative">
              <div className="text-4xl font-bold text-gray-700 mb-1">
                {statsData.total}
              </div>
              <div className="text-sm text-gray-500">Applications</div>
            </div>
          </div>

          {/* Status Cards */}
          {Object.entries({ Applied: statsData.applied, Interviewing: statsData.interviewing, Offer: statsData.offers, Rejected: statsData.rejected }).map(([status, count]) => {
            const config = statusConfig[status];
            const IconComponent = config.icon;
            
            return (
              <div
                key={status}
                className={`relative modern-card rounded-3xl p-6 overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-br ${config.bg} border-2 ${config.ring} hover:shadow-2xl`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`relative flex items-center justify-between mb-4`}>
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${config.color} shadow-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${config.text} bg-white/80`}>
                    {status}
                  </div>
                </div>
                
                {/* Count */}
                <div className="relative">
                  <div className={`text-4xl font-bold ${config.text} mb-1`}>
                    {count}
                  </div>
                  <div className="text-sm text-gray-500">Applications</div>
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="modern-card rounded-3xl p-6 mb-8 bg-white/80 backdrop-blur-md border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Applications</h2>
              <p className="text-gray-600">Manage and track your career opportunities</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={exportJobs}
                className="modern-btn flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="h-4 w-4" />
                <span className="font-medium">Export</span>
              </button>
              
              <label className="modern-btn flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105">
                <Upload className="h-4 w-4" />
                <span className="font-medium">Import</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={importJobs}
                  className="hidden"
                />
              </label>
              
              <button
                onClick={() => navigate('/add')}
                className="modern-btn flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-4 w-4" />
                <span className="font-medium">Add New Job</span>
              </button>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {state.jobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="float-animation mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-20"></div>
                <Building className="relative mx-auto h-24 w-24 text-gray-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No applications yet</h3>
            <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
              Start your job search journey by adding your first application
            </p>
            <button
              onClick={() => navigate('/add')}
              className="modern-btn inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-3" />
              <span className="font-medium">Add Your First Job</span>
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6">
            {state.jobs.map((job, index) => {
              const config = statusConfig[job.status] || statusConfig.Applied;
              return (
                <div
                  key={job.id}
                  className="modern-card rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-white/90 backdrop-blur-md border border-white/20 group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/job/${job.id}`)}
                >
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700">
                          {job.jobTitle}
                        </h3>
                        <StatusBadge status={job.status} />
                      </div>
                      
                      <p className="text-lg text-gray-600 mb-3 font-medium flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        {job.companyName}
                      </p>
                      
                      <div className="flex items-center space-x-2 text-gray-500 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          Applied on {new Date(job.applicationDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>

                      {job.notes && (
                        <p className="text-gray-600 text-sm line-clamp-2 mt-2">{job.notes}</p>
                      )}
                    </div>

                    {/* Arrow Indicator */}
                    <div className="mt-4 lg:mt-0 flex justify-end">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-indigo-100 group-hover:to-purple-100 transition-all duration-300">
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Border Effect */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;