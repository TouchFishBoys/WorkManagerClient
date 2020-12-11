<template>
  <el-tree
    :data="menulist"
    :props="defaultProps"
    accordion
    @node-click="handleNodeClick"
  ></el-tree>
</template>

<script>
export default {
  data() {
    const stat = 1;
    return {
      stat: stat,
      menulist: [
        {
          label: "个人中心",
          index: 1
        },
        {
          label: "作业详情",
          index: 2,
          children: [
            {
              label: "平时作业",
              index: 2
            },
            {
              label: "大作业",
              index: 3
            }
          ]
        },
        {
          label: "作业答辩",
          index: 4
        },
        {
          label: "学生管理",
          index: 5,
          children: [
            {
              label: "导入学生",
              index: 5
            },
            {
              label: "学生一览",
              index: 6
            }
          ]
        },
        {
          label: "课程管理",
          index: 7,
          children: [
            {
              label: "查看课程",
              index: 7
            },
            {
              label: "新增课程",
              index: 8
            }
          ]
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
      this.stat = menulist.index;
      console.log(this.stat);
    }
  }
};
</script>
