import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-md p-8"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-lightPrimary to-lightSecondary dark:from-darkPrimary dark:to-darkSecondary mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-lightTextPrimary dark:text-darkTextPrimary mb-2">
            FocusFlow
          </h1>
          <p className="text-lightTextSecondary dark:text-darkTextSecondary">
            Your personal schedule planner
          </p>
        </div>

        {/* Sign In Form */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-lightTextPrimary dark:text-darkTextPrimary mb-2">
              Welcome Back
            </h2>
            <p className="text-lightTextSecondary dark:text-darkTextSecondary">
              Sign in to access your tasks and schedule
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center space-x-3 py-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
          </motion.button>

          <div className="text-center">
            <p className="text-sm text-lightTextSecondary dark:text-darkTextSecondary">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-lightTextPrimary dark:text-darkTextPrimary mb-3">
            What you'll get:
          </h3>
          <ul className="space-y-2 text-sm text-lightTextSecondary dark:text-darkTextSecondary">
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-lightPrimary dark:bg-darkPrimary rounded-full" />
              <span>Sync tasks across all devices</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-lightPrimary dark:bg-darkPrimary rounded-full" />
              <span>Smart notifications and reminders</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-lightPrimary dark:bg-darkPrimary rounded-full" />
              <span>Beautiful calendar view</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-lightPrimary dark:bg-darkPrimary rounded-full" />
              <span>Light and dark themes</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
