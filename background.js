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
