import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Building, Briefcase, Calendar, FileText, Sparkles, Save, X } from 'lucide-react';
import { useJobs } from '../context/JobContext';

const AddJob = () => {
  const { dispatch } = useJobs();
  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState('');

  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    status: 'Applied',
    applicationDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.jobTitle) {
      alert('Please fill in required fields');
      return;
    }
    
    dispatch({ type: 'ADD_JOB', payload: formData });
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const statusOptions = [
    { value: 'Applied', color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50' },
    { value: 'Interviewing', color: 'from-amber-500 to-orange-500', bg: 'from-amber-50 to-orange-50' },
    { value: 'Offer', color: 'from-emerald-500 to-green-500', bg: 'from-emerald-50 to-green-50' },
    { value: 'Rejected', color: 'from-red-500 to-rose-500', bg: 'from-red-50 to-rose-50' }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300 mb-6 group"
          >
            <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          
          <div className="float-animation mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Add New Application
          </h1>
          <p className="text-lg text-gray-600">
            Take the next step in your career journey
          </p>
        </div>

        {/* Form Card */}
        <div className="modern-card rounded-3xl p-8 bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Company Name */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Building className="h-4 w-4 mr-2 text-indigo-600" />
                Company Name <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField('')}
                  className={`modern-input w-full px-4 py-4 border-2 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 ${
                    focusedField === 'company' ? 'border-indigo-400 shadow-lg' : 'border-gray-200'
                  }`}
                  placeholder="e.g., Google, Microsoft, Apple..."
                />
                {focusedField === 'company' && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Job Title */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-indigo-600" />
                Job Title <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="jobTitle"
                  required
                  value={formData.jobTitle}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('title')}
                  onBlur={() => setFocusedField('')}
                  className={`modern-input w-full px-4 py-4 border-2 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 ${
                    focusedField === 'title' ? 'border-indigo-400 shadow-lg' : 'border-gray-200'
                  }`}
                  placeholder="e.g., Senior Frontend Developer, Product Manager..."
                />
                {focusedField === 'title' && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Selection */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Application Status
              </label>
              <div className="grid grid-cols-2 gap-3">
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
                        <span className={`font-medium ${
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

            {/* Application Date */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                Application Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="applicationDate"
                  value={formData.applicationDate}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('date')}
                  onBlur={() => setFocusedField('')}
                  className={`modern-input w-full px-4 py-4 border-2 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 ${
                    focusedField === 'date' ? 'border-indigo-400 shadow-lg' : 'border-gray-200'
                  }`}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                Notes & Comments
              </label>
              <div className="relative">
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('notes')}
                  onBlur={() => setFocusedField('')}
                  rows={4}
                  className={`modern-input w-full px-4 py-4 border-2 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 resize-none ${
                    focusedField === 'notes' ? 'border-indigo-400 shadow-lg' : 'border-gray-200'
                  }`}
                  placeholder="Add any additional notes about this application, interview feedback, or next steps..."
                />
                {focusedField === 'notes' && (
                  <div className="absolute right-4 top-4">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
              <button
                type="submit"
                className="modern-btn flex-1 flex items-center justify-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-8 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Save className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Save Application</span>
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/')}
                className="modern-btn flex-1 flex items-center justify-center space-x-3 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 px-8 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 group"
              >
                <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-indigo-600" />
            Pro Tips
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Keep detailed notes about your application process</li>
            <li>• Set reminders to follow up on your applications</li>
            <li>• Track the job requirements for interview preparation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddJob;