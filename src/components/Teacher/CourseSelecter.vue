<template>
  <el-container>
    <el-header style="color:#409EFF">
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            教师工号：{{ teacher.teacherNum }}
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            教师姓名：{{ teacher.teacherName }}
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            教师电话：{{ teacher.teacherTell }}
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-main><course-info-table></course-info-table></el-main>
  </el-container>
</template>
<script>
import CourseInfoTable from "./CourseInfoTable.vue";

export default {
  components: { CourseInfoTable },
  data() {
    return {
      teacher: {
        teacherNum: "测试教师工号",
        teacherName: "测试教师姓名",
        teacherTell: "测试教师电话"
      }
    };
  },
  methods: {}
};
</script>
