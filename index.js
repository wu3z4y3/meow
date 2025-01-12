const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generateMotivationalText() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = "Generate a short motivational quote.";
    const result = await model.generateContent(prompt);
    const motivationalText = result.response.text();

    // Save the text to a JSON file
    fs.writeFileSync("motivationalText.json", JSON.stringify({ text: motivationalText }));
    console.log("Motivational text saved!");
  } catch (error) {
    console.error("Error generating motivational text:", error);
  }
}

generateMotivationalText();
