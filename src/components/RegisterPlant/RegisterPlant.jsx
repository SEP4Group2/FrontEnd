import React, { useState } from "react";
import Axios from "axios";
import "./RegisterPlant.css";
import Image from "../../assets/plant.jpg";
import Image2 from "../../assets/logo.jpg";
import Popup from "../Popup/Popup";

const NewPlant = ({ onCancel }) => {
  const plantTypes = [
    {
      id: "0",
      name: "Other",
      humidity: "",
      moisture: "",
      light: "",
      temperature: "",
    },
    {
      id: "1",
      name: "Monstiera",
      humidity: "50",
      moisture: "50",
      light: "50",
      temperature: "50",
    },
    {
      id: "2",
      name: "Aloe",
      humidity: "40",
      moisture: "40",
      light: "40",
      temperature: "40",
    },
    {
      id: "3",
      name: "Sunflower",
      humidity: "60",
      moisture: "60",
      light: "60",
      temperature: "60",
    },
  ];

  const [plantData, setPlantData] = useState({
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
    const selectedPlantType = plantTypes.find(
      (type) => type.name === selectedType
    );

    if (selectedPlantType && selectedType !== "Other") {
      setPlantData({
        ...plantData,
        preset: selectedPlantType.id,
        selectedType,
      });
      console.log("I chose something");
    } else if (selectedType === "Other") {
      setShowPopup(true);
      console.log("I chose other");
    } else {
      console.error(`Selected plant type '${selectedType}' not found.`);
    }
  };

  const handleIconChange = (newIcon) => {
    setPlantData({ ...plantData, icon: newIcon });
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleCancelRegister = () => {
    onCancel();
  }

  const createPlantJSON = () => {
    const { name, location, preset } = plantData;

    const plantJSON = {
      name,
      location,
      plantPresetId: preset,
    };

    console.log("Plant JSON Object:", plantJSON);

    if (
      Object.values(plantJSON).some((param) => param === "" || param === null)
    ) {
      console.log("Some parameters are empty or null; not saving");
      return;
    }

    Axios.post("http://localhost:5000/Plant/createPlant", plantJSON)
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
    <div className="new-plant-container">
      {showPopup && <Popup onCancel={handleCancel} />}
      <div className="left-content">
        <div className="plant-details">
          <h2>Register a New Plant</h2>
          <div className="form-fields">
            <div className="form-field">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={plantData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={plantData.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Type:</label>
              <select
                name="selectedType"
                value={plantData.selectedType}
                onChange={handleTypeChange}
              >
                {plantTypes.map((plantType) => (
                  <option key={plantType.id} value={plantType.name}>
                    {plantType.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label>Humidity level:</label>
              <input
                type="text"
                name="humidity"
                value={
                  plantTypes.find(
                    (type) => type.name === plantData.selectedType
                  )?.humidity || ""
                }
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className="form-field">
              <label>Moisture level:</label>
              <input
                type="text"
                name="moisture"
                value={
                  plantTypes.find(
                    (type) => type.name === plantData.selectedType
                  )?.moisture || ""
                }
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className="form-field">
              <label>Light level:</label>
              <input
                type="text"
                name="light"
                value={
                  plantTypes.find(
                    (type) => type.name === plantData.selectedType
                  )?.light || ""
                }
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className="form-field">
              <label>Temperature level:</label>
              <input
                type="text"
                name="temperature"
                value={
                  plantTypes.find(
                    (type) => type.name === plantData.selectedType
                  )?.temperature || ""
                }
                onChange={handleInputChange}
                readOnly
              />
            </div>
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
          <div onClick={createPlantJSON} className="saveButton">
            <button className="save-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPlant;
