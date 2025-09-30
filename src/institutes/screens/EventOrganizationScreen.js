import React, { useState, useEffect } from 'react';
import InstituteNavbar from '../components/InstituteNavbar';
import InstituteSidebar from '../components/InstituteSidebar';
import DataTable from '../components/DataTable';
import InstituteModal from '../components/InstituteModal';
import StatsCard from '../components/StatsCard';
import { 
  MdSearch, 
  MdAdd, 
  MdEvent,
  MdLocationOn,
  MdCalendarToday,
  MdPeople,
  MdFileDownload,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdAccessTime,
  MdCheckCircle,
  MdBarChart
} from 'react-icons/md';

const EventOrganizationScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Modal States
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    type: 'Workshop',
    date: '',
    time: '',
    location: '',
    capacity: '',
    registrationDeadline: '',
    targetAudience: [],
    requirements: '',
    organizer: '',
    contactInfo: ''
  });

  // Stats
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    totalAttendees: 0,
    avgAttendance: 0
  });

  useEffect(() => {
    fetchEvents();
    fetchStats();
  }, []);

  useEffect(() => {
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Mock data for events
      const mockEvents = [
        {
          id: 1,
          title: 'Alumni Networking Session',
          description: 'Connect with industry professionals and successful alumni',
          type: 'Networking',
          date: '2025-10-15',
          time: '18:00',
          location: 'Main Auditorium',
          capacity: 200,
          registrations: 145,
          status: 'Upcoming',
          organizer: 'Alumni Relations Team',
          targetAudience: ['All Students', 'Alumni'],
          registrationDeadline: '2025-10-10'
        },
        {
          id: 2,
          title: 'Tech Summit 2025',
          description: 'Annual technology conference featuring industry leaders',
          type: 'Conference',
          date: '2025-11-20',
          time: '09:00',
          location: 'Convention Center',
          capacity: 500,
          registrations: 320,
          status: 'Upcoming',
          organizer: 'Tech Department',
          targetAudience: ['Students', 'Faculty', 'Industry'],
          registrationDeadline: '2025-11-15'
        },
        {
          id: 3,
          title: 'Career Development Workshop',
          description: 'Resume building and interview preparation session',
          type: 'Workshop',
          date: '2025-09-25',
          time: '14:00',
          location: 'Seminar Hall A',
          capacity: 100,
          registrations: 98,
          status: 'Completed',
          organizer: 'Career Services',
          targetAudience: ['Final Year Students'],
          registrationDeadline: '2025-09-20'
        },
        {
          id: 4,
          title: 'Startup Pitch Competition',
          description: 'Students present their startup ideas to industry experts',
          type: 'Competition',
          date: '2025-12-10',
          time: '10:00',
          location: 'Innovation Hub',
          capacity: 150,
          registrations: 45,
          status: 'Open',
          organizer: 'Entrepreneurship Cell',
          targetAudience: ['All Students'],
          registrationDeadline: '2025-12-05'
        }
      ];
      
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      // Mock stats
      const mockStats = {
        totalEvents: 24,
        upcomingEvents: 8,
        completedEvents: 12,
        totalAttendees: 2340,
        avgAttendance: 85.6
      };
      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddEvent = () => {
    setEventForm({
      title: '',
      description: '',
      type: 'Workshop',
      date: '',
      time: '',
      location: '',
      capacity: '',
      registrationDeadline: '',
      targetAudience: [],
      requirements: '',
      organizer: '',
      contactInfo: ''
    });
    setSelectedEvent(null);
    setIsEditing(false);
    setShowEventModal(true);
  };

  const handleEditEvent = (event) => {
    setEventForm({
      title: event.title,
      description: event.description,
      type: event.type,
      date: event.date,
      time: event.time,
      location: event.location,
      capacity: event.capacity.toString(),
      registrationDeadline: event.registrationDeadline,
      targetAudience: event.targetAudience,
      requirements: event.requirements || '',
      organizer: event.organizer,
      contactInfo: event.contactInfo || ''
    });
    setSelectedEvent(event);
    setIsEditing(true);
    setShowEventModal(true);
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
    setIsEditing(false);
  };

  const handleSaveEvent = async () => {
    try {
      if (isEditing) {
        // Update existing event
        const updatedEvents = events.map(event =>
          event.id === selectedEvent.id
            ? { ...event, ...eventForm, capacity: parseInt(eventForm.capacity) }
            : event
        );
        setEvents(updatedEvents);
      } else {
        // Add new event
        const newEvent = {
          id: events.length + 1,
          ...eventForm,
          capacity: parseInt(eventForm.capacity),
          registrations: 0,
          status: 'Open'
        };
        setEvents([...events, newEvent]);
      }
      setShowEventModal(false);
      fetchStats();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
      fetchStats();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const tableHeaders = [
    'Event', 'Type', 'Date & Time', 'Location', 'Capacity', 'Status', 'Actions'
  ];

  const renderEventRow = (event) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900">{event.title}</div>
          <div className="text-sm text-gray-500">{event.organizer}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          event.type === 'Conference' ? 'bg-purple-100 text-purple-800' :
          event.type === 'Workshop' ? 'bg-blue-100 text-blue-800' :
          event.type === 'Networking' ? 'bg-green-100 text-green-800' :
          'bg-orange-100 text-orange-800'
        }`}>
          {event.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex items-center space-x-2">
          <MdCalendarToday className="text-gray-400" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <MdAccessTime className="text-gray-400" />
          <span>{event.time}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2 text-sm text-gray-900">
          <MdLocationOn className="text-gray-400" />
          <span>{event.location}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div>
          <div className="font-medium">{event.registrations}/{event.capacity}</div>
          <div className="text-xs text-gray-500">
            {((event.registrations / event.capacity) * 100).toFixed(0)}% filled
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          event.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
          event.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
          'bg-green-100 text-green-800'
        }`}>
          {event.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleViewEvent(event);
          }}
          className="text-emerald-600 hover:text-emerald-900"
        >
          <MdVisibility />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEditEvent(event);
          }}
          className="text-blue-600 hover:text-blue-900"
        >
          <MdEdit />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('Are you sure you want to delete this event?')) {
              handleDeleteEvent(event.id);
            }
          }}
          className="text-red-600 hover:text-red-900"
        >
          <MdDelete />
        </button>
      </td>
    </>
  );

  const eventTypes = ['Workshop', 'Conference', 'Networking', 'Competition', 'Seminar'];
  const audienceOptions = ['All Students', 'Alumni', 'Faculty', 'Industry', 'Final Year Students'];

  return (
    <div className="min-h-screen bg-gray-50">
      <InstituteNavbar />
      
      <div className="flex pt-16">
        <InstituteSidebar upcomingEventsCount={stats.upcomingEvents} />
        
        <div className="flex-1 ml-64 overflow-x-hidden">
          {/* Page Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Event Organization</h1>
                <p className="text-gray-600">Create and manage institutional events, workshops, and conferences</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddEvent}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                >
                  <MdAdd />
                  <span>Create Event</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
              <StatsCard
                title="Total Events"
                value={stats.totalEvents}
                icon={MdEvent}
                color="emerald"
                trend="+12%"
              />
              <StatsCard
                title="Upcoming Events"
                value={stats.upcomingEvents}
                icon={MdCalendarToday}
                color="blue"
                trend="+8%"
              />
              <StatsCard
                title="Completed Events"
                value={stats.completedEvents}
                icon={MdCheckCircle}
                color="green"
                trend="+25%"
              />
              <StatsCard
                title="Total Attendees"
                value={stats.totalAttendees.toLocaleString()}
                icon={MdPeople}
                color="purple"
                trend="+18%"
              />
              <StatsCard
                title="Avg. Attendance"
                value={`${stats.avgAttendance}%`}
                icon={MdBarChart}
                color="orange"
                trend="+5.2%"
              />
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Event Management</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Events Table */}
              <div className="overflow-x-auto">
                <DataTable
                  headers={tableHeaders}
                  data={filteredEvents}
                  renderRow={renderEventRow}
                  loading={loading}
                  emptyMessage="No events found"
                  onRowClick={handleViewEvent}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <InstituteModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        title={isEditing ? 'Edit Event' : selectedEvent ? 'Event Details' : 'Create New Event'}
        size="large"
      >
        {selectedEvent && !isEditing ? (
          // View Mode
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h3>
                <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Event Type</span>
                    <p className="text-gray-900">{selectedEvent.type}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Organizer</span>
                    <p className="text-gray-900">{selectedEvent.organizer}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Date & Time</span>
                    <p className="text-gray-900">{selectedEvent.date} at {selectedEvent.time}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Location</span>
                    <p className="text-gray-900">{selectedEvent.location}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Capacity</span>
                    <p className="text-gray-900">{selectedEvent.registrations}/{selectedEvent.capacity}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Registration Deadline</span>
                    <p className="text-gray-900">{selectedEvent.registrationDeadline}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-500">Target Audience</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedEvent.targetAudience.map((audience, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleEditEvent(selectedEvent)}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                <MdEdit />
                <span>Edit Event</span>
              </button>
            </div>
          </div>
        ) : (
          // Edit/Create Mode
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter event title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type
                </label>
                <select
                  value={eventForm.type}
                  onChange={(e) => setEventForm({...eventForm, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={eventForm.description}
                onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter event description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={eventForm.time}
                  onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  value={eventForm.capacity}
                  onChange={(e) => setEventForm({...eventForm, capacity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Max attendees"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Event venue"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Deadline
                </label>
                <input
                  type="date"
                  value={eventForm.registrationDeadline}
                  onChange={(e) => setEventForm({...eventForm, registrationDeadline: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organizer
              </label>
              <input
                type="text"
                value={eventForm.organizer}
                onChange={(e) => setEventForm({...eventForm, organizer: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Organizing department/team"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvent}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                {isEditing ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </div>
        )}
      </InstituteModal>
    </div>
  );
};

export default EventOrganizationScreen;