import React, { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";
import { useClient } from "../context/ClientContext";
import { useSale } from "../context/SaleContext";
import reactImage from "../assets/react.svg";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const HomePage = () => {
  const { products, listProducts, incrementProduct, decrementProduct, errors } =
    useProduct();

  const { clients, listClients } = useClient();

  const { listSalesAssociations, saleproductclient } = useSale();

  const totalProducts = products.reduce(
    (acumulador, product) => acumulador + product.cantidad,
    0
  );

  const totalEarns = saleproductclient.reduce(
    (acumulador, sale) => acumulador + sale.cantidad * sale.producto.precio,
    0
  );

  const totalClients = clients.length;

  const onIncrement = (id) => {
    incrementProduct(id);
  };
  const onDecrement = (id) => {
    decrementProduct(id);
  };

  const handleError = async (errors) => {
    if (errors) {
      await errors.forEach((error) => {
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

  useEffect(() => {
    listProducts();
    listClients();
    handleError();
    listSalesAssociations();
  }, [errors]);
  return (
    <div className="relative flex">
      <div className="flex-wrap w-1/2">
        <h1 className="text-2xl text-center font-bold uppercase mt-2">
          Lista De Productos
        </h1>
        <div className="grid grid-cols-3 w-full mt-2 ">
          {products.map((product, index) => (
            <div
              key={index}
              className={
                product.cantidad !== 0
                  ? "border-2 border-slate-600 hover:border-slate-800 mx-4 mb-4 gap-4 rounded shadow-lg shadow-slate-600"
                  : "border-2 border-slate-600 hover:border-slate-800 mx-4 mb-4 gap-4 rounded shadow-lg shadow-slate-600 opacity-50"
              }
            >
              <div className="text-xl border border-slate-700 font-bold text-center">
                {product.nombre}
              </div>
              <img
                className="mx-auto my-auto mt-2 h-20 w-20 animate-spin"
                src={reactImage}
                alt="react"
              />
              <div className="mx-2 mt-2 text-lg font-semibold">
                Precio: $ {product.precio}
              </div>
              <div className="mx-2 text-lg font-semibold">
                Disponibilidad: {product.cantidad}
              </div>
              <div className="mt-2 mb-2 flex justify-center">
                {product.cantidad !== 0 ? (
                  <div>
                    {" "}
                    <button
                      onClick={() => {
                        onIncrement(product.id);
                      }}
                      className="text-white mx-2 border bg-green-600 rounded text-center font-semibold px-2 py-2 hover:bg-green-700"
                    >
                      Incrementar
                    </button>
                    <button
                      onClick={() => {
                        onDecrement(product.id);
                      }}
                      className="text-white mx-2 border bg-red-600 rounded text-center font-semibold px-2 py-2 hover:bg-red-700"
                    >
                      Disminuir
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onIncrement(product.id);
                    }}
                    className="mx-2 border bg-green-500 rounded text-center font-semibold px-2 py-2 hover:bg-green-800"
                  >
                    Incrementar
                  </button>
                )}
              </div>
              <div
                className={
                  product.cantidad === 0
                    ? "bg-red-500 px-30 py-1 rounded-none text-white uppercase font-bold text-center animate-pulse"
                    : product.cantidad < 5
                    ? "bg-yellow-500 px-2 py-1 rounded-none text-white uppercase font-bold text-center"
                    : "bg-green-500 px-2 py-1 rounded-none text-white uppercase font-bold text-center"
                }
              >
                {product.cantidad === 0
                  ? "Sin Stock"
                  : product.cantidad < 5
                  ? "Bajo"
                  : "Alto"}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 mt-4 mx-4">
        <div className="border border-gray-600 rounded-lg shadow-lg shadow-black bg-gray-300">
          <h1 className="text-black font-bold text-2xl mx-2">
            Total de Productos: {totalProducts}
          </h1>
          {/* <h1 className="text-black font-bold text-2xl mx-2">
            Total de Ventas:
          </h1> */}
          <h1 className="text-black font-bold text-2xl mx-2">
            Total de Clientes: {totalClients}
          </h1>
          <h1 className="text-black font-bold text-2xl mx-2">
            Total de Ganancias:{" "}
            {Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(totalEarns)}
          </h1>
          {/* <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={products.map((product) => ({
                cantidad: product.cantidad,
                fecha: new Date(product.createdAt),
              }))}
              margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis dataKey="cantidad" />
              <Area
                type="monotone"
                dataKey="cantidad"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer> */}
        </div>
        <div className="mt-4"></div>
      </div>
    </div>
  );
};

export default HomePage;
