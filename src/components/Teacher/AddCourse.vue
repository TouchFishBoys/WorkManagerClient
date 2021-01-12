<template>
  <div>
    <el-form label-width="80px" ref="formAddCourse">
      <el-form-item label="课程名">
        <el-input v-model="course.courseName"></el-input>
      </el-form-item>
      <el-form-item label="课程描述">
        <el-input type="textarea" v-model="course.courseDescription"></el-input>
      </el-form-item>
      <el-form-item label="默认密码">
        <el-input v-model="course.defaultPassword"></el-input>
      </el-form-item>
      <el-form-item label="学生名单">
        <el-upload
          :show-file-list="false"
          :http-request="onUploadPreview"
          accept=".xlsx"
          :on-change="changeFile"
          action=""
          :multiple="false"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">请上传图片格式文件</div>
        </el-upload>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>

    <el-collapse>
      <el-collapse-item title="预览">
        <el-table border height="400px" :data="tableData" v-loading="loading">
          <el-table-column
            v-for="header in tableHeader"
            :key="header.key"
            :property="header.key"
            :label="header.label"
            v-show="showPreview"
          />
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    const tableHeader = [
      {
        label: "学号",
        key: "studentNum"
      },
      {
        label: "姓名",
        key: "studentName"
      },
      {
        label: "行政班",
        key: "studentClass"
      }
    ];
    return {
      loading: false,
      tableData: [],
      tableHeader: tableHeader,
      showPreview: true,
      course: {
        courseName: "",
        courseDescription: "",
        defaultPassword: "123456"
      },
      fileList: []
    };
  },
  methods: {
    onUploadPreview(val) {
      this.loading = true;
      this.tableData = [];
      console.log(val);
      let formData = new FormData();
      formData.append("file", val.file);
      this.axios
        .post("/student/preview", formData)
        .then(response => {
          this.tableData = response.data.data;
          this.loading = false;
        })
        .catch(() => {
          this.$notify({
            type: "error",
            message: "加载预览失败"
          });
          this.loading = false;
        });
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
    changeFile(file, filelist) {
      this.fileList = [...filelist];
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("course_name", this.course.courseName);
      formData.append("course_description", this.course.courseDescription);
      formData.append("default_password", this.course.defaultPassword);
      formData.append("excel", this.fileList[0].raw);
      this.axios.post("student", formData).then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>
