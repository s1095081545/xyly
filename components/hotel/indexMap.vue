<template>
  <div>
    <el-row class="layout">
      <el-col :span="14">
        <!-- 区域 -->
        <el-row class="quyu">
          <el-col :span="3">区域 :</el-col>
          <el-col :span="21">
            <span>人民广场</span>
            <span>称啊</span>
            <span>称啊</span>
            <span>称啊</span>
            <span>称啊</span>
            <span>称啊</span>
            <span>称啊</span>
            <span>称啊</span>
            <span>称啊</span>
            <span>称啊</span>
            <span>称啊</span>
            <span>称啊</span>
            <span>称啊</span>
            <span>称啊</span>
            <span>称其哦</span>
          </el-col>
        </el-row>
        <!-- 均价 -->
        <el-row class="junjia">
          <el-col :span="3">
            <div class="j_left">
              均价
              <el-tooltip
                class="item"
                effect="dark"
                content="等级均价由平日价格计算得出,节假日价格会有上浮"
                placement="top-start"
              >
                <sup>?</sup>
              </el-tooltip>:
            </div>
          </el-col>
          <el-col :span="21" class="j_right">
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价,设施和服务等各方面水平的综合评估"
              placement="bottom"
            >
              <span>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i>¥330</i>
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
              <span>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i>¥330</i>
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
              <span>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i>¥330</i>
              </span>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-col>
      <!-- 右边地图 -->
      <el-col :span="10" class="right">
        <!-- 地图占位 -->
        <div id="container"></div>
      </el-col>
    </el-row>
    <!-- 加载js -->
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=3d2be9a4ac558e1562c47247fbee8288"
    ></script>
  </div>
</template>

<script>
export default {
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_1790048_0ezymh84xpag.css"
      }
    ]
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  watch: {
    data() {
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: this.data.coords, //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      var infoWindow = new AMap.InfoWindow({
        //创建信息窗体
        isCustom: false, //使用自定义窗体
        // content: "<div>信息窗体</div>", //信息窗体的内容可以是任意html片段
        offset: new AMap.Pixel(16, -45)
      });
      var onMarkerClick = function(e) {
        infoWindow.open(map, e.target.getPosition()); //打开信息窗体
        //e.target就是被点击的Marker
      };

      var marker = new AMap.Marker({
        position: this.data.coords //位置
      });
      map.add(marker); //添加到地图
      marker.on("click", onMarkerClick); //绑定click事件
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.layout {
  height: 260px;
  font-size: 14px;
  .right {
    background: #ccc;
    height: 100%;
    #container {
      width: 100%;
      height: 100%;
    }
  }

  .quyu {
    span {
      margin-right: 20px;
    }
  }
  .junjia {
    margin-top: 20px;
    .iconfont {
      color: orange;
    }
    .j_left {
      display: flex;
      sup {
        text-align: center;
        border-radius: 50%;
        width: 14px;
        height: 14px;
        background: #ccc;
        color: #fff;
        margin-right: 3px;
      }
    }
    .j_right {
      display: flex;
      flex-wrap: wrap;
      span {
        margin-right: 30px;
        display: flex;
        align-items: center;
      }
      i {
        font-size: 16px;
        &:last-child {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>