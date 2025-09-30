// Placement Drive Service for Institutes
export const createPlacementDrive = async (driveData) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDrive = {
      id: Date.now(),
      ...driveData,
      status: 'active',
      registrations: 0,
      applications: 0,
      postedDate: new Date().toISOString().split('T')[0],
      skills: typeof driveData.skills === 'string' 
        ? driveData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
        : driveData.skills || [],
      positions: parseInt(driveData.positions),
      cgpaCutoff: parseFloat(driveData.cgpaCutoff)
    };
    
    return {
      success: true,
      drive: newDrive,
      message: 'Placement drive scheduled successfully'
    };
  } catch (error) {
    console.error('Error creating placement drive:', error);
    throw new Error('Failed to create placement drive');
  }
};

export const updatePlacementDrive = async (driveId, driveData) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      drive: {
        id: driveId,
        ...driveData,
        lastModified: new Date().toISOString().split('T')[0],
        skills: typeof driveData.skills === 'string' 
          ? driveData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
          : driveData.skills || []
      },
      message: 'Placement drive updated successfully'
    };
  } catch (error) {
    console.error('Error updating placement drive:', error);
    throw new Error('Failed to update placement drive');
  }
};

export const deletePlacementDrive = async (driveId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: 'Placement drive deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting placement drive:', error);
    throw new Error('Failed to delete placement drive');
  }
};

export const getPlacementDrives = async (instituteId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      drives: [
        {
          id: 1,
          companyName: 'TechCorp Solutions',
          industry: 'Software Development',
          visitDate: '2024-02-15',
          positions: 50,
          packageRange: '₹8-25 LPA',
          registrations: 145,
          applications: 98,
          status: 'active',
          postedDate: '2024-01-20',
          jobDescription: 'We are looking for talented software engineers to join our dynamic team...',
          requirements: 'B.Tech in CS/IT/ECE, 7+ CGPA, Strong programming skills',
          eligibleBranches: ['CSE', 'IT', 'ECE'],
          cgpaCutoff: 7.0,
          skills: ['Java', 'Python', 'React', 'Node.js'],
          driveType: 'on-campus',
          urgentHiring: false,
          internshipOpportunity: true
        },
        {
          id: 2,
          companyName: 'Innovation Labs Pvt Ltd',
          industry: 'Research & Development',
          visitDate: '2024-02-20',
          positions: 25,
          packageRange: '₹6-18 LPA',
          registrations: 89,
          applications: 67,
          status: 'active',
          postedDate: '2024-01-18',
          jobDescription: 'Join our R&D team to work on cutting-edge technology projects...',
          requirements: 'B.Tech/M.Tech in Engineering, Research experience preferred',
          eligibleBranches: ['CSE', 'ECE', 'ME', 'EE'],
          cgpaCutoff: 6.5,
          skills: ['Research', 'Problem Solving', 'Innovation', 'Technical Writing'],
          driveType: 'virtual',
          urgentHiring: true,
          internshipOpportunity: false
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching placement drives:', error);
    throw new Error('Failed to fetch placement drives');
  }
};

export const getDriveById = async (driveId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      drive: {
        id: driveId,
        companyName: 'TechCorp Solutions',
        industry: 'Software Development',
        visitDate: '2024-02-15',
        positions: 50,
        packageRange: '₹8-25 LPA',
        registrations: 145,
        applications: 98,
        status: 'active',
        postedDate: '2024-01-20',
        jobDescription: 'We are looking for talented software engineers to join our dynamic team. You will work on innovative projects, collaborate with cross-functional teams, and contribute to cutting-edge technology solutions.',
        requirements: 'B.Tech in CS/IT/ECE with 7+ CGPA, strong programming skills, excellent problem-solving abilities',
        benefits: 'Competitive salary, health insurance, flexible work hours, learning opportunities, career growth',
        eligibleBranches: ['CSE', 'IT', 'ECE'],
        cgpaCutoff: 7.0,
        skills: ['Java', 'Python', 'React', 'Node.js'],
        driveType: 'on-campus',
        urgentHiring: false,
        internshipOpportunity: true
      }
    };
  } catch (error) {
    console.error('Error fetching drive details:', error);
    throw new Error('Failed to fetch drive details');
  }
};

