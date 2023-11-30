// NotificationComponent.js
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import WebSocketHandler from './WebSocketHandler';

const NotificationComponent = () => {
  const notifications = WebSocketHandler();

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px', maxHeight: '400px', minWidth: '250px', overflow: 'auto' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Notifications
        </Typography>
        <List sx={{ mb: 2 }}>
          <ListSubheader sx={{ bgcolor: 'background.paper' }}>Today</ListSubheader>
          {notifications.map((notification, index) => (
            <Typography key={index} variant="body2" sx={{ p: 2 }}>
              {notification}
            </Typography>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
};

export default NotificationComponent;
