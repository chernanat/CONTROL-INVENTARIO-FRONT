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
  const { register, handleSubmit } = useForm();
  const [hideError, setHideError] = useState(false);

  const onSubmit = handleSubmit((values) => {
    registerClient(values);
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

  useEffect(() => {
    listClients();
    handleError(errors);
    handleSuccess();
  }, [errors]);

  return (
    <div>
      <h1>Pagina del Cliente</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Ingrese Nombre del Cliente:</label>
          <input type="text" {...register("nombre", { required: false })} />
        </div>
        <div>
          <label>Ingrese el apellido:</label>
          <input type="text" {...register("apellido", { required: false })} />
        </div>
        <button type="submit">Registrar</button>
      </form>
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
      ></Table>
    </div>
  );
};

export default ClientPage;
