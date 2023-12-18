import React, { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";
import { useClient } from "../context/ClientContext";
import { useSale } from "../context/SaleContext";
import reactImage from "../assets/react.svg";
import Swal from "sweetalert2";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";
import { useCart } from "../context/CartContext";

const HomePage = () => {
  const { addShop, increment, listShops, cart, errors, success } = useCart();
  const { products, listProducts, incrementProduct, decrementProduct } =
    useProduct();
  const { clients, listClients } = useClient();

  const { listSalesAssociations, saleproductclient, sales, listSales } =
    useSale();
  console.log(sales);

  const totalProducts = products.reduce(
    (acumulador, product) => acumulador + product.cantidad,
    0
  );

  const totalEarns = saleproductclient.reduce(
    (acumulador, sale) => acumulador + sale.cantidad * sale.producto.precio,
    0
  );

  const totalClients = clients.length;

  const dataPie = [
    { name: "Total De Productos", value: totalProducts },
    { name: "Total De ventas", value: sales.length },
    { name: "Total De Clientes", value: totalClients },
  ];

  const COLORS = ["#477A8B", "#598E6B", "#715E7F"]; // Tonos más oscuros: Azul oscuro, Verde oscuro, Morado oscuro

  const onIncrement = (id) => {
    incrementProduct(id);
  };
  const onDecrement = (id) => {
    decrementProduct(id);
  };
  const addToCart = (product) => {
    increment(product);
  };

  const handleSuccess = () => {
    if (errors.length === 0 && success) {
      Swal.fire(
        `Producto Agregado al Carrito!`,
        "Transaccion con Exito!",
        "success"
      );
    }
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
    listSales();
    listProducts();
    listClients();
    listShops();
    handleError();
    handleSuccess();
    listSalesAssociations();
  }, [errors]);
  return (
    <div className="relative flex">
      <div className="flex-wrap bg-slate-100 mx-2 mt-3 px-2 rounded-xl shadow-slate-700 shadow-xl">
        <h1 className="text-2xl text-center font-bold uppercase mt-2">
          Lista De Productos
        </h1>
        <div className="grid grid-cols-4 w-full mt-2">
          {products.map((product, index) => (
            <div
              key={index}
              className={
                product.cantidad !== 0
                  ? "border-2 border-slate-600 hover:border-slate-800 mx-4 mb-4 gap-4 rounded shadow-lg shadow-slate-600 bg-slate-200"
                  : "border-2 border-slate-600 hover:border-slate-800 mx-4 mb-4 gap-4 rounded shadow-lg shadow-slate-600 bg-slate-200 opacity-50"
              }
            >
              <div className="text-xl border-b-2 border-slate-600 hover:border-slate-800 font-bold text-center">
                {product.nombre}
              </div>
              <img
                className="mx-auto my-auto mt-2 h-20 w-20 animate-spin"
                src={reactImage}
                alt="react"
              />
              <div className="mx-2 mt-2 text-lg font-semibold">
                Precio:{" "}
                {Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(product.precio)}
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
                      className="text-white mx-2 border bg-red-500 rounded text-center font-semibold px-2 py-2 hover:bg-red-600"
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
              {product.cantidad !== 0 && (
                <div className="text-center justify-center">
                  <button
                    onClick={() => {
                      addToCart(product);
                    }}
                    className="text-white mx-2 border bg-blue-600 rounded text-center font-semibold px-2 py-2 hover:bg-blue-700"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              )}
              <div
                className={
                  product.cantidad === 0
                    ? "bg-red-500 px-30 py-5 rounded-none text-white uppercase font-bold text-center animate-pulse"
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
      <div className="w-2/5 mx-12 px-5 mt-3 bg-slate-100 rounded-xl shadow-slate-700 shadow-xl">
        <div className="mb-2">
          <h1 className="text-2xl text-center font-bold uppercase mt-2">
            Ventas
          </h1>
        </div>
        <ResponsiveContainer width="100%" height="50%">
          <AreaChart
            data={sales.map((sale) => ({
              cantidad: (sale.cantidad),
              fecha: new Date(sale.createdAt).toLocaleString('es-US'), // Mantener el formato original de la fecha
            }))}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis
              dataKey="cantidad"
              label={{ value: "Cantidad", angle: -90, position: "insideLeft" }}
            />
            <Area
              type="monotone"
              dataKey="cantidad"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Tooltip
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-2">
          <ResponsiveContainer
            width="100%"
            height={250}
            style={{ marginLeft: "40px" }}
          >
            <PieChart>
              <Pie
                data={dataPie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {dataPie.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* <h1 className="text-black font-bold text-2xl mx-2">
            Total de Ganancias:{" "}
            {Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(totalEarns)}
          </h1> */}

        {/* </div>
        <div className="mt-4"></div> */}
      </div>
    </div>
  );
};
export default HomePage;
