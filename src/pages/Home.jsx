import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar as CalendarIcon, LogOut, User } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import CalendarView from '../components/CalendarView';
import NotificationPopup from '../components/NotificationPopup';
import { AnimatePresence } from 'framer-motion';
import { useNotifications } from '../hooks/useNotifications';
import { useFirebase } from '../hooks/useFirebase';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();
  const { tasks, loading, addTask, updateTask, deleteTask } = useFirebase();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [notification, setNotification] = useState(null);
  const { showTaskReminder, requestPermission } = useNotifications();

  // Request notification permission on mount
  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Check for upcoming tasks and show notifications
  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      const currentDate = format(now, 'yyyy-MM-dd');

      const upcomingTasks = tasks.filter(task => {
        if (!task.time || task.date !== currentDate) return false;
        
        const taskTime = task.time;
        const taskDateTime = new Date(`${task.date}T${taskTime}`);
        const fiveMinutesBefore = new Date(taskDateTime.getTime() - 5 * 60 * 1000);
        const fiveMinutesAfter = new Date(taskDateTime.getTime() + 5 * 60 * 1000);
        
        return now >= fiveMinutesBefore && now <= fiveMinutesAfter;
      });

      if (upcomingTasks.length > 0 && !notification) {
        const task = upcomingTasks[0];
        setNotification(task);
        showTaskReminder(task);
      }
    };

    const interval = setInterval(checkNotifications, 30000); // Check every 30 seconds
    checkNotifications(); // Check immediately

    return () => clearInterval(interval);
  }, [tasks, notification, showTaskReminder]);

  const handleAddTask = async (taskData) => {
    try {
      await addTask(taskData);
    } catch (error) {
      console.error('Error adding task:', error);
      // You could show a toast notification here
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
      // You could show a toast notification here
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
      // You could show a toast notification here
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      handleUpdateTask(taskData);
    } else {
      handleAddTask(taskData);
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.date === format(selectedDate, 'yyyy-MM-dd')
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-lightBg dark:bg-darkBg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-lightPrimary dark:border-darkPrimary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lightTextSecondary dark:text-darkTextSecondary">
            Loading your tasks...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-lightTextPrimary dark:text-darkTextPrimary mb-2">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h1>
            <p className="text-lightTextSecondary dark:text-darkTextSecondary">
              {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} for today
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            {/* User Info */}
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-lightCard dark:bg-darkCard border border-gray-200 dark:border-gray-700">
              <User className="w-4 h-4 text-lightTextSecondary dark:text-darkTextSecondary" />
              <span className="text-sm text-lightTextPrimary dark:text-darkTextPrimary">
                {user?.displayName || user?.email}
              </span>
            </div>

            <motion.button
              onClick={() => setShowCalendar(!showCalendar)}
              className="btn-secondary flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Calendar</span>
            </motion.button>
            
            <motion.button
              onClick={() => setIsFormOpen(true)}
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </motion.button>

            <motion.button
              onClick={handleLogout}
              className="btn-accent flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>

        {/* Calendar View */}
        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <CalendarView
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                tasks={tasks}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task List */}
        <div className="space-y-6">
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            selectedDate={format(selectedDate, 'yyyy-MM-dd')}
          />
        </div>
      </div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        task={editingTask}
        selectedDate={format(selectedDate, 'yyyy-MM-dd')}
      />

      {/* Notification Popup */}
      <NotificationPopup
        notification={notification}
        onClose={closeNotification}
        onDismiss={dismissNotification}
      />
    </div>
  );
};

export default Home;
