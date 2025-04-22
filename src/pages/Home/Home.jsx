import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import logoImage from "../../assets/images/logo.jpg"; // Import the image directly

function Home() {
  return (
    <div className="splash-screen">
      <div className="splash-logo">
        <img src={logoImage} alt="Notes App Logo" />
      </div>
      <div className="splash-description">
        <p>
          Your simple and secure notes app. Create, organize, and access your
          <br />
          notes anytime, anywhere.
        </p>
      </div>
      <Link className="btn" to="/notes">
        Get Started
      </Link>
    </div>
  );
}

export default Home;
