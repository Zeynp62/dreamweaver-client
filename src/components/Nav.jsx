import { Link } from 'react-router-dom';

const Nav = ({ user, handleLogOut }) => {
  let userOptions;
  if (user) {
    userOptions = (
      <nav>
        <Link to="/profile">
          <img
            src={`http://localhost:3001/${user.profileImg}`}
            alt={`${user.username} Profile Picture`}
            width={50}
          />
        </Link>
        <Link to="/home">Home</Link>
        <Link to="/dreams">Dreams</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/posts">Add posts</Link>
        <Link to="/motivation">Motivate Me!</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    );
  }

  const publicOptions = (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/sign-in">Sign In</Link>
    </nav>
  );

  return user ? (
    <header>
      {userOptions}
      <h3>Welcome {user.username}!</h3> {/* This goes to the right */}
    </header>
  ) : (
    <header>{publicOptions}</header>
  );
};

export default Nav;


