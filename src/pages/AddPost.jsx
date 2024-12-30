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
    setPostState({ ...postState, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      let response = await axios.post(
        'http://localhost:3001/addpost',
        postState
      )
      setPosts([...posts, response.data])
      setPostState(initialState)
      navigate('/')
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
        onChange={handleChange}
        value={postState.title}
      />
      <label htmlFor="description">Post Description:</label>
      <textarea
        id="description"
        cols="30"
        rows="10"
        onChange={handleChange}
        value={postState.description}
      ></textarea>
      <label htmlFor="category">Select Category</label>
      <select id="category" onChange={handleChange} value={postState.category}>
        <option value="study">Study</option>
        <option value="fitness">Fitness</option>
        <option value="motivation">Motivation</option>
        <option value="general">General</option>
      </select>

      <button type="submit">Post</button>
    </form>
  )
}

export default AddPost
