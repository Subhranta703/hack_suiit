import React, { useState } from "react";
import "./AttendanceTracker.css";


const AttendanceTracker = () => {
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState("");

  const markPresent = () => {
    setAttendance([...attendance, { date, status: "Present" }]);
  };

  const markAbsent = () => {
    setAttendance([...attendance, { date, status: "Absent" }]);
  };

  return (
    <div className="attendance-container">
      <h2>Attendance Tracker</h2>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={markPresent}>Present</button>
      <button onClick={markAbsent}>Absent</button>

      <h3>Attendance Record:</h3>
      <ul>
        {attendance.map((entry, index) => (
          <li key={index}>{entry.date} - {entry.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceTracker;
