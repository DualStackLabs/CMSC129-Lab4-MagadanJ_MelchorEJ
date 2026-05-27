// playwright.config.js
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/system",
  use: {
    // System tests navigate to this base URL
    baseURL: "http://localhost:3000",
  },
  // Playwright starts both servers automatically before running system tests
  webServer: [
    {
      command: "node backend/server.js",
      port: 3001,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npx vite",
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
