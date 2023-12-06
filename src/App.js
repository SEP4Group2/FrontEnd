import React, { useState, useEffect } from "react";
import PlantList from './components/PlantList/PlantList';
import Navbar from './components/Navbar/Navbar';
import RegisterPlant from './components/RegisterPlant/RegisterPlant';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/SignUp/SignUp";

const App = () => {
  const [token, setToken] = useState();
  const [plants, setPlants] = useState([]);
  const [plantsData, setPlantsData] = useState([{plantId: 0, moisture: 0, humidity: 0, uvLight: 0, temperature: 0, tankLevel: 0}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const fetchPlants = async () => {
        try {
          
          const plantResponse = await axios.get("http://localhost:5000/Plant/1");
          setPlants(plantResponse.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching plants:", error);
        }
      };

      const fetchPlantsData = async () => {
        try
        {
          const plantDataResponse = await axios.get("http://localhost:5000/PlantData/fetchPlantData/1");
          if(plantDataResponse.data.length > 0)
          setPlantsData(plantDataResponse.data);
        }
        catch (error)
        {
          console.error("Error fetching plants data:", error);
        }
      };

      const fetchInterval = setInterval(fetchPlants, 5000); // Fetch plants every 5 minutes
      const dataInterval = setInterval(fetchPlantsData, 5000); // Fetch data every 5 seconds

      // Cleanup intervals on component unmount
      return () => {
        clearInterval(fetchInterval);
        clearInterval(dataInterval);
      };
    }
  }); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <Router>
        <Navbar isAuthenticated={!!token} />
        <div className="content-container">
          <Routes>
            <Route path="/login" element={<SignIn setToken={setToken} />} />
            <Route path="/register" element={<SignUp />} />
            {token ? (
              <>
                <Route
                  path="/myPlants"
                  element={<PlantList plants={plants} plantsData={plantsData} loading={loading}/>}
                />
                <Route path="/newPlant" element={<RegisterPlant />} />
                <Route path="/" element={<Navigate to="/myPlants" />} />
              </>
            ) : (
              <Route path="/" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
