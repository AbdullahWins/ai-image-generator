const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors()); // add CORS middleware
app.use(bodyParser.json()); // add body-parser middleware

app.get("/generate-image", async (req, res) => {
  const { prompt } = req.query;
  try {
    // Make API call to DALL-E
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "image-alpha-001",
        prompt: prompt,
        num_images: 1,
        size: "1024x1024",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Return generated image
    res.send(response.data.data[0].url);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating image");
  }
});

app.post("/modify-image", async (req, res) => {
  const { imageUrl, prompt } = req.body;
  try {
    // Make API call to DALL-E
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "image-alpha-001",
        prompt: `${imageUrl} ${prompt}`,
        num_images: 1,
        size: "1024x1024",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Return generated image
    res.send(response.data.data[0].url);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating image");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
