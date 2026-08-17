import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
const root = document.getElementById("root");
if (!root) {
  document.body.innerHTML = `
    <div style="
      padding: 40px;
      font-family: Arial, sans-serif;
      color: red;
    ">
      <h1>PropLink Error</h1>
      <p>Root element was not found.</p>
    </div>
  `;
} else {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
