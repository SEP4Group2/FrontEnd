import React, { useState } from "react";
//import { PlantCardCarousel } from "../PlantCard/PlantCardCarousel";
import PlantCardCarousel from "../PlantCard/PlantCardCarousel";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Analytics from "../Analytics/Analytics";

const PlantCarousel = ({ plants, plantsData }) => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);

  const handleCardClick = (plant) => {
    setSelectedPlant((prevPlant) => (prevPlant === plant ? null : plant));
  };

  const goToPrev = () => {
    setCurrentPlantIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    setSelectedPlant(null);
  };

  const goToNext = () => {
    setCurrentPlantIndex((prevIndex) => (prevIndex < plants.length - 1 ? prevIndex + 1 : prevIndex));
    setSelectedPlant(null);
  };

  return (
    <div>
      <Box position="relative" paddingLeft="40px">
        <PlantCardCarousel
          plant={plants[currentPlantIndex]}
          plantsData={plantsData}
          isSelected={plants[currentPlantIndex] === selectedPlant}
          onClick={() => handleCardClick(plants[currentPlantIndex])}
        />
        <IconButton
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={goToPrev}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={goToNext}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
      {selectedPlant && (
        <div key={selectedPlant.id} className="analytics-container" style={{ marginTop: '50px' }}>
          <Analytics selectedPlant={selectedPlant} />
        </div>
      )}
    </div>
  );
};

export default PlantCarousel;
