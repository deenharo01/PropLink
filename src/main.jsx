import React from "react";
import { createRoot } from "react-dom/client";
const root = document.getElementById("root");
if (root) {
  root.innerHTML = `
    <div style="
      padding: 30px;
      font-family: Arial, sans-serif;
      color: black;
      background: white;
      text-align: center;
    ">
      <h1>PropLink JavaScript is working</h1>
      <p>The React entry point loaded successfully.</p>
    </div>
  `;
} else {
  document.body.innerHTML = `
    <div style="
      padding: 30px;
      font-family: Arial, sans-serif;
      color: red;
    ">
      <h1>Root element not found</h1>
    </div>
  `;
}
