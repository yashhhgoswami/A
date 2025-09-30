import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstituteNavbar from '../components/InstituteNavbar';
import InstituteSidebar from '../components/InstituteSidebar';
import StatsCard from '../components/StatsCard';
import { 
  MdPeople,
  MdEvent,
  MdAnalytics,
  MdWork,
  MdTrendingUp,
  MdSchool,
  MdBusinessCenter,
  MdCalendarToday,
  MdArrowForward,
  MdAccessTime
} from 'react-icons/md';
import { getOverviewAnalytics, getRecentActivities } from '../services/analyticsService';
import { getAllAlumni } from '../services/alumniManagementService';
import { getAllCompanies } from '../services/placementService';

const InstituteDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    overview: {},
    recentActivities: [],
    alumni: [],
    companies: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          overviewResult,
          activitiesResult,
          alumniResult,
          companiesResult
        ] = await Promise.all([
          getOverviewAnalytics(),
          getRecentActivities(5),
          getAllAlumni(),
          getAllCompanies()
        ]);

        setDashboardData({
          overview: overviewResult.data,
          recentActivities: activitiesResult.data,
          alumni: alumniResult.alumni.slice(0, 5),
          companies: companiesResult.companies.filter(c => c.status === 'Open').slice(0, 4)
        });
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <InstituteNavbar />

      <div className="flex pt-16">
        {/* Sidebar */}
        <InstituteSidebar 
          pendingApplicationsCount={15} 
          upcomingEventsCount={3} 
        />

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Page Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Institute Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your institution's overview and insights.</p>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 space-y-6">
            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Alumni"
                value={dashboardData.overview.totalAlumni?.toLocaleString() || '15,000'}
                icon={MdPeople}
                color="emerald"
                trend="up"
                trendValue="+5.2%"
                description="Since last year"
                onClick={() => navigate('/institute/alumni')}
              />
              
              <StatsCard
                title="Active Students"
                value={dashboardData.overview.totalStudents?.toLocaleString() || '4,500'}
                icon={MdSchool}
                color="blue"
                trend="up"
                trendValue="+8.1%"
                description="Current enrollment"
                onClick={() => navigate('/institute/students')}
              />
              
              <StatsCard
                title="Placement Rate"
                value={`${dashboardData.overview.placementRate || 92.5}%`}
                icon={MdWork}
                color="purple"
                trend="up"
                trendValue="+2.3%"
                description="This academic year"
                onClick={() => navigate('/institute/placement')}
              />
              
              <StatsCard
                title="Events This Year"
                value={dashboardData.overview.eventsThisYear || 24}
                icon={MdEvent}
                color="orange"
                trend="up"
                trendValue="+12%"
                description="Completed & upcoming"
                onClick={() => navigate('/institute/events')}
              />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Average Package"
                value={`₹${((dashboardData.overview.averagePackage || 850000) / 100000).toFixed(1)}L`}
                icon={MdBusinessCenter}
                color="emerald"
                trend="up"
                trendValue="+15%"
              />
              
              <StatsCard
                title="Top Package"
                value={`₹${((dashboardData.overview.topPackage || 5000000) / 100000).toFixed(0)}L`}
                icon={MdTrendingUp}
                color="blue"
                description="Highest this year"
              />
              
              <StatsCard
                title="Companies Visiting"
                value={dashboardData.companies.length + 15}
                icon={MdCalendarToday}
                color="purple"
                description="This semester"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                  <button 
                    onClick={() => navigate('/institute/analytics')}
                    className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center"
                  >
                    View All <MdArrowForward className="ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {dashboardData.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'placement' ? 'bg-emerald-100' :
                        activity.type === 'alumni' ? 'bg-blue-100' :
                        activity.type === 'event' ? 'bg-purple-100' : 'bg-orange-100'
                      }`}>
                        {activity.type === 'placement' && <MdWork className="text-emerald-600 text-sm" />}
                        {activity.type === 'alumni' && <MdPeople className="text-blue-600 text-sm" />}
                        {activity.type === 'event' && <MdEvent className="text-purple-600 text-sm" />}
                        {activity.type === 'donation' && <MdBusinessCenter className="text-orange-600 text-sm" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                        <p className="text-gray-600 text-xs mt-1">{activity.description}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activity.impact === 'high' ? 'bg-red-100 text-red-800' :
                        activity.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {activity.impact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Alumni */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Alumni Updates</h3>
                  <button 
                    onClick={() => navigate('/institute/alumni')}
                    className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center"
                  >
                    View All <MdArrowForward className="ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {dashboardData.alumni.map((alumni) => (
                    <div key={alumni.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                         onClick={() => navigate(`/institute/alumni/${alumni.id}`)}>
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-emerald-700">
                          {alumni.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{alumni.name}</p>
                        <p className="text-gray-600 text-xs">{alumni.currentPosition} at {alumni.company}</p>
                        <p className="text-gray-500 text-xs">Class of {alumni.graduationYear} • {alumni.major}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          alumni.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {alumni.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Company Visits */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Company Visits</h3>
                <button 
                  onClick={() => navigate('/institute/placement')}
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center"
                >
                  View All <MdArrowForward className="ml-1" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardData.companies.map((company) => (
                  <div key={company.id} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors cursor-pointer"
                       onClick={() => navigate(`/institute/placement/companies/${company.id}`)}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{company.name}</h4>
                        <p className="text-gray-600 text-xs">{company.industry}</p>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                        {company.type}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center">
                        <MdAccessTime className="mr-1" />
                        {new Date(company.visitDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MdWork className="mr-1" />
                        {company.totalPositions} positions
                      </div>
                      <div className="flex items-center">
                        <MdBusinessCenter className="mr-1" />
                        {company.packageRange}
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Registered</span>
                        <span className="font-medium text-emerald-600">{company.studentsRegistered}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate('/institute/placement/add-company')}
                  className="flex items-center space-x-3 p-4 border-2 border-dashed border-emerald-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors text-left"
                >
                  <MdWork className="text-emerald-600 text-xl" />
                  <div>
                    <p className="font-medium text-emerald-700">Add Company</p>
                    <p className="text-xs text-emerald-600">Post new placement drive</p>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate('/institute/events/create')}
                  className="flex items-center space-x-3 p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
                >
                  <MdEvent className="text-blue-600 text-xl" />
                  <div>
                    <p className="font-medium text-blue-700">Create Event</p>
                    <p className="text-xs text-blue-600">Organize new event</p>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate('/institute/analytics')}
                  className="flex items-center space-x-3 p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-left"
                >
                  <MdAnalytics className="text-purple-600 text-xl" />
                  <div>
                    <p className="font-medium text-purple-700">View Analytics</p>
                    <p className="text-xs text-purple-600">Detailed insights</p>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate('/institute/alumni/invite')}
                  className="flex items-center space-x-3 p-4 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors text-left"
                >
                  <MdPeople className="text-orange-600 text-xl" />
                  <div>
                    <p className="font-medium text-orange-700">Invite Alumni</p>
                    <p className="text-xs text-orange-600">Send invitations</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteDashboard;