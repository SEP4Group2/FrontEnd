import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './LandingPage.css'; // Import your custom CSS for styling
import Image from '../../assets/plantLanding.jpg';
import Image2 from '../../assets/TeamLanding.jpg';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import "./LandingPage.css"
const tiers = [
  {
    title: 'Life-cycle reports',
    description: [
      'Keep up-to-date with',
      'the health of your plant',
      'using our sensors.',
    ],
  },
  {
    title: 'Real-time monitoring',
    description: [
      'Temperature, light,',
      'water, humidity, soil..',
      'All sensors you need',
      'in only one device.',
    ],
  },
  {
    title: 'Optimized watering',
    description: [
      'Ensure your plants receive ',
      'the right amount of water',
      ' at the right time.',
    ],
  },
];

const defaultTheme = createTheme();

export default function LandingPage() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>

    
     
          <div className="landing-page-box">
          <div>
            <div className="landing-page-text">
              Empower your plants
            </div>
<div>
<div className="landing-page-description">
              Join thousands of happy plant owners who have already embraced the future of plants. Our easy-to-use Plant Sensor System is ready to transform your garden into a thriving oasis.
            </div>
          </div>
          </div>
          <img
              src={Image}
              alt="Plant Landing"
              className="landing-page-image"
            />
           
        </div>
           

            
          
       

        <div>
  <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 5, pb: 6 }}>
    <Typography
      component="h1"
      fontFamily={'Jomolhari'}
      variant="h2"
      align="center"
      color="text.primary"
      gutterBottom
    >
    </Typography>
  </Container>

  <Container maxWidth="md" component="main">
    <Grid container spacing={3} alignItems="flex-end" >
      {tiers.map((tier) => (
        <Grid
          item
          key={tier.title}
          xs={12}
          sm={tier.title === 'Enterprise' ? 12 : 6}
          md={4}
        >
          <Card>
            <CardHeader
              title={tier.title}
              subheader={tier.subheader}
              titleTypographyProps={{ align: 'center', fontFamily: 'Jomolhari' }}
              action={tier.title === 'Pro'}
              subheaderTypographyProps={{ align: 'center', fontFamily: 'Jomolhari' }}
              sx={{
                backgroundColor: 'rgb(193, 225, 193)',
              }}
            />
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'baseline',
                  mb: 2,
                }}
              >
               
              </Box>
              <ul>
                  {tier.description.map((line, index) => (
                   
                    <li
                    key={index}
                    style={{
                      fontFamily: 'Jomolhari',
                      textAlign: 'center',
                      overflow: 'visible',
                      whiteSpace: 'normal',
                      listStyle: 'none', // Remove default list styles
                    }}
                  >
                    {line}
               </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
</div>
      
          
            <img
              src={Image2}
              alt="Team Landing"
              className="landing-page-about-image"
            />

            <div className="landing-page-about-text">
              <div className="landing-page-about-title">
                About us
              </div>
              <div className="landing-page-about-description">
                We are a dedicated team crafting a plant wellness system.
                Our innovation combines diverse sensors to monitor plant health,
                presenting insightful data. Our mission is to empower individuals
                with a deeper understanding of their plants, fostering proper care and nurturing.
              </div>
            </div>
          
        
      </ThemeProvider>
    </>
  );
}
