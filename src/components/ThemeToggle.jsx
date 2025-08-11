import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-lightCard dark:bg-darkCard border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-darkAccent" />
        ) : (
          <Moon className="w-5 h-5 text-lightAccent" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
