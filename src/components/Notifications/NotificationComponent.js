import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';

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
    id: 2,
    primary: 'Birthday Gift',
  },
  {
    id: 2,
    primary: 'Birthday Gift',
  },
  {
    id: 3,
    primary: 'Recipe to try',
  }
];

const NotificationComponent = ({ notificationCount }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px', maxHeight: '400px', overflow: 'auto' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Notifications
        </Typography>
        <List sx={{ mb: 2 }}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Today
                </ListSubheader>
              )}

              {id === 3 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Yesterday
                </ListSubheader>
              )}

              <ListItem button alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText
  primary={
    <React.Fragment>
      <Typography
        sx={{ display: 'inline' }}
        component="span"
        variant="body1" // Change the variant as needed
        color="text.primary"
      >
        {primary}
      </Typography>
    </React.Fragment>
  }
  secondary={
    <React.Fragment>
      <Typography
      component="div"
        sx={{ display: 'inline' }}
        
        variant="body2"
        color="text.secondary"
      >
        {secondary}
      </Typography>
      
    </React.Fragment>
  }
/>

              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}

export default NotificationComponent;
