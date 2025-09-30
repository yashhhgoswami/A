import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const loadAlumniData = async () => {
      try {
        setLoading(true);
        // Load mock alumni data
        const mockAlumni = [
          {
            id: 1,
            name: 'Arjun Sharma',
            graduationYear: 2020,
            major: 'Computer Science',
            company: 'Google',
            position: 'Senior Software Engineer',
            location: 'Bangalore, India',
            profileImage: 'https://via.placeholder.com/150',
            skills: ['React', 'Node.js', 'Python'],
            connections: 245,
            isVerified: true
          },
          {
            id: 2,
            name: 'Priya Patel',
            graduationYear: 2019,
            major: 'Business Administration',
            company: 'Microsoft',
            position: 'Product Manager',
            location: 'Hyderabad, India',
            profileImage: 'https://via.placeholder.com/150',
            skills: ['Product Management', 'Strategy', 'Analytics'],
            connections: 189,
            isVerified: true
          }
        ];
        setAlumni(mockAlumni);
      } catch (err) {
        console.error('Failed to load alumni data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadAlumniData();
  }, []);

  // Filter alumni based on search and filters
  const filteredAlumni = alumni.filter(alumnus => {
    const matchesSearch = alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.major.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'verified' && alumnus.isVerified) ||
                         (filterBy === 'company' && alumnus.company) ||
                         (filterBy === 'location' && alumnus.location);
    
    return matchesSearch && matchesFilter;
  });

  const handleConnect = async (alumniId) => {
    try {
      // Mock connection logic
      console.log('Connecting to alumni:', alumniId);
      setShowConnectModal(false);
      setConnectMessage('');
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleMessage = (alumniId) => {
    console.log('Messaging alumni:', alumniId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <StudentSidebar />
        <div className="flex-1 ml-64">
          <StudentNavbar />
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <StudentSidebar />
      <div className="flex-1 ml-64">
        <StudentNavbar />
        
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Network</h1>
            <p className="text-gray-600">Connect with alumni, find mentors, and grow your professional network</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alumni by name, company, or field..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Alumni</option>
                <option value="verified">Verified Only</option>
                <option value="company">With Company Info</option>
                <option value="location">With Location</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="name">Name (A-Z)</option>
                <option value="year">Graduation Year</option>
                <option value="company">Company</option>
              </select>
            </div>
          </div>

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alumnus) => (
              <div key={alumnus.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={alumnus.profileImage}
                      alt={alumnus.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{alumnus.name}</h3>
                        {alumnus.isVerified && (
                          <MdVerified className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <p className="text-blue-600 font-medium">{alumnus.position}</p>
                      <p className="text-gray-600">{alumnus.company}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <MdSchool className="w-4 h-4 mr-1" />
                          {alumnus.graduationYear}
                        </span>
                        <span className="flex items-center">
                          <MdLocationOn className="w-4 h-4 mr-1" />
                          {alumnus.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1">
                      {alumnus.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {alumnus.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{alumnus.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleConnect(alumnus.id)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <MdConnectWithoutContact className="w-4 h-4" />
                      <span>Connect</span>
                    </button>
                    <button
                      onClick={() => handleMessage(alumnus.id)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <MdMessage className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAlumni.length === 0 && (
            <div className="text-center py-12">
              <MdPeople className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAlumniScreen;