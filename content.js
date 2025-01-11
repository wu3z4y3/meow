navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        // Create a container for the video
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '50%'; // Center vertically
        container.style.left = '50%'; // Center horizontally
        container.style.transform = 'translate(-50%, -50%)'; // Adjust for true center
        container.style.zIndex = '10000';
        container.style.width = '1000px'; // Larger width
        container.style.height = '600px'; // Larger height
        container.style.background = 'rgba(0, 0, 0, 0.8)';
        container.style.borderRadius = '12px';
        container.style.padding = '5px';
        container.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.overflow = 'hidden';

        const video = document.createElement('video');
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.transform = 'scaleX(-1)';        
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;

        container.appendChild(video);
        document.body.appendChild(container);

        // Add a close button
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
    .catch(function(error) {
        console.log('Error accessing the camera:', error);
    });
