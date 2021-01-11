<template>
  <div class="topic-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teacherMain/courses' }"
        >课程列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>大作业列表</el-breadcrumb-item>
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
        width="150"
      >
      </el-table-column>
      <el-table-column fixed="right" label="下载" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleDownloadDocument(scope.row)"
            type="text"
            size="small"
            >下载文档</el-button
          >
          <br />
          <el-button
            @click="handleDownloadFile(scope.row)"
            type="text"
            size="small"
            >下载文件</el-button
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleScoreDocument(scope.row)"
            type="text"
            size="small"
            >文档评分</el-button
          >
          <br />
          <el-button
            @click="handleScoreDocument(scope.row)"
            type="text"
            size="small"
            >作业评分</el-button
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
        <el-upload
          class="upload-demo"
          action
          :http-request="uploadFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          accept=".war"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
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
    const header = [
      {
        col: "大作业名",
        key: "finalWorkName"
      },
      {
        col: "描述",
        key: "description"
      },
      {
        col: "小组名",
        key: "teamName"
      },
      {
        col: "作者",
        key: "authors"
      },
      {
        col: "提交时间",
        key: "submitTime"
      }
    ];
    return {
      tableData: [],
      tableHeader: header,
      currentPage: 1,
      pagesize: 5,
      authors: [],
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
        .get(`/course/${this.$route.query.courseId}/final-work?finished=true`)
        .then(response => {
          console.log(response.data.data);
          this.tableData = response.data.data;
          this.tableData.forEach((item, index) => {
            this.authors = item.authors;
            this.tableData[index].authors = this.authors[0];
            if (this.authors[1]) {
              this.tableData[index].authors =
                this.tableData[index].authors + "，" + this.authors[1];
            }
            if (this.authors[2]) {
              this.tableData[index].authors =
                this.tableData[index].authors + "，" + this.authors[2];
            }
          });
        });
    },
    uploadFile(fileObj) {
      var form = new window.FormData();
      form.append("file", fileObj.file);
      var notifi = this.$notify({
        type: "info",
        message: "uploading"
      });
      this.axios
        .post(`${this.currentRow.topicId}`, form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          notifi.close();
          this.$notify({
            type: "success",
            message: "上传成功"
          });
        })
        .catch(error => {
          notifi.close();
          this.$notify({
            type: "error",
            message: "上传失败"
          });
          console.log(error);
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
