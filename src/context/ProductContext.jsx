import { createContext, useContext, useEffect, useState } from "react";
import {
  getProducts,
  productRequest,
  updateProduct,
  delProduct,
  getProduct,
  decrement,
  increment,
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
      console.log(product);
      console.log(product.imagen[0])
      const newproduct = await productRequest(product);
      console.log(newproduct.data);
      setProduct(newproduct.data);
      setErrors([]);
      setSucess(true);
    } catch (error) {
      if (error.response.data.errors) {
        console.log('primera');
        setErrors(error.response.data.errors);
        setTimeout(() => {
          setErrors([]);
        }, 2000);
      } else if (
        Array.isArray(error.response.data) &&
        error.response.data.length > 0
      ) {
        console.log('seugnd');
        setErrors([error.response.data]);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
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
      setTimeout(() => {
        setErrors([]);
      }, 2000);
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
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  };

  const incrementProduct = async (id) => {
    try {
      const product = await increment(id);
      listProducts();
      setErrors([]);
      setSucess(true);
      setProduct(product.data);
    } catch (error) {
      console.log(error);
      setErrors(error);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  };

  const decrementProduct = async (id) => {
    try {
      const product = await decrement(id);
      listProducts();
      setErrors([]);
      setSucess(true);
      setProduct(product.data);
    } catch (error) {
      console.log(error);
      setErrors(error);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
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
        incrementProduct,
        decrementProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
