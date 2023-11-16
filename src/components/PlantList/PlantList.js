import { PlantCard } from "./../PlantCard/PlantCard";
import * as React from "react";
import Box from "@mui/joy/Box";
import PlantCardSkeleton from "./../PlantCard/PlantCardSkeleton.js";
import AddButton from "../FloatButton/FloatButton.jsx";
import RegisterPlant from "../RegisterPlant/RegisterPlant.jsx";
import { useState } from "react";

export default function PlantList({ plants, onViewClick }) {
  const cardContainerStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  };

  const boxStyles = {
    // background: "#f5f5f5",
    padding: "20px",
    // border: "1px solid #ddd",
    borderRadius: "5px",
    // margin: '10px',
    // width: '80%',
    maxHeight: "100%", // Set a maximum height as needed
    maxWidth: "100%",
    overflowY: "auto", // Enable vertical scrolling when content overflows
  };

  const [showRegisterPlant, setShowRegisterPlant] = useState(false);

  const handleAddButton = () => {
    setShowRegisterPlant(true);
  }

  const handleCancel = () => {
    setShowRegisterPlant(false);
  }

  if (plants.length === 0) {
    // Render the skeleton boxes if plants array is empty
    return (
      <Box style={boxStyles}>
        <div style={{ paddingTop: "10px" }}>
          <div style={cardContainerStyles}>
            <PlantCardSkeleton />
            <PlantCardSkeleton />
            <PlantCardSkeleton />
          </div>
        </div>
      </Box>
    );
  } else {
    // Render the PlantCard components if plants array is not empty
    return (
      <div>
      {showRegisterPlant ? (
        <RegisterPlant onCancel={handleCancel}/>
      ) : (
        <Box style={boxStyles}>
          <div style={{ paddingTop: "10px" }}>
            <div style={cardContainerStyles}>
              {plants.map((plant, index) => (
                <PlantCard plant={plant} index={index} />
              ))}
              <div onClick={handleAddButton} className="addButton">
                <AddButton/>
              </div>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
  }
}
