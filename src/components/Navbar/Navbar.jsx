import React, { useState } from "react";
import "./Navbar.css";
import Image from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import UserMenu from "../UserMenu/usermenu.js";
import NotificationIcon from "../Notifications/NotificationIcon.js";
import WebSocketHandler from '../Notifications/WebSocketHandler';

const Navbar = ({ isAuthenticated, setToken, setUser, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationData, setNotificationData] = useState(null);

  console.log("navbar   " + userId);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleNotificationReceived = (notification) => {
    console.log("navbar  " + notification);
    setNotificationData(notification);
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

        {!isAuthenticated && (
          <>
            <div className="logo">
              <img src={Image} alt="" className="logo-img" />
            </div>
            <div
              className="account-icon-not-logged-in"
              style={{ width: "40px", height: "40px" }}
            >
              <UserMenu isAuthenticated={isAuthenticated} setToken={setToken} setUser={setUser} />
              
            </div>
          </>
        )}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/myPlants" style={{ marginRight: "15%" }}>
                  My Plants
                </Link>
              </li>
              <div className="logo">
                <img src={Image} alt="" className="logo-img" />
              </div>
              <li>
                <Link to="/analytics" style={{ marginLeft: "15%" }}>
                  Analytics
                </Link>
              </li>
              <li>
              <WebSocketHandler userId={userId} onNotificationReceived={handleNotificationReceived}/>
                <NotificationIcon notification={notificationData}/>
              </li>
              <div
                className="account-icon"
                style={{ width: "40px", height: "40px" }}
              >
                <UserMenu isAuthenticated={isAuthenticated} setToken={setToken} setUser={setUser} />
              </div>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
