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
          <el-slider :show-tooltip="false"></el-slider>
        </div>
      </el-col>
      <!-- 其他筛选 -->
      <el-col :span="18">
        <el-row class="other">
          <el-col :span="6">
            <div>住宿等级</div>
            <div>
              <el-dropdown placement="bottom-start">
                <span class="el-dropdown-link">
                  下拉菜单
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-plus">黄金糕3werty</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
          <el-col :span="6">
            <div>住宿类型</div>
            <div>
              <el-dropdown placement="bottom-start">
                <span class="el-dropdown-link">
                  下拉菜单
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-plus">黄金糕3werty</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
          <el-col :span="6">
            <div>酒店设施</div>
            <div>
              <el-dropdown placement="bottom-start">
                <span class="el-dropdown-link">
                  下拉菜单
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-plus">黄金糕3werty</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
          <el-col :span="6">
            <div>酒店品牌</div>
            <div>
              <el-dropdown placement="bottom-start">
                <span class="el-dropdown-link">
                  下拉菜单
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-plus">黄金糕3werty</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
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
export default {};
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