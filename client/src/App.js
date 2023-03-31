import React, { useState } from "react";
import axios from "axios";

function App() {
  const [generatedImage, setGeneratedImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleGenerateImage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/generate-image?prompt=${encodeURIComponent(
          prompt
        )}`
      );
      setGeneratedImage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(
        "http://localhost:5000/modify-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setGeneratedImage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Generate an image using DALL-E</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleGenerateImage}>Generate Image</button>
      <br />
      <br />
      <h2>Modify an image using DALL-E</h2>
      <input type="file" onChange={handleImageChange} />
      <br />
      <br />
      <button onClick={handleUploadImage}>Modify Image</button>
      {generatedImage && (
        <img src={generatedImage} alt="Generated DALL-E"></img>
      )}
    </div>
  );
}

export default App;
