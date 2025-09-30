// Student Tracking Service for Institutes
export const getStudentPipelineData = async (timeRange = 'semester', filters = {}) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      pipeline: {
        stages: [
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
        ],
        conversionRates: {
          eligibleToRegistered: 93.7,
          registeredToInterviewed: 77.2,
          interviewedToOffered: 71.1,
          offeredToAccepted: 89.4
        }
      },
      filters: filters,
      timeRange: timeRange
    };
  } catch (error) {
    console.error('Error fetching student pipeline data:', error);
    throw new Error('Failed to fetch student pipeline data');
  }
};

export const getIndividualStudentProgress = async (filters = {}, pagination = { page: 1, limit: 20 }) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const sampleStudents = [
      {
        id: 1,
        name: 'Rajesh Kumar',
        rollNumber: 'CS21B001',
        department: 'Computer Science',
        cgpa: 9.2,
        currentStage: 'Interview Scheduled',
        company: 'Microsoft',
        progress: 75,
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        timeline: [
          { stage: 'Application Submitted', date: '2024-01-15', status: 'completed' },
          { stage: 'Resume Shortlisted', date: '2024-01-18', status: 'completed' },
          { stage: 'Technical Test', date: '2024-01-22', status: 'completed' },
          { stage: 'Technical Interview', date: '2024-01-25', status: 'scheduled' },
          { stage: 'HR Interview', date: null, status: 'pending' }
        ]
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
        lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        timeline: [
          { stage: 'Application Submitted', date: '2024-01-12', status: 'completed' },
          { stage: 'Resume Shortlisted', date: '2024-01-14', status: 'completed' },
          { stage: 'Technical Test', date: '2024-01-18', status: 'completed' },
          { stage: 'Technical Interview', date: '2024-01-22', status: 'completed' },
          { stage: 'HR Interview', date: '2024-01-24', status: 'completed' },
          { stage: 'Offer Letter', date: '2024-01-26', status: 'completed' }
        ]
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
        lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        timeline: [
          { stage: 'Application Submitted', date: '2024-01-20', status: 'completed' },
          { stage: 'Resume Shortlisted', date: null, status: 'pending' }
        ]
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
        lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        timeline: [
          { stage: 'Application Submitted', date: '2024-01-10', status: 'completed' },
          { stage: 'Resume Shortlisted', date: '2024-01-12', status: 'completed' },
          { stage: 'Technical Test', date: '2024-01-15', status: 'completed' },
          { stage: 'Technical Interview', date: '2024-01-18', status: 'completed' },
          { stage: 'HR Interview', date: '2024-01-20', status: 'completed' },
          { stage: 'Offer Letter', date: '2024-01-22', status: 'completed' },
          { stage: 'Offer Accepted', date: '2024-01-24', status: 'completed' }
        ]
      }
    ];

    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    const paginatedStudents = sampleStudents.slice(startIndex, endIndex);

    return {
      success: true,
      students: paginatedStudents,
      pagination: {
        currentPage: pagination.page,
        totalPages: Math.ceil(1234 / pagination.limit),
        totalStudents: 1234,
        hasNext: endIndex < 1234,
        hasPrevious: pagination.page > 1
      },
      filters: filters
    };
  } catch (error) {
    console.error('Error fetching individual student progress:', error);
    throw new Error('Failed to fetch individual student progress');
  }
};

export const getDepartmentProgress = async (timeRange = 'semester') => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      departments: [
        {
          id: 1,
          department: 'Computer Science',
          totalStudents: 450,
          placementRate: 98.2,
          avgPackage: 12.5,
          topPackage: 45.0,
          companiesVisited: 45,
          progress: {
            eligible: 423,
            registered: 410,
            interviewed: 389,
            offered: 378,
            placed: 365
          },
          trends: {
            placementGrowth: 3.2,
            packageGrowth: 18.5
          }
        },
        {
          id: 2,
          department: 'Electronics & Communication',
          totalStudents: 320,
          placementRate: 92.1,
          avgPackage: 9.2,
          topPackage: 32.0,
          companiesVisited: 38,
          progress: {
            eligible: 298,
            registered: 285,
            interviewed: 256,
            offered: 234,
            placed: 221
          },
          trends: {
            placementGrowth: 2.8,
            packageGrowth: 14.2
          }
        },
        {
          id: 3,
          department: 'Mechanical Engineering',
          totalStudents: 280,
          placementRate: 88.4,
          avgPackage: 7.8,
          topPackage: 25.0,
          companiesVisited: 32,
          progress: {
            eligible: 267,
            registered: 248,
            interviewed: 221,
            offered: 198,
            placed: 185
          },
          trends: {
            placementGrowth: 4.1,
            packageGrowth: 9.8
          }
        }
      ],
      timeRange: timeRange
    };
  } catch (error) {
    console.error('Error fetching department progress:', error);
    throw new Error('Failed to fetch department progress');
  }
};

