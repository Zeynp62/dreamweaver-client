import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ user, setUser }) => {
  let navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    profileImg: null,
  })

  const [message,setMessage] = useState('')

  //handle change in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profileImg: e.target.files[0] }));
  }

  // const handleSectionChange = () =>{
  //   setCurrentSection(section)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    const config = { headers: { Authorization: `Bearer ${token}` } }

    const data = new FormData()
    data.append('username', formData.username)
    data.append('email', formData.email)
    if (formData.profileImg) data.append('profileImg', formData.profileImg)

    try {
      const response = await axios.put(
        `http://localhost:3001/user/update/${user._id}`,
        data,
        config
      )
      setUser(response.data.user); // Update the user state with the updated profile
      alert('Profile updated successfully!')
      navigate('/profile')
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage("Error While Editing The Profile")
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <p>{message}</p>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Profile Image:</label>
        <input type="file" name="profileImg" onChange={handleFileChange} />
      </div>
      <button type="submit">Save Changes</button>
    </form>
    </div>
  );
};

export default EditProfile;
