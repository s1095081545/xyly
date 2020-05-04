<template>
  <div class="w">主动报错页面</div>
</template>

<script>
export default {
  mounted() {
    this.$message.error("抛出一个错误，请在控制台查看");
    let r = Math.random();
    setTimeout(() => {
      throw Error(`错误：${r}`);
    }, 2000);
  }
};
</script>

<style scoped lang="less">
.w {
  height: 600px;
  line-height: 600px;
  text-align: center;
}
</style>