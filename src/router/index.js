import Vue from "vue";
import VueRouter from "vue-router";
import Upload from "@/components/Upload.vue";
import FileList from "@/components/FileList.vue";
import QAtable from "@/components/QAtable.vue";
import Menu from "@/components/Menu.vue";
import PointPersentGetter from "@/components/PointPercentGetter";
import TeacherPersonal from "@/components/Teacher/TeacherPersonal";
import DataTable from "@/components/Teacher/SubmitStatusTable";
import AddCourse from "@/components/AddCourse";
import CourseInfoTableStu from "@/components/Student/CourseInfoTableStu";
import NormalWorkInfoTable from "@/components/NormalWorkInfoTable";
import StudentPersonal from "@/components/Student/StudentPersonal";
import StudentInfoTable from "@/components/StudentInfoTable";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    alias: "/Login",
    component: () => import("../components/Login")
  },
  {
    path: "/teacherMain",
    name: "Main",
    meta: {
      requireAuth: true
    },
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
        path: "AddCourse",
        name: "AddCourse",
        component: AddCourse
      },
      {
        path: "courses",
        name: "Course",
        component: () => import("@/components/Teacher/CourseInfoTable")
      },
      {
        path: "topics",
        name: "TopicTable",
        component: () =>
          import(
            /* webpackChunkName: "group-teacher" */ "@/components/Teacher/TopicTable.vue"
          )
      }
    ]
  },
  {
    path: "/studentMain",
    name: "StudentMain",
    meta: {
      requireAuth: true
    },
    component: () => import("../views/StudentMain.vue"),
    children: [
      {
        path: "courses",
        name: "CourseStu",
        component: CourseInfoTableStu
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.auth.token) {
      next();
    } else {
      next({
        path: "Login"
      });
    }
  } else {
    next();
  }
});

export default router;
