import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
const AddPost = ({ posts, setPosts }) => {
  let navigate = useNavigate()
  const initialState = {
    profilePic: '', //of user
    username: '', //of user
    description: '',
    postImg: '',
    category: 'general'
  }
  const [postState, setPostState] = useState(initialState)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUserData = async () => {
      try {
        let response = await axios.get('http://localhost:3001/:id')
        const userData = response.data
        setUser(userData)
        setPostState((prevState) => ({
          ...prevState,
          profilePic: userData.profilePic,
          username: userData.username
        }))
      } catch (error) {
        console.log('Error fetching user data:', error)
      }
    }
    getUserData()
  }, [])

  const handleChange = (event) => {
    const { name, type, files, value } = event.target

    setPostState({ ...postState, [name]: type === 'file' ? files[0] : value })
  }

  const handleSubmit = async (event) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('title', postState.title)
      formData.append('description', postState.description)
      formData.append('category', postState.category)
      formData.append('image', postState.postImg)

      const response = await axios.post(
        'http://localhost:3001/posts',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      console.log(response.data)
    } catch (error) {
      console.log('Error submitting post:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
        value={postState.category}
        required
      >
        <option value="study">Study</option>
        <option value="fitness">Fitness</option>
        <option value="motivation">Motivation</option>
        <option value="general">General</option>
      </select>

      <label htmlFor="image">Upload Image:</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />

      <button type="submit">Post</button>
    </form>
  )
}

export default AddPost
