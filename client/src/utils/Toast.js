import { ToastContainer, toast } from "react-toastify";

const options = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  icon: true,
};

const container = () => {
  return <ToastContainer />;
};

const success = (content) => {
  toast.success(content, options);
};

const error = (content) => {
  toast.error(content, options);
};

const warning = (content) => {
  toast.warning(content, options);
};

const Toast = {
  container,
  success,
  error,
  warning,
};

export default Toast;
