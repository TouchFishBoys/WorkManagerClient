<template>
  <div class="topic-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teacherMain/courses' }"
        >课程列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>学生列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      v-loading="loading"
      element-loading-text="少女折寿中"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <el-table-column
        v-for="header in tableHeader"
        :key="header.key"
        :property="header.key"
        :label="header.col"
        width="140"
      >
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    const header = [
      {
        col: "学生学号",
        key: "studentNum"
      },
      {
        col: "学生姓名",
        key: "studentName"
      },
      {
        col: "学生班级",
        key: "studentClass"
      },
      {
        col: "学生小组",
        key: "teamName"
      }
    ];
    return {
      tableData: [],
      tableHeader: header,
      currentPage: 1,
      pagesize: 5,
      dialogVisible: false,
      point: 60,
      currentRow: 0,
      customColors: [
        { color: "#f56c6c", percentage: 60 },
        { color: "#e6a23c", percentage: 70 },
        { color: "#5cb87a", percentage: 90 },
        { color: "#1989fa", percentage: 80 }
      ],
      fileList: []
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    uploadNormalWork(row) {
      this.currentRow = row;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed() {
      this.$message.warning(`每次仅能上传一个文件`);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    loadData() {
      this.axios
        .get(`course/${this.$route.query.courseId}/student`)
        .then(response => {
          console.log(response.data.data);
          this.tableData = response.data.data;
        });
    }
  },
  created: function() {
    this.loadData();
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
