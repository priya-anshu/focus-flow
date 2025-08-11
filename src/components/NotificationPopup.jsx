import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Bell } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const NotificationPopup = ({ notification, onClose, onDismiss }) => {
  const [progress, setProgress] = useState(100);

  // Countdown progress bar
  useEffect(() => {
    if (notification) {
      const duration = 3000; // 3 seconds
      const interval = 50; // Update every 50ms for smooth animation
      const steps = duration / interval;
      const decrement = 100 / steps;

      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - decrement;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [notification, onClose]);

  const formatTime = (time) => {
    if (!time) return '';
    try {
      return format(parseISO(`2000-01-01T${time}`), 'h:mm a');
    } catch {
      return time;
    }
  };

  const priorityColors = {
    low: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20',
    medium: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20',
    high: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
  };

  const priorityIcons = {
    low: '🟢',
    medium: '🟡',
    high: '🔴'
  };

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          className="fixed top-4 right-4 z-50 max-w-sm w-full"
        >
          <div className={`card border-2 ${priorityColors[notification.priority]} p-4 shadow-2xl relative overflow-hidden`}>
            {/* Progress bar */}
            <div className="absolute top-0 left-0 h-1 bg-lightPrimary dark:bg-darkPrimary transition-all duration-50 ease-linear" 
                 style={{ width: `${progress}%` }} />
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-lightPrimary dark:bg-darkPrimary flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{priorityIcons[notification.priority]}</span>
                  <h3 className="text-sm font-semibold text-lightTextPrimary dark:text-darkTextPrimary">
                    Task Reminder
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    notification.priority === 'high' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : notification.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {notification.priority}
                  </span>
                </div>
                
                <h4 className="text-base font-medium text-lightTextPrimary dark:text-darkTextPrimary mb-1">
                  {notification.title}
                </h4>
                
                {notification.description && (
                  <p className="text-sm text-lightTextSecondary dark:text-darkTextSecondary mb-2 line-clamp-2">
                    {notification.description}
                  </p>
                )}
                
                <div className="flex items-center space-x-2 text-xs text-lightTextSecondary dark:text-darkTextSecondary">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(notification.time)}</span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mt-3 flex space-x-2">
              <button
                onClick={onDismiss}
                className="flex-1 px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded-lg text-lightTextPrimary dark:text-darkTextPrimary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Dismiss
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-3 py-1.5 text-xs btn-primary"
              >
                View Task
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup;
