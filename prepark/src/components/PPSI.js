import "./PPSI.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";

function PPASP() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    vehicleNo: "",
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
        </form>
        <div className="google-buttons">
          <button className="google-button" onClick={handleSignInWithGoogle}>
            Sign In with Google
          </button>
          <p className="sign-in-link">Create an account  
          <Link to="/ppsp"> Sign Up </Link>
          </p>
        </div>
      </div>
      <div className="imageppa-container"></div>
    </div>
  );
}

export default PPASP;