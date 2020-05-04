<template>
  <div class="man">
    <div class="search_box">
      <el-input class="search-box" v-model="city" placeholder="请输入内容,例如：广州" @change="cgKeyUp"></el-input>
      <div class="search_icon" @click="cgSearch">
        <i class="el-icon-search"></i>
      </div>
    </div>
    <div class="rec">
      推荐 :
      <span @click="setRouter({ city: '广州',start:1 })">广州</span>
      <span @click="setRouter({ city: '上海',start:1 })">上海</span>
      <span @click="setRouter({ city: '北京',start:1 })">北京</span>
    </div>
    <div class="tabs">
      <h3>推荐攻略</h3>
      <el-button type="primary" icon="el-icon-edit ">写游记</el-button>
    </div>

    <div v-if="recommendList.data&&recommendList.data.length!=0">
      <!-- 写的游记列表 -->
      <div v-for="(item, index) in recommendList.data" :key="index">
        <!-- 无图或者三张图的组件 -->
        <Articlethree v-if="item.images.length<=0||item.images.length>=3" :recommendList="item" />
        <!-- 一张图的组件 -->
        <Articleone v-if="item.images.length >0&&item.images.length <3" :recommendList="item" />
      </div>
      <!-- 分页组件 -->
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="+$route.query.start||1"
          :page-sizes="[3,5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="recommendList.total||1"
        ></el-pagination>
      </div>
    </div>
    <div v-if="recommendList.data&&recommendList.data.length==0" class="empty">还没有当前城市的攻略哦</div>
  </div>
</template>
<script>
// 无图或者三张图的组件
import Articlethree from "@/components/post/articlethree";
// 一张图片的文章组件
import Articleone from "@/components/post/articleone";

export default {
  data() {
    return {
      //  输入框的值
      value: "",
      // 文章总数据列表
      recommendList: [],
      // ------
      // 第几页的意思
      pageIndex: 1,
      // end是几，下面请求的数据就有几条
      pageSize: 3,
      city: "",
      loaded: false
    };
  },
  components: {
    Articlethree,
    Articleone
  },

  watch: {
    $route() {
      if (this.loaded) {
        this.loaded = false;
        return;
      }
      this.getLists();
    }
  },
  mounted() {
    this.setRouter({});
    this.getLists();
  },
  methods: {
    // 请求文章列表
    getLists() {
      let { start, limit, city } = this.$route.query;
      start = Number((+start - 1) * +limit);
      start = isNaN(start) ? 0 : start;
      const data = {
        _start: start,
        _limit: +limit || 3
      };
      if (city) data.city = city;
      this.city = city;
      this.$axios({
        url: "/posts",
        params: data
      }).then(res => {
        const { data } = res;
        this.recommendList = data;
      });
    },
    // 点击搜索
    cgSearch() {
      this.setRouter({ city: this.city, start: 1 });
    },
    setRouter(obj) {
      let { start, limit, city } = this.$route.query;
      this.$router.push({
        query: {
          start: start || 1,
          limit: limit || 3,
          city: city || "",
          ...obj
        }
      });
    },
    cgKeyUp() {
      this.setRouter({ city: this.city });
    },
    // 页面大小改变
    handleSizeChange(val) {
      this.loaded = false;
      this.setRouter({ limit: val });
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.loaded = false;
      this.setRouter({ start: val });
    }
  }
};
</script>

<style scoped lang="less">
.man {
  .search-box {
    position: relative;
    border: 3px solid #409eff;
    border-radius: 4px;
    outline: none;
  }
  .search_icon {
    position: absolute;
    top: 0;
    right: -5px;
    height: 45px;
    line-height: 45px;
    font-size: 24px;
    padding: 0 20px;
    cursor: pointer;
    color: #409eff;
    font-weight: 700;
  }
  .search-box {
    /deep/.el-input__inner {
      border: none;
    }
    /deep/.el-input__icon {
      color: orange;
      font-size: 20px;
    }
  }
  .suffix-icon {
    font-size: 20px;
  }
  .rec {
    display: block;
    font-size: 12px;
    margin-top: 10px;
    span {
      cursor: pointer;
      margin: 0 5px;
    }
  }
  .tabs {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    h3 {
      font-weight: normal;
      color: #ffa500;
      border-bottom: 2px solid #ffa500;
      padding-bottom: 10px;
      line-height: 40px;
    }
    button {
      margin-bottom: 10px;
    }
  }
}
.page {
  margin: 20px 0 50px;
}
.empty {
  height: 200px;
  line-height: 200px;
  color: #999;
  text-align: center;
}
</style>