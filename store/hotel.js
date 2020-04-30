export const state = () => {
  return {};
};
export const mutations = {};
export const actions = {
  // 获取城市
  getCities(store, data) {
    return this.$axios({ url: `/cities?name=${data}` }).then(res => {
      const { data } = res;
      return data;
    });
  }
};
