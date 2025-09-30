// Mock profile data
const mockAlumniProfiles = [
  {
    id: 1,
    name: 'Arjun Sharma',
    email: 'arjun.sharma@email.com',
    graduationYear: 2020,
    major: 'Computer Science',
    company: 'Infosys',
    position: 'Senior Software Engineer',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    profilePicture: '/api/placeholder/150/150',
    bio: 'Passionate software engineer with 3+ years of experience in full-stack development at leading Indian IT companies.',
    linkedin: 'https://linkedin.com/in/arjunsharma',
    location: 'Bangalore, Karnataka',
    phone: '+919876543210',
    github: 'https://github.com/arjunsharma',
    website: 'https://arjunsharma.dev'
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    graduationYear: 2019,
    major: 'Business Administration',
    company: 'Tata Consultancy Services',
    position: 'Marketing Manager',
    skills: ['Management', 'Strategy', 'Marketing', 'Analytics'],
    profilePicture: '/api/placeholder/150/150',
    bio: 'Strategic marketing professional focused on data-driven growth initiatives in Indian enterprises.',
    linkedin: 'https://linkedin.com/in/priyapatel',
    location: 'Mumbai, Maharashtra',
    phone: '+919876543211',
    github: 'https://github.com/priyapatel',
    website: 'https://priyapatel.com'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    graduationYear: 2018,
    major: 'Engineering',
    company: 'Flipkart',
    position: 'Product Manager',
    skills: ['Product Management', 'Engineering', 'Leadership'],
    profilePicture: '/api/placeholder/150/150',
    bio: 'Product manager bridging the gap between engineering and business in e-commerce.',
    linkedin: 'https://linkedin.com/in/vikramsingh',
    location: 'Bangalore, Karnataka',
    phone: '+919876543212',
    github: 'https://github.com/vikramsingh',
    website: 'https://mikejohnson.net'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    graduationYear: 2021,
    major: 'Design',
    company: 'Creative Agency',
    position: 'UX Designer',
    skills: ['UX Design', 'UI Design', 'Prototyping', 'Research'],
    profilePicture: '/api/placeholder/150/150',
    bio: 'User experience designer passionate about creating intuitive digital experiences.',
    linkedin: 'https://linkedin.com/in/sarahwilson',
    location: 'Seattle, WA',
    phone: '+1234567893',
    github: 'https://github.com/sarahwilson',
    website: 'https://sarahwilson.design'
  }
];

export const getAllProfiles = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      profiles: mockAlumniProfiles,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch alumni profiles');
  }
};

export const getProfileById = async (id) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let profile = mockAlumniProfiles.find(p => p.id === parseInt(id));
    
    // If profile doesn't exist, create a default one
    if (!profile) {
      profile = {
        id: parseInt(id),
        name: '',
        email: '',
        graduationYear: '',
        major: '',
        company: '',
        position: '',
        skills: [],
        profilePicture: '',
        bio: '',
        linkedin: '',
        location: '',
        phone: '',
        github: '',
        website: ''
      };
    }

    return {
      profile,
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch profile');
  }
};

export const updateProfile = async (id, updatedData) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const profileIndex = mockAlumniProfiles.findIndex(p => p.id === parseInt(id));
    
    if (profileIndex === -1) {
      throw new Error('Profile not found');
    }

    // Update the profile (in real app, this would update the database)
    mockAlumniProfiles[profileIndex] = {
      ...mockAlumniProfiles[profileIndex],
      ...updatedData,
      id: parseInt(id) // Ensure ID doesn't change
    };

    return {
      profile: mockAlumniProfiles[profileIndex],
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to update profile');
  }
};

export const searchProfiles = async (query, filters = {}) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let filteredProfiles = [...mockAlumniProfiles];

    // Apply search query
    if (query && query.trim()) {
      const searchTerm = query.toLowerCase();
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm) ||
        profile.major.toLowerCase().includes(searchTerm) ||
        profile.company.toLowerCase().includes(searchTerm) ||
        profile.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      );
    }

    // Apply graduation year filter
    if (filters.graduationYear) {
      filteredProfiles = filteredProfiles.filter(
        profile => profile.graduationYear === parseInt(filters.graduationYear)
      );
    }

    // Apply major filter
    if (filters.major) {
      filteredProfiles = filteredProfiles.filter(
        profile => profile.major.toLowerCase().includes(filters.major.toLowerCase())
      );
    }

    return {
      profiles: filteredProfiles,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to search profiles');
  }
};