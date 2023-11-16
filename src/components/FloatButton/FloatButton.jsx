// FloatButton.js
import React from 'react';
import './FloatButton.css'; // Import your component's CSS if needed

const FloatButton = () => {
  return (
    <div className="float-button-container">
      <button className="float-button" onClick={() => console.log('Button clicked')}>
        +
      </button>
    </div>
  );
};

export default FloatButton;
