import React from "react";

const TableHistorial = ({ saleclient }) => {
  const total = saleclient.reduce(
    (acumulador, venta) => acumulador + venta.producto.precio * venta.cantidad,
    0
  );

  return (
    <div className="relative overflow-x-auto rounded-md">
      <h1 className="text-black text-3xl font-bold flex justify-center">
        Historial de {saleclient[0]?.cliente.nombre}
      </h1>
      <table className="w-full text-sm text-left rtl:text-right text-white-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Nombre Producto</th>
            <th className="px-6 py-3">Precio</th>
            <th className="px-6 py-3">Cantidad</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Fecha de Venta</th>
          </tr>
        </thead>
        <tbody className="odd:bg-white odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b dark:border-gray-800">
          {saleclient.map((sale, index) => (
            <tr key={index}>
              <td className="px-6 py-4">{sale.producto.nombre}</td>
              <td className="px-6 py-4">
                {Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(sale.producto.precio)}
              </td>
              <td className="px-6 py-4">{sale.cantidad}</td>
              <td className="px-6 py-4">
                {Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(sale.producto.precio * sale.cantidad)}
              </td>
              <td className="px-6 py-4">
                {new Date(sale.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="text-black text-2xl font-bold flex justify-start">
        Total comprado: {''}
          {Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(total)}
      </h1>
    </div>
  );
};

export default TableHistorial;
