import React, { useState, useEffect } from 'react'
import AddTask from './AddTask'
import Client from '../services/api'

const Dreams = ({ user, setUser, categories }) => {
  const [tasks, setTasks] = useState([]) // Local state for tasks

  // Sort tasks in ascending order by taskDate
  const sortedTasks = tasks.sort((a, b) => {
    const dateA = a.taskDate ? new Date(a.taskDate) : new Date()
    const dateB = b.taskDate ? new Date(b.taskDate) : new Date()
    return dateA - dateB
  })

  //delete task
  const deleteTask = async (taskId) => {
    try {
      const response = await Client.delete(`/tasks/${taskId}`)
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  // mark the task as completed
  const toggleCompletion = async (task) => {
    try {
      const updatedTask = {
        ...task,
        taskState: !task.taskState // Toggle the state
      }

      // Update task completion status in the backend
      const response = await Client.put(`/tasks/${task._id}`, updatedTask)

      // Update the task in the local state
      setTasks((prevTasks) =>
        prevTasks.map((taskItem) =>
          taskItem._id === task._id ? response.data : taskItem
        )
      )
    } catch (error) {
      console.error('Error updating task completion:', error)
    }
  }

  // show when loaded
  useEffect(() => {
    if (user && Array.isArray(user.tasks)) {
      setTasks(user.tasks)
    }
  }, [user])

  return user ? (
    <div className="dreams-container">
      <h1>My Dreams</h1>
      <AddTask user={user} setUser={setUser} categories={categories} />

      {/* Display tasks in frames */}
      <div className="tasks-container">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3>{task.taskName}</h3>
            <p>
              {/* to show the date and time */}
              {task.taskDate &&
                new Date(task.taskDate).toLocaleDateString() +
                  ' ' +
                  new Date(task.taskDate).toLocaleTimeString()}
            </p>
            <label>
              <input
                type="checkbox"
                checked={task.taskState}
                onChange={() => toggleCompletion(task)} // Toggle task completion when clicked
              />
              Completed
            </label>
            <button className="delete-btn" onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <h3>Error: You Should Sign In to Access This Page</h3>
  )
}
export default Dreams
