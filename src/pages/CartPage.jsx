import React, { useEffect, useState } from "react";
import reactImage from "../assets/react.svg";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSale } from "../context/SaleContext";
import { useClient } from "../context/ClientContext";
import Swal from "sweetalert2";
import { Toaster, toast } from "sonner";

const CartPage = ({}) => {
  const {
    cart,
    listShops,
    carts,
    increment,
    decrement,
    deleteShop,
    deleteShops,
    success,
    errors,
  } = useCart();
  const { clients, listClients } = useClient();
  const { bulkShop, cartErrors } = useSale();
  const [check, setCheck] = useState("No");
  const [client, setClient] = useState(null);
  const [hideError, setHideError] = useState(false);
  const [efectivo, setEfectivo] = useState(0);
  const [devuelta, setDevuelta] = useState(0);
  console.log("errorres del carritooooooo....");
  console.log(cartErrors);

  let subtotal = carts.reduce(
    (acumulador, cart) => acumulador + cart.cantidad * cart.producto.precio,
    0
  );

  let total = subtotal + 0;

  const handleEfectivo = (efectivo) => {
    setTimeout(() => {
      if (efectivo != 0 && efectivo > 0) {
        setEfectivo(parseInt(efectivo));
        let devuelta = total - efectivo;
        setDevuelta(devuelta);
      } else {
        setDevuelta(0);
      }
    }, 500);
  };

  const handleSuccess = () => {
    if (errors.length === 0 && success) {
      Swal.fire(`${cart.message}!`, "Transaccion con Exito!", "success");
    }
  };

  const handleError = async (errors) => {
    if (errors.length > 0) {
      await cartErrors.forEach((error) => {
        toast.error("Ops! Algo ha ido Mal!", {
          description: `${error.msg}`,
          position: "top-center",
        });
      });
      setHideError(true);
      setTimeout(() => {
        setHideError(false);
      }, 3000);
    }
  };

  const handleErrorCart = async (cartErrors) => {
    if (cartErrors.length > 0) {
      await cartErrors.forEach((error) => {
        toast.error("Ops! Algo ha ido Mal!", {
          description: error.msg ? `${error.msg}` : `${error}`,
          position: "top-center",
        });
      });

      setHideError(true);
      setTimeout(() => {
        setHideError(false);
      }, 3000);
    }
  };

  const handleFactura = (carts, client_id) => {
    bulkShop(carts, client_id);
    console.log("compra emiidaaa");
    Swal.fire({
      title: "Facturando, Por Favor Espere...!",
      timerProgressBar: true,
      timer: 5000,
      icon: "info",
      showCloseButton: true,
      showConfirmButton: false,
    }).then((result) => {
      console.log(result);
    });
  };

  const onDecrement = (product) => {
    decrement(product);
  };

  const onDeleteShop = (id) => {
    deleteShop(id);
  };

  const onDeleteShops = () => {
    deleteShops();
  };

  const addToCart = (product) => {
    increment(product);
  };

  useEffect(() => {
    handleSuccess();
    handleErrorCart(cartErrors);
    handleError(errors);
    listShops();
    listClients();
  }, [errors, cartErrors]);

  return (
    <>
      <div className="container mt-4 mx-auto my-auto">
        <h1 className="text-2xl text-center">Carrito de Compras</h1>
        <div className="flex mx-auto mt-4 space-x-1">
          <div className="w-full">
            <div className="w-full p-8">
              <table className="w-full shadow-lg shadow-slate-600 rounded">
                <thead className="my-2 text-lg">
                  <tr>
                    <th className="border-b-2 border-gray-700">Imagen</th>
                    <th className="border-b-2 border-gray-700">Producto</th>
                    <th className="border-b-2 border-gray-700">Precio</th>
                    <th className="border-b-2 border-gray-700">Cantidad</th>
                    <th className="border-b-2 border-gray-700">Subtotal</th>
                    <th className="border-b-2 border-gray-700"> </th>
                  </tr>
                </thead>
                <tbody className="text-center text-lg my-10">
                  {carts.map((cart) => (
                    <tr key={cart.id_compra}>
                      <td className="border-b border-gray-500">
                        <div className="flex items-center justify-center">
                          <img
                            className="animate-spin mx-5 my-5"
                            src={reactImage}
                            alt="react"
                          />
                        </div>
                      </td>
                      <td className="border-b border-gray-500">
                        {cart.producto.nombre}
                      </td>
                      <td className="border-b border-gray-500">
                        {Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(cart.producto.precio)}
                      </td>
                      <td className="border-b border-gray-500">
                        <div className="flex items-center justify-center w-full">
                          <button
                            onClick={() => {
                              onDecrement(cart.producto);
                            }}
                            className="border border-gray-600 px-5 py-2 focus:bg-gray-300 focus:outline-none"
                          >
                            -
                          </button>
                          <span className="border border-gray-600 px-5 py-2">
                            {cart.cantidad}
                          </span>
                          <button
                            onClick={() => {
                              addToCart(cart.producto);
                            }}
                            className="border border-gray-600 px-5 py-2 focus:bg-gray-300 focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="border-b border-gray-500">
                        {Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(cart.producto.precio * cart.cantidad)}
                      </td>
                      <td className="border-b border-gray-500">
                        <button
                          onClick={() => {
                            onDeleteShop(cart.id_compra);
                          }}
                          className="text-black bg-red-500 px-2 py4 rounded font-bold hover:animate-pulse"
                        >
                          Quitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr className="border-b-2 border-gray-500 mt-8" />
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold px-4 mt-2">Subtotal</h1>
                <h1 className="text-lg font-semibold px-4 mt-2">
                  {Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(subtotal)}
                </h1>
              </div>
              {carts.length !== 0 && (
                <div className="">
                  <div className="mt-4 border-b-2 border-t-2 border-gray-400">
                    <label className="mx-8 text-lg font-bold uppercase">
                      Desea Asignar Un Cliente A Esta Venta?
                    </label>
                    <label className="text-lg font-bold">SI</label>
                    <input
                      className="mx-2"
                      type="radio"
                      onChange={(e) => {
                        setCheck(e.target.value);
                      }}
                      value={"Si"}
                      name="prueba"
                    />
                    <label className="text-lg font-bold">NO</label>
                    <input
                      className="mx-2"
                      type="radio"
                      onChange={(e) => {
                        setCheck(e.target.value);
                        setClient(null);
                      }}
                      value={"No"}
                      name="prueba"
                    />
                    {check === "Si" && (
                      <div>
                        <select
                          name="cliente_id"
                          className="mt-2 rounded mx-8 w-1/2 border py-2 font-semibold"
                          onChange={(e) => {
                            setClient(parseInt(e.target.value));
                          }}
                        >
                          <option className="font-extrabold" value="">
                            Selecciona un cliente
                          </option>

                          {clients.map((client) => (
                            <option value={client.id} key={client.id}>
                              {client.nombre} {client.apellido}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => {
                        onDeleteShops();
                      }}
                      className="bg-red-600 mx-2 my-2 rounded px-2 py-2 text-black font-semibold hover:bg-red-700 hover:animate-spin"
                    >
                      Vaciar Carrito
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-3/4 border-2 border-gray-900 mx-auto uppercase shadow-md h-82 shadow-slate-600">
            <h1 className="text-2xl font-semibold px-4">Total del Carrito</h1>
            <div className="w-100 border-t-2 border-gray-500"></div>
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold px-4 mt-2">Subtotal</h1>
              <h1 className="text-lg font-semibold px-4 mt-2">
                {Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(subtotal)}
              </h1>
            </div>
            {/* <div className="flex justify-between">
              <h1 className="text-lg font-semibold px-4 mt-2">Iva</h1>
              <h1 className="text-lg font-semibold px-4 mt-2">
                {Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(0)}
              </h1>
            </div> */}
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold px-4 mt-2">Descuentos</h1>
              <h1 className="text-lg font-semibold px-4 mt-2">
                {Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(0)}
              </h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-2xl font-extrabold px-4 mt-4">
                Total a pagar
              </h1>
              <h1 className="text-2xl font-extrabold px-4 mt-4">
                {Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(total)}
              </h1>
            </div>
            {carts.length !== 0 ? (
              <div>
                <div className="flex justify-between">
                  <h1 className="justify-start text-2xl font-bold px-4 mt-3">
                    Efectivo
                  </h1>
                  <input
                    type="number"
                    onChange={(e) => handleEfectivo(e.target.value)}
                    placeholder="Ingrese el Efectivo"
                    className="mt-2 px-2 py-2 mx-2 justify-end"
                  ></input>
                </div>
                <div className="flex justify-between">
                  <h1 className="justify-start text-2xl font-bold px-4 mt-3">
                    Devuelta
                  </h1>
                  <h1 className="text-xl font-extrabold px-4 mt-4">
                    {Intl.NumberFormat("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(devuelta)}
                  </h1>
                </div>
                <div className="flex flex-col items-center mt-6 space-y-1">
                  <button
                    onClick={() => {
                      handleFactura(carts, client);
                    }}
                    className="bg-black text-white font-bold text-lg rounded text-center w-full py-3 hover:bg-slate-800 uppercase"
                  >
                    Facturar
                  </button>
                  <button className="bg-white text-black font-bold text-lg rounded text-center w-full py-2 hover:bg-slate-200">
                    <Link to="/">Seguir Comprando</Link>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="uppercase text-center mt-8 text-red-500 font-bold text-lg">
                  Agrega productos Al Carrito Para Facturar!
                </h1>
              </div>
            )}
          </div>
        </div>
        <Toaster expand={true} richColors></Toaster>
      </div>
    </>
  );
};

export default CartPage;
