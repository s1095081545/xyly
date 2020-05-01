<template>
  <div class="w">
    <el-row>
      <el-col :span="19">
        <el-row>
          <el-col :span="10">
            <nuxt-link :to="`/hotel/${data.id}.html`">
              <img :src="data.photos" alt />
            </nuxt-link>
          </el-col>
          <el-col :span="14" class="center">
            <nuxt-link :to="`/hotel/${data.id}.html`">
              <h2>{{data.name}}</h2>
            </nuxt-link>
            <p>{{data.alias}}</p>
            <div class="pingfen">
              <!-- 评分 -->
              <el-rate
                disabled
                show-score
                :value="data.stars"
                text-color="#ff9900"
                score-template="{value}分"
              ></el-rate>
              <span>
                <i>{{data.all_remarks}}</i> 条评价
              </span>
              <span>
                <i>{{data.num_collected}}</i> 篇游记
              </span>
            </div>
            <div class="dingwei">
              <i class="el-icon-location"></i>
              位于: {{data.address}}
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!-- 右 -->
      <el-col :span="5" class="right">
        <div class="r_row" v-for="(item, index) in data.products" :key="index">
          <a href="https://hotels.ctrip.com/hotel/694679.html" target="_banlk">
            <span>{{item.name}}</span>
            <span>
              <span class="price">￥{{item.price}}</span>起
              <i class="el-icon-arrow-right"></i>
            </span>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style scoped lang="less">
.w {
  overflow: hidden;
  padding: 30px 0;
  border-bottom: 1px solid #eaeaea;
  height: 210px;
  font-size: 14px;
  img {
    display: block;
    width: 100%;
    height: 210px;
  }
  .center {
    padding: 0 15px;
    h2 {
      font-size: 24px;
      font-weight: 400;
    }
    p {
      color: #999;
    }
    .pingfen {
      padding: 10px 0;
      display: flex;
      i {
        color: orange;
        margin-left: 30px;
      }
    }
    .dingwei {
      color: #666;
      i {
        font-size: 16px;
      }
    }
  }
  .right {
    padding-top: 20px;
    a {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .r_row {
      padding: 0 20px 0 10px;
      color: #333;
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      border-bottom: 1px solid #eaeaea;
      cursor: pointer;
      &:hover {
        background: #eaeaea;
      }
      .price {
        color: orange;
        font-size: 18px;
      }
    }
  }
}
</style>