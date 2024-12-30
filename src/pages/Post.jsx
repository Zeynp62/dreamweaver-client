import { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import AddPost from './AddPost'
const Post = () => {
  const [posts, setPosts] = useState([])
  const getPosts = async () => {
    try {
      let res = await axios.get('http://localhost:3001/posts/addpost')
      setPosts(res.data)
    } catch (err) {
      console.log(err)
    }
    useEffect(() => {
      getPosts()
    }, [])
  }
  return (
    <div>
      {posts?.map((post, index) => (
        <div key={index} className="post">
          <img
            src={post.profilePic}
            alt={`${post.username}'s profile`}
            className="profile-pic"
          />
          <h2>{post.username}</h2>
          <p>
            <strong>{post.title}</strong>
          </p>
          <p>{post.description}</p>
          {post.postImg && (
            <img src={post.postImg} alt="Post content" className="post-img" />
          )}
          <p>
            <strong>Category:</strong> {post.category}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Post
