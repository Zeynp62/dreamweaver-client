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

  // show when loaded
  useEffect(() => {
    if (user && Array.isArray(user.tasks)) {
      setTasks(user.tasks)
    }
  }, [user])

  return user ? (
    <div>
      <h1>My Dreams</h1>
      <AddTask user={user} setUser={setUser} categories={categories} />
      <div>
        {tasks.map((task) => (
          <div key={task._id}>
            <h3>{task.taskName}</h3>
            <p>{/*to show the date and time */}
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
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default Dreams
