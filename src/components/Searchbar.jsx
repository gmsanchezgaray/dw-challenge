//* Core
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Searchbar = () => {
  const { query, setQuery } = useContext(DataContext);

  return (
    <form className="w-100 me-3" role="search">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar resultados..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
    </form>
  );
};

export default Searchbar;
