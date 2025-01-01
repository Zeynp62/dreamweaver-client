import React, { useState, useEffect } from 'react'
import AddTask from './AddTask'
import Client from '../services/api'

const Dreams = ({ user, setUser, categories }) => {
  const [tasks, setTasks] = useState([]) // Local state for tasks


  // mark the task as completed
  const toggleCompletion = async (task) => {
    try {
      const updatedTask = {
        ...task,
        taskState: !task.taskState // Toggle change
      }

      // Update task in the backend
      const response = await Client.put(`/tasks/${task._id}`, updatedTask)

      // Update task in the state
      setTasks((prevTasks) =>
        prevTasks.map((taskItem) =>
          taskItem._id === task._id ? response.data : taskItem
        )
      )
    } catch (error) {
      console.error('Error updating task completion:', error)
    }
  }


  // Sort tasks in ascending order by taskDate
  const sortedTasks = tasks.sort((a, b) => {
    const dateA = a.taskDate ? new Date(a.taskDate) : new Date()
    const dateB = b.taskDate ? new Date(b.taskDate) : new Date()
    return dateA - dateB
  })

  // Set tasks in local state when the user data is loaded
  useEffect(() => {
    if (user && Array.isArray(user.tasks)) {
      setTasks(user.tasks)
    }
  }, [user])

  return user ? (
    <div>
      <h1>My Dreams</h1>
      <AddTask
        user={user}
        setUser={setUser}
        categories={categories}
      />
      <div>
        {sortedTasks.map((task) => (
          <div
            key={task._id}
            style={{
              textDecoration: task.taskState ? 'line-through' : 'none', // Apply line-through if task is completed
              opacity: task.taskState ? 0.6 : 1 // Optionally adjust opacity for completed tasks
            }}
          >
            <h3>{task.taskName}</h3>
            <p>
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
            </label>yyyyyy
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default Dreams
