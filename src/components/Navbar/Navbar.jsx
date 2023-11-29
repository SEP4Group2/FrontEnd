// Navbar.js
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Image from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import UserMenu from "../UserMenu/usermenu.js";

const Navbar = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("isAuthenticated in Navbar:", isAuthenticated);
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div
          className={`menu-icon ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <div className="logo">
          <img src={Image} alt="" className="logo-img" />
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/myPlants">My Plants</Link>
              </li>
              <li>
                <Link to="/analytics">Analytics</Link>
              </li>
            </>
          )}
        </ul>
        <div className="account-icon" style={{ position: "fixed" }}>  
          <UserMenu isAuthenticated={isAuthenticated} />
          </div>
      </div>
    </nav>
  );
};

export default Navbar;



