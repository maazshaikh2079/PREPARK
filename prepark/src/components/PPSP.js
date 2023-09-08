import "./PPSP.css";
import "../App.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { sendEmailVerification, deleteUser } from "firebase/auth";
import { auth } from "../firebase-config.js";
import { useUserAuth } from "../context/UserAuthContext";


import { db } from "../firebase-config.js";
import { 
  collection, 
  getDocs,   // R
  addDoc,    // C
  updateDoc, // U
  doc,       // U
  deleteDoc  // D
} from "firebase/firestore";

function PPASP() {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState(0);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Vehicle, setVehicle] = useState("");
  const [Slot, setSlot] = useState("");

  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  // const { verifyEmail } = useUserAuth();
  const { logIn, googleSignIn } = useUserAuth();
  // const { user, logOut } = useUserAuth();
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const usersCollectionRef = collection(db, "Parking_Users");

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  try {
    if (Name !== "" && Phone !== 0 && Email !== "" && Password !== "" && Vehicle !== "") {
      // Step 1: Sign up the user
      await signUp(Email, Password);

      // Step 2: Send email verification
      await sendEmailVerification(auth.currentUser);

      // Step 3: Wait for email verification
      const isEmailVerified = await waitForEmailVerification();

      if (isEmailVerified) {
        // Step 4: Email is verified, store data in the database
        await addDoc(usersCollectionRef, {
          Name: Name,
          Phone: Number(Phone),
          Email: Email,
          Vehicle: Vehicle
        });

        navigate("/");
      } else {
        // Step 5: Email not verified, delete the signed-up user
        await deleteUser(auth.currentUser);

        alert("Email verification link expired. Please sign up again.");
      }
    } else {
      alert("Enter complete details!");
    }
  } catch (err) {
    setError(err.message);
  }
};

// Function to wait for email verification within a timeout period
const waitForEmailVerification = async () => {
  let timeout = 60 * 1000; // 60 seconds, adjust as needed
  const user = auth.currentUser;

  while (timeout > 0) {
    await user.reload(); // Refresh user data
    if (user.emailVerified) {
      return true; // Email is verified
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
    timeout -= 1000;
  }

  return false; // Email verification link expired
};

  return (
    <div className="container">
      <div className="form">
      {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            //value={formData.fullName}
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
            // value={formData.phoneNo}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            //value={formData.email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            //value={formData.password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />

          <label htmlFor="vehicleNo">Vehicle No:</label>
          <input
            type="text"
            id="vehicleNo"
            name="vehicleNo"
            //value={formData.vehicleNo}
            onChange={(event) => {
              setVehicle(event.target.value);
            }}
            required
          />
          
          <br/>
          <button type="submit">Sign Up</button>
        </form>
        
        <br/>
        <p className="sign-in-link">Already have an account? `
         <Link to="/ppsi">Sign in</Link>`
        </p> 
      </div>
      <div className="imageppa-container"></div>
    </div>  
  );
}

export default PPASP;
