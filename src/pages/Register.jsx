import React, { useState } from 'react'
import { BASE_URL } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth'

const Register = () => {
  let navigate = useNavigate()
  let initialState = {
    username: '',
    email: '',
    password: '',
    profileImg: ''
  }

  const [formData, setFormData] = useState(initialState)


  const [message, setMessage] = useState('')

  // Handle input changes "onChange()"
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  // Handle form submission "onSubmit"
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    await RegisterUser ({
      username: formData.username,
      email:formData.email,
      password:formData.password
    })
    setFormData(initialState)
    navigate('/sign-in')
  }

  return (
    <div>
      <h2>Register</h2>
      <p>{message}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Profile Image URL (optional):</label>
          <input
            type="text"
            name="profileImg"
            value={formData.profileImg}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
