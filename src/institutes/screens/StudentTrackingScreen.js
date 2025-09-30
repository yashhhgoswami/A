import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstituteNavbar from '../components/InstituteNavbar';
import InstituteSidebar from '../components/InstituteSidebar';
import { 
  MdTimeline,
  MdGroup,
  MdBusiness,
  MdTrendingUp,
  MdTrendingDown,
  MdArrowForward,
  MdFilterList,
  MdDownload,
  MdRefresh,
  MdSchool,
  MdWork,
  MdEvent,
  MdPeople,
  MdAttachMoney,
  MdAnalytics
} from 'react-icons/md';

const StudentTrackingScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('semester');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState('all');

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const pipelineStages = [
    {
      stage: 'Total Students',
      count: 4567,
      percentage: 100,
      change: '+8.2%',
      trend: 'up',
      description: 'All enrolled students'
    },
    {
      stage: 'Eligible for Placement',
      count: 1234,
      percentage: 27,
      change: '+5.1%',
      trend: 'up',
      description: 'Final year students'
    },
    {
      stage: 'Registered for Placement',
      count: 1156,
      percentage: 25.3,
      change: '+12.4%',
      trend: 'up',
      description: 'Actively seeking placement'
    },
    {
      stage: 'Appeared in Interviews',
      count: 892,
      percentage: 19.5,
      change: '+15.2%',
      trend: 'up',
      description: 'At least one interview'
    },
    {
      stage: 'Received Offers',
      count: 634,
      percentage: 13.9,
      change: '+18.7%',
      trend: 'up',
      description: 'Got job offers'
    },
    {
      stage: 'Accepted Offers',
      count: 567,
      percentage: 12.4,
      change: '+22.1%',
      trend: 'up',
      description: 'Finalized placements'
    },
    {
      stage: 'Higher Studies',
      count: 234,
      percentage: 5.1,
      change: '+8.9%',
      trend: 'up',
      description: 'Pursuing further education'
    }
  ];

  const departmentData = [
    {
      department: 'Computer Science',
      totalStudents: 450,
      placementRate: 98.2,
      avgPackage: 12.5,
      topPackage: 45.0,
      companiesVisited: 45
    },
    {
      department: 'Electronics & Communication',
      totalStudents: 320,
      placementRate: 92.1,
      avgPackage: 9.2,
      topPackage: 32.0,
      companiesVisited: 38
    },
    {
      department: 'Mechanical Engineering',
      totalStudents: 280,
      placementRate: 88.4,
      avgPackage: 7.8,
      topPackage: 25.0,
      companiesVisited: 32
    },
    {
      department: 'Electrical Engineering',
      totalStudents: 250,
      placementRate: 85.6,
      avgPackage: 7.5,
      topPackage: 22.0,
      companiesVisited: 28
    },
    {
      department: 'Civil Engineering',
      totalStudents: 200,
      placementRate: 82.3,
      avgPackage: 6.8,
      topPackage: 18.0,
      companiesVisited: 25
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'placement',
      title: 'TechCorp Placement Drive',
      description: '45 students selected out of 120 applicants',
      timestamp: '2 hours ago',
      impact: 'high',
      details: { selected: 45, applied: 120, avgPackage: '₹15.2L' }
    },
    {
      id: 2,
      type: 'application',
      title: 'Microsoft Applications',
      description: '89 students applied for SDE positions',
      timestamp: '5 hours ago',
      impact: 'medium',
      details: { applied: 89, positions: 12, cutoff: '8.5 CGPA' }
    },
    {
      id: 3,
      type: 'interview',
      title: 'Google Interview Results',
      description: '12 students cleared technical rounds',
      timestamp: '1 day ago',
      impact: 'high',
      details: { cleared: 12, total: 25, nextRound: 'Final' }
    },
    {
      id: 4,
      type: 'offer',
      title: 'Amazon Offer Letters',
      description: '8 students received offer letters',
      timestamp: '2 days ago',
      impact: 'high',
      details: { offers: 8, avgPackage: '₹28.5L', joiningDate: 'July 2024' }
    }
  ];

  const studentProgress = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rollNumber: 'CS21B001',
      department: 'Computer Science',
      cgpa: 9.2,
      currentStage: 'Interview Scheduled',
      company: 'Microsoft',
      progress: 75,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rollNumber: 'ECE21B045',
      department: 'Electronics',
      cgpa: 8.8,
      currentStage: 'Offer Received',
      company: 'Intel',
      progress: 90,
      lastActivity: '5 hours ago'
    },
    {
      id: 3,
      name: 'Amit Singh',
      rollNumber: 'ME21B078',
      department: 'Mechanical',
      cgpa: 8.4,
      currentStage: 'Application Submitted',
      company: 'Tata Motors',
      progress: 30,
      lastActivity: '1 day ago'
    },
    {
      id: 4,
      name: 'Sneha Patel',
      rollNumber: 'CS21B156',
      department: 'Computer Science',
      cgpa: 9.5,
      currentStage: 'Offer Accepted',
      company: 'Google',
      progress: 100,
      lastActivity: '3 days ago'
    }
  ];

  const getStageColor = (index) => {
    const colors = [
      'bg-blue-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-emerald-500',
      'bg-orange-500',
      'bg-red-500'
    ];
    return colors[index % colors.length];
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <InstituteNavbar />
        <InstituteSidebar />
        <div className="ml-64 pt-16">
          <div className="p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
      
      <div className="flex pt-16">
        <InstituteSidebar />
        
        <div className="flex-1 ml-64">
          {/* Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <MdTimeline className="text-emerald-600 mr-2" />
                  Student Tracking Pipeline
                </h1>
                <p className="text-gray-600">Track student progress through placement pipeline</p>
              </div>
              <div className="flex space-x-3">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Departments</option>
                  <option value="cse">Computer Science</option>
                  <option value="ece">Electronics</option>
                  <option value="me">Mechanical</option>
                  <option value="ee">Electrical</option>
                </select>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="semester">This Semester</option>
                  <option value="year">Academic Year</option>
                  <option value="quarter">This Quarter</option>
                </select>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                  <MdDownload />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Pipeline Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Placement Pipeline Overview</h3>
              <div className="space-y-4">
                {pipelineStages.map((stage, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24 text-sm font-medium text-gray-700">{stage.stage}</div>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{stage.description}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{stage.count}</span>
                          <span className={`text-xs flex items-center ${
                            stage.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stage.trend === 'up' ? <MdTrendingUp className="mr-1" /> : <MdTrendingDown className="mr-1" />}
                            {stage.change}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${getStageColor(index)}`}
                          style={{ width: `${stage.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">{stage.percentage}% of total</span>
                        <span className="text-xs text-gray-500">{stage.count} students</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Department-wise Performance</h3>
                <div className="space-y-4">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{dept.department}</h4>
                        <span className="text-sm text-emerald-600 font-medium">{dept.placementRate}%</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Students:</span>
                          <p className="font-medium">{dept.totalStudents}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Avg Package:</span>
                          <p className="font-medium">₹{dept.avgPackage}L</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Companies:</span>
                          <p className="font-medium">{dept.companiesVisited}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${dept.placementRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Pipeline Activities</h3>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center">
                    View All <MdArrowForward className="ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'placement' ? 'bg-emerald-100' :
                        activity.type === 'application' ? 'bg-blue-100' :
                        activity.type === 'interview' ? 'bg-purple-100' : 'bg-orange-100'
                      }`}>
                        {activity.type === 'placement' && <MdWork className="text-emerald-600 text-sm" />}
                        {activity.type === 'application' && <MdSchool className="text-blue-600 text-sm" />}
                        {activity.type === 'interview' && <MdPeople className="text-purple-600 text-sm" />}
                        {activity.type === 'offer' && <MdAttachMoney className="text-orange-600 text-sm" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                        <p className="text-gray-600 text-xs mt-1">{activity.description}</p>
                        <p className="text-gray-400 text-xs mt-1">{activity.timestamp}</p>
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
            </div>

            {/* Individual Student Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Individual Student Progress</h3>
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <MdFilterList className="mr-1" />
                    Filter
                  </button>
                  <button
                    onClick={() => navigate('/institute/students')}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center"
                  >
                    View All Students <MdArrowForward className="ml-1" />
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CGPA</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stage</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {studentProgress.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.rollNumber}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">{student.department}</td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            {student.cgpa}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">{student.currentStage}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{student.company}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="flex-1 mr-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(student.progress)}`}
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-600">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">{student.lastActivity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">Showing 4 of 1,234 students</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTrackingScreen;