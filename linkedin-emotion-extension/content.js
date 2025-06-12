let lastValue = '';
let lastModel = '';

// Prediction logic extracted into a function
function analyzeText(text) {
  chrome.storage.local.get(["selectedModel"], (result) => {
    const model = result.selectedModel || "lr";

    // Don't re-run if model and text are unchanged
    if (text === lastValue && model === lastModel) return;

    lastModel = model;

    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Emotion:", data.emotion);
      chrome.storage.local.set({
        lastEmotion: {
          emotion: data.emotion,
          timestamp: Date.now()
        }
      });

      const input = document.querySelector('[contenteditable="true"]');
      if (input) {
        input.style.border = "2px solid #4A90E2";
        input.title = `Detected Emotion: ${data.emotion}`;
      }
    })
    .catch(err => console.error("Emotion detection error:", err));
  });
}

setInterval(() => {
  const input = document.querySelector('[contenteditable="true"]');
  if (input && input.innerText.trim() !== lastValue.trim()) {
    lastValue = input.innerText;
    analyzeText(lastValue);
  }
}, 3000);

//  Listen to popup model change and re-run prediction
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "MODEL_CHANGED") {
    const input = document.querySelector('[contenteditable="true"]');
    if (input && input.innerText.trim()) {
      analyzeText(input.innerText.trim());
    }
  }
});
