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
              <li class="poi-list-item">
                <span>广州塔</span>
                <span>0.14公里</span>
              </li>
              <li class="poi-list-item">
                <span>海心沙亚运公园</span>
                <span>0.55公里</span>
              </li>
              <li class="poi-list-item">
                <span>赤岗塔</span>
                <span>0.65公里</span>
              </li>
              <li class="poi-list-item">
                <span>花城广场</span>
                <span>1.53公里</span>
              </li>
              <li class="poi-list-item">
                <span>宏城公园</span>
                <span>0.99公里</span>
              </li>
              <li class="poi-list-item">
                <span>龙母庙</span>
                <span>1.19公里</span>
              </li>
              <li class="poi-list-item">
                <span>广州塔南广场</span>
                <span>0.34公里</span>
              </li>
              <li class="poi-list-item">
                <span>磨碟沙公园(悦涛轩东北)</span>
                <span>0.79公里</span>
              </li>
              <li class="poi-list-item">
                <span>二沙岛艺术公园</span>
                <span>0.77公里</span>
              </li>
              <li class="poi-list-item">
                <span>广州发展公园</span>
                <span>2.03公里</span>
              </li>
            </ol>
            <ol v-if="activeName === 'second'">
              <li class="poi-list-item">
                <span>岭南广场(地铁站)</span>
                <span>0.18公里</span>
              </li>
              <li class="poi-list-item">
                <span>广州塔(地铁站)</span>
                <span>0.24公里</span>
              </li>
              <li class="poi-list-item">
                <span>海心沙(地铁站)</span>
                <span>0.55公里</span>
              </li>
              <li class="poi-list-item">
                <span>广州塔-停车场</span>
                <span>0.22公里</span>
              </li>
              <li class="poi-list-item">
                <span>广州塔停车场</span>
                <span>0.24公里</span>
              </li>
              <li class="poi-list-item">
                <span>大剧院(地铁站)</span>
                <span>1.05公里</span>
              </li>
              <li class="poi-list-item">
                <span>广州塔东站(公交站)</span>
                <span>0.14公里</span>
              </li>
              <li class="poi-list-item">
                <span>客村(地铁站)</span>
                <span>1.31公里</span>
              </li>
              <li class="poi-list-item">
                <span>帝景苑停车场</span>
                <span>0.12公里</span>
              </li>
              <li class="poi-list-item">
                <span>花城大道(地铁站)</span>
                <span>1.39公里</span>
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
      activeName: "first"
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
        zoom: 11, //级别
        center: [113.3245904, 23.1066805] //中心点坐标
      });
      this.map = map;
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          // type: "风景", // 兴趣点类别
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "020", // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: map, // 展现结果的地图实例
          // panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        // var cpoint = [
        //   this.$store.state.hotel.location.longitude,
        //   this.$store.state.hotel.location.latitude
        // ];
        placeSearch.search("广州塔");
      });
      // //自定义内容
      // var content = `<i class="iconfont icon-jiudian" title=${this.$store.state.hotel.name} style="color:#3c94f9 ;font-size:25px "></i>`;
      // var marker = new AMap.Marker({
      //   content: content, // 自定义点标记覆盖物内容
      //   position: [
      //     this.$store.state.hotel.location.longitude,
      //     this.$store.state.hotel.location.latitude
      //   ], // 基点位置
      //   offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
      // });
      // // 将创建的点标记添加到已有的地图实例：
      // map.add(marker);
    }, 100);
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
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
