import axiosOriginObj from "axios";
import store from "./store";
import router from "./router";
import { Message } from "element-ui";

const defaultConfig = {
  baseURL: "http://127.0.0.1:8090",
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
};

const _axios = axiosOriginObj.create(defaultConfig);

_axios.interceptors.request.use(
  config => {
    if (store.state.auth.token) {
      config.headers.Authorization = "Bearer " + store.state.auth.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.log(error.response);
      switch (error.response.status) {
        case 401:
          store.commit("auth/logout");
          router.replace({ path: "login" });
          break;
        case 403:
          Message({
            type: "error",
            message: "登录状态已过期"
          });
          localStorage.removeItem(store.state.auth.token_keyname);
          router.replace({ path: "login" });
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default _axios;
