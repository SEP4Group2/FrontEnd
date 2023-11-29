import { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const WebSocketHandler = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Create a SignalR connection
    const connection = new HubConnectionBuilder()
      .withUrl('https://your-signalr-hub-url') // Replace with your SignalR hub URL
      .build();

    // Start the connection
    async function startConnection() {
      try {
        await connection.start();
        console.log('SignalR Connected!');
      } catch (err) {
        console.error('Error connecting to SignalR:', err);
      }
    }

    // Listen for messages from the server
    connection.on('ReceiveNotification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    // Start the SignalR connection
    startConnection();

    // Cleanup on component unmount
    return () => {
      // Stop the SignalR connection
      connection.stop();
    };
  }, []); // The empty dependency array ensures this effect runs once on mount

  return notifications;
};

export default WebSocketHandler;
