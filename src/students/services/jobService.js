// Mock data for job portal service
const mockJobs = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    company: 'Infosys',
    type: 'internship',
    location: 'Bangalore, Karnataka',
    remote: false,
    duration: '6 months',
    stipend: '₹25,000/month',
    description: 'Join our team to work on cutting-edge projects in machine learning and web development.',
    requirements: ['Computer Science/Engineering student', 'Programming experience in Python/Java', 'Strong problem-solving skills'],
    skills: ['Python', 'Java', 'Machine Learning', 'Web Development'],
    postedDate: '2025-09-20',
    deadline: '2025-10-30',
    applicants: 245,
    status: 'open',
    companyLogo: null,
    experience: 'Entry Level'
  },
  {
    id: 2,
    title: 'Product Management Intern',
    company: 'Flipkart',
    type: 'internship',
    location: 'Bangalore, Karnataka',
    remote: true,
    duration: '4 months',
    stipend: '₹30,000/month',
    description: 'Work alongside product managers to define product requirements and drive feature development for India\'s leading e-commerce platform.',
    requirements: ['Business/Engineering background', 'Strong analytical skills', 'Communication skills'],
    skills: ['Product Management', 'Analytics', 'Strategy', 'Communication'],
    postedDate: '2025-09-18',
    deadline: '2025-11-15',
    applicants: 189,
    status: 'open',
    companyLogo: null,
    experience: 'Entry Level'
  },
  {
    id: 3,
    title: 'Junior Frontend Developer',
    company: 'Paytm',
    type: 'job',
    location: 'Noida, Uttar Pradesh',
    remote: true,
    duration: 'Full-time',
    salary: '₹6,00,000 - ₹9,00,000',
    description: 'Build beautiful and responsive user interfaces for millions of users across India\'s leading fintech platform.',
    requirements: ['2+ years React experience', 'Bachelor\'s degree', 'Portfolio of projects'],
    skills: ['React', 'TypeScript', 'CSS', 'JavaScript', 'Git'],
    postedDate: '2025-09-15',
    deadline: '2025-10-20',
    applicants: 156,
    status: 'open',
    companyLogo: null,
    experience: 'Mid Level'
  },
  {
    id: 4,
    title: 'UX Design Intern',
    company: 'Zomato',
    type: 'internship',
    location: 'Gurgaon, Haryana',
    remote: false,
    duration: '6 months',
    stipend: '₹28,000/month',
    description: 'Help design experiences that connect people with great food across India.',
    requirements: ['Design portfolio', 'Figma/Sketch proficiency', 'User research experience'],
    skills: ['UX Design', 'Figma', 'User Research', 'Prototyping'],
    postedDate: '2025-09-10',
    deadline: '2025-10-25',
    applicants: 98,
    status: 'open',
    companyLogo: null,
    experience: 'Entry Level'
  },
  {
    id: 5,
    title: 'Data Science Intern',
    company: 'Swiggy',
    type: 'internship',
    location: 'Bangalore, Karnataka',
    remote: true,
    duration: '5 months',
    stipend: '₹35,000/month',
    description: 'Analyze user behavior data to improve food delivery recommendations and user experience across India.',
    requirements: ['Statistics/Data Science background', 'Python/R proficiency', 'SQL knowledge'],
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
    postedDate: '2025-09-05',
    deadline: '2025-11-01',
    applicants: 312,
    status: 'open',
    companyLogo: null,
    experience: 'Entry Level'
  },
  {
    id: 6,
    title: 'Mobile App Developer',
    company: 'TikTok',
    type: 'job',
    location: 'Los Angeles, CA',
    remote: false,
    duration: 'Full-time',
    salary: '$110,000 - $140,000',
    description: 'Develop and optimize mobile applications for millions of users worldwide.',
    requirements: ['3+ years mobile development', 'iOS/Android experience', 'App Store publishing'],
    skills: ['Swift', 'Kotlin', 'React Native', 'Mobile Development'],
    postedDate: '2025-08-30',
    deadline: '2025-10-15',
    applicants: 89,
    status: 'open',
    companyLogo: null,
    experience: 'Senior Level'
  }
];

