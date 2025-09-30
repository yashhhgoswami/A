// Alumni Management Service for Institute
const mockAlumniData = [
  {
    id: 1,
    name: 'Arjun Sharma',
    email: 'arjun.sharma@email.com',
    graduationYear: 2020,
    major: 'Computer Science',
    currentPosition: 'Senior Software Engineer',
    company: 'Infosys',
    location: 'Bangalore, India',
    linkedinUrl: 'https://linkedin.com/in/arjunsharma',
    status: 'Active',
    lastActive: '2025-09-28',
    achievements: ['Employee of the Year 2023', 'Published 5 research papers'],
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    mentoring: true,
    eventsAttended: 15,
    donationsTotal: 50000
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    graduationYear: 2019,
    major: 'Business Administration',
    currentPosition: 'Product Manager',
    company: 'Tata Consultancy Services',
    location: 'Mumbai, India',
    linkedinUrl: 'https://linkedin.com/in/priyapatel',
    status: 'Active',
    lastActive: '2025-09-25',
    achievements: ['Led team of 50+ engineers', 'MBA from IIM'],
    skills: ['Management', 'Strategy', 'Marketing', 'Product Development'],
    mentoring: true,
    eventsAttended: 22,
    donationsTotal: 75000
  },
  {
    id: 3,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    graduationYear: 2018,
    major: 'Mechanical Engineering',
    currentPosition: 'Engineering Manager',
    company: 'Mahindra & Mahindra',
    location: 'Chennai, India',
    linkedinUrl: 'https://linkedin.com/in/rajeshkumar',
    status: 'Active',
    lastActive: '2025-09-20',
    achievements: ['Patent holder', 'Innovation Award 2024'],
    skills: ['Mechanical Design', 'Project Management', 'CAD'],
    mentoring: false,
    eventsAttended: 8,
    donationsTotal: 25000
  },
  {
    id: 4,
    name: 'Sneha Agarwal',
    email: 'sneha.agarwal@email.com',
    graduationYear: 2021,
    major: 'Data Science',
    currentPosition: 'Data Scientist',
    company: 'Flipkart',
    location: 'Bangalore, India',
    linkedinUrl: 'https://linkedin.com/in/snehaagarwal',
    status: 'Active',
    lastActive: '2025-09-30',
    achievements: ['Best Data Science Project 2022', 'Speaker at conferences'],
    skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    mentoring: true,
    eventsAttended: 12,
    donationsTotal: 35000
  },
  {
    id: 5,
    name: 'Amit Verma',
    email: 'amit.verma@email.com',
    graduationYear: 2017,
    major: 'Computer Science',
    currentPosition: 'Tech Lead',
    company: 'Amazon',
    location: 'Hyderabad, India',
    linkedinUrl: 'https://linkedin.com/in/amitverma',
    status: 'Inactive',
    lastActive: '2025-06-15',
    achievements: ['AWS Certified', 'Open Source Contributor'],
    skills: ['Java', 'AWS', 'System Design', 'Leadership'],
    mentoring: false,
    eventsAttended: 5,
    donationsTotal: 15000
  }
];

export const getAllAlumni = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      alumni: mockAlumniData,
      total: mockAlumniData.length
    };
  } catch (error) {
    throw new Error('Failed to fetch alumni data');
  }
};

export const searchAlumni = async (searchTerm) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const filteredAlumni = mockAlumniData.filter(alumni =>
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.currentPosition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
      success: true,
      alumni: filteredAlumni,
      total: filteredAlumni.length
    };
  } catch (error) {
    throw new Error('Failed to search alumni');
  }
};

export const filterAlumni = async (filters) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filteredAlumni = mockAlumniData;

    if (filters.graduationYear) {
      filteredAlumni = filteredAlumni.filter(alumni => 
        alumni.graduationYear === parseInt(filters.graduationYear)
      );
    }

    if (filters.major) {
      filteredAlumni = filteredAlumni.filter(alumni => 
        alumni.major.toLowerCase().includes(filters.major.toLowerCase())
      );
    }

    if (filters.company) {
      filteredAlumni = filteredAlumni.filter(alumni => 
        alumni.company.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    if (filters.status) {
      filteredAlumni = filteredAlumni.filter(alumni => 
        alumni.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.mentoring !== undefined) {
      filteredAlumni = filteredAlumni.filter(alumni => 
        alumni.mentoring === filters.mentoring
      );
    }

    return {
      success: true,
      alumni: filteredAlumni,
      total: filteredAlumni.length
    };
  } catch (error) {
    throw new Error('Failed to filter alumni');
  }
};

export const getAlumniById = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const alumni = mockAlumniData.find(a => a.id === parseInt(id));
    
    if (!alumni) {
      throw new Error('Alumni not found');
    }

    return {
      success: true,
      alumni
    };
  } catch (error) {
    throw new Error('Failed to fetch alumni details');
  }
};

export const updateAlumniStatus = async (id, status) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const alumniIndex = mockAlumniData.findIndex(a => a.id === parseInt(id));
    
    if (alumniIndex === -1) {
      throw new Error('Alumni not found');
    }

    mockAlumniData[alumniIndex].status = status;
    
    return {
      success: true,
      message: 'Alumni status updated successfully'
    };
  } catch (error) {
    throw new Error('Failed to update alumni status');
  }
};

export const getAlumniStats = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const totalAlumni = mockAlumniData.length;
    const activeAlumni = mockAlumniData.filter(a => a.status === 'Active').length;
    const mentoringAlumni = mockAlumniData.filter(a => a.mentoring).length;
    const totalDonations = mockAlumniData.reduce((sum, a) => sum + a.donationsTotal, 0);
    const averageEvents = mockAlumniData.reduce((sum, a) => sum + a.eventsAttended, 0) / totalAlumni;

    const graduationYearStats = mockAlumniData.reduce((acc, alumni) => {
      acc[alumni.graduationYear] = (acc[alumni.graduationYear] || 0) + 1;
      return acc;
    }, {});

    const majorStats = mockAlumniData.reduce((acc, alumni) => {
      acc[alumni.major] = (acc[alumni.major] || 0) + 1;
      return acc;
    }, {});

    const companyStats = mockAlumniData.reduce((acc, alumni) => {
      acc[alumni.company] = (acc[alumni.company] || 0) + 1;
      return acc;
    }, {});

    return {
      success: true,
      stats: {
        totalAlumni,
        activeAlumni,
        mentoringAlumni,
        totalDonations,
        averageEvents: Math.round(averageEvents * 10) / 10,
        graduationYearStats,
        majorStats,
        companyStats
      }
    };
  } catch (error) {
    throw new Error('Failed to fetch alumni statistics');
  }
};

export const inviteAlumni = async (email, message) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Simulate sending invitation
    return {
      success: true,
      message: 'Invitation sent successfully'
    };
  } catch (error) {
    throw new Error('Failed to send invitation');
  }
};

export const exportAlumniData = async (format = 'csv') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate data export
    return {
      success: true,
      downloadUrl: `/exports/alumni_data.${format}`,
      message: `Alumni data exported as ${format.toUpperCase()}`
    };
  } catch (error) {
    throw new Error('Failed to export alumni data');
  }
};