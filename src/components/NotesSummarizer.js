import React, { useState } from "react";
import axios from "axios";
import "./NotesSummarizer.css";

const NotesSummarizer = () => {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "AIzaSyAF7MBAQrGMyjJ86Lf4QaxIchF6KoDSzTQ"; // Replace with actual API Key

  const summarizeNotes = async () => {
    if (!notes.trim()) {
      alert("Please enter some notes to summarize!");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, // ✅ Updated API Endpoint
        {
          contents: [{ role: "user", parts: [{ text: `Summarize the following notes:\n\n${notes}` }] }], // ✅ Correct payload format
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data); // ✅ Debugging response

      const summaryText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated."; // ✅ Corrected response access

      setSummary(summaryText.trim());
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setError("❌ Failed to summarize. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    alert("📋 Summary copied to clipboard!");
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
