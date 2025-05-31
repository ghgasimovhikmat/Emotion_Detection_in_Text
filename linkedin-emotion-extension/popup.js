document.addEventListener('DOMContentLoaded', () => {
    const statusEl = document.getElementById("api-status");
    const emotionEl = document.getElementById("last-emotion");
  
    if (!chrome.storage) {
      statusEl.textContent = "Storage API unavailable ❌";
      return;
    }
  
    chrome.storage.local.get(["lastEmotion"], (result) => {
      if (chrome.runtime.lastError) {
        statusEl.textContent = "Error ❌";
        return;
      }
  
      const data = result.lastEmotion;
      if (data && data.emotion) {
        statusEl.textContent = "Online ✅";
        emotionEl.textContent = data.emotion || "Unknown";
      } else {
        statusEl.textContent = "Waiting…";
        emotionEl.textContent = "None yet";
      }
    });
  });
  