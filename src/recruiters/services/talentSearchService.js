// Talent Search Service
export const searchTalent = async (searchQuery, filters) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sample response
    return {
      success: true,
      candidates: [
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          phone: '+1 (555) 123-4567',
          title: 'Full Stack Developer',
          university: 'MIT',
          graduation: '2021',
          experience: '3 years',
          location: 'Boston, MA',
          skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB'],
          rating: 4.8,
          availability: 'Available',
          currentCompany: 'TechStart Inc.',
          summary: 'Passionate full-stack developer with expertise in modern web technologies.',
          projects: 3,
          certifications: ['AWS Certified', 'React Professional']
        }
        // More candidates...
      ],
      totalCount: 25,
      page: 1,
      totalPages: 3
    };
  } catch (error) {
    console.error('Error searching talent:', error);
    throw new Error('Failed to search talent');
  }
};

export const getCandidateById = async (candidateId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      candidate: {
        id: candidateId,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 123-4567',
        title: 'Full Stack Developer',
        university: 'MIT',
        graduation: '2021',
        experience: '3 years',
        location: 'Boston, MA',
        skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB'],
        rating: 4.8,
        availability: 'Available',
        currentCompany: 'TechStart Inc.',
        summary: 'Passionate full-stack developer with expertise in modern web technologies.',
        portfolio: 'https://sarahjohnson.dev',
        linkedin: 'https://linkedin.com/in/sarahj',
        github: 'https://github.com/sarahj',
        education: [
          {
            degree: 'Bachelor of Science in Computer Science',
            university: 'MIT',
            year: '2021',
            gpa: '3.8/4.0'
          }
        ],
        workExperience: [
          {
            title: 'Full Stack Developer',
            company: 'TechStart Inc.',
            duration: '2022 - Present',
            description: 'Developed and maintained web applications using React and Node.js'
          }
        ],
        projects: [
          {
            name: 'E-commerce Platform',
            description: 'Built a full-stack e-commerce platform using MERN stack',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
            link: 'https://github.com/sarahj/ecommerce'
          }
        ],
        certifications: ['AWS Certified Developer', 'React Professional Certification']
      }
    };
  } catch (error) {
    console.error('Error fetching candidate:', error);
    throw new Error('Failed to fetch candidate details');
  }
};

export const saveTalent = async (candidateId) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      message: 'Candidate saved successfully'
    };
  } catch (error) {
    console.error('Error saving candidate:', error);
    throw new Error('Failed to save candidate');
  }
};

export const getSavedTalent = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      candidates: [
        // List of saved candidates
      ]
    };
  } catch (error) {
    console.error('Error fetching saved talent:', error);
    throw new Error('Failed to fetch saved talent');
  }
};