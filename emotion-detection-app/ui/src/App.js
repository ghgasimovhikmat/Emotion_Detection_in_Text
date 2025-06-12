import React, { useState } from 'react';
import EmotionForm from './components/EmotionForm';
import PredictionResult from './components/PredictionResult';
import ProbabilityChart from './components/ProbabilityChart';

import emojiMap from './constants/emojiMap';
import axios from 'axios';
import './App.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  PieChart, Pie,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00bcd4', '#ff4444', '#4caf50', '#e91e63'];

function App() {
  const [text, setText] = useState('');
  const [activeMenu, setActiveMenu] = useState('Home');
  const [prediction, setPrediction] = useState(null);
  const [probabilities, setProbabilities] = useState([]);
  const [model, setModel] = useState('lr');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#2c3e50',
          color: '#ecf0f1',
          borderRadius: '5px',
          padding: '8px 12px',
          border: 'none'
        }}>
          <strong>{label || payload[0].name}</strong>
          <div>{`${(payload[0].value * 100).toFixed(1)}%`}</div>
        </div>
      );
    }
  
    return null;
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        text: text,
        model:model
      });

      setPrediction(response.data.emotion);
      setProbabilities(response.data.probabilities);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Menu</h2>
        <p
          style={{ cursor: 'pointer', fontWeight: activeMenu === 'Home' ? 'bold' : 'normal' }}
          onClick={() => setActiveMenu('Home')}
        >
          Home
        </p>
        <p
          style={{ cursor: 'pointer', fontWeight: activeMenu === 'Charts' ? 'bold' : 'normal' }}
          onClick={() => setActiveMenu('Charts')}
        >
          Charts
        </p>
      </aside>

      <main className="main-content">
        <header>
          <h1>Emotion Detection in Text</h1>
        </header>

        {activeMenu === 'Home' && (
          <>
          <div className="model-select">
  <label htmlFor="model" style={{ fontWeight: 'bold' }}>Select Model:</label>
  <select id="model" value={model} onChange={(e) => setModel(e.target.value)}>
    <option value="lr">Logistic Regression (Balanced)</option>
    <option value="nb">Naive Bayes (Balanced)</option>
    <option value="orig">Logistic Regression (Original)</option>
  </select>
</div>

            <EmotionForm text={text} setText={setText} handleSubmit={handleSubmit} />

            {prediction && (
              <>
                <PredictionResult text={text} prediction={prediction} />
                <ProbabilityChart probabilities={probabilities} prediction={prediction} />
              </>
            )}
          </>
        )}

{activeMenu === 'Charts' && (
  <div className="chart-section">
     <h3 style={{
      fontSize: '1.4rem',
      color: '#4da6ff',
      marginBottom: '1rem'
    }}>
      Emotion Detection - Charts
    </h3>
     {/* PREDICTION BOX */}
     {prediction && (
      <div style={{
        fontSize: '1.2rem',
        color: '#f0f0f0',
        marginBottom: '1.5rem',
        fontWeight: 'bold',
        padding: '10px 15px',
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.4)'
      }}>
        Prediction: {prediction} {emojiMap[prediction] || ''}
      </div>
    )}
    {/* PIE CHART */}
    <h3>Pie Chart</h3>
    <div className="chart">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart margin={{ top: 20, right: 50, bottom: 20, left: 50 }}>
          <Pie
            data={probabilities.map(item => ({ emotion: item.emotion, probability: item.probability }))}
            dataKey="probability"
            nameKey="emotion"
            innerRadius={60}
            outerRadius={110}
            label={({ emotion, percent }) => `${emotion}: ${(percent * 100).toFixed(0)}%`}
          
          >
            {probabilities.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
      {/* BAR CHART */}
      <h3>Bar Chart</h3>
    <div className="chart">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={probabilities.map(item => ({ emotion: item.emotion, probability: item.probability }))}
          layout="vertical"
          margin={{ top: 20, right: 50, bottom: 20, left: 50 }}
        >
          <XAxis type="number" hide />
          <YAxis dataKey="emotion" type="category" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="probability">
            {probabilities.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
 {/* RADAR CHART */}
 <h3>Radar Chart</h3>
    <div className="chart">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart
          outerRadius={90}
          data={probabilities.map(item => ({ emotion: item.emotion, probability: item.probability }))}
          margin={{ top: 20, right: 50, bottom: 20, left: 50 }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="emotion" />
          <PolarRadiusAxis />
          <Radar
            name="Emotion"
            dataKey="probability"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
            activeDot={{ r: 6 }} // 👈 this makes hover work perfectly!
          />
       <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </div>
)}
      </main>
    </div>
  );
}

export default App;
