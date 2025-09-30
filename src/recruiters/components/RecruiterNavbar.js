import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  MdSettings, 
  MdNotifications, 
  MdWork, 
  MdSearch,
  MdAdd,
  MdMessage,
  MdKeyboardArrowDown,
  MdAccountCircle,
  MdLogout,
  MdDashboard,
  MdBusiness,
  MdHelp
} from 'react-icons/md';

const RecruiterNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  // Sample notifications
  const notifications = [
    {
      id: 1,
      type: 'application',
      title: 'New Application Received',
      message: 'Sarah Johnson applied for Senior Developer position',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'match',
      title: 'AI Found Perfect Match',
      message: '95% match found for Product Manager role',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'interview',
      title: 'Interview Reminder',
      message: 'Interview with Michael Chen in 30 minutes',
      time: '2 hours ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/select-role');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recruiters/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application': return '👤';
      case 'match': return '🎯';
      case 'interview': return '📅';
      default: return '📬';
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="w-full">
        <div className="flex justify-between items-center h-16 px-6">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">AC</span>
            </div>
            <div className="ml-3">
              <div className="text-xl font-bold text-gray-900">AlumniConnect</div>
              <div className="text-xs text-orange-600 font-medium flex items-center">
                <MdWork className="mr-1" />
                Recruiter Portal
              </div>
            </div>
          </div>

          {/* Enhanced Search */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MdSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:bg-white sm:text-sm transition-all duration-200"
                placeholder="Search candidates, jobs, companies, skills..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-200 border border-gray-300 rounded">
                  ⌘K
                </kbd>
              </div>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Quick Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              <button 
                onClick={() => navigate('/recruiters/jobs/post')}
                className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <MdAdd className="text-base" />
                <span>Post Job</span>
              </button>
              <button 
                onClick={() => navigate('/recruiters/talent-search')}
                className="flex items-center space-x-2 border border-orange-600 text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                <MdSearch className="text-base" />
                <span>Find Talent</span>
              </button>
            </div>

            {/* Messages */}
            <button 
              onClick={() => navigate('/recruiters/messages')}
              className="relative p-3 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
            >
              <MdMessage className="text-xl" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-green-500 rounded-full"></span>
            </button>

            {/* Enhanced Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
              >
                <MdNotifications className="text-xl" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      <span className="text-sm text-gray-500">{unreadCount} unread</span>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                          notification.read ? 'border-transparent' : 'border-orange-500 bg-orange-50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{notification.title}</div>
                            <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                            <div className="text-xs text-gray-500 mt-2">{notification.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced User Menu */}
            <div className="relative ml-2" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-semibold text-sm">
                    {user?.name?.charAt(0)?.toUpperCase() || 'R'}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.companyName || user?.name || 'Recruiter'}
                  </div>
                  <div className="text-xs text-gray-500">Talent Acquisition</div>
                </div>
                <MdKeyboardArrowDown className={`text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.companyName || user?.name || 'Recruiter'}
                    </div>
                    <div className="text-sm text-gray-500">{user?.email || 'recruiter@company.com'}</div>
                  </div>
                  
                  <div className="py-2">
                    <button 
                      onClick={() => navigate('/recruiters/dashboard')}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors duration-200"
                    >
                      <MdDashboard className="text-gray-400" />
                      <span>Dashboard</span>
                    </button>
                    
                    <button 
                      onClick={() => navigate('/recruiters/profile')}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors duration-200"
                    >
                      <MdAccountCircle className="text-gray-400" />
                      <span>Profile</span>
                    </button>
                    
                    <button 
                      onClick={() => navigate('/recruiters/company')}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors duration-200"
                    >
                      <MdBusiness className="text-gray-400" />
                      <span>Company Settings</span>
                    </button>
                    
                    <button 
                      onClick={() => navigate('/recruiters/settings')}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors duration-200"
                    >
                      <MdSettings className="text-gray-400" />
                      <span>Settings</span>
                    </button>
                    
                    <button 
                      onClick={() => navigate('/recruiters/help')}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors duration-200"
                    >
                      <MdHelp className="text-gray-400" />
                      <span>Help & Support</span>
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors duration-200"
                    >
                      <MdLogout className="text-red-500" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default RecruiterNavbar;