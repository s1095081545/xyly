<template>
  <div class="man">
    <el-input
      suffix-icon="el-icon-search"
      class="search-box"
      v-model="value"
      placeholder="请输入内容,例如：你想去的地方"
      @blur="blur"
    ></el-input>
    <span class="rec">推荐 : 广州 上海 北京</span>
    <div class="tabs">
      <h3>推荐攻略</h3>
      <el-button type="primary" icon="el-icon-edit ">写游记</el-button>
    </div>

    <!-- 写的游记列表 -->
    <div class="article">
      <!-- 三张图的组件 -->
      <div v-for="(item,index) in recommendList" :key="index">
        <Articlethree
          v-if="item.images.length === 3 || item.images.length >= 4"
          :recommendList="recommeindList"
        />
      </div>
      <div v-for="(item,index) in recommendList" :key="index">
        <!-- 一张图的组件 -->
        <Articleone v-if="item.images.length === 1" :recommendList="recommendList" />
      </div>
      <div v-for="(item,index) in recommendList" :key="index">
        <!-- 无张图的组件 -->
        <Articlezero v-if="item.images.length === 0" :recommendList="recommendList" />
      </div>
      <div v-for="(item,index) in recommendList" :key="index">
        <!-- 二张图的组件 -->
        <Articletwo v-if="item.images.length === 2" :recommendList="recommendList" />
      </div>
    </div>
  </div>
</template>
<script>
// 三张图片的文章组件
import Articlethree from "@/components/post/articlethree";
// 一张图片的文章组件
import Articleone from "@/components/post/articleone";
// 没有图片的文章组件
import Articlezero from "@/components/post/articlezero";
// 二张图的组件
import Articletwo from "@/components/post/articletwo";

export default {
  data() {
    return {
      //  输入框的值
      value: "",
      // 文章总数据列表
      recommendList: []
      // ------
      // 第几页的意思
      // starts: 0,
      // end是几，下面请求的数据就有几条
      // end: 3
    };
  },
  components: {
    Articlethree,
    Articleone,
    Articlezero,
    Articletwo
  },
  mounted() {
    // 设置url地址的参数
    // this.$router.push({
    //   query: {
    //     start: this.starts,
    //     limit: this.end
    //   }
    // });
    this.$axios({
      url: "/posts"
      // params: {
      //   _start: this.starts,
      //   _limit: this.end
      // }
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.recommendList = data;
      console.log(this.recommendList);
      this.recommendList.forEach(v => {
        console.log(v);
      });
    });
  },
  methods: {
    blur() {
      // console.log(this.value);
    }
  }
};
</script>

<style scoped lang="less">
.man {
  width: 700px;
  margin-left: 33px;
  .search-box {
    width: 694px;
    border: none;
    border: 3px solid #ffa500;
    outline: none;
  }
  .suffix-icon {
    font-size: 20px;
  }
  .rec {
    display: block;
    color: #ddd;
    font-size: 12px;
    margin-top: 10px;
  }
  .tabs {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    line-height: 40px;
    h3 {
      font-weight: normal;
      color: #ffa500;
      border-bottom: 2px solid #ffa500;
    }
  }
}
</style>