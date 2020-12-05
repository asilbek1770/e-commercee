import axios from "axios";
import logger from "./loggerService";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (ex) => {
  const expected =
    ex.response && ex.response.status >= 400 && ex.response.status < 500;

  if (!expected) {
    logger.log(ex);
    toast.error("Siz amalni bajarishda xatolikka yo`l qo`ydingiz !!");
  }

  return Promise.reject(ex);
});

const setJwt = (jwt) => {
  axios.defaults.headers.common["x-auth-token"] = jwt;
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt: setJwt,
};
