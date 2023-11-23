import React from 'react';
import './WaterTank.css';
 
const WaterTank = ({ waterLevel }) => {
  return (
    <div className="water-tank">
      <div className="water-level" style={{ height: `${waterLevel}%` }}></div>
      <div className="tank"></div>
      <p className="water-tank-label">Water tank</p>
    </div>
  );
};
 
export default WaterTank;