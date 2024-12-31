import { Link } from 'react-router-dom'
import EditProfile from './EditProfile'
import BASE_URL from './../services/api'
const Profile = ({ user }) => {
  return user ? (
    <div>
      <h1>{user.username} Profile</h1>
      <img
        src={`http://localhost:3001/${user.profileImg}`}
        alt={`${user.username} Profile Picture`}
        width={200}
      />
      <h3>Email: {user.email}</h3>
      {/* <h3>{user.id}</h3> */}
      <div>
        <h3>Dreams: {user.tasks.length}</h3>
        <h3>Posts: {user.posts.length}</h3>
      </div>
      <Link to="/edit-profile">Edit Profile</Link>
      <div>
        {user.posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid black' }}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <img src={`http://localhost:3001/${post.postImg}`} alt={`${post.title} Image`} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <h1>Loading . . . </h1>
  )
}

export default Profile
