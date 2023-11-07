import React, { createContext, useContext, useState } from "react";
import { delSale, getSale, getSales, saleRequest, salesWithclientProduct, updateSale } from "../services/sale";

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
  const [success, setSucess] = useState(false);
  const [saleproductclient, setSaleProductClient] = useState([]);

  const registerSale = async (sale) => {
    try {
      const newSale = await saleRequest(sale);
      console.log(newSale.data);
      setSale(newSale.data);
      setErrors([]);
      setSucess(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.errors);
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
      console.log(sale.data);
      setSale(sale.data);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.errors);
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
    } catch (error) {
      console.log(error);
      setErrors(error);
    }
  };
  return <SaleContext.Provider value={{
    registerSale,
    listSales,
    listSale,
    upgradeSale,
    deleteSale,
    listSalesAssociations,
    errors, 
    success,
    sale,
    sales,
    saleproductclient
  }}>{children}</SaleContext.Provider>;
};
