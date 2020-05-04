<template>
  <div>
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
                @mouseenter="getMapcenter(item, index)"
              >
                <span>{{ item.name }}</span>
                <span>{{ distanceList[index] }}公里</span>
              </li>
            </ol>
            <ol v-if="activeName === 'second'">
              <li
                class="poi-list-item"
                v-for="(item, index) in trafficList"
                :key="index"
                @mouseenter="getMapcenter(item, index)"
              >
                <span>{{ item.name }}</span>
                <span>{{ distanceList[index] }}公里</span>
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
      trafficList: [],
      distanceList: [],
      timeId: "",
      p2List: []
    };
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_1790148_s2ohpfp3nec.css"
      }
    ],
    script: [
      {
        type: "text/javascript",
        src:
          "https://webapi.amap.com/maps?v=1.4.15&key=622d46935167ebb769b70ee6d72adf3f&plugin=AMap.PlaceSearch"
      }
    ]
  },
  mounted() {
    clearInterval(this.timeId);
    this.timeId = setInterval(() => {
      if (!AMap || !AMap.PlaceSearch) return;
      clearInterval(this.timeId);
      var map = new AMap.Map("container", {
        center: [
          +this.$store.state.hotel.location.longitude,
          +this.$store.state.hotel.location.latitude
        ], //中心点坐标
        resizeEnable: true,
        zoom: 11 //级别
      });
      this.map = map;
      this.getSceneryList();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timeId);
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
          type: "风景名胜", // 兴趣点类别
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: this.$store.state.hotel.city.code, // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        var cpoint = [
          +this.$store.state.hotel.location.longitude,
          +this.$store.state.hotel.location.latitude
        ]; //中心点坐标
        placeSearch.searchNearBy("", cpoint, 10000, (status, result) => {
          // console.log(result);
          const { pois } = result.poiList;
          // console.log(pois);
          this.sceneryList = pois;
          // console.log(this.sceneryList);
          this.getDistance(this.sceneryList);
        });
      });
      this.getIcon();
    },
    handleClick(tab) {
      // console.log(tab);
      if (tab.name === "first") {
        // 在开始规划路线之前呢，先清除掉地图上的其他内容
        this.map = new AMap.Map("container", {
          resizeEnable: true,
          center: [
            +this.$store.state.hotel.location.longitude,
            +this.$store.state.hotel.location.latitude
          ], //中心点坐标
          zoom: 11 //级别
        });
        this.getSceneryList();
      }
      if (tab.name === "second") {
        // 在开始规划路线之前呢，先清除掉地图上的其他内容
        this.map = new AMap.Map("container", {
          resizeEnable: true,
          center: [
            +this.$store.state.hotel.location.longitude,
            +this.$store.state.hotel.location.latitude
          ], //中心点坐标
          zoom: 11 //级别
        });
        //周边查找交通
        AMap.service(["AMap.PlaceSearch"], () => {
          //构造地点查询类
          var placeSearch = new AMap.PlaceSearch({
            type: "地铁|公交", // 兴趣点类别
            pageSize: 10, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: this.$store.state.hotel.city.code, // 兴趣点城市
            citylimit: true, //是否强制限制在设置的城市内搜索
            map: this.map, // 展现结果的地图实例
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });
          var cpoint = [
            +this.$store.state.hotel.location.longitude,
            +this.$store.state.hotel.location.latitude
          ]; //中心点坐标
          placeSearch.searchNearBy("", cpoint, 10000, (status, result) => {
            // console.log(result);
            const { pois } = result.poiList;
            // console.log(pois);
            this.trafficList = pois;
            // console.log(this.trafficList);
            this.getDistance(this.trafficList);
          });
        });
        this.getIcon();
      }
    },
    getDistance(data) {
      // console.log(data);

      const p1 = [
        +this.$store.state.hotel.location.longitude,
        +this.$store.state.hotel.location.latitude
      ];
      // console.log(p1);

      this.p2List = data.map(v => {
        return { lng: v.location.lng, lat: v.location.lat };
      });
      // console.log(Object.values(this.p2List[0]));

      this.distanceList = this.p2List.map(v => {
        return Number(
          AMap.GeometryUtil.distance(p1, Object.values(v)) / 1000
        ).toFixed(2);
      });
      // console.log(this.distanceList);
    },
    getMapcenter(item, index) {
      this.map.setCenter(Object.values(this.p2List[index])); //设置地图中心点
      setTimeout(() => {
        //构建信息窗体中显示的内容
        var info = [item.name];
        var infoWindow = new AMap.InfoWindow({
          content: info.join("") //使用默认信息窗体框样式，显示信息内容
        });
        infoWindow.on("open");
        infoWindow.on("close");
        infoWindow.open(this.map, Object.values(this.p2List[index])); //指定位置
      }, 200);
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
</style>
