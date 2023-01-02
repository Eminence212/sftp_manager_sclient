import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import DataProvider from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataProvider>
    <ScopedCssBaseline>
      <App />
    </ScopedCssBaseline>
  </DataProvider>
);
