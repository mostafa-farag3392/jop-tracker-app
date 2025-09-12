import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit3, Trash2, Building, User, Calendar, FileText, Save, X, Target, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import StatusBadge from './StatusBadge';

const JobDetails = () => {
  const { state, dispatch } = useJobs();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [focusedField, setFocusedField] = useState('');

  const job = state.jobs.find(j => j.id === id);

  useEffect(() => {
    if (job) {
      setFormData(job);
    }
  }, [job]);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job application you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="modern-btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl hover:scale-105 transition-all duration-300"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!formData.companyName?.trim() || !formData.jobTitle?.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    dispatch({ type: 'UPDATE_JOB', payload: formData });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      dispatch({ type: 'DELETE_JOB', payload: id });
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const config = statusConfig[job.status] || statusConfig.Applied;
  const IconComponent = config.icon;

  const statusOptions = [
    { value: 'Applied', color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50' },
    { value: 'Interviewing', color: 'from-amber-500 to-orange-500', bg: 'from-amber-50 to-orange-50' },
    { value: 'Offer', color: 'from-emerald-500 to-green-500', bg: 'from-emerald-50 to-green-50' },
    { value: 'Rejected', color: 'from-red-500 to-rose-500', bg: 'from-red-50 to-rose-50' }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300 mb-6 group"
          >
            <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="modern-card rounded-3xl bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden">
          
          {/* Header Section with Status */}
          <div className={`relative p-8 bg-gradient-to-r ${config.color}`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {isEditing ? (
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle || ''}
                        onChange={handleChange}
                        className="bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/70 focus:ring-4 focus:ring-white/20 focus:border-white/50 transition-all duration-300"
                        placeholder="Job Title"
                      />
                    ) : (
                      job.jobTitle
                    )}
                  </h1>
                  <p className="text-xl text-white/90">
                    {isEditing ? (
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName || ''}
                        onChange={handleChange}
                        className="bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/70 focus:ring-4 focus:ring-white/20 focus:border-white/50 transition-all duration-300"
                        placeholder="Company Name"
                      />
                    ) : (
                      job.companyName
                    )}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                {!isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="modern-btn flex items-center space-x-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={handleDelete}
                      className="modern-btn flex items-center space-x-2 bg-red-500/20 backdrop-blur-md hover:bg-red-500/30 text-white px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="modern-btn flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md hover:bg-emerald-500/30 text-white px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(job);
                      }}
                      className="modern-btn flex items-center space-x-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-8">
            
            {/* Status Selection (Edit Mode) */}
            {isEditing && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Application Status
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {statusOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        formData.status === option.value ? 'scale-105' : 'hover:scale-102'
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={formData.status === option.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                        formData.status === option.value
                          ? `bg-gradient-to-r ${option.bg} border-current shadow-lg`
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center justify-center">
                          <span className={`font-medium text-sm ${
                            formData.status === option.value
                              ? `bg-gradient-to-r ${option.color} bg-clip-text text-transparent`
                              : 'text-gray-600'
                          }`}>
                            {option.value}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Application Date */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                Application Date
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="applicationDate"
                  value={formData.applicationDate || ''}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('date')}
                  onBlur={() => setFocusedField('')}
                  className={`modern-input w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 ${
                    focusedField === 'date' ? 'border-indigo-400 shadow-lg' : 'border-gray-200'
                  }`}
                />
              ) : (
                <p className="text-lg font-medium text-gray-900">
                  {new Date(job.applicationDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>

            {/* Notes Section */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                Notes & Comments
              </label>
              {isEditing ? (
                <textarea
                  name="notes"
                  value={formData.notes || ''}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('notes')}
                  onBlur={() => setFocusedField('')}
                  rows={6}
                  className={`modern-input w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 resize-none ${
                    focusedField === 'notes' ? 'border-indigo-400 shadow-lg' : 'border-gray-200'
                  }`}
                  placeholder="Add notes about this application..."
                />
              ) : (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {job.notes || (
                      <span className="text-gray-400 italic">No notes added yet</span>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Current Status Display (View Mode) */}
            {!isEditing && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Status</h3>
                <div className="flex items-center space-x-3">
                  <StatusBadge status={job.status} />
                  <span className="text-gray-600">•</span>
                  <span className="text-sm text-gray-600">
                    Last updated: {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;