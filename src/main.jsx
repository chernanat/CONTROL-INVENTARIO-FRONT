import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClientContextProvider } from "./context/ClientContext.jsx";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { SaleContextProvider } from "./context/SaleContext.jsx";
//toca importar o meter el app en un contexto
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClientContextProvider>
      <ProductContextProvider>
        <SaleContextProvider>
          <App />
        </SaleContextProvider>
      </ProductContextProvider>
    </ClientContextProvider>
  </React.StrictMode>
);
