// WebSocketHandler.js
import React, { useEffect, useRef } from 'react';
import { startConnection, subscribeToNotification, addToGroup, removeFromGroup, stopConnection } from './SignalRService';

const WebSocketHandler = ({ onNotificationReceived, userId, onLogout }) => {
  const isConnectionStarted = useRef(false);
  const useruser = String(userId);

  useEffect(() => {
    const setupSignalR = async () => {
      try {
        await startConnection();

        console.log('WebSocket Connection Started!');
        await addToGroup(useruser);

        const subscribe = subscribeToNotification((notification) => {
          console.log('Received notification in sockets:', notification);
          
          // Add a unique identifier to the notification
          const notificationWithId = { notification };
          onNotificationReceived(notificationWithId);
        });

        return () => {
          subscribe();
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


  useEffect(() => {
    
    return () => {
      //removeFromGroup(useruser);
      //stopConnection();
    };
  }, [onLogout, useruser]);

  return null;
};

export default WebSocketHandler;
