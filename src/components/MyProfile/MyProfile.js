// src/components/Profile.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {Grid} from '@mui/material';

const MyProfile = ({ user, setUser, setToken }) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [userData, setUserData] = useState(user);

  const handleEdit = () => {
    setEditMode(true);
  };


  const handleSave = () => {
    const userPatchData = {
      userId: userData.userId, // Replace 0 with the actual user ID you want to update
      username: userData.username, // Replace "string" with the actual username
      password: userData.password // Replace "string" with the actual password
    };

    fetch(`http://127.0.0.1/5000/User`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userPatchData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setUser(userData)
        return response.json();
      })
      .then(() => {
        setUnsavedChanges(false);
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your profile?');

    if (confirmDelete) {
      fetch(`http://127.0.0.1/5000/User/${userData.userId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          setToken("");
          setUser({})

          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // Perform logout logic, and then redirect to the home page
          navigate('/');
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    }
  };

  const handleCancel = () => {
    setUserData(user);
    setEditMode(false);
    setUnsavedChanges(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUnsavedChanges(true);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '80px' }}>
    <Grid item xs={12}>
      <h1 style={{ textAlign: 'center' }}>My Profile</h1>
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div style={{ margin: '0 auto', marginBottom: '16px' }}>
        <TextField
          required={editMode}
          label="Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          disabled={!editMode}
          fullWidth
          margin="normal"
        />
        <TextField
          required={editMode}
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          disabled={!editMode}
          fullWidth
          margin="normal"
        />
      </div>
    </Grid>
    <Grid item xs={12}>
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Button onClick={handleDelete} variant="contained" style={{ marginRight: '8px' }}>
          Delete
        </Button>
        {editMode && (
          <>
            <Button
              onClick={handleSave}
              variant="contained"
              style={{ marginRight: '8px' }}
              disabled={!unsavedChanges}
            >
              Save
            </Button>
            <Button onClick={handleCancel} variant="contained">
              Cancel
            </Button>
          </>
        )}
        {!editMode && (
          <Button onClick={handleEdit} variant="contained">
            Edit
          </Button>
        )}
      </div>
    </Grid>
  </Grid>
  );
};

export default MyProfile;
