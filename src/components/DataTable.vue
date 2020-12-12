<template>
  <el-main>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
    >
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
          <el-button @click="handleDownLoad(scope.row)" type="text" size="small"
            >下载</el-button
          >
          <el-button @click="handlePoint(scope.row)" type="text" size="small"
            >评分</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </el-main>
</template>

<script>
export default {
  data() {
    const item = {
        date: this.index,
        name: "edf",
        address: "sad"
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
      tableData: Array(21).fill(item),
      tableHeader: header,
      currentPage: 1,
      pagesize: 5
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    }
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
