import React, { useState } from "react";
import axios from "axios";

const NotesSummarizer = () => {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "AIzaSyAF7MBAQrGMyjJ86Lf4QaxIchF6KoDSzTQ";

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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: `Summarize the following notes:\n\n${notes}` }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const summaryText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated.";

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
    <div className="max-w-md mx-auto p-6 text-center bg-gray-100 rounded-lg shadow-lg font-[Poppins]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📚 Notes Summarizer</h2>

      <textarea
        className="w-full p-3 rounded-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
        rows="5"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
      />

      <button
        onClick={summarizeNotes}
        disabled={loading}
        className={`mt-4 px-6 py-2 rounded-md font-medium text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {error && <p className="text-red-600 font-bold mt-3">{error}</p>}

      <h3 className="text-lg font-medium mt-6 mb-2 text-gray-700">📜 Summary:</h3>

      <div className="relative bg-white p-4 rounded-md min-h-[60px] text-left border border-gray-200">
        {summary || "No summary yet."}
        {summary && (
          <button
            onClick={copyToClipboard}
            className="absolute bottom-2 right-2 bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600"
          >
            📋 Copy
          </button>
        )}
      </div>
    </div>
  );
};

export default NotesSummarizer;
