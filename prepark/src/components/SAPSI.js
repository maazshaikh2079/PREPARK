import "./SAPSI.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";

function SocietyAutomationParkingAuthorization() {
  const [formData, setFormData] = useState({
    fullName: "",
    roomNo: "",
    email: "",
    vehicleNo: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
  };

  const handleSignInWithGoogle = () => {
    // Handle sign in with Google logic here
  };

  return (
    <div className="container">
      <div className="image1"></div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign In</button>
          <button type="submit">Sign In with Google</button>
        </form>
        <div className="google-buttons">
          <p className="sign-in-link">Dont have an account? 
          <Link to="/sapsp"> Sign Up </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SocietyAutomationParkingAuthorization;