import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TextToSpeech from "./components/TextToSpeech";
import AttendanceTracker from "./components/AttendanceTracker";
import NotesSummarizer from "./components/NotesSummarizer";
import TaskManager from "./components/TaskManager";
import Timetable from "./components/Timetable";
import StudyChatbot from "./components/StudyChatbot"; // Chatbot

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>🎓 Student Productivity Hub</h1>
        </header>

        {/* Improved Navbar Design */}
        <nav className="navbar">
          <ul>
            <li><Link to="/text-to-speech">Text to Speech</Link></li>
            <li><Link to="/attendance">Attendance Tracker</Link></li>
            <li><Link to="/notes">Notes Summarizer</Link></li>
            <li><Link to="/tasks">Task Manager</Link></li>
            <li><Link to="/timetable">Timetable</Link></li>
          </ul>
        </nav>

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
