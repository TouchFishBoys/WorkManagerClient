<template>
  <div>
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
          <el-button @click="handleDownload(scope.row)" type="text" size="small"
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>
        <el-progress
          type="circle"
          :percentage="point"
          :color="customColors"
        ></el-progress>
        <el-input-number
          v-model="point"
          :min="0"
          :max="100"
          label="描述文字"
        ></el-input-number>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
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
      pageSize: 5,
      dialogVisible: false,
      point: 60,
      currentRow: 0,
      customColors: [
        { color: "#f56c6c", percentage: 60 },
        { color: "#e6a23c", percentage: 70 },
        { color: "#5cb87a", percentage: 90 },
        { color: "#1989fa", percentage: 80 }
      ]
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handlePoint(row) {
      this.currentRow = row;
      this.dialogVisible = true;
      let studentId = 1;
      this.axios
        .post(`topic/${studentId}/${this.$route.query.topicId}/score`)
        .then(response => {
          console.log(response.data.data);
          if (response.data.result === "success") {
            this.$notify({
              type: "success",
              message: "成功"
            });
          }
        });
    },
    handleDownload(row) {
      console.log(row);
      let studentId = 1;
      this.axios.get(`topic/${studentId}/${this.$route.query.topicId}`, {
        responseType: "blob"
      });
    },
    loadData() {}
  },
  created: function() {
    this.loadData();
  }
};
</script>
