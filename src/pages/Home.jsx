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
    <div>
      <h1>Welcome To the Home Page</h1>
      {/* Category component */}
      <CategoryFilter categories={categories} onChange={handleChange} />

      {/* Render filtered posts */}
      <div>
        <h3>Posts</h3>
        {/* {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <img
                  src={`http://localhost:3001/${post.postImg}`}
                  alt={post.title}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts available for this category.</p>
        )} */}
        <Post thisposts={posts} thisuser={user} />
      </div>
    </div>
  ) : (
    <h3>Error: You Should Sign In to Access This Page</h3>
  )
}

export default Home
