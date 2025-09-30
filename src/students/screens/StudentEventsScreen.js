import React, { useState, useEffect, useCallback } from 'react';
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

  const loadEventsData = useCallback(async () => {
    setLoading(true);
    
    // Mock events data
    const mockEvents = [
      {
        id: 1,
        title: 'Alumni Career Fair 2024',
        description: 'Connect with alumni from top Indian companies and explore career opportunities across various industries. Network with professionals from leading Indian corporations.',
        type: 'career',
        date: '2024-02-15',
        time: '10:00 AM - 4:00 PM',
        location: 'University Campus - Central Auditorium, Bangalore',
        mode: 'in-person',
        organizer: 'Career Services',
        organizerAvatar: 'https://via.placeholder.com/40x40/6B73FF/FFFFFF?text=CS',
        maxAttendees: 500,
        currentAttendees: 234,
        registrationDeadline: '2024-02-10',
        isPaid: false,
        price: 0,
        tags: ['Career', 'Networking', 'Job Fair'],
        speakers: [
          { name: 'Priya Sharma', title: 'Sr. Engineer at Infosys', company: 'Infosys' },
          { name: 'Arjun Gupta', title: 'Product Manager at Flipkart', company: 'Flipkart' }
        ],
        agenda: [
          { time: '10:00 AM', activity: 'Registration & Welcome Coffee' },
          { time: '11:00 AM', activity: 'Opening Keynote' },
          { time: '12:00 PM', activity: 'Company Booths & Networking' },
          { time: '2:00 PM', activity: 'Panel Discussion: Career Paths in Tech' },
          { time: '3:30 PM', activity: 'One-on-One Career Consultations' }
        ],
        requirements: ['Business attire required', 'Bring multiple copies of your resume'],
        image: 'https://via.placeholder.com/400x200/6B73FF/FFFFFF?text=Career+Fair',
        status: 'upcoming'
      },
      {
        id: 2,
        title: 'Tech Talk: AI in Healthcare India',
        description: 'Join us for an insightful discussion on how artificial intelligence is revolutionizing healthcare in India. Learn from industry experts about innovations in Indian healthcare tech.',
        type: 'workshop',
        date: '2024-02-20',
        time: '6:00 PM - 8:00 PM',
        location: 'Virtual Event',
        mode: 'virtual',
        organizer: 'Computer Science Department',
        organizerAvatar: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=CS',
        maxAttendees: 200,
        currentAttendees: 156,
        registrationDeadline: '2024-02-18',
        isPaid: false,
        price: 0,
        tags: ['Technology', 'AI', 'Healthcare'],
        speakers: [
          { name: 'Dr. Kavita Nair', title: 'Data Scientist at Microsoft Research India', company: 'Microsoft Research India' },
          { name: 'Dr. James Wilson', title: 'Chief Medical Officer', company: 'MedTech Solutions' }
        ],
        agenda: [
          { time: '6:00 PM', activity: 'Welcome & Introductions' },
          { time: '6:15 PM', activity: 'Keynote: AI in Medical Diagnosis' },
          { time: '7:00 PM', activity: 'Case Studies & Demo' },
          { time: '7:30 PM', activity: 'Q&A Session' }
        ],
        requirements: ['Laptop/device for virtual attendance', 'Basic understanding of AI concepts helpful'],
        image: 'https://via.placeholder.com/400x200/10B981/FFFFFF?text=AI+Healthcare',
        status: 'upcoming',
        meetingLink: 'https://zoom.us/j/1234567890'
      },
      {
        id: 3,
        title: 'Startup Pitch Competition',
        description: 'Watch student entrepreneurs pitch their innovative startup ideas to a panel of investors and alumni. Great networking opportunity!',
        type: 'competition',
        date: '2024-03-05',
        time: '2:00 PM - 6:00 PM',
        location: 'Innovation Hub - Conference Room A',
        mode: 'hybrid',
        organizer: 'Entrepreneurship Club',
        organizerAvatar: 'https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=EC',
        maxAttendees: 150,
        currentAttendees: 89,
        registrationDeadline: '2024-03-01',
        isPaid: true,
        price: 15,
        tags: ['Entrepreneurship', 'Startups', 'Innovation'],
        speakers: [
          { name: 'David Kim', title: 'Venture Partner', company: 'Tech Ventures' },
          { name: 'Lisa Zhang', title: 'Startup Founder', company: 'EduTech Inc' }
        ],
        agenda: [
          { time: '2:00 PM', activity: 'Registration & Networking' },
          { time: '2:30 PM', activity: 'Opening Remarks' },
          { time: '3:00 PM', activity: 'Startup Pitches (Round 1)' },
          { time: '4:30 PM', activity: 'Break & Networking' },
          { time: '5:00 PM', activity: 'Final Pitches & Judging' },
          { time: '5:45 PM', activity: 'Awards & Closing' }
        ],
        requirements: ['Registration fee: $15', 'Valid student ID required'],
        image: 'https://via.placeholder.com/400x200/F59E0B/FFFFFF?text=Startup+Pitch',
        status: 'upcoming'
      },
      {
        id: 4,
        title: 'Alumni Homecoming Weekend',
        description: 'Annual homecoming celebration with alumni networking, campus tours, and special events. Reconnect with the university community.',
        type: 'social',
        date: '2024-03-15',
        time: '9:00 AM - 10:00 PM',
        location: 'Multiple Campus Locations',
        mode: 'in-person',
        organizer: 'Alumni Relations',
        organizerAvatar: 'https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=AR',
        maxAttendees: 1000,
        currentAttendees: 567,
        registrationDeadline: '2024-03-10',
        isPaid: true,
        price: 25,
        tags: ['Alumni', 'Networking', 'Social'],
        speakers: [
          { name: 'President Smith', title: 'University President', company: 'University' },
          { name: 'Various Alumni', title: 'Distinguished Speakers', company: 'Multiple Companies' }
        ],
        agenda: [
          { time: '9:00 AM', activity: 'Registration & Welcome Breakfast' },
          { time: '10:30 AM', activity: 'Campus Tours' },
          { time: '12:00 PM', activity: 'Alumni Luncheon' },
          { time: '2:00 PM', activity: 'Department Reunions' },
          { time: '4:00 PM', activity: 'Career Fair' },
          { time: '6:00 PM', activity: 'Evening Gala Dinner' },
          { time: '8:00 PM', activity: 'Entertainment & Dancing' }
        ],
        requirements: ['Event ticket: $25', 'Formal attire for evening gala'],
        image: 'https://via.placeholder.com/400x200/8B5CF6/FFFFFF?text=Homecoming',
        status: 'upcoming'
      }
    ];

    const mockRegisteredEvents = [1, 2]; // User is registered for events 1 and 2
    const mockSavedEvents = [3]; // User has saved event 3

    // Apply filters
    let filteredEvents = mockEvents;
    
    if (filterBy !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.type === filterBy);
    }

    if (searchTerm) {
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort events
    filteredEvents.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'popularity':
          return b.currentAttendees - a.currentAttendees;
        case 'price':
          return a.price - b.price;
        default:
          return new Date(a.date) - new Date(b.date);
      }
    });

    setEvents(filteredEvents);
    setRegisteredEvents(mockRegisteredEvents);
    setSavedEvents(mockSavedEvents);
    setLoading(false);
  }, [filterBy, sortBy, searchTerm]);

  useEffect(() => {
    loadEventsData();
  }, [loadEventsData]);

  const handleRegisterEvent = (event) => {
    setSelectedEvent(event);
    setRegistrationData({
      questions: {},
      dietaryRequirements: '',
      additionalInfo: ''
    });
    setShowRegistrationModal(true);
  };

  const submitRegistration = async () => {
    if (!selectedEvent) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add to registered events
      setRegisteredEvents(prev => [...prev, selectedEvent.id]);
      
      setShowRegistrationModal(false);
      setSelectedEvent(null);
      alert('Registration successful! You will receive a confirmation email shortly.');
    } catch (error) {
      alert('Error registering for event');
    }
  };

  const handleSaveEvent = (eventId) => {
    setSavedEvents(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  const isRegistered = (eventId) => registeredEvents.includes(eventId);
  const isSaved = (eventId) => savedEvents.includes(eventId);

  const getEventsByTab = () => {
    switch (activeTab) {
      case 'registered':
        return events.filter(event => isRegistered(event.id));
      case 'saved':
        return events.filter(event => isSaved(event.id));
      default:
        return events;
    }
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      career: MdBusiness,
      workshop: MdSchool,
      competition: MdGroup,
      social: MdPeople
    };
    return icons[type] || MdEvent;
  };

  const getEventTypeColor = (type) => {
    const colors = {
      career: 'bg-blue-100 text-blue-700',
      workshop: 'bg-green-100 text-green-700',
      competition: 'bg-purple-100 text-purple-700',
      social: 'bg-orange-100 text-orange-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
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
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <p className="text-gray-600">Discover and register for university events and alumni gatherings</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b px-6 ml-64">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'upcoming'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('registered')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors relative ${
              activeTab === 'registered'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Registrations
            {registeredEvents.length > 0 && (
              <span className="ml-2 bg-purple-500 text-white text-xs rounded-full px-2 py-1">
                {registeredEvents.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors relative ${
              activeTab === 'saved'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Saved Events
            {savedEvents.length > 0 && (
              <span className="ml-2 bg-purple-500 text-white text-xs rounded-full px-2 py-1">
                {savedEvents.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="p-6 ml-64">
        {/* Search and Filters */}
        {activeTab === 'upcoming' && (
          <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="career">Career Events</option>
                <option value="workshop">Workshops</option>
                <option value="competition">Competitions</option>
                <option value="social">Social Events</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="popularity">Sort by Popularity</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
          </div>
        )}

        {/* Events List */}
        <div className="space-y-6">
          {getEventsByTab().map((event) => {
            const EventTypeIcon = getEventTypeIcon(event.type);
            
            return (
              <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                            <EventTypeIcon className="mr-1" />
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                          {event.isPaid && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                              ${event.price}
                            </span>
                          )}
                          {!event.isPaid && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Free
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <MdCalendarToday className="mr-2 text-purple-500" />
                            <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MdLocationOn className="mr-2 text-purple-500" />
                            <span className="flex items-center">
                              {event.location}
                              {event.mode === 'virtual' && <MdVideoCall className="ml-1 text-blue-500" />}
                              {event.mode === 'hybrid' && <MdPlace className="ml-1 text-green-500" />}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MdPeople className="mr-2 text-purple-500" />
                            <span>{event.currentAttendees}/{event.maxAttendees} attendees</span>
                          </div>
                          <div className="flex items-center">
                            <MdAccessTime className="mr-2 text-purple-500" />
                            <span>Register by {new Date(event.registrationDeadline).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                          <img
                            src={event.organizerAvatar}
                            alt={event.organizer}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-gray-600">Organized by {event.organizer}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <button
                          onClick={() => handleSaveEvent(event.id)}
                          className="p-2 text-gray-400 hover:text-purple-500 transition-colors"
                        >
                          {isSaved(event.id) ? <MdBookmark className="text-purple-500" /> : <MdBookmarkBorder />}
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <MdShare />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowEventModal(true);
                          }}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm transition-colors"
                        >
                          <MdInfo className="inline mr-1" />
                          View Details
                        </button>
                        
                        {!isRegistered(event.id) ? (
                          <button
                            onClick={() => handleRegisterEvent(event)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm transition-colors"
                          >
                            Register Now
                          </button>
                        ) : (
                          <button
                            disabled
                            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm cursor-not-allowed"
                          >
                            <MdCheckCircle className="inline mr-1" />
                            Registered
                          </button>
                        )}
                      </div>

                      <div className="text-right text-sm text-gray-500">
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                          ></div>
                        </div>
                        <span>{Math.round((event.currentAttendees / event.maxAttendees) * 100)}% full</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {getEventsByTab().length === 0 && (
          <div className="text-center py-12">
            <MdEvent className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'registered' && 'No Registered Events'}
              {activeTab === 'saved' && 'No Saved Events'}
              {activeTab === 'upcoming' && 'No Events Found'}
            </h3>
            <p className="text-gray-600">
              {activeTab === 'registered' && "You haven't registered for any events yet."}
              {activeTab === 'saved' && "You haven't saved any events yet."}
              {activeTab === 'upcoming' && "Try adjusting your search criteria or filters."}
            </p>
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span className="flex items-center">
                      <MdCalendarToday className="mr-2" />
                      {new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.time}
                    </span>
                    <span className="flex items-center">
                      <MdLocationOn className="mr-2" />
                      {selectedEvent.location}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Event</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                  </div>

                  {selectedEvent.speakers.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Speakers</h3>
                      <div className="space-y-3">
                        {selectedEvent.speakers.map((speaker, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <MdMic className="text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{speaker.name}</p>
                              <p className="text-sm text-gray-600">{speaker.title} • {speaker.company}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Agenda</h3>
                    <div className="space-y-3">
                      {selectedEvent.agenda.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-20 text-sm text-gray-600 font-medium">{item.time}</div>
                          <div className="flex-1 text-gray-700">{item.activity}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedEvent.requirements.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                      <ul className="space-y-2">
                        {selectedEvent.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Event Details</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-600">Organizer:</span>
                        <span className="ml-2 font-medium">{selectedEvent.organizer}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Mode:</span>
                        <span className="ml-2 font-medium capitalize">{selectedEvent.mode}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <span className="ml-2 font-medium">{selectedEvent.isPaid ? `$${selectedEvent.price}` : 'Free'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Capacity:</span>
                        <span className="ml-2 font-medium">{selectedEvent.maxAttendees} people</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Registered:</span>
                        <span className="ml-2 font-medium">{selectedEvent.currentAttendees} people</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Deadline:</span>
                        <span className="ml-2 font-medium">{new Date(selectedEvent.registrationDeadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setShowEventModal(false)}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                    
                    {!isRegistered(selectedEvent.id) ? (
                      <button
                        onClick={() => {
                          setShowEventModal(false);
                          handleRegisterEvent(selectedEvent);
                        }}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Register Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg cursor-not-allowed"
                      >
                        <MdCheckCircle className="inline mr-1" />
                        Already Registered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">Register for Event</h2>
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">{selectedEvent.title}</h3>
                <div className="text-sm text-gray-600">
                  <p>{new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.time}</p>
                  <p>{selectedEvent.location}</p>
                  {selectedEvent.isPaid && <p className="font-medium">Price: ${selectedEvent.price}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Requirements (Optional)
                </label>
                <textarea
                  value={registrationData.dietaryRequirements}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, dietaryRequirements: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Any dietary restrictions or allergies?"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  value={registrationData.additionalInfo}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Any questions or special requests?"
                />
              </div>

              <div className="flex space-x-3 justify-end">
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitRegistration}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {selectedEvent.isPaid ? `Pay $${selectedEvent.price} & Register` : 'Register Free'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEventsScreen;