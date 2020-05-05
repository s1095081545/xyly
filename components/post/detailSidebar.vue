<template>
  <div class="aside">
    <h3>相关攻略</h3>

    <el-card class="box-card" v-for="(item, index) in list" :key="index">
      <nuxt-link
        :to="{
          path: '/post/detail',
          query: {
            id: item.id
          }
        }"
      >
        <img :src="item.images[0]" alt srcset v-if="item.images[0]" class="item_left" />
        <div class="item_right">
          <p>{{ item.title }}</p>
          <div>
            {{ moment(item.created).format("YYYY-MM-DD h:mm") }} 阅读
            {{ item.watch }}
          </div>
        </div>
      </nuxt-link>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      moment,
      list: []
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/recommend",
      params: {
        // id: this.$route.query.id
        id: 4
      }
    }).then(res => {
      this.list = res.data.data;
      console.log("1", this.list);
    });
  }
};
</script>

<style lang="less" scoped>
h3 {
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
  // width: 100%;
  // height: 100%;
  width: 280px;
}
img {
  width: 100px;
  height: 80px;
  // width: 100%;
  // height: 100%;

  object-fit: cover;
}
.box-card {
  // position: relative;
  padding: 10px 0;
  border-bottom: 1px #ccc dashed;
  width: 280px;
  height: 121px;
}
/deep/.item-left {
  display: inline-block;
  // float: left;
}
/deep/.item_right {
  // float: left;
  // position: relative;
  display: inline-block;
  font-size: 12px;
  flex: 1;
  // width: 170px;
  // height: 80px;
  p {
    position: relative;
  }
  div {
    // position: absolute;
    position: relative;
    left: 0;
    bottom: 0;
  }
}
.aside {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
