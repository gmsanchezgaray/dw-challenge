// *Core
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DataContext } from "../context/DataContext";
//* Components
import List from "./List";

const ListContainer = () => {
  const location = useLocation();
  const {
    title,
    setTitle,
    itemsToShow,
    setItemsToShow,
    cart,
    products,
    query,
  } = useContext(DataContext);
  useEffect(() => {
    if (location.pathname === "/cart") {
      setTitle("Mi carrito");
      setItemsToShow(cart);
    } else {
      setTitle("Listado de Productos");
      setItemsToShow(products);
    }
  }, [cart, location, products, setItemsToShow, setTitle]);

  const search = (data) => {
    return data.filter(
      (item) =>
        item.nombre.toLowerCase().includes(query) ||
        item.periodo.toString().includes(query) ||
        item.valor.toString().includes(query)
    );
  };
  return (
    <div className="container mt-4">
      <h3 className="pb-2 border-bottom mb-4">{title}</h3>
      <List itemsToShow={search(itemsToShow)} />
    </div>
  );
};

export default ListContainer;
