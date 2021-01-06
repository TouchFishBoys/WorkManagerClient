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
    <el-main><couse-info-table></couse-info-table></el-main>
  </el-container>
</template>
<script>
import CouseInfoTable from "./CouseInfoTable.vue";

export default {
  components: { CouseInfoTable },
  data() {
    return {
      teacher: {
        teacherNum: "测试教师工号",
        teacherName: "测试教师姓名",
        teacherTell: "测试教师电话"
      }
    };
  },
  methods: {
    loadData() {
      this.axios
        .get(`teacher/${localStorage.getItem("USER_ID")}`)
        .then(response => {
          this.teacher = response.data.data;
        });
    }
  },
  created: function() {
    this.loadData();
  }
};
</script>
