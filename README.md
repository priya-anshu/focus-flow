# FocusFlow - Personal Schedule Planner

A beautiful, modern, and fully responsive personal schedule planner built with React, Tailwind CSS, and Firebase. FocusFlow helps you manage your daily tasks with an intuitive interface, smart reminders, seamless theme switching, and real-time cloud synchronization.

## ✨ Features

### �� Core Functionality
- **Daily Schedule Management**: Add, edit, and delete tasks with title, description, date, time, and priority levels
- **Smart Task Organization**: Tasks are automatically sorted by priority and time
- **Calendar View**: Interactive calendar for easy date navigation and task overview
- **Real-time Cloud Sync**: Firebase Realtime Database for instant synchronization across devices
- **User Authentication**: Secure Google Sign-in with Firebase Authentication

### 🎨 Beautiful UI/UX
- **Light & Dark Themes**: Smooth theme switching with 0.3s transitions
- **Responsive Design**: Mobile-first approach that works on all devices
- **Modern Animations**: Framer Motion powered smooth interactions
- **Custom Color Palette**: Carefully crafted colors for both light and dark modes

### 🔔 Smart Notifications
- **In-App Reminders**: Pop-up notifications 5 minutes before scheduled tasks
- **Auto-Hide Timer**: Notifications automatically disappear after 3 seconds with visual countdown
- **Browser Notifications**: Native browser notifications for task reminders
- **PWA Support**: Installable app with offline capabilities
- **Notification Actions**: Quick actions to view or dismiss reminders

### 📱 Progressive Web App
- **Installable**: Add to home screen on mobile and desktop
- **Offline Support**: View tasks even without internet connection
- **App-like Experience**: Full-screen mode and native feel

### ☁️ Cloud Features
- **Firebase Authentication**: Secure Google Sign-in
- **Realtime Database**: Instant data synchronization
- **User-specific Data**: Each user has their own private task space
- **Cross-device Sync**: Access your tasks from any device

## 🚀 Live Demo

**🌐 Live Application**: [https://focus-flow-8a6e4.web.app](https://focus-flow-8a6e4.web.app)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project (for cloud features)

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

3. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Google Sign-in
   - Create a Realtime Database
   - Get your configuration from Project Settings

4. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   REACT_APP_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)
- `firebase deploy` - Deploy to Firebase Hosting

## �� Design System

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
- **NotificationPopup**: In-app notification system with auto-hide
- **ThemeToggle**: Animated theme switcher
- **Navbar**: App navigation with branding
- **Login**: Google Sign-in page

## 📁 Project Structure

src/
├── components/ # Reusable UI components
│ ├── TaskList.jsx
│ ├── TaskForm.jsx
│ ├── CalendarView.jsx
│ ├── NotificationPopup.jsx
│ ├── Navbar.jsx
│ └── ThemeToggle.jsx
├── pages/ # Page components
│ ├── Home.jsx
│ └── Login.jsx
├── context/ # React context providers
│ ├── ThemeContext.jsx
│ └── AuthContext.jsx
├── hooks/ # Custom React hooks
│ ├── useNotifications.js
│ └── useFirebase.js
├── firebase/ # Firebase configuration
│ └── config.js
├── styles/ # Global styles
│ └── global.css
└── App.js # Main app component


## 🔧 Technologies Used

- **React 18.2.0** - Modern React with hooks
- **Firebase 10.7.1** - Authentication and Realtime Database
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
- **Rich Descriptions**: Detailed task descriptions
- **Real-time Sync**: Changes sync instantly across all devices

### Authentication & Security
- **Google Sign-in**: One-click authentication with Google
- **User Isolation**: Each user has their own private task space
- **Secure Database**: Firebase Realtime Database with user-based security rules
- **Session Management**: Automatic login state persistence

### Theme System
- **Automatic Detection**: Detects user's system preference
- **Persistent Storage**: Theme choice saved in localStorage
- **Smooth Transitions**: 0.3s ease-in-out transitions between themes
- **System Integration**: Respects user's OS theme preference

### Notification System
- **Multiple Channels**: In-app popups and browser notifications
- **Smart Timing**: 5-minute advance reminders
- **Auto-Hide Timer**: 3-second auto-dismiss with visual countdown
- **Action Buttons**: Quick actions to view or dismiss
- **PWA Integration**: Works even when app is closed

## 📱 PWA Features

FocusFlow is a Progressive Web App with:
- **Install Prompt**: Add to home screen on supported devices
- **Offline Mode**: View tasks without internet connection
- **App Manifest**: Native app-like experience
- **Service Worker**: Background sync and caching

## 🔥 Firebase Configuration

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

### Deployment
The app is deployed using Firebase Hosting:
- **Production URL**: https://focus-flow-8a6e4.web.app
- **Automatic Builds**: Integrated with Firebase CLI
- **Global CDN**: Fast loading worldwide

## 🔮 Future Enhancements

- [x] Firebase Authentication (Google Sign-in)
- [x] Cloud Sync with Realtime Database
- [x] Auto-hide notifications with countdown
- [x] Firebase Hosting deployment
- [ ] Recurring Tasks
- [ ] Task Categories/Tags
- [ ] Export/Import functionality
- [ ] Team collaboration features
- [ ] Advanced analytics and insights
- [ ] Email notifications
- [ ] Task sharing between users

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Priyanshu Dhyani**

- GitHub: [@priyanshudhyani](https://github.com/priyanshudhyani)
- LinkedIn: [Priyanshu Dhyani](https://linkedin.com/in/priyanshudhyani)

## �� Acknowledgments

- [Create React App](https://create-react-app.dev/) for the development environment
- [Firebase](https://firebase.google.com/) for authentication and real-time database
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons
- [Date-fns](https://date-fns.org/) for date manipulation utilities

---

**Built with ❤️ by Priyanshu Dhyani for better productivity and focus**

🔴