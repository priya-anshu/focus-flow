import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';

const CalendarView = ({ selectedDate, onDateSelect, tasks }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  const getTasksForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return tasks.filter(task => task.date === dateStr);
  };

  const getPriorityCount = (date) => {
    const dayTasks = getTasksForDate(date);
    const counts = { high: 0, medium: 0, low: 0 };
    dayTasks.forEach(task => {
      counts[task.priority]++;
    });
    return counts;
  };

  const renderCalendarHeader = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(day => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-lightTextSecondary dark:text-darkTextSecondary"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCalendarDays = () => {
    const days = getDaysInMonth();
    const firstDayOfMonth = startOfMonth(currentMonth);
    const dayOfWeek = firstDayOfMonth.getDay();
    
    // Add empty cells for days before the first day of the month
    const emptyCells = Array.from({ length: dayOfWeek }, (_, i) => (
      <div key={`empty-${i}`} className="p-2" />
    ));

    return (
      <div className="grid grid-cols-7 gap-1">
        {emptyCells}
        {days.map(day => {
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentDay = isToday(day);
          const dayTasks = getTasksForDate(day);
          const priorityCounts = getPriorityCount(day);
          
          return (
            <motion.button
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={`relative p-2 rounded-lg text-sm transition-colors ${
                isSelected
                  ? 'bg-lightPrimary dark:bg-darkPrimary text-white'
                  : isCurrentDay
                  ? 'bg-lightAccent/20 dark:bg-darkAccent/20 text-lightAccent dark:text-darkAccent border-2 border-lightAccent dark:border-darkAccent'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-lightTextPrimary dark:text-darkTextPrimary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="block">{format(day, 'd')}</span>
              
              {/* Task indicators */}
              {dayTasks.length > 0 && (
                <div className="flex justify-center space-x-1 mt-1">
                  {priorityCounts.high > 0 && (
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" title={`${priorityCounts.high} high priority`} />
                  )}
                  {priorityCounts.medium > 0 && (
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" title={`${priorityCounts.medium} medium priority`} />
                  )}
                  {priorityCounts.low > 0 && (
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" title={`${priorityCounts.low} low priority`} />
                  )}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="card p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        
        <h2 className="text-xl font-semibold text-lightTextPrimary dark:text-darkTextPrimary">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        
        <motion.button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Calendar Grid */}
      <div>
        {renderCalendarHeader()}
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-6 text-xs text-lightTextSecondary dark:text-darkTextSecondary">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span>High Priority</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            <span>Medium Priority</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Low Priority</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
