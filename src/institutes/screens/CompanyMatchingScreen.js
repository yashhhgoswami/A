import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstituteNavbar from '../components/InstituteNavbar';
import InstituteSidebar from '../components/InstituteSidebar';
import { 
  MdAutoAwesome,
  MdBusiness,
  MdStar,
  MdLocationOn,
  MdWork,
  MdPsychology,
  MdEmail,
  MdPhone,
  MdBookmark,
  MdBookmarkBorder,
  MdRefresh,
  MdTune,
  MdClose,
  MdAttachMoney,
  MdPeople
} from 'react-icons/md';

const CompanyMatchingScreen = () => {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [matchingResults, setMatchingResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedMatches, setSavedMatches] = useState(new Set());
  const [showSettings, setShowSettings] = useState(false);
  const [matchingCriteria, setMatchingCriteria] = useState({
    industryWeight: 35,
    salaryWeight: 25,
    locationWeight: 20,
    companyRatingWeight: 20,
    minMatchScore: 70
  });

  // Sample departments for selection
  const availableDepartments = [
    {
      id: 1,
      name: 'Computer Science & Engineering',
      students: 450,
      averageGPA: 8.5,
      skills: ['Programming', 'Data Structures', 'Algorithms', 'Software Development'],
      placementRate: 95
    },
    {
      id: 2,
      name: 'Electronics & Communication',
      students: 320,
      averageGPA: 8.2,
      skills: ['Circuit Design', 'Signal Processing', 'Embedded Systems', 'VLSI'],
      placementRate: 88
    },
    {
      id: 3,
      name: 'Mechanical Engineering',
      students: 280,
      averageGPA: 7.8,
      skills: ['CAD', 'Manufacturing', 'Thermodynamics', 'Design'],
      placementRate: 82
    }
  ];

  // Sample matching results with AI scores
  const generateMatchingResults = (deptId) => {
    const sampleMatches = [
      {
        id: 1,
        name: 'TechCorp Solutions',
        industry: 'Software Development',
        location: 'Bangalore, India',
        rating: 4.8,
        employeeCount: '5000+',
        packageRange: '₹8-25 LPA',
        positions: 50,
        requirements: ['B.Tech in CS/IT', '3.5+ GPA', 'Programming Skills'],
        email: 'hr@techcorp.com',
        phone: '+91 80 1234 5678',
        matchScore: 95,
        strengths: ['Perfect skill alignment', 'High package range', 'Excellent growth'],
        concerns: ['Competitive selection process'],
        industryMatch: 98,
        salaryMatch: 92,
        locationMatch: 90,
        ratingMatch: 96,
        companyType: 'Product',
        workCulture: 'Fast-paced, Innovation-driven',
        benefits: ['Health Insurance', 'Stock Options', 'Learning Budget']
      },
      {
        id: 2,
        name: 'Innovation Labs Pvt Ltd',
        industry: 'Research & Development',
        location: 'Hyderabad, India',
        rating: 4.6,
        employeeCount: '1000-5000',
        packageRange: '₹6-18 LPA',
        positions: 25,
        requirements: ['B.Tech/M.Tech', 'Research Experience', 'Problem Solving'],
        email: 'careers@innovationlabs.in',
        phone: '+91 40 9876 5432',
        matchScore: 88,
        strengths: ['Research opportunities', 'Good work-life balance', 'Learning curve'],
        concerns: ['Lower starting package'],
        industryMatch: 85,
        salaryMatch: 78,
        locationMatch: 95,
        ratingMatch: 92,
        companyType: 'R&D',
        workCulture: 'Research-oriented, Collaborative',
        benefits: ['Flexible Hours', 'Research Grants', 'Conference Funding']
      },
      {
        id: 3,
        name: 'Global Systems Corp',
        industry: 'IT Services',
        location: 'Chennai, India',
        rating: 4.4,
        employeeCount: '10000+',
        packageRange: '₹5-15 LPA',
        positions: 100,
        requirements: ['Engineering Degree', 'Good Communication', 'Aptitude'],
        email: 'recruitment@globalsystems.com',
        phone: '+91 44 1111 2222',
        matchScore: 82,
        strengths: ['Large intake', 'Training programs', 'Global exposure'],
        concerns: ['High competition', 'Variable growth'],
        industryMatch: 88,
        salaryMatch: 72,
        locationMatch: 85,
        ratingMatch: 80,
        companyType: 'Service',
        workCulture: 'Professional, Process-driven',
        benefits: ['Medical Coverage', 'Training Programs', 'Global Opportunities']
      },
      {
        id: 4,
        name: 'StartupXYZ Technologies',
        industry: 'Fintech',
        location: 'Mumbai, India',
        rating: 4.2,
        employeeCount: '100-500',
        packageRange: '₹10-30 LPA',
        positions: 15,
        requirements: ['CS/IT Background', 'Coding Skills', 'Quick Learning'],
        email: 'jobs@startupxyz.com',
        phone: '+91 22 3333 4444',
        matchScore: 78,
        strengths: ['High growth potential', 'Equity options', 'Direct impact'],
        concerns: ['Startup risks', 'Work pressure'],
        industryMatch: 75,
        salaryMatch: 95,
        locationMatch: 70,
        ratingMatch: 75,
        companyType: 'Startup',
        workCulture: 'Agile, High-energy',
        benefits: ['Equity', 'Flexible Work', 'Learning Opportunities']
      }
    ];

    return sampleMatches.filter(match => match.matchScore >= matchingCriteria.minMatchScore)
                      .sort((a, b) => b.matchScore - a.matchScore);
  };

  const handleDepartmentSelection = (deptId) => {
    setSelectedDepartment(deptId);
    setLoading(true);
    
    // Simulate AI matching process
    setTimeout(() => {
      const results = generateMatchingResults(deptId);
      setMatchingResults(results);
      setLoading(false);
    }, 2000);
  };

  const toggleSaveMatch = (companyId) => {
    const newSaved = new Set(savedMatches);
    if (newSaved.has(companyId)) {
      newSaved.delete(companyId);
    } else {
      newSaved.add(companyId);
    }
    setSavedMatches(newSaved);
  };

  const refreshMatches = () => {
    if (selectedDepartment) {
      handleDepartmentSelection(selectedDepartment);
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
      <InstituteNavbar />
      
      <div className="flex pt-16">
        <InstituteSidebar />
        
        <div className="flex-1 ml-64">
          {/* Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <MdAutoAwesome className="text-emerald-600 mr-2" />
                  AI Company Matching
                </h1>
                <p className="text-gray-600">Get AI-powered company recommendations for your students</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <MdTune className="mr-1" />
                  Settings
                </button>
                {selectedDepartment && (
                  <button
                    onClick={refreshMatches}
                    className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    <MdRefresh className="mr-1" />
                    Refresh
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Department Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Department</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableDepartments.map((dept) => (
                  <div
                    key={dept.id}
                    onClick={() => handleDepartmentSelection(dept.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedDepartment === dept.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">{dept.name}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MdPeople className="mr-1" />
                        {dept.students} students
                      </div>
                      <div className="flex items-center">
                        <MdStar className="mr-1 text-yellow-400" />
                        {dept.averageGPA} avg GPA
                      </div>
                      <div className="flex items-center">
                        <MdWork className="mr-1" />
                        {dept.placementRate}% placement rate
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      {dept.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Matching Results */}
            {selectedDepartment && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <MdPsychology className="text-purple-600 mr-2" />
                      AI Company Matching Results
                    </h3>
                    {!loading && matchingResults.length > 0 && (
                      <span className="text-sm text-gray-600">
                        {matchingResults.length} companies found
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">AI is analyzing companies...</h3>
                      <p className="text-gray-600">This may take a few moments</p>
                      <div className="mt-4 space-y-2 text-sm text-gray-500">
                        <p>🔍 Analyzing industry compatibility...</p>
                        <p>💰 Evaluating salary packages...</p>
                        <p>📍 Considering location preferences...</p>
                        <p>⭐ Checking company ratings...</p>
                      </div>
                    </div>
                  ) : matchingResults.length === 0 ? (
                    <div className="text-center py-12">
                      <MdAutoAwesome className="mx-auto text-4xl text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Select a department to see AI matches</h3>
                      <p className="text-gray-600">Our AI will analyze and rank companies based on student profiles</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {matchingResults.map((company, index) => (
                        <div key={company.id} className="border border-gray-200 rounded-lg p-6 relative">
                          {/* Match Badge */}
                          <div className="absolute top-4 right-4 flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(company.matchScore)}`}>
                              {company.matchScore}% Match
                            </span>
                            <button
                              onClick={() => toggleSaveMatch(company.id)}
                              className="p-1 text-gray-400 hover:text-emerald-600"
                            >
                              {savedMatches.has(company.id) ? <MdBookmark /> : <MdBookmarkBorder />}
                            </button>
                          </div>

                          {/* Rank Badge */}
                          <div className="absolute top-4 left-4 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            #{index + 1}
                          </div>

                          {/* Company Info */}
                          <div className="ml-12 mr-24">
                            <div className="flex items-start space-x-4 mb-4">
                              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                <MdBusiness className="text-emerald-600 text-2xl" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xl font-semibold text-gray-900">{company.name}</h4>
                                <p className="text-gray-600 mb-1">{company.industry}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span className="flex items-center">
                                    <MdLocationOn className="mr-1" />
                                    {company.location}
                                  </span>
                                  <span className="flex items-center">
                                    <MdPeople className="mr-1" />
                                    {company.employeeCount}
                                  </span>
                                  <span className="flex items-center">
                                    <MdWork className="mr-1" />
                                    {company.positions} positions
                                  </span>
                                  <span className="flex items-center">
                                    <MdStar className="mr-1 text-yellow-400" />
                                    {company.rating}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* AI Match Breakdown */}
                            <div className="mb-4">
                              <h5 className="text-sm font-medium text-gray-900 mb-3">AI Match Breakdown</h5>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                  <div className="text-lg font-bold text-blue-600">{company.industryMatch}%</div>
                                  <div className="text-xs text-gray-500">Industry</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-green-600">{company.salaryMatch}%</div>
                                  <div className="text-xs text-gray-500">Salary</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-purple-600">{company.locationMatch}%</div>
                                  <div className="text-xs text-gray-500">Location</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-orange-600">{company.ratingMatch}%</div>
                                  <div className="text-xs text-gray-500">Rating</div>
                                </div>
                              </div>
                            </div>

                            {/* Company Details */}
                            <div className="mb-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Package Range:</span>
                                  <p className="font-medium text-emerald-600">{company.packageRange}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Company Type:</span>
                                  <p className="font-medium text-gray-900">{company.companyType}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Work Culture:</span>
                                  <p className="font-medium text-gray-900">{company.workCulture}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Match Quality:</span>
                                  <p className={`font-medium ${getMatchColor(company.matchScore).split(' ')[0]}`}>
                                    {getMatchLabel(company.matchScore)}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Requirements */}
                            <div className="mb-4">
                              <h5 className="text-sm font-medium text-gray-900 mb-2">Requirements</h5>
                              <div className="flex flex-wrap gap-1">
                                {company.requirements.map((req, reqIndex) => (
                                  <span key={reqIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    {req}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Benefits */}
                            <div className="mb-4">
                              <h5 className="text-sm font-medium text-gray-900 mb-2">Benefits</h5>
                              <div className="flex flex-wrap gap-1">
                                {company.benefits.map((benefit, benefitIndex) => (
                                  <span key={benefitIndex} className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">
                                    {benefit}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* AI Insights */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h5 className="text-sm font-medium text-green-700 mb-2">✅ Strengths</h5>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  {company.strengths.map((strength, strengthIndex) => (
                                    <li key={strengthIndex}>• {strength}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-orange-700 mb-2">⚠️ Considerations</h5>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  {company.concerns.map((concern, concernIndex) => (
                                    <li key={concernIndex}>• {concern}</li>
                                  ))}
                                </ul>
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
                                onClick={() => navigate(`/institute/companies/${company.id}`)}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                              >
                                View Company Profile
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
                    Industry Weight: {matchingCriteria.industryWeight}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={matchingCriteria.industryWeight}
                    onChange={(e) => setMatchingCriteria({
                      ...matchingCriteria,
                      industryWeight: parseInt(e.target.value)
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Weight: {matchingCriteria.salaryWeight}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={matchingCriteria.salaryWeight}
                    onChange={(e) => setMatchingCriteria({
                      ...matchingCriteria,
                      salaryWeight: parseInt(e.target.value)
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
                    Company Rating Weight: {matchingCriteria.companyRatingWeight}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={matchingCriteria.companyRatingWeight}
                    onChange={(e) => setMatchingCriteria({
                      ...matchingCriteria,
                      companyRatingWeight: parseInt(e.target.value)
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
                      if (selectedDepartment) {
                        refreshMatches();
                      }
                    }}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
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

export default CompanyMatchingScreen;