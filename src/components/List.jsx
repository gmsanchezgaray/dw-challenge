//* Core
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
//* Components
import Spinner from "./Spinner";

const List = ({ itemsToShow }) => {
  const { loading, addProductTotheCart, removeProductFromCart } =
    useContext(DataContext);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : itemsToShow.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <i className="fa fa-info-circle mx-2"></i>No se encontraron resultados
        </div>
      ) : (
        <ul className="list-group col-md-6">
          {itemsToShow.map((item, index) => {
            const { nombre, periodo, valor, plan, id_producto } = item;
            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{nombre}</div>${valor}
                  <span className="badge bg-orange mx-2">
                    Periodo {periodo}
                  </span>
                </div>
                {!id_producto ? (
                  <button
                    onClick={() => addProductTotheCart(plan, periodo, nombre)}
                    className="btn btn-primary mt-1"
                  >
                    <i className="fa fa-solid fa-trash-can mx-1"></i>
                    Agregar producto
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      removeProductFromCart(id_producto, nombre, periodo)
                    }
                    className="btn btn-danger mt-1"
                  >
                    <i className="fa fa-solid fa-trash-can mx-1"></i>
                    Remover producto
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default List;
