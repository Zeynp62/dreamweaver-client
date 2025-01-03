import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user) {
    userOptions = (
      <nav>
        <h3>Welcome {user.username}!</h3> {/* can delete it for design */}
        <Link to="/profile"><img src={`http://localhost:3001/${user.profileImg}`}
        alt={`${user.username} Profile Picture`}
        width={50} /></Link>
        <Link to="/home">Home</Link>
        <Link to="/dreams">Dreams</Link>
        <Link to="/profile">Profile</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
        <Link to="/posts">Add posts</Link>
      </nav>
    )
  }

  const publicOptions = (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/sign-in">Sign In</Link>
    </nav>
  )

  return user ? (
    <header>
      <Link to="/"></Link>
      {user ? userOptions : publicOptions}
    </header>
  ):(<></>)
}

export default Nav
