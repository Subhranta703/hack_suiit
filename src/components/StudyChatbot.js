import React, { useState } from "react";
import axios from "axios";

function StudyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me anything about studying 📚" },
  ]);
  const [input, setInput] = useState("");
  const API_KEY = "AIzaSyAF7MBAQrGMyjJ86Lf4QaxIchF6KoDSzTQ";

  const fetchAIResponse = async (userMessage) => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: userMessage }] }],
        },
        { headers: { "Content-Type": "application/json" } }
      );

      return (
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm not sure, but I can try to help!"
      );
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return "Sorry, I'm having trouble responding. Please try again!";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    // Show loading
    setMessages((prev) => [...prev, { sender: "bot", text: "Thinking... 🤔" }]);

    const botResponse = await fetchAIResponse(input);

    // Replace loading with actual response
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 ? { sender: "bot", text: botResponse } : msg
      )
    );

    setInput("");
  };

  return (
    <div className="font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 w-[60px] h-[60px] bg-gradient-to-br from-[#6a11cb] to-[#2575fc] text-white rounded-full text-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-[80px] right-5 w-[350px] bg-white/20 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="flex justify-between items-center bg-gradient-to-br from-[#6a11cb] to-[#2575fc] text-white px-4 py-3 rounded-t-xl">
            <h3 className="text-lg font-medium">📚 Study Chatbot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl transition-transform hover:rotate-90"
            >
              ✖
            </button>
          </div>

          <div className="max-h-[300px] overflow-y-auto p-4 flex flex-col gap-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-[18px] text-sm max-w-[75%] break-words shadow ${
                  msg.sender === "bot"
                    ? "bg-gray-100 self-start"
                    : "bg-gradient-to-br from-[#6a11cb] to-[#2575fc] text-white self-end text-right"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex p-3 border-t border-white/20 bg-white/30">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about studying..."
              className="flex-1 p-2 rounded-full outline-none bg-white text-sm focus:ring-2 focus:ring-indigo-300"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 px-4 py-2 rounded-full bg-gradient-to-br from-[#6a11cb] to-[#2575fc] text-white transition-transform hover:scale-105"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyChatbot;
