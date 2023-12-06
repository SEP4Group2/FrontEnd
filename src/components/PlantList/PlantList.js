import { PlantCard } from "./../PlantCard/PlantCard";
import * as React from "react";
import Box from "@mui/joy/Box";
import PlantCardSkeleton from "./../PlantCard/PlantCardSkeleton.js";
import AddButton from "../FloatButton/FloatButton.jsx";
import RegisterPlant from "../RegisterPlant/RegisterPlant.js";
import { useState } from "react";
import Image from "../../assets/noPlants.jpg";

export default function PlantList({
  plants,
  plantsData,
  loading,
  onViewClick,
  userId,
}) {
  const cardContainerStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  };

  const boxStyles = {
    padding: "20px",
    borderRadius: "5px",
    maxHeight: "100%", // Set a maximum height as needed
    maxWidth: "100%",
    overflowY: "auto", // Enable vertical scrolling when content overflows
  };

  const [showRegisterPlant, setShowRegisterPlant] = useState(false);

  const handleAddButton = () => {
    setShowRegisterPlant(true);
  };

  const handleCancel = () => {
    setShowRegisterPlant(false);
  };

  if (loading) {
    // Render the skeleton boxes if plants array is empty
    return showRegisterPlant ? (
      <RegisterPlant userId={userId} onCancel={handleCancel} />
    ) : (
      <Box style={boxStyles}>
        <div style={{ paddingTop: "10px" }}>
          <div style={cardContainerStyles}>
            <PlantCardSkeleton />
            <PlantCardSkeleton />
            <PlantCardSkeleton />
            <div onClick={handleAddButton} className="addButton">
              <AddButton />
            </div>
          </div>
        </div>
      </Box>
    );
  } else {
    // Render the PlantCard components if plants array is not empty
    return (
      <div>
        {showRegisterPlant ? (
          <RegisterPlant userId={userId} onCancel={handleCancel} />
        ) : (
          <Box style={boxStyles}>
            <div style={{ paddingTop: "10px" }}>
              <div style={cardContainerStyles}>
                {plants.length === 0 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ width: "10%", height: "10%" }}>
                          <img
                            src={Image}
                            alt=""
                            className="bg-img"
                            style={{ width: "240px", height: "210px" }}
                          />
                        </div>
                        <h2 style={{ marginLeft: "10%" }}>
                          Add your first plant
                        </h2>
                        <div
                          onClick={handleAddButton}
                          className="addButton"
                          style={{ marginLeft: "30%" }}
                        >
                          <AddButton />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {plants.map((plant, index) => {
                      // Assuming plantId exists in the plant object, filter plantsData based on plantId
                      const filteredData = plantsData.filter(
                        (data) => data.plantId === plant.id
                      );
                      if (filteredData.length === 0)
                        return (
                          <PlantCard
                            plant={plant}
                            plantsData={plantsData[plantsData.length -1]} // Pass default values
                            index={index}
                            key={index} // Ensure each child element has a unique key prop
                          />
                        );

                      return (
                        <PlantCard
                          plant={plant}
                          plantsData={filteredData[filteredData.length -1]} // Pass filtered data to PlantCard
                          index={index}
                          key={index} // Ensure each child element has a unique key prop
                        />
                      );
                    })}

                    <div onClick={handleAddButton} className="addButton">
                      <AddButton />
                    </div>
                  </>
                )}
              </div>
            </div>
          </Box>
        )}
      </div>
    );
  }
}
