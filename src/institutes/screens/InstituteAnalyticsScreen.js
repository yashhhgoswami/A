import React, { useState, useEffect } from 'react';
import InstituteNavbar from '../components/InstituteNavbar';
import InstituteSidebar from '../components/InstituteSidebar';
import { 
  MdTrendingUp,
  MdTrendingDown,
  MdPeople,
  MdWork,
  MdSchool,
  MdBusinessCenter,
  MdEventNote,
  MdAttachMoney,
  MdCalendarToday,
  MdLocationOn
} from 'react-icons/md';

const InstituteAnalyticsScreen = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const overviewStats = [
    {
      title: 'Total Students',
      value: '4,567',
      change: '+8.2%',
      trend: 'up',
      icon: MdSchool,
      color: 'emerald'
    },
    {
      title: 'Alumni Network',
      value: '15,234',
      change: '+5.1%',
      trend: 'up',
      icon: MdPeople,
      color: 'blue'
    },
    {
      title: 'Placement Rate',
      value: '92.5%',
      change: '+2.3%',
      trend: 'up',
      icon: MdWork,
      color: 'green'
    },
    {
      title: 'Average Package',
      value: '₹8.5L',
      change: '+12.4%',
      trend: 'up',
      icon: MdAttachMoney,
      color: 'purple'
    }
  ];

  const departmentPerformance = [
    { department: 'Computer Science', placementRate: 98, avgPackage: '₹12.5L', students: 450 },
    { department: 'Electronics & Communication', placementRate: 92, avgPackage: '₹9.2L', students: 320 },
    { department: 'Mechanical Engineering', placementRate: 88, avgPackage: '₹7.8L', students: 280 },
    { department: 'Electrical Engineering', placementRate: 85, avgPackage: '₹7.5L', students: 250 },
    { department: 'Civil Engineering', placementRate: 82, avgPackage: '₹6.8L', students: 200 }
  ];

  const topCompanies = [
    { name: 'TechCorp Solutions', hires: 45, avgPackage: '₹18.5L', type: 'Product' },
    { name: 'Innovation Labs', hires: 32, avgPackage: '₹15.2L', type: 'R&D' },
    { name: 'Global Systems', hires: 28, avgPackage: '₹12.8L', type: 'Service' },
    { name: 'StartupXYZ', hires: 15, avgPackage: '₹22.3L', type: 'Startup' },
    { name: 'Manufacturing Corp', hires: 25, avgPackage: '₹8.9L', type: 'Manufacturing' }
  ];

  const placementTrends = [
    { year: '2020', placementRate: 78, avgPackage: 6.2 },
    { year: '2021', placementRate: 82, avgPackage: 6.8 },
    { year: '2022', placementRate: 87, avgPackage: 7.5 },
    { year: '2023', placementRate: 90, avgPackage: 8.1 },
    { year: '2024', placementRate: 92.5, avgPackage: 8.5 }
  ];

  const alumniEngagement = [
    { activity: 'Mentorship Programs', participants: 156, engagement: 'High' },
    { activity: 'Guest Lectures', participants: 89, engagement: 'Medium' },
    { activity: 'Internship Referrals', participants: 234, engagement: 'High' },
    { activity: 'Donations', participants: 45, engagement: 'Medium' },
    { activity: 'Industry Connections', participants: 178, engagement: 'High' }
  ];

  const upcomingEvents = [
    { title: 'Annual Alumni Meet', date: '2024-03-15', type: 'Alumni', participants: 500 },
    { title: 'Tech Symposium 2024', date: '2024-03-20', type: 'Academic', participants: 800 },
    { title: 'Placement Drive - Microsoft', date: '2024-03-25', type: 'Placement', participants: 150 },
    { title: 'Industry Connect', date: '2024-04-02', type: 'Industry', participants: 300 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <InstituteNavbar />
        <InstituteSidebar />
        <div className="ml-64 pt-16">
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
      <InstituteNavbar />
      <InstituteSidebar />
      
      <div className="ml-64 pt-16">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Institute Analytics</h1>
              <p className="text-gray-600 mt-1">Comprehensive insights into institute performance</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
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
            {/* Department Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Performance</h3>
              <div className="space-y-4">
                {departmentPerformance.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                        <MdSchool className="text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{dept.department}</div>
                        <div className="text-sm text-gray-600">{dept.students} students</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-emerald-600">{dept.placementRate}%</div>
                      <div className="text-xs text-gray-500">{dept.avgPackage}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Placement Trends */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">5-Year Placement Trends</h3>
              <div className="space-y-4">
                {placementTrends.map((trend, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-16 text-sm text-gray-600">{trend.year}</div>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Placement Rate</span>
                        <span className="text-xs font-medium">{trend.placementRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${trend.placementRate}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">Avg Package</span>
                        <span className="text-xs font-medium">₹{trend.avgPackage}L</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Recruiting Companies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Recruiting Companies</h3>
              <div className="space-y-4">
                {topCompanies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <MdBusinessCenter className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-600">{company.hires} hires • {company.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-emerald-600">{company.avgPackage}</div>
                      <div className="text-xs text-gray-500">Avg Package</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alumni Engagement */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Alumni Engagement</h3>
              <div className="space-y-4">
                {alumniEngagement.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <MdPeople className="text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{activity.activity}</div>
                        <div className="text-sm text-gray-600">{activity.participants} participants</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activity.engagement === 'High' 
                        ? 'bg-green-100 text-green-800' 
                        : activity.engagement === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {activity.engagement}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events & Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Events & Activities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                      <p className="text-gray-600 text-xs mt-1">{event.type}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      event.type === 'Placement' ? 'bg-emerald-100 text-emerald-800' :
                      event.type === 'Alumni' ? 'bg-blue-100 text-blue-800' :
                      event.type === 'Academic' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center">
                      <MdCalendarToday className="mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <MdPeople className="mr-1" />
                      {event.participants} expected
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteAnalyticsScreen;