//* Core
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
//* Components
import Searchbar from "./Searchbar";
//* Assets
import Logo from "./../assets/Donweb-250x125.png";

const Header = () => {
  const { cart } = useContext(DataContext);

  return (
    <header>
      <div className="px-3 py-2 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <img
              className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
              src={Logo}
              alt="logo don web"
              width="96"
            />
            <div className="d-flex align-items-center ">
              <Searchbar />
            </div>
            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <Link to="/" className="nav-link text-white text-center">
                  <i
                    className="fa fa-cubes d-block mx-auto mb-1"
                    width="24"
                    height="24"
                  ></i>
                  Listado de Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="nav-link text-white text-center p-relative"
                >
                  <span className="cart-badge badge bg-orange rounded-pill">
                    {cart !== undefined && cart.length}
                  </span>
                  <i
                    className="fa fa-solid fa-cart-shopping d-block mx-auto mb-1"
                    width="24"
                    height="24"
                  ></i>
                  Mi carrito
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
