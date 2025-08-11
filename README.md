# FocusFlow - Personal Schedule Planner

A beautiful, modern, and fully responsive personal schedule planner built with React, Tailwind CSS, and Framer Motion. FocusFlow helps you manage your daily tasks with an intuitive interface, smart reminders, and seamless theme switching.

## ✨ Features

### 🎯 Core Functionality
- **Daily Schedule Management**: Add, edit, and delete tasks with title, description, date, time, and priority levels
- **Smart Task Organization**: Tasks are automatically sorted by priority and time
- **Calendar View**: Interactive calendar for easy date navigation and task overview
- **Real-time Updates**: Instant task synchronization across the app

### 🎨 Beautiful UI/UX
- **Light & Dark Themes**: Smooth theme switching with 0.3s transitions
- **Responsive Design**: Mobile-first approach that works on all devices
- **Modern Animations**: Framer Motion powered smooth interactions
- **Custom Color Palette**: Carefully crafted colors for both light and dark modes

### 🔔 Smart Notifications
- **In-App Reminders**: Pop-up notifications 5 minutes before scheduled tasks
- **Browser Notifications**: Native browser notifications for task reminders
- **PWA Support**: Installable app with offline capabilities
- **Notification Actions**: Quick actions to view or dismiss reminders

### 📱 Progressive Web App
- **Installable**: Add to home screen on mobile and desktop
- **Offline Support**: View tasks even without internet connection
- **App-like Experience**: Full-screen mode and native feel

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd focus-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎨 Design System

### Color Palette

**Light Theme:**
- Background: `#F5F7FA`
- Card: `#FFFFFF`
- Primary: `#2563EB`
- Secondary: `#14B8A6`
- Text Primary: `#1E293B`
- Text Secondary: `#475569`
- Accent: `#F59E0B`

**Dark Theme:**
- Background: `#0F172A`
- Card: `#1E293B`
- Primary: `#3B82F6`
- Secondary: `#2DD4BF`
- Text Primary: `#F8FAFC`
- Text Secondary: `#CBD5E1`
- Accent: `#FACC15`

### Components

- **TaskList**: Displays tasks in a clean timeline view
- **TaskForm**: Modal form for adding/editing tasks
- **CalendarView**: Interactive calendar for date selection
- **NotificationPopup**: In-app notification system
- **ThemeToggle**: Animated theme switcher
- **Navbar**: App navigation with branding

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TaskList.jsx
│   ├── TaskForm.jsx
│   ├── CalendarView.jsx
│   ├── NotificationPopup.jsx
│   ├── Navbar.jsx
│   └── ThemeToggle.jsx
├── pages/              # Page components
│   └── Home.jsx
├── context/            # React context providers
│   └── ThemeContext.jsx
├── hooks/              # Custom React hooks
│   └── useNotifications.js
├── styles/             # Global styles
│   └── global.css
└── App.js              # Main app component
```

## 🔧 Technologies Used

- **React 19.1.1** - Modern React with hooks
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Framer Motion 10.16.16** - Animation library
- **Lucide React 0.294.0** - Beautiful icons
- **Date-fns 2.30.0** - Date manipulation utilities
- **Create React App** - Development environment

## 🌟 Key Features Explained

### Task Management
- **Priority Levels**: Low (🟢), Medium (🟡), High (🔴)
- **Smart Sorting**: Tasks are automatically sorted by priority and time
- **Date & Time**: Flexible scheduling with optional time specification
- **Rich Descriptions**: Detailed task descriptions with markdown support

### Theme System
- **Automatic Detection**: Detects user's system preference
- **Persistent Storage**: Theme choice saved in localStorage
- **Smooth Transitions**: 0.3s ease-in-out transitions between themes
- **System Integration**: Respects user's OS theme preference

### Notification System
- **Multiple Channels**: In-app popups and browser notifications
- **Smart Timing**: 5-minute advance reminders
- **Action Buttons**: Quick actions to view or dismiss
- **PWA Integration**: Works even when app is closed

## 📱 PWA Features

FocusFlow is a Progressive Web App with:
- **Install Prompt**: Add to home screen on supported devices
- **Offline Mode**: View tasks without internet connection
- **App Manifest**: Native app-like experience
- **Service Worker**: Background sync and caching

## 🔥 Firebase Setup

### Prerequisites
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Google Sign-in
3. Create a Realtime Database
4. Get your configuration from Project Settings

### Environment Configuration
1. Create a `.env.local` file in the root directory
2. Add your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Database Rules
Set up your Realtime Database rules for security:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        "tasks": {
          ".read": "$uid === auth.uid",
          ".write": "$uid === auth.uid"
        }
      }
    }
  }
}
```

## 🔮 Future Enhancements

- [x] Firebase Authentication (Google Sign-in)
- [x] Cloud Sync with Realtime Database
- [ ] Recurring Tasks
- [ ] Task Categories/Tags
- [ ] Export/Import functionality
- [ ] Team collaboration features
- [ ] Advanced analytics and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) for the development environment
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons
- [Date-fns](https://date-fns.org/) for date manipulation utilities

---

**Built with ❤️ for better productivity and focus**
