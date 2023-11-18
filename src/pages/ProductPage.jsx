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
  const { register, handleSubmit, setValue } = useForm();
  const [hideError, setHideError] = useState(false);
  const [cancel, setCancel] = useState(false);

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

  const onUpdateSubmit = handleSubmit((values) => {
    upgradeProduct(product.id, values);
    setCancel(false);
  });

  const onCancel = () => {
    setCancel(false);
  };

  useEffect(() => {
    listProducts();
    handleError(errors);
    handleSuccess();
    setValue("id", product.id);
    setValue("nombre", product.nombre);
    setValue("cantidad", product.cantidad);
    setValue("precio", product.precio);
  }, [product, errors]);
  return (
    <div className="container mx-auto flex justify-center items-center flex-col">
      <h1 className="text-4xl p-2 font-bold text-center">
        Pagina del Producto
      </h1>
      <div className="mt-2">
        {!cancel && (
          <form
            onSubmit={onSubmit}
            className="bg-gray-100 shadow-md rounded px-10 py-4 mb-6 max-w-md mx-auto"
          >
            <h1 className="text-black font-bold text-3xl mb-4 mt-4 px-2">
              Crear Producto
            </h1>
            <div className="py-2 px-4 p-2">
              <label className="block font-bold text-black text-2xl">
                Codigo del Producto:
              </label>
              <input
                className="mt-2 rounded w-full bg-gray-200 border py-1"
                type="text"
                {...register("id", { required: false })}
              />
            </div>
            <div className="py-2 px-4 p-2">
              <label className="block font-bold text-black text-2xl">
                Nombre del Producto:
              </label>
              <input
                className="mt-2 rounded w-full bg-gray-200 border py-1"
                type="text"
                {...register("nombre", { required: false })}
              />
            </div>
            <div className="py-2 px-4 p-2">
              <label className="block font-bold text-black text-2xl">
                Cantidad del Producto:
              </label>
              <input
                className="mt-2 rounded w-full bg-gray-200 border py-1"
                type="number"
                {...register("cantidad", { required: false })}
              />
            </div>
            <div className="py-2 px-4 p-2 mb-6">
              <label className="block font-bold text-black text-2xl">
                Precio del Producto:
              </label>
              <input
                className="mt-2 rounded w-full bg-gray-200 border py-1"
                type="number"
                {...register("precio", { required: false })}
              />
            </div>
            <div className="flex justify-center">
              <button className="rounded bg-green-600 font-bold py-2 px-4 text-white hover:bg-green-700">
                Guardar!
              </button>
            </div>
          </form>
        )}

        {cancel && (
          <div className="mt-2">
            <form
              onSubmit={onUpdateSubmit}
              className="bg-gray-100 shadow-md rounded px-10 py-4 mb-6 max-w-md mx-auto"
            >
              <h2 className="text-black font-bold text-3xl mb-4 mt-4 px-2">
                Formulario Actualizacion
              </h2>
              <div className="py-2 px-4 p-2">
                <label className="block font-bold text-black text-2xl">
                  Codigo del Producto:
                </label>
                <input
                  className="mt-2 rounded w-full bg-gray-200 border py-1"
                  type="number"
                  {...register("id", { required: false })}
                />
              </div>
              <div className="py-2 px-4 p-2">
                <label className="block font-bold text-black text-2xl">
                  Nombre del Producto:
                </label>
                <input
                  className="mt-2 rounded w-full bg-gray-200 border py-1"
                  type="text"
                  {...register("nombre", { required: false })}
                />
              </div>
              <div className="py-2 px-4 p-2">
                <label className="block font-bold text-black text-2xl">
                  Precio:
                </label>
                <input
                  className="mt-2 rounded w-full bg-gray-200 border py-1"
                  type="number"
                  {...register("precio", { required: false })}
                />
              </div>
              <div className="py-2 px-4 p-2 mb-6">
                <label className="block font-bold text-black text-2xl">
                  Cantidad:
                </label>
                <input
                  className="mt-2 rounded w-full bg-gray-200 border py-1"
                  type="number"
                  {...register("cantidad", { required: false })}
                />
              </div>
              <div className="flex justify-center space-x-2">
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
      </div>
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
        setCancel={setCancel}
      ></Table>
    </div>
  );
};
