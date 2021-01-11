<template>
  <div>
    <el-container>
      <el-header>
        <el-button
          @click="logout"
          icon="el-icon-switch-button"
          type="danger"
          circle
        ></el-button>
      </el-header>
      <el-container ref="homePage" class="view-container">
        <el-aside width="300px">
          <el-row>
            <el-col :span="24">
              <el-menu
                unique-opened
                router
                :default-active="$route.path"
                class="left-menu"
                :collapse="isCollapse"
              >
                <component
                  class="menu-item"
                  v-for="menuItem in menuList"
                  :key="menuItem.label"
                  :index="'/studentMain' + menuItem.index"
                  :is="
                    menuItem.children && menuItem.children.length > 0
                      ? 'el-submenu'
                      : 'el-menu-item'
                  "
                >
                  <template slot="title">
                    <i :class="[menuItem.icon]"></i>
                    <span>{{ menuItem.label }}</span>
                  </template>
                  <template
                    v-if="menuItem.children && menuItem.children.length > 0"
                  >
                    <el-menu-item
                      class="menu-item"
                      v-for="(v, i) in menuItem.children"
                      :key="v.index + i"
                      :index="'/stduentMain' + v.index"
                    >
                      <i :class="[v.icon]"></i>
                      <span slot="title">{{ v.label }}</span>
                    </el-menu-item>
                  </template>
                </component>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main class="main-container">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isCollapse: false,
      menuList: [
        {
          icon: "el-icon-document",
          label: "个人中心",
          index: "/StudentPersonal"
        },
        {
          icon: "el-icon-document",
          label: "课程列表",
          index: "/courses"
        },
        {
          icon: "el-icon-document",
          label: "退出登录",
          index: "/logout"
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      currentRow: 0
    };
  },
  methods: {
    logout: function() {
      this.$router.push("/login");
      this.$store.commit("auth/logout");
    }
  }
};
</script>
<style scoped>
.main-container {
  width: 100%;
}
.view-container {
  height: calc(100vh - 60px);
}
</style>
