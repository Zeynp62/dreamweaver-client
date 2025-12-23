import { useState } from 'react'
import axios from 'axios'
import '../css/task.css'

const Task = ({ task, setTasks }) => {
  const [taskState, setTaskState] = useState(task.taskState)
  const handleCheckboxChange = () => {
    setTaskState(!taskState)
    // Here, you would also want to send an API request to update the task state
    // axios.put(`http://localhost:3001/task/${task._id}`, { taskState: !taskState });
  }
  const handleDeleteClick = async () => {
    try {
      // Send DELETE request to backend
      await axios.delete(
        `https://dreamweaver-server.onrender.com/task/${task._id}`
      )
      // After deletion, update the task list state
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }
  const categories = {
    personal: 'Personal',
    work: 'Work'
  }
  return (
    <div>
      <input
        type="checkbox"
        checked={taskState}
        onChange={handleCheckboxChange}
      />
      <span>{task.taskName}</span>
      <span> - {categories[task.category] || 'Unknown Category'}</span>
      <button className="delete-btn" onClick={handleDeleteClick}>
        Delete
      </button>{' '}
    </div>
  )
}
export default Task
