import React, { useState } from "react";
import "./Timetable.css";

const Timetable = () => {
  const [schedule, setSchedule] = useState([]);
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");

  const addSchedule = () => {
    setSchedule([...schedule, { subject, time }]);
    setSubject("");
    setTime("");
  };

  return (
    <div className="timetable-container">
      <h2>Timetable & Reminders</h2>
      <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button onClick={addSchedule}>Add Schedule</button>

      <ul>
        {schedule.map((entry, index) => (
          <li key={index}>{entry.subject} - {entry.time}</li>
        ))}
      </ul>
    </div>
  );
};

export default Timetable;
