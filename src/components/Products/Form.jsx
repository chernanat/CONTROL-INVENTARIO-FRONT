import React from "react";

const Form = ({onSubmit, register}) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-gray-100 shadow-md rounded px-16 py-4 mb-6 max-w-md mx-auto"
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
    </>
  );
};

export default Form;
