<template>
  <div style="height: 100%">
    <course-info-table-stu style="height: 100%"></course-info-table-stu>
  </div>
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
        .get(`student/${this.$store.getters["auth/userId"]}`)
        .then(response => {
          this.student = response.data;
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  },
  created: function() {
    this.loadData();
  }
};
</script>
