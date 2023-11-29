import { useEffect, useState } from 'react';

const WebSocketHandler = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Establish a WebSocket connection
    const socket = new WebSocket('ws://localhost:8080/?topic=User1');

    // Connection opened
    socket.addEventListener('open', (event) => {
      console.log('WebSocket connected');
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    });

    // Connection closed
    socket.addEventListener('close', (event) => {
      console.log('WebSocket closed');
    });

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []); // The empty dependency array ensures this effect runs once on mount

  return notifications;
};

export default WebSocketHandler;
