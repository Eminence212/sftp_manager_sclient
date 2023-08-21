import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Chart as Chartjs, registerables} from "chart.js"
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import DataProvider from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
Chartjs.register(...registerables)
root.render(
  <DataProvider>
    <ScopedCssBaseline>
      <App />
    </ScopedCssBaseline>
  </DataProvider>
);
