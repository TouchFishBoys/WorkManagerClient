import { Loading } from "element-ui";

let loading;

const showLoading = params => {
  if (loading) {
    loading.close();
  }
  let options = {
    fullscreen: false,
    target: document.querySelector(".el-table"),
    lock: true,
    text: "少女折寿中",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)"
  };
  Object.assign(options, params);
  loading = Loading.service(options);
};

const hideLoading = () => {
  loading.close();
};

const plugin = {
  install(Vue) {
    Vue.prototype.$load = showLoading;
    Vue.prototype.$hideloading = hideLoading;
  }
};

export default plugin;
