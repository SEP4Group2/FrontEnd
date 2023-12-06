import React, { useState, useEffect } from "react";
import PlantList from './components/PlantList/PlantList';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/SignUp/SignUp";

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(0);
  const [plants, setPlants] = useState([]);
  const [plantsData, setPlantsData] = useState([{plantId: 0, moisture: 0, humidity: 0, uvLight: 0, temperature: 0, tankLevel: 0}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(token)
    {
      const fetchData = async () => {
        try {
          const plantResponse = await axios.get("http://localhost:5000/Plant/"+user.userId);
          setPlants(plantResponse.data);
  
          const plantDataResponse = await axios.get("http://localhost:5000/PlantData/fetchPlantData/"+user.userId);
          if (plantDataResponse.data.length > 0)
            setPlantsData(plantDataResponse.data);
  
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      const fetchInterval = setInterval(fetchData, 3000);
  
      return () => {
        clearInterval(fetchInterval);
      };
    };
  });
  return (
    <div>
      <Router>
        <Navbar isAuthenticated={!!token} />
        <div className="content-container">
          <Routes>
            <Route path="/login" element={<SignIn setToken={setToken} setUser={setUser} />} />
            <Route path="/register" element={<SignUp />} />
            {token ? (
              <>
                <Route
                  path="/myPlants"
                  element={<PlantList plants={plants} userId={user.userId} plantsData={plantsData} loading={loading}/>}
                />
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
