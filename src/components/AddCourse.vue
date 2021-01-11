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
          :on-change="changeFile"
          action=""
          :multiple="false"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      course: {
        courseName: "",
        courseDescription: "",
        defaultPassword: "123456"
      },
      fileList: []
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
