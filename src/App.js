import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TextToSpeech from "./components/TextToSpeech";
import AttendanceTracker from "./components/AttendanceTracker";
import NotesSummarizer from "./components/NotesSummarizer";
import TaskManager from "./components/TaskManager";
import Timetable from "./components/Timetable";
import StudyChatbot from "./components/StudyChatbot";
import { FaBook, FaClipboardList, FaTasks, FaClock, FaVolumeUp } from "react-icons/fa";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-poppins text-gray-800 bg-gray-100">

        {/* Header */}
        <header className="bg-blue-600 text-white py-6 text-center">
          <h1 className="text-3xl font-bold">🎓 Student Productivity Hub</h1>
          <p className="text-sm text-blue-100 mt-2">Your one-stop solution for student productivity</p>
        </header>

        {/* Feature Cards */}
        <div className="flex flex-wrap justify-center gap-6 py-8 px-4">
          <Link to="/text-to-speech" className="w-44 h-48 rounded-2xl text-white font-semibold flex flex-col justify-center items-center text-center shadow-lg hover:scale-105 transition duration-300 ease-in-out bg-gradient-to-br from-pink-400 to-pink-600">
            <FaVolumeUp className="text-3xl mb-2" />
            <p>Text to Speech</p>
          </Link>
          <Link to="/attendance" className="w-44 h-48 rounded-2xl text-white font-semibold flex flex-col justify-center items-center text-center shadow-lg hover:scale-105 transition duration-300 ease-in-out bg-gradient-to-br from-teal-300 to-teal-600">
            <FaClipboardList className="text-3xl mb-2" />
            <p>Attendance Tracker</p>
          </Link>
          <Link to="/notes" className="w-44 h-48 rounded-2xl text-white font-semibold flex flex-col justify-center items-center text-center shadow-lg hover:scale-105 transition duration-300 ease-in-out bg-gradient-to-br from-orange-400 to-purple-500">
            <FaBook className="text-3xl mb-2" />
            <p>Notes Summarizer</p>
          </Link>
          <Link to="/tasks" className="w-44 h-48 rounded-2xl text-white font-semibold flex flex-col justify-center items-center text-center shadow-lg hover:scale-105 transition duration-300 ease-in-out bg-gradient-to-br from-purple-600 to-indigo-300">
            <FaTasks className="text-3xl mb-2" />
            <p>Task Manager</p>
          </Link>
          <Link to="/timetable" className="w-44 h-48 rounded-2xl text-white font-semibold flex flex-col justify-center items-center text-center shadow-lg hover:scale-105 transition duration-300 ease-in-out bg-gradient-to-br from-cyan-500 to-blue-400">
            <FaClock className="text-3xl mb-2" />
            <p>Timetable</p>
          </Link>
        </div>

        {/* Main Section */}
        <main className="flex-1 px-4 md:px-6 max-w-5xl mx-auto pb-20">
          <Routes>
            <Route path="/text-to-speech" element={<TextToSpeech />} />
            <Route path="/attendance" element={<AttendanceTracker />} />
            <Route path="/notes" element={<NotesSummarizer />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/timetable" element={<Timetable />} />
          </Routes>
        </main>

        {/* Chatbot (fixed bottom right) */}
        <div className="fixed bottom-5 right-5 w-[300px] rounded-xl shadow-lg z-50 bg-white overflow-hidden border border-gray-200">
          <div className="bg-blue-600 text-white text-center py-2 font-medium">
            Study Assistant 🤖
          </div>
          <div className="p-2">
            <StudyChatbot />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 text-center py-4 text-sm">
          © {new Date().getFullYear()} Student Productivity Hub | Built with 💻 by Tierless student
        </footer>
      </div>
    </Router>
  );
}

export default App;
