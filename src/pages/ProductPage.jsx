import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProduct } from "../context/ProductContext";
import { Toaster, toast } from "sonner";
import Swal from "sweetalert2";
import Table from "../components/Products/Table";

export const ProductPage = () => {
  const {
    registerProduct,
    product,
    products,
    listProducts,
    listProduct,
    errors,
    success,
    deleteProduct,
    upgradeProduct,
  } = useProduct();
  const { register, handleSubmit } = useForm();
  const [hideError, setHideError] = useState(false);

  const onSubmit = handleSubmit((values) => {
    registerProduct(values);
  });

  const handleSuccess = () => {
    if (errors.length === 0 && success) {
      Swal.fire(`${product.message}!`, "Transaccion con Exito!", "success");
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
    listProducts();
    handleError(errors);
    handleSuccess();
  }, [errors]);
  return (
    <>
      <h1>Pagina del Producto</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Ingresa el Codigo del Producto:</label>
          <input type="text" {...register("id", { required: false })} />
        </div>
        <div>
          <label>Ingresa El Nombre del Producto:</label>
          <input type="text" {...register("nombre", { required: false })} />
        </div>
        <div>
          <label>Ingresa la Cantidad del Producto:</label>
          <input type="number" {...register("precio", { required: false })} />
        </div>
        <div>
          <label>Ingresa El Precio del Producto:</label>
          <input type="number" {...register("cantidad", { required: false })} />
        </div>
        <button>Guardar!</button>
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
        products={products}
        deleteProduct={deleteProduct}
        product={product}
        upgradeProduct={upgradeProduct}
        errors={errors}
        listProduct={listProduct}
      ></Table>
    </>
  );
};
