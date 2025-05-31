# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# ✅ Load your trained model here
# Replace the path below with your actual model filename
model = joblib.load("./models/emotion_classifier_pipe_lr1")

# Flask app setup
app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'No input text provided'}), 400

    # Predict emotion
    prediction = model.predict([text])[0]
    probabilities = model.predict_proba([text])[0]
    labels = model.classes_

    proba_list = [
        {'emotion': label, 'probability': float(prob)}
        for label, prob in zip(labels, probabilities)
    ]

    return jsonify({
        'emotion': prediction,
        'probabilities': proba_list
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
