import React, { useState } from "react";
import "./TaskManager.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        dueDate: dueDate,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setDueDate("");
    }
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getTaskStatus = (dueDate) => {
    if (!dueDate) return "No Due Date";
    const today = new Date();
    const taskDate = new Date(dueDate);
    return taskDate < today ? "Overdue" : "Pending";
  };

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
            <span onClick={() => toggleTask(task.id)}>{task.text}</span>
            <span className={`task-status ${getTaskStatus(task.dueDate).toLowerCase()}`}>
              {getTaskStatus(task.dueDate)}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
