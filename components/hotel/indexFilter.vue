<template>
  <div class="w">
    <el-row>
      <!-- 价格 -->
      <el-col :span="6" class="jiage">
        <div>
          <span>价格</span>
          <span>0-4000</span>
        </div>
        <div>
          <el-slider v-model="form.price_lt" :max="4000"></el-slider>
        </div>
      </el-col>
      <!-- 其他筛选 -->
      <el-col :span="18">
        <el-row class="other">
          <el-col :span="6" v-for="(a, b) in items" :key="b">
            <div>{{ a }}</div>
            <div>
              <el-dropdown placement="bottom-start" :hide-on-click="false">
                <span class="el-dropdown-link">
                  {{
                  form[Object.keys(form)[b]].length > 0
                  ? form[Object.keys(form)[b]].length > 1
                  ? `已选${form[Object.keys(form)[b]].length}项`
                  : list[Object.keys(list)[b]].filter(
                  v => v.id === form[Object.keys(form)[b]][0]
                  )[0]["name"]
                  : "不限"
                  }}
                  <i
                    class="el-icon-arrow-down el-icon--right"
                  ></i>
                </span>
                <el-dropdown-menu
                  slot="dropdown"
                  style="min-width:160px;overflow-y:auto;max-height:260px"
                >
                  <el-checkbox-group v-model="form[Object.keys(form)[b]]">
                    <el-dropdown-item
                      v-for="(item, index) in list[Object.keys(list)[b]]"
                      :key="index"
                    >
                      <el-checkbox :label="item.id" style="display:block">
                        {{
                        item.name
                        }}
                      </el-checkbox>
                    </el-dropdown-item>
                  </el-checkbox-group>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "indexFilter",
  data() {
    return {
      form: {
        hotellevel_in: [],
        hoteltype_in: [],
        hotelasset_in: [],
        hotelbrand_in: [],
        price_lt: 4000
      },
      list: {
        levels: [],
        types: [],
        assets: [],
        brands: []
      },
      items: ["住宿等级", "住宿类型", "酒店设施", "酒店品牌"]
    };
  },
  watch: {
    form: {
      handler() {
        this.$router.push({
          path: "hotel",
          query: {
            ...this.$route.query,
            ...this.form,
            _start: 1
          }
        });
      },
      deep: true
    }
  },
  mounted() {
    this.$axios({ url: `/hotels/options` }).then(res => {
      const { data } = res.data;
      this.list = data;
    });
  }
};
</script>

<style scoped lang="less">
.w {
  margin-top: 20px;
  border: 1px solid #e1e1e1;
  font-size: 14px;
  color: #333;
  .jiage {
    padding: 10px 20px 0;
    div:first-child {
      display: flex;
      justify-content: space-between;
    }
    /deep/.el-slider__runway {
      margin-top: 20px;
    }
  }
  .other {
    /deep/.el-col {
      border-left: 1px solid #eaeaea;
      margin: 10px 0;
      padding: 0 20px;
      //   下拉菜单
      /deep/.el-dropdown {
        width: 100%;
        border: none;
        .el-dropdown-link {
          padding: 10px 0;
          display: block;
          width: 100%;
        }
        .el-icon--right {
          float: right;
        }
      }
    }
  }
}
</style>
