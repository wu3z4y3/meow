document.addEventListener("DOMContentLoaded", () => {
  const websiteInput = document.getElementById("website-input");
  const addButton = document.getElementById("add-website");
  const websiteListDiv = document.getElementById("website-list");

  // Load existing websites from chrome.storage.local
  chrome.storage.local.get('websites', (result) => {
    const savedWebsites = result.websites || [];
    displayWebsites(savedWebsites);
  });

  addButton.addEventListener('click', () => {
    const website = websiteInput.value.trim();
    if (!website) return;

    chrome.storage.local.get('websites', (result) => {
      const savedWebsites = result.websites || [];
      if (!savedWebsites.includes(website)) {
        savedWebsites.push(website);
        chrome.storage.local.set({ websites: savedWebsites }, () => {
          displayWebsites(savedWebsites);
          websiteInput.value = ''; // Clear input
        });
      }
    });
  });

  function displayWebsites(websites) {
    websiteListDiv.innerHTML = '';
    websites.forEach((website) => {
      const div = document.createElement('div');
      div.classList.add('website-item');
      div.textContent = website;
      websiteListDiv.appendChild(div);
    });
  }
});
