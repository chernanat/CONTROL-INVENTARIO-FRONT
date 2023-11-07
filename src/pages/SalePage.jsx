import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSale } from "../context/SaleContext";
import { Toaster, toast } from "sonner";
import Swal from "sweetalert2";
import Table from "../components/Sales/Table";
import { useClient } from "../context/ClientContext";
import { useProduct } from "../context/ProductContext";

export const SalePage = () => {
  const {
    registerSale,
    sale,
    sales,
    listSales,
    listSale,
    errors,
    success,
    deleteSale,
    upgradeSale,
    listSalesAssociations,
    saleproductclient
  } = useSale();
  //provider del cliente
  const { clients, listClients } = useClient();
  const { products, listProducts } = useProduct();
  const { register, handleSubmit } = useForm();
  const [hideError, setHideError] = useState(false);

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    registerSale(values);
  });
  const handleSuccess = () => {
    if (errors.length === 0 && success) {
      Swal.fire(`${sale.message}!`, "Transaccion con Exito!", "success");
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
    listSalesAssociations();
    listSales();
    listClients();
    listProducts();
    handleError(errors);
    handleSuccess();
  }, [errors]);
  return (
    <>
      <h1>Pagina de Ventas</h1>
      <form onSubmit={onSubmit}>
        {clients.length === 0 || products.length === 0 ? (
          <h3>debe crear un cliente y un producto primero</h3>
        ) : (
          <div>
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
          </div>
        )}
        <button>Crear Venta!</button>
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
        sales={sales}
        deleteSale={deleteSale}
        sale={sale}
        upgradeSale={upgradeSale}
        errors={errors}
        listSale={listSale}
        clients={clients}
        products={products}
        saleproductclient={saleproductclient}
      ></Table>
    </>
  );
};
