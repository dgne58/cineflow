import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //root: "./src-vite",
  base: "./",
  server: {
    port: 5241,
    https: {
      key: fs.readFileSync("./localhost-key.pem"),
      cert: fs.readFileSync("./localhost.pem"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  build: {
    outDir: "./src",
    emptyOutDir: true,
  }
});
