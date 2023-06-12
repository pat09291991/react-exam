import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyInfo = (message) =>
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
export const notifySuccess = (message, autoCloseValue = null) =>
  toast.success(message, {
    position: "top-right",
    autoClose: autoCloseValue ? autoCloseValue : 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
export const notifyWarn = (message, autoCloseValue = null) =>
  toast.warn(message, {
    position: "top-center",
    autoClose: autoCloseValue ? autoCloseValue : 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
export const notifyError = (message) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });

export const notifyDefault = (message, autoCloseValue = null) =>
  toast(message, {
    position: "top-center",
    autoClose: autoCloseValue ? autoCloseValue : 20000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

