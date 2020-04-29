<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-autocomplete
          :fetch-suggestions="querySearchAsync"
          placeholder="切换城市"
          @select="handleSelect"
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
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="people">
        <el-input placeholder="人数未定" suffix-icon="el-icon-user" readonly="readonly"></el-input>
        <!-- 下拉菜单 -->
        <div class="down" v-if="false">
          <div class="header">
            <div>每间</div>
            <div>
              <!-- 选择器1 -->
              <el-select size="mini" placeholder="请选择" style="width:100px" value="2成人">
                <el-option v-for="item in 7" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <!-- 选择器2 -->
              <el-select placeholder="请选择" size="mini" style="width:100px" value="0儿童">
                <el-option v-for="item in 5" :key="item" :label="item-1" :value="item-1"></el-option>
              </el-select>
            </div>
          </div>
          <div class="body">
            <el-button size="mini" class="el-button el-button--primary">确定</el-button>
          </div>
        </div>
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
      isShowDepartCity: true //是否显示出发输入框所有城市
    };
  },
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
    querySearchAsync(val, cb) {
      cb([]);
    },
    // 切换城市下拉选择
    handleSelect(item) {
      console.log(item);
    },
    // 提交表单
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped lang="less">
/deep/.people {
  position: relative;
  .down {
    line-height: 0;
    box-shadow: 0 0 3px rgba(126, 126, 126, 0.3);
    background: #fff;
    width: 320px;
    margin-top: 10px;
    padding: 10px;
    border-radius: 4px;
    position: absolute;
    z-index: 999;
    left: 0;
    top: 100%;
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
}
</style>