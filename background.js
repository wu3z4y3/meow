chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.storage.local.get('websites', (result) => {
      const savedWebsites = result.websites || [];
      const currentUrl = tab.url || '';

      // Match current URL with saved websites
      const isMatch = savedWebsites.some((website) => currentUrl.includes(website));

      if (isMatch) {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['content.js'],
        }).catch((error) => console.error('Failed to inject script:', error));
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getMotivationalText") {
    fetch(chrome.runtime.getURL("motivationalText.json"))
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => sendResponse({ success: true, text: data.text }))
      .catch((error) => sendResponse({ success: false, error: error.message }));
    return true; // Keep the message channel open for asynchronous response
  }
});