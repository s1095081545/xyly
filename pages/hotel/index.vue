<template>
  <div class="container">
    <div class="main">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="submenu">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.query.cityName }}酒店预订</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 表单 -->
      <IndexForm />
      <!-- 地图 -->
      <IndexMap :data="list" :cities="cities" />
      <!-- 筛选过滤 -->
      <IndexFilter />
      <!-- 列表展示 -->
      <IndexList v-for="(item, index) in list.data" :key="index" :data="item" v-if="list.data" />
      <!-- 分页 -->
      <div class="page" v-if="total">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 15, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 没有符合的条件时显示 -->
      <div class="isnull" id="isnull" ref="isnull" v-show="!total">
        {{txt}}
        <i :class="txt?'':'el-icon-loading'"></i>
        <i>{{txt?'':'加载中。。。'}}</i>
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
  beforeRouteEnter(to, from, next) {
    if (from.fullPath.indexOf("/hotel/") > -1) {
      next(vm => (vm.isRouter = false));
    } else {
      next(vm => (vm.isRouter = true));
    }
  },
  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      total: 1, //总条数
      list: {}, //存储返回的数据
      cities: [], //城市的数据
      isRouter: false, //是否更新路由
      txt: "",
      clear: "", //定时器
      resetTime: "" //初始化的时候用的定时器
    };
  },
  watch: {
    $route() {
      this.txt = "";
      this.total = 0;
      clearTimeout(this.clear);
      this.clear = setTimeout(() => {
        clearTimeout(this.clear);
        this.txt = "暂无符合条件的酒店哦";
      }, 6000);
      this.upData();
    }
  },
  mounted() {
    this.reset();
    this.$axios({ url: `/hotels?id=185` }).then(res => {
      const { data } = res;
    });
  },
  methods: {
    reset() {
      // 获取当前城市
      // 如果是从酒店详情页返回的则不重新获取当前位置
      clearTimeout(this.resetTime);
      this.resetTime = setTimeout(() => {
        const cities = this.$store.state.hotel.cities;
        if (cities) {
          this.$router.push({
            path: "hotel",
            query: {
              cityName: cities,
              _start: 1,
              _limit: 10
            }
          });
          this.upData();
          return;
        }
        // console.log(cities);
        window.getCity = val => {
          const city = val.content.address_detail["city"];
          this.$store.commit("hotel/setCities", city);
          this.$router.push({
            path: "hotel",
            query: {
              cityName: city,
              _start: 1,
              _limit: 10
            }
          });
          // 城市定位弹出框
          this.$alert(`定位城市是：${city}`, "提示", {
            confirmButtonText: "确定",
            callback: action => {
              this.$message({
                type: "success",
                message: `已切换到: ${city}`
              });
            }
          });
        };
        const el = document.createElement("script");
        el.src = `http://api.map.baidu.com/location/ip?ak=fb6FEkhIPYHYtO8mRqqczmosHNkhmwuY&coor=gcj02&callback=getCity`;
        document.querySelector(".main").appendChild(el);
      }, 10);
    },
    // 更新页面数据
    async upData() {
      this.list = {};
      const { cityName, ...data } = this.$route.query;
      const { _start, _limit } = data;
      this.pageIndex = (+_start - 1) / +_limit + 1;
      if (!cityName || cityName.trim() == "") return;
      const res = await this.$store.dispatch("hotel/getCities", cityName);
      if (res.total > 0) {
        this.cities = res.data[0];
        data.city = res.data[0].id;

        // 获取酒店
        this.getHotels(data).then(res => {
          this.list = res;
          this.total = res.total - 1 >= 0 ? res.total - 1 : 0;
          this.txt = "暂无符合条件的酒店哦";
        });
      }
    },
    // 获取酒店
    getHotels(data) {
      return this.$axios({
        url: `/hotels`,
        params: data,
        paramsSerializer: function(params) {
          const keys = Object.keys(params);
          let str = "";
          keys.forEach(item => {
            if (Array.isArray(params[item])) {
              str += `&` + params[item].map(v => `${item}=${v}`).join("&");
            } else {
              str += `&${item}=${params[item]}`;
            }
          });
          return str;
        }
      }).then(res => {
        const { data } = res;
        return data;
      });
    },
    // 分页大小改变
    handleSizeChange(val) {
      const query = this.$route.query;
      this.$router.push({
        path: "hotel",
        query: {
          ...query,
          _limit: val
        }
      });
    },
    // 当前页改变
    handleCurrentChange(val) {
      const query = this.$route.query;
      this.$router.push({
        path: "hotel",
        query: {
          ...query,
          _start: (val - 1) * query._limit + 1
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.isnull {
  padding: 100px 0;
  height: 100px;
  line-height: 100px;
  text-align: center;
  i {
    color: #999;
  }
}
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
