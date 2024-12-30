import { Link } from 'react-router-dom'


const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user) {
    userOptions = (
      <nav>
        <h3>Welcome {user.usename}!</h3>
        <Link to="/home">Posts</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
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

  return (
    <header>
      <Link to="/">
      </Link>
      {user ? userOptions : publicOptions}
    </header>
  )
}

export default Nav
