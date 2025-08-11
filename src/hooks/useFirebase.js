import { useState, useEffect, useCallback } from 'react';
import { 
  ref, 
  set, 
  push, 
  remove, 
  update, 
  onValue, 
  off 
} from 'firebase/database';
import { database } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

export const useFirebase = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user's tasks reference
  const getUserTasksRef = useCallback(() => {
    if (!user) return null;
    return ref(database, `users/${user.uid}/tasks`);
  }, [user]);

  // Listen to real-time changes in user's tasks
  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const tasksRef = getUserTasksRef();
    if (!tasksRef) return;

    setLoading(true);

    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tasksArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setTasks(tasksArray);
      } else {
        setTasks([]);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    });

    return () => {
      off(tasksRef);
    };
  }, [user, getUserTasksRef]);

  // Add a new task
  const addTask = async (taskData) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const tasksRef = getUserTasksRef();
      const newTaskRef = push(tasksRef);
      
      const newTask = {
        ...taskData,
        createdAt: new Date().toISOString(),
        userId: user.uid
      };

      await set(newTaskRef, newTask);
      return newTaskRef.key;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  // Update an existing task
  const updateTask = async (taskId, taskData) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const taskRef = ref(database, `users/${user.uid}/tasks/${taskId}`);
      await update(taskRef, {
        ...taskData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const taskRef = ref(database, `users/${user.uid}/tasks/${taskId}`);
      await remove(taskRef);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    return tasks.filter(task => task.date === date);
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    getTasksForDate
  };
};
