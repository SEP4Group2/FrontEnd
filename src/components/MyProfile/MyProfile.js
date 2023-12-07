// src/components/Profile.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MyProfile = ({user, setUser}) => {
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
    
      fetch(`http://localhost:5000/User`, {
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
      // Add logic here to delete the profile (e.g., make an API request to the server)
      console.log('Profile deleted');
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
    <div style={{ textAlign: 'center', marginLeft: '100px', marginTop: '80px' }}>
      <h1>My Profile</h1>
      <div style={{ width: '300px', margin: '0 auto', marginBottom: '16px' }}>
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
      <div style={{ marginLeft: '16px', marginTop: '16px' }}>
        <Button onClick={handleDelete} variant="contained" style={{ marginRight: '8px' }}>
          Delete
        </Button>
        {editMode && (
          <>
            <Button onClick={handleSave} variant="contained" style={{ marginRight: '8px' }} disabled={!unsavedChanges}>
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
    </div>
  );
};

export default MyProfile;
