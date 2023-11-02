import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Table = ({
  clients,
  deleteClient,
  listClient,
  client,
  upgradeClient,
  errors,
}) => {
  const { register, handleSubmit, setValue } = useForm();

  const [cancel, setCancel] = useState(false);
  const handleDelete = async (id) => {
    await deleteClient(id);
    setCancel(false);
  };
  const handleUpdateClient = async (id) => {
    await listClient(id);
  };

  const onUpdateSubmit = handleSubmit((values) => {
    upgradeClient(client.id, values);
    setCancel(false);
  });

  const onCancel = () => {
    setCancel(false);
  };

  useEffect(() => {
    setValue("nombre", client.nombre);
    setValue("apellido", client.apellido);
  }, [client, errors]);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre Cliente</th>
            <th>Apellido Cliente</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.id}</td>
              <td>{client.nombre}</td>
              <td>{client.apellido}</td>
              <td>
                <button
                  onClick={() => {
                    handleUpdateClient(client.id);
                    setCancel(true);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    handleDelete(client.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cancel && (
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
      )}
    </>
  );
};

export default Table;
