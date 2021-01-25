import React from "react";
import { Link, Router } from "react-router-dom";
import hero from "../assets/img/hero.png";

// core components
import Button from "components/CustomButtons/Button.js";
import "./Home.css";

export default function Home() {
  return (
    <div className="fullView">
      <div className="nav">
        <Link to='/signin' >
          <div className="sign">Sign in</div>
        </Link>
        <Link to='/Signup' >
          <div className="sign">Sign Up</div>
        </Link>
      </div>
      <div className="hero">
        <div className="hero-text">
          <h1 className="h1">FitGive</h1>
          <h4>Exercise with your friends for a good cause.</h4>
          <Button color="rose" className="learnMore">Learn More</Button>
        </div>
        <img id="hero-img" src={hero} alt="FitGive Hero" />
      </div>
    </div>
  );
}
