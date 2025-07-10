import React, { useState } from "react";
import axios from "axios";
import mammoth from "mammoth"; // For DOCX
import * as pdfjsLib from "pdfjs-dist"; // For PDF
import "pdfjs-dist/build/pdf.worker";

const TextToSpeech = () => {
  const [fileContent, setFileContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = window.speechSynthesis;
  let utterance = null;

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

  const readTxtFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setFileContent(e.target.result);
    reader.readAsText(file);
  };

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

  const handleTextToSpeech = () => {
    if (isPlaying) return;
    utterance = new SpeechSynthesisUtterance(fileContent);
    synth.speak(utterance);
    setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
  };

  const handlePauseSpeech = () => {
    if (synth.speaking) {
      synth.pause();
      setIsPlaying(false);
    }
  };

  const handleResumeSpeech = () => {
    if (!isPlaying && synth.paused) {
      synth.resume();
      setIsPlaying(true);
    }
  };

  const fetchFromGPT = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Text to Speech App</h1>

        <input
          type="file"
          accept=".txt,.pdf,.docx"
          onChange={handleFileUpload}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
        />

        <textarea
          value={fileContent}
          onChange={(e) => setFileContent(e.target.value)}
          rows="5"
          className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="Text from file will appear here..."
        ></textarea>

        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <button
            onClick={handleTextToSpeech}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            disabled={isPlaying}
          >
            ▶ Play
          </button>

          <button
            onClick={handlePauseSpeech}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
          >
            ⏸ Pause
          </button>

          <button
            onClick={handleResumeSpeech}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition"
          >
            🔄 Resume
          </button>

          <button
            onClick={fetchFromGPT}
            className={`${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            } text-white px-4 py-2 rounded transition`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Enhance with GPT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
