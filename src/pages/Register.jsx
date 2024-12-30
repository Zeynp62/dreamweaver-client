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


    // try {
    //   const response = await fetch(`${BASE_URL}/auth/register`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    //   })

    //   const data = await response.json()

    //   if (response.ok) {
    //     setMessage(data.msg) // Show success message
    //     setFormData({ username: '', email: '', password: '', profileImg: '' }) // Reset form
    //     navigate('/sign-in')
    //   } else {
    //     setMessage(data.msg || 'Registration failed') // Show error message
    //   }
    // } catch (error) {
    //   console.error('Error during registration:', error)
    //   setMessage('Network error. Please try again later.')
    // }
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
