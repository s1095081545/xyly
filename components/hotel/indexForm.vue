<template>
  <div>
    <el-form :model="form" ref="form" :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-autocomplete
          :fetch-suggestions="querySearchAsync"
          placeholder="切换城市"
          @select="handleSelect"
          v-model="form.name"
        ></el-autocomplete>
        <!-- 所有城市列表 -->
        <transition name="el-zoom-in-top">
          <!-- <citiesList
            @handleClickCity="handleClickCity"
            @handleLabel="handleLabel"
            data="departCity"
            v-show="isShowDepartCity"
          />-->
        </transition>
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
                >
                  <el-option v-for="item in 7" :key="item" :label="item+'成人'" :value="item+'成人'"></el-option>
                </el-select>
                <!-- 选择器2 -->
                <el-select
                  placeholder="请选择"
                  size="mini"
                  style="width:100px"
                  v-model="personForm.children"
                >
                  <el-option
                    v-for="item in 5"
                    :key="item"
                    :label="item-1+'儿童'"
                    :value="item-1+'儿童'"
                  ></el-option>
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
        <el-button type="primary" @click="onSubmit">查看价格</el-button>
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
        name: "广州市",
        date: "",
        person: ""
      },
      personForm: {
        bigpeople: "1成人",
        children: "0儿童"
      },
      isShowDepartCity: true, //是否显示出发输入框所有城市
      visible: false //人数确定弹出层
    };
  },
  watch: {},
  methods: {
    // 点击每个城市，返回值到输入框中
    handleClickCity(val) {
      const { addr, city } = val;
      this.form[addr] = city;
    },
    // 所有城市面板中，点击栏目
    handleLabel() {
      this.isLabel = true;
    },
    // 切换城市输入远程搜索
    async querySearchAsync(val, cb) {
      val = val.trim();
      cb([]);
      if (val.length) {
        this.$store.dispatch("hotel/getCities", val).then(res => {
          if (res.total > 0) {
            const data = res.data.map(item => ({
              value: item.name
            }));
            cb(data);
          }
        });
      } else {
      }
    },
    // 切换城市下拉选择
    handleSelect(item) {
      console.log(item);
    },
    // 点击人数下拉框
    handleDown() {
      const { bigpeople, children } = this.personForm;
      this.form.person = bigpeople + children;
      this.visible = false;
    },
    // 提交表单
    onSubmit() {
      const { name, date } = this.form;
      this.$router.push({
        query: {
          cityName: name,
          enterTime: date[0],
          leftTime: date[1]
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
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