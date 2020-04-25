<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{ active: index === currentTab }"
      >
        <i :class="item.icon"></i>
        {{ item.name }}
      </span>
    </el-row>

    <el-form
      class="search-form-content"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      hide-required-asterisk
    >
      <el-form-item label="出发城市" prop="departCity">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @blur="handleDepartBlur"
          class="el-autocomplete"
          v-model="form.departCity"
          :select-when-unmatched="false"
          :hide-loading="true"
        ></el-autocomplete>
        <!-- 所有城市列表 -->
        <transition name="el-zoom-in-top">
          <citiesList
            @handleClickCity="handleClickCity"
            @handleLabel="handleLabel"
            data="departCity"
            v-show="isShowDepartCity"
          />
        </transition>
      </el-form-item>

      <el-form-item label="到达城市" prop="destCity">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @blur="handleDestBlur"
          class="el-autocomplete"
          v-model="form.destCity"
          :select-when-unmatched="false"
          :hide-loading="true"
        ></el-autocomplete>
        <!-- 所有城市列表 -->
        <transition name="el-zoom-in-top">
          <citiesList
            @handleClickCity="handleClickCity"
            @handleLabel="handleLabel"
            data="destCity"
            v-show="isShowDestCity"
          />
        </transition>
      </el-form-item>
      <el-form-item label="出发时间" prop="departDate">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import citiesList from "@/components/air/citiesList";
export default {
  components: { citiesList },
  data() {
    return {
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      rules: {
        departCity: [
          {
            required: true,
            message: "出发城市不能为空",
            trigger: " "
          }
        ],
        destCity: [
          {
            required: true,
            message: "到达城市不能为空",
            trigger: " "
          }
        ],
        departDate: [
          {
            required: true,
            message: "出发时间不能为空",
            trigger: " "
          }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 24 * 1000;
        }
      },
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      isShow: true,
      isShowDepartCity: false, //是否显示出发输入框所有城市
      isShowDestCity: false, //是否显示到达输入框所有城市
      isLabel: false //判断是否点击所有城市的栏目
    };
  },
  methods: {
    // 点击每个城市，返回值到输入框中
    handleClickCity(val) {
      const { addr, city } = val;
      this.form[addr] = city;
    },
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$message("往返机票尚未开通，敬请期待");
      }
    },
    // 获取城市数据
    getCity(val) {
      return this.$store.dispatch("air/searchCity", val.trim());
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, fn) {
      value = value.trim();

      fn([]);
      this.isShowDepartCity = !value; // 输入框为空则显示所有城市选择面板
      if (value)
        this.getCity(value).then(res => {
          if (!this.isShowDepartCity) fn(res);
        });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, fn) {
      value = value.trim();

      fn([]); //先返回空数组不让下拉框显示
      this.isShowDestCity = !value; // 输入框为空则显示所有城市选择面板
      if (value)
        this.getCity(value).then(res => {
          if (!this.isShowDestCity) fn(res);
        });
    },
    // 所有城市面板中，点击栏目
    handleLabel() {
      this.isLabel = true;
    },
    //  出发城市失去焦点事件
    handleDepartBlur(e) {
      setTimeout(() => {
        // 判断当前操作是否点击的栏目
        if (this.isLabel) {
          this.isLabel = false;
          e.target.focus(); //是则给输入框重新获取焦点
        } else {
          this.isShowDepartCity = false; //所有城市列表关闭
        }

        const val = this.form.departCity.trim();
        if (!val) return; //输入框为空则什么都不做
        this.getCity(val).then(res => {
          if (res.length === 0) return;
          this.form.departCity = res[0].value;
          this.form.departCode = res[0].sort;
        });
      }, 200);
    },
    //  目标城市失去焦点事件
    handleDestBlur(e) {
      setTimeout(() => {
        // 判断当前操作是否点击的栏目
        if (this.isLabel) {
          this.isLabel = false;
          e.target.focus(); //是则给输入框重新获取焦点
        } else {
          this.isShowDestCity = false; //所有城市列表关闭
        }

        const val = this.form.destCity.trim();
        if (!val) return; //输入框为空则什么都不做
        this.getCity(val).then(res => {
          if (res.length === 0) return;
          this.form.destCity = res[0].value;
          this.form.destCode = res[0].sort;
        });
      }, 200);
    },

    // 确认选择日期时触发
    handleDate(value) {},

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode } = this.form;
      this.form = {
        ...this.form,
        departCity: this.form.destCity,
        departCode: this.form.destCode,
        destCity: departCity,
        destCode: departCode
      };
    },

    // 提交表单是触发
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 存储搜索
          this.$store.commit("air/setSearchHistory", this.form);
          this.$router.push({
            path: "/air/flights",
            query: this.form
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  user-select: none;
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
    cursor: pointer;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
