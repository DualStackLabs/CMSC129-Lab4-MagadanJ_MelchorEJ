const express = require("express");
const { validateDeadline } = require("../frontend/src/deadlineValidation");
const { createDeadline, listDeadlines } = require("./deadlineStore");

const app = express();

app.use(express.json());

let deadlines = [];
let nextId = 1;

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

module.exports = app;