import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../public/assets",
    emptyOutDir: true,
    sourcemap: true,
    manifest: {
      fileName: ".vite/manifest.json",
    },
    rollupOptions: {
      input: {
        main: "./main.tsx",
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "assets/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
    cssCodeSplit: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});