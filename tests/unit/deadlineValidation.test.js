// tests/unit/deadlineValidation.test.js
const { validateDeadline } = require("../../frontend/src/deadlineValidation");

describe("validateDeadline()", () => {
  const validDeadline = {
    title: "Lab 4",
    course: "CMSC 129",
    dueDate: "2026-06-01",
    priority: "high",
  };

  test("rejects a deadline with an empty title", () => {
    expect(() =>
      validateDeadline({ ...validDeadline, title: " " }),
    ).toThrow("Title is required");
  });

  test("rejects a deadline with an empty course", () => {
    expect(() =>
        validateDeadline({ ...validDeadline, course: " " }),
    ).toThrow("Course is required");
  });

  test("rejects an invalid due date", () => {
    expect(() =>
      validateDeadline({ ...validDeadline, dueDate: "not-a-date" }),
    ).toThrow("Due date must be valid");
  });

  test("rejects an unsupported priority", () => {
    expect(() =>
      validateDeadline({ ...validDeadline, priority: "urgent" }),
    ).toThrow("Priority must be low, medium, or high");
  });
});