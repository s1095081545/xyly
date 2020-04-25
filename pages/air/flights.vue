<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <flightsFilters :data="listsCache" @filterData="filterData" />
        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item, index) in list" :data="item" :key="`${pageIndex}-${index}`" />
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="lists.total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <flightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import flightsFilters from "@/components/air/flightsFilters";
import FlightsItem from "@/components/air/flightsItem";
import flightsAside from "@/components/air/flightsAside";
export default {
  components: {
    FlightsListHead,
    FlightsItem,
    flightsFilters,
    flightsAside
  },
  data() {
    return {
      //总航班信息
      lists: {
        info: {},
        flights: [],
        options: {}
      },
      //总航班信息,不允许改变的
      listsCache: {
        info: {},
        flights: [],
        options: {}
      },
      pageIndex: 1,
      pageSize: 5
    };
  },
  computed: {
    //要显示在页面的航班信息
    list() {
      let list = [];
      if (this.lists.flights.length) {
        list = this.lists.flights.slice(
          (this.pageIndex - 1) * this.pageSize,
          this.pageIndex * this.pageSize
        );
      }

      return list;
    }
  },
  watch:{
    $route(){
      this.getLists();
    }
  },
  mounted() {
    this.getLists();
  },
  methods: {
    // 获取总列表
    async getLists() {
      await this.$axios({ url: `/airs`, params: this.$route.query }).then(
        res => {
          this.lists = res.data;
          this.listsCache = { ...res.data };
        }
      );
    },
    // 过滤数据
    filterData(arr) {
      this.lists.flights = arr;
      this.lists.total = arr.length;
      this.pageIndex = 1;
    },
    // 设置显示页面的列表
    setList() {},
    // 每页显示条数变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
    },
    // 当前页改变事件
    handleCurrentChange(val) {
      this.pageIndex = val;
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
