<template>
  <el-container>
    <el-header style="color:#409EFF">
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            学生学号：{{ teacher.teacherNum }}
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            学生姓名：{{ teacher.teacherName }}
          </div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple">
            学生班级：{{ teacher.teacherTell }}
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-main><couse-info-table-stu></couse-info-table-stu></el-main>
  </el-container>
</template>
<script>
import CouseInfoTableStu from "./CouseInfoTableStu.vue";

export default {
  components: { CouseInfoTableStu },
  data() {
    return {
      teacher: {
        teacherNum: "测试学生学号",
        teacherName: "测试学生姓名",
        teacherTell: "测试教师电话"
      }
    };
  },
  methods: {}
};
</script>
