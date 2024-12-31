import Client from './api'

export const createATask = async (data) => {
  try {
    const res = await Client.post('/task', data)
    return res.data
  } catch (error) {
    throw error
  }
}
