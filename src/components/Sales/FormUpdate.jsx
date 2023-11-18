import React from "react";

const FormUpdate = ({
  onCancel,
  onUpdateSubmit,
  register,
  clients,
  products,
}) => {
  return (
    <div>
      <form
        onSubmit={onUpdateSubmit}
        className="bg-gray-100 shadow-md rounded px-4 py-4 mb-6 max-w-md mx-auto"
      >
        <div className="m-6">
          <h1 className="text-black text-3xl font-bold">Actualizar Venta</h1>
          <div className="mt-5 py-2 p-2">
            <label className="block font-bold text-black text-2xl">
              Selecciona el Cliente:
            </label>
            <select
              {...register("cliente_id")}
              name="cliente_id"
              className="mt-2 rounded w-full border py-2"
            >
              {clients.map((client) => (
                <option value={client.id} key={client.id}>
                  {client.nombre} {client.apellido}
                </option>
              ))}
            </select>
          </div>
          <div className="py-2 p-2">
            <label className="block font-bold text-black text-2xl">
              Selecciona El Producto:
            </label>
            <select
              {...register("producto_id", { required: true })}
              name="producto_id"
              className="mt-2 rounded w-full border py-2"
            >
              {products.map((product) => (
                <option value={product.id} key={product.id}>
                  {product.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="py-2 p-2 mb-6">
            <label className="block font-bold text-black text-2xl">
              Ingresa La cantidad:
            </label>
            <input
              {...register("cantidad", {})}
              type="number"
              className="mt-2 rounded w-full bg-gray-200 border py-1"
            />
          </div>
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
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUpdate;
