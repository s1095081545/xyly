<template>
  <section class="contianer">
    <!-- 导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/hotel' }">广州酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{ hotelData[0].name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 酒店名 -->
    <el-row class="name_info">
      <el-col :span="24">
        <el-row>
          <h4>
            {{ hotelData[0].name }}
            <span v-if="hotelData[0].hotellevel">
              <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
              <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
              <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
              <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
              <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
            </span>
          </h4>
        </el-row>
        <el-row>
          <span class="hotel_name">{{ hotelData[0].alias }}</span>
        </el-row>
        <el-row class="hotel_address">
          <i class="iconfont icon-yiliaohangyedeICON-"></i>
          {{ hotelData[0].address }}
        </el-row>
      </el-col>
    </el-row>
    <!-- 图片 -->
    <el-row class="pic-info">
      <el-row>
        <!-- 大图 -->
        <el-col :span="16" class="main-pic">
          <img :src="bigImg" alt="" />
        </el-col>
        <!-- 小图 -->
        <el-col :span="8" class="list-pics">
          <el-row>
            <el-col :span="12" v-for="(item, index) in imageData" :key="index"
              ><a href="#"
                ><img :src="item" alt="" @click="handleswitch(index)"/></a
            ></el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
    <!-- 价格 -->
    <a target="_blank" href="https://hotels.ctrip.com/hotel/694679.html">
      <el-table :data="hotelData[0].products" style="width: 100%">
        <el-table-column label="价格来源" width="420">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="低价房型" width="420">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.bestType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最低价格/每晚">
          <template slot-scope="scope">
            <span
              style=" color: #ff9900;
                      font-size: 18px;
                      line-height: 26px;"
              >{{ scope.row.price }}</span
            >
            <i>起</i>
            <span
              class="iconfont icon-youjiantou"
              style=" color: #ff9900;
                      font-size: 18px;
                      line-height: 26px;"
            ></span>
          </template>
        </el-table-column>
      </el-table>
    </a>
    <!-- 地图 -->
    <el-row class="detailsMap"><DetailsMap /> </el-row>
    <!-- 酒店基本设施 -->
    <el-row>
      <el-row class="assets-info">
        <el-col :span="4">基本信息</el-col>
        <el-col :span="20">
          <el-row>
            <el-col :span="6">入住时间: 14:00之后</el-col>
            <el-col :span="6">离店时间: 12:00之前</el-col>
            <el-col :span="6"
              >{{ hotelData[0].creation_time }} /
              {{ hotelData[0].renovat_time }}</el-col
            >
            <el-col :span="6"
              >酒店规模: {{ hotelData[0].roomCount }}间客房</el-col
            >
          </el-row>
        </el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col :span="4">主要设施</el-col>
        <el-col :span="20">
          <span
            v-for="(item, index) in hotelData[0].hotelassets"
            :key="index"
            class=" assets-info-item"
          >
            {{ item.name }}
          </span>
        </el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col :span="4">停车服务</el-col>
        <el-col :span="20">{{ hotelData[0].parking }}</el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col :span="4">品牌信息</el-col>
        <el-col :span="20">{{ hotelData[0].hotelbrand }}</el-col>
      </el-row>
    </el-row>
    <!-- 评论 -->
    <el-row class="comment-list">
      <h4>0条真实用户评论</h4>
      <el-row type="flex" justify="space-between">
        <el-col :span="4">
          <p>总评数：{{ hotelData[0].all_remarks }}</p>
          <p>好评数：{{ hotelData[0].good_remarks }}</p>
          <p>差评数：{{ hotelData[0].bad_remarks }}</p>
        </el-col>
        <el-col :span="5" class="recomment-score">
          <el-rate
            v-model="hotelData[0].stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
            class="satrt"
          >
          </el-rate>
          <div class="stamp" v-if="hotelData[0].stars > 2">
            推荐
          </div>
          <div class="stamp" v-else>
            一般
          </div>
        </el-col>
        <el-col :span="3">
          <div class="rate-box">
            <el-progress
              type="circle"
              :percentage="percentage"
              :color="customColor"
            >
            </el-progress>
            <span class="text">
              <span>环境</span>
              <span>{{ hotelData[0].scores.environment }}</span>
            </span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="rate-box">
            <el-progress
              type="circle"
              :percentage="percentage"
              :color="customColor"
            ></el-progress>
            <span class="text">
              <span>产品</span>
              <span>{{ hotelData[0].scores.product }}</span>
            </span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="rate-box">
            <el-progress
              type="circle"
              :percentage="percentage"
              :color="customColor"
            ></el-progress>
            <span class="text">
              <span>服务</span>
              <span>{{ hotelData[0].scores.service }}</span>
            </span>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </section>
