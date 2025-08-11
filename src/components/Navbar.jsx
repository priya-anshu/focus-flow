import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-lightCard/80 dark:bg-darkCard/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-lightPrimary to-lightSecondary dark:from-darkPrimary dark:to-darkSecondary">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-lightTextPrimary dark:text-darkTextPrimary">
                FocusFlow
              </h1>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            <motion.button
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-lightTextSecondary dark:text-darkTextSecondary hover:text-lightTextPrimary dark:hover:text-darkTextPrimary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5" />
              <span className="hidden sm:inline">Calendar</span>
            </motion.button>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
