chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url && changeInfo.url.includes("instagram.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js'], // Ensure this file is located in the correct directory
    }).catch(error => console.error('Failed to inject script:', error));
  }
});
