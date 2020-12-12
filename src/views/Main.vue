<template>
  <el-container>
    <el-aside><menuList></menuList></el-aside>
    <el-main>
      <dataList></dataList>
    </el-main>
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
    return {};
  }
};
</script>
