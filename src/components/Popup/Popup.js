// TypePopup.js
import React, { useState } from "react";
import "./Popup.css";
import Alert from "@mui/material/Alert";

const Popup = ({ onCancel, userId }) => {
  const [name, setName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [moisture, setMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [uvLight, setLight] = useState("");
  const [warningText, setWarningText] = useState(false);

  const createPresetJSON = () => {
    // Create an object with the values

    const presetData = {
      userId: userId,
      name,
      humidity,
      moisture,
      temperature,
      uvLight,
    };
    // Check if any of the parameters is an empty string or null
    if (
      Object.values(presetData).some((param) => param === "" || param === null)
    ) {
      setWarningText(true);
      return;
    }

    const createPlantPreset = async (presetData) => {
      try {
        await fetch("http://127.0.0.1/5000/PlantPreset/createPlantPreset", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(presetData),
        });

        onCancel();
      } catch (error) {
        console.error("Error:", error);
      }
    };
    createPlantPreset(presetData);
  };

  return (
    <div className="background" data-testid="popup">
      <div className="popup">
        <div className="popup-content">
          <label>Type:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>Humidity level:
            <input
              type="text"
              value={humidity}
              onChange={(e) => { const inputValue = e.target.value; if (/^\d*$/.test(inputValue)) { setHumidity(e.target.value) } }}
            />
          </label>
          <label>Moisture level:
            <input
              type="text"
              value={moisture}
              onChange={(e) => { const inputValue = e.target.value; if (/^\d*$/.test(inputValue)) { setMoisture(e.target.value) } }}
            />
          </label>
          <label>Temperature level:
            <input
              type="text"
              value={temperature}
              onChange={(e) => { const inputValue = e.target.value; if (/^\d*$/.test(inputValue)) { setTemperature(e.target.value) } }}
            />
          </label>
          <label>Light level:
            <input
              type="text"
              value={uvLight}
              onChange={(e) => { const inputValue = e.target.value; if (/^\d*$/.test(inputValue)) { setLight(e.target.value) } }}
            />
          </label>
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
              <button data-testid="save-button">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
