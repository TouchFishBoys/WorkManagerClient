import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueAxios from "vue-axios";
import axios from "./axios";

import MyTable from "@/components/MyTable";

ElementUI.Dialog.props.closeOnClickModal.default = false;
ElementUI.Table.props.border.default = true;
console.info(ElementUI.Table);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.component(MyTable);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
