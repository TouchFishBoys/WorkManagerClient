<template>
  <el-container>
    <el-aside><menuList></menuList></el-aside>
    <el-main>
      <dataList :currentPage="currentPage" :pagesize="pagesize"></dataList>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      >
      </el-pagination
    ></el-main>
  </el-container>
</template>

<script>
import menuList from "../components/Menu";
import dataList from "../components/DataTable";
export default {
  components: {
    menuList,
    dataList
  },
  data() {
    return {
      currentPage: 1,
      pagesize: 5,
      totalNum: 3
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
