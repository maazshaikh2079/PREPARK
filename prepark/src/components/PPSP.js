import "./PPSP.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    vehicleNo: "",
  });

  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState(0);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Vehicle, setVehicle] = useState("");
  const [Slot, setSlot] = useState("");

  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  // const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "Parking_Users");

  const registerUser = async () => {
    if (Name!=="" && Phone!==0 && Email!=="" && Password!=="" && Vehicle!=="") {
      await addDoc(usersCollectionRef, { 
        
          Name: Name, 
          Phone: Number(Phone), 
          Email: Email, 
          Vehicle: Vehicle
        
      });
    }
    else {
      alert("Enter complete details!");
    }
}

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  try {
      await signUp(Email, Password);
      navigate("/");
  } catch(err) {
      setError(err.message);
  } 
};

  const handleSignInWithGoogle = () => {
    // Handle sign in with Google logic here
  };

  return (
    <div className="container">
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

          <button type="submit" onClick={registerUser}>Sign Up</button>
        </form>
        <div className="google-buttons">
          <button className="google-button" onClick={handleSignInWithGoogle}>
            Sign In with Google
          </button>
          <p className="sign-in-link">Already have an account? 
          <Link to="/ppsi">Sign in</Link>
          </p>
        </div>
      </div>
      <div className="imageppa-container"></div>
    </div>
  );
}

export default PPASP;