import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Upload from "../components/Upload.vue";
import FileList from "../components/FileList.vue";
import QAtable from "../components/QAtable.vue";
import Menu from "../components/Menu.vue";
import PointPersentGetter from "../components/PointPersentGetter";
import TeacherPersonal from "../components/TeacherPersonal";
import DataTable from "../components/Teacher/SubmitStatusTable";
import AddCouse from "../components/AddCouse";
import CouseInfoTableStu from "../components/CouseInfoTableStu";
import NormalWorkInfoTable from "../components/NormalWorkInfoTable";
import StudentPersonal from "../components/StudentPersonal";
import StudentInfoTable from "../components/StudentInfoTable";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/teacherMain",
    name: "Main",
    component: () => import("../views/TeacherMain.vue"),
    children: [
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
      },
      {
        path: "topics",
        name: "TopicTable",
        component: () => import("@/components/Teacher/TopicTable.vue")
      }
    ]
  },
  {
    path: "/studentMain",
    name: "StudentMain",
    component: () => import("../views/StudentMain.vue"),
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
      },
      {
        path: "StudentInfoTable",
        name: "StudentInfoTable",
        component: StudentInfoTable,
        props: route => ({ query: route.query.courseId })
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
