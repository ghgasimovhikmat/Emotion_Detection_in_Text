# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np



#model = joblib.load("./models/balanced_dataset_logisticr_model.pkl")
#model = joblib.load("./models/balanced_dataset_naivebayes_model.pkl")
#model = joblib.load("./models/original_dataset_logisticr_model.pkl")
# Flask app setup
app = Flask(__name__)
CORS(app)
models = {
    "lr": joblib.load("./models/balanced_dataset_logisticr_model.pkl"),
    "nb": joblib.load("./models/balanced_dataset_naivebayes_model.pkl"),
    "orig": joblib.load("./models/original_dataset_logisticr_model.pkl")
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '')
    model_type = data.get('model', 'lr')  # default to 'lr'

    model = models.get(model_type)
    if not model:
        return jsonify({'error': 'Invalid model type'}), 400

    prediction = model.predict([text])[0]
    probabilities = model.predict_proba([text])[0]
    labels = model.classes_

    return jsonify({
        'emotion': prediction,
        'probabilities': [
            {'emotion': label, 'probability': float(prob)}
            for label, prob in zip(labels, probabilities)
        ]
    })
if __name__ == '__main__':
    app.run(debug=True, port=5000)
