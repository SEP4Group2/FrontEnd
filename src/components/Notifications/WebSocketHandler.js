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
          
          // Add a unique identifier to the notification
          const notificationWithId = { message: notification, id: Date.now().toString() };
          onNotificationReceived(notificationWithId);
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
