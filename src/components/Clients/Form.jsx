const Form = ({register, onSubmit}) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-gray-100 shadow-md rounded px-5 py-4 mb-6 max-w-md mx-auto"
      >
        <h1 className="text-black font-bold text-3xl mt-4 px-3">
          Crear Cliente
        </h1>
        <div className="py-2 p-2 mt-5">
          <label className="block font-bold text-black text-2xl">
            Nombre del Cliente:
          </label>
          <input
            className="mt-2 rounded w-full bg-gray-200 border py-1"
            type="text"
            {...register("nombre", { required: false })}
          />
        </div>
        <div className="py-2 px-2">
          <label className="block font-bold text-black text-2xl">
            Apellido del Cliente:
          </label>
          <input
            className="mt-2 rounded w-full bg-gray-200 border py-1"
            type="text"
            {...register("apellido", { required: false })}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="rounded bg-green-600 font-bold py-2 px-4 text-white hover:bg-green-700"
            type="submit"
          >
            Registrar
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
