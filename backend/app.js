const express = require("express");
const { validateDeadline } = require("../frontend/src/deadlineValidation");
const { createDeadline, listDeadlines, updateDeadline, deleteDeadline } = require("./deadlineStore");

const app = express();

app.use(express.json());

app.post("/deadlines", (req, res) => {
  try {
    validateDeadline(req.body);

    const deadline = createDeadline(req.body);

    return res.status(201).json(deadline);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.get("/deadlines", (req, res) => {
  return res.status(200).json(listDeadlines());
});

app.put("/deadlines/:id", (req, res) => {
  try {
    validateDeadline(req.body);

    const deadline = updateDeadline(req.params.id, req.body);

    if (!deadline) {
      return res.status(404).json({ error: "Deadline not found" });
    }

    return res.status(200).json(deadline);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.delete("/deadlines/:id", (req, res) => {
  const deleted = deleteDeadline(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: "Deadline not found" });
  }

  return res.status(204).send();
});

module.exports = app;