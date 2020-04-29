<template>
  <div class="w">
    <el-row>
      <el-col :span="19">
        <el-row>
          <el-col :span="10">
            <img src="https://img1.dowebok.com/5119.png" alt />
          </el-col>
          <el-col :span="14" class="center">
            <h2>锦江之星(吴泾店)</h2>
            <p>jin jiang zhi xing (shang hai min hang wu jing dian)</p>
            <div class="pingfen">
              <!-- 评分 -->
              <el-rate disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
              <span>
                <i>56</i> 条评价
              </span>
              <span>
                <i>7</i> 篇游记
              </span>
            </div>
            <div class="dingwei">
              <i class="el-icon-location"></i> 位于: 剑川路165号(近龙吴路)
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!-- 右 -->
      <el-col :span="5" class="right">
        <div class="r_row">
          <span>携程</span>
          <span>
            <span class="price">￥289</span>起
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
        <div class="r_row">
          <span>艺龙</span>
          <span>
            <span class="price">￥289</span>起
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
        <div class="r_row">
          <span>Hotels.com</span>
          <span>
            <span class="price">￥289</span>起
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
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