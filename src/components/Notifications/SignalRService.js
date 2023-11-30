// signalrService.js
import * as signalR from '@microsoft/signalr';

const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl('https://localhost:5016//notificationhub') // Replace with your SignalR hub URL
  .build();

const startConnection = async () => {
  try {
    await hubConnection.start();
    console.log('SignalR Connected!');
  } catch (err) {
    console.error('Error while establishing SignalR connection:', err);
  }
};

const subscribeToNotification = (callback) => {
  // Subscribe to ReceiveNotification event
  hubConnection.on('ReceiveNotification', (message) => {
    callback(message);
  });
};

const addToGroup = (userId) => {
  // Call the AddToGroup method when the user connects
  hubConnection.invoke('AddToGroup', userId).catch((err) => console.error(err));
};

const removeFromGroup = (userId) => {
  // Call the RemoveFromGroup method when the user disconnects
  hubConnection.invoke('RemoveFromGroup', userId).catch((err) => console.error(err));
};

const stopConnection = async () => {
  try {
    await hubConnection.stop();
    console.log('SignalR Connection Stopped!');
  } catch (err) {
    console.error('Error while stopping SignalR connection:', err);
  }
};

export { startConnection, subscribeToNotification, addToGroup, removeFromGroup, stopConnection };
