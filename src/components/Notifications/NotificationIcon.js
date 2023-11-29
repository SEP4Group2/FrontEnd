// NotificationIcon.js
import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import NotificationComponent from './NotificationComponent';
import './NotificationIcon.css'
import CssBaseline from '@mui/material/CssBaseline';

const NotificationIcon = ({ initialNotificationCount = 1 }) => {
  const [notificationCount, setNotificationCount] = useState(initialNotificationCount);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setNotificationCount(0);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    
    <React.Fragment>
      <CssBaseline />
      <IconButton
        className="notification-icon"
        size="large"
        aria-label={`show ${notificationCount} new notifications`}
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={notificationCount} color="error">
          <NotificationsIcon style={{ width: '40px', height: '40px' }} />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <NotificationComponent notificationCount={notificationCount} />
      </Popover>
    
    </React.Fragment>
  );
};

export default NotificationIcon;
