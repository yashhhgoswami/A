import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StudentNavbar from '../components/StudentNavbar';
import StudentSidebar from '../components/StudentSidebar';
import { getAllMentors, getActiveMentorships, getStudentMentorshipRequests } from '../services/mentorshipService';
import { getRecommendedJobs, getStudentApplications } from '../services/jobService';
import { getAllEvents } from '../../services/eventService';
import { 
  MdTrendingUp,
  MdAccessTime,
  MdLocationOn,
  MdArrowForward,
  MdPeople,
  MdWork,
  MdEvent
} from 'react-icons/md';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    mentors: [],
    activeMentorships: [],
    pendingRequests: [],
    recommendedJobs: [],
    applications: [],
    upcomingEvents: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          mentorsResult,
          mentorshipsResult,
          requestsResult,
          jobsResult,
          applicationsResult,
          eventsResult
        ] = await Promise.all([
          getAllMentors(),
          getActiveMentorships(user?.id || 1),
          getStudentMentorshipRequests(user?.id || 1),
          getRecommendedJobs(user?.id || 1, ['JavaScript', 'Python', 'React']),
          getStudentApplications(user?.id || 1),
          getAllEvents()
        ]);

        setDashboardData({
          mentors: mentorsResult.mentors,
          activeMentorships: mentorshipsResult.mentorships,
          pendingRequests: requestsResult.requests.filter(r => r.status === 'pending'),
          recommendedJobs: jobsResult.jobs.slice(0, 4),
          applications: applicationsResult.applications,
          upcomingEvents: eventsResult.events.filter(e => new Date(e.date) >= new Date()).slice(0, 4)
        });
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
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
      <StudentNavbar />

      <div className="flex pt-16">
        {/* Sidebar */}
        <StudentSidebar pendingRequestsCount={dashboardData.pendingRequests.length} />

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Page Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name || 'Student'}! Here's your overview.</p>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MdPeople className="text-blue-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Mentorships</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.activeMentorships.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <MdWork className="text-green-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Job Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.applications.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MdEvent className="text-purple-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.upcomingEvents.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <MdTrendingUp className="text-orange-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Available Mentors</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.mentors.filter(m => m.status === 'available').length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Job Recommendations */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recommended Jobs</h3>
                  <button 
                    onClick={() => navigate('/student/jobs')}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                  >
                    View All <MdArrowForward className="ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {dashboardData.recommendedJobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
                         onClick={() => navigate(`/student/jobs/${job.id}`)}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{job.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          job.type === 'internship' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {job.type}
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
                          {job.type === 'internship' ? job.duration : 'Full-time'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Mentorships */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Your Mentorships</h3>
                  <button 
                    onClick={() => navigate('/student/mentorship')}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                  >
                    View All <MdArrowForward className="ml-1" />
                  </button>
                </div>
                {dashboardData.activeMentorships.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.activeMentorships.map((mentorship) => (
                      <div key={mentorship.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-700">
                              {mentorship.mentor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{mentorship.mentor.name}</p>
                            <p className="text-sm text-gray-600">{mentorship.mentor.title}</p>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{mentorship.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${mentorship.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">Next session: {mentorship.nextSession}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MdPeople className="mx-auto text-4xl text-gray-300 mb-2" />
                    <p className="text-gray-500">No active mentorships</p>
                    <button 
                      onClick={() => navigate('/student/mentorship')}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Find a mentor
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                <button 
                  onClick={() => navigate('/student/events')}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                >
                  View All <MdArrowForward className="ml-1" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardData.upcomingEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
                       onClick={() => navigate(`/student/events/${event.id}`)}>
                    <h4 className="font-medium text-gray-900 mb-2">{event.title}</h4>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center">
                        <MdAccessTime className="mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MdLocationOn className="mr-1" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;