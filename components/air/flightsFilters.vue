<template>
  <div class="filters">
    <el-row
      type="flex"
      class="filters-top"
      justify="space-between"
      align="middle"
    >
      <el-col :span="6">
        单程：
        {{ data.info.departCity }} - {{ data.info.destCity }}
        <!-- / -->
        <!-- {{data.info.departDate}} -->
      </el-col>
      <el-col :span="5">
        <!-- 日期 -->
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          size="mini"
          value-format="yyyy-MM-dd"
          style="width:100%"
          :picker-options="pickerOptions"
          clear-icon=" "
          @change="handleChange"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场">
          <el-option
            v-for="(item, index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间">
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司">
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select size="mini" v-model="airSize" placeholder="机型">
          <el-option
            v-for="(item, index) in airSizeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 触发filter函数 -->
    <div class="filter-cancel" :class="filter">
      筛选：
      <el-button
        type="primary"
        round
        plain
        size="mini"
        @click="handleFiltersCancel"
        >撤销</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // 飞机大小
      airSizeList: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ],
      airport: "", // 机场
      flightTimes: "", // 出发时间,存储样式:x,y
      company: "", // 航空公司
      airSize: "", // 机型大小
      date: "", //查询时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 24 * 1000;
        }
      }
    };
  },
  computed: {
    // 监听选择改变-机场/出发时间/航空公司/机型大小
    filter() {
      // 方法1:
      //   const arr = this.data.flights.filter(item => {
      //     let flag = true;
      //     // 机场过滤
      //     if (this.airport && this.airport != item.org_airport_name) {
      //       flag = false;
      //     }
      //     // 航空公司过滤
      //     if (this.company && this.company != item.airline_name) {
      //       flag = false;
      //     }
      //     // 机型大小过滤
      //     if (this.airSize && this.airSize != item.plane_size) {
      //       flag = false;
      //     }
      //     // 出发时间过滤
      //     const time = this.flightTimes.split(","); //将字符串分割成数组
      //     const current = item.dep_time.split(":")[0]; //分割获取值的数组中的出发时间
      //     if (
      //       (this.flightTimes && +time[0] > +current) ||
      //       (this.flightTimes && +time[1] < +current)
      //     ) {
      //       flag = false;
      //     }

      //     return flag;
      //   });

      //   方法2:
      const obj = {
        org_airport_name: this.airport,
        airline_name: this.company,
        plane_size: this.airSize,
        dep_time: this.flightTimes
      };

      const time = this.flightTimes.split(","); //将字符串分割成数组

      const hasData = Object.keys(obj).filter(item => obj[item]);
      const arr = this.data.flights.filter(item => {
        const flag = hasData.every(v => {
          if (v === "dep_time") {
            const current = item.dep_time.split(":")[0]; //分割获取值的数组中的出发时间
            return +time[0] <= +current && +current < +time[1];
          } else {
            return obj[v] == item[v];
          }
        });
        return flag;
      });

      // 调用父组件方法并返回值
      this.$emit("filterData", arr);

      return "";
    }
  },
  watch: {
    // 监听路由变化
    $route() {
      this.getDate();
    }
  },
  mounted() {
    this.getDate();
  },
  methods: {
    // 获取日期
    getDate() {
      const { departDate } = this.$route.query;
      this.date = departDate;
    },
    // 时间改变事件
    handleChange() {
      const departDate = this.date;
      this.$router.push({
        query: {
          ...this.$route.query,
          departDate
        }
      });
    },
    // 撤销
    handleFiltersCancel() {
      this.airport = ""; // 机场
      this.flightTimes = ""; // 出发时间;存储样式:x;y
      this.company = ""; // 航空公司
      this.airSize = ""; // 机型大小
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
