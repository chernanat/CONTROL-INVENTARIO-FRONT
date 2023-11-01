import { createContext, useContext, useState } from "react"; //este es el contexto de la app es decir el padre que se encargara de enviar o suplir a components, pages etc.
import { registerRequest } from "../services/client";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe ser usado dentro de un AppContextProvider");
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  const [client, setClient] = useState();
  const [errors, setErrors] = useState([]);
  const registerClient = async (client) => {
    try {
      const res = await registerRequest(client);
      console.log(res.data);
      setClient(res.data);
    } catch (error) {
      setErrors(error.response.data.errors)
    }
  };
  return (
    <AppContext.Provider value={{ registerClient, client, errors }}>
      {children}
    </AppContext.Provider>
  );
};
