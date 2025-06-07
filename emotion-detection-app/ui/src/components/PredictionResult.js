import React from 'react';

import emojiMap from '../constants/emojiMap';


const PredictionResult = ({ text, prediction }) => {
  return (
    <div className="result-section">
      <div className="card">
        <h3>Original Text</h3>
        <p>{text}</p>
      </div>

      <div className="card">
        <h3>Prediction</h3>
        <p>
          {prediction}: {emojiMap[prediction] || ''}
        </p>
      </div>
    </div>
  );
};

export default PredictionResult;
