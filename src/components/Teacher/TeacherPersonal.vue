<template>
  <div>
    <course-info-table></course-info-table>
  </div>
</template>
<script>
import courseInfoTable from "./CourseInfoTable.vue";

export default {
  components: { courseInfoTable },
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
        .get(`teacher/${this.$store.getters["auth/userId"]}`)
        .then(response => {
          this.teacher = response.data.data;
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
