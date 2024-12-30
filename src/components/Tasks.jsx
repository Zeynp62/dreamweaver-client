import { useState } from 'react';

const Task = ({ onAddTask, categories }) => {
    const [taskText, setTaskText] = useState('');
    const [category, setCategory] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (taskText && category) {
        onAddTask(taskText, category);
        setTaskText(''); // Clear input field
        setCategory(''); // Clear category selection
      } else {
        alert('Please fill out both task and category');
      }
    };
  
    return (
      <div>
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Task:</label>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Enter your task"
            />
          </div>
          <div>
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Add Task</button>
        </form>
      </div>
    );
  };
  
  export default Task;