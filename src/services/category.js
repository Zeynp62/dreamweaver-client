import Client from './api'

// fetch all categories
export const GetCategories = async () =>{
  try {
    const res = await Client.get('/category')
    return res.data
  } catch (error) {
    console.log(error)
    
  }
}

// get categories by Id
export const GetCategoryById = async () =>{
  try {
    const res = await Client.get(`/category/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

