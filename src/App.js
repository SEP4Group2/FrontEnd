// App.js
import React from 'react';
import PlantList from './components/PlantList/PlantList';  // Adjust the path accordingly

const App = () => {
  // Define an array of plants (you can replace this with your actual data)
  const plants = [
    { id: 1, name: 'Plant 1' },
    { id: 2, name: 'Plant 2' },
    { id: 3, name: 'Plant 3' },
    { id: 4, name: 'Plant 4' },
    { id: 5, name: 'Plant 5' },
    { id: 6, name: 'Plant 6' },
  ];

  return (
    <div>
      <h1>Plant List</h1>
      <PlantList plants={plants} />
    </div>
  );
};

export default App;
