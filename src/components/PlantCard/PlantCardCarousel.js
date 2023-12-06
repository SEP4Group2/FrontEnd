// PlantCardCarousel.js

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

const cardStyles = {
  margin: "10px",
  width: "300px",
  height: "140px",
};

const getStatusColor = (value) => {
  if (value < 40) {
    return "#869E79"; // Default color for all cards
  } else if (value < 70) {
    return "#869E79"; // Default color for all cards
  } else {
    return "#869E79"; // Default color for all cards
  }
};

const PlantCardCarousel = ({ index, plantsData, plant, onClick, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Add a conditional check to ensure plant is defined
  const cardColor = plant
    ? isSelected
      ? "#4CAF50"
      : isHovered
      ? "#388E3C"
      : "#869E79"
    : "#869E79";

  return (
    <Card
      key={index}
      variant="solid"
      color="primary"
      invertedColors
      className="hover-card-carousel"
      style={{
        ...cardStyles,
        backgroundColor: cardColor,
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {plant ? (  // Add a conditional check to ensure plant is defined
        <CardContent orientation="horizontal">
          <CircularProgress size="lg" determinate value={plant.statusValue || 0}>
            <SvgIcon>
              <LocalFloristIcon />
            </SvgIcon>
          </CircularProgress>
          <CardContent>
            <Typography level="h3">{plant.name}</Typography>
            <Typography level="p">Device ID: {plant.deviceId}</Typography>
          </CardContent>
        </CardContent>
      ) : null}
      
    </Card>
  );
};
export default PlantCardCarousel;
