import React from "react";
import { createRoot } from "react-dom/client";
import DocsApp from "./docs/DocsApp"; // tu componente principal de docs

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("docs-root");
  if (!el) return;

  const root = createRoot(el);
  root.render(<DocsApp />);
});
