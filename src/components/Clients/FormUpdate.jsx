import React from "react";

const FormUpdate = ({ onUpdateSubmit, onCancel, register }) => {
  return (
    <div>
      <form
        onSubmit={onUpdateSubmit}
        className="bg-gray-100 shadow-md rounded px-4 py-4 mb-6 max-w-md mx-auto"
      >
        <div div className="m-6">
          <h1 className="text-black font-bold text-3xl">Actualizar Cliente</h1>
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
          <div className="px-6">
            <label className="block font-bold text-black text-2xl">
              Apellido del Cliente:
            </label>
            <input
              type="text"
              {...register("apellido", { required: false })}
              className="mt-2 rounded w-full bg-gray-200 border py-1"
            />
          </div>
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
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUpdate;
