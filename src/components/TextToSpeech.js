import React, { useState } from "react";
import axios from "axios";
import mammoth from "mammoth"; // For DOCX file reading
import * as pdfjsLib from "pdfjs-dist"; // For PDF file reading
import "pdfjs-dist/build/pdf.worker"; 
import "./TextToSpeech.css"; 

const TextToSpeech = () => {
  const [fileContent, setFileContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = window.speechSynthesis;
  let utterance = null;

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.name.split(".").pop().toLowerCase();

    if (fileType === "txt") {
      readTxtFile(file);
    } else if (fileType === "pdf") {
      await readPdfFile(file);
    } else if (fileType === "docx") {
      await readDocxFile(file);
    } else {
      alert("Unsupported file type! Please upload a TXT, PDF, or DOCX file.");
    }
  };

  // Read TXT File
  const readTxtFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setFileContent(e.target.result);
    reader.readAsText(file);
  };

  // Read PDF File
  const readPdfFile = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const typedArray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ") + "\n";
        }

        setFileContent(text);
      } catch (error) {
        console.error("Error reading PDF:", error);
        alert("Failed to extract text from PDF. Please try another file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Read DOCX File
  const readDocxFile = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const result = await mammoth.extractRawText({ arrayBuffer: e.target.result });
        setFileContent(result.value || "No readable text found in DOCX file.");
      } catch (error) {
        console.error("Error reading DOCX:", error);
        alert("Failed to extract text from DOCX. Please try another file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Convert text to speech
  const handleTextToSpeech = () => {
    if (isPlaying) return;
    
    utterance = new SpeechSynthesisUtterance(fileContent);
    synth.speak(utterance);
    setIsPlaying(true);

    utterance.onend = () => setIsPlaying(false);
  };

  // Pause speech
  const handlePauseSpeech = () => {
    if (synth.speaking) {
      synth.pause();
      setIsPlaying(false);
    }
  };

  // Resume speech
  const handleResumeSpeech = () => {
    if (!isPlaying && synth.paused) {
      synth.resume();
      setIsPlaying(true);
    }
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
          accept=".txt,.pdf,.docx"
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
          <button onClick={handleTextToSpeech} className="speak-button" disabled={isPlaying}>
            ▶ Play
          </button>
          <button onClick={handlePauseSpeech} className="pause-button">
            ⏸ Pause
          </button>
          <button onClick={handleResumeSpeech} className="resume-button">
            🔄 Resume
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
