<template>
  <div class="submit-container">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/teacherMain/courses' }"
        >课程列表</el-breadcrumb-item
      >
      <el-breadcrumb-item
        :to="{ path: '/teacherMain/topics', query: { courseId: courseId } }"
        >题目列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>提交情况</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      border
      :data="tableData"
      height="700"
      v-loading="loading"
      element-loading-text="少女折寿中"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <el-table-column
        v-for="header in tableHeader"
        :key="header.key"
        :property="header.key"
        :label="header.col"
        width="160"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleDownload(scope.row)" type="text" size="small"
            >下载</el-button
          >
          <el-button @click="handlePoint(scope.row)" type="text" size="small"
            >评分</el-button
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>
        <el-progress
          type="circle"
          :percentage="point"
          :color="customColors"
        ></el-progress>
        <el-input-number
          v-model="point"
          :min="0"
          :max="100"
          label="描述文字"
        ></el-input-number>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    const item = {
        date: this.index,
        name: "edf",
        address: "sad"
      },
      header = [
        { col: "日期", key: "timeUpload" },
        { col: "姓名", key: "student.studentName" },
        { col: "地址", key: "address" }
      ];
    return {
      courseId: this.$route.query.courseId,
      loading: true,
      tableData: Array(21).fill(item),
      tableHeader: header,
      currentPage: 1,
      pageSize: 5,
      dialogVisible: false,
      point: 60,
      currentRow: 0,
      customColors: [
        {
          color: "#f56c6c",
          percentage: 60
        },
        { color: "#e6a23c", percentage: 70 },
        {
          color: "#5cb87a",
          percentage: 90
        },
        { color: "#1989fa", percentage: 80 }
      ]
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handlePoint(row) {
      this.currentRow = row;
      this.dialogVisible = true;
    },
    handleDownload(row) {
      console.log(row);
      let studentId = row.student.studentId;
      this.axios
        .get(`topic/${studentId}/${this.$route.query.topicId}`, {
          responseType: "blob"
        })
        .then(response => {
          var contentDisposition = response.headers["content-disposition"];
          console.log(contentDisposition);
          var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
          var result = patt.exec(contentDisposition);

          let blob = new Blob([response.data]);
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob);

          downloadElement.style.display = "none";
          downloadElement.href = href;
          downloadElement.download = decodeURI(result[1]);
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
        });
    },
    loadData() {
      this.loading = true;
      this.axios
        .get(`topic/${this.$route.query.topicId}/normal-work`)
        .then(response => {
          this.loading = false;
          this.tableData = response.data.data;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    setScore(row) {
      this.axios
        .post(`topic/${row.studentId}/${this.$route.query.topicId}/score`)
        .then(response => {
          this.loading = false;
          console.log(response.data.data);
          if (response.data.result === "success") {
            this.$notify({
              type: "success",
              message: "成功"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created: function() {
    this.loadData();
  }
};
</script>
<style scoped>
.submit-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
