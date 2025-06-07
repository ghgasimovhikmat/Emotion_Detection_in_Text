import React from 'react';
import emojiMap from '../constants/emojiMap';

const ProbabilityChart = ({ probabilities, prediction }) => {
  return (
    <div className="chart-section">
      <h3 style={{
        fontSize: '1.4rem',
        color: '#4da6ff',
        marginBottom: '0.5rem'
      }}>
        Prediction Probability
      </h3>

      {prediction && (
        <div style={{
          fontSize: '1.1rem',
          color: '#f0f0f0',
          marginBottom: '1rem',
          fontWeight: 'bold'
        }}>
          Prediction: {prediction} {emojiMap[prediction] || ''}
        </div>
      )}

      <div className="chart">
        {probabilities.map((item) => (
          <div key={item.emotion} className="bar-container" style={{
            display: 'flex',
            alignItems: 'center',
            margin: '0.7rem 0'
          }}>
            <span className="label" style={{
              width: '90px',
              textTransform: 'capitalize',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#f0f0f0'
            }}>
              {item.emotion}
            </span>

            <div style={{
              position: 'relative',
              flex: 1,
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              overflow: 'hidden',
              height: '22px'
            }}>
              <div
                style={{
                  width: `${item.probability * 100}%`,
                  height: '100%',
                  backgroundColor: item.emotion === prediction ? '#ff3333' : '#00bcd4',
                  transition: 'width 0.4s ease',
                  borderRadius: '8px'
                }}
              ></div>
              <div style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {(item.probability * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ProbabilityChart;
