import { Link } from "react-router-dom";


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
      </div>
    </div>
  );
};

export default StartingPage;
