import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  MdDashboard, 
  MdWork, 
  MdPeople, 
  MdSearch,
  MdSettings,
  MdNotifications,
  MdAdd,
  MdLocationOn,
  MdAttachMoney,
  MdAccessTime,
  MdBusinessCenter,
  MdTrendingUp,
  MdEmail,
  MdPhone,
  MdCheckCircle,
  MdPending,
  MdCancel
} from 'react-icons/md';

const RecruiterDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    activeJobs: 8,
    totalApplications: 156,
    shortlistedCandidates: 23,
    hiredCandidates: 12,
    talentPool: 340,
    responseRate: 68
  });

  const handleLogout = () => {
    logout();
    navigate('/select-role');
  };

  const recentActivities = [
    { id: 1, type: 'application', message: 'New application: Rahul Kumar for Software Engineer', time: '1 hour ago' },
    { id: 2, type: 'shortlist', message: 'Priya Sharma shortlisted for Data Analyst role', time: '3 hours ago' },
    { id: 3, type: 'job', message: 'New job posted: Product Manager at TCS', time: '5 hours ago' },
    { id: 4, type: 'interview', message: 'Interview scheduled with Vikram Singh', time: '1 day ago' },
    { id: 5, type: 'hire', message: 'Offer accepted: Sneha Agarwal for Frontend Developer', time: '2 days ago' }
  ];

  const activeJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Infosys',
      location: 'Bangalore, Karnataka',
      salary: '₹12,00,000 - ₹18,00,000',
      applications: 45,
      type: 'Full-time',
      posted: '3 days ago'
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'Wipro',
      location: 'Pune, Maharashtra',
      salary: '₹25,000 - ₹35,000',
      applications: 78,
      type: 'Internship',
      posted: '1 week ago'
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'TCS',
      location: 'Mumbai, Maharashtra',
      salary: '₹15,00,000 - ₹25,00,000',
      applications: 32,
      type: 'Full-time',
      posted: '2 days ago'
    }
  ];

  const talentPool = [
    {
      id: 1,
      name: 'Arjun Sharma',
      role: 'Software Engineer',
      experience: '3 years',
      skills: ['React', 'Node.js', 'MongoDB'],
      location: 'Bangalore',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Data Analyst',
      experience: '2 years',
      skills: ['Python', 'SQL', 'Tableau'],
      location: 'Mumbai',
      status: 'Interested'
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      role: 'Frontend Developer',
      experience: '1 year',
      skills: ['JavaScript', 'React', 'CSS'],
      location: 'Delhi',
      status: 'Available'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full z-20">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AC</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AlumniConnect</h3>
              <p className="text-sm text-orange-600">Recruiter Portal</p>
            </div>
          </div>
        </div>

        <nav className="px-4 pb-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === 'overview' 
                  ? 'bg-orange-50 text-orange-700' 
                  : 'text-gray-600 hover:text-orange-700 hover:bg-orange-50'
              }`}
            >
              <MdDashboard className="text-lg" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === 'jobs' 
                  ? 'bg-orange-50 text-orange-700' 
                  : 'text-gray-600 hover:text-orange-700 hover:bg-orange-50'
              }`}
            >
              <MdWork className="text-lg" />
              <span>Job Postings</span>
            </button>

            <button
              onClick={() => setActiveTab('talent')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === 'talent' 
                  ? 'bg-orange-50 text-orange-700' 
                  : 'text-gray-600 hover:text-orange-700 hover:bg-orange-50'
              }`}
            >
              <MdPeople className="text-lg" />
              <span>Talent Search</span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === 'applications' 
                  ? 'bg-orange-50 text-orange-700' 
                  : 'text-gray-600 hover:text-orange-700 hover:bg-orange-50'
              }`}
            >
              <MdBusinessCenter className="text-lg" />
              <span>Applications</span>
            </button>

            <button
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeTab === 'pipeline' 
                  ? 'bg-orange-50 text-orange-700' 
                  : 'text-gray-600 hover:text-orange-700 hover:bg-orange-50'
              }`}
            >
              <MdTrendingUp className="text-lg" />
              <span>Pipeline</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <MdSettings className="text-lg" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <MdNotifications className="text-lg" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-medium text-sm">
                    {user?.name?.charAt(0)?.toUpperCase() || 'R'}
                  </span>
                </div>
                <div className="hidden md:block">
                  <div className="text-gray-900 font-medium">{user?.name || 'Recruiter'}</div>
                  <div className="text-gray-500 text-sm">Talent Acquisition</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-gray-600 p-2 transition-colors duration-200"
              >
                <i className="fas fa-sign-out-alt text-lg"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MdWork className="text-orange-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-600 text-sm">Active Jobs</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MdBusinessCenter className="text-blue-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-600 text-sm">Applications</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <MdCheckCircle className="text-green-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-600 text-sm">Shortlisted</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.shortlistedCandidates}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MdPeople className="text-purple-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-600 text-sm">Talent Pool</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.talentPool}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activities and Active Jobs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Jobs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Active Job Postings</h3>
                    <button className="bg-orange-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-700 transition-colors">
                      Post New Job
                    </button>
                  </div>
                  <div className="space-y-4">
                    {activeJobs.slice(0, 3).map((job) => (
                      <div key={job.id} className="border border-gray-100 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 text-sm">{job.title}</h4>
                        <p className="text-xs text-gray-600">{job.company}</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-gray-600 flex items-center">
                            <MdLocationOn className="mr-1" />
                            {job.location}
                          </p>
                          <p className="text-xs text-gray-600 flex items-center">
                            <MdAttachMoney className="mr-1" />
                            {job.salary}
                          </p>
                          <p className="text-xs text-orange-600 font-medium">
                            {job.applications} applications
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Job Postings Management</h2>
                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
                  <MdAdd className="mr-2" />
                  Post New Job
                </button>
              </div>
              <div className="text-center py-8">
                <MdWork className="mx-auto text-6xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Job Posting Management</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Create, edit, and manage your job postings. Track applications and candidate engagement.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'talent' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Talent Search</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search candidates..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <button className="border border-orange-600 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors">
                    Advanced Search
                  </button>
                </div>
              </div>
              
              {/* Talent Pool */}
              <div className="space-y-4">
                {talentPool.map((candidate) => (
                  <div key={candidate.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {candidate.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                          <p className="text-sm text-gray-600">{candidate.role} • {candidate.experience}</p>
                          <p className="text-sm text-gray-500">{candidate.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {candidate.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          candidate.status === 'Available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {candidate.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Application Management</h2>
              <div className="text-center py-12">
                <MdBusinessCenter className="mx-auto text-6xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Application Tracking</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Review, shortlist, and manage applications from talented candidates across your job postings.
                </p>
                <button className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                  View All Applications
                </button>
              </div>
            </div>
          )}

          {activeTab === 'pipeline' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recruitment Pipeline</h2>
              <div className="text-center py-12">
                <MdTrendingUp className="mx-auto text-6xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Pipeline Analytics</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Track your recruitment funnel, analyze conversion rates, and optimize your hiring process.
                </p>
                <button className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                  View Pipeline Analytics
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;