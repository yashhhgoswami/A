import React, { useState, useEffect } from 'react';
import RecruiterNavbar from '../components/RecruiterNavbar';
import RecruiterSidebar from '../components/RecruiterSidebar';
import { 
  MdPeople,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdSchool,
  MdWork,
  MdStar,
  MdArrowForward,
  MdArrowBack,
  MdMessage,
  MdSchedule,
  MdClose
} from 'react-icons/md';

const RecruitmentPipelineScreen = () => {
  const [selectedStage, setSelectedStage] = useState('all');
  const [candidates, setCandidates] = useState([]);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const stages = [
    { id: 'all', name: 'All Candidates', color: 'bg-gray-100' },
    { id: 'applied', name: 'Applied', color: 'bg-blue-100' },
    { id: 'screening', name: 'Screening', color: 'bg-yellow-100' },
    { id: 'interview', name: 'Interview', color: 'bg-purple-100' },
    { id: 'assessment', name: 'Assessment', color: 'bg-indigo-100' },
    { id: 'offer', name: 'Offer', color: 'bg-green-100' },
    { id: 'hired', name: 'Hired', color: 'bg-emerald-100' },
    { id: 'rejected', name: 'Rejected', color: 'bg-red-100' }
  ];

  // Sample candidate data with pipeline stages
  const sampleCandidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 123-4567',
      title: 'Full Stack Developer',
      university: 'MIT',
      experience: '3 years',
      location: 'Boston, MA',
      jobTitle: 'Senior Software Engineer',
      stage: 'interview',
      rating: 4.8,
      appliedDate: '2024-01-15',
      lastUpdate: '2024-01-18',
      skills: ['React', 'Node.js', 'Python'],
      notes: 'Strong technical background, good communication skills',
      interviews: [
        { date: '2024-01-20', type: 'Technical', status: 'scheduled' },
        { date: '2024-01-22', type: 'Behavioral', status: 'pending' }
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@email.com',
      phone: '+1 (555) 234-5678',
      title: 'Software Engineer',
      university: 'Stanford University',
      experience: '2 years',
      location: 'Palo Alto, CA',
      jobTitle: 'Backend Engineer',
      stage: 'assessment',
      rating: 4.7,
      appliedDate: '2024-01-12',
      lastUpdate: '2024-01-17',
      skills: ['Java', 'Spring', 'AWS'],
      notes: 'Excellent coding skills, passed initial screening',
      interviews: [
        { date: '2024-01-16', type: 'Technical', status: 'completed' }
      ]
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      phone: '+1 (555) 345-6789',
      title: 'Product Designer',
      university: 'UC Berkeley',
      experience: '4 years',
      location: 'San Francisco, CA',
      jobTitle: 'Senior UX Designer',
      stage: 'offer',
      rating: 4.9,
      appliedDate: '2024-01-10',
      lastUpdate: '2024-01-19',
      skills: ['Figma', 'UI/UX', 'Prototyping'],
      notes: 'Outstanding portfolio, great culture fit',
      interviews: [
        { date: '2024-01-14', type: 'Portfolio Review', status: 'completed' },
        { date: '2024-01-17', type: 'Team Interview', status: 'completed' }
      ]
    },
    {
      id: 4,
      name: 'Alex Thompson',
      email: 'alex.t@email.com',
      phone: '+1 (555) 456-7890',
      title: 'Data Scientist',
      university: 'Carnegie Mellon',
      experience: '5 years',
      location: 'Pittsburgh, PA',
      jobTitle: 'Senior Data Scientist',
      stage: 'screening',
      rating: 4.6,
      appliedDate: '2024-01-14',
      lastUpdate: '2024-01-16',
      skills: ['Python', 'TensorFlow', 'SQL'],
      notes: 'Strong analytical skills, reviewing portfolio',
      interviews: []
    },
    {
      id: 5,
      name: 'Jessica Park',
      email: 'jessica.p@email.com',
      phone: '+1 (555) 567-8901',
      title: 'Frontend Developer',
      university: 'UCLA',
      experience: '3 years',
      location: 'Los Angeles, CA',
      jobTitle: 'React Developer',
      stage: 'applied',
      rating: 4.5,
      appliedDate: '2024-01-16',
      lastUpdate: '2024-01-16',
      skills: ['React', 'TypeScript', 'CSS'],
      notes: 'Recently applied, pending initial review',
      interviews: []
    }
  ];

  useEffect(() => {
    setCandidates(sampleCandidates);
  }, [sampleCandidates]);

  const filteredCandidates = selectedStage === 'all' 
    ? candidates 
    : candidates.filter(candidate => candidate.stage === selectedStage);

  const moveCandidate = (candidateId, newStage) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, stage: newStage, lastUpdate: new Date().toISOString().split('T')[0] }
        : candidate
    ));
  };

  const openCandidateModal = (candidate) => {
    setSelectedCandidate(candidate);
    setShowCandidateModal(true);
  };

  const getStageProgress = (stage) => {
    const stageIndex = stages.findIndex(s => s.id === stage);
    return ((stageIndex + 1) / (stages.length - 1)) * 100;
  };

  const getNextStage = (currentStage) => {
    const currentIndex = stages.findIndex(s => s.id === currentStage);
    if (currentIndex < stages.length - 1) {
      return stages[currentIndex + 1];
    }
    return null;
  };

  const getPreviousStage = (currentStage) => {
    const currentIndex = stages.findIndex(s => s.id === currentStage);
    if (currentIndex > 1) {
      return stages[currentIndex - 1];
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />
      
      <div className="flex pt-16">
        <RecruiterSidebar pendingApplicationsCount={candidates.filter(c => c.stage === 'applied').length} />
        
        <div className="flex-1 ml-72">
          {/* Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Recruitment Pipeline</h1>
            <p className="text-gray-600">Track and manage candidates through your hiring process</p>
          </div>

          <div className="p-6">
            {/* Pipeline Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
              {stages.slice(1).map((stage) => {
                const count = candidates.filter(c => c.stage === stage.id).length;
                return (
                  <div key={stage.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className={`w-12 h-12 ${stage.color} rounded-lg flex items-center justify-center mb-2`}>
                      <span className="text-lg font-bold text-gray-700">{count}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm">{stage.name}</h3>
                    <p className="text-xs text-gray-500">candidates</p>
                  </div>
                );
              })}
            </div>

            {/* Stage Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Stage</h3>
              <div className="flex flex-wrap gap-2">
                {stages.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedStage === stage.id
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {stage.name} {stage.id !== 'all' && `(${candidates.filter(c => c.stage === stage.id).length})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Candidates List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedStage === 'all' ? 'All Candidates' : stages.find(s => s.id === selectedStage)?.name} 
                  ({filteredCandidates.length})
                </h3>
              </div>
              
              <div className="p-6">
                {filteredCandidates.length === 0 ? (
                  <div className="text-center py-12">
                    <MdPeople className="mx-auto text-4xl text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates in this stage</h3>
                    <p className="text-gray-600">Candidates will appear here as they progress through your pipeline</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredCandidates.map((candidate) => (
                      <div key={candidate.id} className="border border-gray-200 rounded-lg p-6">
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
                              <p className="text-sm text-orange-600 font-medium">Applied for: {candidate.jobTitle}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
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
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              stages.find(s => s.id === candidate.stage)?.color
                            }`}>
                              {stages.find(s => s.id === candidate.stage)?.name}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Pipeline Progress</span>
                            <span>{Math.round(getStageProgress(candidate.stage))}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${getStageProgress(candidate.stage)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Candidate Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            {/* Skills */}
                            <div className="mb-3">
                              <h5 className="text-sm font-medium text-gray-900 mb-2">Skills</h5>
                              <div className="flex flex-wrap gap-1">
                                {candidate.skills.map((skill, index) => (
                                  <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Contact Info */}
                            <div className="grid grid-cols-1 gap-2 text-sm">
                              <div className="flex items-center text-gray-600">
                                <MdEmail className="mr-2" />
                                {candidate.email}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MdPhone className="mr-2" />
                                {candidate.phone}
                              </div>
                            </div>

                            {/* Timeline */}
                            <div className="mt-4 text-xs text-gray-500">
                              <p>Applied: {candidate.appliedDate}</p>
                              <p>Last Update: {candidate.lastUpdate}</p>
                            </div>
                          </div>

                          <div>
                            {/* Notes */}
                            <div className="mb-4">
                              <h5 className="text-sm font-medium text-gray-900 mb-2">Notes</h5>
                              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{candidate.notes}</p>
                            </div>

                            {/* Interviews */}
                            {candidate.interviews.length > 0 && (
                              <div className="mb-4">
                                <h5 className="text-sm font-medium text-gray-900 mb-2">Interviews</h5>
                                <div className="space-y-2">
                                  {candidate.interviews.map((interview, index) => (
                                    <div key={index} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                                      <span>{interview.type} - {interview.date}</span>
                                      <span className={`px-2 py-1 rounded ${
                                        interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        interview.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                      }`}>
                                        {interview.status}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex space-x-2">
                            <button className="flex items-center px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                              <MdEmail className="mr-1" />
                              Email
                            </button>
                            <button className="flex items-center px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                              <MdMessage className="mr-1" />
                              Note
                            </button>
                            <button className="flex items-center px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                              <MdSchedule className="mr-1" />
                              Schedule
                            </button>
                          </div>

                          <div className="flex items-center space-x-2">
                            {/* Move Back */}
                            {getPreviousStage(candidate.stage) && (
                              <button
                                onClick={() => moveCandidate(candidate.id, getPreviousStage(candidate.stage).id)}
                                className="flex items-center px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
                              >
                                <MdArrowBack className="mr-1" />
                                Back
                              </button>
                            )}

                            {/* Move Forward */}
                            {getNextStage(candidate.stage) && candidate.stage !== 'rejected' && (
                              <button
                                onClick={() => moveCandidate(candidate.id, getNextStage(candidate.stage).id)}
                                className="flex items-center px-3 py-1 text-xs bg-orange-600 text-white rounded hover:bg-orange-700"
                              >
                                <MdArrowForward className="mr-1" />
                                {getNextStage(candidate.stage).name}
                              </button>
                            )}

                            {/* Reject */}
                            {candidate.stage !== 'rejected' && candidate.stage !== 'hired' && (
                              <button
                                onClick={() => moveCandidate(candidate.id, 'rejected')}
                                className="flex items-center px-3 py-1 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50"
                              >
                                <MdClose className="mr-1" />
                                Reject
                              </button>
                            )}

                            <button
                              onClick={() => openCandidateModal(candidate)}
                              className="px-4 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                            >
                              View Details
                            </button>
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

      {/* Candidate Detail Modal */}
      {showCandidateModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Candidate Details</h3>
                <button
                  onClick={() => setShowCandidateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MdClose className="text-xl" />
                </button>
              </div>

              {/* Candidate Profile */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold text-2xl">
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-semibold text-gray-900">{selectedCandidate.name}</h4>
                    <p className="text-gray-600 mb-2">{selectedCandidate.title}</p>
                    <div className="flex items-center">
                      <MdStar className="text-yellow-400 mr-1" />
                      <span className="font-medium">{selectedCandidate.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Contact Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <MdEmail className="mr-2 text-gray-400" />
                        {selectedCandidate.email}
                      </div>
                      <div className="flex items-center">
                        <MdPhone className="mr-2 text-gray-400" />
                        {selectedCandidate.phone}
                      </div>
                      <div className="flex items-center">
                        <MdLocationOn className="mr-2 text-gray-400" />
                        {selectedCandidate.location}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Background</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <MdSchool className="mr-2 text-gray-400" />
                        {selectedCandidate.university}
                      </div>
                      <div className="flex items-center">
                        <MdWork className="mr-2 text-gray-400" />
                        {selectedCandidate.experience}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Skills</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill, index) => (
                      <span key={index} className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Notes</h5>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedCandidate.notes}</p>
                </div>

                {selectedCandidate.interviews.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Interview History</h5>
                    <div className="space-y-3">
                      {selectedCandidate.interviews.map((interview, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h6 className="font-medium text-gray-900">{interview.type}</h6>
                              <p className="text-sm text-gray-600">{interview.date}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                              interview.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {interview.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowCandidateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    Schedule Interview
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

export default RecruitmentPipelineScreen;