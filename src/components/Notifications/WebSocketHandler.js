// WebSocketHandler.js
import React, { useEffect, useRef } from 'react';
import { startConnection, subscribeToNotification, addToGroup, stopConnection } from './SignalRService';

const WebSocketHandler = ({ onNotificationReceived, userId }) => {
  const isConnectionStarted = useRef(false);
  const useruser = String(userId);

  useEffect(() => {
    const setupSignalR = async () => {
      try {
        await startConnection();

        console.log('WebSocket Connection Started!');
        await addToGroup(useruser);

        const unsubscribe = subscribeToNotification((notification) => {
          console.log('Received notification in sockets:', notification);
          // Invoke the callback passed from Navbar
      if (typeof onNotificationReceived === 'function') {
        onNotificationReceived(notification);
      }
    });
          

        return () => {
          unsubscribe();
          // Commenting out stopConnection to prevent stopping the connection
          // stopConnection();
          console.log('WebSocket Connection Stopped!');
        };
      } catch (error) {
        console.error('Error setting up SignalR:', error);
      }
    };

    // Check if the connection is not already started
    if (!isConnectionStarted.current) {
      setupSignalR();
      isConnectionStarted.current = true;
    }
  }, [onNotificationReceived, useruser]);

  return null;
};

export default WebSocketHandler;
