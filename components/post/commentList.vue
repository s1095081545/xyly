<template>
  <div>
    <CommentList :data="data.parent" v-if="data.parent" />
    <div class="follows">
      <div class="header">
        <div>
          <img :src="$axios.defaults.baseURL + data.account.defaultAvatar" alt />
          <i>{{ data.account.nickname }}</i>
          <span>{{ moment(data.created).format("YYYY-MM-DD h:mm") }}</span>
        </div>
      </div>
      <div class="content">{{ data.content }}</div>
      <div class="follow_img" v-for="(item, index) in data.pics" :key="index">
        <img :src="$axios.defaults.baseURL + item.url" alt />
      </div>
      <div class="on_focus">
        <a class="on_focus" href="javascript:;" @click="on_click(data.account.nickname,data.id)">回复</a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "CommentList",
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      // commentList: {}
      moment
    };
  },

  components: {
    // CommentList
  },
  methods: {
    on_click(name, id) {
      // console.log("子组件触发了", name, id);
      this.$emit("thg", {
        name,
        id,
        isShow: true
      });
      console.log("子组件触发了", name, id);
      console.log(this.$parent);
    }
  }
};
</script>

<style lang="less" scoped>
.nexine {
  div {
    word-wrap: break-word;
  }
}
.content {
  word-wrap: break-word;
}
.follows {
  // position: relative;
  width: 660px;
  margin: 0 20px 0 0;
  // height: 50px;
  // border: 1px solid blue;
  padding: 10px;
  background-color: #fafafa;
  .follow_img {
    img {
      // padding: 5px;
      // float: left;
      width: 80px;
      height: 80px;
      border: 1px #999 dashed;
      object-fit: cover;
      margin-right: 5px;
    }
  }
  .on_focus {
    font-size: 12px;
    color: blue;
    // float: right;
    text-align: right;
  }
}
.header {
  font-size: 12px;

  img {
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
}
</style>
