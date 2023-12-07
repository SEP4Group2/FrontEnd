import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const NotificationComponent = ({ notification }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log("DAmnnn"+notification)
    if (notification) {
      // Add the new notification to the state
      console.log(notification);
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    }
  }, [notification]);

  const handleRemoveMessage = (index) => {
    setNotifications((prevMessages) => {
      // Remove the notification at the specified index
      const updatedMessages = prevMessages.filter((_, i) => i !== index);
      return updatedMessages;
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px', minHeight: '300px', minWidth: '300px', maxWidth: '300px', overflow: 'auto' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Notifications
        </Typography>
        <List sx={{ mb: 2 }}>
          <ListSubheader sx={{ bgcolor: 'background.paper' }}>Today</ListSubheader>
          {notifications.map((notification, index) => (
            <ListItem key={index} button>
              <ListItemText
                primary={
                  <Typography
                    component="span"
                    variant="body1"
                    color="text.primary"
                    sx={{ wordWrap: 'break-word' }}
                  >
                    {notification}
                  </Typography>
                }
              />
              <IconButton edge="end" aria-label="close" size="small" onClick={() => handleRemoveMessage(index)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
};

export default NotificationComponent;