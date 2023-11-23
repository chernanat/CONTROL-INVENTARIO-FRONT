import { useForm } from "react-hook-form";
import { useClient } from "../context/ClientContext";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Swal from "sweetalert2";
import Table from "../components/Clients/Table";
import FormUpdate from "../components/Clients/FormUpdate";
import Form from "../components/Clients/Form";

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
    <div className="container mx-auto justify-center items-center">
      <h1 className="text-4xl p-2 font-bold text-center">Pagina del Cliente</h1>
      <div className="mt-2">
        {!cancel && <Form onSubmit={onSubmit} register={register}></Form>}
      </div>
      {cancel && (
        <div>
          <FormUpdate
            onUpdateSubmit={onUpdateSubmit}
            register={register}
            onCancel={onCancel}
          ></FormUpdate>
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
