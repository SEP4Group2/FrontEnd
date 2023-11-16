import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
} from 'mdb-react-ui-kit'; // Use components from mdb-react-ui-kit
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import ModelViewer from "../3D/ModelViewer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LightModeIcon from '@mui/icons-material/LightMode';
import WaterIcon from '@mui/icons-material/Water';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterTank from "../WaterTank/WaterTank";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Button from '@mui/joy/Button';
export default function CardComponent({ plant, onClose }) {
  const [activeTab, setActiveTab] = useState('status');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <MDBCard className='text-center' style={{ width: '700px', height: '440px' }}>
      <MDBCardHeader>
        <MDBTabs className='card-header-tabs'>
          <MDBTabsItem>
            <MDBTabsLink active={activeTab === 'status'} onClick={() => handleTabClick('status')} style={{fontSize:'15px', color: activeTab==='status' ? '#869e7a' : ''}}>
              Status
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink active={activeTab === 'information'} onClick={() => handleTabClick('information')} style={{fontSize:'15px'}}>
              Information
            </MDBTabsLink>
          </MDBTabsItem>
          <CloseRoundedIcon style={{marginLeft:'370px',marginTop:'10px'}} onClick={onClose}/>
        </MDBTabs>
        
      </MDBCardHeader>
      <MDBCardBody>
        {activeTab === 'status' && (
          <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
            src="/plant.jpg" // Path relative to the public directory
            style={{ width: '70px',
            height: '70px',
            objectFit: 'cover',
            borderRadius: '50%',
            marginRight: '30px', }}
            />

            <MDBCardTitle style={{fontWeight: "Bold", fontSize: '28px', marginTop:'10px'}}>{plant.name}</MDBCardTitle></div>
            <Divider variant="fullWidth" style={{ marginTop:'10px' }} />
            <List
              sx={{
                width: '300px',
                maxWidth: 360,
                bgcolor: 'background.paper',
                marginTop: '10px',
                marginLeft: '30px',
                fontSize:'5px',// Add the following styles to ListItemText
                '& .MuiListItemText-primary': {
                  fontSize: '14px', // Adjust the fontSize as needed
                },
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: '#869e7a' }}>
                    <WaterIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ flex: '1' }}>
                      Humidity
                    </div>
                    <div> {/* Edit max value later */}
                      {plant.plantPreset.humidity} / 50
                    </div>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: '#869e7a' }}>
                    <WaterDropIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ flex: '1' }}>
                      Moisture
                    </div>
                    <div>
                      20/80
                    </div>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: '#869e7a' }}>
                    <DeviceThermostatIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ flex: '1' }}>
                    Temperature
                    </div>
                    <div>
                    50/50
                    </div>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: '#869e7a' }}>
                    <LightModeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ flex: '1' }}>
                    Light
                    </div>
                    <div>
                    70/70
                    </div>
                    </div>
                  }
                />
              </ListItem>
            </List>
            <div style={{ width: '180px', height: '130px', display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop: '-170px', marginLeft:'420px' }}>
              <ModelViewer scale="1" modelPath="flowertry10.gltf" />
              
            </div>
          </>
          
        )}

        {activeTab === 'information' && (
          <>
             
             <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
            src="/plant.jpg" // Path relative to the public directory
            style={{ width: '70px',
            height: '70px',
            objectFit: 'cover',
            borderRadius: '50%',
            marginRight: '30px', }}
            />

            <MDBCardTitle style={{fontWeight: "Bold", fontSize: '28px', marginTop:'10px'}}>{plant.name}</MDBCardTitle>
            <div style={{ marginRight: 'auto', alignSelf: 'flex-end' }}>
              <Button variant="solid" size="sm" style={{ backgroundColor: '#869e7a', color: 'white', marginLeft: '290px', marginTop: '0px' }}>
                Edit
              </Button>
              <Button variant="soft" size="sm" style={{ color: 'grey', marginLeft: '20px' }}>
                Delete
              </Button>
            </div>
            
            </div>
            
            <Divider variant="fullWidth" style={{ marginTop:'10px' }} />
            <List
              sx={{
                width: '300px',
                maxWidth: 360,
                bgcolor: 'background.paper',
                marginTop: '10px',
                marginLeft: '30px',
                fontSize:'5px',// Add the following styles to ListItemText
                '& .MuiListItemText-primary': {
                  fontSize: '14px', // Adjust the fontSize as needed
                },
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: '#869e7a' }}>
                    <WaterIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ flex: '1' }}>
                      Humidity
                    </div>
                    <div>
                      10/50
                    </div>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: '#869e7a' }}>
                    <WaterDropIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ flex: '1' }}>
                      Moisture
                    </div>
                    <div>
                      20/80
                    </div>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: '#869e7a' }}>
                    <DeviceThermostatIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ flex: '1' }}>
                    Temperature
                    </div>
                    <div>
                    50/50
                    </div>
                    </div>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: '#869e7a' }}>
                    <LightModeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ flex: '1' }}>
                    Light
                    </div>
                    <div>
                    70/70
                    </div>
                    </div>
                  }
                />
              </ListItem>
            </List>
            <div style={{marginTop: '50px', marginLeft:'0px', position: 'absolute' }}><WaterTank waterLevel={60}/></div>
            
          </>
        )}
      </MDBCardBody>
    </MDBCard>
  );
}
