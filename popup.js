const video = document.getElementById("camera");

async function startCamera() {
  try {
    console.log("Requesting camera access...");
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    console.log("Camera stream obtained:", stream);

    // Attach the stream to the video element
    video.srcObject = stream;
    video.play();
  } catch (error) {
    console.error("Error accessing camera:", error);
    if (error.name === "NotAllowedError") {
      alert("Permission to access the camera was denied.");
    } else if (error.name === "NotFoundError") {
      alert("No camera device found.");
    } else if (error.name === "NotReadableError") {
      alert("Camera is already in use by another application.");
    } else {
      alert("An unknown error occurred.");
    }
  }
}

// Start the camera when the popup loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("Popup loaded, starting camera...");
  startCamera();
});
