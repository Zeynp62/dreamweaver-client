import { useState, useEffect } from 'react'
import CategoryFilter from './../components/Category'
import Post from './Post'
import Client from '../services/api'

const Home = ({ user, categories }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (categories?.length > 0) {
      setPosts(categories[0].posts) // Default category
    }
  }, [categories])

  const handleChange = (categorizedPosts) => {
    setPosts(categorizedPosts)
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        console.log('Fetching posts...')
        let res = await Client.get('http://localhost:3001/posts/')
        console.log(res)
        setPosts(res.data) // Ensure you're using the correct property from the response
      } catch (err) {
        console.error('Error fetching posts:', err)
      }
    }
    getPosts() // Call the function inside the useEffect
  }, [])

  return user ? (
    <div className="main-content">
      <div className="navbar">
        <a href="/profile">{user.name}</a>
      </div>
      <h1>Welcome To the Home Page</h1>
      <CategoryFilter categories={categories} onChange={handleChange} />
      <h3>Posts</h3>
      <Post thisposts={posts} thisuser={user} />
    </div>
  ) : (
    <h3>Error: You Should Sign In to Access This Page</h3>
  );
};

export default Home