export const toggleDriveStatus = async (driveId, newStatus) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      drive: {
        id: driveId,
        status: newStatus,
        lastModified: new Date().toISOString().split('T')[0]
      },
      message: `Placement drive ${newStatus === 'active' ? 'activated' : 'paused'} successfully`
    };
  } catch (error) {
    console.error('Error toggling drive status:', error);
    throw new Error('Failed to update drive status');
  }
};

export const getDriveRegistrations = async (driveId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      registrations: [
        {
          id: 1,
          studentId: 1,
          studentName: 'Rajesh Kumar',
          rollNumber: 'CS21B001',
          department: 'Computer Science',
          cgpa: 9.2,
          registeredDate: '2024-01-22',
          status: 'registered',
          eligibilityStatus: 'eligible',
          resumeUrl: '/resumes/rajesh_kumar_resume.pdf'
        },
        {
          id: 2,
          studentId: 2,
          studentName: 'Priya Sharma',
          rollNumber: 'IT21B045',
          department: 'Information Technology',
          cgpa: 8.8,
          registeredDate: '2024-01-23',
          status: 'registered',
          eligibilityStatus: 'eligible',
          resumeUrl: '/resumes/priya_sharma_resume.pdf'
        }
      ],
      totalRegistrations: 145,
      eligibleStudents: 132,
      pendingApprovals: 13
    };
  } catch (error) {
    console.error('Error fetching drive registrations:', error);
    throw new Error('Failed to fetch drive registrations');
  }
};

export const updateRegistrationStatus = async (driveId, studentId, status) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      registration: {
        driveId,
        studentId,
        status,
        updatedAt: new Date().toISOString()
      },
      message: `Registration status updated to ${status}`
    };
  } catch (error) {
    console.error('Error updating registration status:', error);
    throw new Error('Failed to update registration status');
  }
};

export const getDriveAnalytics = async (driveId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      success: true,
      analytics: {
        driveId,
        overview: {
          totalRegistrations: 145,
          eligibleStudents: 132,
          applications: 98,
          interviewed: 67,
          selected: 45,
          conversionRate: 31.0
        },
        departmentWise: [
          { department: 'Computer Science', registrations: 89, selected: 28 },
          { department: 'Information Technology', registrations: 34, selected: 12 },
          { department: 'Electronics', registrations: 22, selected: 5 }
        ],
        timelineData: [
          { date: '2024-01-22', registrations: 45 },
          { date: '2024-01-23', registrations: 67 },
          { date: '2024-01-24', registrations: 89 },
          { date: '2024-01-25', registrations: 112 },
          { date: '2024-01-26', registrations: 145 }
        ],
        topPerformers: [
          { studentName: 'Rajesh Kumar', cgpa: 9.2, status: 'Selected' },
          { studentName: 'Priya Sharma', cgpa: 8.8, status: 'Interview Scheduled' },
          { studentName: 'Amit Singh', cgpa: 8.6, status: 'Application Submitted' }
        ]
      }
    };
  } catch (error) {
    console.error('Error fetching drive analytics:', error);
    throw new Error('Failed to fetch drive analytics');
  }
};

export const sendDriveNotification = async (driveId, notificationData) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      notification: {
        id: Date.now(),
        driveId,
        ...notificationData,
        sentAt: new Date().toISOString(),
        status: 'sent'
      },
      message: 'Notification sent successfully'
    };
  } catch (error) {
    console.error('Error sending drive notification:', error);
    throw new Error('Failed to send notification');
  }
};

export const exportDriveData = async (driveId, format = 'xlsx') => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      success: true,
      export: {
        driveId,
        format,
        fileName: `placement_drive_${driveId}_${new Date().toISOString().split('T')[0]}.${format}`,
        downloadUrl: `/exports/placement_drive_${driveId}.${format}`,
        generatedAt: new Date().toISOString(),
        recordCount: 145
      },
      message: 'Drive data exported successfully'
    };
  } catch (error) {
    console.error('Error exporting drive data:', error);
    throw new Error('Failed to export drive data');
  }
};