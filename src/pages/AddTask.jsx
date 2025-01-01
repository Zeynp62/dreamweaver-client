import React, { useState, useEffect } from 'react';
import Client from '../services/api';

const AddTask = ({ user, setUser, editingTask, setEditingTask, categories }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskState, setTaskState] = useState(false);
  const [category, setCategory] = useState('');


  // If there's an editing task, pre-fill the form with task details
  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.taskName);
      
      // Convert ISO date string to yyyy-MM-dd format
      if (editingTask.taskDate) {
        const formattedDate = new Date(editingTask.taskDate).toISOString().slice(0, 10);
        setTaskDate(formattedDate);
      } else {
        setTaskDate('');
      }
      
      setTaskState(editingTask.taskState);
    }
  }, [editingTask]);

  useEffect(() => {
    console.log('Categories in AddTask:', categories);
  }, [categories]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        taskName,
        taskDate,
        taskState,
        category_id: category, // Send selected category as category_id
        user: user._id
      };
      
  
      const response = editingTask
        ? await Client.put(`/tasks/${editingTask._id}`, taskData)
        : await Client.post('/tasks', taskData);
  
      console.log(editingTask ? 'Task updated:' : 'Task added:', response.data);
  
      // Update user's tasks
      setUser((prevUser) => ({
        ...prevUser,
        tasks: editingTask
          ? prevUser.tasks.map((task) =>
              task._id === editingTask._id ? response.data : task
            )
          : [...prevUser.tasks, response.data],
      }));
  
      // Clear the form
      setTaskName('');
      setTaskDate('');
      setTaskState(false);
      setCategory('');
      if (editingTask) setEditingTask(null); // Exit edit mode
    } catch (error) {
      console.error('Error adding or updating task:', error);
    }
  };
  
  

  return user ?(
    <form onSubmit={handleAddTask}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
        required
      />
      <input
        type="date"
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
      />
      <label>
        Completed:
        <input
          type="checkbox"
          checked={taskState}
          onChange={(e) => setTaskState(e.target.checked)}
        />
      </label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="">Select Category</option>
      {categories?.map((cat) => (
        <option key={cat._id} value={cat._id}>
          {cat.categoryName}
        </option>
      ))}
    </select>
      <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  ):(<p>Loading</p>)
};

export default AddTask;
