import { createContext, useContext, useState } from "react";
import {
  decrementShop,
  delShop,
  delShops,
  getShops,
  incrementShop,
} from "../services/cart";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un AppContextProvider");
  }
  return context;
};

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [carts, setCarts] = useState([]);
  const [errors, setErrors] = useState([]);
  const [success, setSucess] = useState(false);

  // const addShop = async (shop) => {
  //   try {
  //     const newShop = await createShop(shop);
  //     setCart(newShop.data);
  //     setErrors([]);
  //     setSucess(true);
  //     setTimeout(() => {
  //       setSucess(false);
  //     }, 2000);
  //   } catch (error) {
  //     if (error.response.data.errors) {
  //       setErrors(error.response.data.errors);
  //       setTimeout(() => {
  //         setErrors([]);
  //       }, 2000);
  //     } else if (
  //       Array.isArray(error.response.data) &&
  //       error.response.data.length > 0
  //     ) {
  //       setErrors([error.response.data]);
  //       setTimeout(() => {
  //         setErrors([]);
  //       }, 2000);
  //     } else {
  //       console.error("Error inesperado:", error.response);
  //     }
  //   }
  // };

  const increment = async (shop) => {
    try {
      const shops = await incrementShop(shop);
      setCart(shops.data);
      console.log(cart);
      listShops();
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
        console.error("Error inesperado del carrito:", error.response);
      }
    }
  };

  const decrement = async (shop) => {
    try {
      const decrementedShop = await decrementShop(shop);
      setCart(decrementedShop.data);
      listShops();
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

  const listShops = async () => {
    try {
      const shops = await getShops();
      setCarts(shops.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  //esta consulta trae las ventas con su producto y cliente respectivamente
  const listShopsAssociations = async () => {
    try {
      const shops = await salesWithclientProduct();
      setSaleProductClient(shops.data);
    } catch (error) {
      console.log(error.response.data);
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

  const deleteShop = async (id) => {
    try {
      const shop = await delShop(id);
      listShops();
      setErrors([]);
      setSucess(true);
      setCart(shop.data);
      setTimeout(() => {
        setSucess(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setErrors(error);
    }
  };

  const deleteShops = async () => {
    try {
      const shop = await delShops();
      listShops();
      setErrors([]);
      setSucess(true);
      setCart(shop.data);
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
        }, 3000);
      } else {
        console.error("Error inesperado:", error.response);
      }
    }
  };
  return (
    <CartContext.Provider
      value={{
        listShops,
        deleteShop,
        deleteShops,
        increment,
        decrement,
        errors,
        success,
        carts,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
