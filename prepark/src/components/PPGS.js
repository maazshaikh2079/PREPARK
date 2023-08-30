import "../App.css";
import "./PPGS.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase-config.js";
import { collection, addDoc } from "firebase/firestore";

function PPGS() {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Vehicle, setVehicle] = useState("");
  const [Email, setEmail] = useState("");
  
  const [error, setError] = useState("");
  const { googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const usersCollectionRef = collection(db, "Parking_Users");

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {

      if (Name !== "" && Phone !== "" && Vehicle !== "") {

      // Sign in with Google
      const user = await googleSignIn();

      // Check if the user closed the popup without signing in
      if (!user) {
        setError("Google sign-in popup was closed.");
        return;
      }

      // Update state with user's email
      setEmail(user.Email);

        // Add user data to Firebase Firestore
        await addDoc(usersCollectionRef, {
          Name: Name,
          Phone: Number(Phone),
          Email: Email, // Use the email from the user object
          Vehicle: Vehicle,
        });

        // Navigate to the desired page
        // navigate("/");
      } else {
        alert("Enter complete details!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleGoogleSignIn}>
          {error && <Alert variant="danger">{error}</Alert>}
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            onChange={(event) => {
              setName(event.target.value);
            }}
            required
          />
          <label htmlFor="phoneNo">Phone no.:</label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            required
          />

          <label htmlFor="vehicleNo">Vehicle No:</label>
          <input
            type="text"
            id="vehicleNo"
            name="vehicleNo"
            onChange={(event) => {
              setVehicle(event.target.value);
            }}
            required
          />

          <br />
          <div>
            <GoogleButton
              type="dark"
              onClick={handleGoogleSignIn}
            />
          </div>
          <br />
          <p className="sign-in-link">
            Already have an account? <Link to="/ppsi">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default PPGS;
