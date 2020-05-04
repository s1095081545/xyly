<template>
  <el-row style="width: 700px">
    <div class="articleone" v-for="(item,index) in recommendList" :key="index">
      <div class="lefts">
        <img :src="item.images[0]" style="cursor:pointer;" />
      </div>
      <div class="contents">
        <div class="rights">
          <h3 style="cursor:pointer;">{{item.title}}</h3>
          <div class="contentList">
            <a href="#" v-html="item.content"></a>
          </div>
        </div>
        <div class="footers">
          <div class="usernames">
            <i class="el-icon-location-outline">
              <span>{{item.cityName}} by</span>
            </i>
            <div class="users">
              <img
                :src="$axios.defaults.baseURL+item.account.defaultAvatar"
                style="cursor:pointer;"
              />
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
  </el-row>
</template>

<script>
export default {
  props: {
    // 数据
    recommendList: {
      type: Array,
      default: []
    }
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
  height: 200px;
  margin-top: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
  .lefts {
    img {
      width: 220px;
      height: 150px;
    }
  }
  .contents {
    width: 550px;
    .rights {
      width: 530px;
      height: 130px;
      margin-left: 20px;

      h3 {
        width: 550px;
        font-size: #000052;
        font-weight: normal;
      }
      .contentList {
        width: 530px;
        height: 60px;
        margin-top: 20px;

        a {
          width: 530px;
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
      width: 480px;
      height: 30px;
      justify-content: space-between;
      padding-bottom: 20px;
      margin-left: 20px;

      .usernames {
        display: flex;
        height: 20px;
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
            color: #ffa500;
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
        margin-right: 20px;
      }
    }
  }
}
</style>