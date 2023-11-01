import { useForm } from "react-hook-form";
import { useApp } from "../context/AppContext";
import { useEffect } from "react";
// import Swal from 'sweetalert2'


const ClientPage = () => {
  const { registerClient, client, errors } = useApp();
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    console.log(client);
    registerClient(values);
  });
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
    </div>
  );
};

export default ClientPage;
