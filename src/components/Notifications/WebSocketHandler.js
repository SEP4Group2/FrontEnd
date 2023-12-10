import React, { useEffect, useRef } from 'react';
import { startConnection, subscribeToNotification, addToGroup, removeFromGroup, stopConnection, unsubscribeFromNotification } from './SignalRService';

const WebSocketHandler = ({ onNotificationReceived, userId }) => {
  const isConnectionStarted = useRef(false);
  const user = String(userId);
  const handleNotificationRef = useRef(null);

  useEffect(() => {
    const setupSignalR = async () => {
      try {
        await startConnection();

        console.log('WebSocket Connection Started!');
        await addToGroup(user);

        const handleNotification = (notification) => {
          
          const isoTimestamp = new Date().toISOString();
          const timestampInSeconds = isoTimestamp.slice(0, -5) + '.000Z';
        
          const notificationWithId = { message: notification, id: timestampInSeconds };
          console.log('Received notification in sockets:', notification, ", ID: ", notificationWithId.id);
          onNotificationReceived(notificationWithId);
        };

        // Subscribe to notifications
        subscribeToNotification(handleNotification);
        handleNotificationRef.current = handleNotification;
        return () => {
          unsubscribeFromNotification(handleNotificationRef.current);
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
            unsubscribeFromNotification(handleNotificationRef.current);
            handleNotificationRef.current = null;
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
