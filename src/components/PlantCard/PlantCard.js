import React from "react";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import "./PlantCard.css"

const cardStyles = {
    margin: '10px',
    width: '300px',
    height: '140px',
};

const getStatusColor = (value) => {
    if (value < 40) {
        return '#CD5D67';
    } else if (value < 70) {
        return '#FCAB10';
    } else {
        return '#869E79';
    }
};

export function PlantCard({
    index,
    plant
}) {
    return <Card key={index} variant="solid" color="primary" invertedColors className="hover-card" style={{
        ...cardStyles,
        backgroundColor: getStatusColor(plant.statusValue)
    }}>
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
        <CardActions style={{justifyContent: 'end'}}>
            <Button variant="soft" size="sm">
                View
            </Button>
            <Button variant="solid" size="sm" style={{ color: 'black' }}>
                Delete
            </Button>
        </CardActions>
    </Card>;
}
