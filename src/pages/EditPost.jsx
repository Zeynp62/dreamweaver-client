import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Client from '../services/api'
const EditPost = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [postState, setPostState] = useState({
    title: '',
    description: '',
    category: '',
    postImg: ''
  })
  const [categories, setCategories] = useState([])

  const handleDeletePost = async () => {
    try {
      await Client.delete(`http://localhost:3001/posts/${id}`)
      setPostState(null)
      navigate('/home') // back to StartPage
    } catch (error) {
      console.error('Error deleting account:', error)
      setMessage('Error Deleting Account.')
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRes = await Client.get(`http://localhost:3001/posts/${id}`)
        const categoriesRes = await Client.get('http://localhost:3001/category')
        const postData = postRes.data
        setPostState((prevState) => ({
          ...prevState,
          title: postData.title,
          description: postData.description,
          category: postData.category._id,
          postImg: postData.postImg
        }))
        setCategories(categoriesRes.data)
        console.log(postState)
        console.log(categories)
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    }

    fetchPost()
  }, [id])
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
    event.preventDefault()
    try {
      event.preventDefault()
      const formData = new FormData()
      formData.append('title', postState.title)
      formData.append('description', postState.description)
      formData.append('category', postState.category._id)
      if (postState.postImg instanceof File) {
        formData.append('postImg', postState.postImg)
      }
      console.log(formData)
      await Client.put(`http://localhost:3001/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      navigate('/home')
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  return postState ? (
    <div className="edit-post-container">
      <form onSubmit={handleSubmit} className="edit-post-form">
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

        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          name="category"
          onChange={handleChange}
          value={postState.category}
          required
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <label htmlFor="postImg">Upload New Image (optional):</label>
        <input
          type="file"
          id="postImg"
          name="postImg"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Update Post</button>
      </form>
      <form>
        <button type="button" onClick={handleDeletePost}>
          Delete Post
        </button>
      </form>
    </div>
  ) : (
    <p>Loading post...</p>
  )
}

export default EditPost
