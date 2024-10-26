import "./SAPSP.css";
import "../App.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { sendEmailVerification, deleteUser } from "firebase/auth";
import { useUserAuth } from "../contexts/UserAuthContext-SAP";
import { authSAP } from "../configurations/firebase-config-SAP";
import { dbSAP } from "../configurations/firebase-config-SAP";
import { 
  collection, 
  getDocs,   // R
  addDoc,    // C
  updateDoc, // U
  doc,       // U
  deleteDoc  // D
} from "firebase/firestore";

function SAPSP() {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState(0);
  const [Room, setRoom] = useState(0);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Vehicle, setVehicle] = useState("");
  const [Slot, setSlot] = useState("");

  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();


  const rColRef = collection(dbSAP, "Residents");
  const lpColRef = collection(dbSAP, "License_Plates");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
        if (Name!=="" && Phone!==0 && Room!==0 && Email!=="" && Password!=="" && Vehicle!=="") {
          // Step 1: Sign up the user
          await signUp(Email, Password);

          // Step 2: Send email verification
          await sendEmailVerification(authSAP.currentUser);

          alert("Email verification link sent.");

          // Step 3: Wait for email verification
          const isEmailVerified = await waitForEmailVerification();

          if (isEmailVerified) {
            // Step 4: Email is verified, store data in the database
            await addDoc(rColRef, {
              Name: Name,
              Room: Room,
              Phone: Number(Phone),
              Email: Email,
              Vehicle: Vehicle
            });
            await addDoc(lpColRef, {
              Plate: Vehicle
            });
            alert("Registration completed.\nLogin to proceed.");
            navigate("/sapsi");
          } else {
            // Step 5: Email not verified, delete the signed-up user
            await deleteUser(authSAP.currentUser);
    
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
    const user = authSAP.currentUser;

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
    <div>
      <div className="image"></div>
      <div className="form">
       {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit}>
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
            type="number"
            id="phoneNo"
            name="phoneNo"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            required
          />
          <label htmlFor="roomNo">Room no.:</label>
          <input
            type="text"
            id="roomNo"
            name="roomNo"
           onChange={(event) => {
            setRoom(event.target.value);
          }}
            required
          />
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            name="email"
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

          <label htmlFor="vehicleNo">Vehicle no.:</label>
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
        <p className="sign-in-link">Already have an account? `<Link to="/sapsi">Sign In</Link>`
        </p>
      </div>
    </div>
  );
}

export default SAPSP;