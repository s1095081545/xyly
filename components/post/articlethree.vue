<template>
  <div>
    <div class="img-three">
      <nuxt-link :to="`/post/detail?id=${recommendList.id}`">
        <h3 style="cursor:pointer;">{{recommendList.title}}</h3>
      </nuxt-link>

      <nuxt-link :to="`/post/detail?id=${recommendList.id}`">
        <p style="cursor:pointer;" v-html="recommendList.summary"></p>
      </nuxt-link>

      <div class="imgs" v-if="recommendList.images.length>0">
        <nuxt-link :to="`/post/detail?id=${recommendList.id}`">
          <img :src="recommendList.images[0]" style="cursor:pointer;" />
        </nuxt-link>

        <nuxt-link :to="`/post/detail?id=${recommendList.id}`">
          <img :src="recommendList.images[1]" style="cursor:pointer;" />
        </nuxt-link>

        <nuxt-link :to="`/post/detail?id=${recommendList.id}`">
          <img :src="recommendList.images[2]" style="cursor:pointer;" />
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
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    recommendList: {}
  }
};
</script>

<style scoped lang="less">
.img-three {
  border-bottom: 1px solid #ddd;
  h3 {
    font-size: #000052;
    font-weight: normal;
    border-top: 1px solid #ddd;
    padding-top: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      color: orange;
    }
  }
  p {
    font-size: 14px;
    line-height: 20px;
    color: #666;
    height: 60px;
    margin-top: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .imgs {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    img {
      width: 220px;
      height: 150px;
      object-fit: cover;
    }
  }
  .footers {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    margin-top: 20px;

    .usernames {
      display: flex;
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
    }
  }
}
</style>