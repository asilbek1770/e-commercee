import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
//components
import App from "./App";

//styles
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

console.log("development : ", process.env);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

