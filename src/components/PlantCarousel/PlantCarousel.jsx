import React, { useState} from 'react';
import Box from '@mui/material/Box';
import PlantCardCarousel from './PlantCardCarousel'; // Replace with the actual import path for your PlantCardCarousel component
import ApexCharts from 'react-apexcharts';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PlantCarousel = ({ plants }) => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [expandedCharts, setExpandedCharts] = useState({
        Temperature: false,
        Humidity: false,
        Moisture: false,
        UVLight: false,
    });

    const fetchData = async (plantId) => {
            try {
              const response = await fetch("http://localhost:5000/Analytics/"+plantId);
              if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                  const analytics = data;
                  setAnalyticsData([analytics]);
                }
              } else {
                throw new Error('Network response was not ok');
              }
            } catch (error) {
              console.error("Error fetching analytics:", error);
            }
          };

    const toggleChartExpansion = (chartType) => {
        setExpandedCharts((prevExpandedCharts) => ({
            ...prevExpandedCharts,
            [chartType]: !prevExpandedCharts[chartType],
        }));
    };

    const renderCharts = () => {
        return analyticsData.map((chart, index) => (
            <div key={index} style={{ marginBottom: '20px', marginTop: '20px' }}>
                <Accordion style={{marginTop: "20px"}} expanded={expandedCharts['Temperature']} onChange={() => toggleChartExpansion('Temperature')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div style={{ cursor: 'pointer' }}>{`Temperature`}</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        {expandedCharts['Temperature'] && (
                            <ApexCharts
                                options={{
                                    xaxis: {
                                        type: 'category',
                                        categories: chart.map(point => point.date),
                                    },
                                    fill: {
                                        type: 'gradient',
                                        gradient: {
                                            shadeIntensity: 1,
                                            opacityFrom: 0.95,
                                            opacityTo: 0.94,
                                            stops: [0, 100],
                                        },
                                    },
                                    colors: ['#008FFB'],
                                    annotations: {
                                        points: [],
                                    },
                                }}
                                series={[
                                    {
                                        name: 'Temperature',
                                        data: chart.map(point => point.avgTemperature),
                                    },
                                ]}
                                type="area"
                                height={160}
                            />
                        )}
                    </AccordionDetails>
                </Accordion>
                <Accordion style={{marginTop: "20px"}} expanded={expandedCharts['Moisture']} onChange={() => toggleChartExpansion('Moisture')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div style={{ cursor: 'pointer' }}>{`Moisture`}</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        {expandedCharts['Moisture'] && (
                            <ApexCharts
                                options={{
                                    xaxis: {
                                        type: 'category',
                                        categories: chart.map(point => point.date),
                                    },
                                    fill: {
                                        type: 'gradient',
                                        gradient: {
                                            shadeIntensity: 1,
                                            opacityFrom: 0.95,
                                            opacityTo: 0.94,
                                            stops: [0, 100],
                                        },
                                    },
                                    colors: ['#008FFB'],
                                    annotations: {
                                        points: [],
                                    },
                                }}
                                series={[
                                    {
                                        name: 'Moisture',
                                        data: chart.map(point => point.avgMoisture),
                                    },
                                ]}
                                type="area"
                                height={160}
                            />
                        )}
                    </AccordionDetails>
                </Accordion>
                <Accordion style={{marginTop: "20px"}} expanded={expandedCharts['Humidity']} onChange={() => toggleChartExpansion('Humidity')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div style={{ cursor: 'pointer' }}>{`Humidity`}</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        {expandedCharts['Humidity'] && (
                            <ApexCharts
                                options={{
                                    xaxis: {
                                        type: 'category',
                                        categories: chart.map(point => point.date),
                                    },
                                    fill: {
                                        type: 'gradient',
                                        gradient: {
                                            shadeIntensity: 1,
                                            opacityFrom: 0.95,
                                            opacityTo: 0.94,
                                            stops: [0, 100],
                                        },
                                    },
                                    colors: ['#008FFB'],
                                    annotations: {
                                        points: [],
                                    },
                                }}
                                series={[
                                    {
                                        name: 'Humidity',
                                        data: chart.map(point => point.avgHumidity),
                                    },
                                ]}
                                type="area"
                                height={160}
                            />
                        )}
                    </AccordionDetails>
                </Accordion>
                <Accordion style={{marginTop: "20px"}} expanded={expandedCharts['UVLight']} onChange={() => toggleChartExpansion('UVLight')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div style={{ cursor: 'pointer' }}>{`UV Light`}</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        {expandedCharts['UVLight'] && (
                            <ApexCharts
                                options={{
                                    xaxis: {
                                        type: 'category',
                                        categories: chart.map(point => point.date),
                                    },
                                    fill: {
                                        type: 'gradient',
                                        gradient: {
                                            shadeIntensity: 1,
                                            opacityFrom: 0.95,
                                            opacityTo: 0.94,
                                            stops: [0, 100],
                                        },
                                    },
                                    colors: ['#008FFB'],
                                    annotations: {
                                        points: [],
                                    },
                                }}
                                series={[
                                    {
                                        name: 'UVLight',
                                        data: chart.map(point => point.avgUVLight),
                                    },
                                ]}
                                type="area"
                                height={160}
                            />
                        )}
                    </AccordionDetails>
                </Accordion>
            </div>
        ));
    };
        return (
            <div>
                <Box
                    display="flex"
                    flexDirection="row"
                    width="100%"
                    style={{ height: '200px', whiteSpace: 'nowrap', overflowY: 'hidden' }}
                >
                    {plants.map((plant, index) => (
                        <Box key={index} display="inline-block" width="320px" marginRight="20px">
                            <PlantCardCarousel plant={{ id: plant.id, name: `${plant.name}` }} onView={() => fetchData(plant.id)} />
                        </Box>
                    ))}
                </Box>
    
                {analyticsData && analyticsData.length > 0 && renderCharts()}
            </div>
        );
};

export default PlantCarousel;
