//client
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientPage from "./pages/ClientPage";
import { ClientContextProvider } from "./context/ClientContext";
import { ProductContextProvider } from "./context/ProductContext";
import { ProductPage } from "./pages/ProductPage";
import { SaleContextProvider } from "./context/SaleContext";
import { SalePage } from "./pages/SalePage";
import HomePage from "./pages/HomePage";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <ClientContextProvider>
      <ProductContextProvider>
        <SaleContextProvider>
          <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route path="/client" element={<ClientPage></ClientPage>}></Route>
              <Route
                path="/product"
                element={<ProductPage></ProductPage>}
              ></Route>
              <Route path="/sale" element={<SalePage></SalePage>}></Route>
            </Routes>
          </BrowserRouter>
        </SaleContextProvider>
      </ProductContextProvider>
    </ClientContextProvider>
  );
}

export default App;
