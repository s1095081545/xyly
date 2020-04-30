export const state = () => {
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