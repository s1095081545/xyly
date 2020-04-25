<template>
  <div class="allCity" v-if="allCities['ABCDE']">
    <el-tabs type="border-card" @tab-click="handleLabel">
      <el-tab-pane v-for="(item,index) in allCities" :key="index" class="abc">
        <div class="label" slot="label" >{{index}}</div>
        <div class="item">
          <ul>
            <li v-for="(v,i) in item" :key="i" @click="handleClickCity(v)">{{v}}</li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cities from "@/assets/cities";

export default {
  props: {
    data: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      allCities: {},
      cities
    };
  },
  mounted() {
    let newCities = {
      国内热门: [],
      ABCDE: [],
      FGHJ: [],
      KLMNP: [],
      QRSTW: [],
      XYZ: []
    };

    for (let i = 0; i < this.cities.length; i++) {
      const key = Object.keys(this.cities[i])[0];
      const reg = new RegExp(`${key}`, "i");
      for (let index in newCities) {
        if (index.search(reg) != -1) {
          newCities[index].push(this.cities[i][key]);
        }
      }
    }
    // 添加国内热门
    newCities["国内热门"] = [
      "上海",
      "北京",
      "成都",
      "昆明",
      "西安",
      "深圳",
      "重庆",
      "杭州",
      "厦门",
      "乌鲁木齐",
      "广州",
      "海口",
      "哈尔滨",
      "南京",
      "武汉",
      "长沙",
      "青岛",
      "郑州",
      "三亚",
      "福州",
      "贵阳",
      "天津",
      "南宁",
      "沈阳",
      "太原",
      "大连",
      "兰州",
      "济南",
      "长春",
      "温州"
    ];
    this.allCities = newCities;
  },
  methods: {
    // 点击每个栏目
    handleLabel() {
      this.$emit("handleLabel");
    },
    //   点击每个城市
    handleClickCity(v) {
      this.$emit("handleClickCity", { addr: this.data, city: v });
    }
  }
};
</script>

<style scoped lang="less">
.allCity {
  user-select: none;
  position: absolute;
  z-index: 10000;
  width: 500px;
  .label {
    font-size: 12px;
  }
  .item {
    ul {
      display: flex;
      flex-wrap: wrap;
      line-height: 26px;
      font-size: 12px;
      li {
        flex: 0 0 12%;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>