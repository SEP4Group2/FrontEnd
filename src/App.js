import React, { useState, useEffect } from "react";
import PlantList from './components/PlantList/PlantList';
import Navbar from './components/Navbar/Navbar';
import RegisterPlant from './components/RegisterPlant/RegisterPlant';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import './App.css'; // Import the CSS file for styling
import axios from 'axios';

const App = () => {
  const [plants, setPlants] = useState([]);

  const fetchPlants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Plant");
      setPlants(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  // Fetch plants initially
  useEffect(() => {
    fetchPlants();
  }, []);

  // Fetch plants every 5 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchPlants();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <HashRouter>
        <Navbar />
        {/* Container for adjusting margins and paddings */}
        <div className="content-container">
          <Routes>
            <Route
              exact
              path="/myPlants"
              element={<PlantList plants={plants} />}
            ></Route>
            <Route path="/newPlant" element={<RegisterPlant />}></Route>
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
