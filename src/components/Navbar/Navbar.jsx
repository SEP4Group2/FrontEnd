import React, { useState } from 'react';
import './Navbar.css';
import Image from "../../assets/logo.jpg";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="/newPlant">New Plant</Link>
          </li>
          <li>
            <Link to="/myPlants">My Plants</Link>
          </li>
          <div className="logo">
          <img src={Image} alt="" className="logo-img" />
        </div>
          <li>
            <a href="/contact">Analytics</a>
          </li>
          <li>
            <a href="/contact">My Profile</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
