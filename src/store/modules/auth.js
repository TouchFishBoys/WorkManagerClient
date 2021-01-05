const state = {
  token: localStorage.getItem("JWT_TOKEN")
    ? localStorage.getItem("JWT_TOKEN")
    : ""
};

const mutations = {
  login: (state, token) => {
    state.token = token;
    localStorage.setItem("USER_TOKEN", token);
  },
  logout: state => {
    state.token = null;
    localStorage.removeItem("USER_TOKEN");
  }
};

export default {
  namespaced: true,
  state: state,
  mutations
};
