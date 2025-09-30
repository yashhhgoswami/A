import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MdDashboard, 
  MdPeople, 
  MdEvent, 
  MdAnalytics, 
  MdWork,
  MdSettings,
  MdHelp,
  MdSchool,
  MdNotifications
} from 'react-icons/md';

const InstituteSidebar = ({ pendingApplicationsCount = 0, upcomingEventsCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: MdDashboard,
      label: 'Dashboard',
      path: '/institute/dashboard',
      badge: null
    },
    {
      icon: MdPeople,
      label: 'Alumni Management',
      path: '/institute/alumni',
      badge: null
    },
    {
      icon: MdEvent,
      label: 'Event Organization',
      path: '/institute/events',
      badge: upcomingEventsCount > 0 ? upcomingEventsCount : null
    },
    {
      icon: MdAnalytics,
      label: 'Analytics Dashboard',
      path: '/institute/analytics',
      badge: null
    },
    {
      icon: MdWork,
      label: 'Placement Portal',
      path: '/institute/placement',
      badge: pendingApplicationsCount > 0 ? pendingApplicationsCount : null
    }
  ];

  const bottomMenuItems = [
    {
      icon: MdSettings,
      label: 'Settings',
      path: '/institute/settings'
    },
    {
      icon: MdHelp,
      label: 'Help & Support',
      path: '/institute/help'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="w-64 bg-white shadow-lg fixed h-full z-20 top-16 left-0 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
            <MdSchool className="text-emerald-600 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Institute Portal</h3>
            <p className="text-xs text-gray-500">Management Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 py-4 flex-1 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  flex items-center justify-between w-full px-4 py-3 text-left rounded-lg transition-colors duration-200
                  ${active 
                    ? 'text-emerald-700 bg-emerald-50 border-r-2 border-emerald-600' 
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`text-lg ${active ? 'text-emerald-600' : 'text-gray-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-emerald-50 rounded-lg">
          <h4 className="text-sm font-semibold text-emerald-800 mb-3">Quick Stats</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-emerald-700">Total Alumni</span>
              <span className="font-medium text-emerald-800">15,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-700">Active Students</span>
              <span className="font-medium text-emerald-800">4,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-700">Placement Rate</span>
              <span className="font-medium text-emerald-800">92.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-700">This Year Events</span>
              <span className="font-medium text-emerald-800">24</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-gray-200 px-4 py-4 flex-shrink-0">
        <div className="space-y-2">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  flex items-center space-x-3 w-full px-4 py-2 text-left rounded-lg transition-colors duration-200 text-sm
                  ${active 
                    ? 'text-emerald-700 bg-emerald-50' 
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                  }
                `}
              >
                <Icon className={`text-lg ${active ? 'text-emerald-600' : 'text-gray-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notifications Panel */}
      <div className="border-t border-gray-200 px-4 py-3 flex-shrink-0">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-emerald-700 transition-colors duration-200 text-xs w-full">
          <MdNotifications className="text-sm" />
          <span>View all notifications</span>
          {(pendingApplicationsCount + upcomingEventsCount) > 0 && (
            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {pendingApplicationsCount + upcomingEventsCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default InstituteSidebar;