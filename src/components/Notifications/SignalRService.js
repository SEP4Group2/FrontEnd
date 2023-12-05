
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

    
    const addToGroupMessage = '{"arguments":["1"],"target":"AddToGroup","type":1}';
    await hubConnection.send('Send', addToGroupMessage);

    
  } catch (err) {
    console.error('Error during manual negotiation:', err);
  }
};

const subscribeToNotification = (callback) => {
  hubConnection.on('ReceiveNotification', (message) => {
    callback(message);
  });
};

const addToGroup = (userId) => {
  hubConnection.invoke('AddToGroup', userId).catch((err) => console.error(err));
};

const removeFromGroup = (userId) => {
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
