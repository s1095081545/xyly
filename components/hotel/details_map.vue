<template>
  <div>
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=622d46935167ebb769b70ee6d72adf3f&plugin=AMap.Driving,AMap.CitySearch,AMap.Autocomplete"
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
  mounted() {
    var map = new AMap.Map("container", {
      zoom: 11, //级别
      center: [113.3245904, 23.1066805] //中心点坐标
    });
    this.map = map;
    // 创建一个 Marker 实例：
    var marker1 = new AMap.Marker({
      position: new AMap.LngLat(113.3245904, 23.1066805),
      title: "广州塔"
    });
    var marker2 = new AMap.Marker({
      position: new AMap.LngLat(116.413384, 39.910914),
      title: "海心沙亚运公园"
    });
    var marker3 = new AMap.Marker({
      position: new AMap.LngLat(116.413384, 39.910923),
      title: "赤岗塔"
    });
    var marker4 = new AMap.Marker({
      position: new AMap.LngLat(116.413384, 39.910822),
      title: "花城广场"
    });
    var marker5 = new AMap.Marker({
      position: new AMap.LngLat(116.413384, 39.910925),
      title: "宏城公园"
    });
    var marker6 = new AMap.Marker({
      position: new AMap.LngLat(116.021333, 40.53666),
      title: "龙母庙"
    });
    var marker7 = new AMap.Marker({
      position: new AMap.LngLat(113.331077, 23.109836),
      title: "广州塔南广场"
    });
    var marker8 = new AMap.Marker({
      position: new AMap.LngLat(116.413383, 39.910928),
      title: "磨碟沙公园(悦涛轩东北)"
    });
    var marker9 = new AMap.Marker({
      position: new AMap.LngLat(116.294456, 39.965253),
      title: "二沙岛艺术公园"
    });
    var marker = new AMap.Marker({
      position: new AMap.LngLat(113.312673, 23.11574),
      title: "广州发展公园"
    });

    // 将创建的点标记添加到已有的地图实例：
    map.add([
      marker1,
      marker2,
      marker3,
      marker4,
      marker5,
      marker6,
      marker7,
      marker8,
      marker9,
      marker
    ]);
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
</style>
