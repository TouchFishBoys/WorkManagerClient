import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Login.vue";
import Upload from "../components/Upload.vue";
import FileList from "../components/FileList.vue";
import QAtable from "../components/QAtable.vue";
import Menu from "../components/Menu.vue";
import TeacherMain from "../views/TeacherMain.vue";
import PointPersentGetter from "../components/PointPersentGetter";
import Default from "../components/Default";
import TeacherPersonal from "../components/TeacherPersonal";
import DataTable from "../components/DataTable";
import AddCouse from "../components/AddCouse";
import StudentMain from "../views/StudentMain.vue";
import CouseInfoTableStu from "../components/CouseInfoTableStu";
import NormalWorkInfoTable from "../components/NormalWorkInfoTable";
import StudentPersonal from "../components/StudentPersonal";
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
    path: "/teacherMain",
    name: "Main",
    component: TeacherMain,
    children: [
      {
        path: "",
        name: "Default",
        component: Default
      },
      {
        path: "upload",
        name: "Upload",
        component: Upload
      },
      {
        path: "filelist",
        name: "FileList",
        component: FileList
      },
      {
        path: "qatable",
        name: "QAtable",
        component: QAtable
      },
      {
        path: "menu",
        name: "Menu",
        component: Menu
      },
      {
        path: "Point",
        name: "PointPersentGetter",
        component: PointPersentGetter
      },
      {
        path: "Personal",
        name: "Personal",
        component: TeacherPersonal
      },
      {
        path: "DataTable",
        name: "DataTable",
        component: DataTable
      },
      {
        path: "AddCouse",
        name: "AddCouse",
        component: AddCouse
      }
    ]
  },
  {
    path: "/studentMain",
    name: "StudentMain",
    component: StudentMain,
    children: [
      {
        path: "CouseInfoTable",
        name: "CouseInfoTable",
        component: CouseInfoTableStu
      },
      {
        path: "NormalWorkInfoTable",
        name: "NormalWorkInfoTable",
        component: NormalWorkInfoTable
      },
      {
        path: "StudentPersonal",
        name: "StudentPersonal",
        component: StudentPersonal
      }
    ]
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
