<template>
  <div class="main">
    <div class="header">
      <span>旅游攻略</span>
      <span>/</span>
      <span>攻略详情</span>
    </div>
    <h1>{{ data.title }}</h1>
    <div class="date clearfix">
      <div>
        <span>攻略：{{ moment(data.created_at).format("YYYY-MM-DD h:mm") }}</span>

        <span>阅读： {{ data.watch }}</span>
      </div>
    </div>
    <!-- 文章渲染 -->
    <div class="dataimg" v-html="data.content"></div>
    <!-- 评论条数 -->
    <el-row type="flex" class="row-bg" justify="center">
      <div class="comments">
        <i class="iconfont iconpinglun"></i>
        <p>评论({{ totals.total }})</p>
      </div>
      <div class="share">
        <i class="iconfont iconfenxiang"></i>
        <p>分享</p>
      </div>
    </el-row>

    <div>
      <!-- {{ data.id }} -->
      <!-- {{ this.$store.state.user.userInfo.token }} -->
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
// import CommentList from "@/components/post/commentList.vue";
import moment from "moment";
export default {
  data() {
    return {
      //发言内容

      moment,
      // 评论ID
      // id: this.data.id,
      id: 4
    };
  },
  watch: {},
  props: {
    data: {
      type: Object,
      default: {}
    },
    totals: {
      type: Object,
      default: {}
    },
    isObj: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.main {
  margin-bottom: 20px;
  .main_item {
    padding: 20px;
  }
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}
.header {
  span {
    font-size: 14px;
    font-weight: 700;
    color: #303133;
  }
  span:nth-child(3) {
    font-weight: normal;
    color: #606266;
  }
  span:nth-child(2) {
    margin: 0 9px;
    color: #606266;
  }
}
h1 {
  padding: 20px 0;
  border-bottom: 1px solid #606266;
}
.date {
  padding: 20px;
  div {
    float: right;
    span {
      margin-left: 10px;
      color: #999;
    }
  }
}
.share {
  padding: 20px;
  i {
    display: block;
    transform: scale(1.3);
    font-size: 28px;
    color: orange;
  }
  p {
    color: #999;
  }
}
.comments {
  padding: 20px;
  text-align: center;
  i {
    font-size: 28px;
    color: orange;
  }
  p {
    color: #999;
  }
}

/deep/img {
  margin-top: 10px;
  object-fit: cover;
  max-width: 100%;
}

.max {
  width: 700px;
}
// 评论样式

.list_item {
  // padding: 20px 20px 5px 20px;
  .picture {
    img {
      width: 16px;
      height: 16px;
    }
    i {
      font-size: 12px;
    }
  }
  .comments {
    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
    }
  }
}
</style>
