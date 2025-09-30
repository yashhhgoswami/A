import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MdSchool, 
  MdPeople, 
  MdWork, 
  MdBusiness, 
  MdEvent,
  MdPerson
} from 'react-icons/md';

const StudentSidebar = ({ pendingRequestsCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: MdSchool,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: MdPeople,
      label: 'Mentorship',
      path: '/students/mentorship',
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : null
    },
    {
      icon: MdWork,
      label: 'Job Portal',
      path: '/students/jobs',
    },
    {
      icon: MdBusiness,
      label: 'Alumni Network',
      path: '/students/alumni',
    },
    {
      icon: MdEvent,
      label: 'Events',
      path: '/students/events',
    },
    {
      icon: MdPerson,
      label: 'Profile',
      path: '/students/profile',
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-white shadow-lg fixed h-full z-20 top-16">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium w-full text-left transition-colors ${
                  active
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                <Icon className="text-lg" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default StudentSidebar;