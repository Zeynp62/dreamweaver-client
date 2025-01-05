import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EditProfile = ({ user, setUser }) => {
  if (!user) {
    return <h1>Loading...</h1>;
  }

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: user.email,
    oldPassword: '',
    newPassword: '',
    profileImg: null,
    message: ''
  })
  const [message, setMessage] = useState('')

  const [selectedSection, setSelectedSection] = useState('')

  const token = localStorage.getItem('token')
  const config = { headers: { Authorization: `Bearer ${token}` } }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value
    }))
  } //work with img too

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    try {
      //update email
      const response = await axios.put(
        `http://localhost:3001/user/update-email/${user._id || user.id}`,
        { email: formData.email },
        config
      )
      setUser(response.data.user) // Updating the user state data
      alert('Email updated successfully!')
      navigate('/profile')
    } catch (error) {
      console.error('Error updating email:', error)
      setMessage('Error updating email.')
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        `http://localhost:3001/user/update-password/${user._id || user.id}`,
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        },
        config
      )
      alert('Password updated successfully!')
      navigate('/profile')
    } catch (error) {
      console.error('Error updating password:', error)
      setMessage('Error updating password.')
    }
  }

  const handleProfileImgSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('profileImg', formData.profileImg)

    try {
      const response = await axios.put(
        `http://localhost:3001/user/update-profile-image/${user._id || user.id}`,
        data,
        config
      )
      setUser(response.data.user) //update state
      alert('Profile image updated successfully!')
      navigate('/profile')
    } catch (error) {
      console.error('Error updating profile image:', error)
      setMessage('Error updating profile image.')
    }
  }
<<<<<<< HEAD
  
    return user ? (
    <div>
      <h1>Edit Profile</h1>
      <p style={{ color: 'red' }}>{message}</p>

      <div>
        <button onClick={() => setSelectedSection('email')}>Edit Email</button>
        <button onClick={() => setSelectedSection('password')}>
          Change Password
        </button>
        <button onClick={() => setSelectedSection('profileImg')}>
          Update Profile Image
        </button>
      </div>

      {selectedSection === 'email' && (
        <form onSubmit={handleEmailSubmit}>
          <div>
            <label>New Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Email</button>
        </form>
      )}

      {selectedSection === 'password' && (
        <form onSubmit={handlePasswordSubmit}>
          <div>
            <label>Old Password:</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>
      )}

      {selectedSection === 'profileImg' && (
        <form onSubmit={handleProfileImgSubmit} encType="multipart/form-data">
          <div>
            <label>Profile Image:</label>
            <input
              type="file"
              name="profileImg"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Profile Image</button>
        </form>
      )}
    </div>
    ) : (
      <h1>Loading . . . </h1>
    )
=======

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email: user?.email || ''
    }))
  }, [user])

  return user ? (
      <div className="edit-profile-form">
        <h1>Edit Profile</h1>
        {formData.message && <p className="error">{formData.message}</p>}
        
        <div className="section-buttons">
          <button onClick={() => setSelectedSection('email')}>Edit Email</button>
          <button onClick={() => setSelectedSection('password')}>Change Password</button>
          <button onClick={() => setSelectedSection('profileImg')}>Update Profile Image</button>
        </div>
  
        {selectedSection === 'email' && (
          <form onSubmit={handleEmailSubmit}>
            <div>
              <label>New Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Update Email</button>
          </form>
        )}
  
        {selectedSection === 'password' && (
          <form onSubmit={handlePasswordSubmit}>
            <div>
              <label>Old Password:</label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>New Password:</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Change Password</button>
          </form>
        )}
  
        {selectedSection === 'profileImg' && (
          <form onSubmit={handleProfileImgSubmit} encType="multipart/form-data">
            <div>
              <label>Profile Image:</label>
              <input
                type="file"
                name="profileImg"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Update Profile Image</button>
          </form>
        )}
      </div>
  ) : (
    <h3>Error: You Should Sign In to Access This Page</h3>
  )
>>>>>>> d64cb9d55e7fc5f72fb52806eb69c60383d4eb7c
}

export default EditProfile
