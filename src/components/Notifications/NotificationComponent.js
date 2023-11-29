import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import WebSocketHandler from './WebSocketHandler';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const messages = [
  {
    id: 1,
    primary: 'Brunch this week?',
    secondary: "Plant1",
  },
  {
    id: 2,
    primary: 'Birthday Gift',
  },
  {
    id: 3,
    primary: 'Another Gift',
  },
  {
    id: 4,
    primary: 'Birthday Gift',
  },
  {
    id: 5,
    primary: 'Recipe to try',
  }
];

const groupMessagesByDay = (messages) => {
  return messages.reduce((grouped, message) => {
    const key = message.id === 1 ? 'Today' : 'Yesterday';
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(message);
    return grouped;
  }, {});
};

const NotificationComponent = ({ notificationCount }) => {
  const notifications = WebSocketHandler();
  // here is the list of notifications
  const [messageList, setMessageList] = useState(messages);

  const handleRemoveMessage = (id) => {
    setMessageList((prevMessages) => prevMessages.filter((message) => message.id !== id));
  };

  const groupedMessages = groupMessagesByDay(messageList);

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px', maxHeight: '400px', minWidth: '250px', overflow: 'auto' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Notifications
        </Typography>
        <List sx={{ mb: 2 }}>
          {Object.entries(groupedMessages).map(([day, messagesForDay]) => (
            <React.Fragment key={day}>
              <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                {day}
              </ListSubheader>
              {messagesForDay.map(({ id, primary, secondary, person }) => (
                <ListItem key={id} button alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={person} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body1"
                          color="text.primary"
                        >
                          {primary}
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          sx={{ textTransform: 'none' }}
                        >
                          {secondary}
                        </Typography>
                      </React.Fragment>
                    }
                    secondaryTypographyProps={{ variant: "overline" }}
                  />
                  <IconButton edge="end" aria-label="close" size="small" onClick={() => handleRemoveMessage(id)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}

export default NotificationComponent;
