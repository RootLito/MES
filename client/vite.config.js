import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
        port: 3000,
        proxy: {
            '/regions': {
              target: 'https://psgc.rootscratch.com',  // The target URL
              changeOrigin: true,  // Ensures the `Origin` header is updated
              secure: false,  // Set to `false` if using self-signed certificates
              rewrite: (path) => path.replace(/^\/regions/, '')  // Rewrite the path, if necessary
            },
          },
    },
});
