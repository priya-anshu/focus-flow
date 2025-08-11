import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1CWv0qPyTS1fstxy84lEtE9eE1g0pzrQ",
  authDomain: "focus-flow-8a6e4.firebaseapp.com",
  databaseURL: "https://focus-flow-8a6e4-default-rtdb.firebaseio.com", // Add this line
  projectId: "focus-flow-8a6e4",
  storageBucket: "focus-flow-8a6e4.firebasestorage.app",
  messagingSenderId: "703282865633",
  appId: "1:703282865633:web:c40b76713bbbbad2f15ea0",
  measurementId: "G-TY0J8QYJVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const database = getDatabase(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
