// *Core
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { DataContext } from "../context/DataContext";

const toastContainer = document.querySelector("#toast-container");

const Toast = () => {
  const { dataToast, setDataToast } = useContext(DataContext);

  return dataToast.isOpened
    ? ReactDOM.createPortal(
        <div
          className="toast toast-position"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header d-flex justify-content-between bg-primary text-white">
            <strong className="mr-auto">
              <i className="fa fa-cubes mx-1"></i>Productos
            </strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => setDataToast({ ...dataToast, isOpened: false })}
            ></button>
          </div>
          <div className="toast-body">{dataToast.message}</div>
        </div>,
        toastContainer
      )
    : null;
};

export default Toast;
