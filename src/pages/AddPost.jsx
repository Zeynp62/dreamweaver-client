import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Client from '../services/api'

const AddPost = ({ userInfo }) => {
  let navigate = useNavigate()
  const initialState = {
    title: '',
    description: '',
    category: '',
    postImg: null
  }
  const [postState, setPostState] = useState(initialState)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Client.get('http://localhost:3001/category')
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const handleChange = (event) => {
    const { name, type, files, value } = event.target

    if (name === 'category') {
      const selectedCategory = categories.find((cat) => cat._id === value)
      setPostState({ ...postState, category: selectedCategory })
      return
    }

    setPostState({ ...postState, [name]: type === 'file' ? files[0] : value })
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const formData = new FormData()
      formData.append('title', postState.title)
      formData.append('description', postState.description)
      formData.append('category', postState.category._id)
      formData.append('user', userInfo._id)

      if (postState.postImg) {
        formData.append('image', postState.postImg)
      }

      const response = await Client.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      navigate('/home')
    } catch (error) {
      console.log('Error submitting post:', error)
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="post-form">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          value={postState.title}
          required
        />
        <label htmlFor="description">Post Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={postState.description}
          required
        ></textarea>
        <label htmlFor="category">Select Category</label>
        <select
          id="category"
          name="category"
          onChange={handleChange}
          value={postState.category._id}
          required
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <label htmlFor="postImg">Upload Image:</label>
        <input
          type="file"
          id="postImg"
          name="postImg"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default AddPost
