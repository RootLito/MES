import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      "/regions": {
        target: "https://psgc.rootscratch.com", 
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/regions/, ""), 
      },
    },
  },
});
