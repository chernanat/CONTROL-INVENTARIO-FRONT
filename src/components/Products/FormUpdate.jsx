import React from "react";

const FormUpdate = ({ onUpdateSubmit, register, onCancel }) => {
  return (
    <div>
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
          <label className="block font-bold text-black text-2xl">Precio:</label>
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
  );
};

export default FormUpdate;
