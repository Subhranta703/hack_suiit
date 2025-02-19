import React, { useState, useEffect } from "react";
import "./StudyChatbot.css"; // Importing CSS for styling

function StudyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me anything about studying 📚" },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (isOpen) {
      alert("Ask me about study 📚!"); // Alert when chatbot opens
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    let botResponse = "I'm here to help with studying! Can you ask something specific?";
    if (input.toLowerCase().includes("best way to study")) {
      botResponse = "Try the Pomodoro technique! Study for 25 minutes, then take a 5-minute break.";
    } else if (input.toLowerCase().includes("concentration")) {
      botResponse = "Eliminate distractions, use noise-canceling headphones, and take short breaks.";
    } else if (input.toLowerCase().includes("memorization")) {
      botResponse = "Use flashcards and teach the material to someone else!";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 1000);

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
