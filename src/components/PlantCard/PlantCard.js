import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import "./PlantCard.css";
import CardComponent from "../ViewPlantCard/CardComponent.js";
import Axios from "axios";

const cardStyles = {
  margin: "10px",
  width: "300px",
  height: "140px",
};

const getStatusColor = (value) => {
  if (value < 40) {
    return "#CD5D67";
  } else if (value < 70) {
    return "#FCAB10";
  } else {
    return "#869E79";
  }
};

export function PlantCard({ index, plantsData, plant }) {
  const [showViewCard, setShowViewCard] = useState(false);

  const openViewCard = () => {
    setShowViewCard(true);
  };

  const closeViewCard = () => {
    setShowViewCard(false);
  };

  const handleClickDelete = async () => {
    try {
      const plantId = plant.id;
      console.log(plantId)
      const response = await Axios.delete(
        
        'http://localhost:5000/Plant/'+plantId,
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

  return (
    <div>
      <Card
        key={index}
        variant="solid"
        color="primary"
        invertedColors
        className="hover-card"
        style={{
          ...cardStyles,
          backgroundColor: getStatusColor(plant.statusValue),
        }}
      >
        <CardContent orientation="horizontal">
          <CircularProgress size="lg" determinate value={plant.statusValue}>
            <SvgIcon>
              <LocalFloristIcon />
            </SvgIcon>
          </CircularProgress>
          <CardContent>
            <Typography level="h3">{plant.name}</Typography>
            <Typography level="p">Device ID: {plant.deviceId}</Typography>
          </CardContent>
        </CardContent>
        <CardActions style={{ justifyContent: "end" }}>
          <Button variant="soft" size="sm" onClick={openViewCard}>
            View
          </Button>
          <Button variant="solid" size="sm" style={{ color: "black" }} onClick={handleClickDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>

      {showViewCard && (
        <div className="popup">
          
            <CardComponent plant={plant} plantsData={plantsData} onClose={closeViewCard} />
          
        </div>
      )}
    </div>
  );
}
