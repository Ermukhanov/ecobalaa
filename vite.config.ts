import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Get all HTML files from root (except index.html - it's the main React app)
  const htmlFiles: Record<string, string> = {};
  const htmlFileList = fs.readdirSync("./").filter(f => f.endsWith(".html") && f !== "index.html");
  
  htmlFileList.forEach(file => {
    const name = file.replace(".html", "");
    htmlFiles[name] = path.resolve(__dirname, file);
  });

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          ...htmlFiles,
        },
      },
    },
  };
});
