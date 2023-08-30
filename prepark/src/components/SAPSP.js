import "./SAPSP.css";
import "../App.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
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
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();


  const usersCollectionRef = collection(db, "Residents");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
        if (Name!=="" && Phone!==0 && Room!==0 && Email!=="" && Password!=="" && Vehicle!=="") {
          await signUp(Email, Password);
          navigate("/");
          await addDoc(usersCollectionRef, { 

              Name: Name, 
              Room: Room,
              Phone: Number(Phone), 
              Email: Email, 
              Vehicle: Vehicle
            
          });
        }
        else {
          alert("Enter complete details!");
        }
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
      <div className="image"></div>
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
            type="number"
            id="phoneNo"
            name="phoneNo"
            // value={formData.phoneNo}
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
           // value={formData.phoneNo}
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

         {/* <br/> */}
          <button type="submit">Sign Up</button>
        </form>

        <div>
          <GoogleButton
            type="dark"
            onClick={ handleGoogleSignIn }
          />
        </div>

        {/* <br/> */}
        <p className="sign-in-link">Already have an account? 
        <Link to="/sapsi">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SAPSP;