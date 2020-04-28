
<template>
  <div>
    <div class="w" v-if="error">
      <h2 v-if="error.statusCode===404">404</h2>
      <div class="txt">页面走丢啦......</div>
      <div>
        您可以尝试返回
        <nuxt-link to="/">首页</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["error"]
};
</script>
<style lang="less" scoped>
.w {
  text-align: center;
  padding-bottom: 100px;
  h2 {
    font-size: 270px;
    color: greenyellow;
  }
  .txt {
    font-size: 40px;
    color: #999;
    margin-bottom: 10px;
  }
  a {
    color: rgb(30, 173, 230);
    font-size: 18px;
  }
}
</style>