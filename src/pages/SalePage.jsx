import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSale } from "../context/SaleContext";
import { Toaster, toast } from "sonner";
import Swal from "sweetalert2";
import Table from "../components/Sales/Table";
import { useClient } from "../context/ClientContext";
import { useProduct } from "../context/ProductContext";
import FormUpdate from "../components/Sales/FormUpdate";
import TableHistorial from "../components/Sales/TableHistorial";

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
    listSaleWithClient,
    saleclient,
  } = useSale();
  //providers (clientes, products)
  //provider del cliente
  const { clients, listClients } = useClient();
  const { products, listProducts } = useProduct();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [hideError, setHideError] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [historial, setHistorial] = useState(false);

  const onSubmit = handleSubmit((values) => {
    registerSale(values);
    setHistorial(false);
    reset();
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
  console.log(errors);
  useEffect(() => {
    listSalesAssociations();
    listSales();
    listClients();
    listProducts();
    handleError(errors);
    handleSuccess();
    setValue("cantidad", sale.cantidad);
  }, [sale, saleclient, errors]);
  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-4xl p-2 font-bold text-center">Pagina de Ventas</h1>
      <div>
        {!cancel && !historial && (
          <form
            onSubmit={onSubmit}
            className="bg-gray-100 shadow-md rounded px-4 py-4 mb-6 max-w-md mx-auto"
          >
            {clients.length === 0 || products.length === 0 ? (
              <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                  Advertencia
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                  <p>Debe Crear un Cliente y Un Producto Primero.</p>
                </div>
              </div>
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
                <div className="flex justify-center">
                  <button className="rounded bg-green-600 font-bold py-2 px-4 text-white hover:bg-green-700">
                    Crear Venta!
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
      <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="lg:w-1/2 flex-shrink-0">
          {!cancel && historial && (
            <form
              onSubmit={onSubmit}
              className="bg-gray-100 shadow-md rounded px-4 py-4 mb-6 max-w-md mx-auto"
            >
              {clients.length === 0 || products.length === 0 ? (
                <div role="alert">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Advertencia
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>Debe Crear un Cliente y Un Producto Primero.</p>
                  </div>
                </div>
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
                  <div className="flex justify-center">
                    <button className="rounded bg-green-600 font-bold py-2 px-4 text-white hover:bg-green-700">
                      Crear Venta!
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
        <div className="lg:w-1/2">
          {historial && (
            <TableHistorial saleclient={saleclient}></TableHistorial>
          )}
        </div>
      </div>

      {cancel && (
        <FormUpdate
          onCancel={onCancel}
          onUpdateSubmit={onUpdateSubmit}
          register={register}
          clients={clients}
          products={products}
        ></FormUpdate>
      )}

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
        listSaleWithClient={listSaleWithClient}
        setCancel={setCancel}
        setHistorial={setHistorial}
      ></Table>
    </div>
  );
};
