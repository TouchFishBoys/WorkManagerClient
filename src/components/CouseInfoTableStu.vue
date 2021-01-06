<template>
  <el-main>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
    >
      <el-table-column
        v-for="header in tableHeader"
        :key="header.key"
        :property="header.key"
        :label="header.col"
        width="140"
      >
      </el-table-column>
      <el-table-column fixed="right" label="其他" width="200">
        <template slot-scope="scope">
          <el-button @click="handleDo(scope.row)" type="text" size="small"
            >更多操作</el-button
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
    <el-dialog title="提示" :visible.sync="uploadDialog" width="30%">
      <span>
        <el-button type="primary" plain @click="handleGetStudentList"
          >查看班级名单</el-button
        >
        <el-button type="primary" plain @click="handleGetNormalWorkTable"
          >查看课程作业</el-button
        >
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialog = false">取 消</el-button>
        <el-button type="primary" @click="uploadDialog = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
export default {
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
        col: "大作业完成情况",
        key: "fw"
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
      fileList: [],
      uploadDialog: false,
      customColors: [
        { color: "#f56c6c", percentage: 60 },
        { color: "#e6a23c", percentage: 70 },
        { color: "#5cb87a", percentage: 90 },
        { color: "#1989fa", percentage: 80 }
      ]
    };
  },
  methods: {
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
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleGetNormalWorkTable() {
      this.$router.push({
        name: "NormalWorkInfoTable",
        query: {
          courseId: this.currentRow.courseId
        }
      });
      this.uploadDialog = false;
    },
    handleGetStudentList() {
      this.$router.push({
        path: "/studentMain/StudentInfoTable",
        query: {
          courseId: this.currentRow.courseId
        }
      });
      this.uploadDialog = false;
    },
    handleDo(row) {
      this.currentRow = row;
      this.uploadDialog = true;
    },
    loadCourseInfoList() {
      this.axios.get("course").then(response => {
        console.log(response.data.data);
        var data = response.data.data.courses;
        data.forEach((element, index) => {
          data[index].fw = element.finishCount + "/" + element.totalCount;
        });
        this.tableData = response.data.data.courses;
      });
    }
  },
  created: function() {
    this.loadCourseInfoList();
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
