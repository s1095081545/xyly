<template>
  <!-- 高德地图api:fa7b62b9be8af90396854c55cc8402e0 -->
  <!-- 百度地图api:fb6FEkhIPYHYtO8mRqqczmosHNkhmwuY -->

  <!-- ip定位:http://api.map.baidu.com/location/ip?ak=您的AK -->
  <div>
    <!-- 加载当前城市 -->
    <script src="http://ip.ws.126.net/ipquery"></script>
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=3d2be9a4ac558e1562c47247fbee8288&plugin=AMap.CitySearch"
    ></script>
    <div id="container"></div>
    <div id="panel"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const { city } = localAddress;
    var map = new AMap.Map("container", {
      zoom: 11, //级别
      center: [2619393.22, 12594159.16], //中心点坐标
      viewMode: "3D" //使用3D视图
    });
  }
};
</script>

<style scoped lang="less">
#container {
  width: 600px;
  height: 480px;
}
</style>
