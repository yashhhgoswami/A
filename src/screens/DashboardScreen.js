import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUpcomingEvents } from '../services/eventService';
import { getAllProfiles } from '../services/profileService';
import Navbar from '../components/Navbar';

const DashboardScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentAlumni, setRecentAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [eventsResult, profilesResult] = await Promise.all([
          getUpcomingEvents(3),
          getAllProfiles()
        ]);

        setUpcomingEvents(eventsResult.events);
        setRecentAlumni(profilesResult.profiles.slice(0, 4));
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <Navbar />
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg fixed h-full z-20 top-16">
          <div className="p-6">
            {/* Navigation menu without branding */}
          </div>

          <nav className="px-4 pb-4">
            <div className="space-y-2">
              <button
                className="flex items-center space-x-3 px-4 py-3 text-purple-700 bg-purple-50 rounded-lg font-medium w-full text-left"
              >
                <i className="fas fa-tachometer-alt text-lg"></i>
                <span>Dashboard</span>
              </button>

              <button
                onClick={(e) => { e.preventDefault(); navigate('/alumni'); }}
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors w-full text-left"
              >
                <i className="fas fa-users text-lg"></i>
                <span>Alumni Directory</span>
              </button>

              <button
                onClick={(e) => { e.preventDefault(); navigate('/events'); }}
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors w-full text-left"
              >
                <i className="fas fa-calendar-alt text-lg"></i>
                <span>Events</span>
              </button>

              <button
                onClick={(e) => { e.preventDefault(); navigate('/profile'); }}
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors w-full text-left"
              >
                <i className="fas fa-user text-lg"></i>
                <span>Profile</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Page Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name || 'Alumni'}</p>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <i className="fas fa-users text-blue-600 text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Alumni Members</p>
                    <p className="text-2xl font-bold text-gray-900">1,248</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <i className="fas fa-calendar-check text-green-600 text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                    <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <i className="fas fa-graduation-cap text-purple-600 text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Alumni Connected</p>
                    <p className="text-2xl font-bold text-gray-900">89</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Alumni */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Alumni</h3>
                  <button 
                    onClick={() => navigate('/alumni')}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentAlumni.map((alumni) => (
                    <div key={alumni.id} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-700">
                          {alumni.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{alumni.name}</p>
                        <p className="text-sm text-gray-600">{alumni.current_position}</p>
                      </div>
                      <span className="text-xs text-gray-500">Class of {alumni.graduation_year}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                  <button 
                    onClick={() => navigate('/events')}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border-l-4 border-purple-400 pl-4">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Completed Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Completed Events</h3>
                <button 
                  onClick={() => navigate('/events')}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Annual Alumni Meetup 2025</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Annual networking event bringing together alumni from all batches</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>September 15, 2025</span>
                    <span>145 attendees</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Career Guidance Workshop</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Workshop on career transitions and professional development</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>August 28, 2025</span>
                    <span>89 attendees</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Tech Innovation Summit</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Discussion on latest technology trends and innovations</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>July 20, 2025</span>
                    <span>67 attendees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;