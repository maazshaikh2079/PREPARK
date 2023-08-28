import "./SAPSP.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from 'react';
import { db } from "../firebase-config.js";
import { 
  collection, 
  getDocs,   // R
  addDoc,    // C
  updateDoc, // U
  doc,       // U
  deleteDoc  // D
} from "firebase/firestore";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";

function SAPSP() {
  const [formData, setFormData] = useState({
    fullName: "",
    roomNo: "",
    email: "",
    vehicleNo: "",
    password: "",
  });

  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState(0);
  const [Room, setRoom] = useState(0);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Vehicle, setVehicle] = useState("");
  const [Slot, setSlot] = useState("");

  // const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "Residents");

  const registerResident = async () => {
    if (Name!=="" && Phone!==0 && Room!==0 && Email!=="" && Password!=="" && Vehicle!=="") {
      await addDoc(usersCollectionRef, { 

          Name: Name, 
          Phone: Number(Phone),
          Room: Room, 
          Email: Email, 
          Vehicle: Vehicle
        
      });
    }
    else {
      alert("Enter complete details!");
    }
  }

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
        <button type="submit" onClick={registerResident}>Sign Up</button>
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

export default SAPSP;