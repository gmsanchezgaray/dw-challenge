export const getAllProducts = async () => {
  const url = "http://c1300044.ferozo.com/getListado.php";
  const data = await fetch(url, { cache: "no-cache" });

  return data.json();
};

/**
 *
 * La funcion de addProductAPI envia un nuevo producto al carrito. Realice todo tipo de configuraciones por parte del front
 * y no pude encontrar otra forma más que colocar el mode : no-cors, debido a que cuando realizaba las peticiones, sin ese modo
 * no me permitia agregar ningun producto al carro.
 *
 */
export const addProductAPI = async (plan, periodo) => {
  const url = `http://c1300044.ferozo.com/agregarItem.php?plan=${plan}&periodo=${periodo}`;

  const resp = await fetch(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "*",
      },
      mode: "no-cors",
      body: JSON.stringify({ plan: plan, periodo: periodo }),
    },
    { cache: "no-cache" }
  );
  return resp;
};

export const getCartList = async () => {
  const url = "http://c1300044.ferozo.com/getListadoCarrito.php";
  const data = await fetch(url, { cache: "no-cache" });

  return data.json();
};

export const removeProductAPI = async (id_producto) => {
  const url = `http://c1300044.ferozo.com/removerItem.php?id_producto=${id_producto}`;

  const data = await fetch(url, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Methods": "DELETE",
      "Access-control-allow-origin": "*",
      "Content-type": "application/json",
    },
  });

  return data;
};
