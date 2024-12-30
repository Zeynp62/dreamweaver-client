
import { useState, useEffect} from 'react';
import Axios from 'axios';
import Task from '../components/Tasks';

const Dreams = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await Axios.get('/tasks'); // Assuming backend route is '/tasks'
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await Axios.get('/categories'); // Assuming there's a route to get categories
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchTasks();
    fetchCategories();
  }, []);

  // Handle adding a new task
  const addTask = async (taskText, category) => {
    try {
      setLoading(true);
      const newTask = {
        taskName: taskText,
        taskState: false, // Newly added tasks are not completed by default
        category_id: category,
      };

      const response = await Axios.post('/tasks', newTask); // POST request to /tasks
      setTasks([...tasks, response.data]);
      setLoading(false);
    } catch (err) {
      console.error('Error adding task:', err);
      setLoading(false);
    }
  };

  // Handle task completion toggle
  const toggleTaskCompletion = async (taskId, currentState) => {
    try {
      const updatedTask = await Axios.put(`/tasks/${taskId}`, {
        taskState: !currentState,
      });

      setTasks(
        tasks.map((task) =>
          task._id === updatedTask.data._id
            ? { ...task, taskState: updatedTask.data.taskState }
            : task
        )
      );
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  // Handle task deletion
  const deleteTask = async (taskId) => {
    try {
      await Axios.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId)); // Remove task from UI after deletion
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div>
      <h1>Dreams</h1>

      {/* Task input component */}
      <Task onAddTask={addTask} categories={categories} />
      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ textDecoration: task.taskState ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              checked={task.taskState}
              onChange={() => toggleTaskCompletion(task._id, task.taskState)}
            />
            {task.taskName} <span>({task.category_id ? task.category_id.name : 'No category'})</span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>    
      </div>
  );
};

export default Dreams;