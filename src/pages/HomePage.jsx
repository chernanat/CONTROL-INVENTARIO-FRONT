import React, { useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import reactImage from "../assets/react.svg";

const HomePage = () => {
  const { products, listProducts } = useProduct();
  console.log(products);
  useEffect(() => {
    listProducts();
  }, []);
  return (
    <div className="relative flex">
      <div className="flex-wrap w-1/2">
        <h1 className="text-2xl text-center font-bold uppercase mt-2">
          Lista De Productos
        </h1>
        <div className="grid grid-cols-3 w-full mt-2">
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
                    <button className="text-white mx-2 border bg-green-600 rounded text-center font-semibold px-2 py-2 hover:bg-green-700">
                      Incrementar
                    </button>
                    <button className="text-white mx-2 border bg-red-600 rounded text-center font-semibold px-2 py-2 hover:bg-red-700">
                      Disminuir
                    </button>
                  </div>
                ) : (
                  <button className="mx-2 border bg-green-500 rounded text-center font-semibold px-2 py-2 hover:bg-green-800">
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
      <div className="w-1/2 bg-slate-500">
        <div className="border-blue-600 dark:border">cuadro</div>
      </div>
    </div>
  );
};

export default HomePage;
