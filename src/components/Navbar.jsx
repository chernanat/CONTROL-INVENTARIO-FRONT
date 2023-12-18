import { Link } from "react-router-dom";
import "../index.css";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { carts, listShops } = useCart();
  const [time, setTime] = useState("");
  //esta funcion o valor es necesario para setear la cantidad de productos en el navbar del carro
  const totalProducts = carts.reduce(
    (acumulador, cart) => acumulador + cart.cantidad,
    0
  );
  useEffect(() => {
    listShops();
    const intervalId = setInterval(() => {
      const date = new Date();
      const hour = date.toLocaleTimeString();
      setTime(hour);
    }, 1000);
    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);
  return (
    <>
      <nav className="bg-gray-800 border-gray-200">
        <div className="flex items-center justify-between md:p-5">
          <ul className="flex flex-col md:flex-row">
            <li>
              <Link to="/" className="nav-link uppercase font-extrabold">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/product" className="nav-link uppercase font-semibold">
                Productos
              </Link>
            </li>
            <li>
              <Link to="/client" className="nav-link uppercase font-semibold">
                Clientes
              </Link>
            </li>
            <li>
              <Link to="/sale" className="nav-link uppercase font-semibold">
                Ventas
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col md:flex-row">
            <li className="text-white text-2xl font-extrabold mx-6">{time}</li>
            <li className="md:ml-auto">
              <Link to="/cart" className="nav-link uppercase font-extrabold">
                Carrito
                <span className="rounded-full bg-red-500 text-black text-lg font-bold mx-2 px-2">
                  {totalProducts}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
