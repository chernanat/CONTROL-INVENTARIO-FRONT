import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientPage from "./pages/ClientPage";
import { AppContextProvider } from "./context/AppContext";
("./context/AppContext");

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/client" element={<ClientPage></ClientPage>}></Route>
          <Route path="/product"></Route>
          <Route path="/sale"></Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
