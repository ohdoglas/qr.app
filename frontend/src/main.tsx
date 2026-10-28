import React from "react";
import ReactDOM from "react-dom/client";
import "./css/reset.css";
import "./css/variables.css";
import "./css/global.css";
import App from "./App";
import { LanguageProvider } from "./i18n/LanguageProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
