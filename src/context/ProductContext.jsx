import { createContext, useContext, useEffect, useState } from "react";
import {
  getProducts,
  productRequest,
  updateProduct,
  delProduct,
  getProduct,
} from "../services/product";

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProduct debe ser usado dentro de un ProductContextProvider"
    );
  }
  return context;
};

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState([]);
  const [success, setSucess] = useState(false);

  const registerProduct = async (product) => {
    try {
      const newproduct = await productRequest(product);
      console.log(newproduct.data);
      setProduct(newproduct.data);
      setErrors([]);
      setSucess(true);
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

  const listProducts = async () => {
    try {
      const products = await getProducts();
      setProducts(products.data);
      setSucess(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const listProduct = async (id) => {
    try {
      const product = await getProduct(id);
      console.log(product.data);
      setProduct(product.data);
      // setSucess(false);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.errors);
    }
  };

  const upgradeProduct = async (id, product) => {
    try {
      const upgradedProduct = await updateProduct(id, product);
      console.log(upgradedProduct.data);
      setProduct(upgradedProduct.data);
      setErrors([]);
      setSucess(true);
      listProducts();
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.errors);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const product = await delProduct(id);
      listProducts();
      setErrors([]);
      setSucess(true);
      setProduct(product.data);
    } catch (error) {
      console.log(error);
      setErrors(error);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        registerProduct,
        product,
        products,
        listProduct,
        listProducts,
        success,
        errors,
        deleteProduct,
        upgradeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
