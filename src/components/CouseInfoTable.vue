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
          <el-button @click="setPoitPersent(scope.row)" type="text" size="small"
            >设置分数占比</el-button
          >
          <el-button @click="showTopicList(scope.row)" type="text" size="small"
            >题目列表</el-button
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <point-persent-getter></point-persent-getter>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import PointPersentGetter from "./PointPersentGetter.vue";
export default {
  components: { PointPersentGetter },
  data() {
    const header = [
      {
        col: "课程名",
        key: "courseName"
      },
      {
        col: "课程描述",
        key: "courseDescription"
      },
      {
        col: "课程学年",
        key: "CourseYear"
      },
      {
        col: "课程人数",
        key: "studentCount"
      },
      {
        col: "大作业完成情况",
        key: "fw"
      }
    ];
    return {
      tableData: [],
      tableHeader: header,
      currentPage: 1,
      pagesize: 5,
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
    showTopicList(row) {
      this.$router.push({
        path: "/teacherMain/topics",
        query: {
          courseId: row.courseId
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    setPoitPersent(row) {
      this.currentRow = row;
      this.dialogVisible = true;
    },
    loadCourseInfoList() {
      this.axios.get("course").then(response => {
        console.log(response.data.data);
        var data = response.data.data.courses;
        data.forEach((element, index) => {
          data[index].fw = element.finishCount + "/" + element.totalCount;
        });
        this.tableData = response.data.data.courses;
      });
    }
  },
  created: function() {
    this.loadCourseInfoList();
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
