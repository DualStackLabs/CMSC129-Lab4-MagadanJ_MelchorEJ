let deadlines = [];
let nextId = 1;

function createDeadline(data) {
  const deadline = {
    id: nextId,
    title: data.title,
    course: data.course,
    dueDate: data.dueDate,
    priority: data.priority,
  };

  deadlines.push(deadline);
  nextId += 1;

  return deadline;
}

function listDeadlines() {
  return deadlines;
}

function updateDeadline(id, data) {
  const deadline = deadlines.find((item) => item.id === Number(id));

  if (!deadline) {
    return null;
  }

  deadline.title = data.title;
  deadline.course = data.course;
  deadline.dueDate = data.dueDate;
  deadline.priority = data.priority;

  return deadline;
}

function deleteDeadline(id) {
  const originalLength = deadlines.length;
  deadlines = deadlines.filter((item) => item.id !== Number(id));

  return deadlines.length < originalLength;
}

module.exports = { createDeadline, listDeadlines, updateDeadline, deleteDeadline,};