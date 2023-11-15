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
    saleproductclient,
  } = useSale();
  //provider del cliente
  const { clients, listClients } = useClient();
  const { products, listProducts } = useProduct();
  const { register, handleSubmit, reset } = useForm();
  const [hideError, setHideError] = useState(false);
  const [cancel, setCancel] = useState(false);

  const onSubmit = handleSubmit((values) => {
    registerSale(values);
    reset()
  });
  const handleSuccess = () => {
    if (errors.length === 0 && success) {
      Swal.fire(`${sale.message}!`, "Transaccion con Exito!", "success");
    }
  };

  const handleError = async (errors) => {
    await errors.forEach((error) => {
      toast.error("Ops! Algo ha ido Mal!", {
        description: error.msg ? `${error.msg}` : `${error}`,
        position: "top-center",
      });
    });

    setHideError(true);
    setTimeout(() => {
      setHideError(false);
    }, 3000);
  };

  const onUpdateSubmit = handleSubmit((values) => {
    upgradeSale(sale.id, values);
    setCancel(false);
  });

  const onCancel = () => {
    setCancel(false);
    reset();
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
    <div className="container mx-auto flex justify-center items-center flex-col">
      <h1 className="text-4xl p-2 font-bold text-center">Pagina de Ventas</h1>
      <div className="">
        {!cancel && (
          <form
            onSubmit={onSubmit}
            className="bg-gray-100 shadow-md rounded px-4 py-4 mb-6 max-w-md mx-auto"
          >
            {clients.length === 0 || products.length === 0 ? (
              <h3 className="text-red text-xl font-bold">debe crear un cliente y un producto primero</h3>
            ) : (
              <div className="m-6">
                <h1 className="text-black font-bold text-3xl">Crear Venta</h1>
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
                      <option className="" value={client.id} key={client.id}>
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
                    {...register("producto_id")}
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
                    {...register("cantidad", { required: false })}
                    type="number"
                    className="mt-2 rounded w-full bg-gray-200 border py-1"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-center">
              <button className="rounded bg-green-600 font-bold py-2 px-4 text-white hover:bg-green-700">
                Crear Venta!
              </button>
            </div>
          </form>
        )}

        {cancel && (
          <div>
            <form
              onSubmit={onUpdateSubmit}
              className="bg-gray-100 shadow-md rounded px-4 py-4 mb-6 max-w-md mx-auto"
            >
              <div className="m-6">
                <h1 className="text-black text-3xl font-bold">
                  Actualizar Venta
                </h1>
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
                    {...register("cantidad_updated", {})}
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
        )}
      </div>

      <div>
        {errors && hideError && (
          <div>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error.msg ? error.msg : error}</li>
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
        setCancel={setCancel}
      ></Table>
    </div>
  );
};
