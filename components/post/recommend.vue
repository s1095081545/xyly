<template>
  <el-container class="container">
    <el-header style="height:20px; margin-top:10px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/post" style="cursor:pointer">旅游攻略</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-container style="margin-bottom:15px">
      <!-- 侧边栏组件 -->
      <el-aside style="width:260px; float:left">
        <Popular />
      </el-aside>
      <!-- 主要区域组件 -->
      <el-main style="width:700px; padding:0; margin:0;">
        <Strategy />
        <!-- 分页组件 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[3, 6, 9, 12]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
          style="width:700px; margin-top:10px;margin-left:25px"
        ></el-pagination>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 左侧栏组件
import Popular from "@/components/post/popular";
// 右侧组件
import Strategy from "@/components/post/strategy";
export default {
  data() {
    return {
      // 当前是 第几页
      pageIndex: 1,
      pageSize: 50
    };
  },
  components: {
    Popular,
    Strategy
  },
  mounted() {
    // this.$axios({
    //   url: "/posts"
    // }).then(res => {
    //   console.log(res);
    //   const { data } = res.data;
    // });
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
}
</style>
