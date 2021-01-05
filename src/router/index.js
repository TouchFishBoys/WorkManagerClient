import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Login.vue";
import Upload from "../components/Upload.vue";
import FileList from "../components/FileList.vue";
import QAtable from "../components/QAtable.vue";
import Menu from "../components/Menu.vue";
import Main from "../views/Main.vue";
import PointPersentGetter from "../components/PointPersentGetter";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload
  },
  {
    path: "/filelist",
    name: "FileList",
    component: FileList
  },
  {
    path: "/qatable",
    name: "QAtable",
    component: QAtable
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu
  },
  {
    path: "/main",
    name: "Main",
    component: Main
  },
  {
    path: "/Point",
    name: "PointPersentGetter",
    component: PointPersentGetter
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
