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
    confirmPassword: ""
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

    try {
      if(formData.password !== formData.confirmPassword){
        setMessage('Passwords do not match.')
        return
      }
  
      await RegisterUser ({
        username: formData.username,
        email:formData.email,
        password:formData.password
      })
      setFormData(initialState)
      navigate('/sign-in')
      alert('User Registered Successfully!');
      
    } catch (error) {
      setMessage('This User Already exist')
    }
  }

  return (
    <div>
      <h2>Register</h2>
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
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
