<template>
  <el-container>
    <el-header style="color:#409EFF">
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            学生学号：{{ student.studentNum }}
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            学生姓名：{{ student.studentName }}
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            学生班级：{{ student.studentClass }}
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-main><course-info-table-stu></course-info-table-stu></el-main>
  </el-container>
</template>
<script>
import courseInfoTableStu from "./CourseInfoTableStu.vue";

export default {
  components: { courseInfoTableStu },
  data() {
    return {
      student: {
        studentNum: "测试学生学号",
        studentName: "测试学生姓名",
        studentClass: "测试学生班级"
      }
    };
  },
  methods: {
    loadData() {
      this.axios
        .get(`student/${localStorage.getItem("USER_ID")}`)
        .then(response => {
          this.student = response.data.data;
        });
    }
  },
  created: function() {
    this.loadData();
  }
};
</script>
