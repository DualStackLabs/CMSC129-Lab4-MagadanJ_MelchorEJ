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
      <header className="page-header">
        <div>
          <p className="eyebrow">Coursework deadline tracker</p>
          <h1>Cutoff</h1>
          <p className="header-copy">
            Keep upcoming requirements visible, prioritized, and out of the danger zone.
          </p>
        </div>
      </header>

       <form className="deadline-form" onSubmit={submitDeadline}>
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

        {error && (
          <p role="alert" className="error-message">
            {error}
          </p>
        )}

        <button type="submit">
          {editingId ? "Save changes" : "Add deadline"}
        </button>
      </form>

      <section className="deadline-list">
        {deadlines.map((deadline) => (
          <article
            key={deadline.id}
            className={`deadline-card priority-${deadline.priority}`}
          >
            <div className="deadline-details">
              <h2>{deadline.title}</h2>

              <dl>
                <div>
                  <dt>Course: </dt>
                  <dd>{deadline.course}</dd>
                </div>

                <div>
                  <dt>Due date: </dt>
                  <dd>{deadline.dueDate}</dd>
                </div>

                <div>
                  <dt>Priority: </dt>
                  <dd>
                    <span className="priority">{deadline.priority}</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card-actions">
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
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);