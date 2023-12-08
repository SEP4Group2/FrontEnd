// NotificationIcon.js
import React, { useState, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import NotificationComponent from './NotificationComponent';
import './NotificationIcon.css';
import CssBaseline from '@mui/material/CssBaseline';

const NotificationIcon = ({ notification, notificationCount, onRemoveNotification }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverCount, setPopoverCount] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverCount(notificationCount);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  useEffect(() => {
    if (open) {
      // Update the local count when the popover is open
      setPopoverCount(notificationCount);
    }
  }, [open, notificationCount]);


  return (
    <React.Fragment>
      <CssBaseline />
      <IconButton
        className="notification-icon"
        size="large"
        aria-label={`show ${notificationCount - popoverCount} new notifications`}
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={notificationCount - popoverCount} color="error">
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
          horizontal: 'left',
        }}
      >
        <NotificationComponent
          notifications={notification}
          onRemoveNotification={onRemoveNotification}
        />
      </Popover>
    </React.Fragment>
  );
};

export default NotificationIcon;