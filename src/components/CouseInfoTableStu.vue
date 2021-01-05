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
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="getNormalWorkTable(scope.row)"
            type="text"
            size="small"
            >查看作业</el-button
          >
          <el-button
            @click="uploadFinalWork(scope.row)"
            type="text"
            size="small"
            >提交大作业</el-button
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
    <el-dialog
      title="提示"
      :visible.sync="uploadDialog"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请上传大作业</div>
        </el-upload>
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
    const item = {
        courseName: "测试课程名",
        courseDescription: "测试课程描述",
        CourseYear: "2020",
        studentCount: "80",
        fw: "67/80"
      },
      header = [
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
          key: "CourseYear"
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
      tableData: Array(21).fill(item),
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
    getNormalWorkTable(row) {
      this.currentRow = row;
      this.$emit("onGetNormalWorkTable", row);
    },
    uploadFinalWork(row) {
      this.currentRow = row;
      this.uploadDialog = true;
    }
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
