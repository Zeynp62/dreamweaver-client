import './App.css'
import './css/home.css'
import './css/nav.css'
import './css/Dreams.css'
import './css/profile.css'
import './css/editprofile.css'
import './css/addpost.css'
import './css/startingpage.css'
import './css/signin.css'
import './css/register.css'
import './css/editpost.css'


import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import StartingPage from './pages/StartingPage'

import SignIn from './pages/SignIn'
import Register from './pages/Register'

import Home from './pages/Home'

import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'

import Post from './pages/Post'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'

import Dreams from './pages/Dreams'
import AddTask from './pages/AddTask'

import { CheckSession } from './services/Auth'
import { GetCategories } from './services/category'
import axios from 'axios'

function App() {
  const [user, setUser] = useState(null)
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])
  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)

    const categoriesData = await GetCategories()
    // console.log('Fetched Categories:', categoriesData); // to check if categories is passed correctly

    setCategories(categoriesData) 
  }

  return (
    <div>
      <header>
        <Nav user={user} handleLogOut={handleLogOut} />
      </header>

      <Routes>
        {/* User routes */}
        <Route path="/" element={<StartingPage />} />
        <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={<Profile user={user} setUser={setUser} />}
        />
        <Route
          path="/edit-profile"
          element={<EditProfile user={user} setUser={setUser} />}
        />
        <Route
          path="/home"
          element={<Home user={user} categories={categories} />}
        />

        {/* Post Routes */}
        <Route path="/posts" element={<AddPost userInfo={user} />} />
        <Route
          path="/posts/:id"
          element={<EditPost userInfo={user} setUser={setUser} />}
        />

        {/* Task Routes */}
        <Route path="/dreams" element={<Dreams user={user} setUser={setUser} categories={categories}/>} />
        <Route path="/add-task" element={<AddTask user={user} categories={categories}/>} />
      </Routes>
    </div>
  )
}

export default App
