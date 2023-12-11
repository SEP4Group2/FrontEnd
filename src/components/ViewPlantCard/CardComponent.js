import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
} from "mdb-react-ui-kit"; // Use components from mdb-react-ui-kit
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import ModelViewer from "../3D/ModelViewer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LightModeIcon from "@mui/icons-material/LightMode";
import WaterIcon from "@mui/icons-material/Water";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterTank from "../WaterTank/WaterTank";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "@mui/joy/Button";
import Axios from "axios";
import "./CardComponent.css";
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

export default function CardComponent({ plant, plantsData, onClose }) {
  const [activeTab, setActiveTab] = useState("status");
  const [editedLocation, setEditedLocation] = useState(plant.location);
  const [editedName, setEditedName] = useState(plant.name);
  const [editableMode, setEditableMode] = useState(false);
  const [presetValues] = useState({
    humidity: plant.plantPreset.humidity,
    moisture: plant.plantPreset.moisture,
    temperature: plant.plantPreset.temperature,
    light: plant.plantPreset.uvLight,
  });

  const handleWaterPlant = async () => {
    try {
      const deviceId = plant.deviceId; // Replace with the actual property from your plant data
      const response = await fetch(`http://localhost:5000/actions/waterPlant/${deviceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Plant watered:', response);
        // You may want to update the state or perform other actions after watering the plant
      } else {
        console.error('Error watering plant:', response.statusText);
      }
    } catch (error) {
      console.error('Error watering plant:', error);
    }
  };
  
  

  const getIcon = (iconId) => {
    console.log(iconId);
    switch (iconId) {
      case 1:
        return Image1;
      case 2:
        return Image2;
      case 3:
        return Image3;
      case 4:
        return Image4;
      case 5:
        return Image5;
      case 6:
        return Image6;
      case 7:
        return Image7;
      case 8:
        return Image8;
      case 9:
        return Image9;
      case 10:
        return Image10;
      case 11:
        return Image11;
      case 12:
        return Image12;
      case 13:
        return Image13;
      default:
        return Image1; // Default to Image1 or any other default image
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const savePlantData = async () => {
    try {
      const plantJSON = JSON.stringify({
        plantId: plant.id,
        name: editedName,
        location: editedLocation,
      });

      const response = await Axios.patch(
        "http://localhost:5000/Plant",
        plantJSON,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Plant data saved:", response.data);
      setEditableMode(false); // Reset editable mode after saving
    } catch (error) {
      console.error("Error saving plant data:", error);
    }
  };

  const handleClickDelete = async () => {
    try {
      const plantId = plant.id;
      console.log(plantId);
      const response = await Axios.delete(
        "http://localhost:5000/Plant/" + plantId,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Plant deleted", response.data);
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  const handleEditClickEdit = () => {
    setEditableMode((prevEditableMode) => !prevEditableMode);
    if (editableMode) {
      savePlantData(); // Call savePlantData when 'Save' is clicked
    }
  };

  return (
    <MDBCard
      className="text-center"
      style={{ width: "700px", height: "440px" }}
    >
      <MDBCardHeader>
        <MDBTabs className="card-header-tabs">
          <MDBTabsItem>
            <MDBTabsLink
              active={activeTab === "status"}
              onClick={() => handleTabClick("status")}
              style={{
                fontSize: "15px",
                color: activeTab === "status" ? "#869e7a" : "",
              }}
            >
              Status
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              active={activeTab === "information"}
              onClick={() => handleTabClick("information")}
              style={{ fontSize: "15px" }}
            >
              Information
            </MDBTabsLink>
          </MDBTabsItem>
          <CloseRoundedIcon
            style={{ marginLeft: "370px", marginTop: "10px" }}
            onClick={onClose}
          />
        </MDBTabs>
      </MDBCardHeader>
      <MDBCardBody>
        {activeTab === "status" && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={getIcon(plant.iconId)} 
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginRight: "30px",
                  marginLeft: "30px",
                }}
              />
              <MDBCardTitle
                style={{
                  fontWeight: "Bold",
                  fontSize: "25px",
                  marginTop: "0px",
                }}
              >
                {plant.name}
              </MDBCardTitle>
              <Button onClick={handleWaterPlant} style={{
                width: "120px", // Adjust the width as needed
                height: "40px", // Adjust the height as needed
                backgroundColor: "#869e7a",
                color: "white",
                marginLeft: "auto", // This will move the button to the right
                marginRight: "30px", // Add margin to separate from the text
                marginTop: "0px",
              }}>
                Water Plant
              </Button>
            </div>

            <Divider variant="fullWidth" style={{ marginTop: "10px" }} />
            <List
              sx={{
                width: "300px",
                maxWidth: "360",
                bgcolor: "background.paper",
                marginTop: "10px",
                marginLeft: "30px",
                fontSize: "5px", // Add the following styles to ListItemText
                "& .MuiListItemText-primary": {
                  fontSize: "14px", // Adjust the fontSize as needed
                },
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#869e7a" }}>
                    <WaterIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div style={{ flex: "1" }}>Humidity</div>
                      <div>{plantsData.humidity}</div>
                      <div>/{presetValues.humidity}</div>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#869e7a" }}>
                    <WaterDropIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div style={{ flex: "1" }}>Moisture</div>
                      <div>
                        {plantsData.moisture}/
                        {presetValues.moisture}
                      </div>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#869e7a" }}>
                    <DeviceThermostatIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div style={{ flex: "1" }}>Temperature</div>
                      <div>
                        {plantsData.temperature}/
                        {presetValues.temperature}
                      </div>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#869e7a" }}>
                    <LightModeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div style={{ flex: "1" }}>Light</div>
                      <div>
                        {plantsData.uvLight}/
                        {presetValues.light}
                      </div>
                    </div>
                  }
                />
              </ListItem>
            </List>
            <div
              style={{
                width: "180px",
                height: "130px",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                marginTop: "-170px",
                marginLeft: "420px",
              }}
            >
              <ModelViewer scale="1" modelPath="flowertry10.gltf" />
            </div>
          </>
        )}

        {activeTab === "information" && (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={getIcon(plant.iconId)}  
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginRight: "30px",
                  marginLeft: "30px",
                }}
              />

              <div style={{ display: "flex", flexDirection: "column" }}>
                <MDBCardTitle className="custom-card-title">
                  <strong>Type: </strong>
                  {plant.plantPreset.name}
                </MDBCardTitle>
                <MDBCardTitle className="custom-card-title">
                  <strong>Location: </strong>
                  {editableMode ? (
                    <input
                      className="custom-input"
                      type="text"
                      value={editedLocation}
                      onChange={(e) => setEditedLocation(e.target.value)}
                      style={{ marginLeft: "5px" }}
                    />
                  ) : (
                    <span style={{ marginLeft: "5px" }}>{editedLocation}</span>
                  )}
                </MDBCardTitle>
                <MDBCardTitle className="custom-card-title">
                  <strong>Name: </strong>
                  {editableMode ? (
                    <input
                      className="custom-input"
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      style={{ marginLeft: "5px" }}
                    />
                  ) : (
                    <span style={{ marginLeft: "5px" }}>{editedName}</span>
                  )}
                </MDBCardTitle>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  position: "relative",
                  float: "right",
                }}
              >
                <Button
                  variant="solid"
                  size="sm"
                  style={{
                    backgroundColor: "#869e7a",
                    color: "white",
                    marginLeft: "10px",
                    marginTop: "0px",
                  }}
                  onClick={() => handleEditClickEdit()}
                >
                  {editableMode ? "Save" : "Edit"}
                </Button>
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    variant="soft"
                    size="sm"
                    style={{ color: "grey", marginLeft: "10px" }}
                    onClick={() => handleClickDelete()}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            <Divider variant="fullWidth" style={{ marginTop: "10px" }} />
            <List
              sx={{
                width: "300px",
                maxWidth: 360,
                bgcolor: "background.paper",
                marginTop: "10px",
                marginLeft: "30px",
                fontSize: "5px", // Add the following styles to ListItemText
                "& .MuiListItemText-primary": {
                  fontSize: "14px", // Adjust the fontSize as needed
                },
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#869e7a" }}>
                    <WaterIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: "1" }}>Humidity</div>
                      <div>{plantsData.humidity}</div>
                      <div>/</div>
                      <div>
                        <span>{presetValues.humidity}</span>
                      </div>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#869e7a" }}>
                    <WaterDropIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: "1" }}>Moisture</div>
                      <div>{plantsData.moisture}</div>
                      <div>/</div>
                      <div>
                        <span>{presetValues.moisture}</span>
                      </div>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#869e7a" }}>
                    <DeviceThermostatIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: "1" }}>Temperature</div>
                      <div>{plantsData.temperature}</div>
                      <div>/</div>
                      <div>
                        <span>{presetValues.temperature}</span>
                      </div>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#869e7a" }}>
                    <LightModeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ flex: "1" }}>Light</div>
                      <div>{plantsData.uvLight}</div>
                      <div>/</div>

                      <span>{presetValues.light}</span>
                    </div>
                  }
                />
              </ListItem>
            </List>
            <div
              style={{
                marginTop: "50px",
                marginLeft: "0px",
                position: "absolute",
              }}
            >
              <WaterTank
                waterLevel={100 - plantsData.tankLevel}
              />
            </div>
          </>
        )}
      </MDBCardBody>
    </MDBCard>
  );
}
