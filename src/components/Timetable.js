import React, { useState, useEffect } from "react";

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
            return false;
          }
          return true;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sendNotification = (task) => {
    if (Notification.permission === "granted") {
      new Notification("⏳ Task Reminder", { body: `Reminder for: ${task}` });
    } else {
      alert(`⏳ Reminder for: ${task}`);
    }
  };

  const sendWhatsAppReminder = (task) => {
    const phoneNumber = "918260912891";
    const message = encodeURIComponent(`⏳ Reminder: ${task}`);
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappLink, "_blank");
  };

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
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📅 Timed Alerts with WhatsApp Reminder</h2>

      <div className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Task (e.g., Meeting, Study)"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={delayMinutes}
          onChange={(e) => setDelayMinutes(e.target.value)}
          placeholder="Delay in Minutes"
          min="1"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addSchedule}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          Set Reminder
        </button>
      </div>

      <ul className="space-y-2">
        {schedule.map((entry, index) => (
          <li
            key={index}
            className="bg-gray-100 p-3 rounded-md shadow-sm text-gray-700 text-sm"
          >
            ⏳ {entry.task} - Alert in{" "}
            {Math.max(0, Math.round((entry.alertTime - new Date().getTime()) / 60000))}{" "}
            min
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timetable;
