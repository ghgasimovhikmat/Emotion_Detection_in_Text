document.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.getElementById("api-status");
  const emotionEl = document.getElementById("last-emotion");
  const modelSelect = document.getElementById("model");

  if (!chrome.storage) {
    statusEl.textContent = "Storage API unavailable ❌";
    return;
  }

  // Load previous values
  chrome.storage.local.get(["lastEmotion", "selectedModel"], (result) => {
    if (chrome.runtime.lastError) {
      statusEl.textContent = "Error ❌";
      return;
    }

    const emotionData = result.lastEmotion;
    if (emotionData && emotionData.emotion) {
      statusEl.textContent = "Online ✅";
      emotionEl.textContent = emotionData.emotion || "Unknown";
    }

    if (result.selectedModel) {
      modelSelect.value = result.selectedModel;
    }
  });

  // Save selected model and force re-prediction
  modelSelect.addEventListener("change", () => {
    const newModel = modelSelect.value;

    chrome.storage.local.set({ selectedModel: newModel }, () => {
      // Inject a message to content.js to re-run immediately
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, { type: "MODEL_CHANGED" });
        }
      });
    });
  });
});
