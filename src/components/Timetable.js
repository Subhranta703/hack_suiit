import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Timetable.css";

const Timetable = () => {
  const [schedule, setSchedule] = useState([]);
  const [task, setTask] = useState("");
  const [delayMinutes, setDelayMinutes] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();

      setSchedule((prevSchedule) =>
        prevSchedule.filter((entry) => {
          if (currentTime >= entry.alertTime) {
            sendNotification(entry.task);
            sendWhatsAppReminder(entry.task);
            return false; // Remove task after alert
          }
          return true;
        })
      );
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  // Send Browser Notification
  const sendNotification = (task) => {
    if (Notification.permission === "granted") {
      new Notification("⏳ Task Reminder", { body: `Reminder for: ${task}` });
    } else {
      alert(`⏳ Reminder for: ${task}`);
    }
  };

  // Send WhatsApp Reminder
  const sendWhatsAppReminder = async (task) => {
    const phoneNumber = "8260912891"; // Change to recipient number
    const message = `⏳ Reminder: ${task}`;

    try {
      await axios.post("https://api.callmebot.com/whatsapp.php", null, {
        params: {
          phone: phoneNumber,
          text: message,
          apikey: "YOUR_CALLMEBOT_API_KEY",
        },
      });
      console.log("WhatsApp reminder sent!");
    } catch (error) {
      console.error("Error sending WhatsApp reminder:", error);
    }
  };

  // Add new schedule
  const addSchedule = () => {
    if (!task.trim() || !delayMinutes || isNaN(delayMinutes) || delayMinutes <= 0) {
      return alert("Please enter a valid task and delay time!");
    }

    const alertTime = new Date().getTime() + delayMinutes * 60 * 1000;
    setSchedule([...schedule, { task, alertTime }]);
    setTask("");
    setDelayMinutes("");
  };

  return (
    <div className="timetable-container">
      <h2>📅 Timed Alerts with WhatsApp Reminder</h2>

      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Task (e.g., Meeting, Study)"
        />
        <input
          type="number"
          value={delayMinutes}
          onChange={(e) => setDelayMinutes(e.target.value)}
          placeholder="Delay in Minutes"
          min="1"
        />
        <button onClick={addSchedule}>Set Reminder</button>
      </div>

      <ul className="schedule-list">
        {schedule.map((entry, index) => (
          <li key={index} className="schedule-item">
            <span>⏳ {entry.task} - Alert in {Math.max(0, Math.round((entry.alertTime - new Date().getTime()) / 60000))} min</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timetable;
