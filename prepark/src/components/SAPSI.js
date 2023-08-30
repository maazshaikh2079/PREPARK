import "./SAPSI.css";
import "../App.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext.js";

function SAPSI() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
        await logIn(Email, Password);
        navigate("/");
    } catch(err) {
        setError(err.message);
    } 
  };

  const handleGoogleSignIn = async(e) => {
    e.preventDefault();
    try {
        await googleSignIn();
        navigate("/");
    } catch(err) {
        setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="image1"></div>
      <div className="form">
       {error && <Alert variant="danger">{error}</Alert>}
       <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          < br/>
          <button type="Submit">Sign In</button>

          </form>
        <div>
          <GoogleButton
            type="dark"
            onClick={ handleGoogleSignIn }
          />
        </div>

        <br/>
        
          <p className="sign-in-link">Dont have an account? 
          <Link to="/sapsp"> Sign Up </Link>
          </p>
      
      </div>
    </div>
  );
}

export default SAPSI;