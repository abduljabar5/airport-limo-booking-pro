import { defineConfig } from "vite";
import path from "path";
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8880, // Set a unique port for Vite
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        booking: resolve(__dirname, 'book-a-ride.html'),
        services: resolve(__dirname, 'service-areas.html'),
        airport: resolve(__dirname, 'airport-service.html'),
        downtown: resolve(__dirname, 'downtown-minneapolis.html'),
      },
    },
  },
});
