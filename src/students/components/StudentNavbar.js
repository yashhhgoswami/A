import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MdSettings, MdNotifications } from 'react-icons/md';

const StudentNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/select-role');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
      <div className="w-full">
        <div className="flex justify-between items-center h-16 px-6">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AC</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">AlumniConnect</span>
            <span className="ml-2 text-sm text-blue-600 font-medium">Student Portal</span>
          </div>

          {/* Center Search */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search h-4 w-4 text-gray-400"></i>
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search mentors, jobs, events..."
                type="search"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <MdNotifications className="text-lg" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative ml-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm rounded-lg hover:bg-gray-50 px-3 py-2 transition-colors duration-200">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'S'}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-gray-900 font-medium">{user?.name || 'Student'}</div>
                  </div>
                </div>

                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MdSettings className="text-lg" />
                </button>

                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-gray-600 p-2 transition-colors duration-200"
                >
                  <i className="fas fa-sign-out-alt text-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;