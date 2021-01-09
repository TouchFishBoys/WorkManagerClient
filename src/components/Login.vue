<template>
  <div>
    <div style="display: flex; justify-content: center; margin-top: 150px">
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <table>
          <tr>
            <td>用户名</td>
            <td>
              <el-input
                v-model="user.username"
                placeholder="请输入用户名"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>密码</td>
            <td>
              <el-input
                type="password"
                v-model="user.password"
                placeholder="请输入密码"
                @keydown.enter.native="doLogin"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <el-radio v-model="user.role" label="ROLE_TEACHER">老师</el-radio>
              <el-radio v-model="user.role" label="ROLE_STUDENT">学生</el-radio>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <el-button style="width: 300px" type="primary" @click="doLogin"
                >登录</el-button
              >
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "1",
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
            console.log("login success");
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
