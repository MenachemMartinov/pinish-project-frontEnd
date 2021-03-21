import axios from "axios";
import { toast } from "react-toastify";

/**
 * to add the token to the headers request
 */
axios.interceptors.request.use((config) => {
  const tokenHeaders = localStorage.getItem("token");
  config.headers.common["auth-token"] = tokenHeaders;
  return config;
});

/**
 * to intercept the errors
 */
axios.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status >= 403) {
    toast.error("שגיאה לא צפויה ");
  }
  return Promise.reject(error);
});

/**
 * to use easier with axios create new object what export the axios deferent option 
 */
const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default http;
