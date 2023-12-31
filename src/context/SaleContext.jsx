import React, { createContext, useContext, useState } from "react";
import {
  delSale,
  getSale,
  getSales,
  saleRequest,
  salesWithclientProduct,
  salesWithClient,
  updateSale,
  createBulk,
} from "../services/sale";

const SaleContext = createContext();

export const useSale = () => {
  const context = useContext(SaleContext);
  if (!context) {
    throw new Error(
      "useProduct debe ser usado dentro de un ProductContextProvider"
    );
  }
  return context;
};

export const SaleContextProvider = ({ children }) => {
  const [sales, setSales] = useState([]);
  const [sale, setSale] = useState({});
  const [errors, setErrors] = useState([]);
  //manejo de errores al carrito de compras
  const [cartErrors, setCartErrors] = useState([]);
  const [success, setSucess] = useState(false);
  const [saleproductclient, setSaleProductClient] = useState([]);
  const [saleclient, setSaleClient] = useState([]);
  console.log(cartErrors);

  const registerSale = async (sale) => {
    try {
      const newSale = await saleRequest(sale);
      console.log("holas");
      setSale(newSale.data);
      setErrors([]);
      setSucess(true);
      setTimeout(() => {
        setSucess(false);
      }, 2000);
    } catch (error) {
      if (error.response.data.errors) {
        setErrors(error.response.data.errors);
        setTimeout(() => {
          setErrors([]);
        }, 2000);
      } else if (
        Array.isArray(error.response.data) &&
        error.response.data.length > 0
      ) {
        setErrors([error.response.data]);
        setTimeout(() => {
          setErrors([]);
        }, 2000);
      } else {
        console.error("Error inesperado:", error.response);
      }
    }
  };

  const bulkShop = async (shops, client_id) => {
    try {
      console.log("bulk");
      const objeto = { shops: shops, client_id: client_id };
      const fullCart = await createBulk(objeto);
      console.log(fullCart);
      setSale(fullCart.data);
      setCartErrors([]);
      setSucess(true);
      setTimeout(() => {
        setSucess(false);
      }, 2000);
    } catch (error) {
      if (error.response.data.errors) {
        setCartErrors(error.response.data.errors);
        setTimeout(() => {
          setErrors([]);
        }, 2000);
      } else if (
        Array.isArray(error.response.data) &&
        error.response.data.length > 0
      ) {
        console.log(error.response.data);
        setCartErrors([error.response.data]);
        setTimeout(() => {
          setErrors([]);
        }, 2000);
      } else {
        console.error("Error inesperado del sale Context:", error.response);
        setCartErrors([error.response.data.message]);
        setTimeout(() => {
          setCartErrors([]);
        }, 2000);
      }
    }
  };

  const listSales = async () => {
    try {
      const sales = await getSales();
      setSales(sales.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  //esta consulta trae las ventas con su producto y cliente respectivamente
  const listSalesAssociations = async () => {
    try {
      const sales = await salesWithclientProduct();
      setSaleProductClient(sales.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const listSale = async (id) => {
    try {
      const sale = await getSale(id);
      // console.log(sale.data);
      setSale(sale.data);
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.errors);
    }
  };

  const listSaleWithClient = async (id) => {
    try {
      const saleclient = await salesWithClient(id);
      setSaleClient(saleclient.data);
    } catch (error) {
      if (error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else if (
        Array.isArray(error.response.data) &&
        error.response.data.length > 0
      ) {
        setErrors([error.response.data]);
      } else {
        console.error("Error inesperado:", error.response);
      }
    }
  };

  const upgradeSale = async (id, sale) => {
    try {
      const upgradedSale = await updateSale(id, sale);
      console.log(upgradedSale.data);
      setSale(upgradedSale.data);
      setErrors([]);
      setSucess(true);
      listSales();
      setTimeout(() => {
        setSucess(false);
      }, 2000);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.errors);
    }
  };

  const deleteSale = async (id) => {
    try {
      const sale = await delSale(id);
      listSales();
      setErrors([]);
      setSucess(true);
      setSale(sale.data);
      setTimeout(() => {
        setSucess(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setErrors(error);
    }
  };
  return (
    <SaleContext.Provider
      value={{
        registerSale,
        bulkShop,
        listSales,
        listSale,
        upgradeSale,
        deleteSale,
        listSalesAssociations,
        listSaleWithClient,
        cartErrors,
        errors,
        success,
        sale,
        sales,
        saleproductclient,
        saleclient,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};
