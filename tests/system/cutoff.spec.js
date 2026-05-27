const { test, expect } = require("@playwright/test");

async function addDeadline(page, title) {
  await page.getByLabel("Title").fill(title);
  await page.getByLabel("Course").fill("CMSC 129");
  await page.getByLabel("Due date").fill("2026-06-01");
  await page.getByLabel("Priority").selectOption("high");
  await page.getByRole("button", { name: "Add deadline" }).click();
}

test.describe("Cutoff user stories", () => {
  test("User Story 1: student can add a coursework deadline", async ({ page }) => {
    await page.goto("/");

    await addDeadline(page, "System Test Add Deadline");

    await expect(page.getByText("System Test Add Deadline")).toBeVisible();
    await expect(page.getByText("CMSC 129")).toBeVisible();
    await expect(page.getByText("high")).toBeVisible();
  });

  test("User Story 2: student can edit a coursework deadline", async ({ page }) => {
    await page.goto("/");

    await addDeadline(page, "System Test Edit Deadline");

    await page
      .getByRole("button", { name: "Edit System Test Edit Deadline" })
      .click();
    await page.getByLabel("Title").fill("Updated System Test Deadline");
    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page.getByText("Updated System Test Deadline")).toBeVisible();
    await expect(page.getByText("System Test Edit Deadline")).not.toBeVisible();
  });

  test("User Story 3: student can delete a coursework deadline", async ({ page }) => {
    await page.goto("/");

    await addDeadline(page, "System Test Delete Deadline");

    await page
      .getByRole("button", { name: "Delete System Test Delete Deadline" })
      .click();

    await expect(page.getByText("System Test Delete Deadline")).not.toBeVisible();
  });
});