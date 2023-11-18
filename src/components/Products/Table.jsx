import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Table = ({
  products,
  deleteProduct,
  listProduct,
  product,
  errors,
  setCancel,
}) => {
  const handleDelete = async (id) => {
    await deleteProduct(id);
    setCancel(false);
  };
  const handleUpdateProduct = async (id) => {
    await listProduct(id);
  };

  useEffect(() => {}, [product, errors]);
  return (
    <div className="relative overflow-x-auto rounded">
      <table className="w-full text-sm text-left rtl:text-right text-white-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-2">Id</th>
            <th className="px-6 py-2">Nombre Producto</th>
            <th className="px-6 py-2">Precio</th>
            <th className="px-6 py-2">Cantidad</th>
            <th className="px-6 py-2">Stock</th>
            <th className="px-6 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="odd:bg-white odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b dark:border-gray-800">
          {products.map((product, index) => (
            <tr key={index}>
              <td className="px-6 py-2">{product.id}</td>
              <td className="px-6 py-2">{product.nombre}</td>
              <td className="px-6 py-2">
                {Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(product.precio)}
              </td>
              <td className="px-6 py-2">{product.cantidad}</td>
              <td
                className={
                  product.cantidad === 0
                    ? "bg-red-500 px-30 py-1 rounded-3xl text-white uppercase font-bold text-center"
                    : product.cantidad < 5
                    ? "bg-yellow-500 px-2 py-1 rounded-3xl text-white uppercase font-bold text-center"
                    : "bg-green-500 px-2 py-1 rounded-3xl text-white uppercase font-bold text-center"
                }
              >
                {product.cantidad === 0
                  ? "Sin Stock"
                  : product.cantidad < 5
                  ? "Bajo"
                  : "Alto"}
              </td>
              <td className="px-6 py-2 space-x-2">
                <button
                  className="text-white px-2 py-2 rounded bg-blue-800 hover:bg-blue-700"
                  onClick={() => {
                    handleUpdateProduct(product.id);
                    setCancel(true);
                  }}
                >
                  Actualizar
                </button>
                <button
                  className="text-white px-2 py-2 rounded bg-red-800 hover:bg-red-700"
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
