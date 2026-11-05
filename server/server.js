require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();


// Middleware
app.use(cors()); // Allow all local origins during development
app.use(express.json());

// In-memory data store
let tasks = [
  { id: 1, title: "Java", done: false },
  { id: 2, title: "C++", done: true },
  { id: 3, title: "Python", done: false }
];
let nextId = 3;

// 1. GET all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// 2. GET single task
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// 3. POST create task
app.post("/api/tasks", (req, res) => {
  const title = (req.body.title || "").trim();
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTask = { id: nextId++, title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 4. PUT toggle/update task
app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (req.body.done !== undefined) {
    task.done = Boolean(req.body.done);
  }
  res.json(task);
});

// 5. DELETE task
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const exists = tasks.some((t) => t.id === id);
  if (!exists) return res.status(404).json({ error: "Task not found" });

  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});