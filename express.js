const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Initialize Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Function to generate motivational text
async function generateMotivationalText() {
  const prompt = "Generate a short motivational quote.";
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const motivationalText = result.response.text();

    // Save the generated text (optional)
    const textPath = path.join(__dirname, "motivationalText.json");
    fs.writeFileSync(textPath, JSON.stringify({ text: motivationalText }));

    return motivationalText;
  } catch (error) {
    console.error("Error generating motivational text:", error);
    return "Default motivational text: Keep pushing forward!";
  }
}

// Endpoint to serve or generate motivational text
app.get("/motivational-text", async (req, res) => {
  try {
    const newText = await generateMotivationalText();
    res.json({ text: newText });
  } catch (error) {
    res.status(500).json({ text: "Error generating motivational text" });
  }
});

// Serve static files if needed (e.g., your HTML file)
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
