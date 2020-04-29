<template>
  <div class="w">
    <el-row :gutter="20">
      <el-col :span="17">
        <div class="grid-content bg-purple">
          <!-- 攻略文章组件 -->
          <DetailArticle :data="articleData" />
          <!--  :data="articleData" -->
          <!-- 评论列表 -->
          <CommentList />
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

export default {
  data() {
    return {
      articleData: {}
    };
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
  },
  methods: {
    getDetail() {
      this.$axios({
        url: "/posts",
        params: {
          id: 4
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        this.articleData = data[0];
        console.log(this.articleData);
      });
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
</style>