const mockApplications = [
  {
    id: 1,
    jobId: 1,
    studentId: 1,
    appliedDate: '2025-09-22',
    status: 'applied',
    resume: 'resume_john_doe.pdf',
    coverLetter: 'Looking forward to contributing to Google\'s innovative projects...'
  },
  {
    id: 2,
    jobId: 4,
    studentId: 1,
    appliedDate: '2025-09-20',
    status: 'under_review',
    resume: 'resume_john_doe.pdf',
    coverLetter: 'Passionate about creating user-centered designs...'
  }
];

export const getAllJobs = async (filters = {}) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filteredJobs = [...mockJobs];
    
    // Apply filters
    if (filters.type && filters.type !== 'all') {
      filteredJobs = filteredJobs.filter(job => job.type === filters.type);
    }
    
    if (filters.location && filters.location !== 'all') {
      if (filters.location === 'remote') {
        filteredJobs = filteredJobs.filter(job => job.remote);
      } else {
        filteredJobs = filteredJobs.filter(job => 
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
    }
    
    if (filters.experience && filters.experience !== 'all') {
      filteredJobs = filteredJobs.filter(job => 
        job.experience.toLowerCase().includes(filters.experience.toLowerCase())
      );
    }
    
    if (filters.skills && filters.skills.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        filters.skills.some(skill => 
          job.skills.some(jobSkill => 
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return {
      jobs: filteredJobs,
      total: filteredJobs.length,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch jobs');
  }
};

export const getJobById = async (jobId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const job = mockJobs.find(j => j.id === parseInt(jobId));
    if (!job) {
      throw new Error('Job not found');
    }
    
    return {
      job,
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch job details');
  }
};

export const applyToJob = async (jobId, studentId, applicationData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const job = mockJobs.find(j => j.id === parseInt(jobId));
    if (!job) {
      throw new Error('Job not found');
    }
    
    // Check if already applied
    const existingApplication = mockApplications.find(
      app => app.jobId === parseInt(jobId) && app.studentId === parseInt(studentId)
    );
    
    if (existingApplication) {
      throw new Error('You have already applied to this position');
    }
    
    const newApplication = {
      id: mockApplications.length + 1,
      jobId: parseInt(jobId),
      studentId: parseInt(studentId),
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'applied',
      ...applicationData
    };
    
    mockApplications.push(newApplication);
    
    // Increment applicant count
    job.applicants += 1;
    
    return {
      message: `Successfully applied to ${job.title} at ${job.company}!`,
      application: newApplication,
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to submit application');
  }
};

export const getStudentApplications = async (studentId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const applications = mockApplications
      .filter(app => app.studentId === parseInt(studentId))
      .map(application => {
        const job = mockJobs.find(j => j.id === application.jobId);
        return {
          ...application,
          job
        };
      });
    
    return {
      applications,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch applications');
  }
};

export const withdrawApplication = async (applicationId, studentId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const applicationIndex = mockApplications.findIndex(
      app => app.id === parseInt(applicationId) && app.studentId === parseInt(studentId)
    );
    
    if (applicationIndex === -1) {
      throw new Error('Application not found');
    }
    
    const application = mockApplications[applicationIndex];
    const job = mockJobs.find(j => j.id === application.jobId);
    
    if (job) {
      job.applicants -= 1;
    }
    
    mockApplications.splice(applicationIndex, 1);
    
    return {
      message: 'Application withdrawn successfully',
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to withdraw application');
  }
};

export const getRecommendedJobs = async (studentId, skills = []) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let recommendedJobs = [...mockJobs];
    
    if (skills.length > 0) {
      // Sort by skill match
      recommendedJobs = recommendedJobs
        .map(job => {
          const matchCount = job.skills.filter(skill => 
            skills.some(userSkill => 
              skill.toLowerCase().includes(userSkill.toLowerCase())
            )
          ).length;
          return { ...job, matchScore: matchCount };
        })
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 6);
    } else {
      // Return recent jobs if no skills provided
      recommendedJobs = recommendedJobs.slice(0, 6);
    }
    
    return {
      jobs: recommendedJobs,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch recommended jobs');
  }
};