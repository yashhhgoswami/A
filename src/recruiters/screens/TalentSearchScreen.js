import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecruiterNavbar from '../components/RecruiterNavbar';
import RecruiterSidebar from '../components/RecruiterSidebar';
import { 
  MdSearch,
  MdFilterList,
  MdLocationOn,
  MdSchool,
  MdWork,
  MdStar,
  MdEmail,
  MdPhone,
  MdDownload,
  MdBookmark,
  MdBookmarkBorder,
  MdClose
} from 'react-icons/md';

const TalentSearchScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    skills: [],
    university: '',
    availability: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [savedCandidates, setSavedCandidates] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Sample candidate data
  const sampleCandidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Full Stack Developer',
      university: 'MIT',
      graduation: '2021',
      experience: '3 years',
      location: 'Boston, MA',
      skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB'],
      rating: 4.8,
      email: 'sarah.j@email.com',
      phone: '+1 (555) 123-4567',
      availability: 'Available',
      currentCompany: 'TechStart Inc.',
      summary: 'Passionate full-stack developer with expertise in modern web technologies and cloud platforms.',
      projects: 3,
      certifications: ['AWS Certified', 'React Professional']
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Software Engineer',
      university: 'Stanford University',
      graduation: '2022',
      experience: '2 years',
      location: 'Palo Alto, CA',
      skills: ['Java', 'Spring Boot', 'Kubernetes', 'PostgreSQL', 'Docker'],
      rating: 4.7,
      email: 'michael.c@email.com',
      phone: '+1 (555) 234-5678',
      availability: 'Available',
      currentCompany: 'Google',
      summary: 'Backend-focused engineer with strong system design skills and cloud native experience.',
      projects: 5,
      certifications: ['Google Cloud Professional', 'Kubernetes Admin']
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Product Designer',
      university: 'UC Berkeley',
      graduation: '2020',
      experience: '4 years',
      location: 'San Francisco, CA',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Design Systems'],
      rating: 4.9,
      email: 'emily.r@email.com',
      phone: '+1 (555) 345-6789',
      availability: 'Available',
      currentCompany: 'Airbnb',
      summary: 'Creative designer with a passion for user-centered design and innovative product experiences.',
      projects: 8,
      certifications: ['Google UX Design', 'Adobe Certified Expert']
    },
    {
      id: 4,
      name: 'Alex Thompson',
      title: 'Data Scientist',
      university: 'Carnegie Mellon',
      graduation: '2019',
      experience: '5 years',
      location: 'Pittsburgh, PA',
      skills: ['Python', 'TensorFlow', 'SQL', 'R', 'Machine Learning', 'Statistics'],
      rating: 4.6,
      email: 'alex.t@email.com',
      phone: '+1 (555) 456-7890',
      availability: 'Open to opportunities',
      currentCompany: 'Microsoft',
      summary: 'Data scientist specializing in machine learning and predictive analytics with industry experience.',
      projects: 12,
      certifications: ['Microsoft Data Scientist', 'Tensorflow Developer']
    }
  ];

  useEffect(() => {
    // Load candidates on component mount
    setCandidates(sampleCandidates);
  }, [sampleCandidates]);

  const handleSearch = () => {
    setLoading(true);
    // Simulate search delay
    setTimeout(() => {
      let filteredCandidates = sampleCandidates;

      if (searchQuery) {
        filteredCandidates = filteredCandidates.filter(candidate =>
          candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      if (filters.location) {
        filteredCandidates = filteredCandidates.filter(candidate =>
          candidate.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.experience) {
        filteredCandidates = filteredCandidates.filter(candidate =>
          candidate.experience.includes(filters.experience)
        );
      }

      if (filters.university) {
        filteredCandidates = filteredCandidates.filter(candidate =>
          candidate.university.toLowerCase().includes(filters.university.toLowerCase())
        );
      }

      setCandidates(filteredCandidates);
      setLoading(false);
    }, 1000);
  };

  const toggleSaveCandidate = (candidateId) => {
    const newSaved = new Set(savedCandidates);
    if (newSaved.has(candidateId)) {
      newSaved.delete(candidateId);
    } else {
      newSaved.add(candidateId);
    }
    setSavedCandidates(newSaved);
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      experience: '',
      skills: [],
      university: '',
      availability: ''
    });
    setSearchQuery('');
    setCandidates(sampleCandidates);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />
      
      <div className="flex pt-16">
        <RecruiterSidebar />
        
        <div className="flex-1 ml-72">
          {/* Header */}
          <div className="bg-white shadow-sm border-b px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Talent Search</h1>
            <p className="text-gray-600">Find the perfect candidates for your open positions</p>
          </div>

          <div className="p-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              {/* Search Bar */}
              <div className="flex space-x-4 mb-4">
                <div className="flex-1 relative">
                  <MdSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, title, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <MdFilterList />
                  <span>Filters</span>
                </button>
                <button
                  onClick={handleSearch}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Search
                </button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="border-t pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="City, State"
                        value={filters.location}
                        onChange={(e) => setFilters({...filters, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                      <select
                        value={filters.experience}
                        onChange={(e) => setFilters({...filters, experience: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Any</option>
                        <option value="1">1-2 years</option>
                        <option value="3">3-5 years</option>
                        <option value="5">5+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                      <input
                        type="text"
                        placeholder="University name"
                        value={filters.university}
                        onChange={(e) => setFilters({...filters, university: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                      <select
                        value={filters.availability}
                        onChange={(e) => setFilters({...filters, availability: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Any</option>
                        <option value="Available">Available</option>
                        <option value="Open to opportunities">Open to opportunities</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={clearFilters}
                        className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        <MdClose className="mr-1" />
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Results Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {loading ? 'Searching...' : `${candidates.length} Candidates Found`}
                  </h3>
                  <div className="flex space-x-2 text-sm">
                    <button className="text-orange-600 hover:text-orange-700">Sort by Relevance</button>
                    <span className="text-gray-300">|</span>
                    <button className="text-gray-600 hover:text-orange-600">Sort by Rating</button>
                  </div>
                </div>
              </div>

              {/* Candidates List */}
              <div className="p-6">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Searching for candidates...</p>
                  </div>
                ) : candidates.length === 0 ? (
                  <div className="text-center py-12">
                    <MdSearch className="mx-auto text-4xl text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {candidates.map((candidate) => (
                      <div key={candidate.id} className="border border-gray-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
                        {/* Candidate Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                              <span className="text-orange-600 font-semibold text-lg">
                                {candidate.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-xl font-semibold text-gray-900">{candidate.name}</h4>
                              <p className="text-gray-600 mb-1">{candidate.title}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <MdLocationOn className="mr-1" />
                                  {candidate.location}
                                </span>
                                <span className="flex items-center">
                                  <MdWork className="mr-1" />
                                  {candidate.experience}
                                </span>
                                <span className="flex items-center">
                                  <MdSchool className="mr-1" />
                                  {candidate.university}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <MdStar className="text-yellow-400" />
                              <span className="ml-1 text-sm font-medium">{candidate.rating}</span>
                            </div>
                            <button
                              onClick={() => toggleSaveCandidate(candidate.id)}
                              className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                            >
                              {savedCandidates.has(candidate.id) ? <MdBookmark /> : <MdBookmarkBorder />}
                            </button>
                          </div>
                        </div>

                        {/* Candidate Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <p className="text-gray-700 mb-3">{candidate.summary}</p>
                            
                            {/* Skills */}
                            <div className="mb-3">
                              <h5 className="text-sm font-medium text-gray-900 mb-2">Skills</h5>
                              <div className="flex flex-wrap gap-1">
                                {candidate.skills.map((skill, index) => (
                                  <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Additional Info */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Current Company:</span>
                                <p className="font-medium text-gray-900">{candidate.currentCompany}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Availability:</span>
                                <p className="font-medium text-green-600">{candidate.availability}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Projects:</span>
                                <p className="font-medium text-gray-900">{candidate.projects}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Graduated:</span>
                                <p className="font-medium text-gray-900">{candidate.graduation}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            {/* Contact Actions */}
                            <div className="space-y-3">
                              <button 
                                onClick={() => navigate(`/recruiters/candidates/${candidate.id}`)}
                                className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                              >
                                View Full Profile
                              </button>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                                  <MdEmail className="mr-1" />
                                  Email
                                </button>
                                <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                                  <MdPhone className="mr-1" />
                                  Call
                                </button>
                              </div>
                              
                              <button className="w-full flex items-center justify-center py-2 px-4 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 text-sm">
                                <MdDownload className="mr-1" />
                                Download Resume
                              </button>
                            </div>

                            {/* Certifications */}
                            {candidate.certifications && candidate.certifications.length > 0 && (
                              <div className="mt-4">
                                <h5 className="text-sm font-medium text-gray-900 mb-2">Certifications</h5>
                                <div className="space-y-1">
                                  {candidate.certifications.map((cert, index) => (
                                    <div key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                      {cert}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentSearchScreen;