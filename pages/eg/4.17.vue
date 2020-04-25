<template>
  <div>
    <div class="w">
      <el-row type="flex">
        <div class="logo">logo</div>
        <el-row class="center">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
          <nuxt-link to="/air">国内机票</nuxt-link>
        </el-row>
        <el-row justify="end">
          <el-col :span="12">登录</el-col>
          <el-col :span="12">注册</el-col>
        </el-row>
      </el-row>
    </div>
    <!-- 轮播图 -->
    <el-carousel height="650px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3
          class="small"
          :style="{'background':`url('https://tva1.sinaimg.cn/large/466f79e8ly1fw5oh6rg63j21hc10ktgi.jpg')`}"
        >{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

  
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.w {
  width: 1000px;
  margin: 0 auto;
}
.center {
  flex: 1;
}
.logo {
  width: 200px;
}
.center a {
  width: 80px;
  padding: 20px;
}

// 幻灯片
.el-carousel {
  min-width: 1000px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  min-width: 1000px;
  height: 650px;
  background-position: center center;
  background-repeat: no-repeat;
}

// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }
</style>