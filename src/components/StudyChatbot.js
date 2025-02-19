import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudyChatbot.css";

function StudyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me anything about studying 📚" },
  ]);
  const [input, setInput] = useState("");
  const API_KEY = "AIzaSyAF7MBAQrGMyjJ86Lf4QaxIchF6KoDSzTQ"; // Replace with actual API Key

  useEffect(() => {
    
  }, [isOpen]);

  const fetchAIResponse = async (userMessage) => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: userMessage }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("API Response:", response.data);

      return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure, but I can try to help!";
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return "Sorry, I'm having trouble responding. Please try again!";
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Show a loading message while fetching response
    setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Thinking... 🤔" }]);

    const botResponse = await fetchAIResponse(input);

    setMessages((prevMessages) =>
      prevMessages.map((msg, index) =>
        index === prevMessages.length - 1 ? { sender: "bot", text: botResponse } : msg
      )
    );

    setInput("");
  };

  return (
    <div className="chatbot">
      {/* Floating Circular Button */}
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>📚 Study Chatbot</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              placeholder="Ask about studying..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyChatbot;
