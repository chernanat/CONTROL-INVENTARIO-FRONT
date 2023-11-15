import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Table = ({
  clients,
  deleteClient,
  listClient,
  client,
  upgradeClient,
  errors,
  setCancel,
}) => {
  const { setValue } = useForm();

  const handleDelete = async (id) => {
    await deleteClient(id);
    setCancel(false);
  };
  const handleUpdateClient = async (id) => {
    await listClient(id);
  };

  // const onUpdateSubmit = handleSubmit((values) => {
  //   upgradeClient(client.id, values);
  //   setCancel(false);
  // });

  // const onCancel = () => {
  //   setCancel(false);
  // };

  useEffect(() => {
    // setValue("nombre", client.nombre);
    // setValue("apellido", client.apellido);
  }, [client, errors]);
  return (
    <div className="relative overflow-x-auto rounded">
      <table className="w-full text-sm text-left rtl:text-right text-white-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Id</th>
            <th className="px-6 py-3">Nombre Cliente</th>
            <th className="px-6 py-3">Apellido Cliente</th>
            <th className="px-6 py-3">Operation</th>
          </tr>
        </thead>
        <tbody className="odd:bg-white odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b dark:border-gray-800">
          {clients.map((client, index) => (
            <tr key={index}>
              <td className="px-6 py-4">{client.id}</td>
              <td className="px-6 py-4">{client.nombre}</td>
              <td className="px-6 py-4">{client.apellido}</td>
              <td className="px-6 py-4 space-x-2">
                <button
                  className="text-white px-2 py-2 rounded bg-blue-800 hover:bg-blue-700"
                  onClick={() => {
                    handleUpdateClient(client.id);
                    setCancel(true);
                  }}
                >
                  Actualizar
                </button>
                <button
                  className="text-white px-2 py-2 rounded bg-red-800 hover:bg-red-700"
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
      {/* {cancel && (
        <div>
          <h2>Formulario Actualizacion</h2>
          <form onSubmit={onUpdateSubmit}>
            <div>
              <label>Ingrese Nombre del Cliente:</label>
              <input type="text" {...register("nombre", { required: false })} />
            </div>
            <div>
              <label>Ingrese el apellido:</label>
              <input
                type="text"
                {...register("apellido", { required: false })}
              />
            </div>
            <button type="submit">Actualizar</button>
            <button onClick={onCancel}>Cancel</button>
          </form>
        </div>
      )} */}
    </div>
  );
};

export default Table;
