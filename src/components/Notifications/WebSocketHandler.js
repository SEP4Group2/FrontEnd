
import React, { useEffect, useRef } from 'react';
import { startConnection, subscribeToNotification, addToGroup, removeFromGroup, stopConnection } from './SignalRService';

const WebSocketHandler = ({ onNotificationReceived, userId, onLogout }) => {
  const isConnectionStarted = useRef(false);
  const user = String(userId);

  useEffect(() => {
    const setupSignalR = async () => {
      try {
        await startConnection();

        console.log('WebSocket Connection Started!');
        await addToGroup(user);

        const subscribe = subscribeToNotification((notification) => {
          console.log('Received notification in sockets:', notification);
          
         
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
    
  }, [onNotificationReceived, user]);

  useEffect(() => {
    console.log("before removing");
    if (onLogout) {
      console.log("removing is triggered");
      //removeFromGroup(user);
    }

  }, [onLogout, user]);

  return null;
};

export default WebSocketHandler;
