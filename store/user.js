export const state = () => {
  return {
    userInfo: {}
  };
};
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  }
};
export const actions = {
  // 登录事件
  login(store, data) {
    return this.$axios({
      url: `/accounts/login`,
      method: "post",
      data
    }).then(res => {
      const data = res.data;
      //调用当前模块setUserInfo方法修改当前模块state.userInfo的值
      store.commit("setUserInfo", data);

      return data; //返回获取的数据
    });
  },
  // 发送验证码
  sendCaptcha(store, data) {
    return this.$axios({
      url: `/captchas`,
      method: "post",
      data //{tel:123}电话号码
    }).then(res => {
      const { data } = res;
      return data.code; //返回验证码
    });
  }
};
