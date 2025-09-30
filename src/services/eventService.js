// Mock event data with invitations

// Mock events data with upcoming dates
const mockEvents = [
  {
    id: 1,
    title: 'Annual Alumni Networking Gala 2025',
    date: '2025-11-15',
    time: '18:00',
    description: 'Join us for an evening of networking, dining, and reconnecting with fellow alumni. Special guest speakers from various industries will share their experiences.',
    location: 'Grand Ballroom, University Center',
    type: 'networking',
    maxAttendees: 200,
    currentAttendees: 45,
    image: '/api/placeholder/400/200',
    organizer: 'Alumni Relations Office',
    isRSVPRequired: true
  },
  {
    id: 2,
    title: 'Tech Industry Career Fair 2025',
    date: '2025-12-08',
    time: '10:00',
    description: 'Explore career opportunities in the tech industry. Meet with recruiters from leading tech companies and learn about the latest trends.',
    location: 'Student Union Building',
    type: 'career',
    maxAttendees: 300,
    currentAttendees: 87,
    image: '/api/placeholder/400/200',
    organizer: 'Career Services',
    isRSVPRequired: true
  },
  {
    id: 3,
    title: 'Entrepreneurship Workshop Series',
    date: '2025-10-20',
    time: '14:00',
    description: 'Learn from successful alumni entrepreneurs about starting and scaling businesses. Interactive workshops and Q&A sessions included.',
    location: 'Innovation Hub',
    type: 'workshop',
    maxAttendees: 50,
    currentAttendees: 12,
    image: '/api/placeholder/400/200',
    organizer: 'Entrepreneurship Center',
    isRSVPRequired: true
  },
  {
    id: 4,
    title: 'Alumni Sports Tournament',
    date: '2025-11-12',
    time: '09:00',
    description: 'Friendly competition between alumni in various sports. Bring your family for a day of fun activities and team building.',
    location: 'University Sports Complex',
    type: 'social',
    maxAttendees: 100,
    currentAttendees: 28,
    image: '/api/placeholder/400/200',
    organizer: 'Athletics Department',
    isRSVPRequired: true
  },
  {
    id: 5,
    title: 'Winter Alumni Reunion 2025',
    date: '2025-12-15',
    time: '12:00',
    description: 'Come celebrate the holidays with fellow alumni! Includes campus tours, class reunions, and festive activities.',
    location: 'Campus Wide',
    type: 'celebration',
    maxAttendees: 500,
    currentAttendees: 156,
    image: '/api/placeholder/400/200',
    organizer: 'Alumni Relations Office',
    isRSVPRequired: true
  }
];

// Mock invitations data - simulating invitations sent to specific users
const mockInvitations = [
  {
    id: 1,
    eventId: 1,
    userId: 1,
    status: 'pending', // pending, accepted, rejected
    invitedAt: '2025-09-25',
    respondedAt: null
  },
  {
    id: 2,
    eventId: 2,
    userId: 1,
    status: 'pending',
    invitedAt: '2025-09-20',
    respondedAt: null
  },
  {
    id: 3,
    eventId: 3,
    userId: 1,
    status: 'pending',
    invitedAt: '2025-09-18',
    respondedAt: null
  },
  {
    id: 4,
    eventId: 4,
    userId: 1,
    status: 'pending',
    invitedAt: '2025-09-22',
    respondedAt: null
  },
  // Sample for user 2
  {
    id: 5,
    eventId: 1,
    userId: 2,
    status: 'accepted',
    invitedAt: '2025-09-25',
    respondedAt: '2025-09-26'
  }
];

// Mock news data
const mockNews = [
  {
    id: 1,
    title: 'University Launches New Alumni Mentorship Program',
    date: '2024-02-28',
    summary: 'A new program connecting recent graduates with experienced alumni mentors has been launched to support career development.',
    content: 'The university is excited to announce the launch of our comprehensive Alumni Mentorship Program...',
    author: 'Alumni Relations Team',
    category: 'program'
  },
  {
    id: 2,
    title: 'Class of 2023 Achieves Record Employment Rate',
    date: '2024-02-25',
    summary: '95% of last year\'s graduates have secured employment or continued education within 6 months of graduation.',
    content: 'We are proud to announce that the Class of 2023 has achieved unprecedented success...',
    author: 'Career Services',
    category: 'achievement'
  },
  {
    id: 3,
    title: 'New Scholarship Fund Established by Alumni Donors',
    date: '2024-02-20',
    summary: 'A generous donation from the Class of 1995 has established a $500,000 scholarship fund for underprivileged students.',
    content: 'Thanks to the incredible generosity of our Class of 1995 alumni...',
    author: 'Development Office',
    category: 'donation'
  }
];

