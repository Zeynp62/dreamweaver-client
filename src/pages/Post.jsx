import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import AddPost from './AddPost'
const Post = () => {
  const [posts, setPosts] = useState([])
  const getPosts = async () => {
    try {
      let res = await axios.get('http://localhost:3001/posts')
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
      <AddPost />
      {/* {posts?.map((post) => (
      
      ))} */}
    </div>
  )
}

export default Post
