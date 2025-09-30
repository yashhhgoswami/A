import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RecruiterNavbar from '../components/RecruiterNavbar';
import RecruiterSidebar from '../components/RecruiterSidebar';
import { 
  MdTrendingUp,
  MdTrendingDown,
  MdPeople,
  MdWork,
  MdTimeline,
  MdArrowForward,
  MdLocationOn,
  MdAccessTime,
  MdStar,
  MdSchool,
  MdBusiness,
  MdNotifications,
  MdAutoAwesome,
  MdSpeed,
  MdAttachMoney,
  MdCalendarToday,
  MdMessage,
  MdCheckCircle,
  MdPendingActions,
  MdWarning
} from 'react-icons/md';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      activeJobs: 12,
      totalCandidates: 847,
      pendingApplications: 23,
      hiresThisMonth: 8,
      interviewsToday: 3,
      responseRate: 72.5,
      avgTimeToHire: 18,
      costPerHire: 2450
    },
    recentJobs: [],
    topCandidates: [],
    pipelineUpdates: [],
    quickMetrics: {},
    upcomingInterviews: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setDashboardData({
        stats: {
          activeJobs: 12,
          totalCandidates: 847,
          pendingApplications: 23,
          hiresThisMonth: 8,
          interviewsToday: 3,
          responseRate: 72.5,
          avgTimeToHire: 18,
          costPerHire: 2450
        },
        recentJobs: [
          {
            id: 1,
            title: 'Senior Software Engineer',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            type: 'Full-time',
            applications: 45,
            status: 'active',
            postedDate: '2024-01-15',
            urgency: 'high',
            views: 234
          },
          {
            id: 2,
            title: 'Product Manager',
            company: 'Innovation Labs',
            location: 'Remote',
            type: 'Full-time',
            applications: 32,
            status: 'active',
            postedDate: '2024-01-12',
            urgency: 'medium',
            views: 189
          },
          {
            id: 3,
            title: 'Data Scientist',
            company: 'Analytics Pro',
            location: 'New York, NY',
            type: 'Full-time',
            applications: 28,
            status: 'active',
            postedDate: '2024-01-10',
            urgency: 'low',
            views: 167
          }
        ],
        topCandidates: [
          {
            id: 1,
            name: 'Sarah Johnson',
            title: 'Full Stack Developer',
            university: 'MIT',
            experience: '3 years',
            skills: ['React', 'Node.js', 'Python'],
            rating: 4.8,
            email: 'sarah.j@email.com',
            phone: '+1 (555) 123-4567',
            location: 'Boston, MA',
            availability: 'Available',
            matchScore: 95,
            lastActive: '2 hours ago'
          },
          {
            id: 2,
            name: 'Michael Chen',
            title: 'Software Engineer',
            university: 'Stanford University',
            experience: '2 years',
            skills: ['Java', 'Spring', 'AWS'],
            rating: 4.7,
            email: 'michael.c@email.com',
            phone: '+1 (555) 234-5678',
            location: 'Palo Alto, CA',
            availability: 'Available',
            matchScore: 92,
            lastActive: '1 day ago'
          },
          {
            id: 3,
            name: 'Emily Rodriguez',
            title: 'Product Designer',
            university: 'UC Berkeley',
            experience: '4 years',
            skills: ['Figma', 'UI/UX', 'Prototyping'],
            rating: 4.9,
            email: 'emily.r@email.com',
            phone: '+1 (555) 345-6789',
            location: 'San Francisco, CA',
            availability: 'Open to opportunities',
            matchScore: 89,
            lastActive: '3 hours ago'
          }
        ],
        pipelineUpdates: [
          {
            id: 1,
            candidate: 'Alex Thompson',
            job: 'Frontend Developer',
            stage: 'Interview Scheduled',
            date: '2024-01-20',
            type: 'progress',
            priority: 'high'
          },
          {
            id: 2,
            candidate: 'Jessica Park',
            job: 'UX Designer',
            stage: 'Offer Extended',
            date: '2024-01-19',
            type: 'success',
            priority: 'high'
          },
          {
            id: 3,
            candidate: 'David Wilson',
            job: 'Backend Engineer',
            stage: 'Technical Assessment',
            date: '2024-01-18',
            type: 'progress',
            priority: 'medium'
          }
        ],
        upcomingInterviews: [
          {
            id: 1,
            candidate: 'Sarah Johnson',
            position: 'Senior Developer',
            time: '10:00 AM',
            type: 'Technical',
            duration: '60 min'
          },
          {
            id: 2,
            candidate: 'Michael Chen',
            position: 'Product Manager',
            time: '2:00 PM',
            type: 'Behavioral',
            duration: '45 min'
          }
        ],
        recentActivity: [
          {
            id: 1,
            action: 'New application received',
            details: 'Sarah Johnson applied for Senior Developer',
            time: '5 min ago',
            type: 'application'
          },
          {
            id: 2,
            action: 'Interview completed',
            details: 'Technical interview with Alex Thompson',
            time: '2 hours ago',
            type: 'interview'
          },
          {
            id: 3,
            action: 'Job posting viewed',
            details: 'Product Manager role viewed 12 times',
            time: '4 hours ago',
            type: 'view'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [selectedTimeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading your dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Gathering latest recruitment data</p>
        </div>
      </div>
    );
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navbar */}
      <RecruiterNavbar />

      <div className="flex pt-16">
        {/* Enhanced Sidebar */}
        <RecruiterSidebar pendingApplicationsCount={dashboardData.stats.pendingApplications} />

        {/* Main Content */}
        <div className="flex-1 ml-72 pl-6">
          {/* Enhanced Header */}
          <div className="bg-white shadow-sm border-b px-8 py-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'Recruiter'}! 👋</h1>
                <p className="text-gray-600 mt-1">Here's your recruitment overview for today</p>
                <div className="flex items-center space-x-4 mt-3">
                  <span className="text-sm text-gray-500">Last updated: just now</span>
                  <span className="text-sm text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    All systems operational
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <select 
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
                  <MdAutoAwesome />
                  <span>AI Insights</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <MdWork className="text-orange-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.activeJobs}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <MdTrendingUp className="mr-1" />
                        +2 this week
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <MdPeople className="text-blue-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.totalCandidates}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <MdTrendingUp className="mr-1" />
                        +23 this week
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <MdTimeline className="text-purple-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.pendingApplications}</p>
                      <p className="text-xs text-orange-600 flex items-center mt-1">
                        <MdWarning className="mr-1" />
                        Needs attention
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <MdCheckCircle className="text-green-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Hires This Month</p>
                      <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.hiresThisMonth}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <MdTrendingUp className="mr-1" />
                        Goal: 10/month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <MdCalendarToday className="text-blue-500 text-lg" />
                  <div>
                    <p className="text-sm text-gray-600">Interviews Today</p>
                    <p className="text-xl font-bold text-gray-900">{dashboardData.stats.interviewsToday}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <MdSpeed className="text-green-500 text-lg" />
                  <div>
                    <p className="text-sm text-gray-600">Response Rate</p>
                    <p className="text-xl font-bold text-gray-900">{dashboardData.stats.responseRate}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <MdAccessTime className="text-purple-500 text-lg" />
                  <div>
                    <p className="text-sm text-gray-600">Avg. Time to Hire</p>
                    <p className="text-xl font-bold text-gray-900">{dashboardData.stats.avgTimeToHire} days</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <MdAttachMoney className="text-orange-500 text-lg" />
                  <div>
                    <p className="text-sm text-gray-600">Cost per Hire</p>
                    <p className="text-xl font-bold text-gray-900">${dashboardData.stats.costPerHire}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Job Postings - Takes 2 columns */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Recent Job Postings</h3>
                  <button 
                    onClick={() => navigate('/recruiters/jobs')}
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center"
                  >
                    View All <MdArrowForward className="ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {dashboardData.recentJobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-all cursor-pointer group"
                         onClick={() => navigate(`/recruiters/jobs/${job.id}`)}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{job.title}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full border ${getUrgencyColor(job.urgency)}`}>
                              {job.urgency} priority
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <MdLocationOn className="mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <MdAccessTime className="mr-1" />
                              {job.type}
                            </span>
                            <span>{job.views} views</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-orange-600">{job.applications}</span>
                          <p className="text-xs text-gray-500">applications</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Today's Schedule</h3>
                  <MdCalendarToday className="text-orange-600" />
                </div>
                <div className="space-y-4">
                  {dashboardData.upcomingInterviews.map((interview) => (
                    <div key={interview.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{interview.candidate}</h4>
                          <p className="text-sm text-gray-600">{interview.position}</p>
                          <p className="text-xs text-gray-500 mt-1">{interview.type} • {interview.duration}</p>
                        </div>
                        <span className="text-sm font-medium text-orange-600">{interview.time}</span>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-2 text-sm text-orange-600 hover:text-orange-700 font-medium">
                    View full calendar
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top AI-Matched Candidates */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <MdAutoAwesome className="text-purple-600 mr-2" />
                    AI-Matched Candidates
                  </h3>
                  <button 
                    onClick={() => navigate('/recruiters/matching')}
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center"
                  >
                    View All <MdArrowForward className="ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {dashboardData.topCandidates.map((candidate) => (
                    <div key={candidate.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors cursor-pointer"
                         onClick={() => navigate(`/recruiters/candidates/${candidate.id}`)}>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-medium">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${getMatchScoreColor(candidate.matchScore)}`}>
                              {candidate.matchScore}% match
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{candidate.title}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                            <span className="flex items-center">
                              <MdSchool className="mr-1" />
                              {candidate.university}
                            </span>
                            <span className="flex items-center">
                              <MdBusiness className="mr-1" />
                              {candidate.experience}
                            </span>
                            <span className="flex items-center">
                              <MdStar className="mr-1 text-yellow-400" />
                              {candidate.rating}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Last active: {candidate.lastActive}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity & Pipeline Updates */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                  <button 
                    onClick={() => navigate('/recruiters/pipeline')}
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center"
                  >
                    View Pipeline <MdArrowForward className="ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        activity.type === 'application' ? 'bg-blue-500' : 
                        activity.type === 'interview' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => navigate('/recruiters/jobs/post')}
                  className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-xl transition-colors duration-200 text-center group"
                >
                  <MdWork className="text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold mb-1">Post New Job</h4>
                  <p className="text-sm opacity-90">Create and publish job listings</p>
                </button>

                <button 
                  onClick={() => navigate('/recruiters/talent-search')}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition-colors duration-200 text-center group"
                >
                  <MdPeople className="text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold mb-1">Search Talent</h4>
                  <p className="text-sm opacity-90">Find qualified candidates</p>
                </button>

                <button 
                  onClick={() => navigate('/recruiters/matching')}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl transition-colors duration-200 text-center group"
                >
                  <MdAutoAwesome className="text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold mb-1">AI Matching</h4>
                  <p className="text-sm opacity-90">Get candidate recommendations</p>
                </button>

                <button 
                  onClick={() => navigate('/recruiters/analytics')}
                  className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl transition-colors duration-200 text-center group"
                >
                  <MdTrendingUp className="text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold mb-1">View Analytics</h4>
                  <p className="text-sm opacity-90">Track your performance</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;