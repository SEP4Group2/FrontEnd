import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const Analytics = () => {
  const dummyData1 = [
    { x: "2023-12-04T00:00:00", y: 20 },
    { x: "2023-12-04T01:00:00", y: 30 },
    // Add more data as needed
  ];

  const dummyData2 = [
    { x: "2023-12-04T00:00:00", y: 40 },
    { x: "2023-12-04T01:00:00", y: 50 },
    // Add more data as needed
  ];

  const dummyData3 = [
    { x: "2023-12-04T00:00:00", y: 60 },
    { x: "2023-12-04T01:00:00", y: 70 },
    // Add more data as needed
  ];

  const dummyData4 = [
    { x: "2023-12-04T00:00:00", y: 80 },
    { x: "2023-12-04T01:00:00", y: 90 },
    // Add more data as needed
  ];

  const [chartData, setChartData] = useState([
    {
      series: [{ data: dummyData1 }],
      options: { chart: { id: 'fb', group: 'social', type: 'line', height: 160 }, colors: ['#008FFB'] },
    },
    {
      series: [{ data: dummyData2 }],
      options: { chart: { id: 'tw', group: 'social', type: 'line', height: 160 }, colors: ['#546E7A'] },
    },
    {
      series: [{ data: dummyData3 }],
      options: { chart: { id: 'yt', group: 'social', type: 'area', height: 160 }, colors: ['#00E396'] },
    },
    {
      series: [{ data: dummyData4 }],
      options: { chart: { id: 'ig', group: 'social', type: 'area', height: 160, width: 300 }, colors: ['#008FFB'] },
    },
  ]);

  useEffect(() => {
    // Set up an interval to update the charts every 5000 milliseconds (5 seconds)
    const intervalId = setInterval(() => {
      // Dummy data remains static, no need to update
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {chartData.map((chart, index) => (
        <div key={index}>
          <ApexCharts
            options={{
              ...chart.options,
              xaxis: {
                type: "datetime",
                labels: {
                  datetimeFormatter: {
                    month: "MMM",
                    day: "dd",
                    hour: "HH",
                    minute: "mm",
                  },
                },
              },
            }}
            series={chart.series}
            type={chart.options.chart.type}
            height={chart.options.chart.height}
          />
        </div>
      ))}
    </div>
  );
};

export default Analytics;
