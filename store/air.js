export const state = () => {
  return {
    // 查询历史列表
    searchHistory: [],
    // 订单详情
    orderDetail: {},
    // 订单总价格
    allPrice:0,
  };
};

export const mutations = {
  setSearchHistory(state, data) {
    state.searchHistory.unshift(data);
    if (state.searchHistory.length > 5) {
      state.searchHistory.length = 5;
    }
  },
  setOrderDetail(state, data) {
    state.orderDetail = data;
  },
  setAllPrice(state,data){
    state.allPrice=data;
  }
};
export const actions = {
  // 国内机票搜索机票下拉时的事件
  searchCity(store, data) {
    return this.$axios({ url: `/airs/city?name=${data}` }).then(res => {
      let { data } = res.data;
      data = data.map(item => {
        item.value = item.name.replace("市", "");
        return item;
      });
      return data;
    });
  }
};
