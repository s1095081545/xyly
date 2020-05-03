<template>
  <div>
    <el-row class="layout">
      <el-col :span="14">
        <!-- 区域 -->
        <el-row class="quyu">
          <el-col :span="3">区域 :</el-col>
          <el-col :span="21">
            <div v-if="cities.scenics">
              <span
                v-for="(item, index) in cities.scenics"
                :key="index"
                v-if="index<count"
              >{{item.name}}</span>
              <div class="more" v-if="cities.scenics.length>=count" @click="handleClick">
                <i class="el-icon-d-arrow-right" :class="count>16?'active':''"></i>
                等{{cities.scenics.length}}个区域
              </div>
            </div>
            <div v-if="!cities.scenics ||cities.scenics.length===0">0个区域</div>
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
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                <i>¥734</i>
              </span>
            </el-tooltip>
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
                <i>¥537</i>
              </span>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-col>
      <!-- 右边地图 -->
      <el-col :span="10" class="right">
        <!-- 地图占位 -->
        <div id="container" v-loading="loading"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_1790048_0ezymh84xpag.css"
      },
      {
        rel: "stylesheet",
        href: "/marker.css"
      }
    ],
    script: [
      {
        type: "text/javascript",
        src:
          "https://webapi.amap.com/maps?v=1.4.15&key=fa7b62b9be8af90396854c55cc8402e0&plugin=AMap.Geocoder"
      }
    ]
  },
  props: ["data", "cities"],
  data() {
    return {
      count: 16,
      loading: true,
      loaded: false,
      timeId: "" //定时器
    };
  },
  watch: {
    data() {
      this.reset();
    }
  },
  mounted() {
    this.reset();
  },
  methods: {
    reset() {
      if (!this.data.data) return; //防止data没数据时执行
      clearInterval(this.timeId);
      this.timeId = setInterval(() => {
        if (AMap && AMap.Geocoder) {
          clearInterval(this.timeId);
          this.setMap();
        }
      }, 100);
    },
    setMap() {
      // 定义标记
      const div = document.createElement("div");
      const pin = document.createElement("div");
      const pulse = document.createElement("div");
      pin.classList.add("pin");
      pulse.classList.add("pulse");
      div.appendChild(pin);
      div.appendChild(pulse);

      if (this.data.total < 1 || !this.data.data || !this.data.data[0]) {
        // 如果没有数据
        const { cityName } = this.$route.query;
        if (!cityName) return;
        var map = new AMap.Map("container", {
          zoom: 11, //级别
          autoFitView: true
        });
        var geocoder = new AMap.Geocoder({
          city: cityName
        });

        var marker = new AMap.Marker({
          title: cityName,
          content: div.innerHTML
        });

        function geoCode() {
          geocoder.getLocation(cityName, function(status, result) {
            if (status === "complete" && result.geocodes.length) {
              var lnglat = result.geocodes[0].location;
              marker.setPosition(lnglat);
              map.add(marker);
              map.setFitView(marker);
            }
          });
        }
        geoCode();
        this.loading = false;

        return;
      }
      if (this.data.data && this.data.data[0]) {
        var { longitude, latitude } = this.data.data[0].location;
      } else {
        return;
      }
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [longitude, latitude], //中心点坐标
        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      });

      for (var i = 0; i < this.data.data.length; i++) {
        const { longitude, latitude } = this.data.data[i].location;
        var content = `1`;
        const r = +`0.0${Math.floor(Math.random() * 20)}`;
        var marker = new AMap.Marker({
          position: [longitude + r, latitude + r], //位置
          offset: new AMap.Pixel(r, r),
          title: this.data.data[i].name,
          content: div.innerHTML
        });

        map.add(marker); //添加到地图
        this.loading = false;
      }
    },
    // 点击更多
    handleClick() {
      this.count = this.count === 16 ? this.cities.scenics.length : 16;
    }
  },
  destroyed() {
    clearInterval(this.timeId);
  }
};
</script>
<style scoped lang="less">
/deep/.pin {
  background: #ff7300;
  &:after {
    background: #ff0000;
  }
}
/deep/.pulse:after {
  box-shadow: 0 0 1px 2px #f9849b;
}
.layout {
  min-height: 260px;
  font-size: 14px;
  .right {
    background: #fff;
    height: 100%;
    #container {
      height: 260px;
      width: 100%;
      background: #fff;
    }
  }
  .more {
    cursor: pointer;
    user-select: none;
    line-height: 30px;
    i {
      color: orange;
      transform: rotate(90deg);
    }
    .active {
      transform: rotate(-90deg);
    }
  }
  .quyu {
    padding-right: 20px;
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