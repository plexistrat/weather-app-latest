import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import WeatherApp from "./WeatherApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <WeatherApp /> */}
  </React.StrictMode>
);
