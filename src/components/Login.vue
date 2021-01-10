<template>
  <div class="login-box" :style="backcss">
    <el-card style="width: 400px" class="login-card noselect">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <el-form :model="user" label-width="80px">
        <el-form-item prop="username" label="工号/学号">
          <el-input
            v-model="user.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="user.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="user.role">
            <el-radio label="ROLE_TEACHER">教师</el-radio>
            <el-radio label="ROLE_STUDENT">学生</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backcss: {
        backgroundImage: "url(" + require("@/assets/background.png") + ")"
      },
      user: {
        username: "",
        password: "",
        role: "ROLE_STUDENT"
      }
    };
  },
  methods: {
    doLogin() {
      let notifi = this.$notify({
        type: "info",
        message: "登录中"
      });
      this.axios
        .post("auth/login", this.user)
        .then(response => {
          notifi.close();
          if (response.data.result === "success") {
            this.$notify.success("登录成功");
            this.$store.commit("auth/login", response.data.data.token);
            localStorage.setItem("USER_ID", response.data.data.userId);
            if (this.user.role === "ROLE_STUDENT") {
              this.$router.push({
                path: "/studentMain"
              });
            } else if (this.user.role === "ROLE_TEACHER") {
              this.$router.push({
                path: "/teacherMain"
              });
            }
          }
        })
        .catch(() => {
          notifi.close();
          this.$notify.error("用户名或密码错误");
        });
    }
  }
};
</script>

<style scoped>
.login-box {
  background-size: cover;
  width: 100%;
  height: 100%;
}
.login-card {
  margin: auto;
  top: 0;
  bottom: 0;
  position: fixed;
  height: 350px;
  right: 0;
  left: 0;
}
</style>
