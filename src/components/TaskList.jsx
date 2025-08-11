import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Edit, Trash2, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const TaskList = ({ tasks, onEdit, onDelete, selectedDate }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800'
  };

  const priorityIcons = {
    low: '🟢',
    medium: '🟡',
    high: '🔴'
  };

  const sortedTasks = tasks.sort((a, b) => {
    // Sort by priority first (high > medium > low)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then sort by time
    if (a.time && b.time) {
      return a.time.localeCompare(b.time);
    }
    
    // Tasks with time come before tasks without time
    if (a.time && !b.time) return -1;
    if (!a.time && b.time) return 1;
    
    return 0;
  });

  const formatTime = (time) => {
    if (!time) return '';
    try {
      return format(parseISO(`2000-01-01T${time}`), 'h:mm a');
    } catch {
      return time;
    }
  };

  const formatDate = (date) => {
    try {
      return format(parseISO(date), 'MMM dd, yyyy');
    } catch {
      return date;
    }
  };

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Calendar className="w-16 h-16 mx-auto text-lightTextSecondary dark:text-darkTextSecondary mb-4" />
        <h3 className="text-lg font-medium text-lightTextPrimary dark:text-darkTextPrimary mb-2">
          No tasks for {formatDate(selectedDate)}
        </h3>
        <p className="text-lightTextSecondary dark:text-darkTextSecondary">
          Add your first task to get started!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {sortedTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
            className="card p-4 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-lg">{priorityIcons[task.priority]}</span>
                  <h3 className="text-lg font-semibold text-lightTextPrimary dark:text-darkTextPrimary truncate">
                    {task.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
                
                {task.description && (
                  <p className="text-lightTextSecondary dark:text-darkTextSecondary mb-3 line-clamp-2">
                    {task.description}
                  </p>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-lightTextSecondary dark:text-darkTextSecondary">
                  {task.time && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(task.time)}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(task.date)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <motion.button
                  onClick={() => onEdit(task)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Edit task"
                >
                  <Edit className="w-4 h-4 text-lightTextSecondary dark:text-darkTextSecondary" />
                </motion.button>
                
                <motion.button
                  onClick={() => onDelete(task.id)}
                  className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Delete task"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
