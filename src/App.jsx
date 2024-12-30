import './App.css'
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

<<<<<<< HEAD

=======
>>>>>>> 48e6a45de79e65fedd0cf7094cd8902ca642e857
import { CheckSession } from './services/Auth'
import axios from 'axios'

function App() {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () =>{
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      checkToken()
    }
  },[])


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
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/edit-profile" element={<EditProfile user={user} />} />
        <Route path="/home" element={<Home user={user} />} />

        {/* Post Routes */}
        <Route path="posts" element={<AddPost user={user} />} />

        {/* Task Routes */}
        <Route path="/dreams" element={<Dreams user={user}/>} />
        <Route path="/add-task" element={<AddTask user={user}/>} />
      </Routes>
    </div>
  )
}

export default App
