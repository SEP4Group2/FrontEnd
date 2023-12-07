import React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

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

const PlantCardCarousel = ({ plant, onView, index }) => {
    return (
        <>
            <Card
                variant="solid"
                color="primary"
                invertedColors
                className="hover-card"
                style={{
                    ...cardStyles,
                    backgroundColor: getStatusColor(80),
                }}
            >
                <CardContent orientation="horizontal">
                    <CircularProgress size="lg" determinate value={80}>
                        <SvgIcon>
                            <LocalFloristIcon />
                        </SvgIcon>
                    </CircularProgress>
                    <CardContent>
                        <Typography level="h3">{plant.name}</Typography>
                    </CardContent>
                </CardContent>
                <Button variant="soft" size="sm" onClick={() => onView(plant)}>
                    View
                </Button>
            </Card>
        </>
    );
};

export default PlantCardCarousel;
