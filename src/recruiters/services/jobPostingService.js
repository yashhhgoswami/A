// Job Posting Service
export const createJobPosting = async (jobData) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newJob = {
      id: Date.now(),
      ...jobData,
      status: 'active',
      applications: 0,
      views: 0,
      postedDate: new Date().toISOString().split('T')[0],
      skills: typeof jobData.skills === 'string' 
        ? jobData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
        : jobData.skills || []
    };
    
    return {
      success: true,
      job: newJob,
      message: 'Job posted successfully'
    };
  } catch (error) {
    console.error('Error creating job posting:', error);
    throw new Error('Failed to create job posting');
  }
};

export const updateJobPosting = async (jobId, jobData) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      job: {
        id: jobId,
        ...jobData,
        lastModified: new Date().toISOString().split('T')[0]
      },
      message: 'Job updated successfully'
    };
  } catch (error) {
    console.error('Error updating job posting:', error);
    throw new Error('Failed to update job posting');
  }
};

export const deleteJobPosting = async (jobId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: 'Job deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting job posting:', error);
    throw new Error('Failed to delete job posting');
  }
};

export const getJobPostings = async (recruiterId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      jobs: [
        {
          id: 1,
          title: 'Senior Software Engineer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          type: 'full-time',
          experience: '3-5 years',
          salary: '$120,000 - $150,000',
          applications: 45,
          views: 234,
          status: 'active',
          postedDate: '2024-01-15',
          description: 'We are looking for a talented Senior Software Engineer to join our growing team...',
          requirements: 'Bachelor\'s degree in Computer Science, 3+ years of experience with React and Node.js',
          skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
          remote: true,
          urgent: false
        },
        {
          id: 2,
          title: 'Product Manager',
          company: 'Innovation Labs',
          location: 'Remote',
          type: 'full-time',
          experience: '5+ years',
          salary: '$140,000 - $180,000',
          applications: 32,
          views: 189,
          status: 'active',
          postedDate: '2024-01-12',
          description: 'Join our product team to drive innovation and growth...',
          requirements: 'MBA or equivalent experience, 5+ years in product management',
          skills: ['Product Strategy', 'Analytics', 'Agile', 'Leadership'],
          remote: true,
          urgent: true
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching job postings:', error);
    throw new Error('Failed to fetch job postings');
  }
};

export const getJobById = async (jobId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      job: {
        id: jobId,
        title: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'full-time',
        experience: '3-5 years',
        salary: '$120,000 - $150,000',
        applications: 45,
        views: 234,
        status: 'active',
        postedDate: '2024-01-15',
        description: 'We are looking for a talented Senior Software Engineer to join our growing team. You will be responsible for developing and maintaining web applications, collaborating with cross-functional teams, and mentoring junior developers.',
        requirements: 'Bachelor\'s degree in Computer Science or related field, 3+ years of experience with React and Node.js, strong problem-solving skills',
        benefits: 'Health insurance, 401k matching, flexible hours, remote work options, professional development budget',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        remote: true,
        urgent: false
      }
    };
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw new Error('Failed to fetch job details');
  }
};

export const toggleJobStatus = async (jobId, newStatus) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      job: {
        id: jobId,
        status: newStatus,
        lastModified: new Date().toISOString().split('T')[0]
      },
      message: `Job ${newStatus === 'active' ? 'activated' : 'paused'} successfully`
    };
  } catch (error) {
    console.error('Error toggling job status:', error);
    throw new Error('Failed to update job status');
  }
};

export const getJobApplications = async (jobId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      applications: [
        {
          id: 1,
          candidateId: 1,
          candidateName: 'Sarah Johnson',
          candidateEmail: 'sarah.j@email.com',
          appliedDate: '2024-01-16',
          status: 'pending',
          coverLetter: 'I am excited to apply for this position...',
          resumeUrl: '/resumes/sarah_johnson_resume.pdf'
        },
        {
          id: 2,
          candidateId: 2,
          candidateName: 'Michael Chen',
          candidateEmail: 'michael.c@email.com',
          appliedDate: '2024-01-17',
          status: 'reviewed',
          coverLetter: 'With my background in software development...',
          resumeUrl: '/resumes/michael_chen_resume.pdf'
        }
      ],
      totalApplications: 45
    };
  } catch (error) {
    console.error('Error fetching job applications:', error);
    throw new Error('Failed to fetch job applications');
  }
};