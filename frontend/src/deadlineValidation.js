const VALID_PRIORITIES = ["low", "medium", "high"];

function validateDeadline(deadline) {
  requireText(deadline.title, "Title is required");
  requireText(deadline.course, "Course is required");
  requireValidDate(deadline.dueDate);
  requireValidPriority(deadline.priority);

  return true;
}

function requireText(value, message) {
  if (!value || value.trim() === "") {
    throw new Error(message);
  }
}

function requireValidDate(value) {
  if (Number.isNaN(Date.parse(value))) {
    throw new Error("Due date must be valid");
  }
}

function requireValidPriority(value) {
  if (!VALID_PRIORITIES.includes(value)) {
    throw new Error("Priority must be low, medium, or high");
  }
}

module.exports = { validateDeadline };