export const getPipelineActivities = async (limit = 10) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      activities: [
        {
          id: 1,
          type: 'placement',
          title: 'TechCorp Placement Drive',
          description: '45 students selected out of 120 applicants',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          impact: 'high',
          details: { 
            company: 'TechCorp Solutions',
            selected: 45, 
            applied: 120, 
            avgPackage: '₹15.2L',
            departments: ['CSE', 'IT', 'ECE']
          }
        },
        {
          id: 2,
          type: 'application',
          title: 'Microsoft Applications',
          description: '89 students applied for SDE positions',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          impact: 'medium',
          details: { 
            company: 'Microsoft',
            applied: 89, 
            positions: 12, 
            cutoff: '8.5 CGPA',
            deadline: '2024-02-15'
          }
        },
        {
          id: 3,
          type: 'interview',
          title: 'Google Interview Results',
          description: '12 students cleared technical rounds',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          impact: 'high',
          details: { 
            company: 'Google',
            cleared: 12, 
            total: 25, 
            nextRound: 'Final Interview',
            scheduledDate: '2024-02-10'
          }
        },
        {
          id: 4,
          type: 'offer',
          title: 'Amazon Offer Letters',
          description: '8 students received offer letters',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          impact: 'high',
          details: { 
            company: 'Amazon',
            offers: 8, 
            avgPackage: '₹28.5L', 
            joiningDate: 'July 2024',
            acceptanceDeadline: '2024-02-20'
          }
        }
      ].slice(0, limit)
    };
  } catch (error) {
    console.error('Error fetching pipeline activities:', error);
    throw new Error('Failed to fetch pipeline activities');
  }
};

export const getStudentDetails = async (studentId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      student: {
        id: studentId,
        personalInfo: {
          name: 'Rajesh Kumar',
          rollNumber: 'CS21B001',
          email: 'rajesh.kumar@institute.edu',
          phone: '+91 9876543210',
          department: 'Computer Science & Engineering',
          batch: '2021-2025',
          cgpa: 9.2,
          currentSemester: 8
        },
        placementProgress: {
          status: 'Active',
          currentStage: 'Interview Scheduled',
          progressPercentage: 75,
          applicationsSubmitted: 8,
          interviewsAttended: 3,
          offersReceived: 1,
          preferredIndustries: ['Software Development', 'Product Companies', 'Startups']
        },
        applications: [
          {
            id: 1,
            company: 'Microsoft',
            position: 'Software Engineer',
            appliedDate: '2024-01-15',
            status: 'Interview Scheduled',
            stage: 'Technical Round 2',
            nextStepDate: '2024-02-05'
          },
          {
            id: 2,
            company: 'Google',
            position: 'SDE',
            appliedDate: '2024-01-12',
            status: 'Under Review',
            stage: 'Resume Screening',
            nextStepDate: null
          }
        ],
        timeline: [
          {
            date: '2024-01-15',
            event: 'Applied to Microsoft',
            type: 'application',
            status: 'completed'
          },
          {
            date: '2024-01-18',
            event: 'Resume Shortlisted - Microsoft',
            type: 'screening',
            status: 'completed'
          },
          {
            date: '2024-01-22',
            event: 'Technical Test Completed',
            type: 'test',
            status: 'completed'
          },
          {
            date: '2024-02-05',
            event: 'Technical Interview Scheduled',
            type: 'interview',
            status: 'scheduled'
          }
        ],
        skills: ['Java', 'Python', 'React', 'Node.js', 'Database Management'],
        achievements: ['Dean\'s List', 'Coding Competition Winner', 'Research Paper Published'],
        documents: {
          resume: '/documents/rajesh_kumar_resume.pdf',
          transcript: '/documents/rajesh_kumar_transcript.pdf',
          certificates: ['/documents/java_cert.pdf', '/documents/aws_cert.pdf']
        }
      }
    };
  } catch (error) {
    console.error('Error fetching student details:', error);
    throw new Error('Failed to fetch student details');
  }
};

export const updateStudentProgress = async (studentId, progressData) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      student: {
        id: studentId,
        ...progressData,
        lastUpdated: new Date().toISOString()
      },
      message: 'Student progress updated successfully'
    };
  } catch (error) {
    console.error('Error updating student progress:', error);
    throw new Error('Failed to update student progress');
  }
};

export const getPipelineMetrics = async (timeRange = 'semester') => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      success: true,
      metrics: {
        conversionRates: {
          registrationToInterview: 77.2,
          interviewToOffer: 71.1,
          offerToAcceptance: 89.4,
          overallPlacementRate: 92.5
        },
        timeMetrics: {
          averageTimeToFirstInterview: 12, // days
          averageTimeToOffer: 28, // days
          averageResponseTime: 3, // days
          averageDecisionTime: 7 // days
        },
        qualityMetrics: {
          averagePackage: 8.5,
          medianPackage: 7.2,
          packageGrowth: 12.4,
          studentSatisfaction: 4.6
        },
        trends: {
          weeklyApplications: [
            { week: 'Week 1', applications: 234 },
            { week: 'Week 2', applications: 289 },
            { week: 'Week 3', applications: 312 },
            { week: 'Week 4', applications: 345 }
          ],
          monthlyPlacements: [
            { month: 'Jan', placements: 45 },
            { month: 'Feb', placements: 67 },
            { month: 'Mar', placements: 89 },
            { month: 'Apr', placements: 123 }
          ]
        }
      },
      timeRange: timeRange
    };
  } catch (error) {
    console.error('Error fetching pipeline metrics:', error);
    throw new Error('Failed to fetch pipeline metrics');
  }
};

export const exportStudentData = async (filters = {}, format = 'xlsx') => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      export: {
        format,
        fileName: `student_tracking_${new Date().toISOString().split('T')[0]}.${format}`,
        downloadUrl: `/exports/student_tracking_${Date.now()}.${format}`,
        generatedAt: new Date().toISOString(),
        recordCount: 1234,
        filters: filters
      },
      message: 'Student data exported successfully'
    };
  } catch (error) {
    console.error('Error exporting student data:', error);
    throw new Error('Failed to export student data');
  }
};