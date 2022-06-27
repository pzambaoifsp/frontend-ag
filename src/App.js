import React, { Component } from "react";
import "./App.css";
import "./style/bootstrap/bootstrap.css"
import { AppRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/footer/Footer";

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppRoutes />
        <Footer/>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />

      </div>
    );
  }
}

export default App;
