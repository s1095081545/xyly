<template>
  <div>
    <div class="container">
      <div class="main">
        <el-row type="flex" justify="space-between">
          <el-col :span="18">
            <!-- 左边 -->
            <h2 class="h2">发表新攻略</h2>
            <p class="p">分享你的个人游记,让更多人看到哦!</p>
            <!-- 表单 -->
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              :hide-required-asterisk="true"
              :show-message="false"
            >
              <el-form-item prop="title">
                <el-input
                  v-model="form.title"
                  placeholder="请输入标题"
                ></el-input>
              </el-form-item>
              <el-form-item prop="content">
                <!-- 编辑器 -->
                <div id="editor">
                  <vue-editor
                    v-model="form.content"
                    v-if="isClient"
                    :editorToolbar="customToolbar"
                    useCustomImageHandler
                    @image-added="cgImgAdd"
                  ></vue-editor>
                </div>
              </el-form-item>
              <el-form-item label="选择城市" label-width="70px" prop="city">
                <el-autocomplete
                  v-model="form.city"
                  :fetch-suggestions="cgSearch"
                  @select="handleSelect"
                  placeholder="请搜索游玩城市"
                  style="width:200px"
                  :trigger-on-focus="false"
                >
                  <template slot-scope="{ item }">
                    {{ item.name }}
                  </template>
                </el-autocomplete>
              </el-form-item>
              <!-- 发布 -->
              <el-form-item>
                <el-button
                  type="primary"
                  style="margin-right:10px"
                  :loading="loading"
                  @click="cgAdd"
                  >发布</el-button
                >
                或者
                <el-button type="text" style="color:orange" @click="cgCache"
                  >保存到草稿箱</el-button
                >
                <el-button
                  type="text"
                  style="color:red"
                  @click="cgItemDel"
                  v-if="listIndex >= 0"
                  >从草稿箱删除</el-button
                >
              </el-form-item>
            </el-form>
            <!-- 表单 end -->
          </el-col>
          <el-col :span="5">
            <!-- 草稿箱 -->
            <el-card shadow="never" v-if="false">草稿箱﹙0﹚</el-card>

            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>草稿箱﹙{{ list.length }}﹚</span>
              </div>
              <div
                v-for="(item, index) in list"
                :key="index"
                class="text item"
                @click="cgItem(index)"
              >
                <span>{{ item.title }}</span>
                <i class="iconfont el-icon-edit"></i>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        city: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "123"
          }
        ],
        content: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "123"
          }
        ],
        city: [
          {
            required: true,
            message: "游玩城市不能为空",
            trigger: "123"
          }
        ]
      },
      isClient: false,
      list: [],
      listIndex: -1,
      isCache: true,
      loading: false, //发布的时候为true
      // 自定义编辑器工具栏
      customToolbar: [
        [{ header: 1 }, { header: 2 }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image"]
      ]
    };
  },
  mounted() {
    // 加载编辑器插件
    if (process.client) {
      const { VueEditor } = require("vue2-editor");
      this.$options.components.VueEditor = VueEditor;
      this.isClient = true;
    }
    setTimeout(() => {
      const data = [...this.$store.state.post.createArticle];
      this.list = data.map(item => ({ ...item }));
    }, 0);
  },
  methods: {
    // 添加图片
    cgImgAdd(file, Editor, cursorLocation) {
      console.log(Editor);
      const fd = new FormData();
      fd.append("files", file);

      this.$axios({
        url: `/upload`,
        data: fd,
        method: "post"
      }).then(res => {
        const url = this.$axios.defaults.baseURL + res.data[0].url;
        Editor.insertEmbed(cursorLocation, "image", url);
        console.log(url);
      });
    },
    // 选择城市远程搜索
    cgSearch(val, cb) {
      if (val.trim() === "") {
        cb([]);
      } else {
        this.$store.dispatch("hotel/getCities", val).then(res => {
          cb(res.data);
        });
      }
    },
    // 选择城市-选择下拉菜单
    handleSelect(val) {
      this.form.city = val.name;
    },
    // 点击草稿箱的项目
    cgItem(val) {
      this.form = { ...this.list[val] };
      this.listIndex = val;
    },
    // 发布
    cgAdd() {
      if (this.loading) return;
      this.loading = true;
      // 如果超6秒不返回则自动结束本次请求
      setTimeout(() => (this.loading = false), 6000);
      this.$refs.form.validate((valid, obj) => {
        if (valid) {
          this.$axios({
            url: `posts`,
            method: "post",
            data: this.form,
            headers: {
              Authorization: `Bearer ` + this.$store.state.user.userInfo.token
            }
          }).then(res => {
            setTimeout(() => {
              this.$message.success("新增成功");
              this.$refs["form"].resetFields();
              this.loading = false;
            }, 1000);
          });
        } else {
          this.loading = false;
          this.$message.error(obj[Object.keys(obj)[0]][0]["message"]);
        }
      });
    },
    // 保存到草稿箱
    cgCache() {
      if (!this.isCache) return;
      this.isCache = false;
      // 节流控制
      setTimeout(() => (this.isCache = true), 3000);
      if (this.form.title.trim() === "") {
        this.$message.error("标题为空,无法保存");
      } else {
        if (this.listIndex >= 0) {
          this.list[this.listIndex] = { ...this.form };
          this.list = [...this.list];
        } else {
          this.list.unshift({ ...this.form });
          // 控制草稿最多10条
          if (this.list.length > 10) this.list.length = 10;
        }
        const data = this.list.map(item => ({ ...item }));
        this.$store.commit("post/setCreateArticle", data);
        this.$message.success("保存成功");
      }
    },
    // 从草稿箱删除
    cgItemDel() {
      // 弹窗提示
      this.$confirm("请再次确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认删除
          this.list.splice(this.listIndex, 1);
          const data = this.list.map(item => ({ ...item }));
          console.log(this.list);
          this.$store.commit("post/setCreateArticle", data);
          this.$message.success("从草稿箱删除成功");
          this.listIndex = -1;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  //   background: #f5f5f5;
  padding: 30px 0;
  .main {
    width: 1000px;
    margin: 0 auto;
  }
}
.text {
  font-size: 14px;
}

.item {
  padding: 15px;
  cursor: pointer;
  &:hover {
    background: #fafafa;
    color: #000;
    .iconfont {
      color: skyblue;
    }
  }
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}
/deep/.el-card__body {
  padding: 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
// 编辑器
#editor {
  min-height: 420px;
}
/deep/.el-form-item__content {
  line-height: inherit;
  .ql-editor {
    min-height: 360px;
  }
}
.h2 {
  font-weight: 400;
}
.p {
  line-height: 40px;
  color: #aaa;
  font-size: 14px;
}
</style>
