import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AppRoutes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
