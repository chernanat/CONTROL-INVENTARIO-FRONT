import { useEffect } from "react";

const Table = ({
  sales,
  deleteSale,
  listSale,
  errors,
  saleproductclient,
  setCancel,
}) => {
  const handleDelete = async (id) => {
    await deleteSale(id);
    setCancel(false);
  };
  const handleUpdateSale = async (id) => {
    await listSale(id);
  };

  useEffect(() => {
    // setValue("producto_id", sale.producto_id);
    // setValue("cliente_id", sale.cliente_id);
  }, [sales, errors, saleproductclient]);
  return (
    <div className="relative overflow-x-auto rounded">
      <table className="w-full text-sm text-left rtl:text-right text-white-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Nombre Cliente</th>
            <th className="px-6 py-3">Apellido Cliente</th>
            <th className="px-6 py-3">Nombre Producto</th>
            <th className="px-6 py-3">Cantidad Comprada</th>
            <th className="px-6 py-3">Precio</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="odd:bg-white odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b dark:border-gray-800">
          {saleproductclient.map((sale, index) => (
            <tr key={index}>
              <td className="px-6 py-4">{sale.cliente.nombre}</td>
              <td className="px-6 py-4">{sale.cliente.apellido}</td>
              <td className="px-6 py-4">{sale.producto.nombre}</td>
              <td className="px-6 py-4">{sale.cantidad}</td>
              <td className="px-6 py-4">${sale.producto.precio}</td>
              <td className="px-6 py-4">
                ${sale.producto.precio * sale.cantidad}
              </td>
              <td className="px-6 py-4 space-x-2">
                <button
                  className="text-white px-2 py-2 rounded bg-blue-800 hover:bg-blue-700"
                  onClick={() => {
                    handleUpdateSale(sale.id);
                    setCancel(true);
                  }}
                >
                  Actualizar
                </button>
                <button
                  className="text-white px-2 py-2 rounded bg-red-800 hover:bg-red-700"
                  onClick={() => {
                    handleDelete(sale.id);
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
