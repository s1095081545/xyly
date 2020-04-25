<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"> </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"> </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input
        placeholder="密码"
        type="password"
        v-model="form.password"
      ></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkpwd">
      <el-input placeholder="确认密码" type="password" v-model="form.checkpwd">
      </el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">
      注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        captcha: "", //验证码
        nickname: "",
        password: "",
        checkpwd: ""
      },
      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: "不允许为空",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "不允许为空",
            trigger: "blur"
          }
        ], //验证码
        nickname: [
          {
            required: true,
            message: "不允许为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "不允许为空",
            trigger: "blur"
          }
        ],
        checkpwd: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      this.$refs.form.validateField("username", valid => {
        if (!valid) {
          this.$store
            .dispatch("user/sendCaptcha", { tel: this.form.username })
            .then(res => {
              this.$message.success(`验证码是：${res}`);
            });
        }
      });
    },

    // 注册
    handleRegSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { checkpwd, ...data } = this.form;
          const res = await this.$axios({
            url: `/accounts/register`,
            method: "post",
            data
          }).then(res => {
            const { data } = res;
            this.$message.success("注册成功,即将自动登录");
            return "success";
          });
          // 注册成功后自动登录
          if (res === "success") {
            setTimeout(() => {
              const { username, password } = this.form;
              this.$store
                .dispatch("user/login", { username, password })
                .then(res => {
                  this.$router.push("/");
                });
            }, 3000);
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
