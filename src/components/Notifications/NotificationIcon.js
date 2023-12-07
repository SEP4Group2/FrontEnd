// NotificationIcon.js
import React, { useState, useEffect } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import NotificationComponent from './NotificationComponent';
import './NotificationIcon.css';
import CssBaseline from '@mui/material/CssBaseline';

const NotificationIcon = ({notification}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  useEffect(() => {
    // Log the received notification
    console.log('Received notification in NotificationIcon:', notification);
  }, [notification]);

  return (
    <React.Fragment>
      <CssBaseline />
      <IconButton
        className="notification-icon"
        size="large"
        aria-label={`show ${0} new notifications`}
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={0} color="error">
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
        <NotificationComponent notification={notification}/>
      </Popover>
    </React.Fragment>
  );
};

export default NotificationIcon;
