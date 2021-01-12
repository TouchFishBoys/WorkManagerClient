<template>
  <div class="course-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/studentMain/courses' }"
        >课程列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>小组列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 5px; margin-bottom: 5px">
      <el-button style="left:5px; float:left" @click="createTeam" type="primary"
        >创建队伍</el-button
      >
    </div>
    <el-table
      element-loading-text="少女折寿中"
      element-loading-background="rgba(0, 0, 0, 0.4)"
      :data="tableData"
      v-loading="loading"
      height="550px"
      border
    >
      <el-table-column
        v-for="header in tableHeader"
        :key="header.key"
        :property="header.key"
        :label="header.col"
        width="180"
      >
      </el-table-column>
      <el-table-column label="选项" width="100">
        <template slot-scope="scope">
          <el-button @click="handleJoin(scope.row)" type="text" size="small"
            >加入</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="sizes, total, prev, pager, next, jumper"
      :page-count="tablePageCount"
    >
    </el-pagination>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span> 是否加入{{ currentRow.teamName }}? </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="readyJoin">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="createDialogVisible" width="30%">
      <el-form>
        <el-form-item label="队伍名">
          <el-input v-model="createdTeamName"></el-input>
        </el-form-item>
      </el-form>
      <el-form slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createTeam">确 定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    const header = [
      {
        col: "小组名",
        key: "teamName"
      },
      {
        col: "成员",
        key: "students"
      },
      {
        col: "人数",
        key: "memberCount"
      }
    ];
    return {
      loading: true,
      tableData: [],
      tableHeader: header,
      tablePageCount: 1,
      currentPage: 1,
      pageSize: 5,
      dialogVisible: false,
      createDialogVisible: false,
      point: 60,
      courseId: 0,
      students: [],
      currentRow: 0,
      customColors: [
        { color: "#f56c6c", percentage: 60 },
        { color: "#e6a23c", percentage: 70 },
        { color: "#5cb87a", percentage: 90 },
        { color: "#1989fa", percentage: 80 }
      ],
      createdTeamName: ""
    };
  },
  methods: {
    readyJoin() {
      this.axios
        .patch(`team/${this.courseId}/${this.currentRow.teamId}`)
        .then(response => {
          if (response.data) {
            this.$notify.success("成功加入队伍！");
            this.dialogVisible = false;
            this.loadData();
          }
        })
        .catch(() => {
          this.$notify.error("加入失败");
          this.dialogVisible = false;
        });
    },
    handleJoin(row) {
      if (row.memberCount == "3/3") {
        this.$notify.error("该队伍已满");
      } else {
        this.dialogVisible = true;
        this.currentRow = row;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    loadData() {
      this.loading = true;
      this.courseId = this.$route.query.courseId;
      this.axios
        .get(`team/${this.$route.query.courseId}/course`)
        .then(response => {
          this.loading = false;
          let data = response.data.data;
          data.forEach((element, index) => {
            data[index].memberCount = element["memberCount"] + "/3";
            this.students = element.students;
            element.students = this.students[0];
            this.students.forEach((item, inx) => {
              if (inx != 0)
                data[index].students = data[index].students + "，" + item;
            });
          });
          this.tableData = response.data.data;
          this.tablePageCount = response.data.data["pageCount"];
          console.log(response.data.data);
        });
    },
    createTeam() {
      if (this.createDialogVisible) {
        this.axios
          .post(`/team/${this.courseId}`, { value: this.createdTeamName })
          .then(response => {
            if (response.data) {
              this.createDialogVisible = false;
              this.loadData();
              this.$notify({
                type: "success",
                message: "创建成功"
              });
            }
          });
      } else {
        this.createdTeamName = "";
        this.createDialogVisible = true;
      }
    }
  },
  created: function() {
    this.loadData();
  },
  watch: {
    currentPage: function() {
      this.loadData();
    },
    pageSize: function() {
      this.loadData();
    }
  }
};
</script>

<style>
.course-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
