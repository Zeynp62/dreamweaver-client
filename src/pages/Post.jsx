import { useState, useEffect } from 'react'

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
<<<<<<< HEAD
            <div className="user-info"></div>
            <p>{post.user.username}</p>
            {/* Post Info */}
=======
>>>>>>> d64cb9d55e7fc5f72fb52806eb69c60383d4eb7c
            <h3 className="post-title">{post.title}</h3>
            <p className="post-description">{post.description}</p>
            <p className="post-category">{post.category.categoryName}</p>
            {post.postImg && post.postImg !== 'null' && (
              <img
                src={`http://localhost:3001/${post.postImg}`}
                alt="Post"
                className="post-img"
              />
            )}
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};


export default Post