export const getEventInvitations = async (userId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Get invitations for the user
    const userInvitations = mockInvitations.filter(inv => inv.userId === parseInt(userId));
    
    // Join with event data
    const invitationsWithEvents = userInvitations.map(invitation => {
      const event = mockEvents.find(e => e.id === invitation.eventId);
      return {
        ...invitation,
        event
      };
    });
    
    return {
      invitations: invitationsWithEvents,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch event invitations');
  }
};

export const respondToInvitation = async (invitationId, response, userId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const invitation = mockInvitations.find(inv => 
      inv.id === parseInt(invitationId) && inv.userId === parseInt(userId)
    );
    
    if (!invitation) {
      throw new Error('Invitation not found');
    }
    
    if (invitation.status !== 'pending') {
      throw new Error('Invitation has already been responded to');
    }
    
    // Update invitation status
    invitation.status = response; // 'accepted' or 'rejected'
    invitation.respondedAt = new Date().toISOString();
    
    // If accepted, increment event attendance
    if (response === 'accepted') {
      const event = mockEvents.find(e => e.id === invitation.eventId);
      if (event && event.currentAttendees < event.maxAttendees) {
        event.currentAttendees += 1;
      }
    }
    
    const event = mockEvents.find(e => e.id === invitation.eventId);
    
    return {
      message: response === 'accepted' 
        ? `You have successfully accepted the invitation to "${event.title}"!`
        : `You have declined the invitation to "${event.title}".`,
      invitation: {
        ...invitation,
        event
      },
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to respond to invitation');
  }
};

export const getPendingInvitations = async (userId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Get pending invitations for the user
    const pendingInvitations = mockInvitations.filter(inv => 
      inv.userId === parseInt(userId) && inv.status === 'pending'
    );
    
    // Join with event data and filter for upcoming events
    const currentDate = new Date();
    const pendingInvitationsWithEvents = pendingInvitations
      .map(invitation => {
        const event = mockEvents.find(e => e.id === invitation.eventId);
        return {
          ...invitation,
          event
        };
      })
      .filter(invitation => new Date(invitation.event.date) >= currentDate);
    
    return {
      invitations: pendingInvitationsWithEvents,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch pending invitations');
  }
};

export const getAllEvents = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      events: mockEvents,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch events');
  }
};

export const getUpcomingEvents = async (limit = 4) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const currentDate = new Date();
    const upcomingEvents = mockEvents
      .filter(event => new Date(event.date) >= currentDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit);
    
    return {
      events: upcomingEvents,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch upcoming events');
  }
};

export const getEventById = async (id) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const event = mockEvents.find(e => e.id === parseInt(id));
    
    if (!event) {
      throw new Error('Event not found');
    }

    return {
      event,
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch event');
  }
};

export const rsvpToEvent = async (eventId, userId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const event = mockEvents.find(e => e.id === parseInt(eventId));
    
    if (!event) {
      throw new Error('Event not found');
    }

    if (!event.isRSVPRequired) {
      throw new Error('RSVP not required for this event');
    }

    if (event.currentAttendees >= event.maxAttendees) {
      throw new Error('Event is full');
    }

    // In a real app, this would check if user already RSVP'd
    // For mock purposes, we'll just increment the count
    event.currentAttendees += 1;

    return {
      message: 'RSVP successful! You are registered for this event.',
      event,
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'RSVP failed');
  }
};

export const getRecentNews = async (limit = 3) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const recentNews = mockNews
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
    
    return {
      news: recentNews,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch recent news');
  }
};

export const getAllNews = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const sortedNews = mockNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return {
      news: sortedNews,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch news');
  }
};