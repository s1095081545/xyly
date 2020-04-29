<template>
  <section class="contianer">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/hotel' }">广州酒店</el-breadcrumb-item>
      <el-breadcrumb-item>0578时尚主题酒店(曹杨店)</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 酒店名 -->
    <el-row class="name_info">
      <el-col :span="24">
        <el-row>
          <h4>
            0578时尚主题酒店(曹杨店)
            <span>
              <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
              <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
              <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
              <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
              <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
            </span>
          </h4>
        </el-row>
        <el-row>
          <span class="hotel_name"
            >0578 shi shang zhu ti hotel (cao yang dian)</span
          >
        </el-row>
        <el-row class="hotel_address">
          <i class="iconfont icon-yiliaohangyedeICON-"></i>
          兰溪路143号(曹杨商场隔壁)
        </el-row>
      </el-col>
    </el-row>
    <!-- 图片 -->
    <el-row class="pic-info">
      <el-row>
        <el-col :span="16" class="main-pic">
          <img
            src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
            alt=""
          />
        </el-col>
        <el-col :span="8" class="list-pics">
          <el-row>
            <el-col :span="12"
              ><a href="#"
                ><img
                  src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
                  alt=""/></a
            ></el-col>
            <el-col :span="12"
              ><a href="#"
                ><img
                  src="http://157.122.54.189:9093/images/hotel-pics/3.jpeg"
                  alt=""/></a
            ></el-col>
            <el-col :span="12"
              ><a href="#"
                ><img
                  src="http://157.122.54.189:9093/images/hotel-pics/5.jpeg"
                  alt=""/></a
            ></el-col>
            <el-col :span="12"
              ><a href="#"
                ><img
                  src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg"
                  alt=""/></a
            ></el-col>
            <el-col :span="12"
              ><a href="#"
                ><img
                  src="http://157.122.54.189:9093/images/hotel-pics/4.jpeg"
                  alt=""/></a
            ></el-col>
            <el-col :span="12"
              ><a href="#"
                ><img
                  src="http://157.122.54.189:9093/images/hotel-pics/6.jpeg"
                  alt=""/></a
            ></el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
    <!-- 价格 -->
    <el-table :data="priceData" style="width: 100%">
      <el-table-column prop="source" label="价格来源" width="420">
      </el-table-column>
      <el-table-column prop="layout" label="低价房型" width="420">
      </el-table-column>
      <el-table-column prop="price" label="最低价格/每晚"> </el-table-column>
    </el-table>
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
            <el-col :span="6">2004年开业 / 2007年装修</el-col>
            <el-col :span="6">酒店规模: 216间客房</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col :span="4">主要设施</el-col>
        <el-col :span="20"></el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col :span="4">停车服务</el-col>
        <el-col :span="20">门口免费停车;免费停车;有免费停车</el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col :span="4">品牌信息</el-col>
        <el-col :span="20">如家</el-col>
      </el-row>
    </el-row>
    <!-- 评论 -->
    <el-row class="comment-list">
      <h4>0条真实用户评论</h4>
      <el-row type="flex" justify="space-between">
        <el-col :span="4">
          <p>总评数：118</p>
          <p>好评数：54</p>
          <p>差评数：5</p>
        </el-col>
        <el-col :span="5" class="recomment-score">
          <div class="satrt">
            <i class="iconfont icon-start"></i>
            <i class="iconfont icon-start"></i>
            <i class="iconfont icon-start"></i>
            <i class="iconfont icon-start"></i>
            <i class="iconfont icon-start"></i>
            <span>4分</span>
          </div>
          <div class="stamp">
            推荐
          </div>
        </el-col>
        <el-col :span="3">
          <div class="rate-box">
            <el-progress type="circle" :percentage="70" status="warning">
            </el-progress>
            <span class="text">
              <span>环境</span>
              <span>7.5</span>
            </span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="rate-box">
            <el-progress
              type="circle"
              :percentage="70"
              status="warning"
            ></el-progress>
            <span class="text">
              <span>产品</span>
              <span>7.6</span>
            </span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="rate-box">
            <el-progress
              type="circle"
              :percentage="70"
              status="warning"
            ></el-progress>
            <span class="text">
              <span>服务</span>
              <span>7.7</span>
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
      priceData: [
        { source: "携程", layout: "高级大床房A", price: "¥141起" },
        { source: "艺龙", layout: "高级大床房A", price: "¥141起" },
        { source: "Hotels.com", layout: "高级大床房A", price: "¥141起" }
      ]
    };
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_1790148_7n0vjxq25yq.css"
      }
    ]
  },
  components: {
    DetailsMap
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
      font-size: 25px;
      font-weight: normal;
      color: #444;
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
  .detailsMap {
    margin: 40px 0;
  }
  .assets-info {
    border-bottom: 1px solid #eee;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #666;
  }
  .comment-list {
    padding: 20px 0;
    h4 {
      font-size: 16px;
      padding-bottom: 20px;
    }
    .recomment-score {
      position: relative;
      .stamp {
        border: 2px solid #e6a23c;
        text-align: center;
        line-height: 70px;
        font-size: 25px;
        color: #e6a23c;
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
        color: #e6a23c;
        :nth-child(5) {
          color: #eee;
        }
      }
    }

    /deep/ .el-progress-circle {
      width: 70px !important;
      height: 70px !important;
    }
    .rate-box {
      position: relative;
    }
    .text {
      position: absolute;
      top: 15px;
      left: 16px;
      width: 36px;
      height: 36px;
      color: #e6a23c;
      background-color: #fff;
      text-align: center;
    }
  }
}
</style>
