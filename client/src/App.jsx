import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Load tasks on page mount
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/api/tasks`);
        if (!res.ok) throw new Error("Server replied " + res.status);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // 2. Add new task (POST)
  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch(`${API}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const created = await res.json();
      setTasks([...tasks, created]);
      setTitle("");
    } catch (err) {
      alert(err.message);
    }
  }

  // 3. Toggle done status (PUT)
  async function toggle(task) {
    try {
      const res = await fetch(`${API}/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !task.done }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updated = await res.json();
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      alert(err.message);
    }
  }

  // 4. Delete task (DELETE)
  async function remove(id) {
    try {
      const res = await fetch(`${API}/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p style={{ padding: "20px" }}>Loading tasks...</p>;
  if (error) return <p style={{ color: "red", padding: "20px" }}>Could not load tasks: {error}</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", fontFamily: "sans-serif", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Testware Task Manager</h2>
      
      <form onSubmit={addTask} style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>Add</button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((t) => (
            <li
              key={t.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span
                style={{
                  textDecoration: t.done ? "line-through" : "none",
                  color: t.done ? "#888" : "#000",
                }}
              >
                {t.title}
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={() => toggle(t)} style={{ cursor: "pointer" }}>
                  {t.done ? "Undo" : "Done"}
                </button>
                <button onClick={() => remove(t.id)} style={{ cursor: "pointer", color: "red" }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}