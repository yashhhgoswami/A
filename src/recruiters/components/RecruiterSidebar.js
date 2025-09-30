import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MdDashboard, 
  MdSearch, 
  MdWork, 
  MdTimeline,
  MdPeople,
  MdTrendingUp,
  MdSettings,
  MdAutoAwesome,
  MdMessage,
  MdCalendarToday,
  MdFolderOpen,
  MdExpandLess,
  MdExpandMore,
  MdNotifications
} from 'react-icons/md';

const RecruiterSidebar = ({ pendingApplicationsCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    recruitment: true,
    management: false,
    insights: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuSections = [
    {
      id: 'main',
      title: 'Main',
      items: [
        {
          icon: MdDashboard,
          label: 'Dashboard',
          path: '/recruiters/dashboard',
          description: 'Overview & metrics'
        }
      ]
    },
    {
      id: 'recruitment',
      title: 'Recruitment',
      collapsible: true,
      items: [
        {
          icon: MdWork,
          label: 'Job Postings',
          path: '/recruiters/jobs',
          description: 'Manage job listings'
        },
        {
          icon: MdSearch,
          label: 'Talent Search',
          path: '/recruiters/talent-search',
          description: 'Find candidates'
        },
        {
          icon: MdAutoAwesome,
          label: 'AI Matching',
          path: '/recruiters/matching',
          description: 'Smart recommendations',
          badge: 'AI'
        },
        {
          icon: MdTimeline,
          label: 'Pipeline',
          path: '/recruiters/pipeline',
          description: 'Track applications',
          badge: pendingApplicationsCount > 0 ? pendingApplicationsCount : null
        }
      ]
    },
    {
      id: 'management',
      title: 'Management',
      collapsible: true,
      items: [
        {
          icon: MdPeople,
          label: 'Candidates',
          path: '/recruiters/candidates',
          description: 'Candidate database'
        },
        {
          icon: MdMessage,
          label: 'Messages',
          path: '/recruiters/messages',
          description: 'Communication hub',
          badge: 'new'
        },
        {
          icon: MdCalendarToday,
          label: 'Interviews',
          path: '/recruiters/interviews',
          description: 'Schedule & manage'
        },
        {
          icon: MdFolderOpen,
          label: 'Documents',
          path: '/recruiters/documents',
          description: 'Resumes & files'
        }
      ]
    },
    {
      id: 'insights',
      title: 'Analytics & Insights',
      collapsible: true,
      items: [
        {
          icon: MdTrendingUp,
          label: 'Analytics',
          path: '/recruiters/analytics',
          description: 'Performance metrics'
        },
        {
          icon: MdNotifications,
          label: 'Reports',
          path: '/recruiters/reports',
          description: 'Generate reports'
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      items: [
        {
          icon: MdSettings,
          label: 'Settings',
          path: '/recruiters/settings',
          description: 'Preferences & config'
        }
      ]
    }
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isParentActive = (items) => {
    return items.some(item => isActive(item.path));
  };

  return (
    <div className="w-72 bg-white shadow-xl fixed h-full z-20 top-16 border-r border-gray-100">
      <div className="flex flex-col h-full">
        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-6">
            {menuSections.map((section) => {
              const isExpanded = expandedSections[section.id] !== false;
              const hasActiveChild = isParentActive(section.items);
              
              return (
                <div key={section.id}>
                  {/* Section Header */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {section.title}
                    </h3>
                    {section.collapsible && (
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                      </button>
                    )}
                  </div>

                  {/* Section Items */}
                  {(!section.collapsible || isExpanded) && (
                    <div className="space-y-1">
                      {section.items.map((item, index) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        
                        return (
                          <button
                            key={index}
                            onClick={() => navigate(item.path)}
                            className={`group relative flex items-center space-x-3 px-4 py-3 rounded-xl font-medium w-full text-left transition-all duration-200 ${
                              active
                                ? 'text-orange-700 bg-gradient-to-r from-orange-50 to-orange-100 border-r-2 border-orange-500 shadow-sm'
                                : 'text-gray-600 hover:text-orange-700 hover:bg-orange-50'
                            }`}
                          >
                            {/* Active Indicator */}
                            {active && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r"></div>
                            )}
                            
                            <Icon className={`text-lg flex-shrink-0 ${active ? 'text-orange-600' : 'text-gray-400 group-hover:text-orange-500'}`} />
                            
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium">{item.label}</div>
                              <div className="text-xs text-gray-500 truncate">{item.description}</div>
                            </div>
                            
                            {/* Badges */}
                            {item.badge && (
                              <span className={`ml-auto flex-shrink-0 text-xs px-2 py-1 rounded-full ${
                                typeof item.badge === 'number'
                                  ? 'bg-red-500 text-white'
                                  : item.badge === 'AI'
                                  ? 'bg-purple-500 text-white'
                                  : item.badge === 'new'
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-500 text-white'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-orange-800">Quick Stats</h4>
              <MdTrendingUp className="text-orange-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-orange-700">Active Jobs</span>
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-bold text-orange-900">12</span>
                  <span className="text-xs text-green-600 font-medium">↗ +2</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-orange-700">Total Candidates</span>
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-bold text-orange-900">847</span>
                  <span className="text-xs text-green-600 font-medium">↗ +23</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-orange-700">This Month</span>
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-bold text-orange-900">23</span>
                  <span className="text-xs text-orange-700">hires</span>
                </div>
              </div>
            </div>
            
            {/* Progress bar for monthly goal */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-orange-700 mb-1">
                <span>Monthly Goal</span>
                <span>23/30</span>
              </div>
              <div className="w-full bg-orange-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{width: '76.7%'}}></div>
              </div>
            </div>
          </div>

          {/* Quick Action */}
          <button 
            onClick={() => navigate('/recruiters/jobs/post')}
            className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
          >
            <MdWork />
            <span>Post New Job</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSidebar;