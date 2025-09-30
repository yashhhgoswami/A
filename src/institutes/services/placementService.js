// Placement Portal Service for connecting students with recruiters
const mockPlacementData = {
  companies: [
    {
      id: 1,
      name: 'Google India',
      logo: '/logos/google.png',
      industry: 'Technology',
      type: 'On Campus',
      visitDate: '2025-10-15',
      registrationDeadline: '2025-10-10',
      eligibleBranches: ['Computer Science', 'Data Science', 'Electronics'],
      minimumCGPA: 8.0,
      packageRange: '15-45 LPA',
      roles: ['Software Engineer', 'Data Scientist', 'Product Manager'],
      description: 'Google is looking for talented engineers to join our team in Bangalore and Hyderabad.',
      requirements: ['Strong programming skills', 'Problem-solving ability', 'Team player'],
      applicationProcess: 'Online Test → Technical Interviews → HR Round',
      contactPerson: 'Rajesh Kumar',
      contactEmail: 'rajesh@google.com',
      contactPhone: '+91-9876543210',
      status: 'Open',
      studentsRegistered: 145,
      totalPositions: 25,
      additionalInfo: 'Internship opportunities also available'
    },
    {
      id: 2,
      name: 'Microsoft Corporation',
      logo: '/logos/microsoft.png',
      industry: 'Technology',
      type: 'On Campus',
      visitDate: '2025-10-20',
      registrationDeadline: '2025-10-15',
      eligibleBranches: ['Computer Science', 'Software Engineering'],
      minimumCGPA: 7.5,
      packageRange: '12-35 LPA',
      roles: ['Software Developer', 'Cloud Engineer'],
      description: 'Microsoft is hiring fresh graduates for various technical roles.',
      requirements: ['C#/.NET knowledge preferred', 'Cloud technologies', 'Agile methodology'],
      applicationProcess: 'Coding Test → Technical Round → Managerial Round',
      contactPerson: 'Priya Sharma',
      contactEmail: 'priya.sharma@microsoft.com',
      contactPhone: '+91-9876543211',
      status: 'Open',
      studentsRegistered: 98,
      totalPositions: 15,
      additionalInfo: 'Remote work options available'
    },
    {
      id: 3,
      name: 'Amazon Development Center',
      logo: '/logos/amazon.png',
      industry: 'E-commerce/Technology',
      type: 'On Campus',
      visitDate: '2025-10-25',
      registrationDeadline: '2025-10-20',
      eligibleBranches: ['Computer Science', 'Mechanical Engineering', 'Business Administration'],
      minimumCGPA: 7.0,
      packageRange: '10-30 LPA',
      roles: ['SDE I', 'Operations Manager', 'Business Analyst'],
      description: 'Amazon is expanding its development center and looking for talented individuals.',
      requirements: ['Strong analytical skills', 'Customer obsession', 'Leadership principles'],
      applicationProcess: 'Online Assessment → Phone Interview → On-site Interview',
      contactPerson: 'Amit Verma',
      contactEmail: 'amit.verma@amazon.com',
      contactPhone: '+91-9876543212',
      status: 'Open',
      studentsRegistered: 234,
      totalPositions: 40,
      additionalInfo: 'Relocation assistance provided'
    },
    {
      id: 4,
      name: 'Tata Consultancy Services',
      logo: '/logos/tcs.png',
      industry: 'IT Services',
      type: 'On Campus',
      visitDate: '2025-11-01',
      registrationDeadline: '2025-10-25',
      eligibleBranches: ['All Branches'],
      minimumCGPA: 6.5,
      packageRange: '3.5-8 LPA',
      roles: ['Systems Engineer', 'Business Analyst', 'Consultant'],
      description: 'TCS is conducting campus recruitment for multiple roles across all branches.',
      requirements: ['Good communication skills', 'Adaptability', 'Learning mindset'],
      applicationProcess: 'Aptitude Test → Technical Interview → HR Interview',
      contactPerson: 'Sneha Agarwal',
      contactEmail: 'sneha.agarwal@tcs.com',
      contactPhone: '+91-9876543213',
      status: 'Open',
      studentsRegistered: 567,
      totalPositions: 120,
      additionalInfo: 'Training program included'
    },
    {
      id: 5,
      name: 'Goldman Sachs',
      logo: '/logos/goldmansachs.png',
      industry: 'Financial Services',
      type: 'Off Campus',
      visitDate: '2025-11-10',
      registrationDeadline: '2025-11-05',
      eligibleBranches: ['Computer Science', 'Mathematics', 'Economics'],
      minimumCGPA: 8.5,
      packageRange: '20-50 LPA',
      roles: ['Technology Analyst', 'Quantitative Analyst'],
      description: 'Goldman Sachs is looking for top talent for their technology division.',
      requirements: ['Strong mathematical background', 'Programming skills', 'Financial knowledge'],
      applicationProcess: 'Online Test → Video Interview → Super Day',
      contactPerson: 'Rohan Gupta',
      contactEmail: 'rohan.gupta@gs.com',
      contactPhone: '+91-9876543214',
      status: 'Closed',
      studentsRegistered: 89,
      totalPositions: 8,
      additionalInfo: 'International opportunities available'
    }
  ],
  studentApplications: [
    {
      id: 1,
      studentId: 101,
      studentName: 'Rahul Kumar',
      companyId: 1,
      companyName: 'Google India',
      appliedDate: '2025-09-25',
      status: 'Under Review',
      stage: 'Online Test',
      score: 85,
      feedback: 'Strong technical skills, good problem-solving approach'
    },
    {
      id: 2,
      studentId: 102,
      studentName: 'Sneha Agarwal',
      companyId: 1,
      companyName: 'Google India',
      appliedDate: '2025-09-24',
      status: 'Selected',
      stage: 'Offer Extended',
      score: 92,
      feedback: 'Excellent coding skills and system design knowledge'
    },
    {
      id: 3,
      studentId: 103,
      studentName: 'Vikram Singh',
      companyId: 2,
      companyName: 'Microsoft Corporation',
      appliedDate: '2025-09-26',
      status: 'In Progress',
      stage: 'Technical Interview',
      score: 78,
      feedback: 'Good technical foundation, needs improvement in communication'
    }
  ],
  placementStats: {
    totalStudents: 1000,
    studentsPlaced: 847,
    averagePackage: 850000,
    highestPackage: 4500000,
    placementRate: 84.7,
    companiesVisited: 45,
    offersReceived: 982
  }
};

export const getAllCompanies = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      companies: mockPlacementData.companies
    };
  } catch (error) {
    throw new Error('Failed to fetch companies');
  }
};

export const getCompanyById = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    const company = mockPlacementData.companies.find(c => c.id === parseInt(id));
    
    if (!company) {
      throw new Error('Company not found');
    }
    
    return {
      success: true,
      company
    };
  } catch (error) {
    throw new Error('Failed to fetch company details');
  }
};

export const addCompany = async (companyData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newCompany = {
      id: mockPlacementData.companies.length + 1,
      ...companyData,
      studentsRegistered: 0,
      status: 'Open'
    };
    
    mockPlacementData.companies.push(newCompany);
    
    return {
      success: true,
      company: newCompany,
      message: 'Company added successfully'
    };
  } catch (error) {
    throw new Error('Failed to add company');
  }
};

export const updateCompany = async (id, companyData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const companyIndex = mockPlacementData.companies.findIndex(c => c.id === parseInt(id));
    
    if (companyIndex === -1) {
      throw new Error('Company not found');
    }
    
    mockPlacementData.companies[companyIndex] = {
      ...mockPlacementData.companies[companyIndex],
      ...companyData
    };
    
    return {
      success: true,
      company: mockPlacementData.companies[companyIndex],
      message: 'Company updated successfully'
    };
  } catch (error) {
    throw new Error('Failed to update company');
  }
};

export const deleteCompany = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const companyIndex = mockPlacementData.companies.findIndex(c => c.id === parseInt(id));
    
    if (companyIndex === -1) {
      throw new Error('Company not found');
    }
    
    mockPlacementData.companies.splice(companyIndex, 1);
    
    return {
      success: true,
      message: 'Company deleted successfully'
    };
  } catch (error) {
    throw new Error('Failed to delete company');
  }
};

export const getStudentApplications = async (companyId = null) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let applications = mockPlacementData.studentApplications;
    
    if (companyId) {
      applications = applications.filter(app => app.companyId === parseInt(companyId));
    }
    
    return {
      success: true,
      applications
    };
  } catch (error) {
    throw new Error('Failed to fetch student applications');
  }
};

export const updateApplicationStatus = async (applicationId, status, feedback = '') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const applicationIndex = mockPlacementData.studentApplications.findIndex(
      app => app.id === parseInt(applicationId)
    );
    
    if (applicationIndex === -1) {
      throw new Error('Application not found');
    }
    
    mockPlacementData.studentApplications[applicationIndex].status = status;
    if (feedback) {
      mockPlacementData.studentApplications[applicationIndex].feedback = feedback;
    }
    
    return {
      success: true,
      message: 'Application status updated successfully'
    };
  } catch (error) {
    throw new Error('Failed to update application status');
  }
};

export const getPlacementStats = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      stats: mockPlacementData.placementStats
    };
  } catch (error) {
    throw new Error('Failed to fetch placement statistics');
  }
};

export const searchCompanies = async (searchTerm) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const filteredCompanies = mockPlacementData.companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.roles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    return {
      success: true,
      companies: filteredCompanies
    };
  } catch (error) {
    throw new Error('Failed to search companies');
  }
};

export const filterCompanies = async (filters) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredCompanies = mockPlacementData.companies;
    
    if (filters.industry) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.industry.toLowerCase().includes(filters.industry.toLowerCase())
      );
    }
    
    if (filters.type) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.type.toLowerCase() === filters.type.toLowerCase()
      );
    }
    
    if (filters.minimumPackage) {
      filteredCompanies = filteredCompanies.filter(company => {
        const packageRange = company.packageRange.split('-')[0];
        const minPackage = parseInt(packageRange.replace(/[^\d]/g, ''));
        return minPackage >= filters.minimumPackage;
      });
    }
    
    if (filters.status) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.status.toLowerCase() === filters.status.toLowerCase()
      );
    }
    
    return {
      success: true,
      companies: filteredCompanies
    };
  } catch (error) {
    throw new Error('Failed to filter companies');
  }
};

export const generatePlacementReport = async (reportType = 'summary') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      reportId: `PLACEMENT_${Date.now()}`,
      downloadUrl: `/reports/placement_${reportType}_${Date.now()}.pdf`,
      message: `Placement ${reportType} report generated successfully`
    };
  } catch (error) {
    throw new Error('Failed to generate placement report');
  }
};

export const notifyStudents = async (companyId, message) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Simulate sending notifications to eligible students
    const company = mockPlacementData.companies.find(c => c.id === parseInt(companyId));
    
    if (!company) {
      throw new Error('Company not found');
    }
    
    return {
      success: true,
      notificationsSent: company.studentsRegistered + 50, // Simulate additional eligible students
      message: 'Notifications sent to eligible students'
    };
  } catch (error) {
    throw new Error('Failed to send notifications');
  }
};