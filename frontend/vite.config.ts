import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

function githubPagesSpaFallback() {
  return {
    name: "github-pages-spa-fallback",
    closeBundle() {
      const index = path.resolve(root, "dist/index.html");
      if (existsSync(index)) {
        copyFileSync(index, path.resolve(root, "dist/404.html"));
      }
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
      "lucide-react": path.resolve(root, "src/lib/lucide-react.tsx"),
      "lucide-react-upstream": path.resolve(root, "node_modules/lucide-react"),
      recharts: path.resolve(root, "src/lib/recharts.tsx"),
      "recharts-upstream": path.resolve(root, "node_modules/recharts"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8001",
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
