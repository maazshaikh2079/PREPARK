// Commited 

import "./Homepage.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import SoceityAutomationParkingimage from "./assets/images/SocietyAutomationParking.jpg";
import PublicParkingimage from "./assets/images/PublicParking.jpeg";
import Collaborator1Image from "./assets/images/PublicParking.jpeg";
import Collaborator2Image from "./assets/images/PublicParking.jpeg";
import Collaborator3Image from "./assets/images/PublicParking.jpeg";


function Homepage() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const handleButtonHover = (index) => {
    setHoveredButton(index);
  };

  const handleButtonLeave = () => {
    setHoveredButton(null);
  };

  return (
    <div>
      <div
        className={`homepage-container ${
          hoveredButton !== null ? "hovered" : ""
        }`}
      >
        <h1 className="homepage-text">PREPARK</h1>
      </div>
      <div className="button-container">
        {/* Button 1 */}
        <div className="button-container">
        
          {/* <img src={SoceityAutomationParkingimage} alt="Button 1" /> */}
          <span className="button-text">
            <Link to="/sapsi"  className="custom-link" >Society Automation Parking</Link>
            </span>
        </div>

        {/* Button 2 */}
        <div className="button-container">
          {/* <img src={PublicParkingimage} alt="Button 2" className="custom-image"/> */}
          <span className="button-text">
          <Link to="/ppsi"  className="custom-link" >Public Parking</Link>
          </span>
        </div>
      </div>

      <div className="collaborators-container">
        {/* Collaborator 1 */}
        <div className="collaborator">
          <div className="circle">
            <img src={Collaborator1Image} alt="Collaborator 1" />
          </div>
          <p>Collaborator 1</p>
          <p className="description">Description of Collaborator 1</p>
          <p className="learn-more">
            <a
              href="https://collaborator1-link.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </p>
        </div>

        {/* Collaborator 2 */}
        <div className="collaborator">
          <div className="circle">
            <img src={Collaborator2Image} alt="Collaborator 2" />
          </div>
          <p>Collaborator 2</p>
          <p className="description">Description of Collaborator 2</p>
          <p className="learn-more">
            <a
              href="https://collaborator2-link.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </p>
        </div>

        {/* Collaborator 3 */}
        <div className="collaborator">
          <div className="circle">
            <img src={Collaborator3Image} alt="Collaborator 3" />
          </div>
          <p>Collaborator 3</p>
          <p className="description">Description of Collaborator 3</p>
          <p className="learn-more">
            <a
              href="https://collaborator3-link.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;