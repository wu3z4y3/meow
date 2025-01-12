chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.storage.local.get('websites', (result) => {
      const savedWebsites = result.websites || [];
      const currentUrl = tab.url || '';

      const isMatch = savedWebsites.some((website) => currentUrl.includes(website));
      if (isMatch) {
        fetch("http://localhost:3000/motivational-text")
          .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
          })
          .then((data) => {
            chrome.storage.local.set({ motivationalText: data.text }, () => {
              chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['content.js'],
              });
            });
          })
          .catch((error) => console.error("Error fetching new motivational text:", error));
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "closeTab") {
    if (sender.tab && sender.tab.id) {
      chrome.tabs.remove(sender.tab.id, () => {
        if (chrome.runtime.lastError) {
          console.error("Error closing tab:", chrome.runtime.lastError.message);
        } else {
          console.log("Tab closed successfully.");
        }
      });
    } else {
      console.error("No valid tab ID to close.");
    }
  }
});
