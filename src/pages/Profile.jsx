const Profile = ({user}) =>{

  return(
    <div>
      <h1>{user.username} Profile</h1>
      <h3>Email: {user.email}</h3>
      <h3>{user.id}</h3>
      <h3>Dreams: {user.tasks}</h3>
      <h3>Posts: {user.posts}</h3>
    </div>
  )
}

export default Profile