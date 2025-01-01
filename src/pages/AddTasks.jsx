import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Client from '../services/api'


const AddTask = ({ setTasks , user  }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const navigate = useNavigate();

  // Predefined categories: Personal and Work
  const categories = [
    { _id: 'personal', name: 'Personal' },
    { _id: 'work', name: 'Work' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // Prepare the new task object to submit
    const newTask = {
      taskName,
      taskDate,
      taskState: false, // Initial state is false (not completed)
      category: taskCategory, // Use the selected category
      user: user._id
    };

    try {
      // Submit the new task via the backend API
      const response = await Client.post('http://localhost:3001/task', newTask );

      console.log('New task added:', response.data);

      // Update the tasks in the Dreams page state (via props)
      setTasks(prevTasks => [...prevTasks, response.data]);

      // Reset form fields
      setTaskName('');
      setTaskDate('');
      setTaskCategory('');
      
      // Redirect to Dreams page after adding the task
      navigate('/dreams');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h1>Add a New Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Task Date:</label>
          <input
            type="datetime-local"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={taskCategory}
            onChange={(e) => setTaskCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
