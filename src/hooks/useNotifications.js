import { useEffect, useState } from 'react';

export const useNotifications = () => {
  const [permission, setPermission] = useState('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    if ('Notification' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const showNotification = (title, options = {}) => {
    if (!isSupported || permission !== 'granted') return;

    try {
      const notification = new Notification(title, {
        icon: '/logo192.png',
        badge: '/logo192.png',
        requireInteraction: true,
        ...options
      });

      // Auto-close after 10 seconds
      setTimeout(() => {
        notification.close();
      }, 10000);

      return notification;
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  };

  const showTaskReminder = (task) => {
    const title = `Task Reminder: ${task.title}`;
    const body = task.description || `Your task is scheduled for ${task.time || 'today'}`;
    
    showNotification(title, {
      body,
      tag: `task-${task.id}`,
      data: { taskId: task.id },
      actions: [
        {
          action: 'view',
          title: 'View Task'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    });
  };

  return {
    isSupported,
    permission,
    requestPermission,
    showNotification,
    showTaskReminder
  };
};
