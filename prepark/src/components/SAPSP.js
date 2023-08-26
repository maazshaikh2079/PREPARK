import "./SAPSP.css";
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
      <div className="image"></div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label htmlFor="phoneNo">Phone no.:</label>
          <input
            type="number"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />

          <label htmlFor="roomNo">Room No:</label>
          <input
            type="text"
            id="roomNo"
            name="roomNo"
            value={formData.roomNo}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="vehicleNo">Vehicle No:</label>
          <input
            type="text"
            id="vehicleNo"
            name="vehicleNo"
            value={formData.vehicleNo}
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

          <button type="submit">Sign Up</button>
        </form>
        <div className="google-buttons">
          <button className="google-button" onClick={handleSignInWithGoogle}>
            Sign In with Google
          </button>
          <p className="sign-in-link">Already have an account? 
          <Link to="/sapsi">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SocietyAutomationParkingAuthorization;