chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url && changeInfo.url.includes("Instagram.com")) {
      chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ['content.js']
      }).catch(error => console.error('Failed to inject script:', error));
    }
  });
  