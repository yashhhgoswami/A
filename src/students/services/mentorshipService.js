// Mock data for mentorship service
const mockMentors = [
  {
    id: 1,
    name: 'Priya Sharma',
    title: 'Senior Software Engineer',
    company: 'Infosys',
    graduationYear: 2018,
    expertise: ['Software Development', 'Machine Learning', 'Career Growth'],
    bio: 'Passionate about helping students navigate their tech career. 5+ years experience in software development at leading Indian IT companies.',
    rating: 4.9,
    totalMentees: 15,
    availableSlots: 3,
    profileImage: null,
    status: 'available'
  },
  {
    id: 2,
    name: 'Arjun Gupta',
    title: 'Product Manager',
    company: 'Flipkart',
    graduationYear: 2016,
    expertise: ['Product Management', 'Strategy', 'Leadership'],
    bio: 'Former startup founder turned PM at India\'s leading e-commerce platform. Love helping students explore entrepreneurship and product roles.',
    rating: 4.8,
    totalMentees: 22,
    availableSlots: 2,
    profileImage: null,
    status: 'available'
  },
  {
    id: 3,
    name: 'Dr. Kavita Nair',
    title: 'Research Scientist',
    company: 'Microsoft Research India',
    graduationYear: 2015,
    expertise: ['Research', 'AI/ML', 'PhD Guidance'],
    bio: 'PhD in Computer Science from IIT Delhi. Specialized in AI research and can guide students interested in research careers.',
    rating: 4.9,
    totalMentees: 8,
    availableSlots: 1,
    profileImage: null,
    status: 'available'
  },
  {
    id: 4,
    name: 'Rohan Mehta',
    title: 'UX Designer',
    company: 'Paytm',
    graduationYear: 2019,
    expertise: ['UX Design', 'Creative Thinking', 'Portfolio Building'],
    bio: 'Creative problem solver passionate about user experience. Happy to help with design portfolios.',
    rating: 4.7,
    totalMentees: 12,
    availableSlots: 0,
    profileImage: null,
    status: 'busy'
  }
];

const mockMentorshipRequests = [
  {
    id: 1,
    studentId: 1,
    mentorId: 1,
    status: 'pending',
    requestDate: '2025-09-25',
    message: 'Hi Sarah, I\'m interested in transitioning to software engineering and would love your guidance.',
    goals: ['Learn programming skills', 'Career transition', 'Interview preparation']
  },
  {
    id: 2,
    studentId: 1,
    mentorId: 2,
    status: 'accepted',
    requestDate: '2025-09-20',
    acceptedDate: '2025-09-22',
    message: 'Hello Michael, I\'m exploring product management as a career path.',
    goals: ['Understand PM role', 'Build product portfolio', 'Network in industry']
  }
];

const mockActiveMentorships = [
  {
    id: 1,
    studentId: 1,
    mentorId: 2,
    startDate: '2025-09-22',
    status: 'active',
    nextSession: '2025-10-05',
    totalSessions: 3,
    goals: ['Understand PM role', 'Build product portfolio', 'Network in industry'],
    progress: 40
  }
];

export const getAllMentors = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      mentors: mockMentors,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch mentors');
  }
};

export const getMentorById = async (mentorId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mentor = mockMentors.find(m => m.id === parseInt(mentorId));
    if (!mentor) {
      throw new Error('Mentor not found');
    }
    
    return {
      mentor,
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch mentor details');
  }
};

export const requestMentorship = async (mentorId, studentId, message, goals) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const mentor = mockMentors.find(m => m.id === parseInt(mentorId));
    if (!mentor) {
      throw new Error('Mentor not found');
    }
    
    if (mentor.availableSlots <= 0) {
      throw new Error('This mentor has no available slots at the moment');
    }
    
    // Check if already requested
    const existingRequest = mockMentorshipRequests.find(
      r => r.studentId === parseInt(studentId) && r.mentorId === parseInt(mentorId)
    );
    
    if (existingRequest) {
      throw new Error('You have already sent a request to this mentor');
    }
    
    const newRequest = {
      id: mockMentorshipRequests.length + 1,
      studentId: parseInt(studentId),
      mentorId: parseInt(mentorId),
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      message,
      goals
    };
    
    mockMentorshipRequests.push(newRequest);
    
    return {
      message: `Mentorship request sent to ${mentor.name}! They will review and respond soon.`,
      request: newRequest,
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to send mentorship request');
  }
};

export const getStudentMentorshipRequests = async (studentId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const requests = mockMentorshipRequests
      .filter(r => r.studentId === parseInt(studentId))
      .map(request => {
        const mentor = mockMentors.find(m => m.id === request.mentorId);
        return {
          ...request,
          mentor
        };
      });
    
    return {
      requests,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch mentorship requests');
  }
};

export const getActiveMentorships = async (studentId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mentorships = mockActiveMentorships
      .filter(m => m.studentId === parseInt(studentId))
      .map(mentorship => {
        const mentor = mockMentors.find(m => m.id === mentorship.mentorId);
        return {
          ...mentorship,
          mentor
        };
      });
    
    return {
      mentorships,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch active mentorships');
  }
};

export const cancelMentorshipRequest = async (requestId, studentId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const requestIndex = mockMentorshipRequests.findIndex(
      r => r.id === parseInt(requestId) && r.studentId === parseInt(studentId)
    );
    
    if (requestIndex === -1) {
      throw new Error('Request not found');
    }
    
    mockMentorshipRequests.splice(requestIndex, 1);
    
    return {
      message: 'Mentorship request cancelled successfully',
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to cancel request');
  }
};