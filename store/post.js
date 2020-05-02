export const state = () => {
  return {
    createArticle: []
  };
};
export const mutations = {
  setCreateArticle(state, data) {
    state.createArticle = data;
  }
};
