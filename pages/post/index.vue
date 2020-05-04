<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="submenu">
      <el-breadcrumb-item>攻略</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.query.cityName }}旅游攻略</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-row type="flex" justify="space-between">
        <el-col :span="6">
          <!-- 侧边栏组件 -->
          <Popular />
        </el-col>
        <el-col :span="17">
          <!-- 主要区域组件 -->
          <Strategy />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 左侧栏组件
import Popular from "@/components/post/popular";
// 右侧组件
import Strategy from "@/components/post/strategy";
export default {
  components: {
    Popular,
    Strategy
  },
  beforeRouteEnter(to, from, next) {
    if (from.path.indexOf("/post/detail") !== -1) {
      next();
    } else {
      next(vm => {
        vm.$router.push({
          path: "/post",
          query: {
            ...vm.$route.query,
            start: 1,
            limit: 3
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
}
.submenu {
  line-height: 50px;
  margin-bottom: 5px;
}
</style>
