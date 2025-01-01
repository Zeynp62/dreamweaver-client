import { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import AddPost from './AddPost'
import Client from '../services/api'
const BASE_URL = 'http://localhost:3001'
const Post = ({ thisposts }) => {
  const [posts, setPosts] = useState(thisposts)
  const getPosts = async () => {
    try {
      console.log('this ')

      let res = await Client.get('http://localhost:3001/posts/')
      console.log(res)
      setPosts(posts)
    } catch (err) {
      console.log(err)
    }
    useEffect(() => {
      getPosts()
    }, [])
  }
  return (
    <div className="posts-container">
      {posts?.map((post) => (
        <div key={post._id} className="post-card">
          <div className="user-info">
            {/* <img
              src={`uploads/${post.user}`} //  adjust based on actual user profile image
              alt="User Profile"
              className="user-profile-img"
            /> */}
            <p className="username">{post.user.username}</p>
          </div>

          {/* Post Info */}
          <h3 className="post-title">{post.title}</h3>
          <p className="post-description">{post.description}</p>

          {/* Category */}
          <p className="post-category">{post.category.categoryName}</p>

          {/* Post Image */}
          {/* {post.postImg && post.postImg !== 'null' && (
            <img src={post.postImg} alt="Post" className="post-img" />
          )} */}
        </div>
      ))}
    </div>
  )
}

export default Post
