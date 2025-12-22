import { Link } from 'react-router-dom'
import Lottie from 'react-lottie-player'
import DreamyCloud from '../assets/animations/dream.json'

const StartingPage = () => {
  return (
    <div className="starting-page-container">
      <h1 className="welcome-text">Welcome to Dream Weaver</h1>
      <div className="button-container">
        <Link to="/register" className="button">
          Sign Up
        </Link>
        <Link to="/sign-in" className="button">
          Sign In
        </Link>
        <div className="lottie-player">
          <Lottie
            loop
            animationData={DreamyCloud}
            play
            style={{
              width: 700,
              height: 700
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default StartingPage
