import { createContext, useContext, useState } from "react"; //este es el contexto de la app es decir el padre que se encargara de enviar o suplir a components, pages etc.
import {
  delClient,
  getClient,
  getClients,
  registerRequest,
  updateClient,
} from "../services/client";

const ClientContext = createContext();

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient debe ser usado dentro de un AppContextProvider");
  }
  return context;
};

export const ClientContextProvider = ({ children }) => {
  const [client, setClient] = useState({});
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [clients, setClients] = useState([]);

  const registerClient = async (client) => {
    try {
      const res = await registerRequest(client);
      console.log(res.data);
      setClient(res.data);
      setErrors([]);
      setSuccess(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.errors);
    }
  };

  const listClients = async () => {
    try {
      const clients = await getClients();
      setClients(clients.data);
    } catch (error) {
      console.log(error);
      // setErrors(error);
    }
  };

  const listClient = async (id) => {
    try {
      const client = await getClient(id);
      setClient(client.data);
      console.log(client.data);
    } catch (error) {
      console.log(error);
      // setErrors(error);
    }
  };

  const upgradeClient = async (id, client) => {
    try {
      const upgradedClient = await updateClient(id, client);
      console.log(upgradedClient.data);
      setClient(upgradedClient.data)
      setErrors([]);
      setSuccess(true);
      listClients();
    } catch (error) {
      // console.log(error);
      setErrors(error.response.data.errors);
    }
  };

  const deleteClient = async (id) => {
    try {
      const client = await delClient(id);
      listClients();
      setErrors([]);
      setSuccess(true);
      setClient(client.data);
    } catch (error) {
      console.log(error);
      setErrors(error);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        registerClient,
        client,
        errors,
        success,
        listClients,
        clients,
        deleteClient,
        listClient,
        upgradeClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
