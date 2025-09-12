import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Menu, X, Sparkles, Plus } from 'lucide-react';
import { useJobs } from '../context/JobContext';

const Header = () => {
  const { state, dispatch } = useJobs();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
      
      {/* Glass Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 text-xl font-bold hover:scale-105 transition-all duration-300 group relative">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                CareerTracker
              </span>
              <span className="text-xs text-blue-200 font-normal">Pro Dashboard</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 group ${
                isActive('/')
                  ? 'bg-white/20 backdrop-blur-md shadow-lg scale-105'
                  : 'hover:bg-white/10 hover:backdrop-blur-md hover:scale-105'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
              {isActive('/') && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
              )}
            </Link>

            <Link
              to="/add"
              className={`relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 group overflow-hidden ${
                isActive('/add')
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25 scale-105'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105'
              }`}
            >
              <div className="relative flex items-center space-x-2 z-10">
                <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                <span>Add Job</span>
              </div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })}
            className="md:hidden p-2 rounded-2xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {state.isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {state.isMobileMenuOpen && (
          <div className="md:hidden pb-6 border-t border-white/20">
            <nav className="flex flex-col space-y-3 pt-4">
              <Link 
                to="/" 
                className={`text-white/90 hover:text-white font-medium transition-colors px-4 py-3 rounded-xl ${
                  isActive('/') ? 'bg-white/20 backdrop-blur-md' : 'hover:bg-white/10'
                }`}
                onClick={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })}
              >
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5" />
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link 
                to="/add" 
                className={`text-white/90 hover:text-white font-medium transition-colors px-4 py-3 rounded-xl ${
                  isActive('/add') ? 'bg-gradient-to-r from-emerald-500/30 to-teal-600/30 backdrop-blur-md' : 'hover:bg-white/10'
                }`}
                onClick={() => dispatch({ type: 'TOGGLE_MOBILE_MENU' })}
              >
                <div className="flex items-center space-x-3">
                  <Plus className="h-5 w-5" />
                  <span>Add Job</span>
                </div>
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </header>
  );
};

export default Header;