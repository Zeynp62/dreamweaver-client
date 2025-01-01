import { useEffect, useState } from 'react';
import axios from 'axios';
import Tasks from '../components/Tasks';
import AddTask from './AddTasks';



const Dreams = ({user}) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/task');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
    <h1>My Tasks</h1>
    <AddTask  setTasks={setTasks} />
    <button onClick={() => window.location.href = '/add-task'}>Add Task</button>
    <div>
      {tasks.map(task => (
        <Tasks key={task._id} task={task} />
      ))}
    </div>
  </div>
  );
};

export default Dreams;