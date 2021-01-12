<template>
  <div>
    <div class="block">
      <div style="color:#409EFF">平时作业成绩比例：</div>
      <el-slider
        v-model="values.value1"
        max="60"
        show-input
        @input="handleChange1"
      >
      </el-slider>
    </div>
    <div class="block">
      <div style="color:#409EFF">大作业成绩比例：</div>
      <el-slider
        v-model="values.value2"
        max="60"
        show-input
        @input="handleChange2"
      >
      </el-slider>
    </div>
    <div class="block">
      <div style="color:#409EFF">文档成绩比例：</div>
      <el-slider
        v-model="values.value3"
        max="60"
        show-input
        @input="handleChange3"
      >
      </el-slider>
    </div>
    <div class="block">
      <div style="color:#409EFF">答辩成绩比例：</div>
      <el-slider
        v-model="values.value4"
        max="60"
        show-input
        @input="handleChange4"
      >
      </el-slider>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      values: {
        value1: 25,
        value2: 25,
        value3: 25,
        value4: 25
      }
    };
  },
  methods: {
    handleChange1() {
      this.values.value2 =
        100 - this.values.value1 - this.values.value3 - this.values.value4;
    },
    handleChange2() {
      this.values.value3 =
        100 - this.values.value1 - this.values.value2 - this.values.value4;
    },
    handleChange3() {
      this.values.value4 =
        100 - this.values.value1 - this.values.value2 - this.values.value3;
    },
    handleChange4() {
      this.values.value1 =
        100 - this.values.value2 - this.values.value3 - this.values.value4;
    }
  }
};
</script>
