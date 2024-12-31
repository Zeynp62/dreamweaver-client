import Post from './Post'

const Home = ({ user }) => {
  return user ? (
    <div>
      <h1>Welcome To the Home Page</h1>
      <Post />
    </div>
    ) : (
      <h3>Error: You Should Sign In to Access This Page</h3>
    )
}

export default Home
