// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Tell Vite to look for index.html inside the frontend/ folder
  root: "frontend",
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Any request starting with /calculate is forwarded to Express
      "/deadlines": "http://localhost:3001",
    },
  },
});