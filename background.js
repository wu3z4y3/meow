chrome.webNavigation.onCompleted.addListener(function(details) {
    if (details.url.includes("example.com")) {
        chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            files: ['content.js']
        });
    }
}, {url: [{urlMatches : 'https://*/*'}]});