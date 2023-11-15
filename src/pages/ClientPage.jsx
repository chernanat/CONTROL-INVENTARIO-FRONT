import { useForm } from "react-hook-form";
import { useClient } from "../context/ClientContext";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Swal from "sweetalert2";
import Table from "../components/Clients/Table";

const ClientPage = () => {
  const {
    registerClient,
    client,
    errors,
    success,
    listClient,
    listClients,
    clients,
    deleteClient,
    upgradeClient,
  } = useClient();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [hideError, setHideError] = useState(false);
  const [cancel, setCancel] = useState(false);

  const onSubmit = handleSubmit((values) => {
    registerClient(values);
    reset();
  });

  const handleSuccess = () => {
    if (errors.length === 0 && success) {
      Swal.fire(`${client.message}!`, "Transaccion con Exito!", "success");
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

  const onUpdateSubmit = handleSubmit((values) => {
    upgradeClient(client.id, values);
    setCancel(false);
  });

  const onCancel = () => {
    setCancel(false);
    reset();
  };

  useEffect(() => {
    listClients();
    handleError(errors);
    handleSuccess();
    setValue("nombre", client.nombre);
    setValue("apellido", client.apellido);
  }, [client, errors]);

  return (
    <div className="container mx-auto flex justify-center items-center flex-col">
      <h1 className="text-4xl p-2 font-bold text-center">Pagina del Cliente</h1>
      <div>
        {!cancel && (
          <form
            onSubmit={onSubmit}
            className="bg-gray-100 shadow-md rounded px-4 py-4 mb-6 max-w-md mx-auto"
          >
            <div className="m-6">
              <h1 className="text-black font-bold text-3xl">Crear Cliente</h1>
              <div className="py-2 p-2">
                <label className="block font-bold text-black text-2xl">
                  Nombre del Cliente:
                </label>
                <input
                  className="mt-2 rounded w-full bg-gray-200 border py-1"
                  type="text"
                  {...register("nombre", { required: false })}
                />
              </div>
              <div className="py-2 p-2 mb-6">
                <label className="block font-bold text-black text-2xl">
                  Apellido del Cliente:
                </label>
                <input
                  className="mt-2 rounded w-full bg-gray-200 border py-1"
                  type="text"
                  {...register("apellido", { required: false })}
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="rounded bg-green-600 font-bold py-2 px-4 text-white hover:bg-green-700"
                  type="submit"
                >
                  Registrar
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      {cancel && (
        <div>
          <form
            onSubmit={onUpdateSubmit}
            className="bg-gray-100 shadow-md rounded px-4 py-4 mb-6 max-w-md mx-auto"
          >
            <div div className="m-6">
              <h1 className="text-black font-bold text-3xl">
                Actualizar Cliente
              </h1>
              <div className="py-2 p-2">
                <label className="block font-bold text-black text-2xl">
                  Nombre del Cliente:
                </label>
                <input
                  type="text"
                  {...register("nombre", { required: false })}
                  className="mt-2 rounded w-full bg-gray-200 border py-1"
                />
              </div>
            </div>
            <div className="py-2 p-2 mb-6">
              <label className="block font-bold text-black text-2xl">
                Apellido del Cliente:
              </label>
              <input
                type="text"
                {...register("apellido", { required: false })}
                className="mt-2 rounded w-full bg-gray-200 border py-1"
              />
            </div>
            <div className="flex justify-center space-x-2 mt-4">
              <button
                className="rounded bg-blue-600 px-2 py-2 hover:bg-blue-700 text-white font-bold"
                type="submit"
              >
                Actualizar
              </button>
              <button
                className="rounded bg-orange-600 px-2 py-2 hover:bg-orange-700 text-white font-bold"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div>
        {errors && hideError && (
          <div>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error.msg}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Toaster expand={true} richColors></Toaster>
      <Table
        clients={clients}
        client={client}
        deleteClient={deleteClient}
        listClient={listClient}
        upgradeClient={upgradeClient}
        errors={errors}
        setCancel={setCancel}
      ></Table>
    </div>
  );
};

export default ClientPage;
