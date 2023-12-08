
import React, { useEffect, useRef } from 'react';
import { startConnection, subscribeToNotification, addToGroup, removeFromGroup, stopConnection } from './SignalRService';

const WebSocketHandler = ({ onNotificationReceived, userId }) => {
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
    const handleUser = async () => {
      console.log(user);
      if (user === "undefined") {
        if (isConnectionStarted.current) {
          try {
            await removeFromGroup(localStorage.getItem("NotificationID"));
            await stopConnection();
            isConnectionStarted.current = false;
            localStorage.removeItem("NotificationID");
          } catch (error) {
            console.error('Error during removeFromGroup or stopConnection:', error);
          }
        }
      } else {
        // Check if the connection is not already started
        if (!isConnectionStarted.current) {
          setupSignalR();
          isConnectionStarted.current = true;
          localStorage.setItem("NotificationID", user);
        }
      }
    };
    
    handleUser();
    
  }, [onNotificationReceived, user]);

  return null;
};

export default WebSocketHandler;
