// Enhanced App.jsx: Background Styling + Professional Layout

import React, { useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE", "#AA336A", "#8884d8", "#FF4444", "#66BB6A", "#FFA726"];

const EMOJI_MAP = {
  anger: "😠",
  disgust: "🤮",
  fear: "😨",
  happy: "😊",
  joy: "😂",
  neutral: "😐",
  sadness: "😔",
  shame: "😳",
  surprise: "😮"
};

export default function App() {
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState('');
  const [confidence, setConfidence] = useState(null);
  const [probs, setProbs] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/predict', { text });
      setEmotion(res.data.emotion);
      setProbs(res.data.probabilities);
      const max = Math.max(...res.data.probabilities.map(p => p.probability));
      setConfidence(max);
    } catch (err) {
      alert("Prediction failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-blue-100 p-10 text-gray-800">
      <h1 className="text-5xl font-extrabold text-center text-blue-800 mb-12 tracking-tight drop-shadow">Emotion Detection</h1>

      <div className="flex flex-col md:flex-row gap-10 justify-between items-start">

        {/* Left Column - Charts */}
        <div className="w-full md:w-2/3 space-y-8">

          {emotion && (
            <div className="text-center mb-6 bg-white p-4 rounded shadow-lg">
              <h2 className="text-2xl font-semibold">Detected Emotion:</h2>
              <p className="text-4xl text-purple-700 font-bold mt-1">
                {emotion} {EMOJI_MAP[emotion] || ''}
              </p>
              {confidence && (
                <p className="text-md text-gray-600 mt-1">
                  Confidence: <strong>{(confidence * 100).toFixed(1)}%</strong>
                </p>
              )}
            </div>
          )}

          {probs.length > 0 && (
            <>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-center font-semibold mb-2">Bar Chart</h3>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={probs} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="emotion" type="category" />
                    <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
                    <Bar dataKey="probability">
                      {probs.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-center font-semibold mb-2">Donut Chart</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={probs} dataKey="probability" nameKey="emotion" innerRadius={50} outerRadius={80} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                      {probs.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-center font-semibold mb-2">Radar Chart</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart outerRadius={90} data={probs}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="emotion" />
                    <PolarRadiusAxis />
                    <Radar name="Emotion" dataKey="probability" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>

        {/* Right Column - Input Form */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded shadow-md">
          <textarea
            className="w-full p-4 border border-gray-300 rounded mb-4 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded shadow"
          >
            Analyze Emotion
          </button>

        
       
        </div>
      </div>
    </div>
  );
}
