import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import ApexCharts from "react-apexcharts";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const Analytics = () => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);
  const [expanded, setExpanded] = useState(null);

  const fetchData = async (plantId) => {
    try {
      const response = await Axios.get(`http://localhost:5000/Analytics/${plantId}`);
      
      // Transform the fetched data into the desired format
      const transformedData = response.data.map(item => ({
        date: item.date,
        avgTemperature: item.avgTemperature,
        avgHumidity: item.avgHumidity,
        avgUVLight: item.avgUVLight,
        avgMoisture: item.avgMoisture,
      }));

      setChartData(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    //change to actual id of user
    fetchData('1');
  }, []); // Empty dependency array 

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : null);
    if (chartRef.current) {
      chartRef.current.chart.clearAnnotations();
    }
  };

  // Create series based on the chartData
  const series = [
    { name: 'avgTemperature', data: [] },
    { name: 'avgHumidity', data: [] },
    { name: 'avgUVLight', data: [] },
    { name: 'avgMoisture', data: [] },
  ];

  chartData.forEach(item => {
    series[0].data.push({ x: item.date, y: item.avgTemperature });
    series[1].data.push({ x: item.date, y: item.avgHumidity });
    series[2].data.push({ x: item.date, y: item.avgUVLight });
    series[3].data.push({ x: item.date, y: item.avgMoisture });
  });

  return (
    <div>
      {series.map((chart, index) => (
        <Accordion
          key={index}
          expanded={expanded === chart.name}
          onChange={handleChange(chart.name)}
        >
          <AccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon />}
            aria-controls={`${chart.name}-content`}
            id={`${chart.name}-header`}
          >
            <Typography>{chart.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <ApexCharts
                ref={chartRef}
                options={{
                  xaxis: {
                    type: "category",
                    categories: chart.data.map((point) => point.x),
                    labels: {
                      formatter: function (value) {
                        return value && !value.endsWith(" ")
                          ? `${value}`
                          : value;
                      },
                    },
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shadeIntensity: 1,
                      opacityFrom: 0.95,
                      opacityTo: 0.94,
                      stops: [0, 100],
                    },
                  },
                  colors: [chart.color],
                  annotations: {
                    points: [], 
                  },
                }}
                series={[{ name: chart.name, data: chart.data }]}
                type="area"
                height={160}
              />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Analytics;
