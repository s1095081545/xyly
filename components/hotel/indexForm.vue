<template>
  <div>
    <el-form :model="form" ref="form" :inline="true" class="demo-form-inline">
      <el-form-item>
        <!-- 切换城市弹出菜单 -->
        <el-popover
          ref="popover"
          placement="bottom-start"
          trigger="focus"
          v-model="cityVisible"
          @show="cgShow"
        >
          <div class="hotCity" :class="isSwitch?'active':''">
            <p v-show="isSwitch">热门城市</p>
            <ul>
              <li
                v-for="(item, index) in matchCity"
                :key="index"
                @click="hotCityClick(item.name)"
              >{{item.name}}</li>
            </ul>
          </div>
          <el-input slot="reference" v-model="form.name" placeholder="切换城市" @input="cgInput"></el-input>
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          v-model="form.date"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <!-- 人数确定 -->
      <el-form-item class="people">
        <el-popover placement="bottom" v-model="visible">
          <!-- 下拉菜单 -->
          <div class="down">
            <div class="header">
              <div>每间</div>
              <div>
                <!-- 选择器1 -->
                <el-select
                  size="mini"
                  placeholder="请选择"
                  style="width:100px"
                  v-model="personForm.bigpeople"
                  @change="cgChange1"
                >
                  <el-option v-for="item in 7" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <!-- 选择器2 -->
                <el-select
                  placeholder="请选择"
                  size="mini"
                  style="width:100px"
                  v-model="personForm.children"
                  @change="cgChange2"
                >
                  <el-option v-for="item in 5" :key="item" :label="item-1" :value="item-1"></el-option>
                </el-select>
              </div>
            </div>
            <div class="body">
              <el-button type="primary" size="mini" @click="handleDown">确定</el-button>
            </div>
          </div>

          <el-input
            slot="reference"
            placeholder="人数未定"
            suffix-icon="el-icon-user"
            readonly="readonly"
            v-model="form.person"
            ref="personInput"
          ></el-input>
        </el-popover>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索酒店</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import citiesList from "@/components/air/citiesList";
export default {
  components: { citiesList },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 3600 * 1000;
        }
      },
      form: {
        name: "",
        date: "",
        person: ""
      },
      personForm: {
        bigpeople: "1成人",
        children: "0儿童"
      },
      isShowDepartCity: true, //是否显示出发输入框所有城市
      visible: false, //人数确定弹出层
      cityVisible: false,
      hotCity: [{ name: "广州市" }, { name: "杭州市" }, { name: "上海市" }],
      matchCity: [],
      isSwitch: false
    };
  },
  watch: {
    $route() {
      this.setForm();
    }
  },
  mounted() {
    this.setForm();
  },
  methods: {
    // 选择弹出菜单事件
    hotCityClick(val) {
      this.form.name = val;
      this.cityVisible = false;
    },
    //设置输入框
    setForm() {
      const { cityName, enterTime, leftTime } = this.$route.query;
      this.form.name = cityName;
      this.form.date = [enterTime || "", leftTime || ""];
    },
    // 切换城市弹出菜单显示
    cgShow() {
      if (this.form.name && this.matchCity.length === 0) {
        this.cityVisible = false;
        this.cgGetCity(this.form.name);
      }
      if (this.form.name === "") {
        this.matchCity = this.hotCity;
        this.isSwitch = true;
      }
    },
    // 切换城市输入事件
    cgInput() {
      const val = this.form.name;
      if (val === "") {
        this.matchCity = this.hotCity;
        this.isSwitch = true;
      } else {
        this.cgGetCity(val);
      }
    },
    // 切换城市远程搜索
    cgGetCity(val) {
      this.$store.dispatch("hotel/getCities", val).then(res => {
        this.matchCity = res.data;
        this.cityVisible = true;
        this.isSwitch = false;
      });
    },
    // 点击人数下拉框
    handleDown() {
      const { bigpeople, children } = this.personForm;
      this.form.person = bigpeople + children;
      this.visible = false;
    },
    // 人数下拉选择器发生改变时
    cgChange1(val) {
      this.personForm.bigpeople = val + "成人";
    },
    cgChange2(val) {
      this.personForm.children = val + "儿童";
    },
    // 提交表单
    onSubmit() {
      const { name, date } = this.form;
      this.$store.commit("hotel/setCities", name);
      const query = {
        ...this.$route.query,
        _start: 1,
        cityName: name
      };
      if (date) {
        query.enterTime = date[0];
        query.leftTime = date[1];
      } else {
        query.enterTime = "";
        query.leftTime = "";
      }
      this.$router.push({
        path: "hotel",
        query
      });
    }
  }
};
</script>

<style scoped lang="less">
.hotCity {
  line-height: 30px;
  li {
    padding-left: 10px;
  }
  li:hover {
    background: #efefef;
    cursor: pointer;
  }
}
.hotCity.active {
  position: relative;
  z-index: 99999;
  overflow: hidden;
  width: 260px;
  p {
    margin-bottom: 20px;
    font-size: 16px;
    border-bottom: 1px solid #eaeaea;
    line-height: 30px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 0 0 20%;
      cursor: pointer;
    }
  }
}
.down {
  line-height: 0;
  width: 320px;
  .header {
    padding-bottom: 20px;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div:last-child {
      display: flex;
      /deep/.el-select {
        margin-left: 10px;
      }
    }
  }
  .body {
    display: flex;
    padding-top: 20px;
    justify-content: flex-end;
  }
}
</style>