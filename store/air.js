export const state = () => {
  return {
    searchHistory: []
  };
};

export const mutations = {
  setSearchHistory(state, data) {
    state.searchHistory.unshift(data);
    if (state.searchHistory.length > 5) {
      state.searchHistory.length = 5;
    }
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
