<template>
  <div>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
      ref="formAddCourse"
    >
      <el-form-item label="课程名">
        <el-input v-model="couse.couseName"></el-input>
      </el-form-item>
      <el-form-item label="课程描述">
        <el-input v-model="couse.couseDescription"></el-input>
      </el-form-item>
      <el-form-item label="学生名单">
        <el-upload
          :on-change="changeFile"
          action=""
          :http-request="handleFile"
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
      couse: {
        couseName: "",
        couseDescription: ""
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
      //文件状态改变时的钩子 把filelist 赋值给data中的filelist
      this.fileList = [...filelist];
    },
    onSubmit() {
      var formData = new FormData();
      formData.append("course_name", this.couse.couseName);
      formData.append("course_description", this.couse.couseDescription);
      formData.append("excel", this.fileList[0].raw);
      this.axios.post("student", formData).then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>
