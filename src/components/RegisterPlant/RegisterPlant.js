import React, { useState, useEffect, useCallback } from "react";
import "./RegisterPlant.css";
import Popup from "../Popup/Popup";
import Alert from "@mui/material/Alert";
import Image1 from "../../assets/icons/1.jpg";
import Image2 from "../../assets/icons/2.jpg";
import Image3 from "../../assets/icons/3.jpg";
import Image4 from "../../assets/icons/4.jpg";
import Image5 from "../../assets/icons/5.jpg";
import Image6 from "../../assets/icons/6.jpg";
import Image7 from "../../assets/icons/7.jpg";
import Image8 from "../../assets/icons/8.jpg";
import Image9 from "../../assets/icons/9.jpg";
import Image10 from "../../assets/icons/10.jpg";
import Image11 from "../../assets/icons/11.jpg";
import Image12 from "../../assets/icons/12.jpg";
import Image13 from "../../assets/icons/13.jpg";

const RegisterPlant = ({ onCancel, userId }) => {
  const [presets, setPresets] = useState([{ name: "Other", id: "0" }]);
  const [warningText, setWarningText] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [iconId, setIconId] = useState(1);
  const [plantData, setPlantData] = useState({
    userId: userId,
    deviceId: "",
    name: "",
    location: "",
    preset: "",
    selectedType: "", // Add selectedType state
  });
  const [mainIconSrc, setMainIconSrc] = useState(Image1);

  const fetchPresets = useCallback(async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1/5000/PlantPreset/getAllPresets/" + userId
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const presetsWithSelectOne = [{ name: "Other", id: "0" }, ...data];
          setPresets(presetsWithSelectOne);
        }
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching presets:", error);
    }
  }, [userId]);

  useEffect(() => {
    // Call fetchPresets when the component mounts
    fetchPresets();
  }, [fetchPresets]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlantData({ ...plantData, [name]: value });
  };
  

  const handleClick = (id, iconSrc) => {
    setIconId(id);
    console.log(iconId);
    setMainIconSrc(iconSrc);
  };

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
    } else if (selectedType === "Other") {
      setShowPopup(true);
    } else {
    }
  };

  const handleCancel = async () => {
    try {
      fetchPresets();
      setShowPopup(false);
    } catch (error) {
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
      iconId: iconId,
    };

    if (
      Object.values(plantJSON).some((param) => param === "" || param === null)
    ) {
      setWarningText(true);
      console.log("Some parameters are empty or null; not saving");
      return;
    }

    const createPlant = async (plantJSON) => {
      try {
        const response = await fetch(
          "http://127.0.0.1/5000/Plant/createPlant",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(plantJSON),
          }
        );

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
      {showPopup && <Popup userId={userId} onCancel={handleCancel} />}
      <div className="left-content">
        <div className="plant-details">
          <h2>Register a New Plant</h2>
          <div className="form-fields">
            <div className="form-field">
              <label>
                Device ID:
                <input
                  type="text"
                  name="deviceId"
                  value={plantData.deviceId}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-field">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={plantData.name}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-field">
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={plantData.location}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-field">
              <label>
                Type:
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
              <label>
                Humidity level:
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
              <label>
                Moisture level:
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
              <label>
                Light level:
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
              <label>
                Temperature level:
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
          <div className="main-icon">
            <img src={mainIconSrc} alt="Main Plant Icon" />
          </div>
          <div className="icons-container">
            <div className="plant-icons">
              <img
                className="imgs"
                src={Image13}
                alt={"Press Shift and scroll horizontally"}
                onClick={() => handleClick(13, Image13)}
              />
              <img
                className="imgs"
                src={Image5}
                alt={"Press Shift and scroll horizontally"}
                onClick={() => handleClick(5, Image5)}
              />
              <img
                className="imgs"
                src={Image12}
                alt={"Press Shift and scroll horizontally"}
                onClick={() => handleClick(12, Image12)}
              />
              <img
                className="imgs"
                src={Image1}
                alt={"Press Shift and scroll horizontally"}
                onClick={() => handleClick(1, Image1)}
              />
              <img
                className="imgs"
                src={Image2}
                alt={"Press Shift and scroll horizontally"}
                onClick={() => handleClick(2, Image2)}
              />
              <img
                className="imgs"
                src={Image3}
                alt={"Press Shift and scroll horizontally"}
                onClick={() => handleClick(3, Image3)}
              />
              <img
                className="imgs"
                src={Image4}
                alt={"Press Shift and scroll horizontally"}
                onClick={() => handleClick(4, Image4)}
              />
              <img
                className="imgs"
                src={Image6}
                alt={"Press Shift and scroll horizontally"}
                onClick={() => handleClick(6, Image6)}
              />
              <img
                className="imgs"
                src={Image7}
                alt={"Press Shift and scroll horizontally"}
                onClick={() => handleClick(7, Image7)}
              />
              <img
                className="imgs"
                src={Image8}
                alt={"Press Shift and scroll horizontally"}
                onClick={() => handleClick(8, Image8)}
              />
              <img
                className="imgs"
                src={Image9}
                alt={"Press Shift and scroll horizontally"}
                onClick={() => handleClick(9, Image9)}
              />
              <img
                className="imgs"
                src={Image10}
                alt={"Press Shift and scroll horizontally"}
                onClick={() => handleClick(10, Image10)}
              />
              <img
                className="imgs"
                src={Image11}
                alt={"Press Shift and scroll horizontally"}
                onClick={() => handleClick(11, Image11)}
              />
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
