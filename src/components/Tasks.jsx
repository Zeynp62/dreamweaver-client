import React, { useState } from 'react';

const Task = ({ task }) => {
  const [taskState, setTaskState] = useState(task.taskState);

  const handleCheckboxChange = () => {
    setTaskState(!taskState);
    // Here, you would also want to send an API request to update the task state
    // axios.put(`http://localhost:3001/task/${task._id}`, { taskState: !taskState });
  };

  const categories = {
    personal: 'Personal',
    work: 'Work',
  };

  return (
    <div>
      <input type="checkbox" checked={taskState} onChange={handleCheckboxChange} />
      <span>{task.taskName}</span>
      <span> - {categories[task.category_id] || 'Unknown Category'}</span>
    </div>
  );
};

export default Task;