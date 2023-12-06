// src/components/Profile.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const MyProfile = ({user}) => () => {
  const [editMode, setEditMode] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [userData, setUserData] = useState();
  setUserData(user);

  const handleEdit = () => {
    setEditMode(true);
  };


  const handleSave = () => {
    // Add logic here to save changes (e.g., make an API request to update the profile)
    console.log('Changes saved:', userData);
    setUnsavedChanges(false);
    setEditMode(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your profile?');

    if (confirmDelete) {
      // Add logic here to delete the profile (e.g., make an API request to the server)
      console.log('Profile deleted');
    }
  };

  const handleCancel = () => {
    setUserData(initialUserData);
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
          label="Email"
          type="email"
          name="email"
          value={userData.email}
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
      <div style={{ textAlign: 'left', marginLeft: '16px', marginTop: '16px' }}>
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
