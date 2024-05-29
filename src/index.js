import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          fontFamily: '"Poppins",sans-serif',
          backgroundColor: "var(--light-grey)",
          fontWeight: "500",
          fontSize:"17px",
          textAlign:"center",
        },
        duration: 5000,
      }}
    />
    <App />
  </BrowserRouter>
);
