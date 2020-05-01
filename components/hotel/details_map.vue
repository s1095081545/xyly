<template>
  <div>
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=622d46935167ebb769b70ee6d72adf3f&plugin=AMap.PlaceSearch"
    ></script>
    <el-row type="flex" align="center" :gutter="20">
      <!-- container 中不能添加内容 -->
      <el-col :span="16" class="map-view">
        <!-- container 中不能添加内容 -->
        <div id="container"></div>
      </el-col>
      <el-col :span="8" class="poi-list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first"></el-tab-pane>
          <el-tab-pane label="交通" name="second"></el-tab-pane>
          <!-- <div id="panel"></div> -->
          <div class="poi-list-ov">
            <ol v-if="activeName === 'first'">
              <li
                class="poi-list-item"
                v-for="(item, index) in sceneryList"
                :key="index"
              >
                <span>{{ item.name }}</span>
                <span>0.14公里</span>
              </li>
            </ol>
            <ol v-if="activeName === 'second'">
              <li
                class="poi-list-item"
                v-for="(item, index) in trafficList"
                :key="index"
              >
                <span>{{ item.name }}</span>
                <span>0.18公里</span>
              </li>
            </ol>
          </div>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: "",
      activeName: "first",
      sceneryList: [],
      trafficList: []
    };
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_1790148_s2ohpfp3nec.css"
      }
    ]
  },
  mounted() {
    setTimeout(() => {
      var map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 11 //级别
      });
      this.map = map;
      this.getSceneryList();
    }, 100);
  },
  methods: {
    getIcon() {
      //自定义内容
      var content = `<i class="iconfont icon-jiudian" style="color:#3c94f9 ;font-size:25px "></i>`;
      var marker = new AMap.Marker({
        content: content, // 自定义点标记覆盖物内容
        position: [
          +this.$store.state.hotel.location.longitude,
          +this.$store.state.hotel.location.latitude
        ], // 基点位置
        offset: new AMap.Pixel(-17, -42), // 相对于基点的偏移位置
        title: this.$store.state.hotel.name
      });
      // 将创建的点标记添加到已有的地图实例：
      this.map.add(marker);
    },
    //周边查找风景
    getSceneryList() {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type: "风景", // 兴趣点类别
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "020", // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          // panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        var cpoint = [
          +this.$store.state.hotel.location.longitude,
          +this.$store.state.hotel.location.latitude
        ]; //中心点坐标
        placeSearch.searchNearBy("", cpoint, 1500, (status, result) => {
          // console.log(result);
          const { pois } = result.poiList;
          // console.log(pois);
          this.sceneryList = pois;
          // console.log(this.sceneryList);
        });
      });
      this.getIcon();
    },
    handleClick(tab) {
      // console.log(tab);
      if (tab.name === "first") {
        // 在开始规划路线之前呢，先清除掉地图上的其他内容
        this.map = new AMap.Map("container", {
          zoom: 11 //级别
        });
        this.getSceneryList();
      }
      if (tab.name === "second") {
        // 在开始规划路线之前呢，先清除掉地图上的其他内容
        this.map = new AMap.Map("container", {
          zoom: 11 //级别
        });
        //周边查找交通
        AMap.service(["AMap.PlaceSearch"], () => {
          //构造地点查询类
          var placeSearch = new AMap.PlaceSearch({
            type: "地铁|公交", // 兴趣点类别
            pageSize: 10, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: "020", // 兴趣点城市
            citylimit: true, //是否强制限制在设置的城市内搜索
            map: this.map, // 展现结果的地图实例
            // panel: "panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });
          var cpoint = [
            +this.$store.state.hotel.location.longitude,
            +this.$store.state.hotel.location.latitude
          ]; //中心点坐标
          placeSearch.searchNearBy("", cpoint, 1500, (status, result) => {
            // console.log(result);
            const { pois } = result.poiList;
            // console.log(pois);
            this.trafficList = pois;
            // console.log(this.trafficList);
          });
        });
        this.getIcon();
      }
    }
  }
};
</script>

<style scoped lang="less">
#container {
  width: 650px;
  height: 360px;
}
.poi-list-ov {
  height: 300px;
  overflow: auto; //	如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
  font-size: 14px;
  color: #666;
  .poi-list-item {
    display: flex;
    justify-content: space-between;
    margin: 0 20px 20px 10px;
    cursor: pointer;
  }
}
// #panel {
//   position: absolute;
//   background-color: white;
//   max-height: 90%;
//   overflow-y: auto;
//   top: 10px;
//   right: 10px;
//   width: 280px;
// }
</style>
