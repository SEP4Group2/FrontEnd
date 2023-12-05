import React, { useEffect, useRef } from 'react';
import { startConnection, subscribeToNotification, addToGroup, stopConnection } from './SignalRService';

const WebSocketHandler = ({ onNotificationReceived }) => {
  const isConnectionStarted = useRef(false);

  useEffect(() => {
    const userId = '1'; // Replace with the actual user ID

    const setupSignalR = async () => {
      try {
        await startConnection();
        console.log('WebSocket Connection Started!');
        await addToGroup(userId);

        const unsubscribe = subscribeToNotification((notification) => {
          onNotificationReceived(notification);
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

  }, [onNotificationReceived]);

  return null;
};

export default WebSocketHandler;