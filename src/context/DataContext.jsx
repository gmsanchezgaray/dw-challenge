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
        const newArray = resp.planes.map((element) => {
          return element.periodos.map((ele) => {
            return {
              ...ele,
              nombre: element.nombre,
              plan: element.plan,
            };
          });
        });
        //Para setear los productos de la lista con la misma estructura de la lista de cart
        // Para que luego puedo utilizar el mismo componente de List, renderizando los items del carro o para agregar
        setProducts([].concat.apply([], newArray));
        setItemsToShow([].concat.apply([], newArray));
      })
      .catch((err) => console.error(`Hubo un error => ${err}`))
      .finally(() => setLoading(false));
    getCartList()
      .then((resp) => {
        if (resp) {
          setCart(resp);
        }
      })
      .catch((err) => console.error(`Hubo un error => ${err}`))
      .finally(() => setLoading(false));
  }, []);

  /**
   * Funcion para agregar un producto al carro.
   *
   * Para poder realizar la llamada y para actulizar el carro, tuve que abrir las
   * herramientas de desarrollo y tildar en la opcion "Limpiar Caché", ya que la data que traia, siempre estaba desactulizada
   * a medida que realizaba POST o un DELETE.
   */
  const addProductTotheCart = (plan, periodo, nombre) => {
    addProductAPI(plan, periodo)
      .then(() => {
        getCartList().then((resp) => setCart(resp));
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
   * siempre y cuando la respuesta no fuera undefined.
   */
  const removeProductFromCart = (index, nombre, periodo) => {
    removeProductAPI(index)
      .then((resp) => console.log(resp))
      .catch((err) => console.warn(err))
      .finally(() =>
        getCartList().then((res) => {
          res === undefined ? setCart([]) : setCart(res);
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
