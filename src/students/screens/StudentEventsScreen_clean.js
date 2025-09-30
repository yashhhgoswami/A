import React, { useState, useEffect } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import StudentNavbar from '../components/StudentNavbar';
import { 
  MdEvent, 
  MdLocationOn, 
  MdAccessTime,
  MdPeople,
  MdCalendarToday,
  MdBookmark,
  MdBookmarkBorder,
  MdShare,
  MdInfo,
  MdSchool,
  MdBusiness,
  MdGroup,
  MdMic,
  MdVideoCall,
  MdPlace,
  MdSearch,
  MdCheckCircle
} from 'react-icons/md';

const StudentEventsScreen = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  // Events data
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  
  // Modal states
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    questions: {},
    dietaryRequirements: '',
    additionalInfo: ''
  });

  useEffect(() => {
    const loadEventsData = async () => {
      try {
        setLoading(true);
        
        // Mock events data
        const mockEvents = [
          {
            id: 1,
            title: 'Alumni Tech Talk: AI in Industry',
            date: '2024-02-15',
            time: '18:00',
            location: 'Main Auditorium',
            type: 'Seminar',
            organizer: 'CS Department',
            description: 'Join our distinguished alumni for insights into AI applications in various industries.',
            attendees: 156,
            maxAttendees: 200,
            image: 'https://via.placeholder.com/400x200',
            isRegistered: false,
            isSaved: false,
            tags: ['AI', 'Technology', 'Career']
          },
          {
            id: 2,
            title: 'Career Fair 2024',
            date: '2024-02-20',
            time: '10:00',
            location: 'Sports Complex',
            type: 'Career Fair',
            organizer: 'Placement Cell',
            description: 'Meet with top companies and explore career opportunities.',
            attendees: 342,
            maxAttendees: 500,
            image: 'https://via.placeholder.com/400x200',
            isRegistered: true,
            isSaved: true,
            tags: ['Career', 'Jobs', 'Networking']
          },
          {
            id: 3,
            title: 'Alumni Homecoming 2024',
            date: '2024-03-01',
            time: '09:00',
            location: 'University Campus',
            type: 'Social',
            organizer: 'Alumni Association',
            description: 'Annual homecoming celebration with alumni from all batches.',
            attendees: 450,
            maxAttendees: 600,
            image: 'https://via.placeholder.com/400x200',
            isRegistered: false,
            isSaved: false,
            tags: ['Social', 'Alumni', 'Celebration']
          }
        ];
        
        const mockRegisteredEvents = [2];
        const mockSavedEvents = [3];
        
        setEvents(mockEvents);
        setRegisteredEvents(mockRegisteredEvents);
        setSavedEvents(mockSavedEvents);
      } catch (err) {
        console.error('Failed to load events data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadEventsData();
  }, []);

  // Filter and sort events
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterBy === 'all' || event.type === filterBy;
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'popularity':
        return b.attendees - a.attendees;
      case 'date':
      default:
        return new Date(a.date) - new Date(b.date);
    }
  });

  const handleRegisterEvent = (event) => {
    setSelectedEvent(event);
    setRegistrationData({
      questions: {},
      dietaryRequirements: '',
      additionalInfo: ''
    });
    setShowRegistrationModal(true);
  };

  const handleSaveEvent = (eventId) => {
    if (savedEvents.includes(eventId)) {
      setSavedEvents(prev => prev.filter(id => id !== eventId));
    } else {
      setSavedEvents(prev => [...prev, eventId]);
    }
  };

  const submitRegistration = async () => {
    if (!selectedEvent) return;

    try {
      // Mock registration logic
      setRegisteredEvents(prev => [...prev, selectedEvent.id]);
      setShowRegistrationModal(false);
      setSelectedEvent(null);
      console.log('Registration successful for event:', selectedEvent.title);
    } catch (error) {
      console.error('Registration failed:', error);
    }
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
            <p className="text-gray-600">Discover and participate in university events and activities</p>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'upcoming'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Upcoming Events
                </button>
                <button
                  onClick={() => setActiveTab('registered')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'registered'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  My Registrations
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'saved'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Saved Events
                </button>
              </nav>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events by title, description, or tags..."
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
                <option value="all">All Types</option>
                <option value="Seminar">Seminars</option>
                <option value="Career Fair">Career Fairs</option>
                <option value="Social">Social Events</option>
                <option value="Workshop">Workshops</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents
              .filter(event => {
                if (activeTab === 'registered') return registeredEvents.includes(event.id);
                if (activeTab === 'saved') return savedEvents.includes(event.id);
                return true; // upcoming
              })
              .map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {event.type}
                      </span>
                      <button
                        onClick={() => handleSaveEvent(event.id)}
                        className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                      >
                        {savedEvents.includes(event.id) ? (
                          <MdBookmark className="w-5 h-5" />
                        ) : (
                          <MdBookmarkBorder className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <MdCalendarToday className="w-4 h-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MdLocationOn className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MdPeople className="w-4 h-4 mr-2" />
                        {event.attendees}/{event.maxAttendees} attendees
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      {registeredEvents.includes(event.id) ? (
                        <div className="flex-1 px-4 py-2 bg-green-100 text-green-800 rounded-lg flex items-center justify-center space-x-2">
                          <MdCheckCircle className="w-4 h-4" />
                          <span>Registered</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRegisterEvent(event)}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          Register
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventModal(true);
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <MdInfo className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {filteredEvents.filter(event => {
            if (activeTab === 'registered') return registeredEvents.includes(event.id);
            if (activeTab === 'saved') return savedEvents.includes(event.id);
            return true;
          }).length === 0 && (
            <div className="text-center py-12">
              <MdEvent className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">
                {activeTab === 'registered' ? 'You haven\'t registered for any events yet.' :
                 activeTab === 'saved' ? 'You haven\'t saved any events yet.' :
                 'Try adjusting your search criteria or filters'}
              </p>
            </div>
          )}
        </div>

        {/* Registration Modal */}
        {showRegistrationModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Register for {selectedEvent.title}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dietary Requirements
                  </label>
                  <textarea
                    value={registrationData.dietaryRequirements}
                    onChange={(e) => setRegistrationData(prev => ({
                      ...prev,
                      dietaryRequirements: e.target.value
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                    placeholder="Any dietary restrictions or preferences..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    value={registrationData.additionalInfo}
                    onChange={(e) => setRegistrationData(prev => ({
                      ...prev,
                      additionalInfo: e.target.value
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Any questions or additional information..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={submitRegistration}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Event Details Modal */}
        {showEventModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-4">
                <p className="text-gray-600">{selectedEvent.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <MdCalendarToday className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">Date & Time</div>
                      <div className="text-sm text-gray-600">
                        {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MdLocationOn className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-gray-600">{selectedEvent.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MdBusiness className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">Organizer</div>
                      <div className="text-sm text-gray-600">{selectedEvent.organizer}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MdPeople className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">Attendance</div>
                      <div className="text-sm text-gray-600">
                        {selectedEvent.attendees}/{selectedEvent.maxAttendees} registered
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentEventsScreen;