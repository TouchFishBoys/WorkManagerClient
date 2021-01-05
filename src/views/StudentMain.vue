<template>
  <el-container>
    <el-aside>
      <el-tree
        :data="menulist"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick"
      ></el-tree>
    </el-aside>
    <el-main>
      <router-view
        @onGetNormalWorkTable="handleGetNormalWorkTable"
      ></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      menulist: [
        {
          label: "个人中心",
          index: "StudentPersonal"
        },
        {
          label: "课程列表",
          index: "CouseInfoTable"
        },
        {
          label: "退出登录",
          index: ""
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
    handleNodeClick(menulist) {
      this.$router.push({
        path: `/studentMain/${menulist.index}`
      });
    },
    handleGetNormalWorkTable(row) {
      this.currentRow = row;
      this.$router.push({
        path: `/studentMain/NormalWorkInfoTable`
      });
    }
  }
};
</script>
