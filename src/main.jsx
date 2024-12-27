import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HangContextProvider } from "./Context/HangContext";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <HangContextProvider>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition:Bounce
    />
  </HangContextProvider>
);
