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
      <router-view></router-view>
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
          index: "Personal"
        },
        {
          label: "作业详情",
          index: "DataTable",
          children: [
            {
              label: "平时作业",
              index: "DataTable"
            },
            {
              label: "大作业",
              index: "DataTable"
            }
          ]
        },
        {
          label: "作业答辩",
          index: "QAtable"
        },
        {
          label: "学生管理",
          index: "",
          children: []
        },
        {
          label: "新增课程",
          index: "AddCouse"
        },
        {
          label: "退出登录",
          index: 9
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(menulist) {
      this.$router.push({
        path: `/teacherMain/${menulist.index}`
      });
    }
  }
};
</script>
