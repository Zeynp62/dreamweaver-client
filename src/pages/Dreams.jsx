import React, { useState, useEffect } from 'react'
import AddTask from './AddTask'
import Client from '../services/api'

const Dreams = ({ user, setUser, categories }) => {
  const [tasks, setTasks] = useState([]) // Local state for tasks
  const [editingTask, setEditingTask] = useState(null)

  // Delete task function
  const deleteTask = async (taskId) => {
    try {
      const response = await Client.delete(`/tasks/${taskId}`)

      // Update the local tasks state by removing the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  // Toggle task completion state
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

  const startEditing = (task) => {
    setEditingTask(task)
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
        editingTask={editingTask}
        setEditingTask={setEditingTask}
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
            <p>Category: {task.category ? task.category.name : 'No category assigned'}</p>

            <label>
              <input
                type="checkbox"
                checked={task.taskState}
                onChange={() => toggleCompletion(task)} // Toggle task completion when clicked
              />
              Completed
            </label>
            <button onClick={() => startEditing(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default Dreams
