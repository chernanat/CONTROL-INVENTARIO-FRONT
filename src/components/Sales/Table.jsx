import { useEffect } from "react";

const Table = ({
  sales,
  deleteSale,
  listSale,
  errors,
  saleproductclient,
  setCancel,
  setHistorial,
  listSaleWithClient,
}) => {
  const handleDelete = async (id) => {
    await deleteSale(id);
    setCancel(false);
    setHistorial(false);
  };
  const handleUpdateSale = async (id) => {
    await listSale(id);
    setCancel(true);
    setHistorial(false);
  };

  const handleHistorial = async (id) => {
    console.log(id);
    listSaleWithClient(id);
    await setHistorial(true);
  };

  useEffect(() => {}, [sales, errors, saleproductclient]);
  return (
    <div className="relative overflow-x-auto rounded-md mt-2">
      <table className="w-full text-sm text-left rtl:text-right text-white-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Nombre Cliente</th>
            <th className="px-6 py-3">Apellido Cliente</th>
            <th className="px-5 py-3 text-center">Producto</th>
            <th className="px-4 py-3 text-center">Cantidad Comprada</th>
            <th className="px-4 py-3 text-center">Precio</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-1 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="odd:bg-white odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b dark:border-gray-800 tex">
          {saleproductclient.map((sale, index) => (
            <tr key={index}>
              <td className="px-6 py-4">
                {sale.cliente?.nombre || "No Aplica"}
              </td>
              <td className="px-6 py-4">
                {sale.cliente?.apellido || "No Aplica"}
              </td>
              <td className="px-6 py-4">{sale.producto.nombre}</td>
              <td className="px-2 py-4 text-center">{sale.cantidad}</td>
              <td className="px-4 py-4">
                {Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(sale.producto.precio)}
              </td>
              <td className="px-5 py-4 font-extrabold text-slate-300">
                {Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(sale.producto.precio * sale.cantidad)}
              </td>
              <td className="px-6 py-4 space-x-2">
                <button
                  className="text-white px-2 py-2 rounded bg-blue-800 hover:bg-blue-700 font-bold"
                  onClick={() => {
                    handleUpdateSale(sale.id);
                  }}
                >
                  Actualizar
                </button>
                <button
                  className="text-white px-2 py-2 rounded bg-red-800 hover:bg-red-700 font-bold"
                  onClick={() => {
                    handleDelete(sale.id);
                  }}
                >
                  Eliminar
                </button>
                {sale.cliente?.id && (
                  <button
                    className="text-white px-2 py-2 rounded bg-emerald-600 hover:bg-indigo-700 font-bold"
                    onClick={() => {
                      handleHistorial(sale.cliente?.id);
                      setCancel(false);
                    }}
                  >
                    Historial de {sale.cliente?.nombre}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
