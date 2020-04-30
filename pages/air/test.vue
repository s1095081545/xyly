<template>
  <div>
    <ul class="menu">
      <li v-for="(index) in 4" :key="index" :class="index===3?'active':''">
        <div>
          热门城市
          <i class="el-icon-arrow-right"></i>
        </div>
        <ol>
          <li>
            <span>1</span>
            <span>北京</span>
            <span>世界著名的文化只读顶顶顶{{index}}</span>
          </li>
          <li>
            <span>1</span>
            <span>北京</span>
            <span>世界著名的文化只读顶顶顶 {{index}}</span>
          </li>
          <li>
            <span>1</span>
            <span>北京</span>
            <span>世界著名的文化只读顶顶顶</span>
          </li>
          <li>
            <span>1</span>
            <span>北京</span>
            <span>世界著名的文化只读顶顶顶</span>
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.menu {
  position: relative;
  width: 200px;

  ol {
    display: none;
    position: absolute;
    left: 100%;
    top: 0;
    width: 300px;
  }
  >li{
    line-height: 40px;
  }
  > li:hover ol {
    display: block;
  }
}
</style>