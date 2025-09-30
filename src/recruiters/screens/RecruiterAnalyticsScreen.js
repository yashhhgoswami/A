import React, { useState, useEffect } from 'react';
import RecruiterNavbar from '../components/RecruiterNavbar';
import RecruiterSidebar from '../components/RecruiterSidebar';
import { 
  MdTrendingUp,
  MdTrendingDown,
  MdPeople,
  MdWork,
  MdAccessTime,
  MdAttachMoney,
  MdBusinessCenter,
  MdCalendarToday
} from 'react-icons/md';

const RecruiterAnalyticsScreen = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const overviewStats = [
    {
      title: 'Total Applications',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: MdPeople,
      color: 'orange'
    },
    {
      title: 'Jobs Posted',
      value: '34',
      change: '+8.2%',
      trend: 'up',
      icon: MdWork,
      color: 'blue'
    },
    {
      title: 'Avg. Time to Hire',
      value: '18 days',
      change: '-3.2%',
      trend: 'down',
      icon: MdAccessTime,
      color: 'green'
    },
    {
      title: 'Cost per Hire',
      value: '$2,450',
      change: '-5.8%',
      trend: 'down',
      icon: MdAttachMoney,
      color: 'purple'
    }
  ];

  const topPerformingJobs = [
    { title: 'Senior React Developer', applications: 156, filled: true },
    { title: 'Product Manager', applications: 142, filled: false },
    { title: 'UX Designer', applications: 89, filled: true },
    { title: 'Data Analyst', applications: 76, filled: false },
    { title: 'DevOps Engineer', applications: 67, filled: false }
  ];

  const candidateSourceData = [
    { source: 'LinkedIn', percentage: 42, count: 1197 },
    { source: 'Company Website', percentage: 28, count: 797 },
    { source: 'Referrals', percentage: 18, count: 512 },
    { source: 'Job Boards', percentage: 8, count: 228 },
    { source: 'Social Media', percentage: 4, count: 113 }
  ];

  const hiringFunnelData = [
    { stage: 'Applications', count: 2847, percentage: 100 },
    { stage: 'Screening', count: 853, percentage: 30 },
    { stage: 'Phone Interview', count: 341, percentage: 12 },
    { stage: 'Technical Interview', count: 170, percentage: 6 },
    { stage: 'Final Interview', count: 85, percentage: 3 },
    { stage: 'Offer', count: 34, percentage: 1.2 },
    { stage: 'Hired', count: 28, percentage: 1 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <RecruiterNavbar />
        <RecruiterSidebar />
        <div className="ml-72 pt-16">
          <div className="p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white p-6 rounded-xl h-32"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />
      <RecruiterSidebar />
      
      <div className="ml-72 pt-16">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your recruitment performance and insights</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Export Report
              </button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {overviewStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                      <Icon className={`text-${stat.color}-600 text-xl`} />
                    </div>
                    <div className={`flex items-center text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? <MdTrendingUp className="mr-1" /> : <MdTrendingDown className="mr-1" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Hiring Funnel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Hiring Funnel</h3>
              <div className="space-y-4">
                {hiringFunnelData.map((stage, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24 text-sm text-gray-600">{stage.stage}</div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${stage.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-sm text-gray-900 font-medium">{stage.count}</div>
                    <div className="w-12 text-xs text-gray-500">{stage.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Sources */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Candidate Sources</h3>
              <div className="space-y-4">
                {candidateSourceData.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-900">{source.source}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-gray-600">{source.count}</div>
                      <div className="text-sm font-medium text-gray-900">{source.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Performing Jobs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Jobs</h3>
              <div className="space-y-4">
                {topPerformingJobs.map((job, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <MdWork className="text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-600">{job.applications} applications</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.filled 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {job.filled ? 'Filled' : 'Active'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MdPeople className="text-blue-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <strong>Sarah Johnson</strong> applied for Senior React Developer
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MdWork className="text-green-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Job posting for <strong>UX Designer</strong> was filled
                    </p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MdCalendarToday className="text-orange-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Interview scheduled with <strong>Mike Chen</strong>
                    </p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MdBusinessCenter className="text-purple-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      New job posting <strong>Data Analyst</strong> went live
                    </p>
                    <p className="text-xs text-gray-500">2 days ago</p>
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

export default RecruiterAnalyticsScreen;