<template>
  <div class="w">
    <el-row :gutter="20">
      <el-col :span="17">
        <!-- <div class="grid-content bg-purple"> -->
        <!-- 攻略文章组件 -->
        <DetailArticle :data="articleData" :totals="commentList" />

        <div class="comment">
          <p>评论</p>
          <!-- 传值部分 -->

          <span class="pop" v-if="isObj.isShow==true?true:false">
            回复 @{{isObj.name}}
            <i class="el-icon-close" @click="clear_Show"></i>
          </span>
          <div class="enter">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="content"
            ></el-input>
          </div>

          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <!-- 上传文件 -->
              <el-upload
                :action="$axios.defaults.baseURL + '/upload'"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :show-file-list="true"
                :file-list="list"
                :on-success="uploadSuccess"
                :on-error="uploadErr"
                name="files"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" class="img_up">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="handleClick()">提交</el-button>
            </el-col>
          </el-row>
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
              <CommentList :data="item.parent" v-if="item.parent" @thg="thg" />
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
            :page-sizes="[2,4,6,8]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="commentList.total"
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
      //输入框内容
      content: "",
      dialogImageUrl: "",
      dialogVisible: false,
      currentPage4: 1,
      content: "",
      isObj: {
        isShow: "",
        id: "",
        name: ""
      },
      follow: "",
      pics: [],
      list: [],
      // 分页
      li: 2,
      st: 0,
      // th: 7,
      total: 0
    };
  },
  watch: {
    $route() {
      this.getDetail();
      this.getComments();
      // console.log(123);
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
        // console.log("数据", this.articleData);
      });
    },
    //评论列表请求
    // 配置请求的基准URL地址

    getComments() {
      let i = +this.li;
      let k = +this.st;
      let j = this.th;
      console.log(i, k, j);

      this.$axios({
        url: "posts/comments",
        params: {
          post: this.$route.query.id, //文章ID
          // _sort:, //排序
          _limit: this.li, //条数
          _start: this.st //页数
        }
      }).then(res => {
        const { data } = res;
        this.total = res.total;
        // console.log(res);

        this.commentList = data;
        // this.commentList.parent = data.parent;
        // console.log("评论数据", this.commentList);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.li = val;
      this.st = 0;
      // console.log(this.li, this.st);
      this.getComments();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.CommentList = [];
      this.st = val;
      this.getComments();
      // console.log(this.li, this.st);
    },
    // 点击回复事件
    on_click(id, name) {
      // console.log(id, name);
      this.isObj.isShow = true;
      this.isObj.name = name;
      this.isObj.id = id;
      console.log(this.isObj);
    },
    //父组件
    thg(Obj) {
      console.log("收到了", Obj);
      this.Obj = Obj;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      console.log(this.list);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadSuccess(response, file, fileList) {
      // console.log("你好");

      // console.log(2, file);
      this.pics.push(file.response[0]);
    },
    uploadErr(response, file, fileList) {
      // console.log(2, response, file, fileList);
    },
    clear_Show() {
      this.isObj = "";
    },
    // clear_Show() {},
    //发布评论

    handleClick() {
      // 声明对象
      let data = {
        post: this.$route.query.id //文章ID  this.$route.query.id
      };
      //判断内容有没有
      if (this.content) {
        data.content = this.content; //内容
      }
      if (this.isObj.id) {
        data.follow = this.isObj.id; //回复ID
      }
      if (this.pics) {
        data.pics = this.pics;
      }
      console.log(this.data);

      this.$axios({
        url: "/comments",
        method: "post",
        headers: {
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        },
        data: data
      }).then(res => {
        console.log("发布评论", res);
        this.$message({
          message: res.data.message,
          type: "success"
        });
        this.isObj = "";
        this.content = "";
        // this.$router.push({
        //   path: "/post/detail",
        //   query: {
        //     id: this.id
        //   }
        // });
        this.getComments();
      });
      //获取图片
      console.log(this.list);
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
  border: 1px #eee solid;
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
.enter {
  margin-bottom: 5px;
  margin-top: 10px;
}
.comment {
  p {
    margin-bottom: 20px;
  }
  .el-button--primary {
    padding: 7px 15px;
    font-size: 12px;
  }
}
.pop {
  // position: relative;
  padding: 5px;
  margin-bottom: 10px;
  background-color: rgba(244, 244, 245);
  font-size: 12px;
  width: 120px;
  height: 25px;
  line-height: 25px;
  i {
    // position: absolute;
    // top: -1px;
    margin-top: 5px;
    margin-left: 3px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      // padding: 5px;
      background-color: rgba(144, 147, 153);
      color: #fff;

      border-radius: 50%;
      height: 14px;
      width: 14px;
    }
  }
}
/deep/.img_up {
  /deep/img {
    float: left;
    margin: 5px;
    width: 98px;
    height: 98px;
  }
}
</style>
