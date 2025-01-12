const cors = require("cors");
app.use(cors());

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve the JSON file
app.get("/motivational-text", (req, res) => {
  const textPath = path.join(__dirname, "motivationalText.json");
  if (fs.existsSync(textPath)) {
    res.json(JSON.parse(fs.readFileSync(textPath, "utf8")));
  } else {
    res.json({ text: "Default motivational text: Keep pushing forward!" });
  }
});

// Serve static files if needed (e.g., your HTML file)
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
