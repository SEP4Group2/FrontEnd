import React, { useState, useEffect } from "react";
import PlantList from './components/PlantList/PlantList';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/SignUp/SignUp";
import LandingPage from "./components/LandingPage/LandingPage";
import MyProfile from "./components/MyProfile/MyProfile";
import PlantCarousel from "./components/PlantCarousel/PlantCarousel";

const App = () => {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  
  const [plants, setPlants] = useState([]);
  const [plantsData, setPlantsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          // Fetch plant data
          const plantResponse = await fetch(`http://20.67.215.134:5000/Plant/${user.userId}`);
          const plantsJson = await plantResponse.json();
          setPlants(plantsJson);

          // Fetch plant data
          const plantDataResponse = await fetch(`http://20.67.215.134:5000/PlantData/fetchPlantData/${user.userId}`);
          const plantDataJson = await plantDataResponse.json();
          
          if (plantDataJson.length > 0) {
            setPlantsData(plantDataJson);
          }

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      // Initial fetch
      fetchData();

      // Set up interval for subsequent fetches
      const fetchInterval = setInterval(fetchData, 3000);

      return () => {
        clearInterval(fetchInterval);
      };
    }
  }, [token, user]);

  return (
    <div>
      <Router>
      {user && user.userId !== null ? (
          <Navbar isAuthenticated={!!token} setToken={setToken} setUser={setUser} userId={user.userId}/>
        ) : (
          <Navbar isAuthenticated={!!token} setToken={setToken} setUser={setUser} />
        )}
        <div className="content-container">
          <Routes>
            <Route path="/login" element={<SignIn setToken={setToken} setUser={setUser} setLoading={setLoading} />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/loadPage" element={<LandingPage/>}/>
            {token ? (
              <>
                <Route path="/myProfile" element={<MyProfile user={user} setUser={setUser} setToken={setToken} />} />
                <Route
                  path="/myPlants"
                  element={<PlantList plants={plants} userId={user.userId} plantsData={plantsData} loading={loading} />}
                />
                <Route path="/analytics" element={<PlantCarousel plants={plants} />} />
                <Route path="/" element={<Navigate to="/myPlants" />} />
              </>
            ) : (
              <Route path="/" element={<Navigate to="/loadPage" />} />
            )}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
