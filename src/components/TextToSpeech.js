import React, { useState } from "react";
import axios from "axios";
import "./TextToSpeech.css"; 

const TextToSpeech = () => {
  const [fileContent, setFileContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Read text file content
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Convert text to speech using browser API
  const handleTextToSpeech = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(fileContent);
    synth.speak(utterance);
  };

  // Optional: Use GPT API to enhance text (Requires API Key)
  const fetchFromGPT = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4", // Change to "gpt-3.5-turbo" if needed
          messages: [{ role: "system", content: fileContent }],
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
            "Content-Type": "application/json",
          },
        }
      );
      setFileContent(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching from GPT:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Text to Speech App</h1>
        
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="file-input"
        />
        
        <textarea
          value={fileContent}
          onChange={(e) => setFileContent(e.target.value)}
          rows="5"
          className="textarea"
          placeholder="Text from file will appear here..."
        ></textarea>

        <div className="button-container">
          <button onClick={handleTextToSpeech} className="speak-button">
            Speak Text
          </button>
          <button onClick={fetchFromGPT} className="gpt-button" disabled={loading}>
            {loading ? "Loading..." : "Enhance with GPT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
