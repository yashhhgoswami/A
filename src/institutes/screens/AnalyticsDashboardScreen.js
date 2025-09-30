import React, { useState, useEffect, useCallback } from 'react';
import InstituteNavbar from '../components/InstituteNavbar';
import InstituteSidebar from '../components/InstituteSidebar';
import StatsCard from '../components/StatsCard';
import { 
  MdTrendingUp,
  MdPeople,
  MdWork,
  MdEvent,
  MdSchool,
  MdBusiness,
  MdFileDownload
} from 'react-icons/md';
import { 
  getOverviewAnalytics,
  getAlumniTrends,
  getPlacementTrends,
  getTopRecruiters,
  getDepartmentStats,
  getEventEngagement,
  generateAnalyticsReport
} from '../services/analyticsService';

const AnalyticsDashboardScreen = () => {
  const [overview, setOverview] = useState({});
  const [alumniTrends, setAlumniTrends] = useState([]);
  const [placementTrends, setPlacementTrends] = useState([]);
  const [topRecruiters, setTopRecruiters] = useState([]);
  const [departmentStats, setDepartmentStats] = useState([]);
  const [eventEngagement, setEventEngagement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('5years');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const [
        overviewResult,
        alumniTrendsResult,
        placementTrendsResult,
        recruitersResult,
        departmentResult,
        eventResult
      ] = await Promise.all([
        getOverviewAnalytics(),
        getAlumniTrends(timeRange),
        getPlacementTrends(timeRange),
        getTopRecruiters(),
        getDepartmentStats(),
        getEventEngagement()
      ]);

      setOverview(overviewResult.data);
      setAlumniTrends(alumniTrendsResult.data);
      setPlacementTrends(placementTrendsResult.data);
      setTopRecruiters(recruitersResult.data);
      setDepartmentStats(departmentResult.data);
      setEventEngagement(eventResult.data);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async (reportType) => {
    try {
      const result = await generateAnalyticsReport(reportType);
      alert(`Report generated: ${result.message}`);
    } catch (err) {
      console.error('Report generation error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <InstituteNavbar />
      
      <div className="flex pt-16">
        <InstituteSidebar />
        
        <div className="flex-1 ml-64">
          {/* Page Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600">Comprehensive insights and data analytics for your institution</p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="1year">Last Year</option>
                  <option value="3years">Last 3 Years</option>
                  <option value="5years">Last 5 Years</option>
                </select>
                <button
                  onClick={() => handleGenerateReport('comprehensive')}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                >
                  <MdFileDownload />
                  <span>Export Report</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Alumni"
                value={overview.totalAlumni?.toLocaleString() || '15,000'}
                icon={MdPeople}
                color="emerald"
                trend="up"
                trendValue="+5.2%"
              />
              
              <StatsCard
                title="Active Students"
                value={overview.totalStudents?.toLocaleString() || '4,500'}
                icon={MdSchool}
                color="blue"
                trend="up"
                trendValue="+8.1%"
              />
              
              <StatsCard
                title="Placement Rate"
                value={`${overview.placementRate || 92.5}%`}
                icon={MdWork}
                color="purple"
                trend="up"
                trendValue="+2.3%"
              />
              
              <StatsCard
                title="Events This Year"
                value={overview.eventsThisYear || 24}
                icon={MdEvent}
                color="orange"
                trend="up"
                trendValue="+12%"
              />
            </div>

            {/* Alumni Trends Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alumni Growth Trends</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <MdTrendingUp className="mx-auto text-4xl text-emerald-600 mb-2" />
                  <p className="text-gray-600">Alumni growth trending upward</p>
                  <div className="mt-4 grid grid-cols-5 gap-4 text-sm">
                    {alumniTrends.map((trend, index) => (
                      <div key={index} className="text-center">
                        <div className="font-semibold text-gray-900">{trend.year}</div>
                        <div className="text-emerald-600">{trend.total.toLocaleString()}</div>
                        <div className="text-gray-500 text-xs">Total</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Placement Trends & Top Recruiters */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Placement Trends */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Placement Trends</h3>
                <div className="space-y-4">
                  {placementTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{trend.year}</div>
                        <div className="text-sm text-gray-600">{trend.placed}/{trend.total} students</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-purple-600">{trend.rate}%</div>
                        <div className="text-sm text-gray-500">₹{(trend.avgPackage / 100000).toFixed(1)}L avg</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Recruiters */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Recruiters</h3>
                <div className="space-y-3">
                  {topRecruiters.slice(0, 6).map((recruiter, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <MdBusiness className="text-blue-600 text-sm" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{recruiter.company}</div>
                          <div className="text-sm text-gray-600">{recruiter.hires} hires</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-emerald-600">
                          ₹{(recruiter.avgPackage / 100000).toFixed(1)}L
                        </div>
                        <div className="text-sm text-gray-500">avg package</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Department Statistics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{dept.department}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Students</span>
                        <span className="font-medium">{dept.students.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Alumni</span>
                        <span className="font-medium">{dept.alumni.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Placement Rate</span>
                        <span className="font-medium text-emerald-600">{dept.placementRate}%</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full" 
                          style={{ width: `${dept.placementRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Engagement */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Engagement (2025)</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
                {eventEngagement.map((event, index) => (
                  <div key={index} className="text-center">
                    <div className="font-semibold text-gray-900">{event.month}</div>
                    <div className="text-emerald-600 font-medium">{event.events}</div>
                    <div className="text-sm text-gray-500">events</div>
                    <div className="text-blue-600 font-medium">{event.attendance}</div>
                    <div className="text-sm text-gray-500">attendees</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
                <h4 className="text-lg font-semibold mb-2">Alumni Engagement</h4>
                <p className="text-emerald-100 text-sm mb-3">Strong alumni network with high engagement rates</p>
                <div className="text-2xl font-bold">85%</div>
                <div className="text-emerald-200 text-sm">Active participation</div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <h4 className="text-lg font-semibold mb-2">Student Success</h4>
                <p className="text-blue-100 text-sm mb-3">Excellent placement outcomes and career growth</p>
                <div className="text-2xl font-bold">92.5%</div>
                <div className="text-blue-200 text-sm">Placement rate</div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <h4 className="text-lg font-semibold mb-2">Industry Connect</h4>
                <p className="text-purple-100 text-sm mb-3">Strong partnerships with leading companies</p>
                <div className="text-2xl font-bold">45+</div>
                <div className="text-purple-200 text-sm">Partner companies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboardScreen;