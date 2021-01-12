<template>
  <div class="table-container">
    <el-table
      :data="tblData"
      v-loading="loading"
      border
      element-loading-text="少女折寿中"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <template v-for="(col, index) in tblHeader">
        <slot v-if="col.slot" :name="col.slot"></slot>
        <el-table-column
          v-else
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width ? col.width : '100px'"
        />
      </template>
    </el-table>

    <el-pagination
      v-if="pageObj"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageObj.pageSize"
      :total="pageObj.total"
      @size-change="pageObj.handleSizeChange"
      @current-change="pageobj.handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: ["tblData", "loading", "tblHeader", "pageObj"]
};
</script>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
