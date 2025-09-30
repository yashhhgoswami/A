// Analytics Service for Institute Dashboard
const mockAnalyticsData = {
  overview: {
    totalAlumni: 15000,
    activeAlumni: 12500,
    totalStudents: 4500,
    placementRate: 92.5,
    averagePackage: 850000,
    topPackage: 5000000,
    totalEvents: 156,
    eventsThisYear: 24
  },
  alumniTrends: [
    { year: 2020, total: 13500, active: 11200, inactive: 2300 },
    { year: 2021, total: 14200, active: 11800, inactive: 2400 },
    { year: 2022, total: 14600, active: 12100, inactive: 2500 },
    { year: 2023, total: 14900, active: 12300, inactive: 2600 },
    { year: 2024, total: 15000, active: 12500, inactive: 2500 }
  ],
  placementTrends: [
    { year: 2020, placed: 850, total: 950, rate: 89.5, avgPackage: 750000 },
    { year: 2021, placed: 920, total: 1000, rate: 92.0, avgPackage: 780000 },
    { year: 2022, placed: 980, total: 1050, rate: 93.3, avgPackage: 810000 },
    { year: 2023, placed: 950, total: 1020, rate: 93.1, avgPackage: 820000 },
    { year: 2024, placed: 975, total: 1000, rate: 97.5, avgPackage: 850000 }
  ],
  topRecruiters: [
    { company: 'Google', hires: 45, avgPackage: 2800000 },
    { company: 'Microsoft', hires: 38, avgPackage: 2500000 },
    { company: 'Amazon', hires: 52, avgPackage: 2200000 },
    { company: 'TCS', hires: 120, avgPackage: 650000 },
    { company: 'Infosys', hires: 95, avgPackage: 700000 },
    { company: 'Wipro', hires: 78, avgPackage: 680000 },
    { company: 'Accenture', hires: 65, avgPackage: 750000 },
    { company: 'IBM', hires: 42, avgPackage: 850000 }
  ],
  departmentStats: [
    { department: 'Computer Science', students: 1200, alumni: 4500, placementRate: 96.5 },
    { department: 'Mechanical Engineering', students: 800, alumni: 3200, placementRate: 88.2 },
    { department: 'Electrical Engineering', students: 700, alumni: 2800, placementRate: 90.1 },
    { department: 'Civil Engineering', students: 600, alumni: 2400, placementRate: 85.5 },
    { department: 'Business Administration', students: 500, alumni: 1600, placementRate: 94.2 },
    { department: 'Data Science', students: 400, alumni: 800, placementRate: 98.1 },
    { department: 'Electronics', students: 300, alumni: 700, placementRate: 91.8 }
  ],
  eventEngagement: [
    { month: 'Jan', events: 3, attendance: 1250, alumniParticipation: 45 },
    { month: 'Feb', events: 2, attendance: 890, alumniParticipation: 32 },
    { month: 'Mar', events: 4, attendance: 1680, alumniParticipation: 67 },
    { month: 'Apr', events: 3, attendance: 1420, alumniParticipation: 52 },
    { month: 'May', events: 2, attendance: 980, alumniParticipation: 38 },
    { month: 'Jun', events: 1, attendance: 450, alumniParticipation: 15 },
    { month: 'Jul', events: 2, attendance: 780, alumniParticipation: 28 },
    { month: 'Aug', events: 3, attendance: 1320, alumniParticipation: 48 },
    { month: 'Sep', events: 4, attendance: 1590, alumniParticipation: 62 }
  ],
  recentActivities: [
    {
      id: 1,
      type: 'placement',
      title: 'New Placement Record',
      description: '25 students placed in top tech companies this week',
      timestamp: '2025-09-30T10:30:00Z',
      impact: 'high'
    },
    {
      id: 2,
      type: 'alumni',
      title: 'Alumni Mentorship Program',
      description: '15 new alumni joined as mentors',
      timestamp: '2025-09-29T15:45:00Z',
      impact: 'medium'
    },
    {
      id: 3,
      type: 'event',
      title: 'Tech Summit 2025',
      description: 'Successfully conducted with 1200+ attendees',
      timestamp: '2025-09-28T09:15:00Z',
      impact: 'high'
    },
    {
      id: 4,
      type: 'donation',
      title: 'Alumni Donation Drive',
      description: 'Raised ₹5.2 lakhs for scholarship fund',
      timestamp: '2025-09-27T16:20:00Z',
      impact: 'medium'
    }
  ]
};

export const getOverviewAnalytics = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      data: mockAnalyticsData.overview
    };
  } catch (error) {
    throw new Error('Failed to fetch overview analytics');
  }
};

export const getAlumniTrends = async (timeRange = '5years') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let data = mockAnalyticsData.alumniTrends;
    
    if (timeRange === '3years') {
      data = data.slice(-3);
    } else if (timeRange === '1year') {
      data = data.slice(-1);
    }
    
    return {
      success: true,
      data
    };
  } catch (error) {
    throw new Error('Failed to fetch alumni trends');
  }
};

export const getPlacementTrends = async (timeRange = '5years') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    let data = mockAnalyticsData.placementTrends;
    
    if (timeRange === '3years') {
      data = data.slice(-3);
    } else if (timeRange === '1year') {
      data = data.slice(-1);
    }
    
    return {
      success: true,
      data
    };
  } catch (error) {
    throw new Error('Failed to fetch placement trends');
  }
};

export const getTopRecruiters = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: mockAnalyticsData.topRecruiters
    };
  } catch (error) {
    throw new Error('Failed to fetch top recruiters');
  }
};

export const getDepartmentStats = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      data: mockAnalyticsData.departmentStats
    };
  } catch (error) {
    throw new Error('Failed to fetch department statistics');
  }
};

export const getEventEngagement = async (period = 'year') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let data = mockAnalyticsData.eventEngagement;
    
    if (period === '6months') {
      data = data.slice(-6);
    } else if (period === '3months') {
      data = data.slice(-3);
    }
    
    return {
      success: true,
      data
    };
  } catch (error) {
    throw new Error('Failed to fetch event engagement data');
  }
};

export const getRecentActivities = async (limit = 10) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: mockAnalyticsData.recentActivities.slice(0, limit)
    };
  } catch (error) {
    throw new Error('Failed to fetch recent activities');
  }
};

export const generateAnalyticsReport = async (reportType, filters = {}) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Simulate report generation
    return {
      success: true,
      reportId: `RPT_${Date.now()}`,
      downloadUrl: `/reports/${reportType}_${Date.now()}.pdf`,
      message: `${reportType} report generated successfully`
    };
  } catch (error) {
    throw new Error('Failed to generate analytics report');
  }
};

export const getCustomMetrics = async (metrics, timeRange) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate custom metrics calculation
    const customData = metrics.map(metric => ({
      metric,
      value: Math.floor(Math.random() * 1000) + 100,
      trend: Math.random() > 0.5 ? 'up' : 'down',
      percentage: Math.floor(Math.random() * 20) + 5
    }));
    
    return {
      success: true,
      data: customData
    };
  } catch (error) {
    throw new Error('Failed to fetch custom metrics');
  }
};