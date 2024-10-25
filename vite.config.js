import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      srcDir: "src",
      filename: "sw.js",
      strategies: "injectManifest",
      manifestFilename: "manifest.json",
      manifest: {
        name: "Financial Literacy",
        short_name: "FinLit",
        description: "An E-course application for financial literacy",
        theme_color: "#f9f9f9",
        background_color: "#f9f9f9",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "img/logo72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "img/logo96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "img/logo144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "img/logo192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "img/logo512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "img/logo512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    historyApiFallback: true, // Ensure SPA fallback to index.html for unknown routes
  },
  build: {
    outDir: "dist",
  },
});
