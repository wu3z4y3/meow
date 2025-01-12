chrome.storage.local.get("motivationalText", (result) => {
  let motivationalText = result.motivationalText || "Default fallback quote: Keep pushing forward!";
  
  // Wrap the existing page content in a container to blur only the webpage
  const pageContent = document.createElement("div");
  pageContent.id = "blurred-page-content";
  while (document.body.firstChild) {
    pageContent.appendChild(document.body.firstChild);
  }
  document.body.appendChild(pageContent);

  // Apply blur to the page content
  pageContent.style.filter = "blur(1.5px)";
  pageContent.style.pointerEvents = "none"; // Disable interactions with the blurred content

  // Create the overlay
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "50%";
  container.style.left = "50%";
  container.style.transform = "translate(-50%, -50%)";
  container.style.zIndex = "10000";
  container.style.width = "800px";
  container.style.height = "725px";
  container.style.background = "rgba(0, 0, 0, 0.8)";
  container.style.borderRadius = "12px";
  container.style.padding = "5px";
  container.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.4)";
  container.style.overflow = "hidden";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";

  const video = document.createElement("video");
  video.style.width = "90%";
  video.style.height = "90%";
  video.style.objectFit = "cover";
  video.style.transform = "scaleX(-1)";

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;
      container.appendChild(video);

      // Create the initial image element for knife.png
      const image = document.createElement('img');
      image.src = chrome.runtime.getURL('images/knife.png'); 
      image.style.position = 'absolute';
      image.style.bottom = '20px';
      image.style.left = '20px';
      image.style.width = '150px';
      image.style.height = '150px';
      container.appendChild(image);

      document.body.appendChild(container);

      let textElement = document.createElement("p");
      textElement.textContent = motivationalText;
      textElement.style.color = "white";
      textElement.style.fontSize = "18px";
      textElement.style.background = "rgba(0, 0, 0, 0.5)";
      textElement.style.padding = "10px";
      textElement.style.borderRadius = "8px";
      textElement.style.marginTop = "10px";
      container.appendChild(textElement);

      const buttonsContainer = document.createElement("div");
      buttonsContainer.style.position = "absolute";
      buttonsContainer.style.bottom = "20px";
      buttonsContainer.style.display = "flex";
      buttonsContainer.style.gap = "20px";
      container.appendChild(buttonsContainer);

      const lockedInButton = document.createElement("button");
      lockedInButton.textContent = "Locking In";
      lockedInButton.style.padding = "10px 20px";
      lockedInButton.style.fontSize = "16px";
      lockedInButton.style.color = "white";
      lockedInButton.style.backgroundColor = "#77a77e";
      lockedInButton.style.border = "none";
      lockedInButton.style.borderRadius = "8px";
      lockedInButton.style.cursor = "pointer";

      lockedInButton.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "closeTab" });
      });
      buttonsContainer.appendChild(lockedInButton);

      const lemmeRotButton = document.createElement("button");
      lemmeRotButton.textContent = "Duck You";
      lemmeRotButton.style.padding = "10px 20px";
      lemmeRotButton.style.fontSize = "16px";
      lemmeRotButton.style.color = "white";
      lemmeRotButton.style.backgroundColor = "#77a77e";
      lemmeRotButton.style.border = "none";
      lemmeRotButton.style.borderRadius = "8px";
      lemmeRotButton.style.cursor = "pointer";

      lemmeRotButton.addEventListener("click", () => {
        // Replace the motivational text with a random phrase
        const phrases = ["a", "b", "c"];
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        textElement.textContent = randomPhrase;

        // Replace the image with angry.png
        image.src = chrome.runtime.getURL('images/coolios.jpg');

        // Remove the buttons
        buttonsContainer.style.display = "none";

        // Automatically close the overlay after 5 seconds
        setTimeout(() => {
          document.body.removeChild(container); // Remove the overlay
          document.body.removeChild(pageContent); // Restore the original page content
          while (pageContent.firstChild) {
            document.body.appendChild(pageContent.firstChild);
          }
          stream.getTracks().forEach((track) => track.stop()); // Stop the camera feed
        }, 5000);
      });

      buttonsContainer.appendChild(lemmeRotButton);

      document.body.appendChild(container);
    })
    .catch((error) => {
      console.error("Error accessing the camera:", error);
    });
});
