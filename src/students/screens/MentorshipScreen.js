import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentSidebar from '../components/StudentSidebar';
import StudentNavbar from '../components/StudentNavbar';
import { 
  getAllMentors, 
  getActiveMentorships, 
  getStudentMentorshipRequests, 
  requestMentorship,
  cancelMentorshipRequest
} from '../services/mentorshipService';
import { 
  MdPeople, 
  MdStar, 
  MdWork,
  MdMessage,
  MdCancel,
  MdCheckCircle,
  MdPending,
  MdSearch,
  MdFilter
} from 'react-icons/md';

const MentorshipScreen = () => {
  const { user } = useAuth();
  const [mentors, setMentors] = useState([]);
  const [activeMentorships, setActiveMentorships] = useState([]);
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [requestGoals, setRequestGoals] = useState(['']);
  const [searchTerm, setSearchTerm] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [submitting, setSubmitting] = useState(false);

  const loadMentorshipData = useCallback(async () => {
    try {
      setLoading(true);
      const [mentorsResult, mentorshipsResult, requestsResult] = await Promise.all([
        getAllMentors(),
        getActiveMentorships(user?.id || 1),
        getStudentMentorshipRequests(user?.id || 1)
      ]);

      setMentors(mentorsResult.mentors);
      setActiveMentorships(mentorshipsResult.mentorships);
      setMentorshipRequests(requestsResult.requests);
    } catch (error) {
      console.error('Error loading mentorship data:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadMentorshipData();
  }, [loadMentorshipData]);

  const handleRequestMentorship = (mentor) => {
    setSelectedMentor(mentor);
    setShowRequestModal(true);
    setRequestMessage(`Hi ${mentor.name.split(' ')[0]}, I'm interested in your mentorship and would love to learn from your experience in ${mentor.expertise[0]}.`);
  };

  const submitMentorshipRequest = async () => {
    if (!selectedMentor || !requestMessage.trim()) return;

    try {
      setSubmitting(true);
      const goals = requestGoals.filter(goal => goal.trim() !== '');
      
      await requestMentorship(
        selectedMentor.id,
        user?.id || 1,
        requestMessage,
        goals
      );

      setShowRequestModal(false);
      setRequestMessage('');
      setRequestGoals(['']);
      setSelectedMentor(null);
      
      // Reload data to show new request
      await loadMentorshipData();
      
      alert('Mentorship request sent successfully!');
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelRequest = async (requestId) => {
    if (!window.confirm('Are you sure you want to cancel this request?')) return;

    try {
      await cancelMentorshipRequest(requestId, user?.id || 1);
      await loadMentorshipData();
      alert('Request cancelled successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  const addGoal = () => {
    setRequestGoals([...requestGoals, '']);
  };

  const updateGoal = (index, value) => {
    const newGoals = [...requestGoals];
    newGoals[index] = value;
    setRequestGoals(newGoals);
  };

  const removeGoal = (index) => {
    const newGoals = requestGoals.filter((_, i) => i !== index);
    setRequestGoals(newGoals);
  };

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesExpertise = expertiseFilter === 'all' || 
                            mentor.expertise.some(exp => exp.toLowerCase().includes(expertiseFilter.toLowerCase()));
    
    return matchesSearch && matchesExpertise;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <MdPending className="text-yellow-500" />;
      case 'accepted': return <MdCheckCircle className="text-green-500" />;
      case 'rejected': return <MdCancel className="text-red-500" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading mentorship data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <StudentNavbar />

      {/* Sidebar */}
      <StudentSidebar pendingRequestsCount={mentorshipRequests.length} />

      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4 ml-64 pt-20">
        <h1 className="text-2xl font-bold text-gray-900">Mentorship Programs</h1>
        <p className="text-gray-600">Connect with experienced alumni for guidance and career development</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b px-6 ml-64">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('discover')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'discover'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Discover Mentors
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors relative ${
              activeTab === 'requests'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Requests
            {mentorshipRequests.filter(r => r.status === 'pending').length > 0 && (
              <span className="ml-2 bg-yellow-500 text-white text-xs rounded-full px-2 py-1">
                {mentorshipRequests.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'active'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Active Mentorships
            {activeMentorships.length > 0 && (
              <span className="ml-2 bg-green-500 text-white text-xs rounded-full px-2 py-1">
                {activeMentorships.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="p-6 ml-64">
        {/* Discover Mentors Tab */}
        {activeTab === 'discover' && (
          <div>
            {/* Search and Filters */}
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search mentors by name, title, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <MdFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={expertiseFilter}
                    onChange={(e) => setExpertiseFilter(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Expertise</option>
                    <option value="software">Software Development</option>
                    <option value="product">Product Management</option>
                    <option value="design">Design</option>
                    <option value="research">Research</option>
                    <option value="leadership">Leadership</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <div key={mentor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium text-blue-700">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">{mentor.title}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MdStar className="text-yellow-500 text-sm" />
                      <span className="text-sm text-gray-600">{mentor.rating}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MdWork className="mr-2" />
                      {mentor.company}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MdPeople className="mr-2" />
                      {mentor.totalMentees} mentees • Class of {mentor.graduationYear}
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">{mentor.bio}</p>

                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-800 mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.slice(0, 3).map((skill, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      mentor.availableSlots > 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {mentor.availableSlots > 0 ? `${mentor.availableSlots} slots available` : 'Fully booked'}
                    </span>
                    
                    <button
                      onClick={() => handleRequestMentorship(mentor)}
                      disabled={mentor.availableSlots <= 0 || mentorshipRequests.some(r => r.mentorId === mentor.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        mentor.availableSlots > 0 && !mentorshipRequests.some(r => r.mentorId === mentor.id)
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {mentorshipRequests.some(r => r.mentorId === mentor.id) ? 'Already Requested' : 'Request Mentorship'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Requests Tab */}
        {activeTab === 'requests' && (
          <div>
            {mentorshipRequests.length > 0 ? (
              <div className="space-y-4">
                {mentorshipRequests.map((request) => (
                  <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-700">
                              {request.mentor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{request.mentor.name}</h3>
                            <p className="text-sm text-gray-600">{request.mentor.title} at {request.mentor.company}</p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-800 mb-1">Your Message:</h4>
                          <p className="text-sm text-gray-700">{request.message}</p>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-800 mb-1">Goals:</h4>
                          <ul className="text-sm text-gray-700">
                            {request.goals.map((goal, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                                {goal}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <p className="text-xs text-gray-500">
                          Requested on {new Date(request.requestDate).toLocaleDateString()}
                          {request.acceptedDate && ` • Accepted on ${new Date(request.acceptedDate).toLocaleDateString()}`}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(request.status)}
                          <span className={`text-sm font-medium capitalize ${
                            request.status === 'pending' ? 'text-yellow-700' :
                            request.status === 'accepted' ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        
                        {request.status === 'pending' && (
                          <button
                            onClick={() => handleCancelRequest(request.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MdMessage className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Mentorship Requests</h3>
                <p className="text-gray-600 mb-4">You haven't sent any mentorship requests yet.</p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Discover Mentors
                </button>
              </div>
            )}
          </div>
        )}

        {/* Active Mentorships Tab */}
        {activeTab === 'active' && (
          <div>
            {activeMentorships.length > 0 ? (
              <div className="space-y-6">
                {activeMentorships.map((mentorship) => (
                  <div key={mentorship.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-blue-700">
                          {mentorship.mentor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{mentorship.mentor.name}</h3>
                        <p className="text-gray-600">{mentorship.mentor.title} at {mentorship.mentor.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Started {new Date(mentorship.startDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">{mentorship.totalSessions} sessions completed</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Progress</h4>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Overall Progress</span>
                            <span>{mentorship.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${mentorship.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Next session: {mentorship.nextSession}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Goals</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {mentorship.goals.map((goal, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-3">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                        Schedule Session
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">
                        Send Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MdPeople className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Mentorships</h3>
                <p className="text-gray-600 mb-4">You don't have any active mentorships yet.</p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Find a Mentor
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Request Mentorship Modal */}
      {showRequestModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">Request Mentorship</h2>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-700">
                      {selectedMentor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedMentor.name}</h3>
                    <p className="text-sm text-gray-600">{selectedMentor.title} at {selectedMentor.company}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Introduce yourself and explain why you'd like this person as your mentor..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Goals
                </label>
                {requestGoals.map((goal, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => updateGoal(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What do you hope to achieve?"
                    />
                    {requestGoals.length > 1 && (
                      <button
                        onClick={() => removeGoal(index)}
                        className="text-red-600 hover:text-red-700 px-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addGoal}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  + Add another goal
                </button>
              </div>

              <div className="flex space-x-3 justify-end">
                <button
                  onClick={() => setShowRequestModal(false)}
                  disabled={submitting}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={submitMentorshipRequest}
                  disabled={submitting || !requestMessage.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorshipScreen;