const express = require("express");
const { validateDeadline } = require("../frontend/src/deadlineValidation");

const app = express();

app.use(express.json());

let deadlines = [];
let nextId = 1;

app.post("/deadlines", (req, res) => {
  try {
    validateDeadline(req.body);

    const deadline = {
      id: nextId,
      title: req.body.title,
      course: req.body.course,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
    };

    deadlines.push(deadline);
    nextId += 1;

    return res.status(201).json(deadline);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.get("/deadlines", (req, res) => {
  return res.status(200).json(deadlines);
});

module.exports = app;