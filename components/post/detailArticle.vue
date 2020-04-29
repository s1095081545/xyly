<template>
  <div class="main">
    <div class="header">
      <span>旅游攻略</span><span>/</span><span>攻略详情</span>
    </div>
    <h1>{{ data.title }}</h1>
    <div class="date clearfix">
      <div>
        <span>攻略：2019-05-22 10:57 </span>
        <span>阅读：15042</span>
      </div>
    </div>
    <!-- 文章渲染 -->
    <div class="dataimg" v-html="data.content"></div>
    <!-- 评论条数 -->
    <el-row type="flex" class="row-bg" justify="center">
      <div class="comments">
        <i class="iconfont iconpinglun"></i>
        <p>评论</p>
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
          v-model="textarea2"
        >
        </el-input>
      </div>

      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">提交</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin-bottom: 20px;
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
  i {
    font-size: 28px;
    color: orange;
  }
  p {
    color: #999;
  }
}

/deep/img {
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
</style>
