import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api-iframely": {
        target: "https://iframely.com", 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api-iframely/, ""),
      },
    },
  },
});
