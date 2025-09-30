import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecruiterNavbar from '../components/RecruiterNavbar';
import RecruiterSidebar from '../components/RecruiterSidebar';
import { 
  MdAutoAwesome,
  MdWork,
  MdStar,
  MdLocationOn,
  MdSchool,
  MdPsychology,
  MdEmail,
  MdPhone,
  MdBookmark,
  MdBookmarkBorder,
  MdRefresh,
  MdTune,
  MdClose
} from 'react-icons/md';

const CandidateMatchingScreen = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState('');
  const [matchingResults, setMatchingResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedMatches, setSavedMatches] = useState(new Set());
  const [showSettings, setShowSettings] = useState(false);
  const [matchingCriteria, setMatchingCriteria] = useState({
    skillsWeight: 40,
    experienceWeight: 30,
    educationWeight: 20,
    locationWeight: 10,
    minMatchScore: 70
  });

  // Sample jobs for selection
  const availableJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      requirements: ['React', 'Node.js', 'TypeScript', '5+ years experience'],
      type: 'full-time'
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Remote',
      requirements: ['Product Strategy', 'Analytics', 'Agile', '3+ years experience'],
      type: 'full-time'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'Analytics Pro',
      location: 'New York, NY',
      requirements: ['Python', 'Machine Learning', 'SQL', '2+ years experience'],
      type: 'full-time'
    }
  ];

  // Sample matching results with AI scores
  const generateMatchingResults = (jobId) => {
    const sampleMatches = [
      {
        id: 1,
        name: 'Sarah Johnson',
        title: 'Full Stack Developer',
        university: 'MIT',
        experience: '3 years',
        location: 'Boston, MA',
        skills: ['React', 'Node.js', 'Python', 'TypeScript', 'AWS'],
        rating: 4.8,
        email: 'sarah.j@email.com',
        phone: '+1 (555) 123-4567',
        matchScore: 92,
        strengths: ['Perfect skill match', 'Strong technical background', 'Excellent ratings'],
        concerns: ['Location distance'],
        skillsMatch: 95,
        experienceMatch: 85,
        educationMatch: 98,
        locationMatch: 75,
        availability: 'Available',
        salary: '$120,000 - $140,000'
      },
      {
        id: 2,
        name: 'Michael Chen',
        title: 'Software Engineer',
        university: 'Stanford University',
        experience: '2 years',
        location: 'Palo Alto, CA',
        skills: ['React', 'Java', 'Spring Boot', 'AWS', 'Docker'],
        rating: 4.7,
        email: 'michael.c@email.com',
        phone: '+1 (555) 234-5678',
        matchScore: 88,
        strengths: ['Good skill alignment', 'Top university', 'Growing experience'],
        concerns: ['Less experience than ideal'],
        skillsMatch: 90,
        experienceMatch: 75,
        educationMatch: 95,
        locationMatch: 95,
        availability: 'Available',
        salary: '$100,000 - $120,000'
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        title: 'Frontend Developer',
        university: 'UC Berkeley',
        experience: '4 years',
        location: 'San Francisco, CA',
        skills: ['React', 'TypeScript', 'Vue.js', 'CSS', 'UI/UX'],
        rating: 4.9,
        email: 'emily.r@email.com',
        phone: '+1 (555) 345-6789',
        matchScore: 85,
        strengths: ['Frontend expertise', 'Perfect location', 'Excellent reviews'],
        concerns: ['Limited backend experience'],
        skillsMatch: 80,
        experienceMatch: 90,
        educationMatch: 88,
        locationMatch: 100,
        availability: 'Open to opportunities',
        salary: '$110,000 - $130,000'
      },
      {
        id: 4,
        name: 'Alex Thompson',
        title: 'Backend Developer',
        university: 'Carnegie Mellon',
        experience: '5 years',
        location: 'Seattle, WA',
        skills: ['Node.js', 'Python', 'PostgreSQL', 'Microservices', 'Kubernetes'],
        rating: 4.6,
        email: 'alex.t@email.com',
        phone: '+1 (555) 456-7890',
        matchScore: 82,
        strengths: ['Strong backend skills', 'Extensive experience', 'System design'],
        concerns: ['Limited frontend experience', 'Location'],
        skillsMatch: 85,
        experienceMatch: 95,
        educationMatch: 90,
        locationMatch: 65,
        availability: 'Available',
        salary: '$130,000 - $150,000'
      },
      {
        id: 5,
        name: 'Jessica Park',
        title: 'Software Engineer',
        university: 'UCLA',
        experience: '3 years',
        location: 'Los Angeles, CA',
        skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Git'],
        rating: 4.5,
        email: 'jessica.p@email.com',
        phone: '+1 (555) 567-8901',
        matchScore: 78,
        strengths: ['Good full-stack skills', 'Solid experience', 'Team player'],
        concerns: ['Distance from office', 'No TypeScript experience'],
        skillsMatch: 78,
        experienceMatch: 80,
        educationMatch: 85,
        locationMatch: 70,
        availability: 'Available',
        salary: '$105,000 - $125,000'
      }
    ];

    return sampleMatches.filter(match => match.matchScore >= matchingCriteria.minMatchScore)
                      .sort((a, b) => b.matchScore - a.matchScore);
  };

  const handleJobSelection = (jobId) => {
    setSelectedJob(jobId);
    setLoading(true);
    
    // Simulate AI matching process
    setTimeout(() => {
      const results = generateMatchingResults(jobId);
      setMatchingResults(results);
      setLoading(false);
    }, 2000);
  };

  const toggleSaveMatch = (candidateId) => {
    const newSaved = new Set(savedMatches);
    if (newSaved.has(candidateId)) {
      newSaved.delete(candidateId);
    } else {
      newSaved.add(candidateId);
    }
    setSavedMatches(newSaved);
  };

  const refreshMatches = () => {
    if (selectedJob) {
      handleJobSelection(selectedJob);
    }
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getMatchLabel = (score) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 80) return 'Good Match';
    if (score >= 70) return 'Fair Match';
    return 'Poor Match';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />
      
      <div className="flex pt-16">
        <RecruiterSidebar />
        
        <div className="flex-1 ml-72">
          {/* Header */}
          <div className="bg-white shadow-sm border-b px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <MdAutoAwesome className="text-orange-600 mr-2" />
                  AI Candidate Matching
                </h1>
                <p className="text-gray-600">Get AI-powered recommendations for your job openings</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <MdTune className="mr-1" />
                  Settings
                </button>
                {selectedJob && (
                  <button
                    onClick={refreshMatches}
                    className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    <MdRefresh className="mr-1" />
                    Refresh
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Job Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Job Position</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => handleJobSelection(job.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedJob === job.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">{job.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <MdLocationOn className="mr-1" />
                      {job.location}
                    </div>
                    <div className="space-y-1">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-1">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Matching Results */}
            {selectedJob && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <MdPsychology className="text-purple-600 mr-2" />
                      AI Matching Results
                    </h3>
                    {!loading && matchingResults.length > 0 && (
                      <span className="text-sm text-gray-600">
                        {matchingResults.length} candidates found
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">AI is analyzing candidates...</h3>
                      <p className="text-gray-600">This may take a few moments</p>
                      <div className="mt-4 space-y-2 text-sm text-gray-500">
                        <p>🔍 Analyzing skills compatibility...</p>
                        <p>📊 Calculating experience match...</p>
                        <p>🎓 Evaluating education background...</p>
                        <p>📍 Considering location preferences...</p>
                      </div>
                    </div>
                  ) : matchingResults.length === 0 ? (
                    <div className="text-center py-12">
                      <MdAutoAwesome className="mx-auto text-4xl text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Select a job to see AI matches</h3>
                      <p className="text-gray-600">Our AI will analyze and rank candidates based on job requirements</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {matchingResults.map((candidate, index) => (
                        <div key={candidate.id} className="border border-gray-200 rounded-lg p-6 relative">
                          {/* Match Badge */}
                          <div className="absolute top-4 right-4 flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(candidate.matchScore)}`}>
                              {candidate.matchScore}% Match
                            </span>
                            <button
                              onClick={() => toggleSaveMatch(candidate.id)}
                              className="p-1 text-gray-400 hover:text-orange-600"
                            >
                              {savedMatches.has(candidate.id) ? <MdBookmark /> : <MdBookmarkBorder />}
                            </button>
                          </div>

                          {/* Rank Badge */}
                          <div className="absolute top-4 left-4 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            #{index + 1}
                          </div>

                          {/* Candidate Info */}
                          <div className="ml-12 mr-24">
                            <div className="flex items-start space-x-4 mb-4">
                              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-orange-600 font-semibold text-lg">
                                  {candidate.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="flex-1">
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
                                  <span className="flex items-center">
                                    <MdStar className="mr-1 text-yellow-400" />
                                    {candidate.rating}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* AI Match Breakdown */}
                            <div className="mb-4">
                              <h5 className="text-sm font-medium text-gray-900 mb-3">AI Match Breakdown</h5>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                  <div className="text-lg font-bold text-blue-600">{candidate.skillsMatch}%</div>
                                  <div className="text-xs text-gray-500">Skills</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-green-600">{candidate.experienceMatch}%</div>
                                  <div className="text-xs text-gray-500">Experience</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-purple-600">{candidate.educationMatch}%</div>
                                  <div className="text-xs text-gray-500">Education</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-orange-600">{candidate.locationMatch}%</div>
                                  <div className="text-xs text-gray-500">Location</div>
                                </div>
                              </div>
                            </div>

                            {/* Skills */}
                            <div className="mb-4">
                              <h5 className="text-sm font-medium text-gray-900 mb-2">Skills</h5>
                              <div className="flex flex-wrap gap-1">
                                {candidate.skills.map((skill, skillIndex) => (
                                  <span key={skillIndex} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* AI Insights */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h5 className="text-sm font-medium text-green-700 mb-2">✅ Strengths</h5>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  {candidate.strengths.map((strength, strengthIndex) => (
                                    <li key={strengthIndex}>• {strength}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-orange-700 mb-2">⚠️ Considerations</h5>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  {candidate.concerns.map((concern, concernIndex) => (
                                    <li key={concernIndex}>• {concern}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Additional Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Availability:</span>
                                <p className="font-medium text-green-600">{candidate.availability}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Salary Expectation:</span>
                                <p className="font-medium text-gray-900">{candidate.salary}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Match Quality:</span>
                                <p className={`font-medium ${getMatchColor(candidate.matchScore).split(' ')[0]}`}>
                                  {getMatchLabel(candidate.matchScore)}
                                </p>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                              <div className="flex space-x-2">
                                <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                  <MdEmail className="mr-1" />
                                  Contact
                                </button>
                                <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                  <MdPhone className="mr-1" />
                                  Call
                                </button>
                              </div>
                              <button
                                onClick={() => navigate(`/recruiters/candidates/${candidate.id}`)}
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                              >
                                View Full Profile
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Matching Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">AI Matching Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MdClose className="text-xl" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills Weight: {matchingCriteria.skillsWeight}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={matchingCriteria.skillsWeight}
                    onChange={(e) => setMatchingCriteria({
                      ...matchingCriteria,
                      skillsWeight: parseInt(e.target.value)
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Weight: {matchingCriteria.experienceWeight}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={matchingCriteria.experienceWeight}
                    onChange={(e) => setMatchingCriteria({
                      ...matchingCriteria,
                      experienceWeight: parseInt(e.target.value)
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education Weight: {matchingCriteria.educationWeight}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={matchingCriteria.educationWeight}
                    onChange={(e) => setMatchingCriteria({
                      ...matchingCriteria,
                      educationWeight: parseInt(e.target.value)
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Weight: {matchingCriteria.locationWeight}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={matchingCriteria.locationWeight}
                    onChange={(e) => setMatchingCriteria({
                      ...matchingCriteria,
                      locationWeight: parseInt(e.target.value)
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Match Score: {matchingCriteria.minMatchScore}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    value={matchingCriteria.minMatchScore}
                    onChange={(e) => setMatchingCriteria({
                      ...matchingCriteria,
                      minMatchScore: parseInt(e.target.value)
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowSettings(false);
                      if (selectedJob) {
                        refreshMatches();
                      }
                    }}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Apply Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateMatchingScreen;