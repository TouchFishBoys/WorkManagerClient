<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="答辩第一问" name="1">
      <el-input v-model="Que1" placeholder="请输入Q1"></el-input>
      <el-input type="textarea" :rows="3" placeholder="请输入A1" v-model="Ans1">
      </el-input>
    </el-collapse-item>
    <el-collapse-item title="答辩第二问" name="2">
      <el-input v-model="Que2" placeholder="请输入Q2"></el-input>
      <el-input type="textarea" :rows="3" placeholder="请输入A2" v-model="Ans2">
      </el-input>
    </el-collapse-item>
    <el-collapse-item title="答辩第三问" name="3">
      <el-input v-model="Que3" placeholder="请输入Q3"></el-input>
      <el-input type="textarea" :rows="3" placeholder="请输入A3" v-model="Ans3">
      </el-input>
    </el-collapse-item>
    <el-button type="primary" @click="askForEnd" round>完成</el-button>
  </el-collapse>
</template>

<script>
export default {
  data() {
    return {
      Que1: "这是第1问",
      Que2: "这是第2问",
      Que3: "这是第3问",
      Ans1: "这是第1答",
      Ans2: "这是第2答",
      Ans3: "这是第3答"
    };
  },
  methods: {
    askForEnd() {
      this.$confirm("是否完成并提交答辩记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "返回"
          });
        });
    }
  }
};
</script>
