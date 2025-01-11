navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        // Get the video track from the stream
        var video = document.createElement('video');
        document.body.appendChild(video);
        video.srcObject = stream;
        video.play();
    })
    .catch(function(error) {
        console.log('Error accessing the camera:', error);
    });
