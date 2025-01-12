chrome.storage.local.get("motivationalText", (result) => {
  let motivationalText = result.motivationalText || "Default fallback quote: Keep pushing forward!";
  
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "50%";
  container.style.left = "50%";
  container.style.transform = "translate(-50%, -50%)";
  container.style.zIndex = "10000";
  container.style.width = "900px";
  container.style.height = "700px";
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

      const textElement = document.createElement("p");
      textElement.textContent = motivationalText;
      textElement.style.color = "white";
      textElement.style.fontSize = "18px";
      textElement.style.background = "rgba(0, 0, 0, 0.5)";
      textElement.style.padding = "10px";
      textElement.style.borderRadius = "8px";
      textElement.style.marginTop = "10px";
      container.appendChild(textElement);

      const image = document.createElement('img');
      image.src = chrome.runtime.getURL('images/coolios.jpg'); 
      image.style.position = 'absolute';
      image.style.bottom = '20px';
      image.style.right = '20px';
      image.style.width = '150px';
      image.style.height = '150px';
      container.appendChild(image);    

      document.body.appendChild(container);

      const closeButton = document.createElement('button');
        closeButton.textContent = '✖';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '5px';
        closeButton.style.background = 'transparent';
        closeButton.style.border = 'none';
        closeButton.style.color = '#fff';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontSize = '16px';

        closeButton.onclick = () => {
            container.remove();
            stream.getTracks().forEach(track => track.stop());
        };

        container.appendChild(closeButton);

    })
    .catch((error) => {
      console.error("Error accessing the camera:", error);
    });
});
