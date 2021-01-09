<template>
  <div class="homeBox">
    <el-container>
      <el-header></el-header>
      <el-container ref="homePage">
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
    changeSize: function() {
      this.$refs["homePage"].$el["style"].height = `${document.documentElement
        .clientHeight - 60}px`;
    }
  },
  mounted() {
    const that = this;
    this.changeSize();
    window.onresize = function() {
      that.changeSize();
    };
  }
};
</script>
<style scoped></style>
