<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{ list.price }}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      list: {},
      timeId: ""
    };
  },
  mounted() {
    this.reset();
  },
  methods: {
    //   初始化
    reset() {
      setTimeout(async () => {
        const { id } = this.$route.query;
        const Authorization = `Bearer ` + this.$store.state.user.userInfo.token;
        // 获取订单列表并生成二维码
        await this.$axios({
          url: `/airorders/${id}`,
          headers: { Authorization }
        }).then(res => {
          const { data } = res;
          this.list = data;
          const url = data.payInfo.code_url; //付款的地址
          const canvas = document.querySelector("#qrcode-stage");
          //   生成二维码
          QRCode.toCanvas(canvas, url);
        });
        // 轮询获取付款情况
        this.timeId = setInterval(async () => {
          await this.$axios({
            url: `/airorders/checkpay`,
            method: "post",
            data: {
              id: this.list.id,
              nonce_str: this.list.payInfo.nonce_str,
              out_trade_no: this.list.payInfo.order_no
            },
            headers: { Authorization }
          }).then(res => {
            // trade_state:SUCCESS;
            // statusTxt:支付完成
            const { trade_state, statusTxt } = res.data;
            if (trade_state === "SUCCESS") {
              this.$message.success("支付完成");
              clearInterval(this.timeId);
              this.$router.push("/air");
            }
          });
        }, 1000);
      }, 10);
    }
  },
  destroyed() {
    clearInterval(this.timeId);
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>
