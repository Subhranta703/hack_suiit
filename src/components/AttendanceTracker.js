import React, { useState, useEffect } from "react";

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

    const lowAttendanceSubjects = Object.keys(attendance).filter((subject) => {
      const { present, total } = attendance[subject] || { present: 0, total: 0 };
      return total > 0 && (present / total) * 100 < 75;
    });

    if (lowAttendanceSubjects.length > 0) {
      alert(
        `⚠️ Low Attendance Warning!\nSubjects below 75%: ${lowAttendanceSubjects.join(", ")}\nAttend more classes to improve your percentage.`
      );
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
    <div className="bg-[#f5faff] p-6 rounded-xl text-center shadow-xl max-w-xl mx-auto font-[Poppins]">
      <h2 className="text-[#1565c0] mb-6 text-[22px] font-bold">📅 Attendance Tracker</h2>

      {/* Date Input */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-3 mb-4 border-2 border-[#64b5f6] rounded-lg text-[16px] bg-[#e3f2fd] outline-none focus:border-[#1976d2] focus:bg-white transition"
      />

      {/* Subject Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newSubject}
          placeholder="Add Subject"
          onChange={(e) => setNewSubject(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-md shadow-sm text-sm"
        />
        <button
          onClick={addSubject}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          ➕ Add
        </button>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {subjects.map((subject) => {
          const percentage =
            attendance[subject]?.total > 0
              ? ((attendance[subject].present / attendance[subject].total) * 100).toFixed(2)
              : 0;

          return (
            <div
              key={subject}
              className="bg-white p-4 rounded-lg shadow-md text-center border-l-4 border-[#64b5f6] transition-transform hover:scale-105"
            >
              <h3 className="mb-2 text-lg font-semibold text-[#0d47a1]">{subject}</h3>
              <p className="text-sm mb-2">Date: {date}</p>

              {/* Attendance Buttons */}
              <div className="flex justify-between gap-2 mb-2">
                <button
                  onClick={() => markAttendance(subject, "Present")}
                  className="flex-1 bg-[#1976d2] hover:bg-[#0d47a1] text-white py-2 px-3 rounded-md transition transform hover:scale-105"
                >
                  ✅ Present
                </button>
                <button
                  onClick={() => markAttendance(subject, "Absent")}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-md transition transform hover:scale-105"
                >
                  ❌ Absent
                </button>
              </div>

              {/* Attendance Info */}
              <p className="text-sm">
                Attendance: {attendance[subject]?.present || 0} / {attendance[subject]?.total || 0}
              </p>
              <p className="text-sm font-semibold mt-1">Percentage: {percentage}%</p>

              {/* Progress Bar */}
              <div className="w-full bg-[#e3f2fd] h-2 rounded mt-2">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: percentage < 75 ? "#f44336" : "#1e88e5",
                  }}
                ></div>
              </div>

              {/* Warning */}
              {percentage < 75 && attendance[subject]?.total > 0 && (
                <p className="text-red-600 text-sm mt-2 font-semibold">⚠️ Below 75%! Attend more classes!</p>
              )}

              {/* Delete Button */}
              <button
                onClick={() => deleteSubject(subject)}
                className="mt-4 text-sm text-gray-600 hover:text-red-600"
              >
                🗑️ Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceTracker;
