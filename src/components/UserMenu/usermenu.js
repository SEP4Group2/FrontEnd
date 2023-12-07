import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link, useNavigate } from 'react-router-dom';

const UserMenu = ({ isAuthenticated, setToken, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    setUser({})

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Perform logout logic, and then redirect to the home page
    navigate('/');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <AccountCircleIcon
            {...bindTrigger(popupState)}
            style={{ fontSize: 40, cursor: 'pointer'}}
          />
          <Menu {...bindMenu(popupState)}>
            {isAuthenticated ? (
              <div>
                <MenuItem component={Link} to="/myProfile" onClick={popupState.close}>
                  My Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem onClick={handleRegisterClick}>Register</MenuItem>
                <MenuItem component={Link} to="/login" onClick={popupState.close}>
                  Login
                </MenuItem>
              </div>
            )}
          </Menu>
        </>
      )}
    </PopupState>
  );
};

export default UserMenu;

