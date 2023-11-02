// PlantList.js
import React, { useState, useEffect } from 'react';
import PlantStatus from './PlantStatus';
import axios from 'axios';

function PlantList() {
  const [plants, setPlants] = useState([]);
  const [newPlantName, setNewPlantName] = useState('');
  const [newPlantLocation, setNewPlantLocation] = useState('');
  const [newPresetId, setNewPresetId] = useState('');

  // Function to send a POST request to the server and create a new plant
  const createNewPlant = async () => {
    try {
      const newPlant = {
        name: newPlantName,
        location: newPlantLocation,
        presetId: newPresetId,
      };

      //CHANGE THE ENDPOINT
      const response = await axios.post('https://localhost:5000/plant/createPlant', newPlant);

      // Handle the response from the server, you might want to update state or display a message
      console.log('Plant created:', response.data);

      // Define an array of preset options



      // Clear the input fields after a successful POST
      setNewPlantName('');
      setNewPlantLocation('');
      setNewPresetId('');
    } catch (error) {
      // Handle errors here, e.g., show an error message
      console.error('Error creating plant:', error);
    }
  };

  const presetOptions = ["Option 1", "Option 2", "Option 3"];
  
  //CHANGE 
  // Load initial data when the component mounts
  useEffect(() => {
    // Fetch the list of plants from the server and set it in state
    axios.get('/api/plants').then((response) => {
      setPlants(response.data);
    });
  }, []);

  

  return (
    <div>
      <div className="add-plant">
        <input
          type="text"
          placeholder="Plant Name"
          value={newPlantName}
          onChange={(e) => setNewPlantName(e.target.value)}
        />
         <input
          type="text"
          placeholder="Location"
          value={newPlantLocation}
          onChange={(e) => setNewPlantLocation(e.target.value)}
        />
      <select
        value={newPresetId}
        onChange={(e) => setNewPresetId(e.target.value)}
      >
        <option value="">Select a Preset</option>
        {presetOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
        <button onClick={createNewPlant}>Add Plant</button>
      </div>
      <div className="plant-list">
        {plants.map((plant, index) => (
          <PlantStatus key={index} plant={plant} />
        ))}
      </div>
    </div>
  );
}

export default PlantList;
