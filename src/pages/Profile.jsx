import { Link } from "react-router-dom"
const Profile = ({user}) =>{

  return(
    <div>
      <h1>{user.username} Profile</h1>
      <img src={user.profileImg} alt={`${user.username} Profile Picture`} width={200}/>
      <div>
        <h3>Email: {user.email}</h3>
        <Link to="/edit-profile">Edit Email</Link>
        <Link to="/edit-profile">Edit Password</Link>
      </div>

      <h3>{user.id}</h3>
      <h3>Dreams: {user.tasks.length}</h3>
      <h3>Posts: {user.posts.length}</h3>
    </div>
  )
}

export default Profile