// TypePopup.js
import React, { useState } from "react";
import "./Popup.css";
import Alert from "@mui/material/Alert";

const Popup = ({ onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [moisture, setMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [uvLight, setLight] = useState("");
  const [warningText, setWarningText] = useState(false);

  const createPresetJSON = () => {
    // Create an object with the values
    
    const presetData = {
      name,
      humidity,
      moisture,
      temperature,
      uvLight,
    };

    console.log("Plant JSON Object:", presetData);
    // Check if any of the parameters is an empty string or null
    if (
      Object.values(presetData).some((param) => param === "" || param === null)
    ) {
      setWarningText(true);
      console.log("Some parameters are empty or null; not saving");
      return;
    }

    const createPlantPreset = async (presetData) => {
      try {
        const response = await fetch("http://localhost:5000/PlantPreset/createPlantPreset", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(presetData),
        });
    
        if (response.status === 201) {
          console.log("Plant data saved successfully");
        } else {
          console.error("Failed to save plant data");
        }
    
        onCancel();
      } catch (error) {
        console.error("Error:", error);
      }
    };
    createPlantPreset(presetData);
  };

  return (
    <div className="background">
      <div className="popup">
        <div className="popup-content">
          <label>Type:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Humidity level:</label>
          <input
            type="text"
            value={humidity}
            onChange={(e) => {const inputValue = e.target.value; if(/^\d*$/.test(inputValue)){setHumidity(e.target.value)}}}
          />
          <label>Moisture level:</label>
          <input
            type="text"
            value={moisture}
            onChange={(e) => {const inputValue = e.target.value; if(/^\d*$/.test(inputValue)){setMoisture(e.target.value)}}}
          />
          <label>Temperature level:</label>
          <input
            type="text"
            value={temperature}
            onChange={(e) => {const inputValue = e.target.value; if(/^\d*$/.test(inputValue)){setTemperature(e.target.value)}}}
          />
          <label>Light level:</label>
          <input
            type="text"
            value={uvLight}
            onChange={(e) => {const inputValue = e.target.value; if(/^\d*$/.test(inputValue)){setLight(e.target.value)}}}
          />
          <div style={{ marginTop: "10px" }}>
              {warningText && (
                <Alert severity="warning" onClose={() => setWarningText(false)}>
                  Fields should not be empty!
                </Alert>
              )}
            </div>
          <div className="button-container">
            <div onClick={onCancel}>
              <button style={{ backgroundColor: "black" }}>Cancel</button>
            </div>
            <div onClick={createPresetJSON}>
              <button>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
