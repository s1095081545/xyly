<template>
  <el-row>
    <div class="articleone">
      <el-col :span="7">
        <nuxt-link :to="`/post/detail?id=${recommendList.id}`">
          <div class="lefts">
            <img :src="recommendList.images[0]" style="cursor:pointer;" />
          </div>
        </nuxt-link>
      </el-col>
      <el-col :span="17">
        <div class="contents">
          <div class="rights">
            <nuxt-link :to="`/post/detail?id=${recommendList.id}`">
              <h3 style="cursor:pointer;">{{recommendList.title}}</h3>
            </nuxt-link>

            <nuxt-link :to="`/post/detail?id=${recommendList.id}`">
              <div class="contentList">
                <a href="#" v-html="recommendList.summary"></a>
              </div>
            </nuxt-link>
          </div>
          <div class="footers">
            <div class="usernames">
              <i class="el-icon-location-outline">
                <span>{{recommendList.cityName}} by</span>
              </i>
              <div class="users">
                <img
                  :src="$axios.defaults.baseURL+recommendList.account.defaultAvatar"
                  style="cursor:pointer;"
                />
                <span style="cursor:pointer;color:orange">{{recommendList.account.nickname}}</span>
                <i class="el-icon-view">
                  <span>{{recommendList.watch||0}}</span>
                </i>
              </div>
            </div>
            <div class="zan">{{recommendList.like||0}} 赞</div>
          </div>
        </div>
      </el-col>
    </div>
  </el-row>
</template>

<script>
export default {
  props: {
    // 数据
    recommendList: {}
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    blur() {
      // console.log(this.value);
    }
  }
};
</script>

<style scoped lang="less">
.articleone {
  display: flex;
  margin-top: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
  .lefts {
    img {
      width: 220px;
      height: 150px;
      object-fit: cover;
    }
  }
  .contents {
    .rights {
      height: 130px;
      margin-left: 20px;
      padding-left: 10px;
      h3 {
        width: 100%;
        font-size: #000052;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          color: orange;
        }
      }
      .contentList {
        height: 60px;
        margin-top: 20px;

        a {
          height: 60px;
          display: block;
          font-size: 14px;
          color: #666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .footers {
      display: block;
      display: flex;
      height: 30px;
      justify-content: space-between;
      margin-left: 20px;

      .usernames {
        display: flex;
        height: 20px;
        align-items: center;
        .el-icon-location-outline {
          color: #999;
          font-size: 12px;
          span {
            margin-left: 5px;
          }
        }
        .users {
          display: flex;
          margin-left: 10px;
          align-items: center;
          span {
            color: #999;
            margin-left: 5px;
            font-size: 12px;
          }
          img {
            width: 16px;
            height: 16px;
          }
          i {
            color: #999;
            margin-left: 10px;
          }
        }
      }
      .zan {
        color: #ffa500;
        margin-right: 20px;
      }
    }
  }
}
</style>