import { useForm } from "react-hook-form";
import { useApp } from "../context/AppContext";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
// import Swal from 'sweetalert2'

const ClientPage = () => {
  const { registerClient, client, errors } = useApp();
  const { register, handleSubmit } = useForm();
  const [hideError, setHideError] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    registerClient(values);
  });

  const handleError = async (errors) => {
    if (errors) {
      await errors.forEach((error) => {
        toast.error('Ops! Algo ha ido Mal!', {
          description: `${error.msg}`
        });
      });
      setHideError(true);
      setTimeout(() => {
        setHideError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    handleError(errors);
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
      <Toaster></Toaster>
    </div>
  );
};

export default ClientPage;
