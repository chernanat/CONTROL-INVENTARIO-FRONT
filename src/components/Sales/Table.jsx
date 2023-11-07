import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Table = ({
  sales,
  deleteSale,
  listSale,
  sale,
  upgradeSale,
  errors,
  clients,
  products,
  saleproductclient,
}) => {
  const { register, handleSubmit, setValue } = useForm();

  const [cancel, setCancel] = useState(false);

  const handleDelete = async (id) => {
    await deleteSale(id);
    setCancel(false);
  };
  const handleUpdateSale = async (id) => {
    await listSale(id);
  };

  const onUpdateSubmit = handleSubmit((values) => {
    upgradeSale(sale.id, values);
    setCancel(false);
  });

  const onCancel = () => {
    setCancel(false);
  };

  useEffect(() => {
    // setValue("producto_id", sale.producto_id);
    // setValue("cliente_id", sale.cliente_id);
  }, [sales, errors, saleproductclient]);
  return (
    <>
      <table>
        <thead>
          <tr>
            {/* <th>id_cliente</th> */}
            <th>Nombre Cliente</th>
            <th>Apellido Cliente</th>
            {/* <th>id_producto</th> */}
            <th>Nombre Producto</th>
            <th>Precio</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {saleproductclient.map((sale, index) => (
            <tr key={index}>
              {/* <td>{sale.cliente_id}</td> */}
              <td>{sale.cliente.nombre}</td>
              <td>{sale.cliente.apellido}</td>
              {/* <td>{sale.producto_id}</td> */}
              <td>{sale.producto.nombre}</td>
              <td>{sale.producto.precio}</td>
              <td>
                <button
                  onClick={() => {
                    handleUpdateSale(sale.id);
                    setCancel(true);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    handleDelete(sale.id);
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
              <label>Selecciona el Cliente:</label>
              <select {...register("cliente_id")} name="cliente_id">
                {clients.map((client) => (
                  <option value={client.id} key={client.id}>
                    {client.nombre} {client.apellido}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Selecciona El Producto:</label>
              <select {...register("producto_id")} name="producto_id">
                {products.map((product) => (
                  <option value={product.id} key={product.id}>
                    {product.nombre}
                  </option>
                ))}
              </select>
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
