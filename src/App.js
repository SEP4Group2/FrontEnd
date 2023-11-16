import React from 'react';
import PlantList from './components/PlantList/PlantList';
import Navbar from './components/Navbar/Navbar';
import RegisterPlant from './components/RegisterPlant/RegisterPlant';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const plants = [
    { id: 1, name: 'Plant 1' },
    { id: 2, name: 'Plant 2' },
    { id: 3, name: 'Plant 3' },
    { id: 4, name: 'Plant 4' },
    { id: 5, name: 'Plant 5' },
    { id: 6, name: 'Plant 6' },
    { id: 1, name: 'Plant 1' },
    { id: 2, name: 'Plant 2' },
    { id: 3, name: 'Plant 3' },
    { id: 4, name: 'Plant 4' },
    { id: 5, name: 'Plant 5' },
    { id: 6, name: 'Plant 6' },
  ];

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
