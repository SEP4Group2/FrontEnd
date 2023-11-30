// WebSocketHandler.js
import React, { useEffect, useState } from 'react';
import { startConnection, subscribeToNotification, addToGroup, stopConnection } from './SignalRService';

const WebSocketHandler = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userId = '1'; // Replace with the actual user ID or identifier

    const setupSignalR = async () => {
      await startConnection();
      await addToGroup(userId);

      const unsubscribe = subscribeToNotification((notification) => {
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
      });

      return () => {
        unsubscribe();
        stopConnection();
      };
    };

    setupSignalR();
  }, []);

  return notifications;
};

export default WebSocketHandler;