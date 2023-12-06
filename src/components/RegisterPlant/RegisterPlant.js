import React, { useState, useEffect, useCallback } from "react";
import "./RegisterPlant.css";
import Image from "../../assets/plant.jpg";
import Image2 from "../../assets/logo.jpg";
import Popup from "../Popup/Popup";
import Alert from "@mui/material/Alert";

const RegisterPlant = ({ onCancel, userId }) => {
  const [presets, setPresets] = useState([{ name: "Other", id: "0" }]);
  const [warningText, setWarningText] = useState(false);
  const fetchPresets = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/PlantPreset/getAllPresets/"+userId);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const presetsWithSelectOne = [{ name: "Other", id: "0" }, ...data];
          setPresets(presetsWithSelectOne);
        }
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error("Error fetching presets:", error);
    }
  }, [userId]);

  useEffect(() => {
    // Call fetchPresets when the component mounts
    fetchPresets();
  }, [fetchPresets]);

  const [plantData, setPlantData] = useState({
    userId: userId,
    deviceId: "",
    name: "",
    location: "",
    preset: "",
    icon: Image, // Initial icon
    selectedType: "", // Add selectedType state
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlantData({ ...plantData, [name]: value });
  };

  const [showPopup, setShowPopup] = useState(false); // State variable to control the "Popup" component visibility

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    const selectedPlantType = presets.find(
      (type) => type.name === selectedType
    );

    if (selectedPlantType && selectedType !== "Other") {
      setPlantData({
        ...plantData,
        preset: selectedPlantType.presetId,
        selectedType,
      });
      console.log("I chose something");
    } else if (selectedType === "Other") {
      setShowPopup(true);
      console.log("I chose other");
    } else {
      console.log(`Selected plant type '${selectedType}' not found.`);
    }
  };

  const handleIconChange = (newIcon) => {
    setPlantData({ ...plantData, icon: newIcon });
  };

  const handleCancel = async () => {
    try {
      fetchPresets();
      setShowPopup(false);
    }
    catch (error) {
      console.error("Error fetching presets:", error);
    }
  };

  const handleCancelRegister = () => {
    onCancel();
  };

  const createPlantJSON = () => {
    const { userId, deviceId, name, location, preset } = plantData;

    const plantJSON = {
      userId: userId,
      deviceId,
      name,
      location,
      plantPresetId: preset,
    };

    console.log("Plant JSON Object:", plantJSON);

    if (
      Object.values(plantJSON).some((param) => param === "" || param === null)
    ) {
      setWarningText(true);
      console.log("Some parameters are empty or null; not saving");
      return;
    }

    const createPlant = async (plantJSON) => {
      try {
        const response = await fetch("http://localhost:5000/Plant/createPlant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(plantJSON),
        });

        if (response.ok) {
          console.log("Plant data saved successfully");
          handleCancelRegister();
        } else {
          console.error("Failed to save plant data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    createPlant(plantJSON);

  };

  return (
    <div className="new-plant-container">
      {showPopup && <Popup userId={userId} onCancel={handleCancel}/>}
      <div className="left-content">
        <div className="plant-details">
          <h2>Register a New Plant</h2>
          <div className="form-fields">
            <div className="form-field">
              <label>Device ID:
                <input
                  type="text"
                  name="deviceId"
                  value={plantData.deviceId}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-field">
              <label>Name:
                <input
                  type="text"
                  name="name"
                  value={plantData.name}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-field">
              <label>Location:
                <input
                  type="text"
                  name="location"
                  value={plantData.location}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-field">
              <label>Type:
                <select
                  name="selectedType"
                  value={plantData.selectedType}
                  onChange={handleTypeChange}
                >
                  <option value="" disabled hidden>
                    Select Type
                  </option>
                  {presets.map((plantType) => (
                    <option key={plantType.id} value={plantType.name}>
                      {plantType.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-field">
              <label>Humidity level:
                <input
                  type="text"
                  name="humidity"
                  value={
                    presets.find((type) => type.name === plantData.selectedType)
                      ?.humidity || ""
                  }
                  onChange={handleInputChange}
                  readOnly
                />
              </label>
            </div>
            <div className="form-field">
              <label>Moisture level:
                <input
                  type="text"
                  name="moisture"
                  value={
                    presets.find((type) => type.name === plantData.selectedType)
                      ?.moisture || ""
                  }
                  onChange={handleInputChange}
                  readOnly
                />
              </label>
            </div>
            <div className="form-field">
              <label>Light level:
                <input
                  type="text"
                  name="light"
                  value={
                    presets.find((type) => type.name === plantData.selectedType)
                      ?.uvLight || ""
                  }
                  onChange={handleInputChange}
                  readOnly
                />
              </label>
            </div>
            <div className="form-field">
              <label>Temperature level:
                <input
                  type="text"
                  name="temperature"
                  value={
                    presets.find((type) => type.name === plantData.selectedType)
                      ?.temperature || ""
                  }
                  onChange={handleInputChange}
                  readOnly
                />
              </label>
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            {warningText && (
              <Alert severity="warning" onClose={() => setWarningText(false)}>
                Fields should not be empty!
              </Alert>
            )}
          </div>
        </div>
      </div>

      <div className="right-content">
        <div className="plant-icons">
          <div className="main-icon">
            {/* Display the main icon based on the selected icon */}
            <img
              src={plantData.icon} // Adjust the path to your image
              alt="Main Plant Icon"
              width="300"
              height="300"
            />
          </div>
          <div className="small-icons">
            <div className="small-icon" onClick={() => handleIconChange(Image)}>
              <img
                src={Image} // Adjust the path to your image
                alt="Icon 1"
                width="100"
                height="100"
              />
            </div>
            <div
              className="small-icon"
              onClick={() => handleIconChange(Image2)}
            >
              <img
                src={Image2} // Adjust the path to your image
                alt="Icon 2"
                width="100"
                height="100"
              />
            </div>
          </div>
        </div>
        <div className="buttons">
          <div onClick={handleCancelRegister} className="cancelButton">
            <button className="cancel-button">Go back</button>
          </div>
          <div
            onClick={() => {
              createPlantJSON();
            }}
            className="saveButton"
          >
            <button className="save-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPlant;