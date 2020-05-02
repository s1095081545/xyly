<template>
  <div class="sidebar">
    <!-- 侧拉导航搜索栏 -->
    <div class="nav-search">
      <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
    </div>

    <h3>推荐城市</h3>
    <!-- 下划线 -->
    <div class="xhx"></div>
    <!-- 推荐城市图片 -->
    <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" @click="path" />
  </div>
</template> 
<script>
export default {
  methods: {
    path() {
      setTimeout(v => {
        // console.log(111);
        this.$router.push({ path: "#" });
      }, 2000);
    }
  }
};
</script>
<style scoped lang="less">
.sidebar {
  width: 260px;
  .nav-search {
    width: 260px;
  }

  h3 {
    font-weight: normal;
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .xhx {
    width: 260px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
  }
  img {
    width: 260px;
    height: 174px;
    cursor: pointer;
  }
}
</style>