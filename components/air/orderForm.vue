<template>
  <!-- 触发allPrice监听 -->
  <div class="main" :class="allPrice">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info" :model="form" :rules="rules" ref="form">
        <div
          class="member-info-item"
          v-for="(item, index) in form.users"
          :key="index"
        >
          <el-form-item prop="users">
            <el-form-item label="乘机人类型">
              <el-input
                placeholder="姓名"
                class="input-with-select"
                v-model="item.username"
              >
                <el-select slot="prepend" value="1" placeholder="请选择">
                  <el-option label="成人" value="1"></el-option>
                </el-select>
              </el-input>
            </el-form-item>

            <el-form-item label="证件类型">
              <el-input
                placeholder="证件号码"
                class="input-with-select"
                v-model="item.id"
              >
                <el-select slot="prepend" value="1" placeholder="请选择">
                  <el-option
                    label="身份证"
                    value="1"
                    :checked="true"
                  ></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers"
        >添加乘机人</el-button
      >
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div
          class="insurance-item"
          v-for="(item, index) in detail.insurances"
          :key="index"
        >
          <el-checkbox
            :label="
              `${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`
            "
            border
            @change="handleChange(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="80px" :model="form" :rules="rules" ref="form2">
          <el-form-item label="姓名" prop="contactName">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机" prop="contactPhone">
            <el-input placeholder="请输入内容" v-model="form.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="captcha">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit"
          >提交订单</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 校验用户列表
    var validUsers = (rule, value, fn) => {
      const flag = value.some(
        item => item.username.trim() === "" || item.id.trim() === ""
      );
      flag ? fn(new Error("乘机人和证件号码不能为空")) : fn();
    };
    return {
      form: {
        users: [{ username: "", id: "" }], //用户列表
        insurances: [], //保险id
        contactName: "", //联系人名字
        contactPhone: "", //联系人电话
        invoice: false, //是否需要发票
        seat_xid: "", //座位id
        air: 0, //Number	航班id
        captcha: "" //验证码
      },
      rules: {
        users: [{ validator: validUsers, trigger: "blur" }],
        contactName: [
          { required: true, message: "联系人姓名为空", trigger: " " }
        ],
        contactPhone: [
          { required: true, message: "联系人电话为空", trigger: " " }
        ],
        captcha: [{ required: true, message: "验证码为空", trigger: " " }]
      },
      detail: {
        insurances: []
      }
    };
  },
  computed: {
    // 计算总价钱
    allPrice() {
      let price = 0;
      const detail = this.detail;
      if (!detail.seat_infos) return price;
      price += detail.seat_infos.org_settle_price; //单人基础价钱
      price += detail.airport_tax_audlet; //机建费
      this.form.insurances.forEach(item => {
        detail.insurances.forEach(v => {
          if (item === v.id) price += v.price; //保险费
        });
      });

      price *= this.form.users.length; //多人费用

      this.$store.commit("air/setAllPrice", price);
      return price;
    }
  },
  mounted() {
    const { id, seat_xid } = this.$route.query;
    this.form.seat_xid = seat_xid;
    this.form.air = id;
    this.$axios({
      url: `/airs/${id}`,
      params: {
        seat_xid
      }
    }).then(res => {
      const { data } = res;
      this.detail = data;
      this.$store.commit("air/setOrderDetail", data);
    });
  },
  methods: {
    //选择保险
    handleChange(id) {
      const index = this.form.insurances.indexOf(id);
      if (index > -1) {
        this.form.insurances.splice(index, 1);
      } else {
        this.form.insurances.push(id);
      }
    },
    // 添加乘机人
    handleAddUsers() {
      this.form.users.push({ username: "", id: "" });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.form.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      const tel = this.form.contactPhone;
      this.$store.dispatch("user/sendCaptcha", { tel }).then(res => {
        this.$message.success(`验证码是:${res}`);
        this.form.captcha = res;
      });
    },

    // 提交订单
    handleSubmit() {
      let flag = false;
      this.$refs.form.validate(valid => {
        flag = valid ? true : false;
      });
      this.$refs.form2.validate(valid => {
        flag = flag ? (valid ? true : false) : false;
      });
      if (flag) {
        const Authorization = `Bearer ` + this.$store.state.user.userInfo.token;
        this.$axios({
          url: `/airorders`,
          method: "post",
          data: this.form,
          headers: {
            Authorization
          }
        }).then(res => {
          const { data } = res.data;
          this.$router.push({
            path: "/air/pay",
            query: {
              id: data.id
            }
          });
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>
