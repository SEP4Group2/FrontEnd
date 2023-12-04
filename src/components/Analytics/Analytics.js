
import React, { useState, useEffect, useRef } from "react";
import ApexCharts from "react-apexcharts";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const Analytics = () => {
  const chartData = [
    {
      id: 'humidity',
      name: 'Humidity',
      series: [
        { x: "Nov 04 00", y: 40 },
        { x: "Nov 04 01", y: 50 },
        { x: "Nov 04 02", y: 45 },
        { x: "Nov 04 03", y: 55 },
        { x: "Nov 04 04", y: 60 },
        { x: "Nov 04 05", y: 65 },
      ],
      color: '#FF5733',
    },
    {
      id: 'moisture',
      name: 'Moisture',
      series: [
        { x: "Nov 04 00", y: 60 },
        { x: "Nov 04 01", y: 70 },
        { x: "Nov 04 02", y: 65 },
        { x: "Nov 04 03", y: 75 },
        { x: "Nov 04 04", y: 80 },
        { x: "Nov 04 05", y: 40 },
      ],
      color: '#33FF57',
    },
    {
      id: 'temperature',
      name: 'Temperature',
      series: [
        { x: "Nov 04 00", y: 80 },
        { x: "Nov 04 01", y: 90 },
        { x: "Nov 04 02", y: 85 },
        { x: "Nov 04 03", y: 95 },
        { x: "Nov 04 04", y: 100 },
        { x: "Nov 04 05", y: 57 },
      ],
      color: '#5733FF',
    },
    {
      id: 'uv-light',
      name: 'UV Light',
      series: [
        { x: "Nov 04 00", y: 100 },
        { x: "Nov 04 01", y: 110 },
        { x: "Nov 04 02", y: 105 },
        { x: "Nov 04 03", y: 115 },
        { x: "Nov 04 04", y: 120 },
        { x: "Nov 04 05", y: 112 },
      ],
      color: '#FFE833',
    },
  ];

  const chartRef = useRef(null);
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : null);
    if (chartRef.current) {
      chartRef.current.chart.clearAnnotations();
    }
  };

  return (
    <div>
      {chartData.map((chart, index) => (
        <Accordion
          key={index}
          expanded={expanded === chart.id}
          onChange={handleChange(chart.id)}
        >
          <AccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon />}
            aria-controls={`${chart.id}-content`}
            id={`${chart.id}-header`}
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
                    categories: chart.series.map((point) => point.x),
                    labels: {
                      formatter: function (value) {
                        return value && !value.endsWith(" ")
                          ? `${value}h`
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
                    points: [], // Clear annotations
                  },
                }}
                series={[
                  {
                    name: chart.id,
                    data: chart.series.map((point) => ({
                      x: point.x,
                      y: point.y,
                    })),
                  },
                ]}
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


