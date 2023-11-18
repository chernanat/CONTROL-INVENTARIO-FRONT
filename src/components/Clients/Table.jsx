import React, { useEffect } from "react";
import DataTable from "react-data-table-component";

const Table = ({ clients, deleteClient, listClient, errors, setCancel }) => {
  const handleDelete = async (id) => {
    await deleteClient(id);
    setCancel(false);
  };

  const handleUpdateClient = async (id) => {
    await listClient(id);
  };

  useEffect(() => {}, [errors]);

  const columns = [
    { name: "Nombre Cliente", selector: "nombre", sortable: true },
    { name: "Apellido Cliente", selector: "apellido", sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="space-x-2">
          <button
            className="text-white px-2 py-2 rounded bg-blue-800 hover:bg-blue-700"
            onClick={() => {
              handleUpdateClient(row.id);
              setCancel(true);
            }}
          >
            Actualizar
          </button>
          <button
            className="text-white px-2 py-2 rounded bg-red-800 hover:bg-red-700"
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="relative overflow-x-auto rounded">
      <DataTable
        title="Clientes"
        columns={columns}
        data={clients}
        pagination
        highlightOnHover
        responsive
        searchable
      />
    </div>
  );
};

export default Table;
