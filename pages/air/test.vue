<template>
  <div>
    <div class="w">
      <div>攻略</div>
      <div>酒店</div>
      <div>机票</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.w {
  display: flex;
  background: #f00;
  height: 50px;
  > div {
    margin-top: 10px;
    position: relative;
    z-index: 10;
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    margin-right: 10px;
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      color: #fff;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.3);
      transform: scale(1.1,1.1) perspective(.7em) rotateX(2.2deg);
      transform-origin: bottom left;
    }
  }
}
</style>