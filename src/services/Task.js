import Client from './api'

// Create a new task
export const createTask = async (data) => {
  try {
    const res = await Client.post('/task', data)
    return res.data
  } catch (error) {
    throw error
  }
}

// Delete a task by ID
export const deleteTask = async (taskId) => {
  try {
    const res = await Client.delete(`/task/${taskId}`)
    return res.data
  } catch (error) {
    throw error
  }
}
