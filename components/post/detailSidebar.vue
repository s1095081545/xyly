<template>
  <div class="aside" v-if="list">
    <h3>相关攻略</h3>
    <div class="row" :gutter="10" v-for="(item, index) in list" :key="index">
      <nuxt-link
        :to="{
          path: '/post/detail',
          query: {
            id: item.id
          }
        }"
      >
        <div v-if="!item.images[0]" class="danhang">
          <p>{{ item.title }}</p>
          <span>
            {{ moment(item.created).format("YYYY-MM-DD h:mm") }} 阅读
            {{ item.watch }}
          </span>
        </div>
        <el-row v-if="item.images[0]" class="youimg">
          <el-col :span="8">
            <img :src="item.images[0]" alt srcset />
          </el-col>
          <!-- $axios.defaults.baseURL -->
          <el-col :span="16" class="zi">
            <p>{{ item.title }}</p>
            <span>
              {{ moment(item.created).format("YYYY-MM-DD h:mm") }} 阅读
              {{ item.watch }}
            </span>
          </el-col>
        </el-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      moment,
      list: []
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/recommend",
      params: {
        // id: this.$route.query.id
        id: 4
      }
    }).then(res => {
      this.list = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.aside {
  width: 280px;
  height: 121px;
  // background-color: red;
}
h3 {
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
}
img {
  width: 100px;
  height: 80px;
  width: 100%;
  height: 100%;

  object-fit: cover;
}
.item_gba {
  padding: 10px;
  border-bottom: 1px solid #999;

  .explain {
    position: relative;
    font-size: 14px;
    p {
      position: absolute;
      top: 0;
      left: 0;
      flex: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    span {
      position: absolute;
      // top: 71px;
      left: 0;
      bottom: -84px;
      font-size: 12px;
      color: #999;
    }
  }
}
.danhang {
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
  p {
    margin-bottom: 20px;
  }
  span {
    color: #999;
    font-size: 14px;
  }
}
.youimg {
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
  .zi {
    padding-left: 10px;
  }
  p {
    margin-bottom: 20px;
  }
  span {
    color: #999;
    font-size: 14px;
  }
}
</style>
