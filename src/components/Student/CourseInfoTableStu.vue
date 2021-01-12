<template>
  <div class="course-container">
    <el-breadcrumb>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      element-loading-text="少女折寿中"
      element-loading-background="rgba(0, 0, 0, 0.4)"
      :data="tableData"
      v-loading="loading"
      height="550px"
      border
    >
      <el-table-column
        v-for="header in tableHeader"
        :key="header.key"
        :property="header.key"
        :label="header.col"
        width="140"
      >
      </el-table-column>
      <el-table-column fixed="right" label="大作业" width="100">
        <template slot-scope="scope">
          <el-button @click="handleJoinTeam(scope.row)" type="text" size="small"
            >小组列表</el-button
          >
          <br />
          <el-button @click="handleDo(scope.row)" type="text" size="small"
            >交大作业</el-button
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="其他" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleGetStudentList(scope.row)"
            type="text"
            size="small"
            >学生列表</el-button
          >
          <br />
          <el-button
            @click="handleGetNormalWorkTable(scope.row)"
            type="text"
            size="small"
            >题目列表</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="sizes, total, prev, pager, next, jumper"
      :page-count="tablePageCount"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    const header = [
      {
        col: "课程名",
        key: "courseName"
      },
      {
        col: "课程描述",
        key: "courseDescription"
      },
      {
        col: "课程学年",
        key: "courseYear"
      },
      {
        col: "课程人数",
        key: "studentCount"
      },
      {
        col: "任课老师",
        key: "courseTeacherName"
      },
      {
        col: "大作业完成情况",
        key: "fw"
      }
    ];
    return {
      loading: true,
      tableData: [],
      tableHeader: header,
      tablePageCount: 1,
      currentPage: 1,
      pageSize: 5,
      dialogVisible: false,
      point: 60,
      currentRow: 0,
      customColors: [
        { color: "#f56c6c", percentage: 60 },
        { color: "#e6a23c", percentage: 70 },
        { color: "#5cb87a", percentage: 90 },
        { color: "#1989fa", percentage: 80 }
      ]
    };
  },
  methods: {
    handleJoinTeam(row) {
      this.$router.push({
        path: "/studentMain/TeamInfoTable",
        query: {
          courseId: row.courseId
        }
      });
    },
    handleGetNormalWorkTable(row) {
      this.$router.push({
        path: "/studentMain/NormalWorkInfoTable",
        query: {
          courseId: row.courseId
        }
      });
    },
    handleGetStudentList(row) {
      this.$router.push({
        path: "/studentMain/StudentInfoTable",
        query: {
          courseId: row.courseId
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    setPoitPercent(row) {
      this.currentRow = row;
      this.dialogVisible = true;
    },
    loadCourseInfoList() {
      this.loading = true;
      this.axios
        .get("course", {
          params: {
            page: this.currentPage,
            size: this.pageSize
          }
        })
        .then(response => {
          this.loading = false;
          console.log(response.data.data);
          let data = response.data.data["courses"];
          data.forEach((element, index) => {
            data[index].fw =
              element["finishCount"] + "/" + element["totalCount"];
          });
          this.tableData = response.data.data["courses"];
          this.tablePageCount = response.data.data["pageCount"];
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    }
  },
  created: function() {
    this.loadCourseInfoList();
  },
  watch: {
    currentPage: function() {
      this.loadCourseInfoList();
    },
    pageSize: function() {
      this.loadCourseInfoList();
    }
  }
};
</script>

<style>
.course-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
