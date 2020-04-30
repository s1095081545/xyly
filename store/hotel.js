export const state = () => {
<<<<<<< HEAD
  return {
    location: {},
    name: ''
  };
};
export const mutations = {
  setLocation(state, data) {
    state.location = data;
  },
  setName(state, data) {
    state.name = data;
  },

};
=======
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
>>>>>>> 1b68e643843cfb044728eb86cdd5e9e4aa77f0b8
