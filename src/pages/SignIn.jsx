import React, { useState } from 'react'
import { BASE_URL } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'


const SignIn = ({setUser}) => {
  let navigate = useNavigate()
  let initialState = {
    username: '',
    password: ''
  }

  const [message, setMessage] = useState('') 

  const [formData, setFormData] = useState(initialState)
  
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const payload = await SignInUser(formData)
      // localStorage.setItem('token', payload.token) // Save token
      setFormData(initialState)
      setUser(payload)
      navigate('/home')
      
    } catch (error) {
      setMessage("Wrong Input")

    }
  }

  return (
    <div>
      <h2>Sign In</h2>
      <p style={{color:"red"}}>{message}</p>
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
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default SignIn
