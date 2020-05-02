<template>
  <div>
    <div class="img-three" v-for="(item,index) in recommendList" :key="index">
      <h3 style="cursor:pointer;">{{item.title}}</h3>
      <p style="cursor:pointer;" v-html="item.content"></p>
      <div class="imgs">
        <img :src="item.images[0]" style="cursor:pointer;" />
        <img :src="item.images[1]" style="cursor:pointer;" />
        <img :src="item.images[2]" style="cursor:pointer;" />
      </div>
      <div class="footers">
        <div class="usernames">
          <i class="el-icon-location-outline">
            <span>{{item.cityName}} by</span>
          </i>
          <div class="users">
            <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" style="cursor:pointer;" />
            <span style="cursor:pointer;">{{item.account.nickname}}</span>
            <i class="el-icon-view">
              <span>{{item.watch}}</span>
            </i>
          </div>
        </div>
        <div class="zan">{{item.like}} 赞</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
  }
  p {
    font-size: 14px;
    color: #666;
    margin-top: 20px;
  }
  .imgs {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    img {
      width: 220px;
      height: 150px;
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
        color: #ddd;
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
          color: #ddd;
          margin-left: 5px;
          font-size: 12px;
        }
        img {
          width: 16px;
          height: 16px;
        }
        i {
          color: #ddd;
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