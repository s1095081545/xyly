<template>
  <div v-red>{{price | tof}}</div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        label: "衣服",
        children: {
          label: "上衣"
        }
      },
      price: 12.0
    };
  },
  filters: {
    tof(val) {
      return val + 10;
    }
  },
  directives:{
      red:{
          inserted:function(el){
              el.style.background="red"
          }
      }
  }
};
</script>

<style>
</style>