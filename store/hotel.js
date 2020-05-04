export const state = () => {
  return {
    location: {},
    name: "",
    cities: '',
    city: {}
  };
};
export const mutations = {
  setLocation(state, data) {
    state.location = data;
  },
  setName(state, data) {
    state.name = data;
  },
  setCities(state, data) {
    state.cities = data;
  },
  setCity(state, data) {
    state.city = data;
  }
};

export const actions = {
  // 获取城市
  getCities(store, data) {
    return this.$axios({ url: `/cities?name=${data}` }).then(res => {
      const { data } = res;
      return data;
    });
  }
};
