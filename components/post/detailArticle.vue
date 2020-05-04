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
        <span
          >攻略：{{ moment(data.created_at).format("YYYY-MM-DD h:mm") }}</span
        >

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
    <div class="comment">
      <p>评论</p>
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
          <!--  -->
          <!-- :headers="{
              Authorization: `Bearer ` + this.$store.state.user.userInfo.token
            }" -->
          <!-- :data="{
              id
            }" -->
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
          >
            <!-- :auto-upload="false" -->
            <!--  :http-request="up" -->
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="handleClick()">提交</el-button>
        </el-col>
      </el-row>
      <div>
        {{ data.id }}
        <!-- {{ this.$store.state.user.userInfo.token }} -->
      </div>
    </div>
  </div>
</template>

<script>
// import CommentList from "@/components/post/commentList.vue";
import moment from "moment";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      content: "",
      moment,
      // 评论ID
      // id: this.data.id,
      id: 4,
      follow: "",
      pics: [],
      list: []
    };
  },

  props: {
    data: {
      type: Object,
      default: {}
    },
    totals: {
      type: Object,
      default: {}
    }
  },
  methods: {
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

      console.log(2, response, file, fileList);
    },
    uploadErr(response, file, fileList) {
      console.log(2, response, file, fileList);
    },
    // up(con){
    //   this.$axios({
    //     url:"con.action",
    //     dada
    //   })
    // },
    //发布评论
    handleClick() {
      // 声明对象
      let data = {
        pics: this.pics, //图片
        post: 4 //文章ID  this.$route.query.id
      };
      //判断内容有没有
      if (this.content) {
        data.content = this.content; //内容
      }
      if (this.follow) {
        datta.follow = this.follow; //回复ID
      }
      console.log(this.list);

      // this.$axios({
      //   url: "/comments",
      //   method: "post",
      //   headers: {
      //     Authorization: `Bearer ` + this.$store.state.user.userInfo.token
      //   },
      //   data: data
      // }).then(res => {
      //   console.log("发布评论", res);
      //   this.$message({
      //     message: res.data.message,
      //     type: "success"
      //   });
      //   this.$router.push({
      //     path: "/post/detail",
      //     query: {
      //       id: this.id
      //     }
      //   });
      // });
      //获取图片
      console.log(this.list);
    }
  }
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

.comment {
  //   input {
  //     border: 0; // 去除未选中状态边框
  //     outline: none; // 去除选中状态边框
  //     // background-color: rgba(0, 0, 0, 0); // 透明背景
  //   }
  p {
    margin-bottom: 20px;
  }
  .el-button--primary {
    padding: 7px 15px;
    font-size: 12px;
  }
}
.enter {
  margin-bottom: 5px;
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
