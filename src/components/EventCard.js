import React from 'react';
import { 
  MdCalendarToday, 
  MdAccessTime, 
  MdLocationOn, 
  MdPeople,
  MdEventNote,
  MdCheck,
  MdPersonAdd
} from 'react-icons/md';

const EventCard = ({ event, onRSVP, showRSVP = true }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      networking: 'bg-purple-100 text-purple-800',
      career: 'bg-blue-100 text-blue-800',
      workshop: 'bg-green-100 text-green-800',
      sports: 'bg-orange-100 text-orange-800',
      social: 'bg-pink-100 text-pink-800',
      academic: 'bg-indigo-100 text-indigo-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors.default;
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'networking':
        return <MdPeople className="w-4 h-4" />;
      case 'career':
        return <MdPersonAdd className="w-4 h-4" />;
      case 'workshop':
      case 'academic':
        return <MdEventNote className="w-4 h-4" />;
      default:
        return <MdEventNote className="w-4 h-4" />;
    }
  };

  const attendancePercentage = Math.round((event.currentAttendees / event.maxAttendees) * 100);
  const isAlmostFull = attendancePercentage >= 90;
  const isPopular = attendancePercentage >= 70;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Event Image */}
      <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-500 relative overflow-hidden">
        {event.image && event.image !== '/api/placeholder/400/200' ? (
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MdEventNote className="text-6xl text-white opacity-50" />
          </div>
        )}
        
        {/* Event Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
            {getEventTypeIcon(event.type)}
            <span className="ml-1 capitalize">{event.type}</span>
          </span>
        </div>

        {/* Popularity Badge */}
        {isPopular && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {isAlmostFull ? '🔥 Almost Full' : '⭐ Popular'}
            </span>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {/* Date & Time */}
          <div className="flex items-center text-sm text-gray-600">
            <MdCalendarToday className="w-4 h-4 mr-2 text-purple-600" />
            <span className="mr-4">{formatDate(event.date)}</span>
            <MdAccessTime className="w-4 h-4 mr-2 text-purple-600" />
            <span>{formatTime(event.time)}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600">
            <MdLocationOn className="w-4 h-4 mr-2 text-purple-600" />
            <span className="truncate">{event.location}</span>
          </div>

          {/* Organizer */}
          <div className="flex items-center text-sm text-gray-600">
            <MdPersonAdd className="w-4 h-4 mr-2 text-purple-600" />
            <span className="truncate">Organized by {event.organizer}</span>
          </div>
        </div>

        {/* Attendance Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span className="flex items-center">
              <MdPeople className="w-4 h-4 mr-1" />
              {event.currentAttendees} / {event.maxAttendees} attending
            </span>
            <span className={`font-medium ${isAlmostFull ? 'text-red-600' : isPopular ? 'text-yellow-600' : 'text-green-600'}`}>
              {attendancePercentage}% full
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isAlmostFull ? 'bg-red-500' : isPopular ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(attendancePercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* RSVP Button */}
        {showRSVP && (
          <div className="pt-4 border-t border-gray-100">
            {event.isRSVPRequired ? (
              <button
                onClick={() => onRSVP && onRSVP(event.id)}
                disabled={attendancePercentage >= 100}
                className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 ${
                  attendancePercentage >= 100
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800'
                }`}
              >
                {attendancePercentage >= 100 ? (
                  <span className="flex items-center justify-center">
                    <MdCheck className="w-4 h-4 mr-2" />
                    Event Full
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <MdCheck className="w-4 h-4 mr-2" />
                    RSVP Now
                  </span>
                )}
              </button>
            ) : (
              <div className="text-center py-2 text-sm text-gray-500 bg-gray-50 rounded-lg">
                No RSVP Required
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;