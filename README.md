# AlumniConnect Platform

A centralized, secure web platform for educational institutions to manage alumni data, foster engagement, and facilitate communication and events. This is a React frontend prototype with mock data and full functionality.

## Features

- **User Authentication**: Login and registration with demo credentials
- **Alumni Directory**: Searchable directory with filters by graduation year and major
- **Profile Management**: View and edit personal alumni profiles
- **Events Management**: Browse upcoming events and RSVP functionality
- **Dashboard**: Personalized dashboard with upcoming events and recent news
- **Responsive Design**: Fully responsive UI built with Tailwind CSS

## Demo Credentials

For testing the application, use these demo credentials:
- Email: `john.doe@email.com`
- Password: `password123`

Or register a new account with any email and password.

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Technology Stack

- **Frontend**: React 18, React Router 6
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data**: Mock data with simulated API calls
- **Build Tool**: Create React App

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js
│   ├── ProfileCard.js
│   ├── EventCard.js
│   ├── LoadingSpinner.js
│   └── Modal.js
├── screens/            # Page components
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── DashboardScreen.js
│   ├── AlumniDirectoryScreen.js
│   ├── ProfileScreen.js
│   └── EventsScreen.js
├── services/           # API service modules
│   ├── api.js
│   ├── authService.js
│   ├── profileService.js
│   └── eventService.js
├── context/            # React Context providers
│   └── AuthContext.js
├── App.js             # Main app component with routing
└── index.js           # Application entry point
```

## Key Features Implemented

### Authentication System
- Secure login/logout functionality
- User registration with validation
- Protected routes that require authentication
- Persistent sessions using localStorage

### Alumni Directory
- Search functionality across names, companies, and skills
- Filter by graduation year and major
- Responsive grid layout of profile cards
- Click-through to detailed profiles

### Profile Management
- View mode displaying all profile information
- Edit mode for updating personal details
- Skills management with tag-based display
- Profile picture placeholder support

### Events System
- Display of upcoming and past events
- RSVP functionality with confirmation modals
- Event capacity tracking and full event handling
- Event categorization and filtering

### Dashboard
- Personalized welcome message
- Upcoming events preview
- Recent news and announcements
- Quick action buttons for common tasks

## Development Notes

- All API calls are mocked with simulated delays
- Data persistence is limited to current session (localStorage for auth)
- Profile pictures use placeholder functionality
- Form validation is implemented for all user inputs

## Future Enhancements

- Real backend API integration
- Email notification system
- Advanced search with more filters
- Photo upload functionality
- Social features (messaging, connections)
- Admin panel for institution management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a prototype project. For production deployment, consider:
1. Implementing a real backend API
2. Adding comprehensive testing
3. Setting up CI/CD pipelines
4. Implementing proper security measures
5. Adding analytics and monitoring