</template>

<script>
import DetailsMap from "@/components/hotel/details_map";
export default {
  data() {
    return {
      hotelData: [{ scores: {} }],
      percentage: 74,
      customColor: "#ff9900",
      bigImg: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg",
      imageData: [
        "http://157.122.54.189:9093/images/hotel-pics/1.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/3.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/5.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/2.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/4.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/6.jpeg"
      ]
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
  components: {
    DetailsMap
  },
  mounted() {
    const { id } = this.$route.query;
    // console.log(this.$route);
    this.$axios({
      url: "/hotels",
      params: {
        id: id
      }
    }).then(res => {
      console.log(res);
      this.hotelData = res.data.data;
      this.percentage = this.hotelData[0].scores.service * 10;
      const { location } = this.hotelData[0];
      const { name } = this.hotelData[0];
      this.$store.commit("hotel/setLocation", location);
      this.$store.commit("hotel/setName", name);
    });
  },
  methods: {
    handleswitch(index) {
      // console.log(index);
      this.bigImg = this.imageData[index];
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 0 auto;
  .el-breadcrumb {
    padding: 20px 0;
  }
  .name_info {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
    h4 {
      display: flex;
      font-size: 25px;
      font-weight: normal;
      color: #444;
      span {
        width: 100px;
        height: 32px;
        font-size: 0;
        text-align: center;
        line-height: 39px;
        i {
          font-size: 16px;
        }
      }
    }
  }
  .icon-huiyuanhuangguanguanjun {
    color: #ff9900;
  }
  .icon-yiliaohangyedeICON- {
    color: #555;
    font-size: 18px;
  }
  .pic-info {
    .main-pic {
      img {
        height: 360px;
        width: 640px;
      }
    }
    .list-pics {
      img {
        width: 160px;
        margin-bottom: 10px;
      }
    }
  }
  /deep/ .el-table__row {
    cursor: pointer;
    .el-table_1_column_3 {
      text-align: center;
      line-height: 24px;
      // span {
      //   color: #ff9900;
      //   font-size: 18px;
      //   line-height: 26px;
      // }
    }
  }
  .detailsMap {
    margin: 40px 0;
  }
  .assets-info {
    border-bottom: 1px solid #eee;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #666;
    .assets-info-item {
      border: 1px solid #eee;
      padding: 4px 10px;
      margin-right: 10px;
      border-radius: 4px;
      background-color: #eee;
      color: #666;
    }
  }
  //评论
  .comment-list {
    padding: 20px 0;
    h4 {
      font-size: 16px;
      padding-bottom: 20px;
    }
    .recomment-score {
      position: relative;
      .stamp {
        border: 2px solid #ff9900;
        text-align: center;
        line-height: 70px;
        font-size: 25px;
        color: #ff9900;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        opacity: 0.25;
        transform: rotate(-30deg);
      }
      .satrt {
        position: absolute;
        left: -15px;
        top: 20px;
      }
    }

    /deep/ .el-progress-circle {
      width: 70px !important;
      height: 70px !important;
    }
    .rate-box {
      position: relative;
    }
    //进度条内部样式
    .text {
      position: absolute;
      top: 15px;
      left: 16px;
      width: 36px;
      height: 36px;
      color: #ff9900;
      background-color: #fff;
      text-align: center;
    }
  }
}
</style>
