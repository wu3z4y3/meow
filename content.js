navigator.mediaDevices.getUserMedia({ video: true })
  .then(function (stream) {
    // Create a container for the video and image
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.zIndex = '10000';
    container.style.width = '1000px';
    container.style.height = '600px';
    container.style.background = 'rgba(0, 0, 0, 0.8)';
    container.style.borderRadius = '12px';
    container.style.padding = '5px';
    container.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
    container.style.overflow = 'hidden';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';

    // Create a video element for the camera feed
    const video = document.createElement('video');
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.transform = 'scaleX(-1)';
    video.srcObject = stream;
    video.autoplay = true;
    video.playsInline = true;

    // Add the video to the container
    container.appendChild(video);

    // Add an image overlay
    const image = document.createElement('img');
    image.src = chrome.runtime.getURL('images/coolios.jpg');
    image.style.position = 'absolute';
    image.style.top = '20px'; // Adjust position relative to container
    image.style.left = '20px'; // Adjust position relative to container
    image.style.width = '150px'; // Set the image size
    image.style.height = '150px'; // Set the image size

    image.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';

    // Add the image to the container
    container.appendChild(image);

    // Append the container to the document body
    document.body.appendChild(container);

    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.textContent = '✖';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.background = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.color = '#fff';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '16px';

    closeButton.onclick = () => {
      container.remove();
      stream.getTracks().forEach((track) => track.stop());
    };

    // Add the close button to the container
    container.appendChild(closeButton);
  })
  .catch(function (error) {
    console.log('Error accessing the camera:', error);
  });
