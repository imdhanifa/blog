import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "blogRemote",
      filename: "remoteEntry.js",
      exposes: {
        "./BlogApp": "./src/BlogApp.tsx",   // expose UI
        "./postsApi": "./src/api/posts.ts", // expose API
        "./types": "./src/types/post.ts",       // expose types
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  base: "/blog/",
  build: { target: "esnext" },
});
