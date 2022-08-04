//* Core
import { createContext, useEffect, useState } from "react";
import {
  addProductAPI,
  getAllProducts,
  getCartList,
  removeProductAPI,
} from "../services/services";

//* Context
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [title, setTitle] = useState("Listado de Productos");
  const [itemsToShow, setItemsToShow] = useState([]);
  const [query, setQuery] = useState("");
  const [dataToast, setDataToast] = useState({ message: "", isOpened: false });

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((resp) => {
        //Realizo un nuevo re mapeo de data
        const newArray = resp.response.planes.map((element) => {
          return element.periodos.map((ele) => {
            return {
              ...ele,
              nombre: element.nombre,
              plan: element.plan,
            };
          });
        });
        //Para setear los productos de la lista con la misma estructura de la lista de los productos del carrito
        // Para que luego puedo utilizar el mismo componente de List, renderizando los items del carro o para agregar
        setProducts([].concat.apply([], newArray));
        setItemsToShow([].concat.apply([], newArray));
      })
      .catch((err) => console.error(`Hubo un error => ${err}`))
      .finally(() => setLoading(false));
    getCartList()
      .then((resp) => {
        if (resp.response) {
          setCart(resp.response);
        }
      })
      .catch((err) => console.error(`Hubo un error => ${err}`))
      .finally(() => setLoading(false));
  }, []);

  /**
   * Funcion para agregar un producto al carro.
   */
  const addProductTotheCart = (plan, periodo, nombre) => {
    addProductAPI(plan, periodo)
      .then(() => {
        getCartList().then((resp) => {
          console.log(resp);
          setCart(resp.response);
        });
        setDataToast({
          message: `Se agregó ${nombre} - Periodo ${periodo}`,
          isOpened: true,
        });
        setTimeout(() => {
          setDataToast({ ...dataToast, isOpened: false });
        }, 3000);
      })
      .catch((err) => {
        console.error(`Hubo un error => ${err}`);
      });
  };

  /**
   * Funcion para remover el producto del carro.
   *
   * En el mismo me aparecio el mismo problema de CORS. Con la diferencia que al final
   * de la peticion, realizaba la llamada al endpoint. Para resolverlo utilice finally() para que actualice la data del carro,
   * siempre y cuando la respuesta tuviera un valor.
   */
  const removeProductFromCart = (index, nombre, periodo) => {
    removeProductAPI(index)
      .then((resp) => console.log(resp))
      .catch((err) => console.warn(err))
      .finally(() =>
        getCartList().then((res) => {
          !res.response ? setCart([]) : setCart(res.response);
        })
      );
    setDataToast({
      message: `Se eliminó ${nombre} - Periodo ${periodo}`,
      isOpened: true,
    });
    setTimeout(() => {
      setDataToast({ ...dataToast, isOpened: false });
    }, 3000);
  };

  return (
    <DataContext.Provider
      value={{
        loading,
        setLoading,
        products,
        setProducts,
        cart,
        setCart,
        title,
        setTitle,
        itemsToShow,
        setItemsToShow,
        query,
        setQuery,
        dataToast,
        setDataToast,
        addProductTotheCart,
        removeProductFromCart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
