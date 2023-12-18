import { useEffect } from "react";

const Table = ({ clients, deleteClient, listClient, errors, setCancel }) => {
  const handleDelete = async (id) => {
    await deleteClient(id);
    setCancel(false);
  };
  const handleUpdateClient = async (id) => {
    await listClient(id);
  };

  useEffect(() => {}, [errors]);
  return (
    <div className="relative overflow-x-auto rounded">
      <table className="w-full text-sm text-left rtl:text-right text-white-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-2 py-3 text-center">Nombre Cliente</th>
            <th className="px-2 py-3 text-center">Apellido Cliente</th>
            <th className="px-2 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="odd:bg-white odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b dark:border-gray-800">
          {clients.map((client, index) => (
            <tr key={index}>
              <td className="px-2 py-2 text-center">{client.nombre}</td>
              <td className="px-2 py-2 text-center">{client.apellido}</td>
              <td className="px-2 py-2 space-x-2 text-center">
                <button
                  className="text-white px-2 py-2 rounded bg-blue-800 hover:bg-blue-700 font-bold"
                  onClick={() => {
                    handleUpdateClient(client.id);
                    setCancel(true);
                  }}
                >
                  Actualizar
                </button>
                <button
                  className="text-white px-2 py-2 rounded bg-red-800 hover:bg-red-700 font-bold"
                  onClick={() => {
                    handleDelete(client.id);
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
