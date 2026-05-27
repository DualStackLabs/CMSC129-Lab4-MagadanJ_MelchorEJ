const request = require("supertest");
const app = require("../../backend/app");

describe("Deadlines API", () => {
  test("POST /deadlines creates a valid deadline", async () => {
    const res = await request(app).post("/deadlines").send({
      title: "Lab 4",
      course: "CMSC 129",
      dueDate: "2026-06-01",
      priority: "high",
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      title: "Lab 4",
      course: "CMSC 129",
      dueDate: "2026-06-01",
      priority: "high",
    });
  });

  test("GET /deadlines returns created deadlines", async () => {
    await request(app).post("/deadlines").send({
      title: "Final SRS Document",
      course: "CMSC 129",
      dueDate: "2026-05-29",
      priority: "medium",
    });

    const res = await request(app).get("/deadlines");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Final SRS Document",
          course: "CMSC 129",
          dueDate: "2026-05-29",
          priority: "medium",
        }),
      ]),
    );
  });
});