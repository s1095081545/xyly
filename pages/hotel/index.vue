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
      <IndexMap :data="list" :cities="cities" :currentCity="currentCity"/>
      <!-- 筛选过滤 -->
      <IndexFilter />
      <!-- 列表展示 -->
      <IndexList v-for="(item, index) in list.data" :key="index" :data="item" />
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
      currentCity: {}, //当前城市
      list: {}, //存储返回的数据
      cities: [] //城市的数据
    };
  },
  watch: {
    currentCity() {
      // 提示信息
      // this.$message.success(
      //   `您当前城市是 : ${this.currentCity.address_detail["city"]}`
      // );
    },
    async $route() {
      const { cityName, ...data } = this.$route.query;
      if (cityName.trim() == "") return;
      const res = await this.$store.dispatch("hotel/getCities", cityName);
      if (res.total > 0) {
        this.cities = res.data[0];
        data.city = res.data[0].id;
        data._start = 1;
        data._limit = 5;
        console.log(data);

        // 获取酒店
        this.getHotels(data).then(res => {
          this.list = res;
          console.log(res);
        });
      }
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
        this.$router.push({
          query: {
            cityName: this.currentCity.address_detail["city"]
          }
        });
      };
      const el = document.createElement("script");
      el.src = `http://api.map.baidu.com/location/ip?ak=fb6FEkhIPYHYtO8mRqqczmosHNkhmwuY&coor=gcj02&callback=getCity`;
      document.querySelector(".main").appendChild(el);
    },
    // 获取城市
    getCitys(data) {
      return this.$axios({ url: `/cities?name=${data}` }).then(res => {
        const { data } = res;
        return data;
      });
    },
    // 获取酒店
    getHotels(data) {
      return this.$axios({ url: `/hotels`, params: data }).then(res => {
        const { data } = res;
        return data;
      });
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