

// Navbar.js
import React, { useState, useCallback } from "react";
import "./Navbar.css";
import Image from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import UserMenu from "../UserMenu/usermenu.js";
import NotificationIcon from "../Notifications/NotificationIcon.js";
import WebSocketHandler from '../Notifications/WebSocketHandler';

const Navbar = ({ isAuthenticated, setToken, setUser, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationReceived = (notification) => {
    setNotificationData((prevNotifications) => [...prevNotifications, notification]);
    
    setNotificationCount((prevCount) => prevCount + 1);
  };
  const handleLogout = useCallback(() => {
    setNotificationData([]);
    console.log('Logout triggered in Navbar');
  }, []);

  const removeNotification = (index) => {
    
    setNotificationData((prevNotifications) => [
      ...prevNotifications.slice(0, index),
      ...prevNotifications.slice(index + 1),
    ]);
    
    setNotificationCount((prevCount) => prevCount - 1);
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
        {isAuthenticated &&(
        <WebSocketHandler userId={userId} onNotificationReceived={handleNotificationReceived} onLogout={handleLogout}/>)}
        {!isAuthenticated && (
          
          <>
          
            <div className="logo">
              <img src={Image} alt="" className="logo-img" />
            </div>
            <div
              className="account-icon-not-logged-in"
              style={{ width: "40px", height: "40px" }}
            >
              <UserMenu isAuthenticated={isAuthenticated} setToken={setToken} setUser={setUser}/>
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
                
                <NotificationIcon notification={notificationData} notificationCount={notificationCount} onRemoveNotification={removeNotification}/>
              </li>
              <div
                className="account-icon"
                style={{ width: "40px", height: "40px" }}
              >
                
                <UserMenu isAuthenticated={isAuthenticated} setToken={setToken} setUser={setUser} onLogout={handleLogout}/>
                
              </div>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
