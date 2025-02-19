import React, { useState, useEffect } from "react";
import "./AttendanceTracker.css";

const AttendanceTracker = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [subjects, setSubjects] = useState(() => {
    return JSON.parse(localStorage.getItem("subjects")) || [];
  });
  const [attendance, setAttendance] = useState(() => {
    return JSON.parse(localStorage.getItem("attendance")) || {};
  });
  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);

    // Alert if any subject has attendance below 75%
    const lowAttendanceSubjects = Object.keys(attendance).filter((subject) => {
      const { present, total } = attendance[subject] || { present: 0, total: 0 };
      return total > 0 && (present / total) * 100 < 75;
    });

    if (lowAttendanceSubjects.length > 0) {
      alert(`⚠️ Low Attendance Warning!\nSubjects below 75%: ${lowAttendanceSubjects.join(", ")}\nAttend more classes to improve your percentage.`);
    }
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [subjects, attendance]);

  const addSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject]);
      setAttendance({ ...attendance, [newSubject]: { present: 0, total: 0 } });
      setNewSubject("");
    }
  };

  const markAttendance = (subject, status) => {
    setAttendance((prev) => {
      const subjectData = prev[subject] || { present: 0, total: 0 };
      const updatedTotal = subjectData.total + 1;
      const updatedPresent = status === "Present" ? subjectData.present + 1 : subjectData.present;
      return {
        ...prev,
        [subject]: { present: updatedPresent, total: updatedTotal },
      };
    });
  };

  const deleteSubject = (subject) => {
    const updatedSubjects = subjects.filter((sub) => sub !== subject);
    const updatedAttendance = { ...attendance };
    delete updatedAttendance[subject];

    setSubjects(updatedSubjects);
    setAttendance(updatedAttendance);
  };

  return (
    <div className="attendance-container">
      <h2>📅 Attendance Tracker</h2>
      <label>Select Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <div className="subject-input">
        <input
          type="text"
          value={newSubject}
          placeholder="Add Subject"
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button onClick={addSubject}>➕ Add</button>
      </div>

      <div className="subjects-list">
        {subjects.map((subject) => {
          const percentage =
            attendance[subject]?.total > 0
              ? ((attendance[subject].present / attendance[subject].total) * 100).toFixed(2)
              : 0;

          return (
            <div key={subject} className="subject-card">
              <h3>{subject}</h3>
              <p>Date: {date}</p>
              <button onClick={() => markAttendance(subject, "Present")} className="present-btn">
                ✅ Present
              </button>
              <button onClick={() => markAttendance(subject, "Absent")} className="absent-btn">
                ❌ Absent
              </button>
              <p>Attendance: {attendance[subject]?.present || 0} / {attendance[subject]?.total || 0}</p>
              <p>Percentage: {percentage}%</p>

              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${percentage}%`, background: percentage < 75 ? "#ff3d00" : "#1e88e5" }}
                ></div>
              </div>

              {percentage < 75 && attendance[subject]?.total > 0 && (
                <p className="warning">⚠️ Below 75%! Attend more classes!</p>
              )}

              <button onClick={() => deleteSubject(subject)} className="delete-btn">🗑️ Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceTracker;
