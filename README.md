# Emotion Detection App

This project is a full-stack application for detecting emotions in user-written text. It includes:

- A **Flask backend API** serving multiple ML models.
- A **React-based web UI** for users to submit text and view results visually.
- A **LinkedIn Chrome Extension** that detects emotions from typed LinkedIn posts.

---

##  Project Structure

emotion-app/
├── backend/ # Flask API + ML models
├── ui/ # React UI
└── linkedin-emotion-extension/ # LinkedIn Chrome extension

---

## 01. Backend – Flask API

### Description
The backend is a Flask API that loads multiple trained emotion classification models and predicts the emotion and probabilities for a given text input.

### Features
- Exposes a `/predict` endpoint
- Accepts text input and a model selector (`lr`, `nb`, `orig`)
- Returns predicted emotion and probability distribution
- Supports Logistic Regression & Naive Bayes models

### Technologies Used
- Python
- Flask & Flask-CORS
- Scikit-learn
- Joblib
- NumPy & Pandas

### Example Request
json
POST /predict
{
  "text": "I can't stop smiling!",
  "model": "lr"
}


## 02 Frontend – React Web App UI

- Description
The frontend is a React web app allowing users to input text, choose a model, and view predictions alongside visualizations.

- Features
Model selector (Logistic Regression, Naive Bayes, Original)

Real-time predictions via API

- Visual charts: Pie, Bar, and Radar

Clean and responsive UI (dark theme)

Technologies Used
React with Hooks (useState)

Axios for HTTP requests

Recharts for data visualization

CSS for custom styling

- Visuals
Two cards: one for entered text, one for emotion prediction

Charts show emotion probabilities clearly


## 03. LinkedIn Chrome Extension
- Description
This extension monitors text typed in LinkedIn posts and automatically detects emotions using the same backend API.

- Features
Detects text typed into <contenteditable> fields on LinkedIn

Sends text to the /predict endpoint

Model can be selected via dropdown in the popup

Uses Chrome Storage to store last emotion and model

- Technologies Used
Chrome Extension (Manifest V3)

JavaScript (popup.js, content.js)

Chrome Storage API

Flask API integration

Files
manifest.json

popup.html, popup.js

content.js


## 04 Running the App
1. Backend (Flask)

cd backend/
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
2. Frontend (React)

cd ui/
npm install
npm start
3. Chrome Extension
Open chrome://extensions

Enable Developer Mode

Click Load unpacked

Select the linkedin-emotion-extension/ folder

Open LinkedIn and begin typing to see detection in the popup

- Requirements File Check
Your requirements.txt for the backend is correct and includes all necessary libraries:



blinker==1.9.0
click==8.2.0
colorama==0.4.6
Flask==3.1.1
flask-cors==5.0.1
itsdangerous==2.2.0
Jinja2==3.1.6
joblib==1.5.0
MarkupSafe==3.0.2
numpy==2.2.5
pandas==2.2.3
python-dateutil==2.9.0.post0
pytz==2025.2
scikit-learn==1.6.1
scipy==1.15.3
six==1.17.0
threadpoolctl==3.6.0
tzdata==2025.2
Werkzeug==3.1.3
