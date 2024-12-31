import { useState, useEffect } from 'react'
import CategoryFilter from './../components/Category'

const Home = ({ user, categories }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (categories?.length > 0) {
      setPosts(categories[0].posts) // Default category
    }
  }, [categories])

  const handleChange = (categorizedPosts) => {
    setPosts(categorizedPosts)
  };

  return user ? (
    <div>
      <h1>Welcome To the Home Page</h1>

      {/* Category component */}
      <CategoryFilter categories={categories} onChange={handleChange} />

      {/* Render filtered posts */}
      <div>
        <h3>Posts</h3>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <img src={`http://localhost:3001/${post.postImg}`} alt={post.title} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts available for this category.</p>
        )}
      </div>
    </div>
  ) : (
    <h3>Error: You Should Sign In to Access This Page</h3>
  )
}

export default Home
