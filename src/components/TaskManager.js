import React, { useState } from "react";

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
    <div className="flex flex-col items-center justify-start p-8 bg-[#f4f7fc] min-h-screen overflow-y-auto font-[Poppins]">
      <h2 className="text-2xl text-gray-800 mb-6 uppercase tracking-wide">Task Manager</h2>

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md flex flex-col gap-3 hover:scale-[1.02] transition-transform">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full p-3 text-base border-2 border-gray-300 rounded-md outline-none focus:border-teal-700"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-3 text-base border-2 border-gray-300 rounded-md outline-none focus:border-teal-700"
        />
        <button
          onClick={addTask}
          className="bg-teal-700 text-white p-3 rounded-md text-base hover:bg-teal-900 transition-colors"
        >
          Add Task
        </button>
      </div>

      <ul className="w-full max-w-md mt-6 space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`bg-white p-4 rounded-lg flex items-center justify-between border-l-[5px] shadow-sm transition-transform hover:scale-[1.02] ${task.completed ? "line-through text-gray-500" : "border-teal-700"}`}
          >
            <span
              onClick={() => toggleTask(task.id)}
              className="flex-grow text-base cursor-pointer"
            >
              {task.text}
            </span>
            <span
              className={`text-sm font-bold px-3 py-1 rounded-md uppercase ml-4 ${getTaskStatus(task.dueDate) === "Pending" ? "text-amber-600 bg-amber-100" : getTaskStatus(task.dueDate) === "Overdue" ? "text-red-700 bg-red-100" : "text-slate-600 bg-slate-100"}`}
            >
              {getTaskStatus(task.dueDate)}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="ml-3 bg-red-500 text-white px-3 py-2 text-sm rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
