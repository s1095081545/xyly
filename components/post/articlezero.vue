<template>
  <div>
    <div class="rights" v-for="(item,index) in recommendList" :key="index">
      <a href="#">
        <h3>{{item.title}}</h3>
      </a>
      <a href="#">
        <p v-html="item.content"></p>
      </a>
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
.rights {
  margin-left: 5px;
  padding-top: 20px;
  padding-bottom: 10px;
  margin-bottom: 15px;
  h3 {
    font-size: #000052;
    font-weight: normal;
  }
  p {
    font-size: 14px;
    color: #666;
    margin-top: 20px;
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