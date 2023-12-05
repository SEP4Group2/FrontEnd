import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { PlantCardCarousel } from "../PlantCard/PlantCardCarousel";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Analytics from "../Analytics/Analytics";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { margin } from "@mui/system";

const PlantCarousel = ({ plants, plantsData }) => {
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [openedCards, setOpenedCards] = useState([]);
    const sliderRef = useRef(null);
  
    const handleCardClick = (plant) => {
      if (openedCards.includes(plant)) {
        // If the card is already opened, close it
        setOpenedCards(openedCards.filter((card) => card !== plant));
        setSelectedPlant(null);
      } else {
        // If a new card is selected, close all others and open the new one
        setOpenedCards([plant]);
        setSelectedPlant(plant);
      }
    };
  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
          },
        },
      ],
    };
  
    const goToPrev = () => {
      if (sliderRef.current) {
        sliderRef.current.slickPrev();
      }
    };
  
    const goToNext = () => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    };
  
    return (
      <div>
        <Box position="relative" paddingLeft="40px">
          <Slider ref={sliderRef} {...settings}>
            {plants.map((plant, index) => (
              <PlantCardCarousel
                key={index}
                plant={plant}
                plantsData={plantsData}
                isSelected={plant === selectedPlant}
                onClick={() => handleCardClick(plant)}
              />
            ))}
          </Slider>
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
        {openedCards.map((card) => (
          <div key={card.id} className="analytics-container" style={{ marginTop: '50px' }}>
            {selectedPlant && <Analytics plant={card} />}
          </div>
        ))}
      </div>
    );
  };
  
  export default PlantCarousel;
