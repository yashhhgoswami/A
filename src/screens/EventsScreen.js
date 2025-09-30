import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEvents, rsvpToEvent, getEventInvitations, respondToInvitation, getPendingInvitations } from '../services/eventService';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import Modal from '../components/Modal';
import { 
  MdDashboard, 
  MdPeople, 
  MdEvent, 
  MdPerson,
  MdSettings,
  MdNotifications,
  MdCalendarToday,
  MdLocationOn,
  MdSchedule,
  MdError,
  MdCheckCircle,
  MdWarning,
  MdEventNote,
  MdCheck,
  MdClose,
  MdAccessTime
} from 'react-icons/md';

const EventsScreen = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [invitationLoading, setInvitationLoading] = useState(false);
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const eventsResult = await getAllEvents();
        setEvents(eventsResult.events);

        if (currentUser?.id) {
          const [invitationsRes, pendingRes] = await Promise.all([
            getEventInvitations(currentUser.id),
            getPendingInvitations(currentUser.id)
          ]);
          
          setInvitations(invitationsRes.invitations || []);
          setPendingInvitations(pendingRes.invitations || []);
        }
      } catch (err) {
        setError('Failed to load events');
        console.error('Events fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser?.id]);

  const handleRSVP = (eventId) => {
    const event = events.find(e => e.id === eventId);
    setSelectedEvent(event);
    setRsvpModalOpen(true);
  };

  const confirmRSVP = async () => {
    if (!selectedEvent || !currentUser) return;

    try {
      setRsvpLoading(true);
      const result = await rsvpToEvent(selectedEvent.id, currentUser.id);
      
      // Update the event in the local state
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === selectedEvent.id
            ? { ...event, currentAttendees: event.currentAttendees + 1 }
            : event
        )
      );

      setRsvpSuccess(true);
      setRsvpMessage(result.message);
    } catch (err) {
      setRsvpSuccess(false);
      setRsvpMessage(err.message);
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleInvitationResponse = async (invitationId, response) => {
    setInvitationLoading(true);
    try {
      const result = await respondToInvitation(invitationId, response, currentUser.id);
      setResponseMessage(result.message);
      
      // Reload invitations and events to reflect changes
      const [invitationsRes, pendingRes, eventsResult] = await Promise.all([
        getEventInvitations(currentUser.id),
        getPendingInvitations(currentUser.id),
        getAllEvents()
      ]);
      
      setInvitations(invitationsRes.invitations || []);
      setPendingInvitations(pendingRes.invitations || []);
      setEvents(eventsResult.events || []);
      
      // Show success message for 3 seconds
      setTimeout(() => setResponseMessage(''), 3000);
    } catch (error) {
      setResponseMessage(error.message || 'Failed to respond to invitation');
      setTimeout(() => setResponseMessage(''), 3000);
    } finally {
      setInvitationLoading(false);
    }
  };

  const closeRsvpModal = () => {
    setRsvpModalOpen(false);
    setSelectedEvent(null);
    setRsvpSuccess(false);
    setRsvpMessage('');
    setRsvpLoading(false);
  };

  const getUpcomingEvents = () => {
    const currentDate = new Date();
    return events
      .filter(event => new Date(event.date) >= currentDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getPastEvents = () => {
    const currentDate = new Date();
    return events
      .filter(event => new Date(event.date) < currentDate)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
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

  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <div className="min-h-screen bg-gray-50 flex pt-16"> {/* Added pt-16 to account for fixed navbar */}
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed top-16 h-[calc(100vh-4rem)] z-20"> {/* Added top-16 and adjusted height */}
        <div className="p-6">
          {/* Navigation menu without branding */}
        </div>

        <nav className="px-4 pb-4">
          <div className="space-y-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors w-full text-left"
            >
              <MdDashboard className="text-lg" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate('/alumni')}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors w-full text-left"
            >
              <MdPeople className="text-lg" />
              <span>Alumni Directory</span>
            </button>

            <button
              className="flex items-center space-x-3 px-4 py-3 text-purple-700 bg-purple-50 rounded-lg font-medium w-full text-left"
            >
              <MdEvent className="text-lg" />
              <span>Events</span>
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors w-full text-left"
            >
              <MdPerson className="text-lg" />
              <span>Profile</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Events & Activities</h1>
              <p className="text-gray-600">Stay connected with your alumni community</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <MdSettings className="text-lg" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <MdNotifications className="text-lg" />
                {pendingInvitations.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                    {pendingInvitations.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b px-6">
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
              onClick={() => setActiveTab('past')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'past'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Past Events
            </button>
            <button
              onClick={() => setActiveTab('invitations')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors relative ${
                activeTab === 'invitations'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Invitations
              {pendingInvitations.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {pendingInvitations.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Response Message */}
          {responseMessage && (
            <div className={`mb-6 p-4 rounded-lg ${
              responseMessage.includes('successfully') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {responseMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <MdError className="text-red-500 mr-2 text-xl" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Upcoming Events Tab */}
          {activeTab === 'upcoming' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <MdCalendarToday className="text-purple-600 text-2xl" />
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
                </div>
                <div className="text-sm text-gray-500 bg-purple-50 px-3 py-1 rounded-full">
                  {upcomingEvents.length} upcoming event{upcomingEvents.length !== 1 ? 's' : ''}
                </div>
              </div>

              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onRSVP={handleRSVP}
                      showRSVP={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MdEventNote className="mx-auto text-6xl text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No upcoming events
                  </h3>
                  <p className="text-gray-600">
                    Check back later for new events and activities.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Past Events Tab */}
          {activeTab === 'past' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <MdEvent className="text-gray-600 text-2xl" />
                  <h2 className="text-xl font-semibold text-gray-900">Past Events</h2>
                </div>
                <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                  {pastEvents.length} past event{pastEvents.length !== 1 ? 's' : ''}
                </div>
              </div>

              {pastEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <div key={event.id} className="opacity-75">
                      <EventCard
                        event={event}
                        showRSVP={false}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MdEventNote className="mx-auto text-6xl text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No past events
                  </h3>
                  <p className="text-gray-600">
                    No past events to display.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Invitations Tab */}
          {activeTab === 'invitations' && (
            <div className="space-y-6">
              {/* Pending Invitations */}
              {pendingInvitations.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Invitations</h2>
                  <div className="space-y-4">
                    {pendingInvitations.map(invitation => (
                      <div key={invitation.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              {invitation.event.title}
                            </h3>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <MdCalendarToday className="mr-2 text-purple-600" />
                                {new Date(invitation.event.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </div>
                              <div className="flex items-center">
                                <MdAccessTime className="mr-2 text-purple-600" />
                                {invitation.event.time}
                              </div>
                              <div className="flex items-center">
                                <MdLocationOn className="mr-2 text-purple-600" />
                                {invitation.event.location}
                              </div>
                            </div>
                            <p className="text-gray-700 mt-3 line-clamp-2">
                              {invitation.event.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              Invited on {new Date(invitation.invitedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => handleInvitationResponse(invitation.id, 'accepted')}
                              disabled={invitationLoading}
                              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                              <MdCheck className="mr-1" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleInvitationResponse(invitation.id, 'rejected')}
                              disabled={invitationLoading}
                              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                              <MdClose className="mr-1" />
                              Decline
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Invitations History */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Invitation History</h2>
                {invitations.length > 0 ? (
                  <div className="space-y-4">
                    {invitations.map(invitation => (
                      <div key={invitation.id} className={`border rounded-lg p-6 ${
                        invitation.status === 'accepted' ? 'bg-green-50 border-green-200' :
                        invitation.status === 'rejected' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              {invitation.event.title}
                            </h3>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <MdCalendarToday className="mr-2 text-purple-600" />
                                {new Date(invitation.event.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </div>
                              <div className="flex items-center">
                                <MdLocationOn className="mr-2 text-purple-600" />
                                {invitation.event.location}
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              invitation.status === 'accepted' 
                                ? 'bg-green-100 text-green-800' 
                                : invitation.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        {invitation.respondedAt && (
                          <p className="text-xs text-gray-500 mt-2">
                            Responded on {new Date(invitation.respondedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MdNotifications className="mx-auto text-6xl text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">No invitations yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RSVP Confirmation Modal */}
      <Modal
        isOpen={rsvpModalOpen}
        onClose={closeRsvpModal}
        title={rsvpMessage ? (rsvpSuccess ? 'RSVP Confirmed!' : 'RSVP Failed') : 'Confirm RSVP'}
        size="medium"
      >
        {rsvpMessage ? (
          // RSVP Result
          <div className="text-center">
            <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${
              rsvpSuccess ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {rsvpSuccess ? (
                <MdCheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <MdWarning className="h-6 w-6 text-red-600" />
              )}
            </div>
            <p className="text-sm text-gray-700 mb-6">{rsvpMessage}</p>
            <button
              onClick={closeRsvpModal}
              className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                rsvpSuccess 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              Close
            </button>
          </div>
        ) : (
          // RSVP Confirmation
          <div>
            {selectedEvent && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedEvent.title}
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MdCalendarToday className="mr-2 text-purple-500" />
                    {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MdSchedule className="mr-2 text-purple-500" />
                    {new Date(`2000-01-01T${selectedEvent.time}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </div>
                  {selectedEvent.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MdLocationOn className="mr-2 text-purple-500" />
                      {selectedEvent.location}
                    </div>
                  )}
                </div>
              </div>
            )}

            <p className="text-gray-700 mb-6">
              Are you sure you want to RSVP for this event? You will receive a confirmation and any updates about the event.
            </p>

            <div className="flex space-x-4 justify-end">
              <button
                onClick={closeRsvpModal}
                disabled={rsvpLoading}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={confirmRSVP}
                disabled={rsvpLoading}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {rsvpLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  'Confirm RSVP'
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EventsScreen;