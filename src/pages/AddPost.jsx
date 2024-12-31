import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
const AddPost = ({ userInfo }) => {
  let navigate = useNavigate()
  const initialState = {
    username: '', //of user
    profileImg: '', //of user
    title: '',
    description: '',
    category: 'general',
    postImg: null
  }
  const [postState, setPostState] = useState(initialState)
  const [user, setUser] = useState({ username: '', profileImg: '' })

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo)
      console.log('User state updated:', userInfo)
    }
  }, [userInfo])

  const handleChange = (event) => {
    const { name, type, files, value } = event.target

    setPostState({ ...postState, [name]: type === 'file' ? files[0] : value })
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const formData = new FormData()
      formData.append('username', user.username) //
      formData.append('profileImg', user.profileImg) //
      formData.append('title', postState.title)
      formData.append('description', postState.description)
      formData.append('category', postState.category)
      formData.append('image', postState.postImg) //

      const response = await axios.post(
        `http://localhost:3001/posts/${userInfo.id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
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
