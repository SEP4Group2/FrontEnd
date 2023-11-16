// TypePopup.js
import React, { useState } from "react";
import "./Popup.css";
import Axios from "axios";

const Popup = ({ onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [moisture, setMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [uvLight, setLight] = useState("");

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
      console.log("Some parameters are empty or null; not saving");
      return;
    }

    onCancel();

    Axios.post("http://localhost:5000/PlantPreset/createPlantPreset", presetData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Plant data saved successfully");
        } else {
          console.error("Failed to save plant data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="background">
      <div className="popup">
        <div className="popup-content">
          <h2>New Preset</h2>
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
            onChange={(e) => setHumidity(e.target.value)}
          />
          <label>Moisture level:</label>
          <input
            type="text"
            value={moisture}
            onChange={(e) => setMoisture(e.target.value)}
          />
          <label>Temperature level:</label>
          <input
            type="text"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
          <label>Light level:</label>
          <input
            type="text"
            value={uvLight}
            onChange={(e) => setLight(e.target.value)}
          />
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
