import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentSidebar from '../components/StudentSidebar';
import StudentNavbar from '../components/StudentNavbar';
import { 
  MdPeople, 
  MdSearch, 
  MdLocationOn, 
  MdSchool,
  MdMessage,
  MdConnectWithoutContact,
  MdStar,
  MdVerified,
  MdForum,
  MdThumbUp,
  MdComment,
  MdShare
} from 'react-icons/md';

const StudentAlumniScreen = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('alumni');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  
  // Alumni data
  const [alumni, setAlumni] = useState([]);
  const [connections, setConnections] = useState([]);
  const [feedPosts, setFeedPosts] = useState([]);
  
  // Modal states
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectMessage, setConnectMessage] = useState('');

  const loadAlumniData = useCallback(async () => {
    setLoading(true);
    
    // Mock alumni data
    const mockAlumni = [
      {
        id: 1,
        name: 'Priya Sharma',
        title: 'Senior Software Engineer',
        company: 'Infosys',
        location: 'Bangalore, Karnataka',
        graduationYear: '2019',
        degree: 'Computer Science',
        avatar: 'https://via.placeholder.com/100x100/6B73FF/FFFFFF?text=PS',
        verified: true,
        experience: '4 years',
        skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
        bio: 'Passionate about building scalable web applications and mentoring students. Love connecting with fellow alumni and sharing career insights.',
        connections: 1247,
        posts: 89,
        mentees: 15,
        available: true,
        rating: 4.9,
        reviews: 42
      },
      {
        id: 2,
        name: 'Arjun Gupta',
        title: 'Product Manager',
        company: 'Flipkart',
        location: 'Bangalore, Karnataka',
        graduationYear: '2018',
        degree: 'Business Administration',
        avatar: 'https://via.placeholder.com/100x100/10B981/FFFFFF?text=AG',
        verified: true,
        experience: '5 years',
        skills: ['Product Strategy', 'Data Analysis', 'Agile', 'Leadership'],
        bio: 'Leading product development for e-commerce platform. Always excited to help students navigate their career paths in tech.',
        connections: 892,
        posts: 156,
        mentees: 8,
        available: true,
        rating: 4.8,
        reviews: 28
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        title: 'Data Scientist',
        company: 'Netflix',
        location: 'Los Gatos, CA',
        graduationYear: '2020',
        degree: 'Data Science',
        avatar: 'https://via.placeholder.com/100x100/F59E0B/FFFFFF?text=ER',
        verified: true,
        experience: '3 years',
        skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
        bio: 'Working on recommendation systems and data-driven insights at Netflix. Love helping students break into data science.',
        connections: 634,
        posts: 73,
        mentees: 12,
        available: false,
        rating: 4.9,
        reviews: 35
      },
      {
        id: 4,
        name: 'David Kim',
        title: 'UX Designer',
        company: 'Adobe',
        location: 'San Jose, CA',
        graduationYear: '2017',
        degree: 'Design',
        avatar: 'https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=DK',
        verified: true,
        experience: '6 years',
        skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research'],
        bio: 'Creating intuitive user experiences for Creative Cloud. Passionate about design thinking and innovation.',
        connections: 1456,
        posts: 201,
        mentees: 20,
        available: true,
        rating: 4.7,
        reviews: 67
      }
    ];

    const mockConnections = [
      { id: 1, alumniId: 1, status: 'connected', connectedDate: '2024-01-15' },
      { id: 2, alumniId: 2, status: 'pending', requestDate: '2024-01-20' }
    ];

    const mockFeedPosts = [
      {
        id: 1,
        author: mockAlumni[0],
        content: 'Just wrapped up an amazing project at Google! Working on ML-powered features has been incredibly rewarding. Happy to share insights with anyone interested in machine learning careers. 🚀',
        timestamp: '2024-01-22T10:30:00Z',
        likes: 45,
        comments: 8,
        shares: 12,
        liked: false,
        images: []
      },
      {
        id: 2,
        author: mockAlumni[1],
        content: 'Excited to announce that our Azure AI platform just hit 1M active users! The journey from idea to product has been amazing. Always happy to discuss product management with aspiring PMs.',
        timestamp: '2024-01-21T14:15:00Z',
        likes: 67,
        comments: 15,
        shares: 23,
        liked: true,
        images: []
      },
      {
        id: 3,
        author: mockAlumni[2],
        content: 'Data science tip: Always start with understanding your data before jumping into complex models. Spent the day debugging a recommendation system - the devil is in the details! 📊',
        timestamp: '2024-01-20T09:45:00Z',
        likes: 34,
        comments: 6,
        shares: 8,
        liked: false,
        images: []
      }
    ];

    // Apply filters and sorting
    let filteredAlumni = mockAlumni;
    
    if (searchTerm) {
      filteredAlumni = filteredAlumni.filter(alumni => 
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterBy !== 'all') {
      if (filterBy === 'available') {
        filteredAlumni = filteredAlumni.filter(alumni => alumni.available);
      } else if (filterBy === 'same_field') {
        filteredAlumni = filteredAlumni.filter(alumni => alumni.degree === 'Computer Science');
      }
    }

    // Sort alumni
    filteredAlumni.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'rating':
          return b.rating - a.rating;
        default:
          return new Date(b.graduationYear) - new Date(a.graduationYear);
      }
    });

    setAlumni(filteredAlumni);
    setConnections(mockConnections);
    setFeedPosts(mockFeedPosts);
    setLoading(false);
  }, [searchTerm, sortBy, filterBy]);

  useEffect(() => {
    loadAlumniData();
  }, [loadAlumniData]);

  const handleConnectRequest = async (alumniId) => {
    const selectedAlumniData = alumni.find(a => a.id === alumniId);
    setSelectedAlumni(selectedAlumniData);
    setConnectMessage(`Hi ${selectedAlumniData.name},\n\nI'm a current student at our university studying ${selectedAlumniData.degree}. I'm really interested in ${selectedAlumniData.title} roles and would love to connect with you to learn more about your journey at ${selectedAlumniData.company}.\n\nThank you for your time!\n\nBest regards,\n${user?.name || 'Student'}`);
    setShowConnectModal(true);
  };

  const submitConnectRequest = async () => {
    if (!selectedAlumni || !connectMessage.trim()) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add to connections with pending status
      setConnections(prev => [...prev, {
        id: Date.now(),
        alumniId: selectedAlumni.id,
        status: 'pending',
        requestDate: new Date().toISOString()
      }]);

      setShowConnectModal(false);
      setConnectMessage('');
      setSelectedAlumni(null);
      alert('Connection request sent successfully!');
    } catch (error) {
      alert('Error sending connection request');
    }
  };

  const handleLikePost = (postId) => {
    setFeedPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const getConnectionStatus = (alumniId) => {
    const connection = connections.find(conn => conn.alumniId === alumniId);
    return connection?.status || 'none';
  };

  const filteredAlumni = alumni.filter(alumni => {
    if (!searchTerm) return true;
    return alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
           alumni.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading alumni network...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <StudentNavbar />

      {/* Sidebar */}
      <StudentSidebar />

      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4 ml-64 pt-20">
        <h1 className="text-2xl font-bold text-gray-900">Alumni Network</h1>
        <p className="text-gray-600">Connect with alumni and expand your professional network</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b px-6 ml-64">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('alumni')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'alumni'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Find Alumni
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors relative ${
              activeTab === 'connections'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Connections
            {connections.length > 0 && (
              <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                {connections.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('feed')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'feed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Alumni Feed
          </button>
        </div>
      </div>

      <div className="p-6 ml-64">
        {/* Find Alumni Tab */}
        {activeTab === 'alumni' && (
          <div>
            {/* Search and Filters */}
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, company, skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="recent">Most Recent</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="experience">Experience</option>
                  <option value="rating">Highest Rated</option>
                </select>

                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Alumni</option>
                  <option value="available">Available for Mentoring</option>
                  <option value="same_field">Same Field</option>
                </select>
              </div>
            </div>

            {/* Alumni Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlumni.map((alumni) => {
                const connectionStatus = getConnectionStatus(alumni.id);
                
                return (
                  <div key={alumni.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={alumni.avatar}
                          alt={alumni.name}
                          className="w-16 h-16 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {alumni.name}
                            </h3>
                            {alumni.verified && (
                              <MdVerified className="text-blue-500 text-lg flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{alumni.title}</p>
                          <p className="text-sm font-medium text-gray-900 mb-2">{alumni.company}</p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                            <span className="flex items-center">
                              <MdLocationOn className="mr-1" />
                              {alumni.location}
                            </span>
                            <span className="flex items-center">
                              <MdSchool className="mr-1" />
                              Class of {alumni.graduationYear}
                            </span>
                          </div>

                          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                            <span>{alumni.connections} connections</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <MdStar className="mr-1 text-yellow-500" />
                              {alumni.rating} ({alumni.reviews} reviews)
                            </span>
                          </div>

                          {alumni.available && (
                            <div className="flex items-center mb-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              <span className="text-xs text-green-600 font-medium">Available for mentoring</span>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1 mb-4">
                            {alumni.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {skill}
                              </span>
                            ))}
                            {alumni.skills.length > 3 && (
                              <span className="text-xs text-gray-500">+{alumni.skills.length - 3}</span>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedAlumni(alumni);
                                setShowProfileModal(true);
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm transition-colors"
                            >
                              View Profile
                            </button>
                            
                            {connectionStatus === 'none' && (
                              <button
                                onClick={() => handleConnectRequest(alumni.id)}
                                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                              >
                                Connect
                              </button>
                            )}
                            
                            {connectionStatus === 'pending' && (
                              <button
                                disabled
                                className="flex-1 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm cursor-not-allowed"
                              >
                                Pending
                              </button>
                            )}
                            
                            {connectionStatus === 'connected' && (
                              <button
                                className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm"
                              >
                                <MdMessage className="inline mr-1" />
                                Message
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredAlumni.length === 0 && (
              <div className="text-center py-12">
                <MdPeople className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Alumni Found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>
        )}

        {/* My Connections Tab */}
        {activeTab === 'connections' && (
          <div>
            {connections.length > 0 ? (
              <div className="space-y-4">
                {connections.map((connection) => {
                  const connectedAlumni = alumni.find(a => a.id === connection.alumniId);
                  if (!connectedAlumni) return null;
                  
                  return (
                    <div key={connection.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={connectedAlumni.avatar}
                            alt={connectedAlumni.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{connectedAlumni.name}</h3>
                            <p className="text-sm text-gray-600">{connectedAlumni.title} at {connectedAlumni.company}</p>
                            <p className="text-xs text-gray-500">
                              {connection.status === 'connected' 
                                ? `Connected on ${new Date(connection.connectedDate).toLocaleDateString()}`
                                : `Request sent on ${new Date(connection.requestDate).toLocaleDateString()}`
                              }
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {connection.status === 'connected' && (
                            <>
                              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                                <MdMessage className="inline mr-1" />
                                Message
                              </button>
                              <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                                View Profile
                              </button>
                            </>
                          )}
                          
                          {connection.status === 'pending' && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm">
                              Request Pending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <MdConnectWithoutContact className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Connections Yet</h3>
                <p className="text-gray-600 mb-4">Start connecting with alumni to build your network.</p>
                <button
                  onClick={() => setActiveTab('alumni')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Find Alumni
                </button>
              </div>
            )}
          </div>
        )}

        {/* Alumni Feed Tab */}
        {activeTab === 'feed' && (
          <div className="max-w-2xl mx-auto">
            {feedPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                        {post.author.verified && (
                          <MdVerified className="text-blue-500 text-sm" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{post.author.title} at {post.author.company}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.timestamp).toLocaleDateString()} • 
                        {new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-800 leading-relaxed">{post.content}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          post.liked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                        }`}
                      >
                        <MdThumbUp className={post.liked ? 'text-blue-600' : ''} />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                        <MdComment />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                        <MdShare />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {feedPosts.length === 0 && (
              <div className="text-center py-12">
                <MdForum className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Posts Yet</h3>
                <p className="text-gray-600">Connect with alumni to see their posts in your feed.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {showProfileModal && selectedAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedAlumni.avatar}
                    alt={selectedAlumni.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedAlumni.name}</h2>
                      {selectedAlumni.verified && (
                        <MdVerified className="text-blue-500 text-xl" />
                      )}
                    </div>
                    <p className="text-lg text-gray-600 mb-1">{selectedAlumni.title}</p>
                    <p className="text-lg font-medium text-gray-900 mb-2">{selectedAlumni.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MdLocationOn className="mr-1" />
                        {selectedAlumni.location}
                      </span>
                      <span className="flex items-center">
                        <MdSchool className="mr-1" />
                        {selectedAlumni.degree} • Class of {selectedAlumni.graduationYear}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xl font-bold text-gray-900">{selectedAlumni.connections}</div>
                  <div className="text-sm text-gray-600">Connections</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xl font-bold text-gray-900">{selectedAlumni.posts}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xl font-bold text-gray-900">{selectedAlumni.mentees}</div>
                  <div className="text-sm text-gray-600">Mentees</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700 leading-relaxed">{selectedAlumni.bio}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAlumni.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    handleConnectRequest(selectedAlumni.id);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Modal */}
      {showConnectModal && selectedAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">Connect with {selectedAlumni.name}</h2>
                <button
                  onClick={() => setShowConnectModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={selectedAlumni.avatar}
                    alt={selectedAlumni.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedAlumni.name}</h3>
                    <p className="text-sm text-gray-600">{selectedAlumni.title} at {selectedAlumni.company}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Message
                </label>
                <textarea
                  value={connectMessage}
                  onChange={(e) => setConnectMessage(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write a personal message..."
                />
              </div>

              <div className="flex space-x-3 justify-end">
                <button
                  onClick={() => setShowConnectModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitConnectRequest}
                  disabled={!connectMessage.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAlumniScreen;