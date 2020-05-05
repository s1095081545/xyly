<template>
  <div class="w">
    <el-row :gutter="20">
      <el-col :span="17">
        <div class="grid-content bg-purple">
          <!-- 攻略文章组件 -->
          <DetailArticle :data="articleData" :totals="commentList" />
          <!-- 评论列表 -->
          <!-- <CommentList /> -->
          <div class="comments" v-for="(item, index) in commentList.data" :key="index">
            <!-- 头像信息 -->
            <div class="header">
              <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" />
              <i>{{ item.account.nickname }}</i>
              <span>
                {{
                moment(item.created_at).format("YYYY-MM-DD h:mm")
                }}
              </span>
            </div>
            <!-- 回复 -->
            <!-- {{ moment().format("MMMM Do YYYY, h:mm:ss") }} -->
            <div class="nexine">
              <!-- 组件 -->
              <CommentList :data="item.parent" v-if="item.parent" :isObj="isObj" />
              <div>{{ item.content }}</div>
              <div
                class="nexine_img clearfix"
                v-for="(item1, index) in item.pics"
                :key="index"
                v-if="item.pics"
              >
                <img :src="$axios.defaults.baseURL + item1.url" alt />
              </div>
              <div class="on_focus">
                <a href="javascript:;" @click="on_click(item.id, item.account.nickname)">回复</a>
              </div>
            </div>
          </div>
          <!-- 评论结束 -->
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple-light">
          <!-- 侧边栏组件 -->
          <DetailSidebar />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//导入攻略文章组件
import DetailArticle from "@/components/post/detailArticle.vue";
//导入攻略详情文章侧边栏；
import DetailSidebar from "@/components/post/detailSidebar";
//导入文章评论列表
import CommentList from "@/components/post/commentList.vue";
//导入moment插件
import moment from "moment";
export default {
  data() {
    return {
      //文章详情
      articleData: {},
      // 文章评论
      commentList: [],
      moment,

      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      isObj: {
        isshow: false,

        id: "",
        name: ""
      }
    };
  },
  watch: {
    $route() {
      this.getDetail();
      this.getComments();
      console.log(123);
    }

    // console.log(to, from);
  },
  components: {
    //绑定组件
    //攻略文章
    DetailArticle,
    //侧边栏
    DetailSidebar,
    //评论列表
    CommentList
  },
  mounted() {
    this.getDetail();
    this.getComments();
  },
  methods: {
    getDetail() {
      this.$axios({
        url: "/posts",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        this.articleData = data[0];
        console.log("数据", this.articleData);
      });
    },
    //评论列表请求
    // 配置请求的基准URL地址

    getComments() {
      this.$axios({
        url: "posts/comments",
        params: {
          post: this.$route.query.id, //文章ID
          // _sort:, //排序
          _limit: 5, //条数
          _start: 0 //页数
        }
      }).then(res => {
        const { data } = res;
        this.commentList = data;
        // this.commentList.parent = data.parent;
        console.log("评论数据", this.commentList);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 点击回复事件
    on_click(id, name) {
      // console.log(id, name);
      this.isObj.isShow = true;
      this.isObj.name = name;
      this.isObj.id = id;
      console.log(this.isObj);
    }
  }
};
</script>

<style lang="less" scoped>
.w {
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
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
// 评论样式
.comments {
  padding: 20px;
  width: 100%;
  // height: 300px;
  border: 1px red solid;
  .header {
    font-size: 12px;

    img {
      width: 18px;
      height: 18px;
      vertical-align: middle;
    }
  }
  .nexine {
    margin: 10px 20px 15px 20px;
    // position: relative;

    .nexine_img {
      // text-align: left;
      img {
        // float: left;
        width: 80px;
        height: 80px;
        border: 1px #999 dashed;
        object-fit: cover;
        margin-right: 5px;
      }
    }
    .on_focus {
      // position: absolute;
      // right: 0;
      // bottom: -20px;
      font-size: 12px;
      color: blue;
      // float: right;
      text-align: right;
    }
  }
}
</style>
