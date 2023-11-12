// ViewPlantCard.js
import React from "react";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import ModelViewer from "../3D/ModelViewer"
import { left } from "@popperjs/core";
import WaterTank from "../WaterTank/WaterTank";
import Button from '@mui/material/Button';

const cardStyles = {
    width: '600px',
    height: '400px',
    position: 'relative', // Ensure relative positioning for close button
    color: 'black'
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    cursor: 'pointer',
    padding: '5px',
    fontSize: '24px',
    color: 'black',
};

const getStatusColor = (value) => {
        return '#ffffff';
};

export function ViewPlantCard({ plant, onClose }) {
    return (
        <Card variant="solid" color="primary" style={{
            ...cardStyles,
            backgroundColor: getStatusColor(plant.statusValue)
        }}>
            <CardContent>
            <Typography style={{ marginTop: '30px', marginLeft: '30px' }} level="h2">{plant.name}</Typography>
                <Typography style={{ marginLeft: '30px'}} level="p">Location {plant.deviceId}</Typography>
                <span
                    style={closeButtonStyle}
                    onClick={onClose}
                >
                    X
                </span>
                <div style={{ width: '200px', height: '150px', display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop:'100px'}}>
                    <ModelViewer scale="1" modelPath="flowertry10.gltf" />
                </div>
            
                <div style={{ width: '230px', height: '150px', display: 'flex', flexDirection: 'column', marginTop: '-180px', marginLeft: '210px'}}>
                <Typography level="h4">Humidity: 50/50</Typography>
                <Typography level="h4">Moisture: 70/80</Typography>
                <Typography level="h4">Temperature: 40/70</Typography>
                <Typography level="h4">Light: 30/50</Typography>
                </div>
                <div><WaterTank waterLevel={50} /> {/* Pass the water level as needed */}</div>
                <div style={{ width: '80px', height: '40px', marginLeft: '400px', marginTop: '-10px'}}><Button variant="contained" color="success">Edit</Button></div>
                <div style={{ width: '80px', height: '40px', marginLeft: '480px', marginTop: '-43px'}}><Button variant="outlined" color="error">Delete</Button></div>
            </CardContent>
        </Card>
    );
}