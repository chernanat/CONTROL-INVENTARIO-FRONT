import { Link } from "react-router-dom";
import "../index.css";

export const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 border-gray-200">
        <div className="flex items-center justify-between md:p-5">
          <ul className="flex flex-col md:flex-row">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/product" className="nav-link">
                Productos
              </Link>
            </li>
            <li>
              <Link to="/client" className="nav-link">
                Clientes
              </Link>
            </li>
            <li>
              <Link to="/sale" className="nav-link">
                Ventas
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
