<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <div>
        <el-switch
          style="display: block"
          v-model="form"
          active-color="#13ce66"
          inactive-color="#13b9ce"
          :active-text="switchText1"
          :inactive-text="switchText2"
        >
        </el-switch>
      </div>
      <el-tree
        :data="menu"
        :props="defaultProps"
        accordion
        @node-click="handleClickMenu"
      ></el-tree>
    </el-aside>

    <el-container>
      <el-main>
        <el-table :data="tableData">
          <el-table-column
            v-for="header in tableHeader"
            :key="header.key"
            :property="header.key"
            :label="header.col"
            width="140"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleDownLoad(scope.row)"
                type="text"
                size="small"
                >下载</el-button
              >
              <el-button
                @click="handlePoint(scope.row)"
                type="text"
                size="small"
                >评分</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    const item = {
        date: "2016-05-02",
        name: "edf",
        address: "sad"
      },
      MenuData = [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      form = 0,
      switchText1 = "按题目查找",
      switchText2 = "按学生查找",
      defaultProps = {
        children: "children",
        label: "label"
      },
      header = [
        {
          col: "日期",
          key: "date"
        },
        {
          col: "姓名",
          key: "name"
        },
        {
          col: "地址",
          key: "address"
        }
      ];
    return {
      tableData: Array(20).fill(item),
      tableHeader: header,
      menu: MenuData,
      defaultProps: defaultProps,
      form: form,
      switchText1: switchText1,
      switchText2: switchText2
    };
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
