import axiosOriginObj from "axios";
import store from "./store";

const defaultConfig = {
  baseURL: "http://127.0.0.1:8090",
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
};

const _axios = axiosOriginObj.create(defaultConfig);

_axios.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer " + store.state.auth.token;
  return config;
});

_axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.log(error.response);
    }
    return Promise.reject(error);
  }
);

export default _axios;
