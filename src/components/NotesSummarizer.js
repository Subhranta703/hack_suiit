import React, { useState } from "react";
import axios from "axios";
import "./NotesSummarizer.css";

const NotesSummarizer = () => {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "AIzaSyAF7MBAQrGMyjJ86Lf4QaxIchF6KoDSzTQ"; // ⚠️ Replace with your actual Google Gemini API Key

  const summarizeNotes = async () => {
    if (!notes.trim()) {
      alert("Please enter some notes to summarize!");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText",
        {
          prompt: { text: `Summarize the following notes:\n\n${notes}` },
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const summaryText = response.data.candidates?.[0]?.output || "No summary generated.";
      setSummary(summaryText.trim());
    } catch (error) {
      console.error("Error summarizing:", error.response || error);
      setError("Failed to summarize. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    alert("Summary copied to clipboard! 📋");
  };

  return (
    <div className="notes-container">
      <h2>📚 Notes Summarizer</h2>
      <textarea
        className="notes-input"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows="5"
        placeholder="Write your notes here..."
      />
      <button className="summarize-button" onClick={summarizeNotes} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {error && <p className="error-message">❌ {error}</p>}

      <h3>📜 Summary:</h3>
      <div className="notes-output">
        {summary || "No summary yet."}
        {summary && (
          <button className="copy-button" onClick={copyToClipboard}>📋 Copy</button>
        )}
      </div>
    </div>
  );
};

export default NotesSummarizer;
