import * as signalR from '@microsoft/signalr';

const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl('ws://localhost:5016/notificationhub', { transport: signalR.HttpTransportType.WebSockets, skipNegotiation: true })
  .configureLogging(signalR.LogLevel.Debug)
  .build();

  const startConnection = async () => {
    try {
      if (hubConnection.state === signalR.HubConnectionState.Disconnected) {
        await hubConnection.start();
        console.log('SignalR Connected!');
        await manualNegotiation();
      }
    } catch (err) {
      console.error('Error while establishing SignalR connection:', err);
    }
  };
  

// Function to perform manual negotiation
const manualNegotiation = async () => {
  try {
    
    const protocolVersionMessage = '{"protocol":"json","version":1}';
    await hubConnection.send('Send', protocolVersionMessage);
    
  } catch (err) {
    console.error('Error during manual negotiation:', err);
  }
};

const subscribeToNotification = (callback) => {
  hubConnection.on('ReceiveNotification', (message) => {
    callback(message);
  });
};

const unsubscribeFromNotification = (callback) => {
  hubConnection.off('ReceiveNotification', callback);
};

const addToGroup = (userId) => {
  hubConnection.invoke('AddToGroup', userId).catch((err) => console.error(err));
};

const removeFromGroup = async(userId) => {
  try {
    await hubConnection.invoke('RemoveFromGroup', userId);
    console.log(`User ${userId} removed from the group successfully.`);
  } catch (err) {
    console.error('Error while removing:', err);
  }
  
};

const stopConnection = async () => {
  try {
    await hubConnection.stop();
    console.log('SignalR Connection Stopped!');
  } catch (err) {
    console.error('Error while stopping SignalR connection:', err);
  }
};

export { startConnection, subscribeToNotification, addToGroup, removeFromGroup, stopConnection, unsubscribeFromNotification };
