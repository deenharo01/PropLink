import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
const rootElement = document.getElementById("root");
if (!rootElement) {
  document.body.innerHTML = `
    <div style="
      padding: 40px;
      font-family: Arial, sans-serif;
      color: red;
      background: white;
    ">
      <h1>PropLink Error</h1>
      <p>React could not find the root element.</p>
      <p>Check your index.html file.</p>
    </div>
  `;
} else {
  createRoot(rootElement).render(
    <App />
  );
}
