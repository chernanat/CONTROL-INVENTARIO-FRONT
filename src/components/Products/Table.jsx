import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Table = ({
  products,
  deleteProduct,
  listProduct,
  product,
  upgradeProduct,
  errors,
}) => {
  const { register, handleSubmit, setValue } = useForm();

  const [cancel, setCancel] = useState(false);
  const handleDelete = async (id) => {
    await deleteProduct(id);
    setCancel(false);
  };
  const handleUpdateProduct = async (id) => {
    await listProduct(id);
  };

  const onUpdateSubmit = handleSubmit((values) => {
    upgradeProduct(product.id, values);
    setCancel(false);
  });

  const onCancel = () => {
    setCancel(false);
  };

  useEffect(() => {
    setValue("id", product.id);
    setValue("nombre", product.nombre);
    setValue("precio", product.precio);
    setValue("cantidad", product.cantidad);
  }, [product, errors]);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.nombre}</td>
              <td>{product.precio}</td>
              <td>{product.cantidad}</td>
              <td>
                <button
                  onClick={() => {
                    handleUpdateProduct(product.id);
                    setCancel(true);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cancel && (
        <div>
          <h2>Formulario Actualizacion</h2>
          <form onSubmit={onUpdateSubmit}>
            <div>
              <label>Ingrese id del Producto:</label>
              <input type="number" {...register("id", { required: false })} />
            </div>
            <div>
              <label>Ingrese el Nombre del Producto:</label>
              <input
                type="text"
                {...register("nombre", { required: false })}
              />
            </div>
            <div>
              <label>Ingrese el Precio:</label>
              <input
                type="number"
                {...register("precio", { required: false })}
              />
            </div>
            <div>
              <label>Ingrese la Cantidad:</label>
              <input
                type="number"
                {...register("cantidad", { required: false })}
              />
            </div>
            <button type="submit">Actualizar</button>
            <button onClick={onCancel}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Table;
