<template>
  <div class="container">
    <div class="main">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="submenu">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>酒店预订</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="切换城市"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="-"
            start-placeholder="入住日期"
            end-placeholder="离店日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="人数未定"
            suffix-icon="el-icon-user"
            v-model="input1"
            readonly="readonly"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" >查看价格</el-button>
        </el-form-item>
      </el-form>

      <!-- main end -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped lang="less">
.container {
  // background: #f5f5f5;
  // padding: 30px 0;
  .main {
    width: 1000px;
    margin: 0 auto;
  }
}
.submenu {
  line-height: 50px;
}
</style>