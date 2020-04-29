<template>
  <div class="container">
    <div class="main">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="submenu">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>酒店预订</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 表单 -->
      <IndexForm />
      <!-- 地图 -->
      <IndexMap :data="currentCity" />
      <!-- 筛选过滤 -->
      <IndexFilter />
      <!-- 列表展示 -->
      <IndexList v-for="(item, index) in 4" :key="index" />
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
      <!-- main end -->
    </div>
  </div>
</template>

<script>
import IndexForm from "@/components/hotel/indexForm";
import IndexMap from "@/components/hotel/indexMap";
import IndexFilter from "@/components/hotel/indexFilter";
import IndexList from "@/components/hotel/indexList";
export default {
  components: { IndexForm, IndexMap, IndexFilter, IndexList },
  data() {
    return {
      pageSize: 5,
      pageIndex: 1,
      currentCity: {} //当前城市
    };
  },
  watch: {
    currentCity() {
      // 提示信息
      this.$message.success(`您当前城市是 : ${this.currentCity.address}`);
    }
  },
  mounted() {
    this.reset();
  },
  methods: {
    reset() {
      // 获取当前城市
      window.getCity = val => {
        val = val.content;
        this.currentCity = val;
        this.currentCity.coords = [val.point.x, val.point.y];
        console.log(this.currentCity);
      };
      const el = document.createElement("script");
      el.src = `http://api.map.baidu.com/location/ip?ak=fb6FEkhIPYHYtO8mRqqczmosHNkhmwuY&coor=gcj02&callback=getCity`;
      document.querySelector(".main").appendChild(el);
    },
    // 分页大小改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 当前页改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
.page {
  padding: 20px 0 50px 0;
}
</style>