<template>
  <div style="display: flex;  flex-direction: column;  height: 100%;">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teacherMain/courses' }"
        >课程列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>题目列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      v-loading="loading"
      element-loading-text="少女折寿中"
      element-loading-background="rgba(0, 0, 0, 0.4)"
      height="500px"
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
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="showSubmitStatus(scope.row)"
            type="text"
            size="small"
            >显示提交情况</el-button
          >
        </template>
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
        col: "题目名",
        key: "topicName"
      },
      {
        col: "题目描述",
        key: "topicDescription"
      },
      {
        col: "起始时间",
        key: "startTime"
      },
      {
        col: "截止时间",
        key: "finishTime"
      },
      {
        col: "完成情况",
        key: "finishedInfo"
      }
    ];
    return {
      loading: true,
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
    showSubmitStatus(row) {
      let courseId = this.$route.query.courseId;
      this.$router.push({
        path: "/teacherMain/normal-works",
        query: {
          courseId: courseId,
          topicId: row.topicId
        }
      });
    },
    loadData() {
      this.loading = true;
      this.axios
        .get(`/course/${this.$route.query.courseId}/topic`)
        .then(response => {
          this.loading = false;
          console.log(response.data.data);
          this.tableData = response.data.data.topics;
          this.tableData.forEach((item, index) => {
            this.tableData[index].finishedInfo =
              item.finishedCount + "/" + item.totalCount;
          });
        });
    }
  },
  created: function() {
    this.loadData();
  }
};
</script>

<style scoped>
.topic-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
