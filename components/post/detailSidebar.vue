<template>
  <div class="aside">
    <h3>相关攻略</h3>
    <el-row class="item_gba" :gutter="10">
      <el-col :span="12">
        <img
          src="http://157.122.54.189:9095/uploads/20f093ff243d484b9c7776f47794911f.jpg"
          alt=""
          srcset=""
        />
      </el-col>
      <el-col :span="12" class="explain">
        <p>鼎湖山游玩攻略</p>
        <span>2020-04-13 1:56 阅读 12</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.aside {
  width: 280px;
}
h3 {
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.item_gba {
  padding: 20px 0;
  border-bottom: 1px solid #999;

  .explain {
    position: relative;
    font-size: 14px;
    span {
      position: absolute;
      bottom: 0;
      top: 71px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
