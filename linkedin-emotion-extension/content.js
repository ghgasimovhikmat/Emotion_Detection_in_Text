let lastValue = '';

setInterval(() => {
  const input = document.querySelector('[contenteditable="true"]');

  if (input && input.innerText !== lastValue) {
    lastValue = input.innerText;

    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: lastValue })
    })
    .then(res => res.json())
    .then(data => {
      console.log("🧠 Emotion:", data.emotion);
      console.log("📊 Probabilities:", data.probabilities);

      // 🔵 Save to storage for popup access
      chrome.storage.local.set({
        lastEmotion: {
          emotion: data.emotion,
          timestamp: Date.now()
        }
      });

      // Optional UI highlight
      input.style.border = "2px solid #4A90E2";
      input.title = `Detected Emotion: ${data.emotion}`;
    })
    .catch(err => console.error("Emotion detection error:", err));
  }
}, 2000); // check every 2 seconds
