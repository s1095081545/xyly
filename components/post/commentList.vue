<template>
  <div class="main">
    <div class="list_item">
      <div class="picture">
        <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="" />
        <span>管理员</span>
        <i> 2020-04-29 5:12</i>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  border: solid 1px #999;
  .list_item {
    padding: 20px 20px 5px 20px;
    .picture {
      img {
        width: 16px;
        height: 16px;
      }
      i {
        font-size: 12px;
      }
    }
  }
}
</style>
