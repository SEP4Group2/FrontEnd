import React, { useState, useCallback } from "react";
import "./Navbar.css";
import Image from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import UserMenu from "../UserMenu/usermenu.js";
import NotificationIcon from "../Notifications/NotificationIcon.js";
import WebSocketHandler from "../Notifications/WebSocketHandler";

const Navbar = ({ isAuthenticated, setToken, setUser, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationReceived = (notification) => {
    console.log("navbar msgs ID: ", notification.id);

    setNotificationData((prevNotifications) => {
      const isNotificationExist = prevNotifications.some(
        (existingNotification) =>
          existingNotification.id === notification.id &&
          existingNotification.message === notification.message
      );
      // If the notification doesn't exist, add it to the array
      if (!isNotificationExist) {
        setNotificationCount((prevCount) => prevCount + 1);
        return [...prevNotifications, notification];
      }
      //needed to add return bc the notificationdata wasn't updating fast enough for other msgs, so get updated version by return
      // If the notification already exists, return the current state
      return prevNotifications;
    });
  };

  const handleLogout = useCallback(() => {
    setNotificationData([]);
    setNotificationCount(0);
    console.log("Logout triggered in Navbar");
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
        <WebSocketHandler
          userId={userId}
          onNotificationReceived={handleNotificationReceived}
          onLogout={handleLogout}
        />
        {!isAuthenticated && (
          <>
            <div className="logo">
              <img src={Image} alt="" className="logo-img" />
            </div>
            <div
              className="account-icon-not-logged-in"
              style={{ width: "40px", height: "40px" }}
            >
              <UserMenu
                isAuthenticated={isAuthenticated}
                setToken={setToken}
                setUser={setUser}
              />
            </div>
          </>
        )}

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/myPlants" className="my-plants-link" >
                  My Plants
                </Link>
              </li>
              <div className="logo">
                <img src={Image} alt="" className="logo-img" />
              </div>
              <li>
                <Link to="/analytics" className="analytics-link" >
                  Analytics
                </Link>
              </li>
              <div className="icons">
                <div className="notification-icon">
                  <NotificationIcon
                    notification={notificationData}
                    notificationCount={notificationCount}
                    onRemoveNotification={removeNotification}
                  />
                </div>
                <div
                  className="account-icon"
                  
                >
                  <UserMenu
                    isAuthenticated={isAuthenticated}
                    setToken={setToken}
                    setUser={setUser}
                    onLogout={handleLogout}
                  />
                </div>
              </div>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
