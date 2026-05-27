import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const emptyForm = {
  title: "",
  course: "",
  dueDate: "",
  priority: "medium",
};

function App() {
  const [deadlines, setDeadlines] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  function updateField(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function submitDeadline(event) {
    event.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/deadlines/${editingId}` : "/deadlines";
    
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const savedDeadline = await response.json();

    if (!response.ok) {
      setError(savedDeadline.error);
      return;
    }

    setError("");

    if (editingId) {
      setDeadlines(
        deadlines.map((deadline) =>
          deadline.id === editingId ? savedDeadline : deadline,
        ),
      );
    } else {
      setDeadlines([...deadlines, savedDeadline]);
    }

    setForm(emptyForm);
    setEditingId(null);
  }

  async function removeDeadline(deadlineToRemove) {
    await fetch(`/deadlines/${deadlineToRemove.id}`, { method: "DELETE" });

    setDeadlines(
      deadlines.filter((deadline) => deadline.id !== deadlineToRemove.id),
    );
  }

  function startEdit(deadline) {
    setEditingId(deadline.id);
    setForm({
      title: deadline.title,
      course: deadline.course,
      dueDate: deadline.dueDate,
      priority: deadline.priority,
    });
  }

  return (
    <main>
      <h1>Cutoff</h1>

      <form onSubmit={submitDeadline}>
        <label>
          Title
          <input name="title" required value={form.title} onChange={updateField} />
        </label>

        <label>
          Course
          <input name="course" required value={form.course} onChange={updateField} />
        </label>

        <label>
          Due date
          <input
            name="dueDate"
            type="date"
            required
            value={form.dueDate}
            onChange={updateField}
          />
        </label>

        <label>
          Priority
          <select name="priority" value={form.priority} onChange={updateField}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        {error && <p role="alert">{error}</p>}


        <button type="submit">
          {editingId ? "Save changes" : "Add deadline"}
        </button>
      </form>

      <section>
        {deadlines.map((deadline) => (
          <article key={deadline.id}>
            <h2>{deadline.title}</h2>
            <p>{deadline.course}</p>
            <p>{deadline.dueDate}</p>
            <p>{deadline.priority}</p>

            <button
              type="button"
              onClick={() => startEdit(deadline)}
              aria-label={`Edit ${deadline.title}`}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => removeDeadline(deadline)}
              aria-label={`Delete ${deadline.title}`}
            >
              Delete
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);