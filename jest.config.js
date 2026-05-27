// jest.config.js
module.exports = {
  // Only pick up unit and integration tests — Playwright handles system tests
  testMatch: [
    "**/tests/unit/**/*.test.js",
    "**/tests/integration/**/*.test.js",
  ],
  testEnvironment: "node",
};
