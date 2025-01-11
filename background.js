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
