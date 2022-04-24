import React, { Component } from "react";
import "./App.css";
import "./style/bootstrap/bootstrap.css"

import { AppRoutes } from "./routes";

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppRoutes />
      </div>
    );
  }
}

export default App;
