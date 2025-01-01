import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('') //for error msg

  const handleDeleteAccount = async () => {
    //first retreive token
    const token = localStorage.getItem('token')

    const config = { headers: { Authorization: `Bearer ${token}` } }

    try {
      //the delete "user/:id"
      await axios.delete(`http://localhost:3001/user/${user._id}`, config)
      localStorage.removeItem('token') //remove token
      setUser(null)

      navigate('/') // back to StartPage
    } catch (error) {
      console.error('Error deleting account:', error)
      setMessage('Error Deleting Account.')
    }
  }

  return user ? (
    <div className="profile-container">
      <h1>{user.username} Profile</h1>
      <img
        src={`http://localhost:3001/${user.profileImg}`}
        alt={`${user.username} Profile Picture`}
        width={200}
      />
      <h3>Email: {user.email}</h3>
      <div className="dashboard">
        <h3>Dreams: {user.tasks.length}</h3>
        <h3>Posts: {user.posts.length}</h3>
      </div>

      {/* error msg*/}
      {message && <p>{message}</p>}

      <Link to="/edit-profile">Edit Profile</Link>

      {/*delete profile */}
      <form>
        <button type="button" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </form>

      {/*user post if exist */}

      <div className="user-posts-container">
        {user.posts?.map((post) => (
          <div
            key={post._id}
            style={{ border: '1px solid black' }}
            className="user-post"
          >
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <img
              src={`http://localhost:3001/${post.postImg}`}
              alt={`${post.title} Image`}
            />
            <Link to={`/posts/${post._id}`} className="edit-link">
              Edit Post
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <h1>Loading . . . </h1>
  )
}

export default Profile
