// Mock authentication service
const mockUsers = [
  {
    id: 1,
    email: 'arjun.sharma@email.com',
    password: 'password123',
    name: 'Arjun Sharma',
    role: 'Alumni',
    graduationYear: 2020,
    major: 'Computer Science',
    company: 'Infosys',
    skills: ['JavaScript', 'React', 'Node.js']
  },
  {
    id: 2,
    email: 'priya.patel@email.com',
    password: 'password123',
    name: 'Priya Patel',
    role: 'Alumni',
    graduationYear: 2019,
    major: 'Business Administration',
    company: 'Tata Consultancy Services',
    skills: ['Management', 'Strategy', 'Marketing']
  },
  {
    id: 3,
    email: 'students@email.com',
    password: 'students123',
    name: 'Rahul Kumar',
    role: 'Student',
    graduationYear: 2025,
    major: 'Computer Science',
    currentYear: 'Final Year',
    gpa: 8.5,
    skills: ['Python', 'JavaScript', 'React', 'Machine Learning']
  },
  {
    id: 4,
    email: 'student2@email.com',
    password: 'student123',
    name: 'Sneha Agarwal',
    role: 'Student',
    graduationYear: 2026,
    major: 'Data Science',
    currentYear: 'Third Year',
    gpa: 8.9,
    skills: ['Python', 'R', 'SQL', 'Statistics']
  },
  {
    id: 5,
    email: 'student@university.edu',
    password: 'student2025',
    name: 'Vikram Singh',
    role: 'Student',
    graduationYear: 2025,
    major: 'Computer Engineering',
    currentYear: 'Final Year',
    gpa: 8.2,
    skills: ['Java', 'Python', 'C++', 'Web Development']
  },
  {
    id: 6,
    email: 'institute@university.edu',
    password: 'institute123',
    name: 'Dr. Amit Gupta',
    role: 'Institute',
    institution: 'Indian Institute of Technology',
    department: 'Alumni Relations Office',
    position: 'Director, Alumni Affairs',
    phone: '+91-9876543210',
    location: 'Mumbai, Maharashtra'
  },
  {
    id: 7,
    email: 'admin@university.ac.in',
    password: 'admin123',
    name: 'Prof. Sunita Verma',
    role: 'Institute',
    institution: 'Delhi University',
    department: 'Student Affairs',
    position: 'Dean, Student Affairs',
    phone: '+91-9876543211',
    location: 'New Delhi, Delhi'
  },
  {
    id: 8,
    email: 'recruiter@infosys.com',
    password: 'recruiter123',
    name: 'Rajesh Krishnan',
    role: 'Recruiter',
    company: 'Infosys Limited',
    position: 'Senior Talent Acquisition Manager',
    department: 'Human Resources',
    phone: '+91-9876543212',
    location: 'Bangalore, Karnataka',
    specialization: ['Software Engineering', 'Data Science', 'Cloud Computing']
  },
  {
    id: 9,
    email: 'hr@tcs.com',
    password: 'recruiter123',
    name: 'Meera Joshi',
    role: 'Recruiter',
    company: 'Tata Consultancy Services',
    position: 'Lead Recruiter',
    department: 'Talent Acquisition',
    phone: '+91-9876543213',
    location: 'Pune, Maharashtra',
    specialization: ['Business Analysis', 'Project Management', 'Digital Transformation']
  }
];

export const login = async (email, password) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock data
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    // Generate mock token
    const token = `mock-token-${user.id}-${Date.now()}`;
    
    return {
      user: userWithoutPassword,
      token,
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

export const register = async (userData) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create new user (in real app, this would be saved to database)
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      company: '',
      skills: []
    };

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Generate mock token
    const token = `mock-token-${newUser.id}-${Date.now()}`;
    
    // Add to mock data (temporary for this session)
    mockUsers.push(newUser);
    
    return {
      user: userWithoutPassword,
      token,
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
};

export const logout = async () => {
  // In a real app, this might invalidate the token on the server
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      throw new Error('No authentication found');
    }

    return {
      user: JSON.parse(user),
      token,
      success: true
    };
  } catch (error) {
    throw new Error('Authentication check failed');
  }
};