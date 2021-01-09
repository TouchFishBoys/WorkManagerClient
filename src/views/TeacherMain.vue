<template>
  <div class="homeBox">
    <el-container ref="homePage">
      <el-header>
        <el-checkbox-group>
          <el-checkbox-button>klsadjadlk</el-checkbox-button>
        </el-checkbox-group>
      </el-header>
      <el-container>
        <el-aside width="200px">
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
                  :index="'/teacherMain' + menuItem.index"
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
                      :index="'/teacherMain' + v.index"
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
        <el-main>
          <router-view></router-view>
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
          index: "/Personal"
        },
        {
          icon: "el-icon-document",
          label: "作业详情",
          index: "/DataTable",
          children: [
            {
              icon: "el-icon-document",
              label: "平时作业",
              index: "/DataTable"
            },
            {
              icon: "el-icon-document",
              label: "大作业",
              index: "/DataTable"
            }
          ]
        },
        {
          icon: "el-icon-document",
          label: "作业答辩",
          index: "/QAtable"
        },
        {
          icon: "el-icon-document",
          label: "新增课程",
          index: "/Addcourse"
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    changeFixed(clientHeight) {
      //动态修改样式
      // console.log(clientHeight);
      console.log(this.$refs.homePage.$el.style.height);
      this.$refs.homePage.$el.style.height = clientHeight + "px";
    }
  },
  mounted() {
    const that = this;
    //this.clientHeight = `${document.documentElement.clientHeight}`;
    //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      that.changeFixed(`${document.documentElement.clientHeight}px`);
    };
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    }
  }
};
</script>
<style scoped>
.homeBox {
  height: 100%;
}
</style>
