<template>
  <div class="sidebar">
    <!-- 侧拉导航搜索栏 -->
    <div class="nav-search">
      <ul class="menu">
        <li v-for="(item,index) in lists" :key="index">
          <div>
            <span>{{item.type}}</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <ol>
            <li @click="cgClick(v.city)" v-for="(v,i) in item.children" :key="i">
              <em>{{i+1}}</em>
              <i>{{v.city}}</i>
              <span>{{v.desc}}</span>
            </li>
          </ol>
        </li>
      </ul>
    </div>

    <h3>推荐城市</h3>
    <!-- 下划线 -->
    <div class="xhx"></div>
    <!-- 推荐城市图片 -->
    <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" @click="path" />
  </div>
</template> 
<script>
export default {
  data() {
    return {
      lists: []
    };
  },
  mounted() {
    this.$axios({
      url: `/posts/cities`
    }).then(res => {
      this.lists = res.data.data;
    });
  },
  methods: {
    //点击左侧菜单栏的弹出框的每一项
    cgClick(val) {
      console.log(val);
    },
    path() {
      setTimeout(v => {
        // console.log(111);
        this.$router.push({ path: "#" });
      }, 2000);
    }
  }
};
</script>
<style scoped lang="less">
.sidebar {
  width: 260px;
  .nav-search {
    width: 260px;
  }

  h3 {
    font-weight: normal;
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .xhx {
    width: 260px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
  }
  img {
    width: 260px;
    height: 174px;
    cursor: pointer;
  }
}

.menu {
  position: relative;
  z-index: 10;
  font-size: 14px;
  > li {
    box-sizing: border-box;
    line-height: 40px;
    padding: 0 20px;
    width: 100%;
    border: 1px solid #eaeaea;
    margin-top: -1px;
    &:hover {
      border-right-color: #fff;
      ol {
        display: block;
      }
    }
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover {
        color: orange;
      }
    }
    ol {
      display: none;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 100%;
      z-index: -1;
      width: 360px;
      background: #fff;
      padding: 15px 20px;
      border: 1px solid #eaeaea;
      margin-left: -1px;
      max-height: 280px;
      li {
        line-height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
        i,
        em {
          color: orange;
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
        em {
          font-style: italic;
          font-size: 18px;
        }
        span {
          color: #999;
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>