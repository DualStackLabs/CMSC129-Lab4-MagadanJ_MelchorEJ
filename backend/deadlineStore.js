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

module.exports = { createDeadline, listDeadlines };