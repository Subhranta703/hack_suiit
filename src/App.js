import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TextToSpeech from "./components/TextToSpeech";
import AttendanceTracker from "./components/AttendanceTracker";
import NotesSummarizer from "./components/NotesSummarizer";
import TaskManager from "./components/TaskManager";
import Timetable from "./components/Timetable";
import StudyChatbot from "./components/StudyChatbot"; // Chatbot
import "./App.css";

// Import Icons
import { FaBook, FaClipboardList, FaTasks, FaClock, FaVolumeUp } from "react-icons/fa"; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>🎓 Student Productivity Hub</h1>
        </header>

        {/* Feature Cards Instead of Navbar */}
        <div className="features-container">
          <Link to="/text-to-speech" className="feature-card">
            <FaVolumeUp className="feature-icon" />
            <p>Text to Speech</p>
          </Link>
          <Link to="/attendance" className="feature-card">
            <FaClipboardList className="feature-icon" />
            <p>Attendance Tracker</p>
          </Link>
          <Link to="/notes" className="feature-card">
            <FaBook className="feature-icon" />
            <p>Notes Summarizer</p>
          </Link>
          <Link to="/tasks" className="feature-card">
            <FaTasks className="feature-icon" />
            <p>Task Manager</p>
          </Link>
          <Link to="/timetable" className="feature-card">
            <FaClock className="feature-icon" />
            <p>Timetable</p>
          </Link>
        </div>

        {/* Page Routing */}
        <main className="main-content">
          <Routes>
            <Route path="/text-to-speech" element={<TextToSpeech />} />
            <Route path="/attendance" element={<AttendanceTracker />} />
            <Route path="/notes" element={<NotesSummarizer />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/timetable" element={<Timetable />} />
          </Routes>
        </main>

        {/* Chatbot Positioned in Bottom Right Corner */}
        <div className="chatbot-container">
          <StudyChatbot />
        </div>
      </div>
    </Router>
  );
}

export default App;
