import { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import AddPost from './AddPost'
import Client from '../services/api'
const BASE_URL = 'http://localhost:3001'

const Post = ({ thisposts, thisuser }) => {
  const [posts, setPosts] = useState(thisposts)

  useEffect(() => {
    const sortedPosts = [...thisposts].sort(
      (b, a) => new Date(a.createdAt) - new Date(b.createdAt) // Adjust the key for sorting
    )
    setPosts(sortedPosts)
  }, [thisposts])

  return (
    <div className="posts-container">
      {posts?.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <div className="user-info"></div>
            <p>{post.user.username}</p>
            {/* Post Info */}
            <h3 className="post-title">{post.title}</h3>
            <p className="post-description">{post.description}</p>

            {/* Category */}
            <p className="post-category">{post.category.categoryName}</p>

            {/* Post Image */}
            {post.postImg && post.postImg !== 'null' && (
              <img
                src={`http://localhost:3001/${post.postImg}`}
                alt="Post"
                className="post-img"
                width={400}
              />
            )}
          </div>
        ))
      ) : (
        <p>No posts available.</p> // Fallback message when no posts are available
      )}
    </div>
  )
}

export default Post
