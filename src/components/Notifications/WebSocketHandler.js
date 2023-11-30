// WebSocketHandler.js
import React, { useEffect, useState } from 'react';
import { startConnection, subscribeToNotification, addToGroup, removeFromGroup, stopConnection } from './SignalRService';

const WebSocketHandler = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userId = 'userId'; // Replace with the actual user ID or identifier

    const setupSignalR = async () => {
      await startConnection();
      await addToGroup(userId);

      const unsubscribe = subscribeToNotification((notification) => {
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
      });

      return () => {
        unsubscribe();
        removeFromGroup(userId);
        stopConnection();
      };
    };

    setupSignalR();
  }, []);

  return notifications;
};

export default WebSocketHandler;
