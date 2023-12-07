// Navbar.js
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Image from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import UserMenu from "../UserMenu/usermenu.js";
import NotificationIcon from "../Notifications/NotificationIcon.js";
import WebSocketHandler from '../Notifications/WebSocketHandler';

const Navbar = ({ isAuthenticated, setToken, setUser, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationReceived = (notification) => {
    // Retrieve existing notifications from localStorage
    const userNotifications = JSON.parse(localStorage.getItem(`user_${userId}_notifications`)) || [];
    console.log(`user_${userId}_notifications`);
    // Merge new notification with existing ones
    const updatedNotifications = [...userNotifications, notification];

    // Update localStorage
    localStorage.setItem(`user_${userId}_notifications`, JSON.stringify(updatedNotifications));

    // Increment the count without resetting to 0
    setNotificationCount((prevCount) => prevCount + 1);
    console.log(notification);
  };

  const removeNotification = (index) => {
    // Retrieve existing notifications from localStorage
    const userNotifications = JSON.parse(localStorage.getItem(`user_${userId}_notifications`)) || [];

    // Remove the notification at the specified index
    const updatedNotifications = [
      ...userNotifications.slice(0, index),
      ...userNotifications.slice(index + 1),
    ];

    // Update localStorage
    localStorage.setItem(`user_${userId}_notifications`, JSON.stringify(updatedNotifications));

    // Decrement the count
    setNotificationCount((prevCount) => prevCount - 1);
  };

  const handleLogout = () => {
    // Clear notifications for the user on logout
    localStorage.removeItem(`user_${userId}_notifications`);

    console.log('Logout triggered in Navbar');
  };

  // Load user-specific notifications from localStorage on component mount
  useEffect(() => {
    const userNotifications = JSON.parse(localStorage.getItem(`user_${userId}_notifications`)) || [];
    setNotificationCount(userNotifications.length);
  }, [userId]);
  
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
              <UserMenu isAuthenticated={isAuthenticated} setToken={setToken} setUser={setUser} onLogout={handleLogout}/>
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
                <WebSocketHandler userId={userId} onNotificationReceived={handleNotificationReceived} onLogout={handleLogout}/>
                
                <NotificationIcon notification={ JSON.parse(localStorage.getItem(`user_${userId}_notifications`)) || []} notificationCount={notificationCount} onRemoveNotification={removeNotification}/>
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
