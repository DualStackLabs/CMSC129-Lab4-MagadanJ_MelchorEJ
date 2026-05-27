const VALID_PRIORITIES = ["low", "medium", "high"];

function validateDeadline(deadline) {
  if (!deadline.title || deadline.title.trim() === "") {
    throw new Error("Title is required");
  }

  if (!deadline.course || deadline.course.trim() === "") {
    throw new Error("Course is required");
  }

  if (!isValidDate(deadline.dueDate)) {
    throw new Error("Due date must be valid");
  }

  if (!VALID_PRIORITIES.includes(deadline.priority)) {
    throw new Error("Priority must be low, medium, or high");
  }

  return true;
}


function isValidDate(value) {
  return !Number.isNaN(Date.parse(value));
}

module.exports = { validateDeadline };